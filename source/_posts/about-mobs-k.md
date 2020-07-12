title: MobS 소개
category:
  - Tech
tags:
  - iOS
  - Swift
  - MobS
date: 2020-05-03 10:36:42
---

## MobS란?

MobS는 [MobX](https://mobx.js.org/), [RxSwift](https://github.com/ReactiveX/RxSwift), [Combine](https://developer.apple.com/documentation/combine)로부터 인스피레이션을 얻은、
__SIMPLE & SAFE__을 목표로 하는 Swift 리엑티브 라이프러리 입니다.
　
## MobS의 대상 유저

- RxSwift의 강력함에 좌절한 경험이 있으신 분
- SwiftUI+Combine만으로 개발을 진행하기는 아직 이르다고 생각하는 분

## MobS의 특징

- 간단한 인터페이스
- 메모리관리는 거의 자동
- State변경에 의한 View의 갱신처리에 집중
- 모든 처리는 메인 스레드에서 실행

## 용어설명

#### Observable

변수의 값을 소유하며 새로운 값이 설정될때 마다 Observer에 통지를 보냄
MobX, RxSwift의 Observable、Combine의 Publisher와 동등

#### Observer

Observable에 추가되어 Observable으로부터의 통지를 받아 액션을 실행
MobXのaction, RxSwiftのObserver、Combine의 Subscriber와 동등

#### Removable (Remover)

Observable에 추가된 Observer를 Observable로부터 삭제하는 방법
RxSwift의 Disposable、Combine의 Cancellable와 동등


## MobS의 기본

그럼 일단 코드를 확인합니다.

``` swift
class CountUpViewController: UIViewController {

    // ①Observable의 생성
    @MobS.Observable(value: 0)
    var count: Int

    @IBOutlet weak var countLabel: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()

        // ②Observer의 생성 & Observable에 추가
        $count.addObserver(with: self) { (self, count) in
            self.countLabel.text = "\(count)"
        }
    }
    
    @IBAction func buttonTapped(_ sender: Any) {
        // ③Observable의 갱신
        count += 1
    }

}
```

이것은 버튼을 누를때마다 `count`가 1씩 증가하여 라벨에 표시되는 코드입니다.

#### ①Observable의 생성

``` swift
@MobS.Observable(value: 0)
var count: Int
```

MobS의 Observable은 `property wrapper`으로 구현되어 있어서 이와같이 ` @MobS.Observable`를 붙여서 생성합니다.
Observable은 Observer의 클로저 안에서 참조되는 순간 자동적으로 Observer를 자신에게 추가합니다.
거꾸로 Observer의 클로저 이외에서의 참조는 일반적인 프로퍼티와 같습니다.

> 위의 코드에서는 초기값 `0`의 Int형 Observable、`count`를 생성합니다.

#### ②Observer의 생성 & Observable에 추가

``` swift
$count.addObserver(with: self) { (self, count) in
    self.countLabel.text = "\(count)"
}
```

MobS의 Observer는 addObserver메소드에 통지시 실행할 액션을 클로저로 넘겨서 생성합니다.
생성된 Observer는 Observable에 자동적으로 추가되어 Observable에 새로운 값이 설정될 때 마다 실행됩니다.

> 위의 코드에서는 `count`에 새로운 값이 설정될 때 마다 `self.countLabel.text = "\(count)"`가 실행됩니다.

addObserver로 추가된 Observer는 더이상 통지를 받을 필요가 없어지면 삭제할 필요가 있습니다.
다만 MobS에서는 필요가 없어진 Observer는 자동적으로 삭제되도록 되어 있습니다.
(이것은 RxSwift의 Disposable, DisposeBag, NSObject+Rx을 합친 처리와 비슷합니다.)

> 위의 코드에서는 `with: self` 파라미터로 전달된 `CountUpViewController`가 deinit되는 타이밍에 자동으로 삭제됩니다.

#### ③Observable의 갱신

``` swift
count += 1
```

Observable의 변경은 일반적인 프로퍼티와 같이 값을 설정하는면 됩니다. 이것으로 Observable은 자신에게 추가된 모든 Observer에 통지를 보내 액션이 실행됩니다.

> 위의 코드에서는 `count += 1`로 Observer에 자동으로 통지되어 `self.countLabel.text = "\(count)"`가 실행됩니다.

## 마지막으로

이상으로 MobS의 기본에 대하여 설명했습니다.

실무에서 사용하기 위해서는 아래의 내용도 이해할 필요가 있습니다. 자세한 내용은 코드와 예제를 확인해주세요.

- UITableViewCellでの利用
- updateState
- Computed
- Bind

> 코드와 예제는  https://github.com/hmhv/MobS 에 있습니다.

## 참조

- [MobX](https://mobx.js.org/)
- [RxSwift](https://github.com/ReactiveX/RxSwift)
- [Combine](https://developer.apple.com/documentation/combine)
