title: コマンドラインでiPhoneにプッシュ通知を送る方法
category:
  - Tech
tags:
  - iOS
  - Push
  - Notification
  - CLI
date: 2022-04-26 22:24:38
---
### 1. ファイルをダウンロード

```bash
curl -o sender.sh https://gist.githubusercontent.com/hmhv/7ab39297bdb5efe8b63cd024d893f6bd/raw/29328be9e54a3c1fe36f97369bb1f5d13db286d4/sender.sh
chmod 755 ./sender.sh
curl -o params.sh https://gist.githubusercontent.com/hmhv/dd37cd462a63fa34b588d0eea1eb698d/raw/3db9e1616daa29a13e8afd13e0a14079cba2e781/params.sh
chmod 755 ./params.sh
```

### 2. 以下のページを参考に`params.sh`の各パラメータを編集

- [Generating a Remote Notification](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/generating_a_remote_notification/)
- [Sending Notification Requests to APNs](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns/)
- [Sending Push Notifications Using Command-Line Tools](https://developer.apple.com/documentation/usernotifications/sending_push_notifications_using_command-line_tools/)

### 3. `sender.sh`を実行

```bash
./sender.sh ./params.sh
```

### 4. `sender.sh`の内容

<script src="https://gist.github.com/hmhv/7ab39297bdb5efe8b63cd024d893f6bd.js"></script>

### 5. `params.sh`の内容

<script src="https://gist.github.com/hmhv/dd37cd462a63fa34b588d0eea1eb698d.js"></script>


