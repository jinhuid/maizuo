<template>
  <div v-if="dataList">
    <DetailHeater>{{ dataList.name }}</DetailHeater>
    <ImgDetail :data-list="dataList"></ImgDetail>
    <FilmInfo :data-list="dataList"></FilmInfo>
    <Actors :data-list="dataList"></Actors>
    <Photos :data-list="dataList"></Photos>
    <Buy v-if="dataList.isSale" :dataList="dataList"></Buy>
  </div>
</template>
<script>
import DetailHeater from './DetailHeater'
import ImgDetail from './ImgDetail'
import FilmInfo from './FilmInfo'
import Actors from './Actors'
import Photos from './Photos'
import Buy from './Buy'
import { Dialog } from 'vant'
import http from '@/util/http'
export default {
  data() {
    return {
      dataList: null
    }
  },
  components: {
    ImgDetail,
    FilmInfo,
    Actors,
    Photos,
    DetailHeater,
    Buy
  },
  mounted() {
    // console.log("我被二级路由跳转创建了！！" + "我的id为:" + this.$route);
    http({
      url: `/gateway?filmId=${this.$route.params.myID}&k=${this.$store.state.cityId}`,
      headers: { 'X-Host': 'mall.film-ticket.film.info' }
    }).then((res) => {
      this.dataList = res.data.data.film
      this.$nextTick(() => {
        if (!this.dataList.isSale) {
          Dialog.confirm({
            width: 18.2708 + 'rem',
            overlayStyle: {},
            message: '该影片目前没有排期，到首页看其他电影吧',
            cancelButtonText: '拒绝',
            confirmButtonText: '同意',
            confirmButtonColor: '--textColor',
            className: 'dialog'
          })
            .then(() => {
              this.$router.push({
                path: '/films'
              })
            })
            .catch(() => {})
        }
      })
    })
  }
}
</script>
<style lang="scss">
.dialog {
  // padding: 1.125rem 1.25rem;
  // box-sizing: border-box;
  border-radius: 2px;
}
.van-dialog__message {
  padding: 1.125rem 1.25rem;
  box-sizing: border-box;
  color: #191a1b !important;
  font-size: 15px !important;
  line-height: 36px;
}
</style>
