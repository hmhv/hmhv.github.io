title: Objective-Cのメッセージフォワード順
category:
  - Tech
date: 2015-06-18 07:24:25
tags:
- iOS
- Objectivc-C
---

```
resolveInstanceMethod - nono
forwardingTargetForSelector - nono
methodSignatureForSelector - nono
forwardInvocation - nono
doesNotRecognizeSelector - nono
```
上の順で呼ばれるので必要なところに処理を入れる

```
@interface TestObject : NSObject
@end
@implementation TestObject
+ (BOOL)resolveInstanceMethod:(SEL)sel
{
    NSLog(@"resolveInstanceMethod - %@", NSStringFromSelector(sel));
    return [super resolveInstanceMethod:sel];
}
+ (BOOL)resolveClassMethod:(SEL)sel
{
    NSLog(@"resolveClassMethod - %@", NSStringFromSelector(sel));
    return [super resolveClassMethod:sel];
}
- (id)forwardingTargetForSelector:(SEL)sel
{
    NSLog(@"forwardingTargetForSelector - %@", NSStringFromSelector(sel));
    return [super forwardingTargetForSelector:sel];
}
- (NSMethodSignature *)methodSignatureForSelector:(SEL)sel
{
    NSLog(@"methodSignatureForSelector - %@", NSStringFromSelector(sel));
    NSString *types = @"@@:";
    return [NSMethodSignature signatureWithObjCTypes:[types UTF8String]];
}
-(void)forwardInvocation:(NSInvocation *)invocation;
{
    SEL sel = [invocation selector];
    NSLog(@"forwardInvocation - %@", NSStringFromSelector(sel));
    return [super forwardInvocation:invocation];
}
- (void)doesNotRecognizeSelector:(SEL)sel
{
    NSLog(@"doesNotRecognizeSelector - %@", NSStringFromSelector(sel));
    [super doesNotRecognizeSelector:sel];
}
@end
@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    TestObject *to = [TestObject new];
    [to performSelector:NSSelectorFromString(@"nono")];
    return YES;
}
@end
```
