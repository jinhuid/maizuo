<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>

export default {
    props:{
        index:{
            type:Number,
            default:0
        }
    },
  mounted() {
    let that = this;
    new this.$Swiper(".swiper-container", {
      slideToClickedSlide: true,
      speed:300,
      slidesPerView: 4,
      initialSlide: this.index,
      spaceBetween: 16,
      centeredSlides: true,
      on:{
        slideChangeTransitionStart(){
            that.$emit('setIndex',this.activeIndex)
        },
      }
    });
  },
};
</script>