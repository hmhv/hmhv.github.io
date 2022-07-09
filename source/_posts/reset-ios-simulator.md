title: iOSシミュレーターとコピペができなくなった時対応方法
category:
  - Tech
tags:
  - iOS
  - Simulator
  - Copy
  - Paste
date: 2022-07-09 22:18:58
---
いつからかMacとiOSシミュレーターの間でコピペができなくなった。
色々調べても古い`automatically sync pasteboard`関連の内容ばかりで解決策は見つからなかったが、

[TwitterでiOSシミュレーターの問題を解決する方法](https://twitter.com/JoshHrach/status/1544937152521203712)を発見したので試したらiOSシミュレーターとコピペができるようになった。

1. `/Library/Developer/PrivateFrameworks/CoreSimulator.framework` を削除
2. Macを再起動
3. Xcodeを起動

これで`CoreSimulator.framework`が再インストールされてiOSシミュレーターの問題が解決できる。（場合がある？）
