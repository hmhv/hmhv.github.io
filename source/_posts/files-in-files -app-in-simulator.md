title: iOSシミュレーターのファイルアプリのファイルの確認する方法
category:
  - Tech
tags:
  - iOS
  - Simulator
  - Files
  - Folder
date: 2023-09-22 12:00:00
---

## iOSシミュレーターのファイルアプリのファイルの確認する方法


```
$ xcrun simctl listapps booted | grep group.com.apple.FileProvider.LocalStorage
"group.com.apple.FileProvider.LocalStorage" = "file:///Users/<user>/Library/Developer/CoreSimulator/Devices/<UUID>/data/Containers/Shared/AppGroup/<UUID>/";
```

上のフォルダーの中にある`File Provider Storage`フォルダーがファイルアプリの`このiPhone内`フォルダーになる
