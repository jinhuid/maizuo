<template>
  <div class="swiper-container">
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
    index: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      require: true
    }
  },
  mounted() {
    let that = this
    new this.$Swiper('.swiper-container', {
      slideToClickedSlide: true,
      speed: 300,
      slidesPerView: 4,
      initialSlide: this.index,
      spaceBetween: 16,
      centeredSlides: true,
      on: {
        slideChangeTransitionStart() {
          that.$emit('setIndex', this.activeIndex)
        }
      }
    })
  }
}
</script>

<style scoped>
.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transform-origin: center bottom;
  transition: 100ms;
  transform: scale(0.8);
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
  filter: drop-shadow(8px 8px 8px gray);
  transform: scale(1);
}
</style>
