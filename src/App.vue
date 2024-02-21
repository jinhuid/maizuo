<template>
  <div class="main">
      <!-- 声明式导航 -->

      <!-- <ul> -->
      <!-- <a :href="item">{{item}}</a>  -->

      <!-- <router-link :to="item" active-class="linkColor" tag="li">
                  {{item}}
              </router-link>   -->
      <!-- 选中的属性绑定有class  router-link-active会被我们设置active-class的替换      tag属性很快不支持-->

      <!-- 替代tag写法 -->
      <!-- <router-link :to="item" custom v-slot="{navigate,isActive}" v-for="item in data" :key="item">
                  <li @click="navigate" :class="isActive?'linkColor':''">{{item}}</li>
              </router-link> -->
      <!-- </ul> -->


      <transition name="h" mode="out-in">
         <keep-alive include="cinemas"> 
          <router-view></router-view>
        </keep-alive>
      </transition>
      
      <transition name="h" mode="out-in" :appear="true">
          <tab-bar  v-if="this.$store.state.isFooterShow"></tab-bar>
      </transition>
  </div>
</template>
<script>
// console.log(location.hash);
import TabBar from '@/components/TabBar'
import 'vant/lib/index.css';
export default {

  data() {
      return {
          // data:['/#/films','/#/center','/#/cinemas']
          data: ['/films', '/center', '/cinemas']// router-link
      }
  },

  components: {
    TabBar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root{
  --textColor:#ff5f16;
  --presaleTextColor:#ffb232;
}

body .van-tabs__line {
  background-color: var(--textColor);
  width: 80px;
  height: 1.5008px;
}


html,
body,
.main {
  height: 100%;
  background-color: #f4f4f4;
  width: 100%;
  overflow-y: scroll;
}

li {
  list-style: none;
}

.h-enter-active,.h-leave-active {
  transition:all .3s ;
  /* animation: 1s run ease reverse; */
}
.h-enter,.h-leave-to{
  opacity: 0;
  transform: translateY(30px);
}

</style>
