<template>
  <div class="choose" v-if="this.$store.state.chosen.length">
    <div v-for="(item, index) in this.$store.state.chosen" :key="index" class="choose-item">
      <div class="seat-name">{{ item.rowNum }}排{{ item.columnNum }}座</div>
      <div class="price-fmt">￥<slot></slot></div>
      <van-icon name="cross" size="15" class="delete" @click="deleteChoose(item)" />
    </div>
  </div>
</template>
<script>
import { Icon } from 'vant'
export default {
  components: {
    [Icon.name]: Icon
  },
  methods: {
    deleteChoose(seat) {
      this.$store.commit('chosenDeleteOne', seat)
    }
  }
}
</script>
<style scoped lang="scss">
.choose {
  padding: 10px 0;
  display: flex;
  overflow-x: scroll;
  position: relative;
  .choose-item {
    position: relative;
    background-color: hsla(0, 0%, 95.7%, 0.6);
    height: 51.5008px;
    min-width: 79.4304px;
    padding: 4px 25px 4px 10px;
    margin-right: 15px;
    flex-shrink: 0;

    .seat-name {
      font-size: 14px;
      color: #191a1b;
    }

    .price-fmt {
      color: rgb(250, 182, 70);
      font-size: 15px;
    }

    .delete {
      position: absolute;
      right: 6px;
      bottom: 6px;
    }
  }
}
</style>
