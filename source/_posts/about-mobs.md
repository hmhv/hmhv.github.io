title: MobSの紹介
category:
  - Tech
tags:
  - iOS
  - Swift
  - MobS
date: 2020-05-03 10:37:42
---

## MobSとは

MobSは[MobX](https://mobx.js.org/), [RxSwift](https://github.com/ReactiveX/RxSwift), [Combine](https://developer.apple.com/documentation/combine)からインスピレーションを受け、
__SIMPLE & SAFE__を目指したSwift製リアクティブライブラリです。
　
## MobSの対象ユーザ

- RxSwiftは強すぎて息が苦しい方
- SwiftUI+Combineのみで開発を進めるのはまだ早いと思う方

## 用語説明

#### Observable

変数の値を保持し、新しい値が設定されるたび、Observerに通知を行う。
MobX, RxSwiftのObservable、CombineのPublisherと同様の物

#### Observer

Observableに追加され、Observableからの通知を受けてアクションを実行する。
MobXのaction, RxSwiftのObserver、CombineのSubscriberと同様の物

#### Removable (Remover)

Observableに追加されたObserverをObservableから削除するための仕組み。
RxSwiftのDisposable、CombineのCancellableと同様の物


## MobSの基本

それでは早速コードを確認しましょう。

``` swift
class CountUpViewController: UIViewController {

    // ①Observableの生成
    @MobS.Observable(value: 0)
    var count: Int

    @IBOutlet weak var countLabel: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()

        // ②Observerの生成&Observableに追加
        addObserver { (self) in
            self.countLabel.text = "\(self.count)"
        }
    }
    
    @IBAction func buttonTapped(_ sender: Any) {
        // ③Observableの更新
        count += 1
    }

}
```

こちらはボタンをタップすると`count`が１増えてラベルに表示されるコードです。

#### ①Observableの生成

``` swift
@MobS.Observable(value: 0)
var count: Int
```

MobSのObservableは`property wrapper`で実装されているのでこのようにプロパティに` @MobS.Observable`を付けて生成します。
ObservableはObserverのクロージャの中で参照される瞬間、自動的にObserverを自分に追加します。
逆にObserverのクロージャ以外で参照されると一般のプロパティと同じです。

> 上のコードでは初期値`0`のInt型のObservable、`count`が生成されます。

#### ②Observerの生成&Observableに追加

``` swift
addObserver { (self) in
    self.countLabel.text = "\(self.count)"
}
```

MobSのObserverはaddObserverメソッドに通知時に実行するアクションをクロージャとして渡して生成します。
生成されたObserverはクロージャの中で参照しているObservable(s)に自動で追加されて、Observableに新しい値が設定されるたび、実行されます。

> 上のコードではクロージャの中で`count`が参照されているので、`count`に新しい値が設定されるたび、`self.countLabel.text = "\(self.count)"`が実行されます。

そして上の`addObserver`メソッドはNSObjectの拡張メソッドで、以下のような`MobS.addObserver`メソッドのラッパです。

``` swift
MobS.addObserver { [weak self] in
    guard let self = self else { return }
    self.countLabel.text = "\(self.count)"
}.removed(by: remover)
```

addObserverで追加されたObserverは通知をうける必要がなくなると削除される必要があります。
NSObjectの拡張メソッドでは内部で`removed(by: remover)`の呼出で自動で削除されるようになってます。
(これはRxSwiftのDisposable、DisposeBag、NSObject+Rxを合わせたのと同様の処理です)

> 上のコードでは`CountUpViewController`でaddObserverを呼出したので`CountUpViewController`のdeinitのタイミングで自動で削除されます。

#### ③Observableの更新

``` swift
count += 1
```

Observableの更新は一般的なプロパティと同じく値を設定するだけでいです。それでObservableは自分に追加されている全てのObserverに通知を行い、アクションが実行されます。

> 上のコードでは`count += 1`でObserverに自動で通知され、`self.countLabel.text = "\(self.count)"`が実行されます。

## まとめ

以上でMobSの基本を説明しました。

実践で使うには以下の内容も理解する必要がありますので詳しくはコードとExampleをご確認ください。

- UITableViewCellでの利用
- updateState
- Computed
- Bind

> コードとExampleは https://github.com/hmhv/MobS にあります

## 参考

- [MobX](https://mobx.js.org/)
- [RxSwift](https://github.com/ReactiveX/RxSwift)
- [Combine](https://developer.apple.com/documentation/combine)
