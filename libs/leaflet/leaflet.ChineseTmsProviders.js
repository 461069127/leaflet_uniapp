var L = window.L

L.TileLayer.ChinaProvider = L.TileLayer.extend({

	initialize: function(type, options) { // (type, Object)
		if (!options) {
			options = {}
		}
		var providers = L.TileLayer.ChinaProvider.providers
		var parts = type.split('.')

		var providerName = parts[0]
		var mapName = parts[1]
		var mapType = parts[2]

		var url = providers[providerName][mapName][mapType]
    options.subdomains =  options.subdomains  || providers[providerName].Subdomains

		L.TileLayer.prototype.initialize.call(this, url, options)
	}
})

L.TileLayer.ChinaProvider.providers = {
	TianDiTu: {
		Normal: {
			Map: '//t{s}.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}',
			Annotion: '//t{s}.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}'
		},
		Satellite: {
			Map: 'https://t{s}.tianditu.gov.cn/img_w/wmts?tk={key}&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
			Annotion: 'https://t{s}.tianditu.gov.cn/img_w/wmts?tk={key}&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}'
		},
		Terrain: {
			Map: '//t{s}.tianditu.com/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={key}',
			Annotion: '//t{s}.tianditu.com/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}'
		},
		YunNan: {
      /*
      	https://[maps1,maps2].ynmap.cn/tileServer/service/maps/ynImgMN/3857/wmts
      */
      Map: 'https://{s}.ynmap.cn/tileServer/service/maps/ynImgMN/3857/WMTS/tile/{style}/{z}/{y}/{x}?key={key}',
			Annotion: 'http://t{s}.tianditu.com/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}'
		},
		Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
		key: '174705aebfe31b79b3587279e211cb9a'
	},
	MapBox: {
		Normal: {
			// Map: 'https://api.mapbox.com/styles/v1/{user}/{style}/Draft/tiles/256/{z}/{x}/{y}?access_token={token}'
			// Map: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
			Map: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
		},
		Subdomains: []
	},

	MapABC: {
		Normal: {
			Map: 'http://emap{s}.mapabc.com/mapabc/maptile?&x={x}&y={y}&z={z}'
		},
		Subdomains: ['0', '1', '2', '3']
	},

	GaoDe: {
		Normal: {
			Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
		},
		Satellite: {
			Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
			Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
		},
		Subdomains: ['1', '2', '3', '4']
	},

	GoogleCN: {
		Normal: {
			Map: 'http://mt{s}.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
		},
		Subdomains: ['1', '2', '3']
	},
	Geoq: {
		Normal: {
			Map: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
			PurplishBlue: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
			Gray: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
			Warm: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}'
		},
		Theme: {
			Hydro: 'http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}'
		},
		Subdomains: []
	}
}

L.tileLayer.chinaProvider = function(type, options) {
	return new L.TileLayer.ChinaProvider(type, options)
}
