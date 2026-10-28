title: iOSシミュレータのタイムゾーンを変える方法
category:
  - Tech
tags:
  - iOS
  - Xcode
  - Simulator
date: 2026-10-28 21:30:00
---

iOSシミュレータの設定アプリには「日付と時刻」がない。タイムゾーンは、起動するプロセスに環境変数 `TZ` を渡して切り替える。渡し方は4つあり、効く範囲と戻し方が違う。

| 方法 | 効く範囲 | ステータスバー |
| --- | --- | --- |
| Xcodeのスキーム | XcodeからRunしたアプリ | 変わらない |
| `simctl launch` | そのコマンドで起動したアプリ | 変わらない |
| `launchctl setenv` | 以後に起動するアプリ（アイコンからの起動を含む） | 変わらない |
| `simctl boot` | SpringBoardとアプリ全体 | 変わる |

検証環境：Xcode 27.2 / iOS 27.2シミュレータ（iPhone 18 Pro）

## 1. Xcodeのスキーム

**Product → Scheme → Edit Scheme… → Run → Arguments → Environment Variables** に追加する。

| Name | Value |
| --- | --- |
| `TZ` | `Pacific/Honolulu` |

Runするたびにアプリへ渡る。戻すには、行のチェックを外してRunし直す。

UIテストでは、操作対象のアプリに `launchEnvironment` で渡す。

```swift
let app = XCUIApplication()
app.launchEnvironment["TZ"] = "Pacific/Honolulu"
app.launch()
```

## 2. simctl launch：アプリだけ変える

```sh
SIMCTL_CHILD_TZ=Pacific/Honolulu \
  xcrun simctl launch --terminate-running-process booted com.example.app
```

`SIMCTL_CHILD_` で始まる環境変数は、接頭辞を外して起動先に渡される。既存のプロセスには新しい環境変数が入らないため、`--terminate-running-process` で終了してから起動し直す。

戻すには、`TZ` を付けずに同じコマンドで起動し直す。

```sh
xcrun simctl launch --terminate-running-process booted com.example.app
```

## 3. launchctl setenv：以後に起動するアプリへ渡す

```sh
xcrun simctl spawn booted launchctl setenv TZ Pacific/Honolulu
```

設定後に起動したアプリには、ホーム画面のアイコンから起動した場合も含めて `TZ` が渡る。設定前から動いているアプリは、終了して起動し直すまで変わらない。

戻すには、`unsetenv` してからアプリを起動し直す。シミュレータをshutdownしても消える。

```sh
xcrun simctl spawn booted launchctl unsetenv TZ
```

## 4. simctl boot：ステータスバーも変える

```sh
xcrun simctl shutdown <UDID>
SIMCTL_CHILD_TZ=Pacific/Honolulu xcrun simctl boot <UDID>
xcrun simctl bootstatus <UDID> -b
```

起動時に渡すと、SpringBoardにも `TZ` が入り、ステータスバーの時刻も変わる。停止中のシミュレータは `booted` で指定できないため、UDIDを使う（`xcrun simctl list devices` で確認できる）。

このとき `launchctl getenv TZ` は空を返し、`unsetenv` しても外れない。戻すには、`TZ` を付けずに `shutdown` → `boot` する。

## 効いたかの確認

ステータスバーではなく、アプリ側の値で確認する。

```swift
print(ProcessInfo.processInfo.environment["TZ"] ?? "<unset>")
print(TimeZone.current.identifier)
```

## 注意

どの方法も「別のタイムゾーンで起動した」状態を作るだけで、起動中に時間帯が変わる状況は再現しない。`NSSystemTimeZoneDidChange` の受け取りなどは実機で確認する。
