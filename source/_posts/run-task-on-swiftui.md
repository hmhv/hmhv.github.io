title: SwiftUIでビューが表示されたタイミングでasync functionを実行する
category:
  - Tech
tags:
  - iOS
  - Swift
  - SwiftUI
  - Concurrency
  - Task
date: 2022-06-05 11:44:48
---
SwiftUIのViewのメソッドの[`.task()`](<https://developer.apple.com/documentation/swiftui/view/task(priority:_:%29>)の中の処理はViewが表示されると非同期で実行されて、もしViewが非表示になるまでTaskが実行中ならそのTaskは自動でcancelされる。
もし自動でcancelされないようにしたい場合は`.onAppear()`の中で`Task`を直接に生成する。

サンプルコードのログをみるとTaskViewを表示してRequestが完了する前にビューを非表示にすると`.task()`からの`Task`はcancelされるが`.onAppear()`からの`Task`はcancelされないことがわかる。

```swift
struct TaskView: View {
    var body: some View {
        Circle()
            .task {
                await fetch(title: "from .task: ")
            }
            .onAppear {
                print("onAppear")
                Task {
                    await fetch(title: "from onAppear::Task: ")
                }
            }
            .onDisappear {
                print("onDisappear")
            }
    }

    func fetch(title: String) async {
        print("\(title) Started")

        let request = URLRequest(url: URL(string: "https://hmhv.info")!, cachePolicy: .reloadIgnoringLocalAndRemoteCacheData)
        do {
            let (_, response) = try await URLSession.shared.data(for: request)
            print("\(title) \((response as! HTTPURLResponse).statusCode)")
        } catch {
            print("\(title) Error : \(error.localizedDescription)")
        }

        print("\(title) Finished")
    }
}
```

```bash
onAppear
from .task:  Started
from onAppear::Task:  Started
onDisappear
from .task:  Error : cancelled
from .task:  Finished
from onAppear::Task:  200
from onAppear::Task:  Finished
```