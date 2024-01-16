<template>
  <div class="swiper-container mySwiper" :class="info.name">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info:{
      type:Object,
      default:()=>{
        return {
          default:4,
          name:'mySwiper'
        }
      }
    }
  },
  mounted() {
    new this.$Swiper("." + this.info.name, {
      slidesPerView: this.info.preview,
      spaceBetween: 10,
      freeMode: true
    });

  },
};
</script>