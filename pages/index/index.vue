<template>
	<div>
		<div class="line">
			<div @click="marker(26.49650106579765, 106.694000)">点</div>
			<div @click="polyline([
				 	[26.49651, 106.684],
				 	[26.49651, 106.694],
				 	[26.48651, 106.694]
				 ])">线</div>
		</div>
		<div id="editTMap" class="main_map"></div>
	</div>
</template>

<script>
	//引入依赖，你也可以在main.js中做全局依赖引入
	import '@/libs/leaflet/leaflet.css';
	import L from '@/libs/leaflet/leaflet'

	export default {

		data() {
			return {
				map: null,
				markerArr: null,
				polylineArr: null
			};
		},

		mounted() {
			this.initMap()
		},
		methods: {
			initMap(lat = 26.49650106579765, lng = 106.69402599334718) {
				// 创建地图实例，将其绑定到 id 参数为 "map" 的 DOM 元素上※
				this.map = L.map("editTMap");
				// 使用 setView() 方法设置地图中心点坐标（维度，经度）和初始缩放级别※
				this.map.setView([lat, lng], 16);
				this.marker(lat, lng)
				// 创建 Stamen 图层，并添加到地图上※
				var stamenLayer = L.tileLayer('/static/MAP_zxy/{z}/{x}/{y}.png', {
					attribution: '坐标标点', // 图层属性信息※
					minZoom: 10, // 最小缩放级别※
					maxZoom: 22, // 最大缩放级别※
					maxNativeZoom: 18,
				}).addTo(this.map)
			},
			//标记
			marker(lat, lng) {
				//
				if (this.markerArr) {
					this.map.removeLayer(this.markerArr);
				}
				if (this.polylineArr) {
					this.map.removeLayer(this.polylineArr);
				}
				this.markerArr = L.marker([lat, lng], {
					icon: new L.Icon({
						className: "lmap-icon",
						iconUrl: require('@/static/logo.png'), //坐标图标（仿照腾讯地图坐标标点，可去阿里图标库下载）
						iconSize: [30, 30], //图标大小
						iconAnchor: [20, 40], //位移，原点是左上角。X正轴右侧，Y正是下侧
						popupAnchor: [-3, -76], //弹出窗口（popup）的坐标，相对于图标锚点而言，将从该点打开。
						shadowSize: [68, 95], //阴影图像的大小，单位是像素。
						shadowAnchor: [22, 94] //阴影 "tip" 的坐标（相对于其左上角）（如果没有指定，则与iconAnchor相同）。
					})
				}).addTo(this.map);
				this.map.on("click", (evt) => {
					console.log(evt.latlng)

					console.log("lgtd", evt.latlng.lat)
					console.log("lttd", evt.latlng.lng)

					//修改坐标位置
					this.markerArr.setLatLng(evt.latlng)
				});
			},
			//画线
			polyline(latlngs) {
				if (this.markerArr) {
					this.map.removeLayer(this.markerArr);
				}
				if (this.polylineArr) {
					this.map.removeLayer(this.polylineArr);
				}
				this.polylineArr = L.polyline(latlngs, {
					color: 'red'
				}).addTo(this.map);
				// zoom the map to the polyline
				this.map.fitBounds(this.polylineArr.getBounds());
			}
		},
	};
</script>

<style lang="scss" scoped>
	/* 设置地图容器的高度和宽度 */
	.main_map {
		height: calc(100vh - 50px) !important;
		width: 100%;
	}

	.line {
		z-index: 10000;
		position: fixed;
		top: 20%;
		right: 0;
		background-color: #fff;
		border-radius: 10rpx;

		div {
			padding: 18rpx;
		}

		div:first-child {
			border-bottom: 1px solid #ccc;
		}
	}
</style>