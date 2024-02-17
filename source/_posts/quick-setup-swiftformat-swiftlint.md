title: 新規プロジェクトでSwiftFormatとSwiftLintを最短で設定する方法
category:
  - Tech
tags:
  - iOS
  - SwiftFormat
  - SwiftLint
  - Xcode
date: 2023-08-29 11:18:58
---
- [SwiftFormat](https://github.com/nicklockwood/SwiftFormat)
- [SwiftLint](https://github.com/realm/SwiftLint)

`Build Phases`で`New Run Script Phase`を追加して以下のコードをコピーしてビルドするだけ

```sh
if [ ! -e .swiftformat ]; then
    touch .swiftformat
fi

if [ "${CONFIGURATION}" = "Debug" ] && [ "${ENABLE_PREVIEWS}" = "NO" ]; then
    if [ ! -e swiftformat.0.53.1 ]; then
        curl -OL https://github.com/nicklockwood/SwiftFormat/releases/download/0.53.1/swiftformat.zip
        unzip swiftformat.zip
        mv swiftformat swiftformat.0.53.1
        rm swiftformat.zip
    fi

    ./swiftformat.0.53.1 --cache ignore --swiftversion 5.9 .
else 
    echo "swiftformat in skipped"
fi

if [ ! -e .swiftlint.yml ]; then
    touch .swiftlint.yml
fi

if [ "${CONFIGURATION}" = "Debug" ] && [ "${ENABLE_PREVIEWS}" = "NO" ]; then
    if [ ! -e swiftlint.0.54.0 ]; then
        curl -OL https://github.com/realm/SwiftLint/releases/download/0.54.0/portable_swiftlint.zip
        unzip portable_swiftlint.zip swiftlint
        mv swiftlint swiftlint.0.54.0
        rm portable_swiftlint.zip
    fi

    ./swiftlint.0.54.0 --no-cache
else 
    echo "swiftlint in skipped"
fi
```

もし権限エラー発生時は`Build Settings`で`ENABLE_USER_SCRIPT_SANDBOXING`を`NO`に設定

> `touch: .swiftformat: Operation not permitted`

