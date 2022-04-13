title: iOS9のApp Thinning簡単まとめ
category:
  - Tech
date: 2015-09-15 17:26:21
tags:
- iOS
- App Thinning
- Objectivc-C
---
### App Thinningとは

App Storeからダウンロードするアプリのサイズを小さくすること。

### App Thinningの利点

速くダウンロードできて、端末の容量も節約できる。
また端末に最適化されたアプリをダウンロードすることで性能向上も期待できる。

### App Thinningの方法

- slicing

> 端末に必要なリソースのみダウンロードさせる。

- bitcode

> 端末に最適化されたアプリをダウンロードさせる。

- on-demand resources

> 端末で必要な時にリソースをダウンロードさせる。


#### slicing詳細

例えば、image.png, image@2x.png, image@3x.pngの三つのイメージファイルがアプリに含まれている場合、
今までは全端末に三つのファイルすべてがダウンロードされていたが、slicingによって
iPhone4以前の非Retina端末にはimage.pngのみ、
iPhone6+端末にはimage@3x.pngのみ、
それ以外のRetina端末にはimage@2x.pngのみがダウンロードされるようになる。

アプリ開発者はイメージファイルの管理をアセットで行うだけでそれ以外の面倒はApp Store側がすべて行う。

#### bitcode詳細

例えるなら[JIT（Just-In-Time Compiler、JITコンパイラ）](https://ja.wikipedia.org/wiki/%E5%AE%9F%E8%A1%8C%E6%99%82%E3%82%B3%E3%83%B3%E3%83%91%E3%82%A4%E3%83%A9)に似ってるかな、、
今までは開発者がApp Storeに完全な実行ファイルをアップしていたが、bitcodeという中間ファイルをアップすることで
各端末(例えば、32bit, 64bit, Apple Watchなど)に最適化されたアプリをApp Store側で作ってくれる。

現在(Xcode7GMseed)のiOSアプリでbitcodeはデフォルトでONだが必須ではない。(watchOSアプリは必須)
以下のような二つの方法でOFFにできるようだ。

##### - プロジェクト設定にて
<a title="folder" class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/c944e2cf-34a3-2b9f-227e-110635d9e3e4.png" style="max-width: 100%"  alt="folder"></a>

##### - App Storeへアップロード時
<a title="folder" class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/9f9e6c08-2d47-a11b-5480-df8e340f9853.png" style="max-width: 100%"  alt="folder"></a>

#### on-demand resources詳細

例えばゲームのステージ別のリソースや写真アプリのフィルタ用リソース、チャットアプリのスタンプ用リソースなどをアプリのダウンロード時ではなく必要になった時点でApp Storeからダウンロードすることできる。

##### on-demand resourcesの使い方

1.  プロジェクト設定画面でon-demand resourcesをONに

<a title="folder" class="fancybox" rel="gallery0"><img src="https://developer.apple.com/library/prerelease/ios/documentation/FileManagement/Conceptual/On_Demand_Resources_Guide/Art/ODR_Enabling_ODR_2x.png" style="max-width: 100%"  alt="folder"></a>
2.  リソース管理用のタグを作成

<a title="folder" class="fancybox" rel="gallery0"><img src="https://developer.apple.com/library/prerelease/ios/documentation/FileManagement/Conceptual/On_Demand_Resources_Guide/Art/ODR_Add_New_Tag_2x.png" style="max-width: 100%"  alt="folder"></a>
3. 作成したタグにリソースファイルの関連付け
<a title="folder" class="fancybox" rel="gallery0"><img src="https://developer.apple.com/library/prerelease/ios/documentation/FileManagement/Conceptual/On_Demand_Resources_Guide/Art/ODR_asset_tag_completion_2x.png" style="max-width: 100%"  alt="folder"></a>
<a title="folder" class="fancybox" rel="gallery0"><img src="https://developer.apple.com/library/prerelease/ios/documentation/FileManagement/Conceptual/On_Demand_Resources_Guide/Art/ODR_asset_tag_completion_file_2x.png" style="max-width: 100%"  alt="folder"></a>
4.  必要になったら`NSBundleResourceRequest`クラスでダウンロード

```objc
- (void)downloadOnDemendResource
{
    __weak typeof(self) wself = self;

        // ダウンロードするリソースのタグを指定
    NSSet *tags = [NSSet setWithObject:@"Tag1"];
    self.resourceRequest = [[NSBundleResourceRequest alloc] initWithTags:tags];
    
    //ダウンロード済みか確認
    [self.resourceRequest conditionallyBeginAccessingResourcesWithCompletionHandler: ^(BOOL resourcesAvailable) {
        if (resourcesAvailable) {
            //ダウンロード済みなら利用する
            //UIImage *image = [UIImage imageNamed:@"downloaded.png"];
            //[wself useResource];
        }
        else {
            //未ダウンロードなら優先順を設定してダウンロード開始する
            wself.resourceRequest.loadingPriority = NSBundleResourceRequestLoadingPriorityUrgent;
            [wself.resourceRequest beginAccessingResourcesWithCompletionHandler:^(NSError * error) {
                if (error) {
                    //エラー処理
                    return;
                }
                //ダウンロード完了なら利用する
                //UIImage *image = [UIImage imageNamed:@"downloaded.png"];
                //[wself useResource];
            }];
        }
    }];
}
```



[参考：On-Demand Resources Essentials](https://developer.apple.com/library/prerelease/ios/documentation/FileManagement/Conceptual/On_Demand_Resources_Guide/index.html)
[参考：App Thinning (iOS, watchOS)](https://developer.apple.com/library/prerelease/ios/documentation/IDEs/Conceptual/AppDistributionGuide/AppThinning/AppThinning.html)

