<template>
	<div>
		<van-tabs
			title-active-color="var(--textColor)"
			:swipe-threshold="2"
			:animated="true"
			:border="true"
			v-model="path">
			<van-tab
				title="正在上映"
				name="/films/nowPlaying"
				to="/films/nowPlaying">
			</van-tab>
			<van-tab
				title="即将上映"
				name="/films/comingSoon"
				to="/films/comingSoon">
			</van-tab>
		</van-tabs>
	</div>
</template>
<script>
import { Tabs, Tab } from "vant"
export default {
	data() {
		return { path: "" }
	},
	components: {
		[Tabs.name]: Tabs,
		[Tab.name]: Tab,
	},
	mounted() {
		this.path = this.$route.path
	},
}
</script>
