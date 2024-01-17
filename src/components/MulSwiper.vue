<template>
  <div class="swiper-container mySwiper" :class="info.name">
    <div class="swiper-wrapper">
      <div v-for="(item, index) in items" class="swiper-slide" :key="index">
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      require: true
    },
    items: {
      type: Array,
      require: true
    }
  },
  mounted() {
    new this.$Swiper('.' + this.info.name, {
      slidesPerView: this.info.preview,
      spaceBetween: 10,
      freeMode: true
    })
  }
}
</script>
