<template>
	<el-header class="layout-header" v-show="!isTagsViewCurrenFull">
		<div class="cl-mobile-brand"><b>橘鉴</b><span>CITRUS LENS</span></div>
		<NavBarsIndex />
	</el-header>
</template>

<style scoped lang="scss">
.cl-mobile-brand {
	display: none;
}

@media (max-width: 1000px) {
	.cl-mobile-brand {
		position: absolute;
		left: 16px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 3;
		display: flex;
		align-items: baseline;
		gap: 8px;
		pointer-events: none;

		b {
			font-family: 'Songti SC', 'New York', serif;
			font-size: 20px;
			letter-spacing: 0.14em;
			color: var(--cl-ink);
		}

		span {
			font-size: 7px;
			letter-spacing: 0.22em;
			color: var(--cl-sage);
		}
	}
}
</style>

<script setup lang="ts" name="layoutHeader">
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';

// 引入组件
const NavBarsIndex = defineAsyncComponent(() => import('/@/layout/navBars/index.vue'));

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
</script>
