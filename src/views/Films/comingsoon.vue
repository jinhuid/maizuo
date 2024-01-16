<template>
  <div>
    <ul class="filmsDetail" >
      <li
        v-for="item in dataList"
        :key="item.filmId"
        @click="handleChangePage(item.filmId)"
        v-lazy="item"
      >
      <div class="imgBox">
        <img-transition>
          
            <div v-show="item.show">
              <img :src="item.show?item.poster:''" alt="" />
            </div>
          
        </img-transition>
      </div>
        <div class="FilmInformation">
          <div>
            <span class="name">{{ item.name }} </span
            ><span class="item">{{ item.filmType.name }}</span>
          </div>
          <div>
            <span class="label"
              >主演：<span v-if="item.actors">{{ item.actors | actors }}</span
              ><span v-else>暂无人员</span></span
            >
          </div>
          <div class="label">
            上映日期：{{getDate(item.premiereAt*1000)}}
          </div>
        </div>
        <div class="buy" v-if="item.isPresale">预售</div>
      </li>
    </ul>
    <div v-if="show" class="noMore">无更多电影</div>
  </div>
</template>
<script>
import http from "@/util/http.js";
import Vue from "vue";
import lazy from '@/util/lazy';
import getTime from '@/util/getTime';
import imgTransition from '@/components/transition/imgTransition.vue'

Vue.directive('lazy',lazy)
Vue.filter("actors", (v) => {
  return v.map((item) => item.name).join(" ");
});

export default {
  data() {
    return {
      dataList: [],
      page: 1,
      tag: true,
      show:false
    };
  },
  components:{
    imgTransition
  },
  methods: {
    getDate(timeStamp){
      return getTime(timeStamp,['week',' ','month','day'])
    },
    handleChangePage(id) {

      this.$store.commit('footerHide')
      this.$router.push({
        name: "详情", //跳往组件的名字
        params: {
          myID: id,
        },
      });
    },
    sendRequest() {
      this.tag = false;
      http({
        // 这里不需要再写请求地址了
        
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.page++}&pageSize=10&type=2&k=2116`,
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        if (this.dataList.length!=res.data.data.total) {
          this.dataList.push(...res.data.data.films)
          this.tag = true;
          }else {
            this.show = true;
          }
      });
    },
  },
  mounted() {
    this.sendRequest();
    const html = document.documentElement;
    window.onscroll = ()=> {
      if (
        html.scrollHeight - html.clientHeight - 40 <= html.scrollTop &&
        this.tag
      ) {
        
        this.sendRequest();
      }
    };
  },
    beforeDestroy(){
      window.onscroll =null;
    }
};
</script>

<style lang="scss" scoped>
.filmsDetail li {
  background-color: #fff;
  height: 124px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  img,.imgBox{
    // height: ;
    width: 66px;
  }
  .FilmInformation {
    padding: 0 10px;
    box-sizing: border-box;
    width: 62.5641%;
    flex-grow: 1;
    .name {
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
      transition: all 3s linear;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 91.8032%;
    }
  }
  .label {
    font-size: 13px;
    color: #797d82;
  }
}
.buy {
  height: 25px;
  width: 50px;
  border: 1px solid var(--presaleTextColor);
  line-height: 25px;
  color: var(--presaleTextColor);
  font-size: 13px;
  text-align: center;
  border-radius: 2px;
}
.noMore{
  height: 59px;
    background-color: #ededed;
    color: #bdc0c5;
    font-size: 13px;
    text-align: center;
    margin: auto;
    line-height: 59px;

}
</style>
