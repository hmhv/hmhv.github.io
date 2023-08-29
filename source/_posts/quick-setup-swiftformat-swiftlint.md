title: SwiftFormatとSwiftLintを最短で設定する方法
category:
  - Tech
tags:
  - iOS
  - SwiftFormat
  - SwiftLint
  - Xcode
date: 2023-08-29 11:18:58
---
[SwiftFormat](https://github.com/nicklockwood/SwiftFormat)と[SwiftLint](https://github.com/realm/SwiftLint)をシュッと設定

`Build Phases`で`New Run Script Phase`を追加して以下のコードをコピーしてビルドするだけ

```sh
if [ ! -e .swiftformat ]; then
    touch .swiftformat
fi

if [ "${CONFIGURATION}" = "Debug" ] && [ "${ENABLE_PREVIEWS}" = "NO" ]; then
    if [ ! -e swiftformat ]; then
        curl -OL https://github.com/nicklockwood/SwiftFormat/releases/download/0.52.2/swiftformat.zip
        unzip swiftformat.zip
        rm swiftformat.zip
    fi

    ./swiftformat --cache ignore --swiftversion 5.8 .
else 
    echo "swiftformat in skipped"
fi

if [ ! -e .swiftlint.yml ]; then
    touch .swiftlint.yml
fi

if [ "${CONFIGURATION}" = "Debug" ] && [ "${ENABLE_PREVIEWS}" = "NO" ]; then
    if [ ! -e swiftlint ]; then
        curl -OL https://github.com/realm/SwiftLint/releases/download/0.52.4/portable_swiftlint.zip
        unzip portable_swiftlint.zip swiftlint
        rm portable_swiftlint.zip
    fi

    ./swiftlint --no-cache
else 
    echo "swiftlint in skipped"
fi
```

- 権限エラー発生時は`Build Settings`で`ENABLE_USER_SCRIPT_SANDBOXING`をNO

> `touch: .swiftformat: Operation not permitted`

