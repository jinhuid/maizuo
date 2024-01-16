<template>
    <transition name="step" mode="out-in" :appear="true"><slot></slot>
    </transition>
</template>
<style scoped>
.step-enter-active {
  /* transition:all 3s ; */
  /* animation: 1s run ease ; */
  animation: fadeInAnimation steps(10) 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
/* .step-enter { */
  /* filter: blur(1px); */
  /* opacity: 0; */
/* } */
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
