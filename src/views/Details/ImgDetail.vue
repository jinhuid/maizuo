<template>
  <div
    v-if="dataList"
    class="bg"
    :style="{ backgroundImage: `url(${dataList.poster})` }"
  ></div>
</template>
            
            
<script>
export default {
  props: ["dataList"],
};
</script>
<style scoped lang='scss'>
.bg {
  width: 100%;
  height: 218.4px;
  background-position: center;
  background-size: 100%;
}
</style>