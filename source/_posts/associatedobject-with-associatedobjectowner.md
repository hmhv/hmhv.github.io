title: AssociatedObjectOwnerでobjc_g(s)etAssociatedObjectを利用
category:
  - Tech
tags:
  - iOS
  - Swift
  - AssociatedObjectOwner
  - objc_getAssociatedObject
  - objc_setAssociatedObject
date: 2020-04-27 13:15:09
---

## AssociatedObjectOwnerの利用

``` swift
class TestClass {
}

extension TestClass: AssociatedObjectOwner {

    private static var test1Key = 0
    var test1: TestClass {
        get { getAssociatedObject(key: &TestClass.test1Key, initialObject: TestClass()) }
        set { setAssociatedObject(key: &TestClass.test1Key, object: newValue) }
    }

    private static var test2Key = 0
    var test2: String {
        get { getAssociatedObject(key: &TestClass.test2Key, initialObject: "" ) }
        set { setAssociatedObject(key: &TestClass.test2Key, object: newValue) }
    }

}
```

## AssociatedObjectOwner定義

``` swift
protocol AssociatedObjectOwner: AnyObject {
    func getAssociatedObject<T>(key: UnsafeRawPointer, initialObject: @autoclosure () -> T) -> T
    func setAssociatedObject<T>(key: UnsafeRawPointer, object: T?)
}

extension AssociatedObjectOwner {

    func getAssociatedObject<T>(key: UnsafeRawPointer, initialObject: @autoclosure () -> T) -> T {
        if let object = objc_getAssociatedObject(self, key) as? T {
            return object
        }
        let object = initialObject()
        objc_setAssociatedObject(self, key, object, .OBJC_ASSOCIATION_RETAIN_NONATOMIC)
        return object
    }

    func setAssociatedObject<T>(key: UnsafeRawPointer, object: T?) {
        objc_setAssociatedObject(self, key, object, .OBJC_ASSOCIATION_RETAIN_NONATOMIC)
    }

}
```