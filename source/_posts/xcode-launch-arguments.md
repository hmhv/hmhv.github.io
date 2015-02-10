title: Xcodeの有用な起動時引数
category:
  - Tech
toc: true
date: 2015-02-10 21:00:00
tags:
- iOS
- Xcode
---
## CoreData関連

#### 実行するSQL文をログで出力

> -com.apple.CoreData.SQLDebug [1,2,3]
> 1,2,3は大きくなるほど詳細情報を出力

#### マルチスレッド時のデバッグ

> -com.apple.CoreData.ConcurrencyDebug 1
> [Qiita投稿：CoreDataによる並列処理](http://qiita.com/hongmhoon/items/606a352b1e96dfb0bec5)

## ローカライズ関連

#### 端末の基本言語設定を上書き

> -AppleLanguages (en)

#### 端末のロケール基本を上書き

> -AppleLocale en_US

#### GUI上の文字列を２倍に表示して長い文字列の表示確認

> -NSDoubleLocalizedStrings YES



|言語|国コード|
|------|---|
|日本語    |ja|
|英語（アメリカ）|    en|
|フランス語 |  fr|
|ドイツ語    |de|
|オランダ語   |nl|
|イタリア語   |it|
|スペイン語   |es|
|ポルトガル語 | pt|
|ポルトガル語（ポルトガル） |  pt-PT|
|デンマーク語 | da|
|フィンランド語 |fi|
|ノルウェー語 | nb|
|スウェーデン語 |sv|
|韓国語 |ko|
|中国語（簡体字） |   zh-Hans|
|中国語（繁体字）  |  zh-Hant|
|ロシア語   | ru|
|ポーランド語 | pl|
|トルコ語   | tr|
|ウクライナ語  |uk|
|アラビア語   |ar|
|クロアチア語 | hr|
|チェコ語   | cs|
|ギリシャ語  | el|
|ヘブライ語  | he|
|ルーマニア語 | ro|
|スロバキア語 | sk|
|タイ語 |th|
|インドネシア語 |id|
|マレー語   | ms|
|英語（イギリス）|    en-GB|
|カタロニア語  |ca|
|ハンガリー語 | hu|
|ベトナム語  | vi|


|言語(国)|ロケール|
|------|---|
|日本語（日本） | ja_JP|
|英語（アメリカ）  |  en_US|
|英語（イギリス） |   en_GB|
|英語（カナダ）| en_CA|
|中国語（シンガポール）| zh_SG|
|中国語（台湾）| zh_TW|
|中国語（マカオ特別行政区）|   zh_MO|
|中国語（香港特別行政区） |   zh_HK|
|中国語（中国）| zh_CN|
|韓国語（韓国）| ko_KR|
|イタリア語（イタリア）| it_IT|
|オランダ語（オランダ）| nl_NL|
|スペイン語（スペイン）| es_ES|
|タイ語（タイ）| th_TH|
|ドイツ語（ドイツ）|   de_DE|
|フランス語（フランス）| fr_FR|
|ロシア語（ロシア） |  ru_RU|


[＊コード参考：tools4hack](http://tools4hack.santalab.me/howto-change-app-language-and-locate-for-jailbreak-ifile.html)

