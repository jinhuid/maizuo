<template>
  <div
    class="container"
    :class="{ [name]: true }"
    :style="{ height, overflow: 'hidden', position: 'relative' }">
    <ul ref="ul">
      <div v-for="item in cinemasData" :key="item.cinemaId">
        <li
          v-if="!isInclude || isInclude.cinemaList.includes(item.cinemaId)"
          @click="choiceCinema(item.cinemaId)">
          <div class="cinema-info-contianer">
            <span class="cinema-info">{{ item.name }}</span>
            <span class="address cinema-info">{{ item.address }}</span>
          </div>
          <div>
            <span style="color: var(--textColor)"
              >￥{{ item.lowPrice / 100 }}起</span
            >
            <span style="text-align: right" class="address">距离未知</span>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core"
import ScrollBar from "@better-scroll/scroll-bar"
import MouseWheel from "@better-scroll/mouse-wheel"
BScroll.use(MouseWheel)
BScroll.use(ScrollBar)

export default {
  props: {
    height: {
      type: String,
      default: "0px",
    },
    name: {
      type: String,
      default: "box",
    },
    isInclude: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      bseg: null,
      cinemasData: this.$store.state.cinemasData,
      executeAct: false,
    }
  },
  created() {
    this.$watch(
      () => this.$store.state.cinemasData,
      (newVal) => {
        this.cinemasData = newVal
      }
    )
  },
  watch: {
    cinemasData() {
      this.init()
      this.$nextTick(() => {
        this.$refs.ul.style.transform = `translateY(0px)`
      })
    },
    isInclude(){
      this.init()
      this.$nextTick(() => {
        this.$refs.ul.style.transform = `translateY(0px)`
      })
    }
  },
  mounted() {
    if (this.cinemasData.length === 0) return
    this.init()
  },
  activated() {
    if (!this.executeAct) {
      this.executeAct = true
      return
    }
    // 每次返回页面 看看数据有没有被清除
    if (this.cinemasData.length === 0) return
    this.init()
  },
  methods: {
    init() {
      if (this._inactive) return
      console.log("initList")
      this.bseg?.destroy()
      this.$nextTick(() => {
        this.bseg = new BScroll("." + this.name, {
          scrollbar: true,
          click: true,
          freeScroll: true,
          bounce: true,
          mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300,
          },
        })
      })
    },
    choiceCinema(cinemaId) {
      this.$router.push({
        name: "影院",
        params: {
          cinemaId,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  overflow: hidden;
}

ul > div:last-child {
  border-bottom: 0;
  margin-bottom: 49px;
  li {
    border-bottom: none;
  }
}

li {
  font-size: 14px;
  color: #191a1b;
  height: 75.5008px;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
  span {
    display: block;
  }

  .cinema-info-contianer {
    width: 80%;
    padding-right: 15px;
    box-sizing: border-box;
  }

  .cinema-info {
    // max-width: 80%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.address {
  color: #797d82;
  font-size: 12px;
  margin-top: 5px;
}

.box {
  position: relative;
  overflow: hidden;
}
</style>
