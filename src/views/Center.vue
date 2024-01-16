<template>
  <div class="about">
    <!-- <router-view></router-view> -->
    <div class="center-view" data-enter-time="1663866910">
      <div
        class="avatar"
        data-enter-time="1663866910"
        data-click-fun="track_f_565101">
        <img
          :src="
            isSignIn
              ? 'https://mall.s.maizuo.com/343e03528520399b9de18b164d980d1f.jpg'
              : touristImg
          "
          class="avator-icon" />
        <div class="nick-name" @click="signIn">
          {{ isSignIn ? userPhone : "立即登录" }}
        </div>
      </div>
      <ul class="my-order-tab">
        <li data-enter-time="1663866910" data-click-fun="track_f_903368">
          <div class="value">0张</div>
          <div class="label">卖座券</div>
        </li>
        <li data-enter-time="1663866910" data-click-fun="track_f_136417">
          <div class="value">
            <span class="price-decimal price-fmt"
              ><i>￥</i><span class="interge" style="font-size: 17px">0</span
              ><span style="display: none">.</span
              ><span class="decimal" style="font-size: 17px"></span
              ><span style="display: none">.</span
              ><span class="decimal" style="font-size: 17px; display: none"
                >00</span
              ></span
            >
          </div>
          <div class="label">余额</div>
        </li>
      </ul>
      <!---->
      <div
        class="margin-set my-card"
        data-enter-time="1663866910"
        data-click-fun="track_f_32143">
        <img :src="filmImg" width="20px" height="20px" alt="" /><span
          class="label"
          >电影订单</span
        ><img :src="arrow" alt="" class="arrow" />
      </div>
      <div
        class="margin-set my-card"
        data-enter-time="1663866910"
        data-click-fun="track_f_484825">
        <img :src="redEv" width="20px" height="20px" alt="" /><span
          class="label"
          >组合红包</span
        ><img :src="arrow" alt="" class="arrow" />
      </div>
      <div
        class="margin-set my-card"
        data-enter-time="1663866910"
        data-click-fun="track_f_722409">
        <img
          src="https://assets.maizuo.com/h5/v5/public/app/img/help.a9203368.png"
          width="20px"
          height="20px"
          alt="" /><span class="label">帮助与客服</span
        ><img :src="arrow" alt="" class="arrow" />
      </div>
      <div
        class="margin-set system-set"
        data-enter-time="1663866910"
        data-click-fun="track_f_12883">
        <img :src="setting" width="20px" height="20px" alt="" /><span
          class="label"
          >设置</span
        ><img :src="arrow" class="arrow" />
      </div>
      <div
        @click="signOut"
        class="margin-set system-set"
        data-enter-time="1663866910"
        data-click-fun="track_f_12883">
        <svg
          v-html="exitSvg"
          t="1664965374389"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2190"
          width="20"
          height="20"></svg>
        <span class="label">退出账号</span
        ><img :src="arrow" alt="" class="arrow" />
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant"
import touristImg from "@/assets/touristImg.dataurl"
import filmImg from "@/assets/filmImg.dataurl"
import arrow from "@/assets/arrow.dataurl"
import redEv from "@/assets/redEv.dataurl"
import setting from "@/assets/setting.dataurl"
import exitSvg from "@/assets/exitSvg.dataurl"

export default {
  computed: {
    userPhone() {
      if (localStorage.getItem("userPhone")) {
        let arr = [...localStorage.getItem("userPhone")]
        arr.splice(3, 4, "****")
        return arr.join("")
      }
      return "立即登录"
    },
  },
  data() {
    return {
      touristImg,
      filmImg,
      arrow,
      redEv,
      setting,
      exitSvg,
      isSignIn: localStorage.getItem("userPhone"),
    }
  },
  methods: {
    signIn() {
      if (this.userPhone == "立即登录") {
        this.$router.push({
          path: "/Login",
          query: { redirect: "/Center" },
        })
      }
    },
    signOut() {
      if (localStorage.getItem("userPhone")) {
        this.isSignIn = false
        localStorage.removeItem("userPhone")
        Toast.success("退出成功")
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.center-view {
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  font-size: 15px;
  background: #f4f4f4;
  margin-bottom: 59px;
}
.center-view .avatar .nick-name {
  font-size: 16px;
}
.center-view .avatar {
  text-align: center;
  margin-top: -44px;
  height: 200px;
  padding-left: 22px;
  padding-top: 64px;
  background: url(https://assets.maizuo.com/h5/v5/public/app/img/bg.a5bdd690.png);
  background-size: cover;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #fff;
  box-sizing: border-box;
}
.center-view .avatar .avator-icon {
  width: 63px;
  height: 63px;
  border-radius: 35px;
  margin-right: 20px;
  border: 2px solid #fff;
}
.center-view .my-order-tab {
  width: 100%;
  margin: 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
  font-size: 13px;
  padding: 0;
  height: 79px;
  background: #fff;
  margin-bottom: 10px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
li,
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.center-view .my-order-tab li {
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  list-style: none;
}
li {
  display: list-item;
  text-align: -webkit-match-parent;
}
.center-view .my-order-tab[data-v-628cac8f] {
  width: 100%;
  margin: 0 auto;
  display: flex;
  text-align: center;
  font-size: 13px;
  padding: 0;
  height: 79px;
  background: #fff;
  margin-bottom: 10px;
  align-items: center;
}
.center-view .my-order-tab li .label {
  font-size: 13px;
  color: #797d82;
}
.center-view .my-order-tab li .value {
  color: #191a1b;
  font-size: 17px;
}
.center-view .my-card {
  position: relative;
}
.center-view .margin-set {
  background: #fff;
  padding: 0 15px;
  height: 49px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.center-view .my-card:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ededed;
  color: #ededed;
  -webkit-transform-origin: 0 100%;
  -ms-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 13px;
}
.center-view .margin-set .label {
  margin-left: 15px;
  color: #191a1b;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.center-view .margin-set .arrow {
  text-align: right;
  width: 6px;
  height: 10px;
}
</style>
