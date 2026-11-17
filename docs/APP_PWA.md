# 橘鉴 · PWA / 手机端改造记录（2026-11-05）

## 这次做了什么

在原有 Vue3 + Element Plus Web 上增加了一个手机 App 外壳，不重写业务：

- 手机（<1000px）隐藏桌面侧栏
- 底部 5 个 Tab：首页 / 检测 / 记录 / 助手 / 我的
- 顶部改为“橘鉴 CITRUS LENS”品牌头
- 检测页支持手机相机/相册选择（`accept="image/*"`）
- 检测记录在手机端从表格变为卡片流（图片、病害、置信度、时间、删除）
- 聊天页高度避开底部 Tab，输入框不再被遮挡
- 增加 PWA 安装清单、Service Worker、App 图标
- Vite 改为监听 `0.0.0.0`，同一 Wi-Fi 下手机可访问

## 手机访问方式

1. Mac 和手机连同一个 Wi-Fi
2. 启动网页：

```bash
cd ~/Documents/YOLO_AI
./启动网页.command
```

3. 手机浏览器打开：

```text
http://10.204.53.90:8888
```

4. 登录 `admin / admin`

> 如果手机打不开：检查 macOS 防火墙是否允许 node 接收入站连接；确认 Mac 和手机在同一网段。

## 添加到主屏幕

- iPhone Safari：分享 → 添加到主屏幕
- Android Chrome：菜单 → 添加到主屏幕 / 安装应用

在局域网 HTTP 下，iPhone 可以添加到主屏幕；Android 的完整“安装”提示通常要求 HTTPS。  
如果要真正的离线 PWA，需要 HTTPS（Cloudflare Tunnel 或云服务器）。

## PWA 文件

- `public/manifest.webmanifest`
- `public/sw.js`
- `public/pwa-192.png`
- `public/pwa-512.png`
- `public/apple-touch-icon.png`
- `src/main.ts`：生产环境注册 Service Worker
- `index.html`：manifest / theme-color / apple meta

## 移动端文件

- `src/layout/component/mobileTabBar.vue`：底部 Tab
- `src/layout/index.vue`：挂载 Tab
- `src/theme/redesign.scss`：≤1000px 隐藏侧栏、底部安全区、聊天高度、个人中心 Tag
- `src/views/imgPredict/index.vue`：相机/相册上传、移动端标题
- `src/views/imgRecord/index.vue`：手机卡片流
- `.local-run/manage.py`：Vite `--host 0.0.0.0`

## 已验证

- 390×844 视口：登录、首页、检测、记录、我的、助手均正常显示
- 底部 Tab 可切换
- 检测记录卡片显示真实数据
- 桌面 1249px 仍保持原样，底部 Tab 隐藏
- `npm run build` 成功，`dist/` 内含 manifest、sw、图标

## 这还不是 APK

当前是 **PWA / 手机网页**，不是 Android APK 或 iOS ipa。

要生成 APK，需要：

1. 安装 Android Studio
2. `npm install @capacitor/core @capacitor/cli @capacitor/android`
3. `npx cap init "橘鉴" com.citruslens.app --web-dir=dist`
4. `npm run build && npx cap add android && npx cap sync`
5. Android Studio → Build APK

iOS 需要 Xcode + Apple Developer 账号。
