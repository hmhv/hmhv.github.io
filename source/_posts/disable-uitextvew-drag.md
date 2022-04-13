title: UITextViewのDragを無効にする
category:
  - Tech
tags:
  - iOS
  - UITextView
  - UITextDragDelegate
date: 2018-01-10 23:47:19
---
UITextViewのUITextDragDelegateのメッソド[textDraggableView: textDraggableView: itemsForDrag:dragRequest]で空配列を返す
iOS10以下も対応中なら`@available(iOS 11.0, *)`, ` NS_AVAILABLE_IOS(11.0)` も追加

``` objc
- (void)viewDidLoad
{
    [super viewDidLoad];
    self.textView = [[UITextView alloc] initWithFrame:CGRectZero];
    if (@available(iOS 11.0, *)) {
        self.textView.textDragDelegate = self;
    }
}

- (NSArray<UIDragItem *> *)textDraggableView:(UIView<UITextDraggable> *)textDraggableView itemsForDrag:(id<UITextDragRequest>)dragRequest NS_AVAILABLE_IOS(11.0)
{
    return @[];
}
```

https://developer.apple.com/documentation/uikit/uitextdragdelegate/2890908-textdraggableview