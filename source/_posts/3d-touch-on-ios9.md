title: iOS9からの3D Touch実装の簡単メモ
category:
  - Tech
tags:
  - iOS
  - 3D Touch
date: 2015-10-07 21:22:02
---
## 3D Touchの種類

1. Home Screen Quick Actions
2. Peek and Pop
3. Force Properties

### 1. Home Screen Quick Actions

ホーム画面でアプリのアイコンを強く押すと表示される

<a href="https://qiita-image-store.s3.amazonaws.com/0/25832/6d4c12de-83e6-05a0-85c2-f05f74e843be.png" class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/6d4c12de-83e6-05a0-85c2-f05f74e843be.png" style="max-width: 100%"></a>

　
#### 実装方法

##### - info.plistで追加

```
<key>UIApplicationShortcutItems</key>
<array>
	<dict>
		<key>UIApplicationShortcutItemIconType</key>
		<string>UIApplicationShortcutIconTypePlay</string>
		<key>UIApplicationShortcutItemTitle</key>
		<string>Play</string>
		<key>UIApplicationShortcutItemType</key>
		<string>static</string>
		<key>UIApplicationShortcutItemUserInfo</key>
		<dict>
			<key>key1</key>
			<string>value1</string>
		</dict>
	</dict>
</array>
```

##### - コードで追加

```
UIApplicationShortcutItem *item1 = [[UIApplicationShortcutItem alloc] initWithType:@"dynamic1" localizedTitle:@"title1" localizedSubtitle:@"sub1" icon:[UIApplicationShortcutIcon iconWithType:UIApplicationShortcutIconTypeLocation] userInfo:nil];
UIApplicationShortcutItem *item2 = [[UIApplicationShortcutItem alloc] initWithType:@"dynamic2" localizedTitle:@"title2" localizedSubtitle:@"sub2" icon:[UIApplicationShortcutIcon iconWithType:UIApplicationShortcutIconTypePause] userInfo:nil];
UIApplicationShortcutItem *item3 = [[UIApplicationShortcutItem alloc] initWithType:@"dynamic3" localizedTitle:@"title3" localizedSubtitle:@"sub3" icon:[UIApplicationShortcutIcon iconWithType:UIApplicationShortcutIconTypeShare] userInfo:nil];

[[UIApplication sharedApplication] setShortcutItems: @[ item1, item2, item3 ]];
```

　　


### 2. Peek and Pop

特定のビューを強く押すとプレビューが表示される(Peek)

<a href="https://qiita-image-store.s3.amazonaws.com/0/25832/d506a5db-91a2-d6c3-6a53-a14d5b17a6ad.png" class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/d506a5db-91a2-d6c3-6a53-a14d5b17a6ad.png" style="max-width: 100%"></a>

Peekで上にスワイプするとメニューが表示される

<a href="https://qiita-image-store.s3.amazonaws.com/0/25832/a5a5aa64-46f3-b32c-d84a-b5af5a56ee09.png" class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/a5a5aa64-46f3-b32c-d84a-b5af5a56ee09.png" style="max-width: 100%"></a>


Peekでさらに強く押すと全表示で表示される(Pop)

<a href="https://qiita-image-store.s3.amazonaws.com/0/25832/b0789509-e864-114f-7aa9-99202c988d24.png" class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/b0789509-e864-114f-7aa9-99202c988d24.png" style="max-width: 100%"></a>



  　　




#### 実装方法

##### - １. 3D Touchに対応するビューをビューコントローラで登録

```
if (self.traitCollection.forceTouchCapability == UIForceTouchCapabilityAvailable) {
    [self registerForPreviewingWithDelegate:self sourceView:self.imageView];
}
```

##### - ２. `UIViewControllerPreviewingDelegate`を実装

```
@interface ViewController () <UIViewControllerPreviewingDelegate>
```

```
- (nullable UIViewController *)previewingContext:(id <UIViewControllerPreviewing>)previewingContext viewControllerForLocation:(CGPoint)location
{
    NSLog(@"peek");
    
    previewingContext.sourceRect = CGRectMake(0, 0, previewingContext.sourceView.frame.size.width, previewingContext.sourceView.frame.size.height);

    RedImageViewController *vc = [self.storyboard instantiateViewControllerWithIdentifier:@"RedImageViewController"];
    vc.preferredContentSize = CGSizeMake(0, 300);
    return vc;
}
```

```
- (void)previewingContext:(id <UIViewControllerPreviewing>)previewingContext commitViewController:(UIViewController *)viewControllerToCommit
{
    NSLog(@"pop");
    
    RedImageViewController *vc = (RedImageViewController *)viewControllerToCommit;
    vc.closeButton.hidden = NO;
    vc.view.backgroundColor = [UIColor yellowColor];
    [self presentViewController:viewControllerToCommit animated:YES completion:nil];
}
```
　　




##### - ３. プレビュー用メニュー追加

```
- (NSArray <id <UIPreviewActionItem>> *)previewActionItems
{
    UIPreviewAction *action1 = [UIPreviewAction actionWithTitle:@"action1" style:UIPreviewActionStyleDefault handler:^(UIPreviewAction * _Nonnull action, UIViewController * _Nonnull previewViewController) {
        NSLog(@"action1 selected.");
    }];
    UIPreviewAction *action2 = [UIPreviewAction actionWithTitle:@"action2" style:UIPreviewActionStyleSelected handler:^(UIPreviewAction * _Nonnull action, UIViewController * _Nonnull previewViewController) {
        NSLog(@"action1 selected.");
    }];
    UIPreviewAction *action3_1 = [UIPreviewAction actionWithTitle:@"action3-1" style:UIPreviewActionStyleDefault handler:^(UIPreviewAction * _Nonnull action, UIViewController * _Nonnull previewViewController) {
        NSLog(@"action1 selected.");
    }];
    UIPreviewAction *action3_2 = [UIPreviewAction actionWithTitle:@"action3-2" style:UIPreviewActionStyleDefault handler:^(UIPreviewAction * _Nonnull action, UIViewController * _Nonnull previewViewController) {
        NSLog(@"action1 selected.");
    }];
    UIPreviewActionGroup *action3 = [UIPreviewActionGroup actionGroupWithTitle:@"action3" style:UIPreviewActionStyleDestructive actions:@[action3_1, action3_2]];
    
    return @[action1, action2, action3];
}
```

### 3. Force Properties

UITouchに追加されたプロパティー`force`と`maximumPossibleForce`を利用

#### 実装方法

```
- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    UITouch *t = touches.anyObject;
    
    NSLog(@"touchesMoved : %f / %f", t.force, t.maximumPossibleForce);
}
```

サンプルコード：
https://github.com/hmhv/3DTouchSample

参考：
[Adopting3DTouchOniPhone](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual)
