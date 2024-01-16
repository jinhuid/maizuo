<template>
  <ul>
    <li v-for="(item,index) in iconTag" :key="index">
      <img :src="item.tag" >
      {{item.explain}}
    </li>
  </ul>
</template>
<script>
import img1 from '@/assets/座位图标_可选择座位.png';
import img2 from '@/assets/座位锁定.png';
import img3 from '@/assets/座位图标_已售座位.png';
import img4 from '@/assets/座位图标_已选择座位.png';

  
export default {
  data() {
    return {
      iconTag: [
        {
          tag: img2,
          explain: "不可选",
        },
        {
          tag: img3,
          explain: "已售",
        },
        {
          tag: img1,
          explain: "可选",
        },
        {
          tag: img4,
          explain: "选中",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
ul {
    display: flex;
    justify-content: center;
  }
  li {
    display: flex;
    height: 1.5rem;
    width: 3.75rem;
    font-size: 0.75rem;
    line-height: 1.5rem;
    margin-right: 1rem;
    justify-content: center;
    img {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
</style>