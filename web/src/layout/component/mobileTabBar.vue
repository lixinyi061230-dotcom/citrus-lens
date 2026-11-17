<template>
	<nav class="cl-tabbar" aria-label="移动端主导航">
		<button
			v-for="tab in tabs"
			:key="tab.path"
			class="cl-tabbar__item"
			:class="{ 'is-active': isActive(tab) }"
			type="button"
			@click="go(tab)"
		>
			<span class="cl-tabbar__ico" v-html="tab.icon"></span>
			<span class="cl-tabbar__label">{{ tab.label }}</span>
		</button>
	</nav>
</template>

<script setup lang="ts" name="mobileTabBar">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const tabs = [
	{
		label: '首页',
		path: '/homePage',
		icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
	},
	{
		label: '检测',
		path: '/imgPredict',
		icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V5a1 1 0 0 1 1-1h3"/><path d="M20 8V5a1 1 0 0 0-1-1h-3"/><path d="M4 16v3a1 1 0 0 0 1 1h3"/><path d="M20 16v3a1 1 0 0 1-1 1h-3"/><circle cx="12" cy="12" r="3.4"/></svg>',
	},
	{
		label: '记录',
		path: '/imgRecord',
		icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
	},
	{
		label: '助手',
		path: '/smartChat',
		icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-6.5A7.5 7.5 0 0 1 10.5 4h2A7.5 7.5 0 0 1 20 11.5Z"/><path d="M8.5 10.5h7M8.5 14h4.5"/></svg>',
	},
	{
		label: '我的',
		path: '/personal',
		icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>',
	},
];

const isActive = (tab: { path: string }) => {
	if (tab.path === '/homePage') return route.path === '/homePage' || route.path === '/';
	return route.path === tab.path || route.path.startsWith(tab.path + '/');
};

const go = (tab: { path: string }) => {
	if (route.path !== tab.path) router.push(tab.path);
};
</script>

<style scoped lang="scss">
.cl-tabbar {
	display: none;
}

@media (max-width: 1000px) {
	.cl-tabbar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 3000;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 2px;
		padding: 7px 8px calc(7px + env(safe-area-inset-bottom));
		background: rgba(255, 253, 248, 0.94);
		backdrop-filter: blur(18px);
		-webkit-backdrop-filter: blur(18px);
		border-top: 1px solid rgba(16, 26, 20, 0.1);
		box-shadow: 0 -12px 30px rgba(16, 26, 20, 0.06);
	}

	.cl-tabbar__item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 3px;
		padding: 2px 0;
		border: 0;
		background: transparent;
		color: #8b978d;
		font-family: inherit;
		cursor: pointer;
		transition: color 0.18s ease;

		&.is-active {
			color: #101a14;
		}
	}

	.cl-tabbar__ico {
		display: grid;
		place-items: center;
		width: 40px;
		height: 26px;
		border-radius: 10px;
		transition: background 0.18s ease, color 0.18s ease;

		:deep(svg) {
			width: 19px;
			height: 19px;
		}
	}

	.cl-tabbar__item.is-active .cl-tabbar__ico {
		background: #101a14;
		color: #d9f27a;
	}

	.cl-tabbar__label {
		font-size: 8px;
		letter-spacing: 0.08em;
	}
}
</style>
