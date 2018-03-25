<template>
  <div id="app" class="media">
    <!--<keep-alive> &lt;!&ndash;将dom缓存到内存中&ndash;&gt;-->
    <router-view></router-view>
    <!--</keep-alive>-->
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="stylus">
  @import 'common/stylus/variable.styl'
  @import 'common/stylus/base.styl'
  @font-face {
    font-family: "zhanghai";
    src: url("common/fonts/zhanghai.ttf");
    src : url('common/fonts/zhanghai.eot?#font-spider') format('embedded-opentype'),
    url('common/fonts/zhanghai.woff') format('woff'),
    url('common/fonts/zhanghai.ttf') format('truetype'),
    url('common/fonts/zhanghai.svg') format('svg');
  }

  @font-face {
    font-family: 'xiari';
    src: url('http://p242dj826.bkt.clouddn.com/font/summer.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  
  
  @keyframes float
    0%
      transform translate3d(0,0,0)
    50%
      transform translate3d(0,-15px, 0)
    100%
      transform translate3d(0, 0, 0)
  body
    overflow-y hidden
    max-width: 500px
    margin: 0 auto
    height: 100%
  #app
    height: 100%
</style>
