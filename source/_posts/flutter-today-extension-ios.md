title: flutterでiosのtoday-extensionを作って見る
category:
  - Tech
tags:
  - iOS
  - Flutter
  - Today-Extension

date: 2020-02-09 11:28:15
---

## 以下の方法は`Flutter 1.17`以上では動かなくなりました。

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/demo.gif" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/demo.gif" style="max-width: 100%"></a>

## 1. Flutterプロジェクトを新規作成

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/1.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/1.png" style="max-width: 100%"></a>

## 2. ビルドして確認

### AndroidStudioでビルドして確認

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/2.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/2.png" style="max-width: 100%"></a>

### Xcodeでビルドして確認
`ios/Runner.xcworkspace`を開いて

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/2-1.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/2-1.png" style="max-width: 100%"></a>

## 3. Today Extenstionを作成

- テンプレートからToday Extenstion選択して作成

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/3.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/3.png" style="max-width: 100%"></a>

- today Targetに `App.framework` , `Flutter.framework` を追加

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/4.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/4.png" style="max-width: 100%"></a>

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/5.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/5.png" style="max-width: 100%"></a>

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/6.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/6.png" style="max-width: 100%"></a>

## 4. Today Extenstionの修正

- MainInterface.storyboardから不要なラベルを削除
- Flutter frameworkをimport
- FlutterEngineをつくる
- FlutterViewControllerをTodayViewControllerに追加

```swift TodayViewController.swift
import Flutter

class TodayViewController: UIViewController, NCWidgetProviding {

    lazy var flutterEngine = FlutterEngine(name: "TodayViewController")

    override func viewDidLoad() {
        super.viewDidLoad()
        flutterEngine.run()
        addFlutterVC()
    }

    func addFlutterVC() {
        let flutterViewController = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
        flutterViewController.view.translatesAutoresizingMaskIntoConstraints = false
        addChild(flutterViewController)
        view.addSubview(flutterViewController.view)

        flutterViewController.view.topAnchor.constraint(equalTo: view.topAnchor).isActive = true
        flutterViewController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor).isActive = true
        flutterViewController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor).isActive = true
        flutterViewController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor).isActive = true

        flutterViewController.didMove(toParent: self)
    }
}
```

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/7.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/7.png" style="max-width: 100%"></a>

## 5. ナビゲーションバーを削除

- DartクラスでToday Extenstion用のTodayAppを作成
　（基本MYAppのままでappBarのみ削除）

```dart today_app.dart
import 'package:flutter/material.dart';

class TodayApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyTodayPage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyTodayPage extends StatefulWidget {
  MyTodayPage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyTodayPageState createState() => _MyTodayPageState();
}

class _MyTodayPageState extends State<MyTodayPage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

- Today Extenstion用のエントリーポイントを作成

```dart main.dart
@pragma('vm:entry-point')
void mainForTodayExtension() => runApp(TodayApp());
```

- Today Extenstion用のエントリーポイントを利用

```swift TodayViewController.swift
override func viewDidLoad() {
    super.viewDidLoad()
    flutterEngine.run(withEntrypoint: "mainForTodayExtension", libraryURI: nil)
    addFlutterVC()
}
```

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/8.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/8.png" style="max-width: 100%"></a>

## 6. Today Extenstionの高さ変更可能に

```swift TodayViewController.swift
override func viewDidLoad() {
    super.viewDidLoad()

    extensionContext?.widgetLargestAvailableDisplayMode = NCWidgetDisplayMode.expanded

    flutterEngine.run(withEntrypoint: "mainForTodayExtension", libraryURI: nil)
    addFlutterVC()
}

func widgetActiveDisplayModeDidChange(_ activeDisplayMode: NCWidgetDisplayMode, withMaximumSize maxSize: CGSize) {
    if (activeDisplayMode == NCWidgetDisplayMode.compact) {
        self.preferredContentSize = maxSize;
    } else {
        self.preferredContentSize = CGSize(width: 0, height: 200);
    }
}
```

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/9.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/9.png" style="max-width: 100%"></a>

## 7. Today Extenstionのタイトル修正

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/10.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/10.png" style="max-width: 100%"></a>

全ソースコードはこちらに
https://github.com/hmhv/flutter_today_extension_example

## 8. 参考
- https://flutter.dev/docs/development/add-to-app

- Today Extenstionはアプリアイコンの長押しでも表示される

<a href="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/11.png" class="fancybox" rel="gallery0"><img src="https://github.com/hmhv/flutter_today_extension_example/raw/master/storage/11.png" style="max-width: 100%"></a>

