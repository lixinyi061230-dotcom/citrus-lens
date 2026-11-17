import type { CapacitorConfig } from '@capacitor/cli';

/**
 * 橘鉴 App（Android / iOS）
 *
 * 构建方式：
 *   npm run build:app       # 以 .env.capacitor 的接口地址打包 dist
 *   npx cap sync android
 *
 * 注意：当前版本把网页资源打进安装包，接口地址由 .env.capacitor 决定。
 * 上线前把 .env.capacitor 里的 VITE_API_ORIGIN / VITE_FLASK_ORIGIN
 * 改成公网 HTTPS 域名，再重新 build + sync。
 */
const config: CapacitorConfig = {
	appId: 'com.citruslens.app',
	appName: '橘鉴',
	webDir: 'dist',
	server: {
		url: 'http://172.20.10.4:8888',
		cleartext: true,
		allowNavigation: ['10.204.157.31'],
	},
	android: {
		allowMixedContent: true,
		webContentsDebuggingEnabled: true,
	},
};

export default config;
