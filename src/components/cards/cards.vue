<template>
  <div class="page-wrapper">
    <fullpage>
      <div v-for="item in msg">
        {{ item }}
      </div>
    </fullpage>
  </div>
</template>

<script type="text/ecmascript-6">
  import Fullpage from 'base/fullpage/fullpage'
  
  export default {
    name: 'grade-board',
    data () {
      return {
        msg: ['123', '222', '333']
      }
    },
    components: {
      Fullpage
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .page-wrapper
    position: relative;
    width: 100%;
    height: 100%
    overflow: hidden
</style>