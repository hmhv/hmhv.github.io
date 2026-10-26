# hmhv.github.io

Hexo のブログ（テーマは `themes/hmhv`）。`basecode` に push すると GitHub Actions が `master` に公開する。

## 記事を書く

- `source/_posts/<英小文字とハイフンの名前>.md` を作る。URL は `/年/月/<名前>/`。
- 先頭は README.md のひな形（title / category / tags / date）。
- 画像は記事と同じ名前のフォルダ（`source/_posts/<名前>/`）に置く。
- `pnpm hb` で書き出しが通ることを確かめる。手元で見るときは `python3 -m http.server -d public 4000`。

## アプリ紹介

- `source/apps/<名前>/index.md`（`layout: app`）。front matter は title / subtitle / description / icon / appstore / screenshots / privacy。本文は App Store の説明文から書く。
- `/apps/<名前>/` は App Store からリンクされているので URL を変えない。
- アイコンは `source/images/<名前>.png`（114px）、スクリーンショットは App Store の iPhone 用を `source/images/apps/<名前>-<番号>.jpg`（幅460px）に保存する。
- iPhone Duo のスクリーンショットは front matter の `duo_screenshots` に書く。元は各アプリのリポジトリの `.simpilot/releases/<最新>/store/output/ja/ja-duo-inner-*.png`（開いた画面だけ）で、`source/images/apps/<名前>-duo-<番号>.jpg`（高さ999px）に保存する。
- 一覧 `source/apps/index.html` にも足す。
- 版・評価・価格など、アプリの更新で変わる情報は載せない（利用者の指定）。
