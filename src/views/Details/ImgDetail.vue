<template>
  <img-fade><div v-if="dataList" class="bg" :style="{ backgroundImage: `url(${dataList.poster})` }"></div></img-fade>
</template>

<script>
import ImgFade from '@/components/transition/ImgFade.vue'

export default {
  props: ['dataList'],
  components:{
    ImgFade
  }
}
</script>
<style scoped lang="scss">
.bg {
  width: 100%;
  height: 218.4px;
  background-position: center;
  background-size: 100%;
}
</style>
