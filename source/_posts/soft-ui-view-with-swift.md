title: Soft-UI(Neumorphism)をSwiftで作って見る
category:
  - Tech
tags:
  - iOS
  - Soft-UI
  - Neumorphism
date: 2020-02-08 23:06:30
---
### 1. Soft-UI(Neumorphism)とは

New skeuomorphismというUI designの新しいトレンドっぽい
[Soft-UI(Neumorphism)](https://uxdesign.cc/neumorphism-in-user-interfaces-b47cef3bf3a6)

<a class="fancybox" rel="gallery0"><img src="https://miro.medium.com/max/2644/1*BO4cJTJyGovxXwaNJRoS-w.jpeg" style="max-width: 100%"></a>

<a class="fancybox" rel="gallery0"><img src="https://raw.githubusercontent.com/hmhv/SoftUIView/master/assets/softuiview.png" style="max-width: 100%"></a>


### 2. コード実装

基本凸を表示するためにOuter Shadowを２つ、凹を表示するためにInner Shadowを２つ作って実装

#### Outer Shadow

Outer ShadowはCAShapeLayerでcornerRadiusに合わせたpathで影を作る
shadowColorとshadowOffsetを逆にして２つ作る

```swift
lightOuterShadowLayer = {
    let shadowLayer = createOuterShadowLayer(shadowColor: lightShadowColor, shadowOffset: shadowOffset.inverse)
    layer.addSublayer(shadowLayer)
    return shadowLayer
}()
darkOuterShadowLayer.path = createOuterShadowPath()

darkOuterShadowLayer = {
    let shadowLayer = createOuterShadowLayer(shadowColor: darkShadowColor, shadowOffset: shadowOffset)
    layer.addSublayer(shadowLayer)
    return shadowLayer
}()
lightOuterShadowLayer.path = createOuterShadowPath()


func createOuterShadowLayer(shadowColor: CGColor, shadowOffset: CGSize) -> CAShapeLayer {
    let layer = CAShapeLayer()
    layer.backgroundColor = UIColor.clear.cgColor
    layer.fillColor = mainColor
    layer.shadowColor = shadowColor
    layer.shadowOffset = shadowOffset
    layer.shadowOpacity = shadowOpacity
    layer.shadowRadius = shadowRadius
    return layer
}

func createOuterShadowPath() -> CGPath {
    return UIBezierPath(roundedRect: bounds, cornerRadius: cornerRadius).cgPath
}
```
#### Inner Shadow

Inner ShadowもCAShapeLayerでcornerRadiusに合わせたpathとより大きいpathを合わせて影を作りmaskで外側には表示されないようにする
shadowColorとshadowOffsetを逆にして２つ作る

```swift

darkInnerShadowLayer = {
    let shadowLayer = createInnerShadowLayer(shadowColor: darkShadowColor, shadowOffset: shadowOffset)
    layer.addSublayer(shadowLayer)
    shadowLayer.isHidden = true
    return shadowLayer
}()
darkInnerShadowLayer.path = createInnerShadowPath()
darkInnerShadowLayer.mask = createInnerShadowMask()

lightInnerShadowLayer = {
    let shadowLayer = createInnerShadowLayer(shadowColor: lightShadowColor, shadowOffset: shadowOffset.inverse)
    layer.addSublayer(shadowLayer)
    shadowLayer.isHidden = true
    return shadowLayer
}()
lightInnerShadowLayer.path = createInnerShadowPath()
lightInnerShadowLayer.mask = createInnerShadowMask()

func createInnerShadowLayer(shadowColor: CGColor, shadowOffset: CGSize) -> CAShapeLayer {
    let layer = CAShapeLayer()
    layer.backgroundColor = UIColor.clear.cgColor
    layer.fillColor = mainColor
    layer.shadowColor = shadowColor
    layer.shadowOffset = shadowOffset
    layer.shadowOpacity = shadowOpacity
    layer.shadowRadius = shadowRadius
    layer.fillRule = .evenOdd
    return layer
}

func createInnerShadowPath() -> CGPath {
    let path = UIBezierPath(roundedRect: bounds.insetBy(dx: -100, dy: -100), cornerRadius: cornerRadius)
    path.append(UIBezierPath(roundedRect: bounds, cornerRadius: cornerRadius))
    return path.cgPath
}

func createInnerShadowMask() -> CALayer {
    let layer = CAShapeLayer()
    layer.path = UIBezierPath(roundedRect: bounds, cornerRadius: cornerRadius).cgPath
    return layer
}
```

#### Example

全ソースコードはこちらに
https://github.com/hmhv/SoftUIView

<a class="fancybox" rel="gallery0"><img src="https://raw.githubusercontent.com/hmhv/SoftUIView/master/assets/softuiview.gif" style="max-width: 100%"></a>

### 参考
https://neumorphism.io/#55b9f3
