<template>
  <div v-if="cityList.length">

        <div class="city-list">
          <div class="header">
            <span class="i" @click="$router.back()"><van-icon name="cross" /></span
            ><span>当前城市 - {{ this.$store.state.cityName }}</span> <span></span>
          </div>
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            :show-action="show"
            @focus="show = true"
          />
    
          <!-- {{filterCity()}} -->
        </div>

    <div class="container">
      <van-index-bar
        v-if="!value"
        
        :index-list="computedList"
        @select="currenIndex"
        highlight-color="var(--textColor)"
      >
        <div v-for="(item, index) in cityList" :key="index">
          <van-index-anchor :index="item.type" />
          <van-cell
            v-for="v in item.newList"
            :title="v.name"
            :key="v.cityId"
            @click="selectCity(v)"
          />
        </div>
      </van-index-bar>
      <template v-else>
        <van-cell
        v-for="v in filterCity()"
        :title="v.name"
        :key="v.cityId"
        @click="selectCity(v)"
      />
      </template>
    </div>
  </div>
</template>
<script>
// import { IndexBar, IndexAnchor } from "vant";
import http from "@/util/http.js";
import { Toast, Search ,IndexBar,IndexAnchor,Icon,Cell} from "vant";
export default {
  data() {
    return {
      value: "",
      cityList: [],
      searchList: [],
      show: false,
    };
  },
  components: {
    [Search.name]: Search,
    [IndexBar.name]:IndexBar,
    [IndexAnchor.name]:IndexAnchor,
    [Cell.name]:Cell,
    [Icon.name]:Icon
  },
  mounted() {
    http({
      //cityId
      url: `/gateway?cityId=${130600}&ticketFlag=1&k=1173969`,
      headers: { "X-Host": "mall.film-ticket.city.list" },
    }).then((res) => {
      this.searchList = res.data.data.cities;
      this.cityList = this.cityFilter(res.data.data.cities);
      this.$nextTick(() => {});
    });
  },
  computed: {
    computedList() {
      return this.cityList.map((v) => v.type);
    },
  },
  methods: {
    filterCity() {
      return this.searchList.filter((v) => {
        return (
          v.name.toUpperCase().includes(this.value.toUpperCase()) ||
          v.pinyin.toUpperCase().includes(this.value.toUpperCase())
        );
      });
    },
    selectCity(city) {
      this.$store.commit("selectCity");
      // this.$store.state.cityId = city.cityId;
      this.$store.commit("changeCityId", city.cityId);
      // this.$store.state.cityName = city.name;
      this.$store.commit("changeCityName", city.name);
      this.$router.back();
    },
    currenIndex(index) {
      Toast({
        message: index,
        duration: 1000,
      });
    },
    cityFilter(cities) {
      let dataList = [];
      let letter = [];
      for (let i = 65; i < 91; i++) {
        letter.push(String.fromCharCode(i));
      }
      letter.forEach((v) => {
        let list = cities.filter((item) => item.pinyin[0].toUpperCase() === v);
        list.length > 0 && dataList.push({ type: v, newList: [...list] });
      });
      return [...dataList];
    },
  },
};
</script>
<style scoped lang='scss'>

.container{
  overflow: auto;
  height: calc(100vh - 98px);
  background-color: #fff;
}
.city-list {
  z-index: 10;
  position: sticky;
  top: 0rem;
}
.city-list .header {
  .i {
    font-size: 26px;
    position: absolute;
    left: 5px;
    color: gray;
  }
  // position: relative;
  width: 100%;
  height: 44px;
  overflow: hidden;
  background-color: #fff;
  line-height: 44px;
  text-align: center;
  font-size: 17px;
}
</style>