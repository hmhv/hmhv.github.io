title: HobjectiveRecordの紹介
category:
  - Tech
date: 2015-03-09 11:56:46
tags:
- iOS
- CoreData
- HobjectiveRecord
---
### HobjectiveRecordとは

[HobjectiveRecord](https://github.com/hmhv/HobjectiveRecord)はObjective-C製のCoreData用ライブラリーです。
オープンソースで[Github](https://github.com/hmhv/HobjectiveRecord)から自由に利用できます。

### HobjectiveRecordの特徴

短いコード量でCoreDataを自由に操作できます。
特にバッググラウンド処理をベースにしているのでUIスレッドをブロックせず使うことも可能です。

> CoreDataのバッググラウンド処理の詳細は以下の内容を参考してください。
> - [a-real-guide-to-core-data-concurrency](http://quellish.tumblr.com/post/97430076027/a-real-guide-to-core-data-concurrency).
> - [Multi-Context CoreData](http://www.cocoanetics.com/2012/07/multi-context-coredata/).

### HobjectiveRecordを利用

#### 利用準備

1. [Github -> HobjectiveRecord](https://github.com/hmhv/HobjectiveRecord)からダウンロードして`HobjectiveRecord`フォルダを利用するプロジェクトにコピー、
   又は[CocoaPods](http://cocoapods.org)を利用 `pod 'HobjectiveRecord'`
2. 必要なファイルに`#import "HobjectiveRecord.h"`を追加

#### 初期化

``` objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // まずCoreDataの利用前にストアを初期化
    [NSPersistentStoreCoordinator setupDefaultStore];
    
    // your code here
    
    return YES;
}
/*
+ (void)setupDefaultStore;
+ (void)setupDefaultStoreWithModelURL:(NSURL *)modelURL storeURL:(NSURL *)storeURL useInMemoryStore:(BOOL)useInMemoryStore;
*/
```

### Basic

基本、全ての処理は`performBlock:`内で行う。

``` objc
[[NSManagedObjectContext defaultContext] performBlock:^{
  // your code here
}];
NSManagedObjectContext *childContext = [[NSManagedObjectContext defaultContext] createChildContext];
[childContext performBlock:^{
  // your code here
}];
```


#### Create / Save / Delete

``` objc
[[NSManagedObjectContext defaultContext] performBlock:^{
    Tweet *tweet = [Tweet create];
    tweet.text = @"I am here";
    [tweet save];
    [tweet delete];
    
    tweet = [Tweet create:@{@"text" : @"hello!!",
                            @"lang" : @"en"} ];
    [tweet saveToStore];
    
    [Tweet deleteAll];
}];
/*
+ (instancetype)create;
+ (instancetype)create:(NSDictionary *)attributes;
+ (void)deleteAll;
+ (void)deleteWithCondition:(id)condition;
- (void)save;
- (void)saveToStore;
- (void)delete;
*/
```

#### Finders

``` objc
[[NSManagedObjectContext defaultContext] performBlock:^{
    NSArray *tweets = [Tweet all];
    
    NSArray *tweetsInEnglish = [Tweet find:@"lang == 'en'"];
    
    User *hmhv = [User first:@"screenName == 'hmhv'"];
    
    NSArray *englishMen = [User find:@{@"lang" : @"en",
                                       @"timeZone" : @"London"
                                       }];
    
    NSPredicate *predicate = [NSPredicate predicateWithFormat:@"friendsCount > 100"];
    NSArray *manyFriendsUsers = [User find:predicate];
}];
/*
+ (NSArray *)all;
+ (NSArray *)find:(id)condition;
+ (instancetype)first:(id)condition;
+ (instancetype)firstOrCreate:(NSDictionary *)condition;
*/
```

#### Order and Limit

``` objc
[[NSManagedObjectContext defaultContext] performBlock:^{
    NSArray *sortedUsers = [User allWithOrder:@"name"];
    
    NSArray *allUsers = [User allWithOrder:@"screenName ASC, name DESC"];
    // or
    NSArray *allUsers2 = [User allWithOrder:@"screenName A, name D"];
    // or
    NSArray *allUsers3 = [User allWithOrder:@"screenName, name d"];

    NSArray *manyFriendsUsers = [User find:@"friendsCount > 100" order:@"screenName DESC"];
    
    NSArray *fiveEnglishUsers = [User find:@"lang == 'en'" order:@"screenName ASC" limit:@(5)];
}];
/*
+ (NSArray *)allWithOrder:(NSString *)order;
+ (NSArray *)find:(id)condition order:(NSString *)order;
+ (NSArray *)find:(id)condition limit:(NSNumber *)limit;
+ (NSArray *)find:(id)condition order:(NSString *)order limit:(NSNumber *)limit;
*/
```

#### Aggregation

``` objc
[[NSManagedObjectContext defaultContext] performBlock:^{
    NSUInteger allUserCount = [User count];
    
    NSUInteger englishUserCount = [User countWithCondition:@"lang == 'en'"];
}];
/*
+ (NSUInteger)count;
+ (NSUInteger)countWithCondition:(id)condition;
*/
```

#### BatchUpdate

``` objc
[[NSManagedObjectContext defaultContext] performBlock:^{
    
    [User batchUpdateWithCondition:@"friendsCount > 10" propertiesToUpdate:@{@"friendsCount": @0}];
    
    // update all entities
    [User batchUpdateWithCondition:nil propertiesToUpdate:@{@"friendsCount": @100}];
}];
/*
+ (NSUInteger)batchUpdateWithCondition:(id)condition propertiesToUpdate:(NSDictionary *)propertiesToUpdate;
+ (NSUInteger)batchUpdateWithCondition:(id)condition propertiesToUpdate:(NSDictionary *)propertiesToUpdate inContext:(NSManagedObjectContext *)context;
*/
```

#### NSFetchedResultsController

``` objc
    [[NSManagedObjectContext defaultContext] performBlock:^{
        NSFetchedResultsController *frc = [User createFetchedResultsControllerWithCondition:nil order:@"name" sectionNameKeyPath:nil];
        frc.delegate = self;
        
        NSError *error = nil;
        if ([frc performFetch:&error]) {
            [self reloadData];
        }
    }
}];
/*
+ (NSFetchedResultsController *)createFetchedResultsControllerWithCondition:(id)condition order:(NSString *)order sectionNameKeyPath:(NSString *)sectionNameKeyPath;
*/
```

#### Custom ManagedObjectContext

``` objc
NSManagedObjectContext *childContext = [[NSManagedObjectContext defaultContext] createChildContext];

[childContext performBlock:^{
    User *john = [User createInContext:childContext];
    john.name = @"John";
    [john save];
    
    john = [User first:@"name == 'John'" inContext:childContext];
    
    NSArray *manyFriendsUsers = [User find:@"friendsCount > 100" order:@"screenName DESC" inContext:childContext];
    
    NSArray *allUsers = [User allInContext:childContext];
}];
```

#### カスタムモデル、カスタムsqliteファイルの利用

``` objc
NSURL *modelURL = [NSURL defaultModelURL:@"model_name"];
[NSPersistentStoreCoordinator setupDefaultStoreWithModelURL:modelURL storeURL:nil useInMemoryStore:NO];
    
// or
NSURL *storeURL = [NSURL defaultStoreURL:@"file_name.sqlite"];
[NSPersistentStoreCoordinator setupDefaultStoreWithModelURL:nil storeURL:storeURL useInMemoryStore:NO];
```



#### マッピング

ウェブサービスからのJSONは`first_name`, `last_name`のようなスネークケースの場合が多いですが、
Objective-Cでは`firstName`, `lastName`のようにキャメルケースが主流です。
なのでスネークケースからキャメルケースへのマッピングは自動で行われます。
それ以外の特別な名前マッピングが必要な場合は各モデルスラスでmappingsをオーバライドして設定可能です。

**!! Date, Transformableタイプはマッピング対象外です。 !!**

``` objc
// just override +mappings in your NSManagedObject subclass
#import "User+Mappings.h"

@implementation User (Mappings)

+ (NSDictionary *)mappings
{
    return @{@"description" : @"userDescription",
             @"name" : @"fullName"};
}
  // first_name => firstNameは自動でマッピングされる。

@end
/*
+ (NSDictionary *)mappings
+ (BOOL)useFindOrCreate
+ (BOOL)returnsObjectsAsFaults
+ (NSArray *)relationshipKeyPathsForPrefetching
*/
```

#### テスト

HobjectiveRecordはメモリ内ストアを設定可能です。テストなどで利用すると便利です。

``` objc
[NSPersistentStoreCoordinator setupDefaultStoreWithModelURL:nil storeURL:nil useInMemoryStore:YES];
```
