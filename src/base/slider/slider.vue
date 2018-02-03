<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots" v-if="showDot">
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addClass } from 'common/js/dom' // 引入dom addClass 函数
  import BScroll from 'better-scroll' // 引入betterScroll

  export default {
    data () {
      return {
        dots: [],
        currentPageIndex: 0 // 当前滚动到的页码
      }
    },
    props: {
      loop: { // 是否循环
        type: Boolean,
        default: true
      },
      autoPlay: { // 是否轮播
        type: Boolean,
        default: true
      },
      showDot: { // 是否展示用于显示图片序号的点
        type: Boolean,
        default: true
      },
      interval: { // 切换间隔
        type: Number,
        default: 4000
      },
      threshold: { // 滑动的长度限制，只有大于这个距离才会触发事件
        type: Number,
        default: 0.3
      },
      speed: { // 自动切换的速度，单位为ms
        type: Number,
        default: 800
      },
      click: { // 滚动元素是否可以点击
        type: Boolean,
        default: true
      }
    },
    mounted () {
      setTimeout(() => {
        this.update()

        window.addEventListener('resize', () => { // 监听屏幕大小的变化，使图片宽度重新定义设定
          if (!this.slider || this.slider.enable()) {
            return
          }

          clearTimeout(this.resizeTimer)
          this.resizeTimer = setTimeout(() => {
            if (this.slider.isInTransition) { // 窗口变化时，若正在过度状态则直接跳到下一张
              this._onScrollEnd()
            } else {
              if (this.autoPlay) { // 否则，重新播放
                this._play()
              }
            }
            this.refresh() // 更新滑动元素的宽度 以及 重置slider
          }, 60)
        })
      }, 20) // 20ms跟浏览器的刷新频率有关，
    },
    activated () { // keep-alive组件激活时调用
      if (!this.slider) {
        return
      }
      this.slider.enable() // 启用slider
      let pageIndex = this.slider.getCurrentPage().pageX // 获取当前页
      this.slider.goToPage(pageIndex, 0, 0) // 跳转
      this.currentPageIndex = pageIndex // 重新给data内当前页数据赋值
      if (this.autoPlay) { // 如果是自动轮播模式，则重新开始播放
        this._play()
      }
    },
    deactivated () {
      this.slider.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy () {
      this.slider.disable()
      clearTimeout(this.timer)
    },
    methods: {
      update () {
        if (this.slider) {
          this.slider.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh () {
        this._setSliderWidth(true)
        this.slider.refresh()
      },

      init () {
        clearTimeout(this.timer)
        this.currentPageIndex = 0
        this._setSliderWidth()
        if (this.showDot) {
          this._initDots()
        }
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      },
      _setSliderWidth (isResize) {
        this.children = this.$refs.sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }

        if (this.loop && !isResize) { // 如果是改变了窗口大小，则不需要重新再给两个宽度，因为此时this.children已经多出了两个元素
          width += 2 * sliderWidth
        }

        this.$refs.sliderGroup.style.width = width + 'px'
      },

      _initDots () {
        this.dots = new Array(this.children.length)
      },

      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true, // 水平方向是否滚动
          scrollY: false, // 垂直方向是否滚动
          momentum: false, // 是否开启惯性动画
          snap: {
            loop: this.loop, // 是否无缝循环
            threshold: this.threshold,
            speed: this.speed
          },
          click: this.click
        })

        this.slider.on('scrollEnd', this._onScrollEnd) // 监听滚动结束时，调用回调函数 this._onScrollEnd

        this.slider.on('touchEnd', () => { // 监听触摸结束
          if (this.autoPlay) {
            this._play()
          }
        })

        this.slider.on('beforeScrollStart', () => { // 监听滚动开始，清除定时器
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },

      _play () { // 滚动到下一页
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slider.next() // 代替goToPage
        }, this.interval)
      },

      _onScrollEnd () {
        let pageIndex = this.slider.getCurrentPage().pageX // 获取当前页的是第几个子元素
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          this._play()
        }
      }
    },
    watch: {
      loop () {
        this.update()
      },
      autoPlay () {
        this.update()
      },
      speed () {
        this.update()
      },
      threshold () {
        this.update()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>