title: iOS9からのinfo.plist
category:
  - Tech
tags:
  - iOS
  - plist
date: 2015-10-07 21:14:49
---
- 通信先がhttps(TLSv1.2)未対応時

``` xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

詳細：
[App-Transport-Security-Technote](https://developer.apple.com/library/prerelease/ios/technotes/App-Transport-Security-Technote/)

- canOpenURLを使うために
    
``` xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>scheme</string>
</array>
```

- iPadのSplit Viewに対応しないように

``` xml
<key>UIRequiresFullScreen</key>
<true/>
```

- 3D Touchでホーム画面のアイコンにメニューを追加のために

``` xml
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
