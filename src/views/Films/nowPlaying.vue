<template>
  <div>
    <ul class="filmsDetail" v-if="dataList.length">
      <li
        v-for="item in dataList"
        :key="item.filmId"
        @click="handleChangePage(item.filmId)"
        v-lazy="item"
      >
        <div class="imgBox">
          <img-fade>
            <div v-show="item.show">
              <img :src="item.show ? item.poster : ''" alt="" />
            </div>
          </img-fade>
        </div>

        <div class="FilmInformation">
          <div>
            <span class="name">{{ item.name }} </span
            ><span class="item">{{ item.filmType.name }}</span>
          </div>
          <div>
            <span class="label"
              >观众评分 <span style="color: #ffb232">{{ item.grade }}</span></span
            >
          </div>
          <div>
            <span class="label"
              >主演：<span v-if="item.actors">{{ item.actors | actors }}</span
              ><span v-else>暂无人员</span></span
            >
          </div>
          <div>
            <span class="label">{{ item.nation }} | {{ item.runtime }}分钟</span>
          </div>
        </div>
        <div class="buy" @click.stop="buyTicket(item.filmId, item.name)">购票</div>
      </li>
    </ul>
    <div v-if="show" class="noMore">暂无更多</div>
  </div>
</template>
<script>
import http from '@/util/http.js'
import Vue from 'vue'
import lazy from '@/util/lazy'
import ImgFade from '@/components/transition/ImgFade.vue'
Vue.filter('actors', (v) => {
  return v.map((item) => item.name).join(' ')
})
Vue.directive('lazy', lazy)
export default {
  data() {
    return {
      dataList: [],
      page: 1,
      tag: true,
      show: true
    }
  },
  components: {
    ImgFade
  },
  methods: {
    buyTicket(id, filmName) {
      this.$store.commit('setFilmInfo', { id, filmName })
      this.$router.push({
        name: '电影视图', //用params时不能用path
        params: {
          // path: `/detail/${id}/cinemas`,
          filmName,
          myID: id
        }
      })
    },
    handleChangePage(id) {
      // 编程式导航
      // location.href = '#/detail'     可能会出问题
      // 这里的this.$router是main中的router模块
      // 1.通过路由跳转
      // this.$router.push(`/detail/${id}`)

      // 2.通过路由命名跳转
      this.$router.push({
        name: '详情', //跳往组件的名字
        params: {
          myID: id
        }
      })
    },
    sendRequest(ob) {
      return http({
        // 这里不需要再写请求地址了
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this
          .page++}&pageSize=10&type=1&k=70052`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        this.dataList.push(...res.data.data.films)
        if (this.dataList.length === res.data.data.total) {
          this.tag = false
          ob?.disconnect()
        }
      })
    }
  },
  async mounted() {
    await this.sendRequest()
    this.$nextTick(() => {
      const noMore = document.querySelector('.noMore')
      const ob = new IntersectionObserver(
        (entries) => {
          //isIntersecting true为进入 false离开 进入离开都会触发
          // console.log(entries[0].isIntersecting);

          if (entries[0].isIntersecting && this.tag) {
            this.sendRequest(ob)
          }
        },
        {
          root: null, //null则默认使用顶级文档的视口。
          thresholds: 1, //露出视口多少部分
          rootMargin: '0px 0px 300px 0px'
        }
      )
      ob.observe(noMore)
    })
  }
}
</script>

<style lang="scss" scoped>
.filmsDetail li {
  background-color: #fff;
  height: 124px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    border-bottom: 1px solid #ededed;
    color: #ededed;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
  img,
  .imgBox {
    // height: ;
    width: 66px;
  }

  .FilmInformation {
    padding: 0 10px;
    box-sizing: border-box;
    width: 62.5641%;
    height: 100%;
    flex-grow: 1;
    .name {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      margin-right: 5px;
      color: #191a1b;
      max-width: 199px;
      vertical-align: middle;
    }

    .item {
      display: inline-block;
      font-size: 12px;
      color: #fff;
      background-color: #d2d6dc;
      height: 14px;
      line-height: 14px;
      padding: 0 2px;
      border-radius: 2px;
      vertical-align: middle;
    }

    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 91.8032%;
    }
  }

  .label {
    font-size: 13px;
    margin-top: 4px;
    color: #797d82;
  }
}

.buy {
  height: 25px;
  width: 50px;
  border: 1px solid var(--textColor);
  line-height: 25px;
  color: var(--textColor);
  font-size: 13px;
  text-align: center;
  border-radius: 2px;
}

.noMore {
  height: 24px;
  width: 100%;
  color: #d2d6dc;
  text-align: center;
  line-height: 24px;
  font-size: 16px;
}
</style>
