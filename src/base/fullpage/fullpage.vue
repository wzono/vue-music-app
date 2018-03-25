<template>
  <div class="full-page" ref="fullPage">
    <div class="page-group" ref="pageGroups">
      <slot></slot>
    </div>
    <div class="arrow" v-show="icon">
      <span class="icon"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import { addClass } from 'common/js/dom' // 引入dom addClass 函数

  export default {
    name: 'full-page',
    data () {
      return {
        currentPageIndex: 0,
        icon: true
      }
    },
    props: {
      threshold: {
        type: Number,
        default: 0.3
      }
    },
    methods: {
      update () {
        if (this.fullPage) {
          this.fullPage.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh () {
        this._setFullPageHeight(true)
        this.fullPage.refresh()
      },

      init () {
        this.currentPageIndex = 0
        this._setFullPageHeight()
        this._initFullPage()
      },
      
      _setFullPageHeight () {
        this.children = this.$refs.pageGroups.children

        let height = 0
        let pageHeight = this.$refs.fullPage.clientHeight

        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'page-item')
          child.style.height = pageHeight + 'px'
          height += pageHeight
        }
        this.$refs.pageGroups.style.height = height + 'px'
      },
      
      _initFullPage () {
        this.fullPage = new BScroll(this.$refs.fullPage, {
          scrollX: false,
          scrollY: true,
          momentum: false, // 是否开启惯性动画
          snap: {
            loop: false, // 是否无缝循环
            threshold: 0.3,
            speed: 800
          },
          click: true
        })

        this.fullPage.on('scrollEnd', () => {
          this.currentPageIndex = this.fullPage.getCurrentPage().pageY
          this.icon = this.currentPageIndex !== this.children.length - 1
        })
        // this.slider.on('scrollEnd', this._onScrollEnd) // 监听滚动结束时，调用回调函数 this._onScrollEnd
        //
        // this.slider.on('touchEnd', () => { // 监听触摸结束
        //
        // })
        //
        // this.fullPage.on('beforeScrollStart', () => { // 监听滚动开始
        // })
      }
    },
    mounted () {
      setTimeout(() => {
        this.update()
      }, 20)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixin.styl'
  @import '~common/stylus/function.styl'
  
    
  .full-page
    min-height: 1px
    height: 100%
    .page-group
      position: relative
      height: 100%
      .page-item
        box-sizing: border-box
        overflow: hidden
    .arrow
      position: absolute;
      bottom: rem(65)
      width: 100%
      text-align center
      .icon
        display: inline-block
        width: rem(52)
        height: rem(33)
        bg-image('./images/icon')
        bg-options()
        background-size contain
        animation float 2s ease-in-out infinite
</style>