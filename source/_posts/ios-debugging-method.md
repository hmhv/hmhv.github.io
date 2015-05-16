title: iOSデバッグ時に有用なメソッド
category:
  - Tech
date: 2015-05-16 10:35:41
tags:
- iOS
- debug
---


|メソッド|説明|
|---|---|
|-[NSObject _ivarDescription]|インスタンス変数をすべて表示|
|-[NSObject _shortMethodDescription]|オブジェクトのメソッドをすべて表示|
|-[NSObject _methodDescription]|オブジェクトのメソッドをすべて表示(スーパークラス含む)|
|-[UIView recursiveDescription]|Viewの構造表示|
|-[UIView _autolayoutTrace]|ViewのAutoLayout関連情報表示|
|-[UIViewController _printHierarchy]|ViewControllerの構造表示|

## 使用例

- -[NSObject _ivarDescription]

```
(lldb) po [self _ivarDescription]
<DetailViewController: 0x7fc94b637db0>:
in DetailViewController:
in UIViewController:
	_view (UIView*): <UIView: 0x7fc94b63c360>
	_tabBarItem (UITabBarItem*): nil
	_navigationItem (UINavigationItem*): <UINavigationItem: 0x7fc94b63ae20>
	_toolbarItems (NSArray*): nil
	_title (NSString*): nil
	_nibName (NSString*): @"jAO-Jw-mTY-view-IBP-J8-Ec0"<__NSCFString: 0x7fc94b6380e0>
	_nibBundle (NSBundle*): <NSBundle: 0x7fc94b61bc40>
	_parentViewController (UIViewController*): <UINavigationController: 0x7fc94b71dbc0>
	_childModalViewController (UIViewController*): nil
	_parentModalViewController (UIViewController*): nil
	_previousRootViewController (UIViewController*): nil
	_modalTransitionView (UIView*): nil
	_modalPreservedFirstResponder (UIResponder*): nil
	_dimmingView (id): nil
	_dropShadowView (id): nil
	_currentAction (id): nil
	_storyboard (UIStoryboard*): <UIStoryboard: 0x7fc94b716f50>
	_storyboardSegueTemplates (NSArray*): nil
	_externalObjectsTableForViewLoading (NSDictionary*): <__NSCFDictionary: 0x7fc94b6380a0>
	_topLevelObjectsToKeepAliveFromStoryboard (NSArray*): nil
	_savedHeaderSuperview (UIView*): nil
	_savedFooterSuperview (UIView*): nil
	_editButtonItem (UIBarButtonItem*): nil
	_searchDisplayController (UISearchDisplayController*): nil
	_modalTransitionStyle (long): <00000000 00000000>
	_modalPresentationStyle (long): <00000000 00000000>
	_lastKnownInterfaceOrientation (long): <00000000 00000000>
	_popoverController (UIPopoverController*): nil
	_containerViewInSheet (UIView*): nil
	_contentSizeForViewInPopover (CGSize): {0, 0}
	_formSheetSize (CGSize): {540, 620}
	_recordedContentScrollView (UIScrollView*): nil
	_afterAppearance (unknown type)
	_explicitAppearanceTransitionLevel (long): <00000000 00000000>
	_keyCommands (NSArray*): nil
	_overrideTraitCollections (NSMapTable*): nil
	_viewControllerFlags (unknown type)
	_retainCount (long): <00000000 00000000>
	_ignoreAppSupportedOrientations (BOOL): <00>
	_viewHostsLayoutEngine (BOOL): <00>
	_storyboardIdentifier (NSString*): @"UIViewController-jAO-Jw-mTY"<__NSCFString: 0x7fc94b71d800>
	_transitioningDelegate (<UIViewControllerTransitioningDelegate>*): nil
	_modalPresentationCapturesStatusBarAppearance (BOOL): <00>
	_childViewControllers (NSMutableArray*): nil
	_customNavigationInteractiveTransitionDuration (double): 0
	_customNavigationInteractiveTransitionPercentComplete (double): 0
	_customTransitioningView (UITransitionView*): nil
	_lastNotifiedTraitCollection (UITraitCollection*): <UITraitCollection: 0x7fc94b48a440>
	_presentationController (UIPresentationController*): nil
	_navigationControllerContentOffsetAdjustment (double): 0
	_contentMargin (double): 16
	_topLayoutGuide (_UILayoutGuide*): <_UILayoutGuide: 0x7fc94b63d3e0>
	_bottomLayoutGuide (_UILayoutGuide*): <_UILayoutGuide: 0x7fc94b63d6c0>
	_topBarInsetGuideConstraint (NSLayoutConstraint*): <_UILayoutSupportConstraint: 0x7fc94b63cc20>
	_bottomBarInsetGuideConstraint (NSLayoutConstraint*): <_UILayoutSupportConstraint: 0x7fc94b63a950>
以下省略
```

- -[NSObject _shortMethodDescription]

```
(lldb) po [self _shortMethodDescription]
<DetailViewController: 0x7fc94b637db0>:
in DetailViewController:
	Instance Methods:
		- (void) PrintDebugLog:(id)arg1; (0x10e2c9df0)
		- (void) didReceiveMemoryWarning; (0x10e2c9db0)
		- (void) viewDidLoad; (0x10e2c9d70)
(UIViewController ...)
```

- -[NSObject _methodDescription]

```
(lldb) po [self _methodDescription]
<DetailViewController: 0x7fc94b637db0>:
in DetailViewController:
	Instance Methods:
		- (void) PrintDebugLog:(id)arg1; (0x10e2c9df0)
		- (void) didReceiveMemoryWarning; (0x10e2c9db0)
		- (void) viewDidLoad; (0x10e2c9d70)
in UIViewController:
	Class Methods:
		+ (void) initialize; (0x10f0859c2)
		+ (id) _currentStatusBarStyleViewController; (0x10f0a2630)
		+ (id) _currentStatusBarHiddenViewController; (0x10f0a2671)
		+ (void) _performWithoutDeferringTransitions:(^block)arg1; (0x10f096163)
		+ (void) _traverseViewControllerHierarchyWithDelayedRelease:(^block)arg1; (0x10f0919d0)
		+ (id) viewControllerForView:(id)arg1; (0x10f091287)
		+ (id) _viewControllerForFullScreenPresentationFromView:(id)arg1; (0x10f09d2ad)
		+ (BOOL) _allViewControllersInArray:(id)arg1 allowAutorotationToInterfaceOrientation:(long)arg2 predicate:(^block)arg3; (0x10f09f5ec)
		+ (double) _slimHorizontalContentMargin; (0x10f08563f)
		+ (BOOL) _preventsAppearanceProxyCustomization; (0x10f0899e3)
		+ (double) durationForTransition:(int)arg1; (0x10f09d79c)
		+ (double) _standardHorizontalContentMargin; (0x10f0855cc)
		+ (void) _scheduleTransition:(^block)arg1; (0x10f0961f9)
		+ (id) _traitCollectionWithParentTraitCollection:(id)arg1 overrideTraitCollection:(id)arg2; (0x10f08a14b)
		+ (BOOL) _directlySetsContentOverlayInsetsForChildren; (0x10f0849c0)
		+ (BOOL) doesOverrideViewControllerMethod:(SEL)arg1 inBaseClass:(Class)arg2; (0x10f085c23)
		+ (CGSize) defaultFormSheetSize; (0x10f08612a)
		+ (BOOL) doesOverrideSupportedInterfaceOrientations; (0x10f085cec)
		+ (BOOL) _isNestedViewControllerSupportDisabled; (0x10f085bbb)
		+ (BOOL) _synthesizeSupportedInterfaceOrientationsFromShouldAutorotateToInterfaceOrientation; (0x10f086c62)
		+ (BOOL) _frameIsNotResizedForDoubleHeightStatusBarChanges:(id)arg1; (0x10f087463)
		+ (void) setViewController:(id)arg1 forView:(id)arg2; (0x10f0912d9)
		+ (id) existingNibNameMatchingClassName:(id)arg1 bundle:(id)arg2; (0x10f08a80f)
		+ (BOOL) _doesOverrideLegacyFullScreenLayout; (0x10f0929dd)
		+ (BOOL) _isViewSizeFullScreen:(id)arg1 inWindow:(id)arg2 ignoreInWindowCheck:(BOOL)arg3; (0x10f0929e5)
		+ (BOOL) doesOverrideViewControllerMethod:(SEL)arg1; (0x10f085c5a)
		+ (BOOL) _shouldUseRootViewControllerAutopromotion; (0x10f085a1c)
		+ (void) _traverseViewControllerHierarchyWithDelayedReleaseArray:(const void**)arg1 block:(^block)arg2; (0x10f09161c)
		+ (void) _traverseViewControllerHierarchy:(^block)arg1; (0x10f091acf)
		+ (id) _printHierarchy; (0x10f0920a7)
		+ (BOOL) _shouldUseLegacyModalViewControllers; (0x10f085bef)
		+ (BOOL) _isViewSizeFullScreen:(id)arg1 inWindow:(id)arg2; (0x10f093280)
		+ (int) _keyboardDirectionForTransition:(int)arg1; (0x10f08d1e3)
		+ (BOOL) _shouldDeferTransitions; (0x10f096157)
		+ (void) _setShouldDeferTransitions:(BOOL)arg1; (0x10f09614b)
		+ (BOOL) _shouldSendLegacyMethodsFromViewWillTransitionToSize; (0x10f09d998)
		+ (BOOL) _shouldForwardViewWillTransitionToSize; (0x10f09e301)
		+ (BOOL) doesOverridePreferredInterfaceOrientationForPresentation; (0x10f085ca1)
		+ (BOOL) _doesOverrideLegacyShouldAutorotateMethod; (0x10f09ebcf)
		+ (void) _forceLegacyModalViewControllers:(BOOL)arg1; (0x10f085ba3)
		+ (void) _disableNestedViewControllerSupport:(BOOL)arg1; (0x10f085baf)
		+ (void) removeViewControllerForView:(id)arg1; (0x10f09129c)
		+ (id) _allDescriptions; (0x10f091d43)
		+ (BOOL) _optsOutOfPopoverControllerHierarchyCheck; (0x10f0939e9)
		+ (void) _setShouldUseLegacyPresentations:(BOOL)arg1; (0x10f096145)
		+ (void) setCustomTransitionDuration:(double)arg1; (0x10f09d750)
		+ (double) customTransitionDuration; (0x10f09d75e)
		+ (void) attemptRotationToDeviceOrientation; (0x10f09ebe8)
		+ (id) _exportedInterface; (0x10f563e91)
		+ (id) _remoteViewControllerInterface; (0x10f563e89)
		+ (id) XPCInterface; (0x10f564033)
		+ (BOOL) _isSecureForRemoteViewService; (0x10f563e03)
		+ (BOOL) _initializedByViewServices; (0x10f5b860b)
	Properties:
		@property (retain, nonatomic) UITabBarItem* tabBarItem;
		@property (readonly, retain, nonatomic) UITabBarController* tabBarController;
		@property (readonly, retain, nonatomic) UISplitViewController* splitViewController;
		@property (readonly, retain, nonatomic) UINavigationItem* navigationItem;
		@property (nonatomic) BOOL hidesBottomBarWhenPushed;
		@property (readonly, retain, nonatomic) UINavigationController* navigationController;
		@property (readonly, nonatomic) NSArray* childViewControllers;
		@property (readonly, nonatomic) UIView* _embeddedView;  (@dynamic _embeddedView;)
		@property (readonly, nonatomic) <_UIViewControllerContentViewEmbedding>* _embeddedDelegate;  (@dynamic _embeddedDelegate;)
		@property (nonatomic) CGSize preferedContentSizeInModalItem;  (@dynamic preferedContentSizeInModalItem;)
		@property (readonly) unsigned long hash;
		@property (readonly) Class superclass;
		@property (readonly, copy) NSString* description;
		@property (readonly, copy) NSString* debugDescription;
		@property (readonly, retain, nonatomic) NSExtensionContext* extensionContext;  (@dynamic extensionContext;)
		@property (readonly) unsigned long hash;
		@property (readonly) Class superclass;
		@property (readonly, copy) NSString* description;
		@property (readonly, copy) NSString* debugDescription;
		@property (retain, nonatomic) UIView* view;
		@property (copy, nonatomic) NSString* nibName;  (@synthesize nibName = _nibName;)
		@property (retain, nonatomic) NSBundle* nibBundle;  (@synthesize nibBundle = _nibBundle;)
		@property (retain, nonatomic) UIStoryboard* storyboard;  (@synthesize storyboard = _storyboard;)
		@property (copy, nonatomic) NSString* title;  (@synthesize title = _title;)
		@property (nonatomic) UIViewController* parentViewController;
		@property (readonly, nonatomic) UIViewController* modalViewController;
		@property (readonly, nonatomic) UIViewController* presentedViewController;
		@property (readonly, nonatomic) UIViewController* presentingViewController;
		@property (nonatomic) BOOL definesPresentationContext;
		@property (nonatomic) BOOL providesPresentationContextTransitionStyle;
		@property (nonatomic) long modalTransitionStyle;  (@synthesize modalTransitionStyle = _modalTransitionStyle;)
		@property (nonatomic) long modalPresentationStyle;  (@synthesize modalPresentationStyle = _modalPresentationStyle;)
		@property (nonatomic) BOOL modalPresentationCapturesStatusBarAppearance;  (@synthesize modalPresentationCapturesStatusBarAppearance = _modalPresentationCapturesStatusBarAppearance;)
		@property (nonatomic) BOOL wantsFullScreenLayout;
		@property (nonatomic) unsigned long edgesForExtendedLayout;  (@synthesize edgesForExtendedLayout = _edgesForExtendedLayout;)
		@property (nonatomic) BOOL extendedLayoutIncludesOpaqueBars;
		@property (nonatomic) BOOL automaticallyAdjustsScrollViewInsets;
		@property (nonatomic) CGSize preferredContentSize;  (@synthesize preferredContentSize = _preferredContentSize;)
		@property (readonly, nonatomic) NSArray* storyboardSegueTemplates;  (@synthesize storyboardSegueTemplates = _storyboardSegueTemplates;)
		@property (nonatomic, setter=_setSourceViewControllerIfPresentedViaPopoverSegue:) UIViewController* _sourceViewControllerIfPresentedViaPopoverSegue;  (@synthesize _sourceViewControllerIfPresentedViaPopoverSegue = _sourceViewControllerIfPresentedViaPopoverSegue;)
		@property (nonatomic, setter=_setModalSourceViewController:) UIViewController* _modalSourceViewController;  (@synthesize _modalSourceViewController = _modalSourceViewController;)
		@property (retain, nonatomic) UITransitionView* modalTransitionView;
		@property (readonly, nonatomic) UIViewController* _parentViewController;
		@property (readonly, nonatomic) UIViewController* _parentModalViewController;
		@property (nonatomic) NSMutableArray* mutableChildViewControllers;  (@synthesize mutableChildViewControllers = _childViewControllers;)
		@property (readonly, nonatomic) unsigned long childViewControllersCount;
		@property (retain, nonatomic, setter=_setEmbeddedView:) UIView* _embeddedView;  (@synthesize _embeddedView = __embeddedView;)
		@property (retain, nonatomic, setter=_setEmbeddingView:) UIView* _embeddingView;  (@synthesize _embeddingView = __embeddingView;)
		@property (nonatomic, setter=_setEmbeddedViewFrame:) CGRect _embeddedViewFrame;  (@synthesize _embeddedViewFrame = __embeddedViewFrame;)
		@property (nonatomic, setter=_setEmbeddedDelegate:) <_UIViewControllerContentViewEmbedding>* _embeddedDelegate;  (@synthesize _embeddedDelegate = __embeddedDelegate;)
		@property (retain, nonatomic, setter=_setLastNotifiedTraitCollection:) UITraitCollection* _lastNotifiedTraitCollection;  (@synthesize _lastNotifiedTraitCollection = _lastNotifiedTraitCollection;)
		@property (readonly, nonatomic) long _horizontalSizeClass;
		@property (readonly, nonatomic) long _verticalSizeClass;
		@property (readonly, nonatomic) ? __sizeClassPair;
		@property (readonly, nonatomic) UIView* savedHeaderSuperview;  (@synthesize savedHeaderSuperview = _savedHeaderSuperview;)
		@property (retain, nonatomic) UIViewController* childModalViewController;
		@property (nonatomic) UIViewController* parentModalViewController;  (@synthesize parentModalViewController = _parentModalViewController;)
		@property (retain, nonatomic) UISearchDisplayController* searchDisplayController;  (@dynamic searchDisplayController;)
		@property (nonatomic) BOOL searchBarHidNavBar;
		@property (retain, nonatomic) UIDropShadowView* dropShadowView;  (@synthesize dropShadowView = _dropShadowView;)
		@property (readonly, nonatomic) BOOL _isModalSheet;
		@property (readonly, nonatomic) BOOL _isPresentedFormSheet;
		@property (readonly, nonatomic) BOOL _isInSheetPresentation;
		@property (retain, nonatomic, setter=_setPresentationController:) UIPresentationController* _presentationController;  (@synthesize _presentationController = _presentationController;)
		@property (nonatomic, getter=_presentationSizeClassPair, setter=_setPresentationSizeClassPair:) ? presentationSizeClassPair;  (@synthesize presentationSizeClassPair = _presentationSizeClassPair;)
		@property (retain, nonatomic, getter=_originalPresentationController, setter=_setOriginalPresentationController:) UIPresentationController* originalPresentationController;  (@synthesize originalPresentationController = _originalPresentationController;)
		@property (retain, nonatomic, getter=_temporaryPresentationController, setter=_setTemporaryPresentationController:) UIPresentationController* temporaryPresentationController;  (@synthesize temporaryPresentationController = _temporaryPresentationController;)
		@property (readonly, nonatomic) BOOL _useSheetRotation;
		@property (readonly, nonatomic) BOOL _isDimmingBackground;
		@property (readonly, nonatomic) BOOL isSettingAppearState;
		@property (copy, nonatomic) ^block afterAppearanceBlock;  (@synthesize afterAppearanceBlock = _afterAppearance;)
		@property (nonatomic) CGSize contentSizeForViewInPopover;  (@synthesize contentSizeForViewInPopover = _contentSizeForViewInPopover;)
		@property (nonatomic) BOOL modalInPopover;
		@property (nonatomic, getter=isInWillRotateCallback) BOOL inWillRotateCallback;
		@property (nonatomic, getter=isInAnimatedVCTransition) BOOL inAnimatedVCTransition;
		@property (readonly, nonatomic) BOOL inExplicitAppearanceTransition;
		@property (nonatomic) BOOL appearanceTransitionsAreDisabled;
		@property (nonatomic) BOOL disableRootPromotion;
		@property (nonatomic) BOOL needsDidMoveCleanup;
		@property (nonatomic, getter=isFinishingModalTransition) BOOL finishingModalTransition;
		@property (nonatomic) double customNavigationInteractiveTransitionDuration;  (@synthesize customNavigationInteractiveTransitionDuration = _customNavigationInteractiveTransitionDuration;)
		@property (nonatomic) double customNavigationInteractiveTransitionPercentComplete;  (@synthesize customNavigationInteractiveTransitionPercentComplete = _customNavigationInteractiveTransitionPercentComplete;)
		@property (retain, nonatomic) UITransitionView* customTransitioningView;  (@synthesize customTransitioningView = _customTransitioningView;)
		@property (readonly, nonatomic, getter=_window) UIWindow* window;
		@property (readonly, nonatomic) BOOL _monitorsSystemLayoutFittingSize;
		@property (retain, nonatomic, setter=_setPreviousFittingSizeInfo:) NSDictionary* _previousFittingSizeInfo;
		@property (nonatomic, setter=_setNavigationControllerContentInsetAdjustment:) UIEdgeInsets _navigationControllerContentInsetAdjustment;  (@synthesize _navigationControllerContentInsetAdjustment = _navigationControllerContentInsetAdjustment;)
		@property (nonatomic, setter=_setNavigationControllerContentOffsetAdjustment:) double _navigationControllerContentOffsetAdjustment;  (@synthesize _navigationControllerContentOffsetAdjustment = _navigationControllerContentOffsetAdjustment;)
		@property (nonatomic, setter=_setContentOverlayInsets:) UIEdgeInsets _contentOverlayInsets;  (@synthesize _contentOverlayInsets = _contentOverlayInsets;)
		@property (nonatomic, setter=_setContentMargin:) double _contentMargin;  (@synthesize _contentMargin = _contentMargin;)
		@property (retain, nonatomic, setter=_setPresentedStatusBarViewController:) UIViewController* _presentedStatusBarViewController;  (@synthesize _presentedStatusBarViewController = _presentedStatusBarViewController;)
		@property (readonly, retain, nonatomic) _UILayoutGuide* topLayoutGuide;  (@synthesize topLayoutGuide = _topLayoutGuide;)
		@property (readonly, retain, nonatomic) _UILayoutGuide* bottomLayoutGuide;  (@synthesize bottomLayoutGuide = _bottomLayoutGuide;)
		@property (readonly, retain, nonatomic) _UILayoutGuide* _leftLayoutGuide;  (@synthesize _leftLayoutGuide = _leftLayoutGuide;)
		@property (readonly, retain, nonatomic) _UILayoutGuide* _rightLayoutGuide;  (@synthesize _rightLayoutGuide = _rightLayoutGuide;)
		@property (readonly, retain, nonatomic) NSLayoutConstraint* _topBarInsetGuideConstraint;  (@synthesize _topBarInsetGuideConstraint = _topBarInsetGuideConstraint;)
		@property (readonly, retain, nonatomic) NSLayoutConstraint* _bottomBarInsetGuideConstraint;  (@synthesize _bottomBarInsetGuideConstraint = _bottomBarInsetGuideConstraint;)
		@property (readonly, retain, nonatomic) NSLayoutConstraint* _leftMarginGuideConstraint;  (@synthesize _leftMarginGuideConstraint = _leftMarginGuideConstraint;)
		@property (readonly, retain, nonatomic) NSLayoutConstraint* _rightMarginGuideConstraint;  (@synthesize _rightMarginGuideConstraint = _rightMarginGuideConstraint;)
		@property (retain, nonatomic, setter=_setExtensionContext:) NSExtensionContext* extensionContext;  (@dynamic extensionContext;)
		@property (retain, nonatomic, setter=_setChildControllerToIgnoreWhileLookingForTransitionCoordinator:) UIViewController* _childControllerToIgnoreWhileLookingForTransitionCoordinator;  (@synthesize _childControllerToIgnoreWhileLookingForTransitionCoordinator = __childControllerToIgnoreWhileLookingForTransitionCoordinator;)
		@property (readonly) unsigned long hash;
		@property (readonly) Class superclass;
		@property (readonly, copy) NSString* description;
		@property (readonly, copy) NSString* debugDescription;
		@property (readonly, nonatomic) UITraitCollection* traitCollection;
		@property (readonly, nonatomic) <UIFocusContainer>* preferredFocusedItem;
		@property (readonly, nonatomic) UIView* focusedView;
	Instance Methods:
		- (^block) _completionBlock; (0x10f09382b)
		- (id) retain; (0x10f085d37)
		- (oneway void) release; (0x10f085d5a)
		- (unsigned long) retainCount; (0x10f085dd7)
		- (void) dealloc; (0x10f088c75)
		- (BOOL) _tryRetain; (0x10f085def)
		- (BOOL) _isDeallocating; (0x10f085e2a)
		- (id) invalidate; (0x10f563f3f)
		- (id) _screen; (0x10f0a27c1)
		- (void) _setInCustomTransition:(BOOL)arg1; (0x10f086d57)
		- (BOOL) isViewLoaded; (0x10f08ba00)
		- (id) searchDisplayController; (0x10f0a2800)
		- (id) navigationItem; (0x10f0a38f2)
		- (void) applicationWillSuspend; (0x10f09273c)
		- (BOOL) _tryBecomeRootViewControllerInWindow:(id)arg1; (0x10f08fc15)
		- (id) _preferredStatusBarStyleAnimationParameters; (0x10f0a2598)
		- (id) _preferredStatusBarHideAnimationParameters; (0x10f0a25a0)
		- (long) preferredStatusBarStyle; (0x10f0a252f)
以下省略
```

- -[UIView recursiveDescription]

```
(lldb) po [self.view recursiveDescription]
<UIView: 0x7fc94b63c360; frame = (0 0; 375 667); autoresize = W+H; layer = <CALayer: 0x7fc94b63c340>>
   | <UIView: 0x7fc94b63c470; frame = (0 0; 375 667); autoresize = RM+BM; layer = <CALayer: 0x7fc94b63c580>>
   |    | <UILabel: 0x7fc94b63c5a0; frame = (166.5 110; 42 20.5); text = 'Label'; opaque = NO; autoresize = RM+BM; userInteractionEnabled = NO; layer = <_UILabelLayer: 0x7fc94b63c9d0>>
   |    | <UIButton: 0x7fc94b63b7c0; frame = (164.5 318.5; 46 30); opaque = NO; autoresize = RM+BM; layer = <CALayer: 0x7fc94b63a930>>
   |    |    | <UIButtonLabel: 0x7fc94b647df0; frame = (0 6; 46 18); text = 'Button'; alpha = 0.2; opaque = NO; userInteractionEnabled = NO; layer = <_UILabelLayer: 0x7fc94b646690>>
   | <_UILayoutGuide: 0x7fc94b63d3e0; frame = (0 0; 0 64); hidden = YES; layer = <CALayer: 0x7fc94b63ae00>>
   | <_UILayoutGuide: 0x7fc94b63d6c0; frame = (0 667; 0 0); hidden = YES; layer = <CALayer: 0x7fc94b63ac30>>
```

- -[UIView _autolayoutTrace]

```
(lldb) po [self.view _autolayoutTrace]

UIWindow:0x7fc94b735440
|   UILayoutContainerView:0x7fc94b469c40
|   |   UINavigationTransitionView:0x7fc94b477530
|   |   |   UIViewControllerWrapperView:0x7fc94b48e3c0
|   |   |   |   •UIView:0x7fc94b63c360
|   |   |   |   |   *UIView:0x7fc94b63c470
|   |   |   |   |   |   *UILabel:0x7fc94b63c5a0'Label'
|   |   |   |   |   |   *UIButton:0x7fc94b63b7c0'Button'
|   |   |   |   |   |   |   UIButtonLabel:0x7fc94b647df0'Button'
|   |   |   |   |   *_UILayoutGuide:0x7fc94b63d3e0
|   |   |   |   |   *_UILayoutGuide:0x7fc94b63d6c0
|   |   UINavigationBar:0x7fc94b72bbe0
|   |   |   _UINavigationBarBackground:0x7fc94b7357e0
|   |   |   |   _UIBackdropView:0x7fc94b4817d0
|   |   |   |   |   _UIBackdropEffectView:0x7fc94b486150
|   |   |   |   |   UIView:0x7fc94b487700
|   |   |   |   UIImageView:0x7fc94b735ee0
|   |   |   UINavigationItemButtonView:0x7fc94b629c30'Back'
|   |   |   |   UILabel:0x7fc94b63bbe0'Back'
|   |   |   _UINavigationBarBackIndicatorView:0x7fc94b4768c0
```

- -[UIViewController _printHierarchy]

```
(lldb) po [self.navigationController _printHierarchy]
<UINavigationController 0x7fc94b71dbc0>, state: appeared, view: <UILayoutContainerView 0x7fc94b469c40>
   | <ViewController 0x7fc94b71e090>, state: disappeared, view: <UIView 0x7fc94b48cf00> not in the window
   | <DetailViewController 0x7fc94b637db0>, state: appeared, view: <UIView 0x7fc94b63c360>
```


参考
http://lithium3141.com/resources/2014/12/debugging-cheat-sheet.pdf
http://bou.io/ExtendedTypeInfoInObjC.html

この内容はqiitaにも投稿しました。
http://qiita.com/hongmhoon/items/6c60d8e165d4204f1a74





