<template>
  <div>
    <img
      src="data:image/png;base64,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"
      alt=""
      @click="$router.back()"
    />
    <div class="title" v-back>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

Vue.directive('back', {
  inserted(el) {
    window.onscroll = () => {
      if (window.pageYOffset > 30) {
        el.style.height = el.scrollHeight + 'px'
      } else {
        el.style.height = 0 + 'px'
      }
    }
  },
  unbind() {
    window.onscroll = null
  }
})
export default {}
</script>
<style scoped>
.title {
  position: fixed;
  height: 0px;
  width: 100%;
  transition: 0.3s all;
  line-height: 44px;
  text-align: center;
  font-size: 17px;
  background-color: #fff;
  overflow: hidden;
}
img {
  height: 30px;
  position: fixed;
  top: 5px;
  left: 5px;
  z-index: 999;
}
</style>
