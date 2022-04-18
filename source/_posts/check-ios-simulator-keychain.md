title: iOSシミュレーターのキーチェーン情報削除
category:
  - Tech
tags:
  - iOS
  - Simulator
  - Keychain
  - TablePlus
date: 2022-04-18 20:55:26
---

何かしらの理由でiOSシミュレーターのキーチェーン情報を削除したい時のためのメモ

### シミュレーターのUUIDを取得

``` bash
xcrun simctl list | egrep '(Booted)'
    iPhone 13 Pro Max (シミュレーターのUUID) (Booted)
    Phone: iPhone 13 Pro Max (シミュレーターのUUID) (Booted)
```

### ファイル確認

キーチェーン情報は`SQLite`のファイルとして保存されている

パス：`~/Library/Developer/CoreSimulator/Devices/(シミュレーターのUUID)/data/Library/Keychains`
ファイル名：`keychain-2-debug.db`

``` bash
la ~/Library/Developer/CoreSimulator/Devices/(シミュレーターのUUID)/data/Library/Keychains
total 5832
drwxrwxrwx  17 u1  staff   544B Apr  8 08:12 Analytics
-rw-------@  1 u1  staff   788K Apr 17 10:50 keychain-2-debug.db
-rw-------   1 u1  staff    32K Apr 17 10:49 keychain-2-debug.db-shm
-rw-------   1 u1  staff   1.2M Apr 18 20:50 keychain-2-debug.db-wal
```

### ファイルを開く

- sqlite3で開く

``` bash
sqlite3 ~/Library/Developer/CoreSimulator/Devices/(シミュレーターのUUID)/data/Library/Keychains.keychain-2-debug.db
SQLite version 3.37.0 2021-12-09 01:34:53
Enter ".help" for usage hints.
sqlite>
```

- [`TablePlus`](https://tableplus.com/)で開く

> `TablePlus`のインストールは`brew install --cask tableplus`

``` bash
open ~/Library/Developer/CoreSimulator/Devices/(シミュレーターのUUID)/data/Library/Keychains/keychain-2-debug.db
```

<a class="fancybox" rel="gallery0"><img src="../../../images/simulator-keychain.png" style="max-width: 100%"></a>

### 情報の削除

キーチェーン情報はテーブル`genp`に保存されて、カラム`agrp`に書き込んだアプリのバンドルIDがあるのでそこを参考に削除可能

```sql
DELETE FROM genp WHERE agrp = 'TEAMID.com.your.app.bundle.id';
```

<a class="fancybox" rel="gallery0"><img src="../../../images/simulator-keychain2.png" style="max-width: 100%"></a>



参考：https://stackoverflow.com/a/42564772