title: "Github Pages & Hexoでブログ開始"
category:
  - Tech
toc: true
date: 2015-02-02
tags:
- Github Pages
- Hexo
---
### Github Pagesって何？
[Github Pages](https://pages.github.com/)は[git](http://git-scm.com/book/ja/v1)のホスティングで有名な[Github](https://github.com/)が提供する無料のウェブサイトサービスだ。
容量、トラフィック、広告などの制限無しで利用できる。またカスタムURLも無料で利用可能だ。ただサーバ側の処理やデータベースなどは利用できない。

例えばユーザのウェブサイトを作る場合、自分のユーザ名を含めて`ユーザ名.github.io`というレボジトリを作って、
そのレポジトリにhtml, js, css, イメージファイルなどをアップするとその内容が`http://ユーザ名.github.io`に表示される。

また標準でruby製の[jekyll](http://jekyllrb.com/)を利用してウェブサイトやブログをより簡単に管理できる機能も提供している。

### Hexoって何？
[Hexo](http://hexo.io/)は[node.js](http://nodejs.org/)をベースに作られたブログ用フレームワークだ。
[Bootstrap](http://getbootstrap.com/)を利用したものなど色々な[テーマ](https://github.com/hexojs/hexo/wiki/themes)が利用できる。


### Github Pages & Hexoでやる理由
一番の理由は[Markdown](http://ja.wikipedia.org/wiki/Markdown)でブログを作りたかったから。
既存のブログサービスでMarkdownを利用するためには結局一度HTMLに手動で変換後作成する必要があるが、[Github Pages](https://pages.github.com/)用のブログツールは大体Markdownが利用できてそれ以外の制限も少ないように見える。
またruby製の[jekyll](http://jekyllrb.com/)や[Octopress](http://octopress.org/)などより有名で沢山使われているツールではなく[Hexo](http://hexo.io/)を選んだ理由は単純に[node.js](http://nodejs.org/)ベースのツールが使いたかったから。

参考に[Static Site Generators](https://staticsitegenerators.net/)で各言語別の静的サイトジェネレータの人気が確認できる。

Github Pages & Hexoの組み合わせでブログを運営する場合、[git](http://git-scm.com/book/ko/v1), [Github](https://github.com/), [node.js](http://nodejs.org/), [Hexo](http://hexo.io/)など開発関連の知識が必要だが既存ブログサービスよりもっと自由な運営ができそうな気がする。