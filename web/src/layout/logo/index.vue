<template>
	<div class="cl-brand" :class="{ 'is-collapsed': setCollapsed }" @click="onThemeConfigChange">
		<span class="cl-brand__mark">
			<svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
				<circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="1.4" opacity=".45" />
				<path d="M20 7c6.2 1.6 10 6.3 10 12.3C30 26.2 25.5 31 20 33c-5.5-2-10-6.8-10-13.7C10 13.3 13.8 8.6 20 7Z"
					fill="currentColor" opacity=".16" />
				<path d="M20 31V15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
				<path d="M20 20c-4.2-.2-6.7-2.2-7.4-5.9 4.2-.2 6.8 1.7 7.4 5.9Z" fill="currentColor" />
				<path d="M20 17.4c.7-4.2 3.2-6.3 7.3-6.2-.6 4.2-3 6.3-7.3 6.2Z" fill="currentColor" opacity=".7" />
			</svg>
		</span>
		<span v-if="!setCollapsed" class="cl-brand__copy">
			<b>橘鉴</b>
			<i>CITRUS LENS</i>
		</span>
	</div>
</template>

<script setup lang="ts" name="layoutLogo">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const setCollapsed = computed(() => {
	return themeConfig.value.isCollapse && document.body.clientWidth >= 1000;
});
const onThemeConfigChange = () => {
	if (themeConfig.value.layout === 'transverse') return false;
	themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
};
</script>

<style scoped lang="scss">
.cl-brand {
	display: flex;
	align-items: center;
	gap: 12px;
	width: 100%;
	height: 82px;
	padding: 0 20px;
	cursor: pointer;
	color: #f4efe4;
	user-select: none;
	transition: padding 0.2s ease;

	&.is-collapsed {
		justify-content: center;
		padding: 0;

		.cl-brand__mark {
			width: 40px;
			height: 40px;
		}
	}
}

.cl-brand__mark {
	display: grid;
	place-items: center;
	width: 40px;
	height: 40px;
	flex: 0 0 40px;
	border-radius: 14px;
	background: #d9f27a;
	color: #101a14;
	box-shadow: 0 10px 24px rgba(217, 242, 122, 0.18);

	svg {
		width: 27px;
		height: 27px;
	}
}

.cl-brand__copy {
	display: flex;
	flex-direction: column;
	line-height: 1;
	white-space: nowrap;

	b {
		font-family: 'Songti SC', 'New York', 'STSong', serif;
		font-size: 21px;
		font-weight: 700;
		letter-spacing: 0.12em;
	}

	i {
		font-style: normal;
		font-size: 8px;
		letter-spacing: 0.28em;
		margin-top: 7px;
		color: rgba(244, 239, 228, 0.45);
	}
}
</style>
