<template>
  <div class="page-wrapper">
    <full-page v-if="achievements.length">
      <!-- 1 -->
      <div class="pages">
        <div class="page-content">
          <p>截止至<span class="page-data">{{ achievements[0].data[0] }}</span></p>
          <p>南大家园记录了你<span class="page-data">{{ achievements[0].data[1] }}</span>个学期的成绩</p>
          <p>很荣幸能见证你变得越来越优秀</p>
        </div>
        <div class="page-image">
          <span class="moving-item"></span>
        </div>
      </div>
      <!-- 2 -->
      <div class="pages">
        <div class="page-content">
          <p><span class="page-data">{{ achievements[1].data[0] }}</span>年，你成为一名<br/>
            南昌大学的学生</p>
          <p>从此，
            <br/>你开启了全新的学习生涯</p>
        </div>
        <div class="page-image">
          <span class="moving-item"></span>
        </div>
      </div>
      <!-- 3 -->
      <div class="pages">
        <div class="page-content">
          <p><span class="page-data">{{ achievements[2].data[0] }}</span><br/>
            是你上课的第一间教室</p>
          <p>你在这里学习<br/><span class="page-data">{{ achievements[2].data[1] }}</span></p>
          <p>那是你第一次和同学老师见面</p>
        </div>
        <div class="page-image">
          <span class="moving-item"></span>
        </div>
      </div>
      <!-- 4 -->
      <div class="pages">
        <div class="page-content">
          <p><span class="page-data">{{achievements[3].data[0]}}</span>老师是教你课程最多的老师</p>
          <p v-if="achievements[3].data[1].length > 1">除了<span class="page-data">{{ achievements[3].data[1][0] }}</span><br/>
            TA还教过你<br/>
            <span class="page-data">{{ achievements[3].data[1][1] }}</span>
          </p>
          <p>你之所以可以展翅高飞，是因为有他们做你坚实的基础</p>
        </div>
        <div class="page-image">
          <span class="moving-item"></span>
        </div>
      </div>
      <!-- 5 -->
      <div class="pages">
        <div class="page-content">
          <p>时间过得真快，到目前为止</p>
          <p>你已经学习了<span class="page-data">{{ achievements[4].data[0] }}</span>门课程<br/>
            修了<span class="page-data">{{ achievements[4].data[1] }}</span>个学分</p>
          <p>只有最充实的生活，<br/>
            才配得上最美好的年华</p>
        </div>
        <div class="page-image">
          <span class="moving-item" ref="twinkling"></span>
        </div>
      </div>
      <!-- 6 -->
      <div class="pages">
        <div class="page-content">
          <p>从入学到现在的<span class="page-data">{{ achievements[5].data[0] }}</span>天<br/>
            你有<span class="page-data">{{ achievements[5].data[1] }}</span>天是有课的<br/>
            累计学习高达<span class="page-data">{{ achievements[5].data[2] }}</span>个小时<br/>
            平均每天要上<span class="page-data">{{ achievements[5].data[3] }}</span>节课
          </p>
          <p>伟大的成绩和辛勤的劳动是成正比的</p>
        </div>
        <div class="page-image">
          <span class="moving-item" ref="wifi"></span>
        </div>
      </div>
      <!-- 7 -->
      <div class="pages">
        <div class="page-content">
          <p><span class="page-data">{{ achievements[6].data[0] }}</span><br/>
            是你表现最棒的学期</p>
          <p>GPA高达<span class="page-data">{{ achievements[6].data[1] }}</span></p>
          <p>付出必有回报，<br/>
            这是永恒的真理</p>
        </div>
        <div class="page-image">
          <span class="moving-item"></span>
        </div>
      </div>
      <!-- 8 -->
      <div class="pages">
        <div class="page-content">
          <p>你分数最高的课程是: <br/>
            <span class="page-data">{{achievements[7].data[0][0]}}</span>
          </p>
          <p>爆发了你的小宇宙</p>
        </div>
        <div class="page-image">
          <span class="moving-item"></span>
        </div>
      </div>
      <!-- 成绩汇总页面 -->
      <div class="pages" :class="finalBoard.className ? finalBoard.className : null">
        <h2 class="title" v-text="finalBoard.name"></h2>
        <section class="board-top">
          <h3 class="sub-title">我的成绩单</h3>
          <figure>
            <div class="image"></div>
            <ul>
              <li>
                <span class="name">1. 聪慧的源泉</span>
                <span class="score">93</span>分
              </li>
              <li>
                <span class="name">1. 聪慧的源泉</span>
                <span class="score">93</span>分
              </li>
              <li>
                <span class="name">1. 聪慧的源泉</span>
                <span class="score">93</span>分
              </li>
            </ul>
          </figure>
        </section>
        <section class="board-bottom">
          <div>
            <div>
              <h4 class="text">平均GPA</h4>
              <span class="value">3.283</span>
            </div>
            <div>
              <h4 class="text">班上排名</h4>
              <span class="value">16</span>
            </div>
          </div>
          <div>
            <p class="text">超过南昌大学<span class="value">54%</span>的人</p>
          </div>
        </section>
        <section class="share">
          <div class="share-button"></div>
        </section>
        <footer>
          <i class="icon"></i>
          <p class="tip">咦？这里才没有彩蛋呢</p>
        </footer>
      </div>
    </full-page>
  </div>
</template>

<script type="text/ecmascript-6">
  import FullPage from 'base/fullpage/fullpage'
  import { getAchievement, getName } from 'api/achievement'
  import { twinkling } from 'common/js/animate'
  import { Message, Loading } from 'element-ui'
  import bus from 'common/js/eventBus'
  import { STYLE_CONFIG } from 'src/config'

  export default {
    name: 'grade-board',
    data () {
      return {
        achievements: [],
        finalBoard: {},
        masterName: ''
      }
    },
    methods: {
      _animateWifi () {

      },
      _getName ({token}) {
        getName(token).then((res) => {
          console.log(res)
        })
      },
      _getAchievement () {
        const xh = this.$route.params.xh
        getAchievement(xh).then((res) => {
          if (res.status === 0) {
            this._showToast({
              msg: '学号信息有误，请重新登陆',
              mold: 'error'
            })
            this.$router.replace('/')
          } else {
            console.log(res)
            this.achievements = this._normalization(res.studentGrades[0])
            // 得到等级判定结果
            this._getFinalBoard(this._judgeLevel(res.studentGrades[0]), res.studentGrades[0])
          }
        })
      },
      _getYearFromSemester (str) {
        // str例子： '2016-2017-1'
        // 返回值为数组，为 [2016, 2017, 1]
        return str.split('-').map(val => {
          return parseInt(val)
        })
      },
      _normalization (data) {
        let achievements = []
        /*
        * 第一页
        * data：1. 日期  2. 学期
        * */
        achievements.push({
          data: [`${this.date.getFullYear()}年${this.date.getMonth() + 1}月`, data.semester.length]
        })
        /*
        * 第二页
        * data: 1. 来到南昌大学的第一个学期的年份
        * */
        achievements.push({
          data: [this._getYearFromSemester(data.semester[0]._id)[0]]
        })
        /*
        * 第三页
        * data: 1. 第一次上课的教室 2. 第一次上课的课程
        * */
        achievements.push({
          data: ['艺术楼A402', '设计概论']
        })
        /*
        * 第四页
        * data: 1. 教过最多课的老师的名字 2. 他教过你的课程 [>2]
        * */
        achievements.push({
          data: ['金晰', ['界面设计', '艺术创意与策划']]
        })
        /*
        * 第五页
        * data: 1. 上过的课程总数 2. 总学分
        * */
        achievements.push({
          data: [data.countCourse, data.creditSum]
        })
        /*
        * 第六页
        * data: 1. 入学到现在的天数 2. 有课的天数 3. 累计学习的小时数 4. 平均每天上课的节数
        * */
        achievements.push({
          data: [1008, 345, 2122, 2.7]
        })
        /*
        * 第七页
        * data: 1. 表现最棒的学期 2. 最高的gpa
        * */
        let years = this._getYearFromSemester(data.bestSemester)
        let endYear = years[1]  // 学期结束的年份
        let semester = years[2] // 第 ${semester} 学期 0 代表第三学期
        let grade = endYear - this._getYearFromSemester(data.semester[0]._id)[0]
        achievements.push({
          data: [`大${this.gradesWords[grade]}第${this.gradesWords[semester]}学期`, data.maxTermGPA]
        })
        /*
        * 第八页
        * data: 1. 分数最高的前三门课程
        * */
        achievements.push({
          data: [data.topCourse.map((item) => {
            return item.KCMC
          })]
        })
        return achievements
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
      _judgeLevel ({averangeGPA}) {
        let gpa = parseFloat(averangeGPA)
        let level = 0
        // get level
        if (gpa >= 2.5) {
          level++
          if (gpa >= 3) {
            level++
            if (gpa >= 3.3) {
              level++
            }
          }
        }
        return level
      },
      _getFinalBoard (level, data) {
        let {name, className, color} = STYLE_CONFIG[level]
        let {topCourse, averangeGPA, posClass} = data
        this.finalBoard = {
          name: name,
          className: className,
          color: color,
          courseList: topCourse.map((course) => {
            return {
              name: course.KCMC,
              value: course.ZCJ
            }
          }),
          argGPA: averangeGPA,
          posInClass: posClass,
          exceed: '54%'
        }
      }
    },
    created () {
      this.gradesWords = ['三', '一', '二', '三', '四']
      this.date = new Date()
      /*
      * 由于网络问题，可能导致获取数据时比较慢，出现空白
      * 因此这里加载loading界面
      * */
      this.loadingInstance = Loading.service({
        fullscreen: true,
        spinner: 'el-icon-loading',
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, .8)'
      })
      bus.$on('login', (msg) => {

      })
      this._getAchievement()
    },
    updated () {
      this.$nextTick(() => {
        twinkling(this.$refs.twinkling, 1000)
      })
    },
    watch: {
      achievements (list) {
        if (list.length > 0) {
          this.loadingInstance.close()
        }
      }
    },
    components: {
      FullPage
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixin'
  @import '~common/stylus/function'
  @import '~common/stylus/variable'
  @keyframes bounce-down
    0%, 100%
      transform: translate3d(0, 0, 0)
    50%
      transform: translate3d(0, 25px, 0)
  
  bg-animate('cap-up', './images/3.2', './images/3.3')
  
  .page-wrapper
    position: relative;
    width: 100%;
    height: 100%
    overflow: hidden
    .pages
      position: relative;
      .page-content
        margin: 0 auto
        margin-top: rem(200)
        height: auto
        p
          font-dpr($font-text)
          font-family: 'xiari'
          font-weight: bold
          color: $color-text
          margin-bottom: rem(65)
          line-height: rem(60)
          .page-data
            color: $color-text-data
            font-dpr($font-text-data)
            font-weight: bold
      .page-image
        position: absolute;
        z-index: -1
        bottom: rem(176)
        left: 50%
        transform translateX(-50%)
        width: rem(661)
        height: rem(470)
        margin: 0 auto
        bg-options()
        background-size: contain
        .moving-item
          position: absolute
          bg-options()
          background-size: contain
  
  /*
    特殊处理
   */
  urls = './images/1.' './images/2.' './images/3.' './images/4.' './images/5.' './images/6.' './images/7.' './images/8.'
  font-counts = 12 12 13 13 13 13 11 12
  pos = ((top rem(28)) (left rem(346)) (width rem(90)) (height rem(90))) ((top rem(100)) (left rem(244)) (width rem(205)) (height rem(109))) ((top rem(186)) (left rem(284)) (width rem(38)) (height rem(66))) ((top rem(10)) (left rem(300)) (width rem(64)) (height rem(82))) ((top rem(150)) (left rem(216)) (width rem(32)) (height rem(33))) ((top rem(130)) (left rem(150)) (width rem(72)) (height rem(54))) ((top rem(120)) (left rem(260)) (width rem(109)) (height rem(5))) ((top rem(24)) (left rem(134)) (width rem(87)) (height rem(59)))
  
  for _pos, i in pos
    .pages:nth-of-type({i+1})
      .page-image
        .moving-item
          width: get(_pos, width)
          height: get(_pos, height)
          top: get(_pos, top)
          left: get(_pos, left)
  
  for url, row in urls
    .pages:nth-of-type({row+1})
      .page-image
        bg-image(url + '1')
        .moving-item
          bg-image(url + '2')
  
  for counts, row in font-counts
    .pages:nth-of-type({row+1})
      .page-content
        width: (counts) * rem(48)
  
  .pages:nth-of-type(4)
    .page-content
      margin-top: rem(100)
  
  //  动画处理
  .pages:nth-of-type(1)
    .page-image
      .moving-item
        animation: float 2s infinite ease-in-out
  
  .pages:nth-of-type(2)
    .page-image
      .moving-item
        animation: float 2s infinite ease-in-out
  
  .pages:nth-of-type(3)
    .page-image
      .moving-item
        animation: cap-up 3s infinite ease-in-out
  
  .pages:nth-of-type(6)
    .page-image
      .moving-item
        background-position center bottom
        background-size: rem(14) rem(13)
      .wifi-0
        bg-image('./images/6.2')
        background-size: rem(14) rem(13)
      .wifi-1
        bg-image('./images/6.2.2')
        background-size: rem(33) rem(27)
      .wifi-2
        bg-image('./images/6.2.3')
        background-size: rem(53) rem(41)
      .wifi-3
        bg-image('./images/6.2.4')
        background-size: rem(72) rem(54)
  
  .pages:nth-of-type(8)
    .page-image
      .moving-item
        animation: bounce-down 2s infinite ease-in-out


</style>