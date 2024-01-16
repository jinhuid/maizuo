<template>
  <van-tabs
    :swipeable="true"
    :sticky="true"
    :offset-top="Math.floor(headerHeight - 1)"
    animated
    @change="choose"
    :swipe-threshold="3"
    title-active-color="var(--textColor)">
    <van-tab
      v-for="(item, index) in filmsInfo[currentIndex].showDate"
      :title="currenDate(item * 1000, ['week', 'month', 'day'])"
      :key="index"
      class="tabList">
      <div v-if="show" class="loading">
        <van-loading type="spinner" :vertical="true" />
      </div>
      <div v-else-if="!schedules[index]" class="null">
        <img
          src="https://assets.maizuo.com/h5/v5/public/app/img/emptyFilmList.4e4721ad.png"
          alt="" />
        <div class="text">暂无场次</div>
      </div>
      <div
        class="schedule-item"
        v-for="item in schedules[index]"
        :key="item.scheduleId">
        <div class="left">
          <span class="top">{{
            currenDate(item.showAt * 1000, ["hour", "minute"])
          }}</span
          ><span class="bottom"
            >{{ currenDate(item.endAt * 1000, ["hour", "minute"]) }}散场</span
          >
        </div>
        <div class="middle">
          <span class="top">{{ item.filmLanguage }}{{ item.imagery }}</span>
          <span class="bottom">{{ item.hallName }}</span>
        </div>
        <div class="right">
          <div class="lowest-price">
            <span class="price-icon">￥</span>{{ item.salePrice / 100 }}
          </div>
          <div class="buy-ticket" @click="buyTicket(item.scheduleId)">购票</div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>
<script>
import http from "@/util/http.js"
import getTime from "@/util/getTime.js"
import { Tab, Tabs, Loading } from "vant"
export default {
  props: ["filmsInfo", "currentIndex", "cinemaInfo"],
  // props:['data'],
  data() {
    return {
      schedules: new Array(this.filmsInfo[this.currentIndex].showDate.length),
      show: false,
      headerHeight: document.querySelector("header").clientHeight,
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Loading.name]: Loading,
  },
  mounted() {
    this.schedulesList(0)
  },
  methods: {
    buyTicket(scheduleId) {
      // this.$store.commit('setCinemaId',this.cinemaInfo.cinemaId)
      this.$router
        .push({
          name: "schedule",
          params: {
            scheduleId,
          },
        })
        .catch(() => {})
    },
    choose(index) {
      if (!this.schedules[index]) this.schedulesList(index)
    },
    schedulesList(index) {
      this.show = true
      http(
        {
          url: `/gateway/?filmId=${
            this.filmsInfo[this.currentIndex].filmId
          }&cinemaId=${this.cinemaInfo.cinemaId}&date=${
            this.filmsInfo[this.currentIndex].showDate[index]
          }&k=1024902`,
          headers: {
            "X-Host": "mall.film-ticket.schedule.list",
            "X-Token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VudElkIjoiMzAwMCIsInRpbWVzdGFtcCI6MTY2NDM0NzU3NCwidXNlcklkIjozMTkyMDU5N30.25T6y93Pt5RFo5U-Z5jJBtkKIo4RATWrY-vcHHmXSD4",
          },
        },
        false
      ).then((res) => {
        this.show = false
        if (res.data.data)
          this.$set(this.schedules, index, res.data.data.schedules)
      })
    },
    currenDate(time, arr) {
      return getTime(time, arr)
    },
  },
}
</script>

<style scoped lang="scss">
.null {
  height: 11.25rem;
  padding: 2.75rem 0;
  text-align: center;
  img {
    height: 4.375rem;
    margin: 0 auto 10px;
  }
  .text {
    text-align: center;
    color: #bdc0c5;
    font-size: 14px;
  }
}
div {
  box-sizing: border-box;
}
.loading {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.schedule-item {
  background: #fff;
  padding: 15px;
  width: 100%;
  height: 74px;
  div {
    float: left;
  }
  .top {
    font-size: 15px;
    color: #191a1b;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bottom {
    font-size: 13px;
    color: #797d82;
    margin-top: 2px;
  }
  span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .left {
    width: 84px;
  }
  .middle {
    width: calc(100% - 210px);
  }
  .right {
    float: right;
    width: 112px;
    padding: 10px 0;
    .lowest-price {
      font-size: 15px;
      line-height: 25px;
      color: var(--textColor);
      float: left;
    }
    .price-icon {
      font-size: 12px;
      display: inline;
      vertical-align: top;
    }
    .buy-ticket {
      float: right;
      line-height: 25px;
      text-align: center;
      font-size: 12px;
      color: var(--textColor);
      height: 25px;
      width: 50px;
      border-radius: 2px;
      position: relative;
      text-align: center;
      border: 1px solid var(--textColor);
    }
  }
}
@keyframes run {
  0% {
    /* opacity: 0; */

    transform: translateX(-6.25rem);
  }
  100% {
    transform: translateX(0rem);
    /* transform: translateX(0%); */
  }
}
.h-enter-active {
  animation: 0.3s run ease;
}
/* .h-leave-active{
            animation: .3s run ease;
} */
</style>
