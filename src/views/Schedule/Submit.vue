<template>
  <div class="container">
    <div
      @click="getTotal"
      class="confirm-btn"
      :class="{ canSubmit: $store.state.chosen.length }">
      <span v-if="!$store.state.chosen.length">请先选座</span>
      <span v-else>{{ total }}元 确认收货</span>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant"
export default {
  props: ["session"],
  computed: {
    total() {
      return (
        (this.session.salePrice * this.$store.state.chosen.length) /
        100
      ).toFixed(2)
    },
  },
  methods: {
    getTotal() {
      if (this.$store.state.chosen.length) Toast("敬请期待!")
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  padding: 0 10px;
  .confirm-btn {
    border-radius: 45px;
    height: 45px;
    width: 100%;
    font-size: 15px;
    line-height: 21px;
    padding: 14px 0;
    text-align: center;
    background-color: #ff5f16;
    color: hsla(0, 0%, 100%, 0.3);
    z-index: 2;
  }
  .canSubmit {
    color: #fff;
  }
}
</style>
