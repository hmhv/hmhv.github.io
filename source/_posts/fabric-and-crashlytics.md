title: Fabric、Crashlyticsでエラー
category:
  - Tech
tags:
  - iOS
  - Fabric
  - Crashlytics
date: 2015-11-10 21:38:53
---
Fabricのフレームワーク自動更新とgitブランチ移動のタイミングがよくなかった場合など
Fabric、Crashlytics.frameworkがちゃんとあるのにエラーになる時の解決策

1. プロジェクトからFabric、Crashlytics.frameworkを削除

2. 以下のコマンドでFabric、Crashlytics.frameworkをデスクトップへコピー
```Bash
ditto -xk ~/Library/Caches/com.crashlytics.mac/5b91b14e832a7b1c29441ec5ba109810/sdks/ios/com.twitter.crashlytics.ios-default.zip ~/Desktop/﻿
ditto -xk ~/Library/Caches/com.crashlytics.mac/5b91b14e832a7b1c29441ec5ba109810/sdks/ios/io.fabric.sdk.ios-default.zip ~/Desktop/
```

3. コピーしたFabric、Crashlytics.frameworkをプロジェクトへ追加

参考：
https://twittercommunity.com/t/error-upgrading-from-crashlytics-on-ios/36196/2