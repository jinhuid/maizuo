<template>
  <div
    :style="{
      left: 24 * (+item.columnNum + seatInterval / 2 - 1) + 'px',
      top: 24 * (+item.rowNum - 1) + 'px'
    }"
  >
    <img style="height: 100%; width: 100%" :src="seatIcon" :index="index" />
  </div>
</template>
<script>
// import "@/assets/font_seats/iconfont.css"
import img1 from '@/assets/座位图标_可选择座位.png'
import img2 from '@/assets/座位锁定.png'
import img3 from '@/assets/座位图标_已售座位.png'
import img4 from '@/assets/座位图标_已选择座位.png'
export default {
  props: {
    item: { type: Object, require: true },
    index: { type: Number, require: true },
    seatInterval: { type: Number, default: 0 }
  },
  data() {
    return {
      img1,
      img2,
      img3,
      img4
    }
  },
  computed: {
    seatIcon() {
      if (this.item.isBroken) {
        return img2
      } else if (this.item.isOccupied) {
        return img3
      } else if (this.item.isChoose) {
        return img4
      } else {
        return img1
      }
    }
  }
}
</script>
<style scoped>
img {
  pointer-events: none;
}
</style>
