# hmhv.github.io

Hexo のブログ（テーマは `themes/hmhv`）。`basecode` に push すると GitHub Actions が `master` に公開する。

## 記事を書く

- `source/_posts/<英小文字とハイフンの名前>.md` を作る。URL は `/年/月/<名前>/`。
- 先頭は README.md のひな形（title / category / tags / date）。
- 画像は記事と同じ名前のフォルダ（`source/_posts/<名前>/`）に置く。
- `pnpm hb` で書き出しが通ることを確かめる。手元で見るときは `python3 -m http.server -d public 4000`。
