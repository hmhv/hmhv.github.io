title: 자작 라이브러리를 CocoaPods에 등록
category:
  - Tech
date: 2015-02-28 01:00:17
tags:
- CocoaPods
- HobjectiveRecord
---
[HobjectiveRecord](https://github.com/hmhv/HobjectiveRecord)라는 CoreData용 라이브러리를GitHub에 공개하고
CocoaPods에도 등록한 메모

## GitHub상의 파일구조

<a href="https://qiita-image-store.s3.amazonaws.com/0/25832/47126434-e7bd-de68-7db3-16f564ae9be8.png" title="folder" class="fancybox" rel="gallery0"><img src="https://qiita-image-store.s3.amazonaws.com/0/25832/47126434-e7bd-de68-7db3-16f564ae9be8.png" style="max-width: 100%"  alt="folder"></a>

- `HobjectiveRecord`는 라이브러리의 코드용 폴더
- `HobjectiveRecordDemo`는 라이브러리의 데모앱용 폴더
- `.gitignore`, `LICENSE`, `README.md`는 유명한 파일들
- `HobjectiveRecord.podspec` 이것이 CocoaPods에 등록하기 위해 필요한 파일

## CocoaPods에 등록 방법


> **_예전에는 [CocoaPodsのSpecs](https://github.com/CocoaPods/Specs)에 풀리퀘스트로 했던것 같은데_**
> **_요즘은 `pod trunk` 커멘드로 함_**

#### 1. `podspec`파일 작성

`HobjectiveRecord.podspec`을 작성

``` bash
 $ pod spec create HobjectiveRecord
```

#### 2. `podspec`파일 편집

이것은 Fork해 온 [ObjectiveRecord](https://github.com/supermarin/ObjectiveRecord)에서 수정
상세한 내용은 [여기를 참조](http://guides.cocoapods.org/making/specs-and-specs-repo.html)

``` ruby
@version = "0.1.4"
Pod::Spec.new do |s|
  s.name         = "HobjectiveRecord"
  s.version      = @version
  s.summary      = "Lightweight and sexy CoreData Library. using NSPrivateQueueConcurrencyType MOC and [performBlock:]"
  s.homepage     = "https://github.com/hmhv/HobjectiveRecord"
  s.license      = { :type => 'MIT', :file => 'LICENSE' }
  s.author       = { "hmhv" => "admin@hmhv.info" }
  s.source       = { :git => "https://github.com/hmhv/HobjectiveRecord.git", :tag => @version }
  s.source_files = 'HobjectiveRecord/**/*.{h,m}'
  s.framework  = 'CoreData'
  s.requires_arc = true
  s.ios.deployment_target = '6.0'
end
```

#### 3. `podspec`파일 체크

``` bash
$ pod spec lint
```

#### 4. 유저 등록(컴퓨터 등록?)

상세한 내용은 [여기를 참조](http://guides.cocoapods.org/making/getting-setup-with-trunk.html)


``` bash
$ pod trunk register your@email.com 'your name' --description='my macbook'
```

#### 5. 등록 확인

등록한 멜주소로 확인 메일을 확인하여 등록을 완료
이후 아래의 커멘드로 터미널에서도 확인 가능

``` bash
$ pod trunk me
```

#### 6. `podspec`파일 푸시

``` bash
$ pod trunk push
```

이것으로 작성한 `podspec`파일이 `podspec.json`파일로 변화되어
[CocoaPods의Specs](https://github.com/CocoaPods/Specs)에 등록됨.

이제 라이브러리를 사용하고자 하는 프로젝트의 `Podfile`에 `pod 'HobjectiveRecord'`를 추가하면 이용가능하게 됨


> **_버젼업도 위의 등록 방법과 동일_**

