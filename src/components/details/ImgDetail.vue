<template>
  <div
    v-if="dataList"
    class="img"
    :style="{ backgroundImage: `url(${dataList.poster})` }"
  ></div>
</template>
            <script>
export default {
  props: ["dataList"],
};
</script>
<style scoped lang='scss'>
.img {
  width: 100%;
  height: 218.4px;
  background-position: center;
  background-size: 100%;
}
</style>