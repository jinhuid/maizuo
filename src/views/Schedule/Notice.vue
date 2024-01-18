<template v-if="noticeMsg">
  <van-notice-bar left-icon="volume-o" :scrollable="false" background="#fbf4d8;" color="#e68e1a">
    <van-swipe vertical class="notice-swipe" :autoplay="1500" :show-indicators="false">
      <van-swipe-item v-for="(item, index) in noticeMsg.split('，')" :key="index">
        {{ item }}
      </van-swipe-item>
    </van-swipe>
  </van-notice-bar>
</template>
<script>
import { NoticeBar, Swipe, SwipeItem } from 'vant'
export default {
  props: {
    noticeMsg: String
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
}
</script>
<style lang="scss" scoped>
.notice-swipe {
  height: 2.5rem;
  line-height: 2.5rem;
}
</style>
