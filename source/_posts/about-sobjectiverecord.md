title: SobjectiveRecordの紹介
category:
  - Tech
date: 2015-03-09 12:56:46
tags:
- iOS
- CoreData
- SobjectiveRecord
---
### SobjectiveRecordとは

[SobjectiveRecord](https://github.com/hmhv/SobjectiveRecord)はSwift製のCoreData用ライブラリーです。
オープンソースで[Github](https://github.com/hmhv/SobjectiveRecord)から自由に利用できます。

**Xcode 6.1.1で実装**

### SobjectiveRecordの特徴

短いコード量でCoreDataを自由に操作できます。
ジェネリックを利用して実装しているのでフェッチ結果を型変換なしで利用できます。
特にバッググラウンド処理をベースにしているのでUIスレッドをブロックせず使うことも可能です。

> CoreDataのバッググラウンド処理の詳細は以下の内容を参考してください。
> - [a-real-guide-to-core-data-concurrency](http://quellish.tumblr.com/post/97430076027/a-real-guide-to-core-data-concurrency).
> - [Multi-Context CoreData](http://www.cocoanetics.com/2012/07/multi-context-coredata/).

### SobjectiveRecordを利用

#### 利用準備

- [Github -> SobjectiveRecord](https://github.com/hmhv/SobjectiveRecord)からダウンロードして`SobjectiveRecord `フォルダを利用するプロジェクトにコピー、
   又は[CocoaPods](http://cocoapods.org)を利用 `pod 'SobjectiveRecord'`

> CocoaPods利用時はCocoaPodsのバージョンを0.36以上にする必要があります。

#### 初期化

``` swift
import SobjectiveRecord // CocoaPods利用時のみ
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
    
    // まずCoreDataの利用前にストアを初期化
    NSPersistentStoreCoordinator.setupDefaultStore()

	// youre code here
	
    return true
}
```

### Basic

- typealiasを利用してモデルクラスのtypealiasを定義

SobjectiveRecordはフェッチ結果を型変換なしで利用するためのクラスです。
一度定義しておくと後々楽です。

``` swift
// User, TweetはNSManagedObjectのサブクラス
typealias Users = SobjectiveRecord<User>
typealias Tweets = SobjectiveRecord<Tweet>

// 以降これは同じ
var user = SobjectiveRecord<User>.create()
var user = Users.create()
```

- 基本、全ての処理は`performBlock:`内で行う。

``` swift
NSManagedObjectContext.defaultContext.performBlock {
    // your code here
}
var moc = NSManagedObjectContext.defaultContext.createChildContext()
moc.performBlock {
    // your code here
}
```


#### Create / Save / Delete

createメッソドで簡単に作成
サーバーからのJSONデータはDictionaryに変換してそのまま設定可能

``` swift
NSManagedObjectContext.defaultContext.performBlock {
    var t = Tweets.create()
    t.text = "I am here"
    t.save()
    
    t = Tweets.create(attributes: ["text" : "hello!!", "lang" : "en"])
    t.delete()
}

NSManagedObjectContext.defaultContext.performBlock {
    Tweets.deleteAll()
    NSManagedObjectContext.defaultContext.save()
}
```

#### Finders

フェッチ条件は文字列、Dictionary、NSPredicateを設定可能

``` swift
NSManagedObjectContext.defaultContext.performBlock {
    var tweets = Tweets.all()
    
    var tweetsInEnglish = Tweets.find(condition: "lang == 'en'")
    
    var hmhv = Users.first(condition: "screenName == 'hmhv'")
    
    var englishMen = Users.find(condition: ["lang" : "en", "timeZone" : "London"])
    
    var predicate = NSPredicate(format: "friendsCount > 100")
    var manyFriendsUsers = Users.find(condition: predicate)
}
```

#### Order and Limit

``` swift
NSManagedObjectContext.defaultContext.performBlock {
    var sortedUsers = Users.all(order: "name")
    
    var allUsers = Users.all(order: "screenName ASC, name DESC")
    // or
    var allUsers2 = Users.all(order: "screenName A, name D")
    // or
    var allUsers3 = Users.all(order: "screenName, name d")
    
    var manyFriendsUsers = Users.find(condition: "friendsCount > 100", order: "screenName DESC")
    
    var fiveEnglishUsers = Users.find(condition: "lang == 'en'", order: "screenName ASC", fetchLimit: 5)
}
```

#### Aggregation

``` swift
NSManagedObjectContext.defaultContext.performBlock {
    var allUserCount = Users.count()
    
    var englishUserCount = Users.count(condition: "lang == 'en'")
}
```

#### BatchUpdate

iOS8からの機能であるBatchUpdateも利用可能

``` swift
NSManagedObjectContext.defaultContext.performBlock {
    
    Users.batchUpdate(condition: "friendsCount > 10", propertiesToUpdate: ["friendsCount": 0])

    // update all entities
    Users.batchUpdate(propertiesToUpdate: ["friendsCount": 100])
}
```

#### NSFetchedResultsController

``` swift
NSManagedObjectContext.defaultContext.performBlock {
    var frc = Users.createFetchedResultsController(order: "name")
    frc.delegate = self
    
    var error: NSError? = nil
    if frc.performFetch(&error) {
        self.reloadData()
    }
}
```

#### Custom ManagedObjectContext

``` swift
var childContext = NSManagedObjectContext.defaultContext.createChildContext()

childContext.performBlock {
    var john = Users.create(context: childContext)
    john.name = "John"
    john.save()
    
    var savedJohn = Users.first(condition: "name == 'John'", context: childContext)
    
    var manyFriendsUsers = Users.find(condition: "friendsCount > 100", order: "screenName DESC", context: childContext)
    
    var allUsers = Users.all(context: childContext)
}
```

#### カスタムモデル、カスタムsqliteファイルの利用

``` swift
var modelURL = NSURL.defaultModelURL(modelName: "model_name")
NSPersistentStoreCoordinator.setupDefaultStore(modelURL: modelURL)

// or
var storeURL = NSURL.defaultStoreURL(fileName: "file_name.sqlite")
NSPersistentStoreCoordinator.setupDefaultStore(storeURL: storeURL)
```



#### マッピング

ウェブサービスからのJSONは`first_name`, `last_name`のようなスネークケースの場合が多いですが、
Objective-Cでは`firstName`, `lastName`のようにキャメルケースが主流です。
なのでスネークケースからキャメルケースへのマッピングは自動で行われます。
それ以外の特別な名前マッピングが必要な場合は各モデルスラスでmappingsをオーバライドして設定可能です。

**!! Date, Transformableタイプ及びRelationshipsはマッピング対象外です。 !!**

``` swift
// just override +mappings in your NSManagedObject subclass
extension User
{
    override class var mappings: [String: String]? {
        return ["description" : "userDescription"]
    }
}
  // first_name => firstNameは自動でマッピングされる。
```

#### テスト

SobjectiveRecordはメモリ内ストアを設定可能です。テストなどで利用すると便利です。

``` swift
NSPersistentStoreCoordinator.setupDefaultStore(useInMemoryStore: true)
```

