
title: iOS9のSearch APIs簡単まとめ
category:
  - Tech
date: 2015-09-15 18:14:25
tags:
- iOS
- Search APIs
- Objectivc-C
---
### Search APIsとは

アプリの内容をSpotlightから検索し、検索結果からアプリに移動できる機能

### Search APIsの種類

- NSUserActivity API

> iOS8で追加されたHandoff用の`NSUserActivity`クラスを利用する

- CoreSpotlight API


> iOS9で追加された`CoreSpotlight.framework`を利用する

- Web Markup API

> アプリ側の対応ではなく関連ウェブページで対応


### NSUserActivity APIの実装例

まず検索インデックスに登録

```objc
- (void)addToSearchableIndex
{
    if (NSClassFromString(@"NSUserActivity")) {
        
        NSUserActivity *activity = [[NSUserActivity alloc] initWithActivityType:@"info.hmhv.myapp.search"];
        
        activity.title = @"タイトル";
        activity.webpageURL = [NSURL URLWithString:@"http://hmhv.info"];;

        
        if ([activity respondsToSelector:@selector(setEligibleForSearch:)])
        {
            activity.eligibleForSearch = YES;
            activity.keywords = [NSSet setWithArray:@[@"keyword1", @"keyword2"]];

            activity.needsSave = YES;
            //このuserInfoが重要
            activity.userInfo = @{@"key1" : @"value1",
                                  @"key2" : @"value2"};
            activity.requiredUserInfoKeys = [NSSet setWithArray:@[@"key1", @"key2"]];
            // 30日間有効
            activity.expirationDate = [NSDate dateWithTimeIntervalSinceNow:(60 * 60 * 24 * 30)];
        }
        
        [activity becomeCurrent];
        self.userActivity = activity;
    }
}
```

検索結果がタップされたら`AppDelegate`で処理する

```objc
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
    if ([userActivity.activityType isEqualToString:@"info.hmhv.myapp.search"])
    {
        //userActivity.userInfoを用いて画面表示
        return YES;
    }
    
    return NO;
}
```


### CoreSpotlight APIの実装例

まず検索インデックスに登録

```objc
#import <CoreSpotlight/CoreSpotlight.h>

...

- (void)addToSearchableIndex
{
    CSSearchableItemAttributeSet *attributeSet = [[CSSearchableItemAttributeSet alloc]
                                                  initWithItemContentType:(NSString *)kUTTypeText];
    attributeSet.title = @"タイトル";
    attributeSet.contentDescription = @"説明文";
    attributeSet.keywords = @[@"keyword1", @"keyword2"];
    
    //このuniqueIdentifierが重要
    NSString *uniqueIdentifier = [NSString stringWithFormat:@"myapp://hmhv.info/%@", self.recordId];

    CSSearchableItem *item = [[CSSearchableItem alloc] initWithUniqueIdentifier:uniqueIdentifier
                                                               domainIdentifier:@"info.hmhv.myapp.search"
                                                                   attributeSet:attributeSet];
    
    [[CSSearchableIndex defaultSearchableIndex] indexSearchableItems:@[item]
                                                   completionHandler: ^(NSError * __nullable error) {
            NSLog(@"Search item indexed (%@)", error);
    }];
}
```

検索結果がタップされたら`AppDelegate`で処理する

```objc
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
    if ([userActivity.activityType isEqualToString:CSSearchableItemActionType])
    {
        //検索インデックスに登録時に指定したuniqueIdentifierを取得
        NSString *uniqueIdentifier = userActivity.userInfo[CSSearchableItemActivityIdentifier];
        
        //uniqueIdentifierを用いて画面表示
        return YES;
    }
    
    return NO;
}
```


[参考：iOS Search API Best Practices and FAQs](https://developer.apple.com/library/prerelease/ios/technotes/tn2416/_index.html)