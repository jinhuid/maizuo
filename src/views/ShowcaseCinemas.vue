<template>
  <div class="main" ref="main">
    <div class="header">
      <span class="i" @click="$router.back()">
        <van-icon name="arrow-left" />
      </span>
      <span>{{ $store.state.filmName }}</span>
      <span><van-icon name="search" size="22" color="black" /></span>
    </div>

    <van-tabs
      swipeable
      v-if="showCinemas.length"
      title-active-color="var(--textColor)"
      :swipe-threshold="3"
      :animated="true"
    >
      <van-tab v-for="(cinemas, index) in dateList" :title="cinemas" :key="index">
        <div class="filter">
          <div class="tab" @click="show = !show">
            {{ active === 0 ? '全城' : district }}
            <van-icon :name="show ? 'arrow-up' : 'arrow-down'" size="10px" />
          </div>
          <div class="tab">最近去过<van-icon name="arrow-down" size="10px" /></div>
        </div>

        <van-popup v-model="show" position="top" :get-container="`.tabList${index}`">
          <ul>
            <li>
              <div @click="selectDistrict('全城', 0)" :class="{ active: active == 0 }">全部</div>
            </li>
            <li v-for="(item, index) in DistrictName" :key="index">
              <div
                @click="selectDistrict(item, index + 1)"
                :class="{ active: active == index + 1 }"
              >
                {{ item }}
              </div>
            </li>
          </ul>
        </van-popup>

        <CinemaList
          class="popupContainer"
          :class="[`tabList${index}`]"
          :name="cinemas"
          :isInclude="filterShowCinemas(index)"
          :height="getCinemaListHeight()"
        >
        </CinemaList>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import http from '@/util/http.js'
import CinemaList from '@/components/CinemaList'
import getTime from '@/util/getTime.js'
import { Tabs, Tab, Icon, Popup } from 'vant'

export default {
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    CinemaList
  },
  data() {
    return {
      showCinemas: [],
      dateList: [],
      DistrictName: [],
      show: false,
      active: 0,
      district: '全城'
    }
  },
  mounted() {
    http({
      url: `/gateway/?filmId=${this.$route.params.myID}&cityId=${this.$store.state.cityId}&k=1035572`,
      headers: { 'X-Host': 'mall.film-ticket.cinema.film-show-cinema' }
    }).then((res) => {
      this.showCinemas = res.data.data.showCinemas.sort((a, b) => a.showDate - b.showDate)
      this.dateList = this.calculation()
    })
    if (this.$store.state.filmName === '') {
      http({
        url: `/gateway?filmId=${this.$route.params.myID}&k=2914026`,
        headers: { 'X-Host': 'mall.film-ticket.film.info' }
      }).then((res) => {
        this.$store.commit('setFilmInfo', {
          id: +this.$route.params.myID,
          filmName: res.data.data.film.name
        })
      })
    }
    // 无数据
    if (this.$store.state.cinemasData.length === 0) {
      this.$store.dispatch('getCinemasData', this.$store.state.cityId).then(this.getDistrictName)
    } else {
      // 有数据
      this.getDistrictName()
      console.log(this.DistrictName)
    }
  },
  methods: {
    getCinemaListHeight() {
      return (this.height = window.innerHeight - 88 - 51 + 'px')
    },
    calculation() {
      return this.showCinemas.map((data) => getTime(data.showDate * 1000, ['week', 'month', 'day']))
    },
    getDistrictName() {
      this.DistrictName = [...new Set(this.$store.state.cinemasData.map((i) => i.districtName))].sort()
    },
    selectDistrict(district, index) {
      this.district = district
      this.active = index
      this.show = false
    },
    filterShowCinemas(index) {
      if (this.district == '全城') {
        return this.showCinemas[index]
      } else {
        return {
          cinemaList: this.$store.state.cinemasData
            .filter(
              (i) =>
                this.showCinemas[index].cinemaList.includes(i.cinemaId) &&
                i.districtName === this.district
            )
            .map((i) => i.cinemaId)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.popupContainer {
  transform: translate(0,0);
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 10;
}
.filter {
  display: flex;
  position: relative;
  height: 49px;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
}
.header {
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: space-between;

  .i {
    font-size: 26px;
    color: gray;
  }
  width: 100%;
  height: 44px;
  overflow: hidden;
  background-color: #fff;
  line-height: 44px;
  text-align: center;
  font-size: 17px;
}

.date {
  height: 49px;
  width: 100%;
  // background:
}

.main {
  background: #fff;
}
.tab {
  font-size: 14px;
  color: #191a1b;
  height: 49px;
  width: 50%;
  line-height: 49px;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 3000;
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  padding-top: 10px;
  padding-left: 10px;
  li {
    font-size: 12px;
    flex-grow: 0;
    flex-basis: calc(25% - 10px);
    // flex-shrink: 0;
    height: 30px;
    margin-bottom: 15px;
    margin-right: 10px;
    div {
      height: 100%;
      text-align: center;
      line-height: 30px;
      position: relative;
      color: #797d82;
      &::after {
        content: '';
        position: absolute;
        border: 1px solid rgba(210, 214, 220, 0.5);
        left: -50%;
        top: -50%;
        right: -50%;
        bottom: -50%;
        transform: scale(0.5);
      }
      &.active {
        color: var(--textColor);
        &::after {
          border: 1px solid #ff5f16;
        }
      }
    }
  }
}
</style>
