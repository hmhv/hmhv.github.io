title: App Preview For AppStore
category:
  - Tech
date: 2015-03-29 19:03:27
tags:
- iOS
- Preview
---
#### iPhone6のみでiPhone5/6/6+のすべてのAppStore用動画プレビューを作成したときのメモ

**使ったもの**

- iPhone6 (iOS8)
- Mac (Yosemite)
- QuickTime Player
- iMovie
- ffmpeg

#### 1. QuickTime Playerの「新規ムービー収録」でiPhone6から動画クルップを作成

> 例：AppPreview.mov作成

#### 2. iMovieの「新規アプリケーションプレビュー」で上で作成した動画クルップを編集し共有で保存

> 例：AppPreview.mp4で保存

#### 3. iPhone5/6+用にffmpegで動画サイズを変換(750x1334)->(1080x1920)

``` bash
$ ffmpeg -i AppPreview.mp4 -vf "scale=-1:1920, pad=1080:1920:0:0" AppPreviewBig.mp4
```

> #### *brewでffmpegのインストール*

``` bash
$ brew doctor
$ brew install ffmpeg --with-fdk-aac --with-ffplay --with-freetype --with-frei0r --with-libass --with-libvo-aacenc --with-libvorbis --with-libvpx --with-opencore-amr --with-openjpeg --with-opus --with-rtmpdump --with-schroedinger --with-speex --with-theora --with-tools
```


#### 4. iTunes Connectにアップロード

|デバイス|　　|ファイル|
|---|---|:---:|
|iPhone5|　　|AppPreviewBig.mp4|
|iPhone6|　　|AppPreview.mp4|
|iPhone6+|　　|AppPreviewBig.mp4|

<img width="241" alt="スクリーンショット 2023-08-30 7 57 56" src="https://github.com/hmhv/hmhv.github.io/assets/10627645/cab905c5-3494-497a-9322-80078fa8713f">

[参考：App Preview](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Appendices/Properties.html#//apple_ref/doc/uid/TP40011225-CH26-SW10
)
