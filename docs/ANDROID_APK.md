# 橘鉴 Android APK（v1.4 / debug）

## 安装包

```text
/Users/macbook/Documents/YOLO_AI/android-app/橘鉴-v1.4-debug.apk
```

- 大小：26 MB
- 包名：`com.citruslens.app`
- 应用名：橘鉴
- 版本：1.4.0
- minSdk：24（Android 7.0+）
- targetSdk：36
- 签名：Android Debug（可安装，不能上架应用商店）
- SHA256：`4cbef490c8374c9b70790009ef5bb937492c4d2979e8bb60868c3bc162b154f5`

## 这版改了什么

1. **打开 App 先看首页**，不再直接跳登录页。
2. 游客可以浏览首页。
3. 点击“开始一次检测” / 底部“检测” / “记录” / “我的”时才跳登录。
4. 登录页保留“注册账号”入口。
5. 登录成功后自动回到刚才想去的检测页。
6. 手机顶部显示“橘鉴 CITRUS LENS”品牌和“登录”按钮。

## 安装

1. **先卸载手机里所有旧版“橘鉴”**。
2. 把 `橘鉴-v1.4-debug.apk` 发到 Android 手机。
3. 点击安装，允许“未知来源”。
4. 手机和 Mac 连**同一个 Wi-Fi**。
5. Mac 上启动服务：

```bash
cd ~/Documents/YOLO_AI
./启动网页.command
```

6. 打开 App：

   - 先看到首页
   - 点“开始一次检测” → 登录页
   - 登录 `admin / admin`
   - 自动回到检测页

## 为什么会白屏

这台 Mac 的局域网 IP 变了：

```text
旧 IP：10.204.157.31
现在：172.20.10.4
```

之前的 APK 写死了旧 IP，手机连不上，所以白屏。v1.4 已改成当前 IP。

### 当前必须满足

- 手机和 Mac 同一 Wi-Fi
- Mac 不睡眠
- Web 服务运行在 `172.20.10.4:8888`
- Spring Boot `9999`、Flask `5001`、MySQL `3307` 运行
- macOS 防火墙允许 node/java/python 入站

### IP 再变了怎么办

1. 查新 IP：

```bash
ipconfig getifaddr en0
```

2. 修改：

```text
~/.cache/yolo-ai/frontend/.env.capacitor
```

```env
VITE_API_ORIGIN = 'http://新IP:9999'
VITE_FLASK_ORIGIN = 'http://新IP:5001'
```

3. 修改：

```text
~/.cache/yolo-ai/frontend/capacitor.config.ts
server.url = 'http://新IP:8888'
allowNavigation = ['新IP']
```

4. 重新构建：

```bash
cd ~/.cache/yolo-ai/frontend
npm run build:app
npx cap sync android
cd android
export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
export ANDROID_HOME=/opt/homebrew/share/android-commandlinetools
./gradlew assembleDebug
```

## 当前限制

- debug APK，不是应用商店正式包。
- 不是离线 App，必须能访问 Mac 上的服务。
- 没有真机安装测试；如仍打不开，请把 Android 手机用 USB 连接 Mac 并打开 USB 调试，抓 `adb logcat`。
- iPhone 原生 IPA 仍未构建，需要 Xcode + Apple Developer 账号；iPhone 用 Safari 打开当前地址后“添加到主屏幕”。

## 如果还是白屏

先用手机浏览器打开：

```text
http://172.20.10.4:8888
```

如果浏览器也打不开，是网络/防火墙/IP 问题，不是 APK。
如果浏览器能打开但 App 白屏，连接 USB 后抓日志。
