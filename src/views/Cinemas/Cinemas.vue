<template>
  <div class="main">
    <van-nav-bar
      :title="'影院'"
      @click-left="
        () => {
          const path = '/city'
          if (this.$route.path === path) return
          $router.push(path)
        }
      "
      @click-right="
        () => {
          const path = '/cinemas/search'
          if (this.$route.path === path) return
          $router.push(path)
        }
      "
    >
      <template #left>
        {{ $store.state.cityName }}
        <van-icon name="arrow-down" color="black" />
      </template>

      <template #right>
        <van-icon name="search" size="22" color="black" />
      </template>
    </van-nav-bar>
    <transition name="h" appear mode="out-in">
      <router-view :height="getCinemaListHeight()"></router-view>
    </transition>
  </div>
</template>
<script>
import { NavBar } from "vant"
import { Icon } from "vant"
export default {
  name: "cinemas",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  data() {
    return {
      height: window.outerHeight
    }
  },
  methods: {
    getCinemaListHeight() {
      let height = this.height > window.outerHeight ? this.height : window.outerHeight
      return height - 46 - 49 + "px"
    }
  },
  activated() {
    if (this.$store.state.cinemasData.length === 0) {
      this.$store.dispatch("getCinemasData", this.$store.state.cityId)
    }
  }
}
</script>
<style scoped>
.hhh-enter-active {
  transition: all 0.3s;
  /* animation: 1s run ease reverse; */
}
.hhh-enter {
  opacity: 0;
  transform: translateY(30px);
}
</style>
