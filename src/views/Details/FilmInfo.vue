<template>
  <div class="info" v-if="dataList">
    <div>
      <span>{{ dataList.name }}</span>
      <span>{{ dataList.filmType.name }}</span>
      <span v-if="dataList.grade">{{ dataList.grade }}<span>分</span></span>
    </div>

    <div class="greytext">{{ dataList.category | textSpace }}</div>

    <div class="greytext">
      {{getDate(dataList.premiereAt * 1000) }}
    </div>

    <div class="greytext">
      {{ dataList.nation }} | {{ dataList.runtime }}分钟
    </div>

    <div class="greytext detail" style="margin-top: 12px" ref="showMore">
      {{ dataList.synopsis }}
    </div>

    <div style="text-align: center">
      <i
        :class="{
          iconfont: true,
          'icon-arrow-down-bold': downOrup,
          'icon-arrow-up-bold': !downOrup,
        }"
        @click="hidden"
      ></i>
    </div>
  </div>
</template>

<script>
import "@/assets/font_3646397_en0apnd901j/iconfont.css";
import Vue from "vue";
import getTime from "@/util/getTime";

Vue.filter("textSpace", (text) => {
  return text.replace("|", " | ");
});


export default {
  props:['dataList'],
  data() {
    return {
      downOrup: true,
    };
  },
  methods: {
    getDate(timeStamp){
      return getTime(timeStamp,['year','month','day'])
    },
    hidden() {
      this.downOrup = !this.downOrup;
      if (this.downOrup) {
        this.$refs.showMore.style.height = 38 + "px";
      } else {
        this.$refs.showMore.style.height =
          this.$refs.showMore.scrollHeight + "px";
      }
    },
  },
};
</script>

<style scoped lang='scss'>

.info {
  background-color: #fff;
  width: 100%;
  padding: 12px 15px 15px;
  box-sizing: border-box;
}
.info > div:nth-child(1) {
  height: 1.6875rem;
  span {
    display: inline-block;
  }
  span:nth-child(1) {
    font-size: 18px;
    margin-right: 7px;
  }
  span:nth-child(2) {
    font-size: 12px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
  }
  span:nth-child(3) {
    float: right;
    font-size: 18px;
    font-style: italic;
    color: #ffb232;
    span{
      background: transparent;
      font-size: 12px;
    }
  }
}
.greytext {
  line-height: 19.5008px;
  font-size: 13px;
  color: #797d82;
  margin-top: 4px;
}
.detail {
  height: 38px;
  transition: 0.3s all;
  overflow: hidden;
}
</style>