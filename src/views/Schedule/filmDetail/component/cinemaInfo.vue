<template v-if="schedule">
  <div class="input-wrap">
    <div class="container">
      <div class="cinema-info">
        <div class="film-name">
          <slot name="default"></slot>
          <span class="switch" @click="isDown = !isDown">
            切换场次
            <van-icon :name="isDown ? 'arrow-down' : 'arrow-up'" />
          </span>
        </div>
        <div class="film-des">
          {{
            currenDate(session.showAt * 1000, [
              'week',
              ' ',
              'month',
              'day',
              ' ',
              'hour',
              ':',
              'minute'
            ])
          }}
          {{ session.filmLanguage }}{{ session.imagery }}
        </div>
        <slot name="SwitchList" :isDown="!isDown"></slot>
      </div>
      <slot name="Chosen"></slot>
    </div>
  </div>
</template>
<script>
import { Icon } from 'vant'
import getTime from '@/util/getTime.js'
export default {
  props: ['session'],
  data() {
    return {
      isDown: true
    }
  },
  components: {
    [Icon.name]: Icon
  },
  methods: {
    currenDate(time, arr) {
      return getTime(time, arr)
    }
  }
}
</script>
<style lang="scss" scoped>
.input-wrap {
  //   height: 5.5625rem;
  padding: 10px;
}

.container {
  background: #fff;
  //   height: 100%;
  padding: 0 15px;
  border-radius: 10px;
}

.cinema-info {
  // height: 4.3125rem;
  padding: 15px 0;
}

.film-des {
  font-size: 13px;
  line-height: 19px;
  margin-top: 4px;
  color: #797d82;
}

.film-name {
  color: #191a1b;
  font-size: 15px;
  line-height: 21px;
}

.switch {
  float: right;
  font-size: 13px;
  color: #ff5f16;
}
</style>
