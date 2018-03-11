<template>
  <div class="login">
    <!-- 登录logo -->
    <div class="pic"></div>
    <!-- 右边小标题 -->
    <div class="title">
      <p>——专属于你的{{ year }}GPA报告</p>
    </div>
    <!-- 账户输入 -->
    <div class="form">
      <!-- 账号 -->
      <div class="input-group input-user">
        <label for="username"></label>
        <input type="number" id="username" placeholder="输入你的学号" v-model.number="username"/>
      </div>
      
      <!-- 密码 -->
      <div class="input-group input-pwd">
        <label for="password"></label>
        <input type="password" id="password" placeholder="输入云家园密码" v-model="password"/>
      </div>
      <!-- 登录按钮 -->
      <div class="button" @touchstart="handleData()"></div>
    </div>
    <!-- 版权 -->
    <div class="copyright" v-show="showCopyright">
      <span class="icon"></span>
      <span class="text">南昌大学家园工作室</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { login } from 'api/login'
  import { Message, MessageBox, Loading } from 'element-ui'
  import bus from 'common/js/eventBus'
  
  const ALERT_BOX_TITLE = '消息'
  const ALERT_BOX_CONTENT = '大一的萌新还没有成绩哦，暂时不能查看呢'
  
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: ''
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
          fullscreen: false,
          spinner: 'el-icon-loading',
          text: '正在登陆中...',
          background: 'rgba(0, 0, 0, .8)'
        }
        // 以服务的方式呼起loading
        this.loadingInstance = Loading.service(options)
        
        login(data).then((res) => {
          this.loadingInstance.close()
          if (res.status === 1) {
            // 登陆成功
            // eventBus分发登陆成功事件
            bus.$emit('login', {
              username: this.username,
              token: res.token
            })
            this._showToast({msg: '登陆成功!', mold: 'success'})
            this.$router.push({ path: `/${this.username}` })
          } else {
            // 登陆失败
            this._showToast({msg: res.message, mold: 'error'})
          }
        }).catch((err) => {
          this._showToast({msg: err, mold: 'error'})
          this.loadingInstance.close()
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
      _showToast ({msg, mold}) {
        Message({
          type: mold,
          message: msg,
          duration: 2500,
          center: true,
          customClass: 'login-toast'
        })
      },
      _showMsgBox ({msg, mold, title}) {
        MessageBox.alert(msg, title, {
          type: mold,
          center: true,
          customClass: 'login-msg-box',
          confirmButtonText: '好吧',
          roundButton: true,
          showClose: false
        })
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
      this.loadingInstance = '' // 用于methods之间调用loading加载

      // 手机端呼出键盘，隐藏因为键盘而顶起的copyright
      window.addEventListener('resize', () => {
        if (document.body.scrollHeight < this.height) {
          this.showCopyright = false
        } else {
          this.showCopyright = true
        }
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/function"
  @import "~common/stylus/variable"
  
  .login
    height: 100%
    overflow-y: hidden
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
        label
          display inline-block
          width: rem(45)
          height: rem(45)
          vertical-align middle
          margin-right: 5px
          position: relative;
          top: 3px
          bg-options()
          background-size contain
        input
          height: rem(85)
          width: rem(500)
          border-bottom: 1px solid #ccc
          font-dpr(30px)
          text-indent: 5px
          color: $color-text
        input:focus
          border-color: #44ceff
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