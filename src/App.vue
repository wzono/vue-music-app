<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive> <!--将dom缓存到内存中-->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import tab from 'components/tab/tab'

  export default {
    name: 'app',
    components: {
      MHeader,
      tab
    }
  }
</script>

<style lang="stylus" scoped>
  @import 'common/stylus/variable.styl';
  #app
    color: $color-theme
</style>
