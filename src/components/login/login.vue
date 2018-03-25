<template>
  <div class="login" ref="test">
    <!-- 登录logo -->
    <div class="pic"></div>
    <!-- 右边小标题 -->
    <div class="title">
      <p>——专属于你的{{ year }}GPA报告</p>
    </div>
    <!-- 账户输入 -->
    <div class="form" ref="form">
      <!-- 账号 -->
      <div class="input-group input-user">
        <label for="username"></label>
        <div class="group">
          <input type="number" id="username" placeholder="输入你的学号" v-model.number="username"/>
          <span class="border-left"></span>
          <span class="border-right"></span>
        </div>
      </div>

      <!-- 密码 -->
      <div class="input-group input-pwd">
        <label for="password"></label>
        <div class="group">
          <input type="password" id="password" placeholder="输入云家园密码" v-model="password"/>
          <span class="border-left"></span>
          <span class="border-right"></span>
        </div>
      </div>
      <!-- 登录按钮 -->
      <div class="button" @click="handleData()"></div>
    </div>
    <!-- 版权 -->
    <div class="copyright" v-show="showCopyright">
      <span class="icon"></span>
      <span class="text">南昌大学家园工作室</span>
    </div>
  </div>
</template>

<script>
  import { login } from 'api/login'
  import { Toast, Indicator, MessageBox } from 'mint-ui'
  import 'common/stylus/icon.styl'

  const ALERT_BOX_TITLE = 'Sorry'
  const ALERT_BOX_CONTENT = '大一的萌新还没有成绩哦，暂时不能查看呢~'

  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        toastControl: ''
      }
    },
    methods: {
      _login () {
        let data = Object.assign({}, {
          username: this.username,
          password: this.password
        })

        // loading的基础配置
        let options = {
          icon: 'snake',
          text: '登陆中...'
        }

        this._showIndicator(options)

        login(data).then((res) => {
          this._closeIndicator()
          console.log(res)
          if (res.status === 1) {
            // 登陆成功
            // eventBus分发登陆成功事件
            this.$root.$bus.isMaster = true
            this.$router.push({ path: `/${this.username}` })
          } else {
            // 登陆失败
            this._showToast({msg: res.message, mold: 'error'})
          }
        }).catch((err) => {
          console.log(err)
          this._showToast({msg: '请求超时，请检查网络后重试', mold: 'error'})
          this._closeIndicator()
        })
      },
      _verify () {
        // 弹框对象
        let toast = {
          msg: '', // 提示信息
          mold: 'error', // 类型，内容为warning, error, success, info
          type: 0 // 0为消息，会主动消失 1为弹框，需要用户点击
        }

        // 字符化学号，方便处理
        const uname = this.username + ''
        // 年级
        let grade = this.year % 100 - parseInt(uname.slice(5, 7)) + (new Date().getMonth() < 8 ? 0 : 1)

        if (uname === '' || this.password === '') {
          toast.msg = '学号或密码不能为空'
        } else if (uname.length !== 10) {
          toast.msg = '学号输入有误'
        } else if (grade === 1) {
          toast.msg = ALERT_BOX_CONTENT
          toast.title = ALERT_BOX_TITLE
          toast.mold = 'warning'
          toast.type = 1
        }

        return toast
      },
      _showIndicator ({text, icon}) {
        Indicator.open({
          text: text,
          spinnerType: icon
        })
      },
      _showToast ({msg, mold}) {
        this.toastControl = Toast({
          message: msg,
          position: 'middle',
          duration: 2000,
          iconClass: `icon icon-${mold}`
        })
      },
      _showMsgBox ({msg, title}) {
        MessageBox.alert(msg, title, {
          closeOnClickModal: true,
          confirmButtonText: '好吧'
        })
      },
      _closeIndicator () {
        Indicator.close()
      },
      handleData () {
        const msgBox = this._verify()
        /*
        * msg为空时表示验证通过，无需弹窗
        * */
        if (msgBox.msg !== '') {
          if (msgBox.type === 0) {
            this._showToast(msgBox)
          } else {
            this._showMsgBox(msgBox)
          }
        } else {
          this._login()
        }
      }
    },
    created () {
      this.year = new Date().getFullYear()
      this.height = document.body.scrollHeight
      this.showCopyright = true

      // 手机端呼出键盘，隐藏因为键盘而顶起的copyright
      window.addEventListener('resize', () => {
        if (document.body.scrollHeight < this.height) {
          this.showCopyright = false
        } else {
          this.showCopyright = true
        }
      })
    },
    beforeDestroy () {
      console.log('[destory]')
      if (this.toastControl) {
        this.toastControl.close()
      }
      this._closeIndicator()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/function"
  @import "~common/stylus/variable"

  .login
    height: 100%
    position: relative;
    overflow: hidden
    .pic
      height: rem(390)
      margin-top: rem(141)
      bg-image('./images/logo')
      bg-options()
      background-size contain
    .title
      margin-top: rem(40)
      width: 100%
      p
        padding-right: rem(84)
        text-align: right
        font-dpr(30px)
        color: $color-sub-title
    .form
      flex-center()
      placeholder-color($color-placeholder)
      margin-top: rem(148);
      .input-group
        position: relative
        display: inline-block
        height: rem(86)
        label
          display inline-block
          width: rem(45)
          height: rem(45)
          vertical-align middle
          margin-right: 5px
          position: relative;
          top: -15px
          bg-options()
          background-size contain

        .group
          display: inline-block
          position: relative
          overflow: hidden;
          .border
            &-left, &-right
              position: absolute
              display: inline-block
              width: 0
              height: 2px
              background-color: #44ceff
              bottom: 0
              left: 50%
              transition: all 0.5s;
            &-right
              transition: all 0.4s;
          input
            height: rem(85)
            width: rem(500)
            border-bottom: 1px solid #ccc
            font-dpr(30px)
            text-indent: 5px
            color: $color-text
          input:focus
            & + span
              width: 50%
              transform: translateX(-100%);
            & + span + span
              width: 50%
      .input-user
        label
          bg-image('./images/user')
      .input-pwd
        label
          bg-image('./images/password')
      .button
        width: rem(569)
        height: rem(88)
        margin: rem(119) 0 auto
        bg-image('./images/button')
        bg-options()
        background-size contain
    .copyright
      position: absolute;
      bottom: rem(63)
      left: 50%
      transform translateX(-50%)
      .icon
        display: inline-block
        width: rem(22)
        height: rem(23)
        vertical-align middle
        bg-image('./images/copyright')
        bg-options()
        background-size contain
      .text
        font-dpr(22px)
        margin-left: -5px
        color: $color-placeholder
        vertical-align middle

</style>
