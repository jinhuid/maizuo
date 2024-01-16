<template>
  <div class="swiper-slide"><slot></slot></div>
</template>
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
