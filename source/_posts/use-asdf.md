title: asdfを使ってみる
category:
  - Tech
tags:
  - asdf
date: 2022-04-16 21:05:10
---
昨日新しいMacに`ruby`のインストールのため`chruby`を利用したことを[iOS開発環境作成のためのRuby設定](https://hmhv.info/2022/04/setup-ruby-for-ios/)で書いたけど`nodejs`や`python`もまた個別のバージョン管理ツールを導入しようとすると面倒くさくなり、以前聞いたことのある一つのツールで色々な言語のバージョン管理ができる[anyenv](https://github.com/anyenv/anyenv)調べてみると今は[asdf](https://github.com/asdf-vm/asdf)の方がもっと使われてるっぽいので`asdf`を使って`ruby`, `nodejs`, `python`を入れてみたのでメモ。

## `asdf`をインストール

いつもの`brew`で行う。

```bash
brew install asdf
```

`asdf`のインストール後の初期設定

```bash
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ${ZDOTDIR:-~}/.zshrc
```

`asdf`は基本`.tool-versions`というファイルでバージョンを指定するけど、設定によっては`.ruby-version`や`.node-version`などのファイルからも可能なようなのでその設定もやっておく

```bash
echo "legacy_version_file = yes" >> $HOME/.asdfrc
```


## `ruby`をインストール

`asdf`はインストールしたい言語がある場合、その言語のプラグインをインストールする必要があるので`ruby`用プラグイン[asdf-ruby](https://github.com/asdf-vm/asdf-ruby)をまずインストールする

>  各言語のプラグインのインストールには依存関係があって先にそれらのインストールが必要な場合があるのでREADMEの確認が必要で`asdf-ruby`の場合は以下が必要
>
>```bash
>brew install openssl@1.1 readline
>export RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl@1.1)"
>```


```bash
asdf plugin add ruby
```

その後`ruby`のバージョン`3.1.2`と`2.7.6`をインストール

```bash
asdf install ruby 3.1.2
asdf install ruby 2.7.6
```

グローバルで利用する`ruby`のバージョンを`3.1.2`で指定

```bash
asdf global ruby 3.1.2
```

各フォルダで利用する`ruby`のバージョンは`local`を利用して指定

```bash
asdf local ruby 2.7.6
```
## `nodejs`をインストール

`nodejs`もまず`nodejs`用プラグイン[asdf-nodejs](https://github.com/asdf-vm/asdf-nodejs)をインストールする

```bash
asdf plugin add nodejs
```

その後`nodejs`のバージョン`16.4.2`をインストール

```bash
asdf install nodejs 16.4.2
```

グローバルで利用する`nodejs`のバージョンを`16.4.2`で指定

```bash
asdf global nodejs 16.4.2
```

## `python`をインストール

`python`もまず`python`用プラグイン[asdf-python](https://github.com/danhper/asdf-python)をインストールする

```bash
asdf plugin add python
```

その後`python`のバージョン`3.10.4`をインストール

```bash
asdf install python 3.10.4
```

グローバルで利用する`python`のバージョンを`3.10.4`で指定

```bash
asdf global nodejs 3.10.4
```

## グローバル設定を確認

ホームフォルダの`.tool-versions`を確認すると各言語のバージョンが確認できる

```bash
cat ~/.tool-versions
ruby 3.1.2
python 3.10.4
nodejs 16.4.2
```

また各言語のバージョンを直接確認

```bash
ruby -v
ruby 3.1.2p20 (2022-04-12 revision 4491bb740a) [x86_64-darwin21]

node -v
v16.4.2

python -V
Python 3.10.4
```

## `asdf`の他の使用例

利用可能なプラグインのリストを確認

```bash
asdf plugin list all
```

> 数が多いので確認したい言語がある場合は`grep`で絞る
> ```bash
> asdf plugin list all | grep ruby
> ruby                         *https://github.com/asdf-vm/asdf-ruby.git
> ```

インストール済みプラグインの更新

```bash
asdf plugin update --all
```

インストール済み言語のバージョンの確認

```bash
asdf list
nodejs
  16.4.2
python
  3.10.4
ruby
  2.7.6
  3.1.2
```

インストール済み言語の特定バージョンの削除

```bash
asdf uninstall ruby 3.1.2
```

最後に`asdf`は言語のみではなく[awscli](https://github.com/MetricMike/asdf-awscli)などのツールのバージョン管理もできるらしい、
