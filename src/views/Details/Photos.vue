<template>
	<div
		class="photos"
		v-if="dataList">
		<div class="photos-title-bar">
			<span>剧照</span>
			<span v-if="dataList.photos">全部({{ dataList.photos.length }})></span>
		</div>
		<div
			class="photos-swiper"
			v-if="dataList.photos">
			<MulSwiper
				:info="{ preview: 2.5, name: 'myphotos' }"
				:items="dataList.photos">
				<template #default="{ item, index }">
					<div
						class="imgCont"
						@click="showImage(index)">
						<img :src="item" /></div
				></template>
			</MulSwiper>
		</div>
		<div
			class="photos-swiper"
			v-if="!dataList.photos">
			暂无电影剧照
		</div>
		<div
			v-if="dataList.isSale"
			class="footer"></div>
	</div>
</template>
<script>
import MulSwiper from "@/components/MulSwiper.vue"
import { ImagePreview } from "vant"
export default {
	props: ["dataList"],
	components: {
		MulSwiper,
	},
	methods: {
		showImage(index) {
			console.log(1111)
			ImagePreview({
				images: this.dataList.photos,
				startPosition: index,
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.footer {
	width: 100%;
	height: 49px;
}
.photos {
	overflow: hidden;
	background-color: #fff;
	// height: 11.0625rem;
	width: 100%;
	margin-top: 10px;
	margin-bottom: 60px;
	.photos-title-bar {
		font-size: 16px;
		height: 62px;
		padding: 15px;
		box-sizing: border-box;
		span:nth-child(2) {
			font-size: 13px;
			float: right;
			color: #797d82;
		}
	}
}
.photos-swiper {
	line-height: 58px;
	height: 115px;
	width: 100%;
	padding: 0 8px;
	box-sizing: border-box;
	overflow: hidden;
	text-align: center;
	font-size: 14px;
	color: #bdc0c5;
	.imgCont {
		height: 100px;
		width: 150px;
		img {
			height: 100%;
			width: 100%;
		}
	}
}
</style>
