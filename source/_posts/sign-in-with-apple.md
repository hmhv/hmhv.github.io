title: Sign in with Apple実装
category:
  - Tech
tags:
  - iOS
  - Sign in with Apple
date: 2019-11-24 17:30:40
---
### 1. アプリのcapabilityで`Sign in with Apple` を選択

- Xcodeで選択

<a class="fancybox" rel="gallery0"><img src="../../../images/as-xcode.png" style="max-width: 100%"></a>

- Apple Developerサイトで選択

<a class="fancybox" rel="gallery0"><img src="../../../images/as-web.png" style="max-width: 100%"></a>

### 2. コード実装

- Sign in with Apple用ボタン＆ハンドラ作成

``` swift
func setupProviderLoginView() {
    authorizationButton = ASAuthorizationAppleIDButton(authorizationButtonType: .signIn, authorizationButtonStyle: .whiteOutline)
    authorizationButton.addTarget(self, action: #selector(handleAuthorizationAppleIDButtonPress), for: .touchUpInside)
    authorizationButton.cornerRadius = 10
    appleBaseView.addSubview(authorizationButton)
}

@objc
func handleAuthorizationAppleIDButtonPress() {
    let appleIDProvider = ASAuthorizationAppleIDProvider()
    let request = appleIDProvider.createRequest()
    request.requestedScopes = [.fullName, .email]
    
    let authorizationController = ASAuthorizationController(authorizationRequests: [request])
    authorizationController.delegate = self
    authorizationController.presentationContextProvider = self
    authorizationController.performRequests()
}
```
- Sign in with Apple用Delegate実装

```swift
extension LoginViewController: ASAuthorizationControllerDelegate {
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        if let appleIDCredential = authorization.credential as? ASAuthorizationAppleIDCredential {
            
            let userIdentifier = appleIDCredential.user
            let fullName = appleIDCredential.fullName
            let email = appleIDCredential.email
            
            debugPrint("userIdentifier : \(userIdentifier)")
            debugPrint("fullName : \(String(describing: fullName))")
            debugPrint("email : \(String(describing: email))")
        }
    }
    
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        debugPrint("didCompleteWithError : \(error)")
    }
}

extension LoginViewController: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return self.view.window!
    }
}
```

- Sign in成功時のログ例

``` bash
"userIdentifier : 000000.00000000000000000000000000000000.0000"
"fullName : Optional(givenName: XXXXXXX familyName: XXXXX )"
"email : Optional(\"xxxxxxxxx@privaterelay.appleid.com\")"
```


### 3.  `xxxxxxxxx@privaterelay.appleid.com` へメールを送信

こちらのメアドは以下の設定なしでは送信しても届かない

- Apple Developerサイトで設定

<a class="fancybox" rel="gallery0"><img src="../../../images/as-config1.png" style="max-width: 100%"></a>

- ドメインとメアドの登録

<a class="fancybox" rel="gallery0"><img src="../../../images/as-config2.png" style="max-width: 100%"></a>


### 4. Sign out方法

設定アプリ -> パスワードとセキュリティ -> Apple IDを使用中のApp -> アプリを選択 -> 停止ボタンを選択
https://stackoverflow.com/questions/58018184/how-to-revoke-sign-in-with-apple-credentials-for-a-specific-app

### 参考
https://developer.apple.com/documentation/authenticationservices
https://help.apple.com/developer-account/?lang=en#/devde676e696
