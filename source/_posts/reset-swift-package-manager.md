title: Swift Package Manager(SPM)のキャッシュをリセット
category:
  - Tech
tags:
  - iOS
  - SPM
  - SwiftPM
  - binaryTarget
  - checksum
  - Cache
  - Reset
date: 2022-07-13 20:59:06
---
Swift Package Manager(SPM)の`Package.swift`に追加した`binaryTarget`が同じバージョンのまま変更された場合、`checksum`が違うのでダウンロードできなくなる。

```
.binaryTarget(name: "XXXX",
              url: "https://github.com/xxx/xxx-ios/releases/download/x.x.x/xxxxx.zip",
              checksum: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
```

あれこれ個別に削除してもダメで、以下のフォルダーを全部削除したらなおった。

```
rm -rf ~/Developer/Xcode/DerivedData
rm -rf ~/Library/Caches/org.swift.swiftpm
rm -rf ~/Library/org.swift.swiftpm
rm -rf (Package)/.build
rm -rf (Package)/.swiftpm
```
