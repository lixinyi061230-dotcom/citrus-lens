<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElCard, ElButton, ElSelect, ElOption, ElTag } from 'element-plus'
import 'element-plus/dist/index.css'

// 天气信息
const weatherInfo = ref({
	date: '',
	weekday: '',
	status: '',
	temperature: '',
	weather: '',
	wind: '',
	airQuality: '',
	notice: ''
})

// 识别结果概览（右侧）
const selectedCrop = ref('四季作物')
const selectedResult = ref('病虫害综合诊断')

// 示例：识别结果（你可以后面从接口取真实数据）
const latestResult = ref({
	name: '暂无',
	confidence: 0,
	time: '',
	feature: '等待识别结果…',
	advice: '等待识别结果…'
})

// 顶部图片区（替换成你自己的资源）
const bannerImages = ref([
	'../1.png',
	'../2.jpg',
	'../3.png'
])

// 四季作物（左下）
const cropTypes = ref([
	{ name: '春', crop: '玉米', status: '需要关注', plantCount: 350, diseaseCount: 20 },
	{ name: '夏', crop: '水稻', status: '需要关注', plantCount: 400, diseaseCount: 15 },
	{ name: '秋', crop: '小麦', status: '需要关注', plantCount: 330, diseaseCount: 18 },
	{ name: '冬', crop: '柑橘', status: '重点关注', plantCount: 200, diseaseCount: 20 }
])

// 常用应用（右侧快捷入口）
const quickApps = ref([
	{ name: '病虫数据档案中心', route: '/infoDisease', icon:''},
	{ name: '智农事小助手', route: '/smartChat', icon: '' },
	{ name: '作物病害视觉检测', route: '/imgPredict', icon: '' },
	{ name: '图片检测记录', route: '/imgRecord', icon: '' },
	{ name: '视频识别记录', route: '/videoRecordt', icon: '' },
	{ name: '摄像识别记录', route: '/cameraRecord', icon: '' }
])

// 农业链接（右下）
const agricultureLinks = ref([
	{ name: '中国农村网', url: 'https://www.crnews.net/' },
	{ name: '国家农业数据中心', url: 'https://www.agridata.cn/' },
	{ name: '中国农业科学院', url: 'https://www.caas.cn/' },
	{ name: '中国农业农村信息网', url: 'https://www.agri.cn/' }
])

// 获取天气数据（你原来的逻辑保留）
const fetchWeatherData = async () => {
	try {
		const appid = '99592529'
		const appsecret = 't8t2DRAD'
		const cityid = '101010100'
		const url = `http://v1.yiketianqi.com/api?unescape=1&version=v61&appid=${appid}&appsecret=${appsecret}&cityid=${cityid}`

		const response = await fetch(url)
		const data = await response.json()

		weatherInfo.value = {
			date: data.date,
			weekday: data.week,
			status: data.city,
			temperature: data.tem + '°C',
			weather: data.wea,
			wind: `${data.win} ${data.win_speed}`,
			airQuality: `${data.air_level} (AQI: ${data.air})`,
			notice: data.air_tips
		}
	} catch (err) {
		console.error('获取天气数据失败:', err)
	}
}

onMounted(() => {
	fetchWeatherData()
})

// 右侧按钮：模拟触发（你可以换成路由跳转/打开弹窗）
const runDiagnosis = () => {
	latestResult.value = {
		name: '示例：叶斑病',
		confidence: 87,
		time: new Date().toLocaleString(),
		feature: '叶片出现褐色不规则斑点，边缘有黄晕，后期斑点扩大融合。',
		advice: '建议清除病残体，控制田间湿度；必要时使用代森锰锌/咪鲜胺等（按当地农技指导）。'
	}
}
</script>

<template>
	<div class="home">
		<!-- 顶部抬头（更像“高级后台”） -->
		<div class="topbar">
			<div class="topbar-left">
				<div class="brand-dot"></div>
				<div class="brand">
					<div class="brand-title">智慧农业</div>
					<div class="brand-sub">病害识别与管理平台</div>
				</div>
			</div>

			<div class="topbar-right">
				<div class="weather-pill">
					<div class="pill-title">天气</div>
					<div class="pill-main">
						{{ weatherInfo.status }} · {{ weatherInfo.weather }} · {{ weatherInfo.temperature }}
					</div>
					<div class="pill-sub">
						{{ weatherInfo.date }} {{ weatherInfo.weekday }} · {{ weatherInfo.wind }} · {{
							weatherInfo.airQuality }}
					</div>
				</div>
			</div>
		</div>

		<!-- 主体：左大右小 -->
		<div class="layout">
			<!-- 左侧主内容 -->
			<div class="left">
				<!-- 系统提示 + 图片（对应你截图中间的大卡） -->
				<ElCard class="glass-card big-card" shadow="never">
					<template #header>
						<div class="card-hd">
							<div class="hd-title">系统提示</div>
							<div class="hd-sub">平台核心功能与使用说明</div>
						</div>
					</template>

					<div class="big-content">
						<div class="big-text">
							<div class="tip-title">使用建议</div>
							<div class="tip-paragraph">
								欢迎使用智慧农业病害识别与管理平台。本平台融合病害智能识别、图像分析、数据统计与辅助决策等能力，
								支持上传作物图片快速识别常见病虫害类型，并提供防治建议与参考信息。
							</div>

							<div class="tip-title" style="margin-top: 14px;">注意事项</div>
							<ul class="tip-list">
								<li>请上传清晰、对焦准确的叶片/果实/病斑图片，尽量减少背景干扰。</li>
								<li>识别结果仅供参考，严重情况建议咨询当地农技人员。</li>
								<li>如遇功能异常，请及时联系管理员。</li>
							</ul>
						</div>

						<div class="big-images">
							<div class="img-grid">
								<div v-for="(src, i) in bannerImages" :key="i" class="img-wrap">
									<img :src="src" alt="banner" />
								</div>
							</div>
						</div>
					</div>
				</ElCard>

				<!-- 四季作物（对应你截图中下方的大区域） -->
				<ElCard class="glass-card" shadow="never" style="margin-top: 16px;">
					<template #header>
						<div class="card-hd row-between">
							<div>
								<div class="hd-title">四季作物</div>
								<div class="hd-sub">种植概览与风险提醒</div>
							</div>
							<div class="season-chips">
								<span class="chip">春</span>
								<span class="chip">夏</span>
								<span class="chip">秋</span>
								<span class="chip">冬</span>
							</div>
						</div>
					</template>

					<div class="season-grid">
						<div v-for="(item, idx) in cropTypes" :key="idx" class="season-card">
							<div class="season-head">
								<div class="season-name">{{ item.name }}</div>
								<ElTag :type="item.status === '需要关注' ? 'warning' : 'success'" effect="light">
									{{ item.status }}
								</ElTag>
							</div>

							<div class="season-body">
								<div class="meta-row">
									<span class="meta-k">作物</span>
									<span class="meta-v">{{ item.crop }}</span>
								</div>
								<div class="meta-row">
									<span class="meta-k">种植数量</span>
									<span class="meta-v good">{{ item.plantCount }}</span>
								</div>
								<div class="meta-row">
									<span class="meta-k">病害数量</span>
									<span class="meta-v bad">{{ item.diseaseCount }}</span>
								</div>
							</div>
						</div>
					</div>
				</ElCard>
			</div>

			<!-- 右侧：结果概览 + 快捷入口 + 参考图片 -->
			<div class="right">
				<!-- 识别结果概览（对应你截图右上） -->
				

				<!-- 快捷入口（对应你截图右中） -->
				<ElCard class="glass-card" shadow="never" style="margin-top: 16px;">
					<template #header>
						<div class="card-hd">
							<div class="hd-title">功能入口</div>
							<div class="hd-sub">快速进入常用模块</div>
						</div>
					</template>

					<div class="apps-grid">
						<div v-for="(app, i) in quickApps" :key="i" class="app-tile" @click="$router.push(app.route)">
							<div class="app-ico">
								<i class="iconfontjs" :class="app.icon"></i>
							</div>
							<div class="app-name">{{ app.name }}</div>
						</div>
					</div>
				</ElCard>

				<!-- 参考图片（对应你截图右下） -->
				<ElCard class="glass-card" shadow="never" style="margin-top: 16px;">
					<template #header>
						<div class="card-hd">
							<div class="hd-title">参考图片</div>
							<div class="hd-sub">示例素材与对比</div>
						</div>
					</template>

					<div class="ref-grid">
						<div class="ref" v-for="(src, i) in bannerImages.slice(0, 2)" :key="i">
							<img :src="src" alt="ref" />
						</div>
					</div>

					<div class="link-group">
						<a v-for="(link, i) in agricultureLinks" :key="i" :href="link.url" target="_blank"
							class="link-item">
							{{ link.name }}
						</a>
					</div>
				</ElCard>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.home {
	min-height: 100vh;
	padding: 18px;
	background:
		radial-gradient(1200px 600px at 20% 10%, rgba(34, 197, 94, 0.25), transparent 60%),
		radial-gradient(900px 500px at 85% 20%, rgba(16, 185, 129, 0.18), transparent 55%),
		linear-gradient(180deg, #0b3d1e 0%, #0b2f1a 45%, #0a2616 100%);
}

/* 顶部条 */
.topbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 14px;
	margin-bottom: 16px;

	.topbar-left {
		display: flex;
		align-items: center;
		gap: 12px;

		.brand-dot {
			width: 14px;
			height: 14px;
			border-radius: 999px;
			background: linear-gradient(180deg, #34d399, #22c55e);
			box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18);
		}

		.brand-title {
			color: rgba(255, 255, 255, 0.92);
			font-weight: 800;
			font-size: 18px;
			letter-spacing: 0.5px;
			line-height: 1.2;
		}

		.brand-sub {
			color: rgba(255, 255, 255, 0.6);
			font-size: 12px;
			margin-top: 2px;
		}
	}

	.weather-pill {
		width: min(560px, 62vw);
		padding: 10px 12px;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.12);
		backdrop-filter: blur(10px);

		.pill-title {
			color: rgba(255, 255, 255, 0.7);
			font-size: 12px;
			margin-bottom: 2px;
		}

		.pill-main {
			color: rgba(255, 255, 255, 0.92);
			font-weight: 700;
			font-size: 14px;
			margin-bottom: 2px;
		}

		.pill-sub {
			color: rgba(255, 255, 255, 0.6);
			font-size: 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}

/* 主布局：左大右小 */
.layout {
	display: grid;
	grid-template-columns: 1.7fr 1fr;
	gap: 16px;

	@media (max-width: 1100px) {
		grid-template-columns: 1fr;
	}
}

/* 卡片统一风格：高级感核心 */
.glass-card {
	border-radius: 18px;
	border: 1px solid rgba(255, 255, 255, 0.12);
	background: rgba(255, 255, 255, 0.06);
	backdrop-filter: blur(10px);
	overflow: hidden;

	:deep(.el-card__header) {
		padding: 14px 16px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.10);
	}

	:deep(.el-card__body) {
		padding: 16px;
	}
}

.big-card {
	:deep(.el-card__body) {
		padding: 18px;
	}
}

.card-hd {
	.hd-title {
		color: rgba(255, 255, 255, 0.92);
		font-weight: 800;
		font-size: 16px;
		letter-spacing: 0.3px;
	}

	.hd-sub {
		color: rgba(255, 255, 255, 0.6);
		font-size: 12px;
		margin-top: 2px;
	}
}

.row-between {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
}

/* 大卡内容：左文右图 */
.big-content {
	display: grid;
	grid-template-columns: 1.2fr 1fr;
	gap: 14px;

	@media (max-width: 1100px) {
		grid-template-columns: 1fr;
	}

	.big-text {
		.tip-title {
			color: rgba(255, 255, 255, 0.9);
			font-weight: 800;
			font-size: 14px;
			margin-bottom: 6px;
		}

		.tip-paragraph {
			color: rgba(255, 255, 255, 0.72);
			font-size: 13px;
			line-height: 1.9;
		}

		.tip-list {
			margin: 0;
			padding-left: 18px;
			color: rgba(255, 255, 255, 0.72);
			font-size: 13px;
			line-height: 1.9;
		}
	}

	.big-images {
		.img-grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 10px;

			@media (max-width: 1100px) {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		.img-wrap {
			border-radius: 14px;
			overflow: hidden;
			border: 1px solid rgba(255, 255, 255, 0.12);
			background: rgba(255, 255, 255, 0.04);
			transform: translateY(0);
			transition: transform 0.2s ease, box-shadow 0.2s ease;

			img {
				width: 100%;
				height: 150px;
				object-fit: cover;
				display: block;
			}

			&:hover {
				transform: translateY(-2px);
				box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
			}
		}
	}
}

/* 四季作物 */
.season-chips {
	display: flex;
	gap: 8px;

	.chip {
		padding: 6px 10px;
		border-radius: 999px;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.82);
		background: rgba(255, 255, 255, 0.10);
		border: 1px solid rgba(255, 255, 255, 0.12);
	}
}

.season-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 12px;

	@media (max-width: 1100px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 520px) {
		grid-template-columns: 1fr;
	}

	.season-card {
		border-radius: 16px;
		padding: 14px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.10);
		transition: transform 0.2s ease, box-shadow 0.2s ease;

		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 14px 26px rgba(0, 0, 0, 0.28);
		}

		.season-head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 10px;

			.season-name {
				color: rgba(255, 255, 255, 0.92);
				font-weight: 900;
				font-size: 18px;
			}
		}

		.season-body {
			.meta-row {
				display: flex;
				justify-content: space-between;
				padding: 7px 0;
				border-bottom: 1px dashed rgba(255, 255, 255, 0.12);

				&:last-child {
					border-bottom: none;
				}

				.meta-k {
					color: rgba(255, 255, 255, 0.6);
					font-size: 12px;
				}

				.meta-v {
					color: rgba(255, 255, 255, 0.85);
					font-weight: 700;
					font-size: 12px;
				}

				.good {
					color: rgba(34, 197, 94, 0.95);
				}

				.bad {
					color: rgba(248, 113, 113, 0.95);
				}
			}
		}
	}
}

/* 右侧：结果卡 */
.result-panel {
	.select-row {
		margin-bottom: 10px;
	}

	.btn-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-bottom: 12px;
	}

	.full {
		width: 100%;
	}

	.result-box {
		border-radius: 16px;
		padding: 12px;
		background: rgba(0, 0, 0, 0.18);
		border: 1px solid rgba(255, 255, 255, 0.10);

		.rb-title {
			color: rgba(255, 255, 255, 0.9);
			font-weight: 800;
			font-size: 13px;
			margin-bottom: 6px;

			.rb-name {
				color: rgba(34, 197, 94, 0.95);
			}

			.rb-conf {
				color: rgba(255, 255, 255, 0.75);
			}
		}

		.rb-time {
			color: rgba(255, 255, 255, 0.6);
			font-size: 12px;
			margin-bottom: 10px;
		}

		.rb-block {
			margin-top: 10px;

			.rb-k {
				color: rgba(255, 255, 255, 0.75);
				font-weight: 800;
				font-size: 12px;
				margin-bottom: 4px;
			}

			.rb-v {
				color: rgba(255, 255, 255, 0.72);
				font-size: 12px;
				line-height: 1.8;
			}
		}
	}
}

/* 快捷入口 */
.apps-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;

	.app-tile {
		border-radius: 16px;
		padding: 12px;
		background: rgba(255, 255, 255, 0.07);
		border: 1px solid rgba(255, 255, 255, 0.10);
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

		display: flex;
		align-items: center;
		gap: 10px;

		&:hover {
			transform: translateY(-2px);
			background: rgba(255, 255, 255, 0.10);
			box-shadow: 0 14px 26px rgba(0, 0, 0, 0.26);
		}

		.app-ico {
			width: 36px;
			height: 36px;
			border-radius: 12px;
			display: grid;
			place-items: center;
			background: rgba(34, 197, 94, 0.14);
			border: 1px solid rgba(34, 197, 94, 0.25);

			i {
				font-size: 18px;
				color: rgba(34, 197, 94, 0.95);
			}
		}

		.app-name {
			color: rgba(255, 255, 255, 0.88);
			font-weight: 800;
			font-size: 13px;
			line-height: 1.2;
		}
	}
}

/* 参考图片 + 链接 */
.ref-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
	margin-bottom: 12px;

	.ref {
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.12);

		img {
			width: 100%;
			height: 130px;
			object-fit: cover;
			display: block;
		}
	}
}

.link-group {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;

	.link-item {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.78);
		font-size: 12px;
		padding: 8px 10px;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.10);
		transition: background 0.2s ease, transform 0.2s ease;

		&:hover {
			background: rgba(255, 255, 255, 0.10);
			transform: translateY(-1px);
		}
	}
}
</style>