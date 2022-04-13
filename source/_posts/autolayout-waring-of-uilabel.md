title: UILableのAutoLayoutの警告と回避策
category:
  - Tech
date: 2015-02-24 15:02:05
tags:
- iOS
- AutoLayout
---
#### 警告内容

<a title="sb_warning.png" class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/c4482da0-5959-5459-18c4-bb15877ec887.png" style="max-width: 100%"  alt="sb_warning.png"></a>

```
Main.storyboard: warning: Attribute Unavailable: Automatic Preferred Max Layout Width is not available on iOS versions prior to 8.0
```
　

#### 発生条件

iOSのターゲットが８未満で
LabelのLines(numberOfLines)が1以外でPreferred Width(preferredMaxLayoutWidth)が未設定の場合



　
#### 回避策

Lines(numberOfLines)を1にするかPreferred Width(preferredMaxLayoutWidth)を明示的に指定する。



<a title="sb_warning.png" class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/53357fba-c4c2-a5b8-1d89-847aba09df34.png" style="max-width: 100%" alt="sb_warning.png"></a>


[参考：preferredMaxLayoutWidth](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UILabel_Class/index.html#//apple_ref/occ/instp/UILabel/preferredMaxLayoutWidth)
