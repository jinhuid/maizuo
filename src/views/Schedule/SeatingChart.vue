<template>
  <div class="seating-chart-wrap" v-if="seatingChart">
    <div v-if="mapWidth" class="screen" ref="screen">
      <!-- transform:`translateX(${mapWidth*mapScale+tsfX}px) scale(${mapScale})` -->
      <img :src="screen" :style="{ width: `100%`, height: `100%` }" alt="" />
      <div class="info" ref="infoBox">
        <slot></slot>
      </div>
    </div>

    <div
      class="rowNav"
      ref="rowNav"
      :style="{
        height: `${seatingChart.height * seatSize}px`
      }"
    >
      <div v-for="item in seatingChart.height" :key="item">{{ item }}</div>
    </div>

    <div
      class="seating-chart"
      :style="{
        width: `${(seatingChart.width + seatInterval) * seatSize}px`,
        height: `${(seatingChart.height + seatInterval) * seatSize}px` //这里的数字为了在底部流出空隙
      }"
      @click="chooseSeat($event)"
      ref="seatMap"
    >
      <Seat-icon
        v-for="(item, index) in seatingChart.seats"
        :key="index"
        :item="item"
        :index="index"
        :seatInterval="seatInterval"
        :size="seatSize"
      >
      </Seat-icon>
    </div>
  </div>
</template>
<script>
// 这个库的还是缺少了一些feature 所以把他放在util中进行简单功能添加
import { EasyScroller } from '@/util/easyscroller'
import { Toast } from 'vant'
import http from '@/util/http'
import SeatIcon from './SeatIcon'
import screen from '@/assets/屏幕.png'

export default {
  props: {
    maxSeat: { type: Number, require: true }
  },
  components: { SeatIcon },
  data() {
    return {
      seatingChart: null,
      seatInterval: 6,
      scroller: null,
      mapWidth: 0,
      mapScale: 1,
      screen: screen,
      // 如果看不到变化 是因为初始化的scale太小
      seatSize: 24
    }
  },
  mounted() {
    this.getSeatingChart(this.$route.params.scheduleId)
  },
  methods: {
    getSeatingChart(scheduleId) {
      http({
        url: `/gateway/?scheduleId=${scheduleId}&k=4878872`,
        headers: {
          'X-Host': 'mall.film-ticket.seat.list'
        }
      }).then((res) => {
        this.seatingChart = res.data.data.seatingChart
        this.mapScale =
          document.documentElement.clientWidth /
          (this.seatingChart.width + this.seatInterval) /
          this.seatSize
        this.mapWidth = ((this.seatingChart.width + this.seatInterval) * this.seatSize) / 2
        this.$nextTick(() => {
          this.refreshMap()
        })
      })
    },
    chooseSeat(e) {
      if (e.target.tagName !== 'IMG') return

      const index = e.target.dataset.index
      const seat = this.seatingChart.seats[index]
      //未被占用and未损坏
      if (seat.isBroken || seat.isOccupied) return

      if (!Object.hasOwn(seat, 'isChoose')) {
        this.$set(seat, 'isChoose', false)
      }

      if (seat.isChoose) {
        // 点击了被选中的座位
        this.$store.commit('chosenDeleteOne', seat)
      } else {
        // 点击空的座位 没有超过最大限购
        if (this.$store.state.chosen.length < this.maxSeat) {
          this.$store.commit('chosenPushOne', seat)
        } else {
          Toast(`最多只能选择${this.maxSeat}个座位`)
        }
      }
    },
    refreshMap() {
      if (this.scroller) {
        this.scroller.destroy()
      }
      let _this = this
      let ele = document.querySelector('.seating-chart')
      this.scroller = new EasyScroller(
        ele,
        {
          // scrollingX: false,
          // scrollingY: false,
          // bouncing:false,
          // speedMultiplier:1,
          // animationDuration:5,
          zooming: true,
          minZoom: _this.mapScale,
          maxZoom: 2,
          zoomLevel: _this.mapScale
          // animating: true,
        },
        (left, top, zoom) => {
          _this.$refs.rowNav.style.transform = `translate3d(0px,${-top}px,0px) scaleY(${zoom})`
          _this.$refs.screen.style.transform = `translate3d(${_this.mapWidth * zoom - left}px,0px,0) scale(${zoom})`
          _this.$refs.infoBox.style.transform = `scale(${1 / zoom})`
        }
      )
    }
  }
}
</script>
<style scoped lang="scss">
.seating-chart-wrap {
  padding-top: 100px;
  background-color: #f6f6f6;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.rowNav {
  transform-origin: 0 0;
  width: 1em;
  position: absolute;
  left: 0.5em;
  background: #000;
  opacity: 0.2;
  display: flex;
  flex-direction: column;
  color: #fff;
  border-radius: 7.5008px;
  z-index: 10;

  div {
    text-align: center;
    font-size: 12px;
    height: 36px;
    line-height: 24px;
  }
}

.screen {
  height: 18px;
  width: 300px;
  position: absolute;
  top: 10px;
  text-align: center;
  // background: #000;
  // opacity: 0.2;
  color: #666;
  margin-left: -150px;
  // left:calc((100vw - 18.75rem) / 2);
  border-radius: 0 0 5px 5px;
  font-size: 12px;
  z-index: 9999;
}
</style>
