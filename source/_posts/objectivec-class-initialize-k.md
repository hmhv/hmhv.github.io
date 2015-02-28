title: Objective-C의 클래스 초기화
category:
  - Tech
date: 2015-02-21 07:08:25
tags:
- iOS
- Objectivc-C
---
1. `+ (void)initialize`를 이용
2. `+ (void)load`를 이용
3. `__attribute__((constructor))`를 이용

*＊이 설명은 동적로드등에 의한 거동은 고려하지 않음*

### 1.`+ (void)initialize`를 이용

#### 호출 시점

- 클래스가 최초로 이용되기 직전

#### 주의점

- 서브클래스에서`+ (void)initialize`를 구현하지 않으면 슈퍼클래스트의 `+ (void)initialize`가 호출되므로 복수회 호출된다는 전제로 구현

``` objc
@interface Parent : NSObject
@end
@implementation Parent
// 이 initialize는 Parent클래스와 Child클래스가 최초로 이용될때
// 회출되므로 2번 호출이 됨
// 그러므로 클래스체크나 dispatch_once등을 이용하여 초기화할 필요가 있슴
+ (void)initialize
{
    if (self == [Parent self]) {
        NSLog(@"initialize %@", [self class]);
    }
    
//    dispatch_once를 이용
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

- `+ (void)initialize`는 각 클래서에서 1번만 호출되므로 클래스 본체에서만 구현하고 카테고리에서는 구현하지 않음

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

- 클래스가 프로그램내에서 이용되지 않으면 호출되지 않음

### 2. `+ (void)load`를 이용

#### 호출 시점

- 클래스가 메모리에 로드된 직후, main함수가 호출되기 전

#### 주의점

- 다른 클래스는 아직 로드되지 않았을 가능성이 있으므로 다른 클래스는 이용하지 않음

``` objc
@implementation Parent
+ (void)load
{
    // NG !!
    OtherClass *otherClass = [OtherClass new];
}
@end
```

- 클래스 본체와 카테고리에서 복수 구현하면 모두 호출됨

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


### 3. `__attribute__((constructor))`를 이용


#### 호출 시점

- main함수가 호출되기 직전, 모든 클래스가 로드된 후

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
 
// 로그는 아래와 같이 표시됨
// load
// initialize_class
// initialize Parent
// <Parent: 0xXXXXXXXXXXX>
```

#### 주의점

- 이것은 정확히 말하면Objective-C의 기능이 아니고 GCC가 제공하는 함수속성 기능임

  [GCC - Declaring Attributes of Functions](https://gcc.gnu.org/onlinedocs/gcc/Function-Attributes.html)


- 복수의 `__attribute__((constructor))`는 우선도를 지정하여 호출순서를 지정가능

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
 
// 로그는 아래와 같이 표시됨
// initialize_class 1
// initialize_class 2
// initialize_class 3
```
