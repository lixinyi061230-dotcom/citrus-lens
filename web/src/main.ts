import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from './App.vue';
import router from './router';
import { initGuestRoutes } from '/@/router/frontEnd';
import { Session } from '/@/utils/storage';
import { i18n } from '/@/i18n/index';
import other from '/@/utils/other';
import 'animate.css/animate.min.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '/@/theme/index.scss';
import VueGridLayout from 'vue-grid-layout';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import '/@/theme/fonts/iconfont.css'

// 游客先看首页：在挂载前注册 layout + homePage，避免动态添加导致 router-view 不切换
if (!Session.get('token')) initGuestRoutes();

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

other.elSvg(app);

app.use(pinia).use(router).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).use(VueGridLayout).mount('#app');

// PWA: register only in production build (HTTPS / localhost).
const isNativeApp = !!(window as any).Capacitor?.isNativePlatform?.();
if ('serviceWorker' in navigator && import.meta.env.PROD && !isNativeApp) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').catch(() => {});
	});
}
