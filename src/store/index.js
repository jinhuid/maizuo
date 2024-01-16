import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from "vuex-persistedstate"
import http from "@/util/http.js";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedstate({
    reducer(state){
      return {
        cityName:state.cityName,
        cityId:state.cityId,
        cinemaId:state.cinemaId
      }
    }
  })],
  // 所有组件都可以访问的公共数据
  state: {
    cityId:110100,
    cityName:'北京',
    cinemaId:null,
    cinemasData:[],
    chosen:[],
    filmId:undefined,
    filmName:'',
    isFooterShow:true
  },
  getters: {
  },
  // 只支持同步任务
  mutations: {
    // 直接修改公共状态会导致不可溯源 无法得知被何时修改 这里的修改会被devtools记录
    changeCityId(state,cityId){
      state.cityId = cityId
    },
    changeCityName(state,cityName){
      state.cityName = cityName
    },
    setCinemasData(state,res){
      state.cinemasData = res.data.data.cinemas
    },
    selectCity(state){
      // 清空数组 并且不会被劫持
      state.cinemasData.length = 0;
    },
    footerHide(state){
      state.isFooterShow = false
    },
    footerShow(state){
      state.isFooterShow = true
    },
    setFilmInfo(state,info){
      state.filmId = info.id;
      state.filmName = info.filmName
    },
    setCinemaId(state,id){
      state.cinemaId = id
    },
    chosenPushOne(state,seat){
      seat.isChoose = !seat.isChoose
      state.chosen.push(seat)
    },
    chosenDeleteOne(state,seat){
      seat.isChoose = !seat.isChoose
      state.chosen.splice(state.chosen.indexOf(seat), 1);
    },
    emptyChoices(state){
      for(let i of state.chosen){
        i.isChoose = false
      }
      state.chosen = []
    }
  },
  //支持异步和同步
  actions: {
    getCinemasData(store){
      return http({
        url: `/gateway?cityId=${store.state.cityId}&ticketFlag=1&k=4705870`,
        headers: {
          "X-Host": "mall.film-ticket.cinema.list",
        },
      }).then(res=>{
        // 通过commit去挂载cinemasData数据
        store.commit("setCinemasData",res);
      })
    },
  },
  modules: {
  }
})
