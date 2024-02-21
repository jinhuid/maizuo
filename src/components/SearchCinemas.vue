<template>
  <div class="searchMain">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="输入影城名称"
        @cancel="onBack"
        ref="ipt" />
      <div class="container">
        <ul v-if="value">
          <!-- 这里去遍历store里的cinemasData数据 -->

          <li
            v-for="item in search"
            :key="item.cinemaId"
            @click="chooseCinema(item.cinemaId)">
            <div class="cinema-info-contianer">
              <span class="cinema-info">{{ item.name }}</span>
              <span class="address cinema-info">{{ item.address }}</span>
            </div>
            <div>
              <span style="color: var(--textColor)"
                >￥{{ item.lowPrice / 100 }}起</span
              >
              <span style="text-align: right" class="address">距离未知</span>
            </div>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>
<script>
import { Search } from "vant"
export default {
  name: "search",
  data() {
    return {
      value: "",
      inSearch: true,
    }
  },
  components: {
    [Search.name]: Search,
  },
  mounted() {
    // this.$refs.ipt.querySelector("input").focus()
  },
  methods: {
    chooseCinema(cinemaId) {
      this.$router.push({
        name: "影院",
        params: {
          cinemaId,
        },
      })
    },
    onBack() {
      this.$refs.ipt.querySelector("input").blur()
      // document.querySelector(".searchMain").clientHeight
      setTimeout(() => {
        this.$router.push("/cinemas")
      }, 0)
    },
  },
  computed: {
    search() {
      return this.$store.state.cinemasData.filter((v) => {
        return (
          v.name.toUpperCase().includes(this.value.toUpperCase()) ||
          v.address.toUpperCase().includes(this.value.toUpperCase())
        )
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.searchMain {
  height: calc(100vh - 46px);
  background-color: #fff;
  // overflow: hidden;
}
.container {
  height: calc(100vh - 46px - 56px);
  overflow: scroll;
}
li {
  height: 75.5008px;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
  span {
    display: block;
  }
  .cinema-info-contianer {
    width: 80%;
    padding-right: 15px;
    box-sizing: border-box;
  }
  .cinema-info {
    // max-width: 80%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.address {
  color: #797d82;
  font-size: 12px;
  margin-top: 5px;
}

.box {
  position: relative;
  //决定betterScroll滚动条的位置
  overflow: hidden;
}
</style>
