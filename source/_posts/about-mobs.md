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

- RxSwiftは強すぎて息が苦しい人
- SwiftUI+Combineのみで開発を進めるのはまだ早いと思う人

## MobSの特徴

- 簡単なインタフェース
- メモリ管理はほぼ自動
- State変更によるViewの更新処理に集中
- 全ての処理はメインスレッドで処理

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
        $count.addObserver(with: self) { (self, count) in
            self.countLabel.text = "\(count)"
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
$count.addObserver(with: self) { (self, count) in
    self.countLabel.text = "\(count)"
}
```

MobSのObserverはaddObserverメソッドに通知時に実行するアクションをクロージャとして渡して生成します。
生成されたObserverはObservableに自動で追加されて、Observableに新しい値が設定されるたび、実行されます。

> 上のコードでは`count`に新しい値が設定されるたび、`self.countLabel.text = "\(count)"`が実行されます。

addObserverで追加されたObserverは通知をうける必要がなくなると削除される必要がありますが、
MobSでは必要がなくなったObserverは自動で削除されます。
(これはRxSwiftのDisposable、DisposeBag、NSObject+Rxを合わせたのと同様の処理です)

> 上のコードでは`with: self`パラメータで渡した`CountUpViewController`のdeinitのタイミングで自動で削除されます。

#### ③Observableの更新

``` swift
count += 1
```

Observableの更新は一般的なプロパティと同じく値を設定するだけでいです。それでObservableは自分に追加されている全てのObserverに通知を行い、アクションが実行されます。

> 上のコードでは`count += 1`でObserverに自動で通知され、`self.countLabel.text = "\(count)"`が実行されます。

## まとめ

以上でMobSの基本について説明しました。

実践で使うには以下の内容も理解する必要がありますので詳しくはコードとExampleをご確認ください。

- UITableViewCellでの利用
- updateState
- Bind

> コードとExampleは https://github.com/hmhv/MobS にあります

## 参考

- [MobX](https://mobx.js.org/)
- [RxSwift](https://github.com/ReactiveX/RxSwift)
- [Combine](https://developer.apple.com/documentation/combine)
