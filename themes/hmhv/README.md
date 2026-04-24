# hexo-theme-hmhv

> まぶしい、青春の記録。  
> A pastel-modern personal blog theme for [Hexo](https://hexo.io/).

Quiet, diary-style blog layout with a sun-washed pastel palette, Japanese-first
typography (Zen Kaku Gothic New / Shippori Mincho / Outfit), apricot marker
highlights, and soft pinned feature cards.

![theme preview](source/images/logo-mark.svg)

---

## Install

From your Hexo site root:

```bash
cd themes/
git clone <this-repo-url> hmhv
# or: npm install hexo-theme-hmhv
```

Then in your site's `_config.yml`:

```yaml
theme: hmhv
language: ja
```

Run `hexo clean && hexo generate && hexo server`.

---

## Layouts

| layout        | used for                                    |
| ------------- | ------------------------------------------- |
| `index`       | `/` + paginated home listings               |
| `post`        | individual blog posts                       |
| `page`        | static pages (`source/about/index.md`, …)   |
| `archive`     | `/archives/`                                |
| `tag`         | `/tags/<name>/`                             |
| `category`    | `/categories/<name>/`                       |

Partials live in `layout/_partial/`:
`head`, `header`, `footer`, `hero`, `pinned`, `article`.

---

## Configure

Copy `_config.yml` from this theme into your site's `_config.hmhv.yml`
(Hexo will merge it automatically), then edit:

```yaml
# Site identity shown in the hero
site:
  brand: hmhv
  hero_title: '<span class="mk">まぶしい</span>、<br>青春の記録。'
  hero_eyebrow: 'hmhv blog —'
  hero_sub: 'a record of dazzling youth — 気まぐれに更新します。'
  hero_volume: '2026 · vol.07'       # top-right stamp, leave blank to hide

menu:
  home:    /
  archive: /archives/
  about:   /about/
  rss:     /atom.xml

social:
  twitter:   https://twitter.com/…
  instagram: https://instagram.com/…
  rss:       /atom.xml
  email:     mailto:you@example.com

home:
  hero: true                # big hero block on /
  pinned_post: welcome      # slug of a post to feature above recent list
  show_tag_cloud: true

post:
  show_nav: true            # prev / next card pair at bottom
  show_read_time: true
  read_time_cpm: 500        # characters per minute for read-time estimate

# Map tag → chip color variant (sky / sun / blush / mint / lilac)
tag_chip:
  summer: sun
  photos: sky
  diary:  blush
  tokyo:  lilac
  notes:  mint

logo:    /images/logo-mark.svg
favicon: /images/favicon.svg
```

All keys have sensible defaults — nothing is strictly required.

---

## Writing posts

Standard Hexo front-matter:

```yaml
---
title: July, again — the year the cicadas came early
date: 2026-07-14 15:00
tags: [summer]
---

午後3時。図書館の帰り道で、今年はじめての蝉の声を聞いた。

> 眩しすぎて目を細める、あの夏のことを、まだ覚えている。
```

Inline formatting hints:

- `<span class="mk">word</span>` — apricot marker highlight on keywords
- `<span class="marker">word</span>` — same treatment inside section heads
- Standard Markdown `>` quotes render as apricot-border pull quotes
- The first tag is used for the chip on cards & post headers

---

## Customizing the type / palette

The whole design is driven by CSS variables declared at the top of
`source/css/style.css`. Edit them in place (or override in a sibling
`source/css/custom.css` loaded from `_partial/head.ejs`):

```css
:root {
  --pastel-sky:      #a8d8ff;
  --pastel-apricot:  #ffb36b;
  --pastel-blush:    #ffc6d3;
  --pastel-mint:     #b9ecd4;
  --pastel-lilac:    #d9c7ff;
  --ink:             #2d3a4f;
  --bg:              #fbfaf7;

  --font-jp:         'Zen Kaku Gothic New', sans-serif;
  --font-jp-serif:   'Shippori Mincho', serif;
  --font-latin:      'Outfit', system-ui, sans-serif;
  --font-mono:       'JetBrains Mono', monospace;
}
```

Google Fonts families are loaded from `_config.yml > fonts.families` — swap
them for whatever you like (the stack falls back to Hiragino / Yu Gothic).

---

## Preview

A static preview of the rendered output — identical markup, rendered with
Hexo-generated data mocked inline — is in `preview/index.html`.

---

## License

MIT
