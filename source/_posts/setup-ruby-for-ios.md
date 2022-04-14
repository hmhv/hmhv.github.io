title: iOS開発環境作成のためのRuby設定
category:
  - Tech
tags:
  - iOS
  - CocoaPods
  - fastlane
  - chruby
  - ruby-install
date: 2022-04-14 23:03:50
---

# 概要

新しいMacにiOS開発環境を作成するのにRubyの準備をするの好きではないが、iOS開発で多くのプロジェクトが[CocoaPods](https://cocoapods.org/)や[fastlane](https://docs.fastlane.tools/)などの利用のためRubyを必要とする。それも同じバージョンで、

もし複数のプロジェクトが違うRubyバージョンを使って開発を行っている場合は複数のRubyバージョンのインストールと各プロジェクトで適切なRubyバージョンを利用できるようにする必要がある。

今までは[rbenv](https://github.com/rbenv/rbenv)で適当にやって来たけど、新しい環境では[chruby](https://github.com/postmodern/chruby/)と[ruby-install](https://github.com/postmodern/ruby-install/)を使うのでちょっと使い方をメモしておく。


# [chruby](https://github.com/postmodern/chruby/)と[ruby-install](https://github.com/postmodern/ruby-install/)のインストール

Homebrewを利用して行う。
```bash
$ brew install chruby ruby-install
```

# Rubyのインストール

ruby-installを利用してフルバージョンまたはマイナーバージョンまでを指定して行う。

```bash
$ ruby-install ruby 2.7.6
または
$ ruby-install ruby 2.7
```

ちなみにアンインストールはフォルダーの削除で行う。

```bash
$ rm -rf ~/.rubies/ruby-2.7.6
```

# chrubyの設定

chrubyはインストール後利用する前に設定が必要なので`brew info chruby`の結果を確認して自分のシェル設定ファイルに`chruby.sh`と`auto.sh`追加しておく

```bash
$ brew info chruby
chruby: stable 0.3.9 (bottled), HEAD
Ruby environment tool
https://github.com/postmodern/chruby#readme
/usr/local/Cellar/chruby/0.3.9 (12 files, 51.2KB) *
  Poured from bottle on 2022-04-14 at 22:05:29
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/chruby.rb
License: MIT
==> Options
--HEAD
	Install HEAD version
==> Caveats
Add the following to the ~/.bash_profile or ~/.zshrc file:
  source /usr/local/opt/chruby/share/chruby/chruby.sh

To enable auto-switching of Rubies specified by .ruby-version files,
add the following to ~/.bash_profile or ~/.zshrc:
  source /usr/local/opt/chruby/share/chruby/auto.sh
==> Analytics
install: 4,390 (30 days), 11,324 (90 days), 33,170 (365 days)
install-on-request: 4,377 (30 days), 11,291 (90 days), 33,047 (365 days)
build-error: 0 (30 days)
```

一応シェル設定ファイル編集後は再起動
```bash
exec $SHELL -l
```


# chrubyの利用

### インストール済みのRubyバージョンの確認

```bash
$ chruby
   ruby-2.7.6
 * ruby-3.1.2

$ ruby -v
ruby 3.1.2p20 (2022-04-12 revision 4491bb740a) [x86_64-darwin21]
```

### Rubyバージョンの指定

```bash
$ chruby 2.7

$ chruby
 * ruby-2.7.6
   ruby-3.1.2

$ ruby -v
ruby 2.7.6p219 (2022-04-12 revision c9c2245c0a) [x86_64-darwin21]
```

もちろんフォルダーに`.ruby-version`でRubyバージョンの記入があれば`auto.sh`が自動で設定してくれる
```bash
To enable auto-switching of Rubies specified by .ruby-version files,
add the following to ~/.bash_profile or ~/.zshrc:
  source /usr/local/opt/chruby/share/chruby/auto.sh
```