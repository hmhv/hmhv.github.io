title: 自作ライブラリをCocoaPodsへ登録
category:
  - Tech
date: 2015-02-28 02:00:17
tags:
- CocoaPods
- HobjectiveRecord
---
[HobjectiveRecord](https://github.com/hmhv/HobjectiveRecord)と言うCoreData用のライブラリをGitHubに公開して
CocoaPodsにも登録を行ったのでそのメモ

## GitHub上のファイル構造

<a title="folder" class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/47126434-e7bd-de68-7db3-16f564ae9be8.png" style="max-width: 100%"  alt="folder"></a>

- `HobjectiveRecord`はライブラリのコード用フォルダ
- `HobjectiveRecordDemo`はライブラリのデモアプリ用フォルダ
- `.gitignore`, `LICENSE`, `README.md`は定番ファイル
- `HobjectiveRecord.podspec` これがCocoaPodsに登録するために用意するファイル

## CocoaPodsへの登録手順


> **_以前は[CocoaPodsのSpecs](https://github.com/CocoaPods/Specs)にプルリクで行っていたようだが_**
> **_今は`pod trunk`コマンドで行うようになっている_**


#### 1. `podspec`ファイルの作成

今回は`HobjectiveRecord.podspec`

``` bash
 $ pod spec create HobjectiveRecord
```

#### 2. `podspec`ファイルの編集

今回はFork元の[ObjectiveRecord](https://github.com/supermarin/ObjectiveRecord)から流用
詳細は[ここを参考](http://guides.cocoapods.org/making/specs-and-specs-repo.html)

``` ruby
@version = "0.1.4"
Pod::Spec.new do |s|
  s.name         = "HobjectiveRecord"
  s.version      = @version
  s.summary      = "Lightweight and sexy CoreData Library. using NSPrivateQueueConcurrencyType MOC and [performBlock:]"
  s.homepage     = "https://github.com/hmhv/HobjectiveRecord"
  s.license      = { :type => 'MIT', :file => 'LICENSE' }
  s.author       = { "hmhv" => "admin@hmhv.info" }
  s.source       = { :git => "https://github.com/hmhv/HobjectiveRecord.git", :tag => @version }
  s.source_files = 'HobjectiveRecord/**/*.{h,m}'
  s.framework  = 'CoreData'
  s.requires_arc = true
  s.ios.deployment_target = '6.0'
end
```

#### 3. `podspec`ファイルのチェック

``` bash
$ pod spec lint
```

#### 4. ユーザ登録(端末登録？)

詳細は[ここを参考](http://guides.cocoapods.org/making/getting-setup-with-trunk.html)


``` bash
$ pod trunk register your@email.com 'your name' --description='my macbook'
```

#### 5. 登録の確認

登録時のメアドへ確認のメールが来るのでそのメールで確認を行う。
その後以下のコマンドでターミナルでも確認できる。

``` bash
$ pod trunk me
```

#### 6. `podspec`ファイルのプッシュ

``` bash
$ pod trunk push
```

これで作成した`podspec`ファイルが`podspec.json`ファイルに変換されて
[CocoaPodsのSpecs](https://github.com/CocoaPods/Specs)に登録される。

後はライブラリを使いたいプロジェクトの`Podfile`に`pod 'HobjectiveRecord'`を追加すると利用可能になる。


> **_バージョンアップも上の登録手順と同じ_**

