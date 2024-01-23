<template>
  <div class="main">
    <div class="logo">
      <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" alt="" />
    </div>
    <div class="login-form">
      <div class="form-group">
        <input
          type="text"
          @input="phoneNumber($event)"
          placeholder="手机号"
          v-model="phone"
          maxlength="13"
        />
        <div class="tip">验证码随机6位</div>
      </div>
      <div class="form-group">
        <input type="Number" placeholder="验证码" v-model="Verification" />
      </div>
      <div class="submit" @click="submit" :class="{ canSubmit: phone && Verification }">登录</div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  data() {
    return {
      phone: '',
      Verification: ''
    }
  },
  methods: {
    submit() {
      
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone.replace(/\s*/g, ''))) {
        Toast.fail('请输入正确的号码')
        return false
      } else if (this.Verification.length != 6) {
        Toast.fail('验证码为6位')
        return false
      }
      localStorage.setItem('userPhone', this.phone.replace(/\s*/g, ''))
      Toast.success({
        message: '登录成功',

        onClose: () => {
          this.$router.push(this.$route.query.redirect)

          // this.$router.back()
        }
      })
    },
    phoneNumber() {
      this.phone = this.phone.trim()
      let len = this.phone.length
      if (len == 5 || len == 10) {
        let arr = [...this.phone]
        arr.splice(this.phone.length - 2, 0, ' ')
        this.phone = arr.join('')
      }
    }
  }
}
</script>
<style scoped lang="scss">
.main {
  height: 100%;
  background: #fff;
  overflow: hidden;
}
.logo {
  /* width: 100%; */
  text-align: center;
  margin: 4.9375rem 0 2.5rem 0;
  height: 3.75rem;
  img {
    height: 100%;
  }
}
.login-form {
  height: 16.1769rem;
}
.form-group {
  position: relative;
  box-sizing: border-box;
  padding: 0 25px;
  height: 55.17px;
  input {
    padding: 1.25rem 0;
    font-size: 15px;
    border: none;
  }
  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input {
    -moz-appearance: textfield;
  }
  .tip {
    position: absolute;
    right: 1.5625rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 13px;
    color: #bdc0c5;
  }
}
.submit {
  height: 2.75rem;
  margin: 4.375rem 1.5625rem 0 1.5625rem;
  text-align: center;
  background: #ff5f16;
  line-height: 2.75rem;
  color: rgba(255, 255, 255, 0.387);
}
.canSubmit {
  color: #fff;
}
</style>
