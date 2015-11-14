title: Fabric、Crashlyticsでエラー
category:
  - Tech
tags:
  - iOS
  - Fabric
  - Crashlytics
date: 2015-11-10 21:38:53
---
#### Fabricのフレームワーク自動更新とgitブランチ移動のタイミングがよくなかった場合など
#### Fabric、Crashlytics.frameworkがちゃんとあるのにエラーになる時の解決策
`ld: framework not found Crashlytics`

1. プロジェクトからFabric、Crashlytics.frameworkを削除

2. 以下のコマンドでFabric、Crashlytics.frameworkをデスクトップへコピー
```Bash
ditto -xk ~/Library/Caches/com.crashlytics.mac/5b91b14e832a7b1c29441ec5ba109810/sdks/ios/com.twitter.crashlytics.ios-default.zip ~/Desktop/﻿
ditto -xk ~/Library/Caches/com.crashlytics.mac/5b91b14e832a7b1c29441ec5ba109810/sdks/ios/io.fabric.sdk.ios-default.zip ~/Desktop/
```

3. コピーしたFabric、Crashlytics.frameworkをプロジェクトへ追加

#### SourceTree使用でtypechangeが更新できない場合

```Bash
$ git status
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	typechange: app/platforms/ios/Crashlytics.framework/Crashlytics
	typechange: app/platforms/ios/Fabric.framework/Fabric

no changes added to commit (use "git add" and/or "git commit -a")

$ git add .
$ git status
On branch feature/Update_Crashlytics_Framework
Your branch is up-to-date with 'origin/feature/Update_Crashlytics_Framework'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	typechange: app/platforms/ios/Crashlytics.framework/Crashlytics
	typechange: app/platforms/ios/Fabric.framework/Fabric

$ git commit -m 'Commit typechanges'
```


参考：
https://twittercommunity.com/t/error-upgrading-from-crashlytics-on-ios/36196/2
https://twittercommunity.com/t/getting-linker-error-framework-not-found-crashlytics/38185/20