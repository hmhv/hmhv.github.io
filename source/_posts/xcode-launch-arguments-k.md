title: Xcode의 유용한 기동시 인수들
category:
  - Tech
toc: true
date: 2015-02-10 20:00:00
tags:
- iOS
- Xcode
---
## CoreData 관련

#### 실행되는 SQL문을 로그로 출력

> -com.apple.CoreData.SQLDebug [1,2,3]
> 1,2,3은 커질수로 상세하게 출력

#### 멀티스레드 디버깅

> -com.apple.CoreData.ConcurrencyDebug 1
> CoreData관련 병렬처리 위반시 예외를 발생시켜 알려줌
> [참조：Core Data Concurrency Debugging](http://oleb.net/blog/2014/06/core-data-concurrency-debugging/)

## 로컬라이즈 관련

#### 문자열을 두배로 표시하여 긴 문장시의 표시 확인

> -NSDoubleLocalizedStrings YES

#### 단말기의 기본 언어 설정

> -AppleLanguages (en)

#### 단말기의 기본 로케일 설정

> -AppleLocale en_US


|언어|국가코드|
|------|---|
|한글 |ko|
|일본어    |ja|
|영어（미국）|    en|

|언어(국가)|로케일|
|------|---|
|한글（한국）| ko_KR|
|일본어（일본） | ja_JP|
|영어（미국）  |  en_US|
|영어（영국） |   en_GB|
|영어（캐나다）| en_CA|
