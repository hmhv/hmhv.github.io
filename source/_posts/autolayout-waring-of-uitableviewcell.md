title: UITableViewCellのAutoLayoutの警告と回避策
category:
  - Tech
date: 2015-02-24 15:02:16
tags:
- iOS
- AutoLayout
---
#### 警告内容
```bash
CoreDataTest[2010:60b] Unable to simultaneously satisfy constraints.
	Probably at least one of the constraints in the following list is one you don't want. Try this: (1) look at each constraint and try to figure out which you don't expect; (2) find the code that added the unwanted constraint or constraints and fix it. (Note: If you're seeing NSAutoresizingMaskLayoutConstraints that you don't understand, refer to the documentation for the UIView property translatesAutoresizingMaskIntoConstraints) 
(
    "<NSLayoutConstraint:0x17ee8ba0 V:[UILabel:0x17efb790(20)]>",
    "<NSLayoutConstraint:0x17edd410 V:|-(2)-[UILabel:0x17efb790]   (Names: '|':UITableViewCellContentView:0x17eeb260 )>",
    "<NSLayoutConstraint:0x17edf100 V:[UILabel:0x17ee4a70]-(0)-|   (Names: '|':UITableViewCellContentView:0x17eeb260 )>",
    "<NSLayoutConstraint:0x17edec60 V:[UILabel:0x17efb790]-(2)-[UILabel:0x17ee4a70]>",
    "<NSAutoresizingMaskLayoutConstraint:0x17f33410 h=--& v=--& V:[UITableViewCellContentView:0x17eeb260(0)]>"
)
Will attempt to recover by breaking constraint 
<NSLayoutConstraint:0x17ee8ba0 V:[UILabel:0x17efb790(20)]>
Break on objc_exception_throw to catch this in the debugger.
The methods in the UIConstraintBasedLayoutDebugging category on UIView listed in <UIKit/UIView.h> may also be helpful.
```

　
####  発生条件

iOS7のみで発生する。
原因はUITableViewCellのcontentViewのframeに問題があるようだ。

　
#### 回避策

- ViewControllerの方法

``` objc
-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *cellID = @"CellID";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellID];
    if (NSFoundationVersionNumber <= NSFoundationVersionNumber_iOS_7_1)
    {
        cell.contentView.frame = cell.bounds;
        cell.contentView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleTopMargin;
    }
    //your code goes here
    return cell;
}
```

- UITableViewCellのサブクラスでの方法

``` objc
- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseIdentifier];
    if (self)
    {
        self.contentView.autoresizingMask = UIViewAutoresizingFlexibleHeight|UIViewAutoresizingFlexibleWidth;
        [self loadViews];
        [self constrainViews];
    }
    return self;
}
```

[参考 : auto-layout-constraints-issue-on-ios7-in-uitableviewcell](http://stackoverflow.com/questions/19132908/auto-layout-constraints-issue-on-ios7-in-uitableviewcell)
