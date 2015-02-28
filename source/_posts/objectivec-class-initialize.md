title: Objective-Cのクラス初期化
category:
  - Tech
date: 2015-02-21 07:08:25
tags:
- iOS
- Objectivc-C
---
1. `+ (void)initialize`を利用
2. `+ (void)load`を利用
3. `__attribute__((constructor))`を利用

*＊こちらの説明は動的ロードなどによる挙動は考慮してないです*

### 1.`+ (void)initialize`を利用

#### 呼ばれるタイミング

- クラスが最初に利用される直前

#### 注意点

- サブクラスで`+ (void)initialize`を実装しないとスーパークラスの`+ (void)initialize`が呼ばれるので複数呼ばれる前提で実装する

``` objc
@interface Parent : NSObject
@end
@implementation Parent
// このinitializeはParentクラスとChildクラスが最初に使われる時に
// 呼ばれるので２回呼ばれることになる。
// なのでクラスを確認するかdispatch_onceなどを利用して初期化する
+ (void)initialize
{
    if (self == [Parent self]) {
        NSLog(@"initialize %@", [self class]);
    }
    
//    dispatch_onceを利用
//    static dispatch_once_t onceToken;
//    dispatch_once(&onceToken, ^{
//        NSLog(@"initialize %@", [self class]);
//    });
}
@end
 
@interface Child : Parent
@end
@implementation Child
@end
```

- `+ (void)initialize`は各クラスで一度しか呼ばれないのでクラス本体でのみ実装してカテゴリでは実装しない

``` objc
@implementation Parent
+ (void)initialize
{
    NSLog(@"initialize %@", [self class]);
}
@end
 
@implementation Parent (category)
// NG !!
+ (void)initialize
{
    NSLog(@"initialize %@", [self class]);
}
@end
```

- クラスがプログラム内で利用されなければ呼ばれない

### 2. `+ (void)load`を利用

#### 呼ばれるタイミング

- クラスがメモリにロードされた直後、main関数が呼ばれる前

#### 注意点

- 他のクラスはまだロードされてない可能性があるので他のクラスは利用しない

``` objc
@implementation Parent
+ (void)load
{
    // NG !!
    OtherClass *otherClass = [OtherClass new];
}
@end
```

- クラス本体とカテゴリで複数実装すると全て呼ばれる

``` objc
@implementation Parent
+ (void)load
{
    NSLog(@"load");
}
@end
 
@implementation Parent (category)
+ (void)load
{
    NSLog(@"load by category");
}
@end
 
@implementation Parent (category2)
+ (void)load
{
    NSLog(@"load by category2");
}
@end
```


### 3. `__attribute__((constructor))`を利用


#### 呼ばれるタイミング

- main関数が呼ばれる直前、全クラスがロード済み

``` objc
@interface Parent : NSObject
@end
 
__attribute__((constructor))
static void initialize_class()
{
    NSLog(@"initialize_class");
}
 
@implementation Parent
+ (void)initialize
{
    if (self == [Parent self]) {
        NSLog(@"initialize %@", [self class]);
    }
}
 
+ (void)load
{
    NSLog(@"load");
}
@end
 
int main(int argc, char * argv[]) {
    @autoreleasepool {
        
        Parent *p = [Parent new];
        NSLog(@"%@", p);
    }
}
 
// ログは以下のように表示される
// load
// initialize_class
// initialize Parent
// <Parent: 0xXXXXXXXXXXX>
```

#### 注意点

- これは正確に言うとObjective-Cの機能ではなくGCC提供の関数属性機能です。

  [GCC - Declaring Attributes of Functions](https://gcc.gnu.org/onlinedocs/gcc/Function-Attributes.html)


- 複数の`__attribute__((constructor))`は優先度を指定して呼ばれる順番を指定可能

``` objc
__attribute__((constructor(2)))
static void initialize_class2()
{
    NSLog(@"initialize_class 2");
}
 
__attribute__((constructor(3)))
static void initialize_class3()
{
    NSLog(@"initialize_class 3");
}
 
__attribute__((constructor(1)))
static void initialize_class1()
{
    NSLog(@"initialize_class 1");
}
 
// ログは以下のように表示される
// initialize_class 1
// initialize_class 2
// initialize_class 3
```

*＊こちらの内容は[Qiita](http://qiita.com/hongmhoon/items/f450e92da47b085c9e39)にも投稿されています。*
