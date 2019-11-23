title: iosのAVPlayerでlive動画を最新に維持する方法
category:
  - Tech
tags:
  - iOS
  - AVPlayer
date: 2018-01-17 20:57:19
---
AVPlayer の`automaticallyWaitsToMinimizeStalling`を`NO`にしても通信環境などによっては
遅延が発生して再生される。そのときは直接`seekToTime `で最新にする

```
 double time = MAXFLOAT;
 [player seekToTime: CMTimeMakeWithSeconds(time, NSEC_PER_SEC)];
```

https://developer.apple.com/documentation/avfoundation/avplayer/1643482-automaticallywaitstominimizestal
https://stackoverflow.com/questions/13145048/hls-avplayer-on-ios-return-to-live