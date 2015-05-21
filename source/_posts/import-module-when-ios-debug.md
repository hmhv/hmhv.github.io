title: iOSデバッグ時のモジュールインポート
category:
  - Tech
date: 2015-05-18 14:08:09
tags:
- iOS
- debug
---
iOSデバッグ時にたまに直面する問題

```
(lldb) p self.view.window.bounds
error: property 'bounds' not found on object of type 'id'
error: 1 errors parsing expression
```

これは型情報がなくて発生するようで以下のようにすれば表示できる

```
(lldb) p (CGRect)[self.view.window bounds]
(CGRect) $0 = (origin = (x = 0, y = 0), size = (width = 320, height = 568))
```

でもXcode6.3からはモジュールのインポートでも解決できる

```
(lldb) p @import UIKit
(lldb) p self.view.window.bounds
(CGRect) $1 = (origin = (x = 0, y = 0), size = (width = 320, height = 568))
```

参考：http://furbo.org/2015/05/11/an-import-ant-change-in-xcode/

この内容はqiitaにも投稿しました。
http://qiita.com/hongmhoon/items/1759e9e5c8d637c60c7f