<template>
    <ul>
        <li
          v-for="(item, index) in sessions"
          :key="index"
          :class="{ select: currentSession == index }"
          @click="switchIndex(index)"
        >
          <div class="start-at">
            {{ currentDate(item.showAt * 1000, ["hour", "minute"]) }}
          </div>
          <div class="language">{{ item.filmLanguage }}{{ item.imagery }}</div>
          <div class="price">￥{{ item.salePrice / 100 }}</div>
        </li>
      </ul>
</template>
<script>
import getTime from "@/util/getTime.js"
import EventBus from "@/util/eventBus"
export default {
  props: ["sessions", "currentSession"],
  methods: {
    currentDate(time, arr) {
      return getTime(time, arr)
    },
    switchIndex(index) {
      if (index != this.currentSession) {
        this.$store.commit("emptyChoices")
        EventBus.$emit("update:currentSession", index)
      }
    },
  }
}
</script>
<style lang="scss" scoped>

ul {
  width: 100%;
  height: 60px;
  margin-top: 10px;
  display: flex;
  overflow-x: scroll;
  position: relative;
  li {
    position: relative;
    left: 1px;
    height: 100%;
    width: 70px;
    padding: 6px;
    // border: .0625rem solid #ff5f16;
    border-radius: 4px;
    flex-shrink: 0;
    background-color: hsla(0, 0%, 95.7%, 0.6);
    margin-right: 0.625rem;
    text-align: center;
    .start-at {
      font-size: 14px;
      color: #191a1b;
      line-height: 17px;
    }
    .language {
      font-size: 10px;
      color: #bdc0c5;
      width: 60px;
      line-height: 14px;
      white-space: nowrap;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 0 auto;
      margin-top: 1px;
    }
    .price {
      font-size: 13px;
      color: #797d82;
    }
  }
  li.select::after {
    content: " ";
    position: absolute;
    border: 1px solid #ff5f16;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-radius: 4px;
    transform: scale(0.5);
    box-sizing: border-box;
  }
}
</style>
