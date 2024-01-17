<template>
  <div class="main">
    <header v-if="cinemaInfo">
      <div class="header-left">
        <van-icon class="return" name="arrow-left" size="24" @click="$router.back()" />
      </div>
      <div data-v-18fbab6c="" class="header-title">{{ cinemaInfo.name }}</div>
      <div class="services" v-if="cinemaInfo.services">
        <span class="services-item" v-for="(item, index) in cinemaInfo.services" :key="index">{{
          item.name
        }}</span>
        <van-icon name="arrow" size="12" />
      </div>
      <div class="address">
        <van-icon name="location-o" size="24" />
        <div class="address-dev">
          {{ cinemaInfo.address }}
        </div>
        <a :href="`tel:${cinemaInfo.phone}`"><van-icon name="phone-o" size="24" /></a>
      </div>
    </header>

    <section v-if="filmsInfo.length">
      <div v-show="false">{{ filmsInfo }}</div>
      <div class="film">
        <div
          class="bg"
          :style="{
            backgroundImage: `url(${filmsInfo[currentIndex].poster})`
          }"
        ></div>
        <div class="mySwiper">
          <film-swiper @setIndex="current" :index="currentIndex" :items="filmsInfo">
            <template #default="{ item }">
              <ImgFade><img class="swiperItem" :src="item.poster" alt="" /></ImgFade>
            </template>
          </film-swiper>
        </div>
      </div>
      <div class="film-info" @click="$router.push(`/detail/${filmsInfo[currentIndex].filmId}`)">
        <div class="film-head">
          <span class="film-name">{{ filmsInfo[currentIndex].name }}</span
          ><span class="film-score">{{ filmsInfo[currentIndex].grade }}</span
          ><span class="film-unit">分</span>
        </div>
        <div class="film-dec">
          {{ filmsInfo[currentIndex].category }} | {{ filmsInfo[currentIndex].runtime }}分钟 |
          {{ filmsInfo[currentIndex].director + ' | '
          }}{{ filterActors(filmsInfo[currentIndex].actors) }}
        </div>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAYAAADOMhxqAAAAAXNSR0IArs4c6QAAAhJJREFUOBGFU79PFEEUnh932Liz1xDAMezRaWFBrlEaw8XORBNjSAw0hIbWzmBri38BIdIZFRIKEyCBmGhMLC38EQu9u9wASkNuz0S4g+F7w+zGhT19xc778X1vZr55K7XWDwMVLgehCuNW6w37j0mAX1lrNbPsZqhK3Thuvf0XR15UgQbgBoEss+MqKH0F6VMvkrg0OPiIc7bpAZxx+0zryDXII3FKlsvl0sFh5z3cqx60VyzI641G47uP00WQV6vV9vuKhdtwf/lKf7d79Joa+ThdHIGier3+Q3B2l3P+h2LL2JXDTnelUqkUKU5MJg6tcRw3lQq+AXwfIR13pP27fRn5VaqTZQiUQPGzCsMDbHGLYthooFSnHcdO7nMEQuAB34E0DNIoxbBqIrdT6TSX/dLZd3Z/ruFRq1Shu3Emqz0JBDorN0gfU5UIkGfomGnak0BHgqzLJC81Oj2Snc29tAMIsWAtu+d3tXijSWPMRu4OQ1rPATztwYwLPgfwS9coSSar1sMTx/boOWJ3doAXt5vNmaSe2YGm1LLjpRTM+dbQwMBsAqY1VSCKohFc8gNy/R7w5UJfcYwG08ducZcmvQHeQibyxT1M7zgGcvdvMPkikQ+++xdIPihyh6b3LJhiKURhHs//wBchn5wyprmeB6acwH88kRY5e2xM40Ua5zgS82/xjNcg39MdY57kYDKpEyF1uKDTCa4lAAAAAElFTkSuQmCC"
          class="film-more"
        />
      </div>
      <keep-alive>
        <film-list
          v-if="cinemaInfo"
          :filmsInfo="filmsInfo"
          :currentIndex="currentIndex"
          :cinemaInfo="cinemaInfo"
          :key="currentIndex"
        >
      </film-list>
      </keep-alive>
    </section>
  </div>
</template>
<script>
import http from '@/util/http.js'
import FilmSwiper from '@/components/FilmSwiper'
import ImgFade from '@/components/transition/ImgFade.vue'

// import FilmList from '@/components/FilmList'
import { Icon } from 'vant'
export default {
  data() {
    return {
      cinemaInfo: null,
      filmsInfo: [],
      currentIndex: 0,
      window: window
    }
  },
  components: {
    [Icon.name]: Icon,
    FilmSwiper,
    FilmList: () => import('@/components/FilmList'),
    ImgFade
  },
  methods: {
    filterActors(arr) {
      return arr
        .map((v) => {
          return v.name
        })
        .join(' ')
    },

    current(index) {
      this.currentIndex = index
    },
    setSectionHeight() {
      let header = document.querySelector('header')
      document
        .querySelector('.main')
        .style.setProperty('--HeaderHeight', header.clientHeight + 'px')
    }
  },
  mounted() {
    Promise.all([
      http({
        url: `https://m.maizuo.com/gateway/?cinemaId=${this.$route.params.cinemaId}&k=4650178`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.info'
        }
      }).then((res) => {
        this.cinemaInfo = res.data.data.cinema
      }),
      http({
        url: `https://m.maizuo.com/gateway/?cinemaId=${this.$route.params.cinemaId}&k=4650178`,
        headers: {
          'X-Host': 'mall.film-ticket.film.cinema-show-film'
        }
      }).then((res) => {
        this.filmsInfo.push(...res.data.data.films)
        if (this.$store.state.filmId) {
          this.currentIndex = this.filmsInfo.findIndex((v) => v.filmId === this.$store.state.filmId)
        }
      })
    ]).then(() => {
      this.setSectionHeight()
    })
  }
}
</script>

<style lang="scss" scoped>
.main {
  min-height: 100%;
  background: #fff;
  overflow: auto;
  section {
    position: relative;
    overflow: auto;
    // height: var(--sectionHeight);
    height: calc(100vh - var(--HeaderHeight));
  }
}

header {
  top: 0px;
  position: sticky;
  z-index: 99999;
  background-color: inherit;
  // height: ;
}
.header-left {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 15px;
}
.header-title {
  background: #fff;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 17px;
  color: #191a1b;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.services {
  height: 38px;
  color: #ffb232;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 5px 0 15px 0;
}
.services-item {
  position: relative;
  padding: 0 6px;
  margin: 0 2.5008px;
  font-size: 10px;
  border: 1px solid #ffb232;
}
.address {
  display: flex;
  align-items: center;
  height: 50px;
  color: #191a1b;
  padding-left: 17px;
  a {
    padding: 0 25px;
    color: inherit;
  }
}
.address-dev {
  padding-left: 12px;
  flex: 1;
  font-size: 14px;
  height: 20px;
  padding: 0 12px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.film {
  height: 160px;
  position: relative;
  overflow: hidden;
  padding: 15px 0;
}
.bg {
  width: 100%;
  position: absolute;
  height: 130px;
  filter: blur(30px);
  -webkit-filter: blur(30px);
}
.swiperItem {
  height: 130px;
  width: 90px;
}
.film-info {
  position: relative;
  text-align: center;
  height: 80px;
  padding: 15px 0;
}
.film-info::after {
  content: '';
  display: block;
  height: 0;
  width: 0;
  border: 10px solid transparent;
  border-bottom: 10px solid #fff;
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -10px;
}
.film-head {
  position: relative;
  height: 20px;
  margin-bottom: 10px;
}
.film-name {
  font-size: 15px;
  color: #191a1b;
  padding-right: 5px;
}
.film-score {
  font-size: 16px;
  font-style: italic;
  color: #ffb232;
}
.film-unit {
  font-size: 10px;
  color: #ffb232;
}
.film-dec {
  text-align: center;
  height: 18px;
  color: #797d82;
  font-size: 13px;
  padding: 0 12%;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.film-more {
  position: absolute;
  right: 15px;
  top: 0;
  margin-top: 36px;
  width: 4px;
  height: 8px;
}
</style>
