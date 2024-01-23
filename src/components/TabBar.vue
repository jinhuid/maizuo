<template>
  <footer>
    <ul class="footer">
      <!-- <a :href="item">{{item}}</a>  -->

      <!-- <router-link :to="item" active-class="linkColor" tag="li">
                    {{item}}
                </router-link>   -->
      <!-- 选中的属性绑定有class  router-link-active会被我们设置active-class的替换      tag属性很快不支持-->

      <!-- 替代tag写法 -->
      <router-link
        :to="item.path"
        custom
        v-slot="{ navigate, isActive }"
        v-for="item in data"
        :key="item.name"
      >
        <li @click="navigate" :class="isActive ? 'linkColor' : ''">
          <i class="iconfont" :class="item.icon"></i>{{ item.name }}
        </li>
      </router-link>
    </ul>
  </footer>
</template>
<script>
import '@/assets/font_3646397_en0apnd901j/iconfont.css'
export default {
  data() {
    return {
      data: [
        { path: '/films', name: '电影', icon: 'icon-dianying' },
        { path: '/cinemas', name: '影院', icon: 'icon-yingyuan' },
        { path: '/info', name: '资讯', icon: 'icon-zixun' },
        { path: '/center', name: '我的', icon: 'icon-wode' }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 999;
  ul {
    padding-top: 6.4px;
    box-sizing: border-box;
    display: flex;
    height: 49px;
    width: 100%;
    background: white;
    li {
      color: #797d82;
      flex: 1;
      text-align: center;
      font-size: 12px;
      i {
        display: block;
        font-size: 24px;
      }
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #ededed;
      color: #ededed;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
  }
}
.linkColor {
  color: var(--textColor);
}
</style>
