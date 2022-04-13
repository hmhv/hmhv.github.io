title: Crashlyticsへの追加情報
category:
  - Tech
tags:
  - iOS
  - Crashlytics
date: 2015-11-23 21:48:43
---
Crashlyticsは入れておくだけでクラッシュ時のコールスタックが表示されるので調査に便利
また追加情報も送信できる仕組みもある。

### 1. ユーザ情報を送る

``` objc
#import <Crashlytics/Crashlytics.h>

- (void)testMethod2
{
    [[Crashlytics sharedInstance] setUserEmail:@"user@email.com"];
    [[Crashlytics sharedInstance] setUserIdentifier:@"12344556789"];
    [[Crashlytics sharedInstance] setUserName:@"test user"];
    
    [[Crashlytics sharedInstance] crash];
}
```

- 結果

<a class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/09ddd1bd-c0ab-aa93-2a8a-058bf6b42b44.png" style="max-width: 100%"></a>

### 2. Key,Valueで送る

``` objc
- (void)testMethod2
{
    [[Crashlytics sharedInstance] setBoolValue:YES forKey:@"boolLog"];
    [[Crashlytics sharedInstance] setFloatValue:0.12345 forKey:@"floatLog"];
    [[Crashlytics sharedInstance] setIntValue:3 forKey:@"intLog"];
    [[Crashlytics sharedInstance] setObjectValue:@"objectValue..test" forKey:@"objectLog"];
    
    [[Crashlytics sharedInstance] crash];
}
```

- 結果

<a class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/b71b2b63-7f7d-e11c-3e9e-b93398368ecd.png" style="max-width: 100%"></a>

### 3. ログ情報を送る

``` objc
- (void)testMethod2
{
    CLS_LOG(@"CLS_LOG for Dict %@", @{@"key1":@"value1", @"key2":@"value2", @"key3":@"value3"});
    
    [[Crashlytics sharedInstance] crash];
}
```

- 結果

<a class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/1f18738b-f988-0f26-1f01-6810a39da456.png" style="max-width: 100%"></a>

### 4. NSException以外のカスタム例外を送る

``` objc
- (void)testMethod2
{
    [[Crashlytics sharedInstance] recordCustomExceptionName:@"customEx..." reason:@"custom_reason.." frameArray:@[[CLSStackFrame stackFrameWithAddress:1234567]]];
    
    [[Crashlytics sharedInstance] crash];
}
```

- 結果

<a class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/3ffa7e4b-1878-d778-7d48-8b785015603c.png" style="max-width: 100%"></a>

参考：
http://support.crashlytics.com/knowledgebase/articles/92519-how-do-i-use-logging-
http://support.crashlytics.com/knowledgebase/articles/92520-how-do-i-use-custom-keys-
http://support.crashlytics.com/knowledgebase/articles/92521-how-do-i-set-user-information-
