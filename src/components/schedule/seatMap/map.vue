<template>
  <div class="seating-chart-wrap" v-if="seatingChart">
    <div v-if="mapWidth" class="screen">
      <!-- transform:`translateX(${mapWidth*mapScale+tsfX}px) scale(${mapScale})` -->
      <img :src="screen" :style="{ width: `100%`, height: `100%` }" alt="" />
      <div class="info">
        <slot></slot>
      </div>
    </div>

    <div
      class="rowNav"
      :style="{
        height: `${seatingChart.height * 24}px`
      }"
    >
      <div v-for="item in seatingChart.height" :key="item">{{ item }}</div>
    </div>

    <div
      class="seating-chart"
      :style="{
        width: `${(seatingChart.width + seatInterval) * 24}px`,
        height: `${(seatingChart.height + seatInterval) * 24}px` //这里的数字为了在底部流出空隙
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
        class="seatBox"
      >
      </Seat-icon>
    </div>
  </div>
</template>
<script>
import { EasyScroller } from 'easyscroller'
import { Toast } from 'vant'
import http from '@/util/http'
import SeatIcon from '@/components/schedule/seatMap/component/SeatIcon.vue'
import screen from '@/assets/屏幕.png'
export default {
  components: { SeatIcon },
  props: {
    maxSeat: { type: Number, require: true }
  },
  component: {
    SeatIcon
  },
  data() {
    return {
      seatingChart: null,
      seatInterval: 6,
      scroller: null,
      mapWidth: 0,
      mapScale: 1,
      screen: screen
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
          document.documentElement.clientWidth / (this.seatingChart.width + this.seatInterval) / 24
        this.mapWidth = ((this.seatingChart.width + this.seatInterval) * 24) / 2
        this.$nextTick(() => {
          this.refreshMap()
        })
      })
    },
    chooseSeat(e) {
      if (e.target.children[0].tagName !== 'IMG') return

      const index = e.target.children[0].getAttribute('index')
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
        // 点击空的座位 是否超过最大限购
        if (this.$store.state.chosen.length >= this.maxSeat) {
          Toast(`最多只能选择${this.maxSeat}个座位`)
          return
        } else {
          this.$store.commit('chosenPushOne', seat)
        }
      }
    },
    refreshMap() {
      if (this.scroller) {
        this.scroller.destroy()
      }
      let _this = this
      let element = document.querySelector('.seating-chart')
      this.scroller = new EasyScroller(
        element,
        _this.mapWidth,
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
          console.log(left, top, zoom)
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

.seating-chart {
  .seatBox {
    position: absolute;
    height: 24px;
    width: 24px;
    transition: all 0.5s cubic-bezier(1, 0, 0, 1);
    padding: 1.5008px;
    // -webkit-touch-callout: none;
    touch-action: none;
  }
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
