title: mitmproxyでiOS Simulatorを覗くためのメモ
category:
  - Tech
date: 2015-10-03 07:07:37
tags:
- iOS
- Simulator
- mitmproxy
---
## mitmproxy 

通信内容(http(s))を覗いたり、編集したりするプログラム

https://mitmproxy.org/

![mitmproxy](https://mitmproxy.org/images/mitmproxy-small.png)

>An interactive console program that allows traffic flows to be intercepted, inspected, modified and replayed.

### インストール

- mitmproxyのインストール

```
$ curl -O https://mitmproxy.org/download/osx-mitmproxy-0.13.tgz
$ tar zxvf osx-mitmproxy-0.13.tgz 
$ mv ./mitmdump /usr/local/bin/
$ mv ./mitmproxy /usr/local/bin/
$ rm ./osx-mitmproxy-0.13.tgz 
$ mitmproxy
```

- httpsのために証明書をインストール

```
$ curl -O https://raw.githubusercontent.com/ADVTOOLS/ADVTrustStore/master/iosCertTrustManager.py
$ chmod 744 ./iosCertTrustManager.py
$ ./iosCertTrustManager.py -a ~/.mitmproxy/mitmproxy-ca-cert.pem
$ rm ./iosCertTrustManager.py 
```

### 利用

- スクリプト実行でWi-Fiネットワークのプロキシ設定をオンにしてmitmproxyを起動し、終了時にオフにする

```Bash
#!/bin/sh
sudo networksetup -setwebproxy Wi-Fi localhost 8080
sudo networksetup -setsecurewebproxy Wi-Fi localhost 8080
sudo networksetup -setwebproxystate Wi-Fi on
sudo networksetup -setsecurewebproxystate Wi-Fi on
mitmproxy
sudo networksetup -setwebproxystate Wi-Fi off
sudo networksetup -setsecurewebproxystate Wi-Fi off
```


