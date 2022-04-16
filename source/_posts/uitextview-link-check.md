title: UITextViewタップ時にlinkかの確認
category:
  - Tech
tags:
  - iOS
  - UITextView
date: 2018-01-10 23:57:19
---
UITextViewでのタップがattributedTextでNSLinkAttributeNameを指定したリンク文のタップか確認

```objc
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    if (touches.count > 1) {
        return;
    }
    UITouch *touch = touches.anyObject;
    CGPoint point = [touch locationInView:self];

    BOOL linkTouched = [self checkTouchedPoint:point];
}

- (BOOL)checkTouchedPoint:(CGPoint)point
{
    NSUInteger touchedLocation;
    NSURL *touchedUrl;

    UITextPosition *postion = [self closestPositionToPoint:point];
    UITextRange *range = [self.tokenizer rangeEnclosingPosition:postion withGranularity:UITextGranularityCharacter inDirection:UITextLayoutDirectionLeft];
    NSInteger offset = [self offsetFromPosition:self.beginningOfDocument toPosition:range.start];
    id value = [self.attributedText attribute:NSLinkAttributeName atIndex:offset effectiveRange:nil];
    NSURL *url = [NSURL URLWithString:value];
    
    if (url) {
        __block BOOL isLink = NO;
        NSUInteger glyphIndex = [self.layoutManager glyphIndexForCharacterAtIndex:offset];
        [self.layoutManager enumerateLineFragmentsForGlyphRange:NSMakeRange(glyphIndex, 1) usingBlock:^(CGRect rect, CGRect usedRect, NSTextContainer * _Nonnull textContainer, NSRange glyphRange, BOOL * _Nonnull stop) {
            if (CGRectContainsPoint(usedRect, point)) {
                isLink = YES;
                *stop = YES;
            }
        }];
        
        if (isLink) {
            touchedUrl = url;
            touchedLocation = offset;
            return YES;
            
        }
    }
    return NO;
}
```