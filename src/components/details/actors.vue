<template>
  <div class="actors" v-if="dataList">
    <div>演职人员</div>
    <div v-if="dataList.actors">
      <Detail-swiper :info="{ preview: 4, name: 'myactors' }">
        <Detail-swiper-item
          v-for="(item, index) in dataList.actors"
          :key="index"
        >
            <div class="actors-item" > 
              <div
                class="img"
                :style="{ backgroundImage: `url(${item.avatarAddress})` }"
              ></div>
              <span>{{ item.name }}</span>
              <span>{{ item.role }}</span>
            </div>

        </Detail-swiper-item>
      </Detail-swiper>
    </div>
    <div v-else style="  line-height: 58px;">暂无演职人员</div>
  </div>
</template>
<script>
import DetailSwiper from "@/components/details/detailSwiper";
import DetailSwiperItem from "@/components/details/detailSwiperItem";

export default {
  props: ["dataList"],
  components: {
    DetailSwiper,
    DetailSwiperItem,
  },
};
</script>
<style lang="scss" scoped>
.actors {
  font-size: 16px;
  margin-top: 10px;
  height: 192.5008px;
  width: 100%;
  background-color: #fff;
}
.actors > div:nth-child(1) {
  height: 52.5px;
  padding: 15px;
  box-sizing: border-box;
}
.actors > div:nth-child(2),
.actors > div:nth-child(3) {
  height: 140px;
  width: 100%;
  overflow: hidden;
  padding: 0 8px;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  color: #bdc0c5;
}
.img {
  height: 85px;
  width: 85px;
  background-size: 100%;
  background-position: center;
}
.actors-item {
  height: 131px;
  width: 85px;
  span {
    display: block;
    text-align: center;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span:nth-child(2) {
    padding-top: 10px;
    color: #2c3e50;

    
  }
  span:nth-child(3) {
    color: #797d82;
  }
}
</style>