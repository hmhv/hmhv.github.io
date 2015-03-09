title: HobjectiveRecord의 소개
category:
  - Tech
date: 2015-03-09 01:56:46
tags:
- iOS
- CoreData
- HobjectiveRecord
---
### HobjectiveRecord란

[HobjectiveRecord](https://github.com/hmhv/HobjectiveRecord)는 Objective-C로 작성된 CoreData용 라이브러리.
오픈소스로 [Github](https://github.com/hmhv/HobjectiveRecord)에서 자유롭게 이용 가능 합니다.

### HobjectiveRecord의 특징

적은 코드량으로 CoreData를 자유롭게 조작 가능하고
특히 백그라운드 처리를 기본으로 하고 있어 UI쓰레드를 블럭하지 않고 사용할 수도 있습니다.

> CoreData의 백그라운드 처리에 대한 상세내용은 아래 글들을 참고하세요.
> - [a-real-guide-to-core-data-concurrency](http://quellish.tumblr.com/post/97430076027/a-real-guide-to-core-data-concurrency).
> - [Multi-Context CoreData](http://www.cocoanetics.com/2012/07/multi-context-coredata/).

### HobjectiveRecord의 이용

#### 이용 준비

1. [Github -> HobjectiveRecord](https://github.com/hmhv/HobjectiveRecord)에서 다운로드 한후 `HobjectiveRecord`폴더를 사용할 프로젝트에 복사,
   또는 [CocoaPods](http://cocoapods.org)을 이용 `pod 'HobjectiveRecord'`
2. 필요한 파일에 `#import "HobjectiveRecord.h"`를 추가

#### 초기화

``` objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // 우선 CoreData를 이용하기 전에 스토어를 초기화
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

기본적으로 모든 처리는 `performBlock:`안에 기술

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

#### 커스텀 모델, 커스텀 sqlite파일의 이용

``` objc
NSURL *modelURL = [NSURL defaultModelURL:@"model_name"];
[NSPersistentStoreCoordinator setupDefaultStoreWithModelURL:modelURL storeURL:nil useInMemoryStore:NO];
    
// or
NSURL *storeURL = [NSURL defaultStoreURL:@"file_name.sqlite"];
[NSPersistentStoreCoordinator setupDefaultStoreWithModelURL:nil storeURL:storeURL useInMemoryStore:NO];
```

#### 맵핑

웹 서비스로 부터의 JSON은 `first_name`, `last_name`과 같은 스네이크 케이스인 경우가 많지만,
Objective-C에서는 `firstName`, `lastName`과 같은 캐멀 케이스가 주류다.
그래서 스네이크 케이스에서 캐멀 케이스로의 맵핑은 자동으로 됩니다.
그외에 특별한 이름 맵핑이 필요한 경우는 각 모델 클래스에서 mappings을 오버라이드에서 설정가능.

**!! Date, Transformable 타입은 맵핑 대상외 입니다. !!**

``` objc
// just override +mappings in your NSManagedObject subclass
#import "User+Mappings.h"

@implementation User (Mappings)

+ (NSDictionary *)mappings
{
    return @{@"description" : @"userDescription",
             @"name" : @"fullName"};
}
  // first_name => firstName 은 자동으로 맵핑됨

@end
/*
+ (NSDictionary *)mappings
+ (BOOL)useFindOrCreate
+ (BOOL)returnsObjectsAsFaults
+ (NSArray *)relationshipKeyPathsForPrefetching
*/
```

#### 테스트

HobjectiveRecord은 메모리내 스토어를 설정가능합니다. 테스트 이용에 편리합니다.

``` objc
[NSPersistentStoreCoordinator setupDefaultStoreWithModelURL:nil storeURL:nil useInMemoryStore:YES];
```
