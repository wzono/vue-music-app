<!-- 
  不要格式化，否则文字和数据之间会产生小空格
-->
<template>
  <div class="page-wrapper">
    <full-page v-if="achievements.length">
      <!-- 1 -->
      <div class="pages">
        <div class="page-content">
          <p>
            截止至<span class="page-data">{{ achievements[0].data[0] }}</span>
          </p>
          <p>
            南大家园记录了<span :class="{visitor: !isMaster}">{{visitor}}</span> <span class="page-data">{{ achievements[0].data[1] }}</span> 个学期的成绩</p>
          <p>很荣幸能见证<span :class="{visitor: !isMaster}">{{visitor}}</span>变得越来越优秀</p>
        </div>
        <div class="page-image">
          <span class="moving-item"></span>
        </div>
      </div>
      <!-- 2 -->
      <div class="pages">
        <div class="page-content">
          <p>
            <span class="page-data">{{ achievements[1].data[0] }}</span>年，<span :class="{visitor: !isMaster}">{{visitor}}</span>成为一名<br/> 南昌大学的学生
          </p>
          <p>从此，
            <br/><span :class="{visitor: !isMaster}">{{visitor}}</span>开启了全新的学习生涯</p>
        </div>
        <div class="page-image">
          <span class="moving-item"></span>
        </div>
      </div>
      <!-- 
        第三页第四页取消
       -->
      <!-- 3 -->
      <!-- <div class="pages">
        <div class="page-content">
          <p><span class="page-data">{{ achievements[2].data[0] }}</span><br/>
            是你上课的第一间教室</p>
          <p>你在这里学习<br/><span class="page-data">{{ achievements[2].data[1] }}</span></p>
          <p>那是你第一次和同学老师见面</p>
        </div>
        <div class="page-image">
          <span class="moving-item"></span>
        </div>
      </div> -->
      <!-- 4 -->
      <!-- <div class="pages">
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
      </div> -->
      <!-- 5 -->
      <div class="pages">
        <div class="page-content">
          <p>时间过得真快，到目前为止</p>
          <p>
            <span :class="{visitor: !isMaster}">{{visitor}}</span>已经学习了<span class="page-data">{{ achievements[2].data[0] }}</span>门课程<br/> 修了
            <span class="page-data">{{ achievements[2].data[1] }}</span>个学分</p>
          <p>只有最充实的生活，<br/> 才配得上最美好的年华
          </p>
        </div>
        <div class="page-image">
          <span class="moving-item" ref="twinkling"></span>
        </div>
      </div>
      <!-- 6 -->
      <div class="pages">
        <div class="page-content">
          <p>
            从入学到现在的<span class="page-data">{{ achievements[3].data[0] }}</span>天
          </p>
          <p>
            累计学习时间 <br/>
            高达<span class="page-data">{{ achievements[3].data[1] }}</span>个小时
          </p>
          <p>伟大的成绩和辛勤的劳动是成正比的</p>
        </div>
        <div class="page-image">
          <div class="out">
            <span class="moving-item" ref="wifi"></span>
          </div>
        </div>
      </div>
      <!-- 7 -->
      <div class="pages">
        <div class="page-content">
          <p>
            <span class="page-data">{{ achievements[4].data[0] }}</span><br/>是<span :class="{visitor: !isMaster}">{{visitor}}</span>表现最棒的学期
          </p>
          <p>
            GPA高达<span class="page-data">{{ achievements[4].data[1] }}</span>
          </p>
          <p>付出必有回报，<br/> 这是永恒的真理
          </p>
        </div>
        <div class="page-image">
          <span class="moving-item"></span>
        </div>
      </div>
      <!-- 8 -->
      <div class="pages">
        <div class="page-content">
          <p><span :class="{visitor: !isMaster}">{{visitor}}</span>分数最高的课程是: <br/>
            <span class="page-data">{{achievements[5].data[0][0]}}</span>
          </p>
          <p>爆发了<span :class="{visitor: !isMaster}">{{visitor}}</span>的小宇宙</p>
        </div>
        <div class="page-image">
          <span class="moving-item"></span>
        </div>
      </div>
      <!-- 成绩汇总页面 -->
      <div class="pages" :class="finalBoard.classname ? finalBoard.classname : null">
        <h2 class="title">{{ finalBoard.nick }}</h2>
        <section class="board-top">
          <h3 class="sub-title"><span :class="{visitor: !isMaster}">{{visitor}}</span>的成绩单</h3>
          <figure>
            <div class="image"></div>
            <ul>
              <li v-for="(item, index) in finalBoard.courseList" :key="index">
                <span class="name">{{index+1}}. {{item.name}}</span>
                <span class="score"><span>{{item.value}}</span>分</span>
              </li>
            </ul>
          </figure>
        </section>
        <section class="board-bottom">
          <div class="block-1">
            <div>
              <h4 class="text">平均GPA</h4>
              <p class="value">{{finalBoard.argGPA}}</p>
            </div>
            <div>
              <h4 class="text">班上排名</h4>
              <p class="value">{{finalBoard.posInClass}}</p>
            </div>
          </div>
          <div class="block-2">
            <p class="text">超过南昌大学<span class="value">{{finalBoard.position}}</span>的人</p>
          </div>
        </section>
        <section class="share">
          <div class="share-button" @click="_showTip()"></div>
        </section>
        <footer>
          <i class="icon"></i>
          <p class="tip">咦？这里才没有彩蛋呢</p>
        </footer>
      </div>
    </full-page>
    <div v-if="isShowTip" class="tip-layout" @click="_closeTip()"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import FullPage from 'base/fullpage/fullpage'
import {getAchievement, getName} from 'api/achievement'
import {Toast, Indicator} from 'mint-ui'
import {STYLE_CONFIG} from 'src/config'

export default {
  name: 'grade-board',
  data() {
    return {
      achievements: [],
      finalBoard: {},
      visitor: '你',
      isMaster: false,
      isShowTip: false
    }
  },
  methods: {
    _closeTip () {
      this.isShowTip = false
    },
    _showTip () {
      console.log(1)
      this.isShowTip = true
    },
    _getName({name}) {
      this.visitor = this.isMaster ? '你' : name
    },
    /**
     *  @param {}
     *  @returns {}
     *  封装的获取成绩函数
     */
    _getAchievement() {
      const xh = this.$route.params.xh
      getAchievement(xh)
        .then(res => {
          if (res.status === 0) {
            this._closeIndicator()

            this._showToast({
              msg: '后台出了点小问题，请稍后再试',
              mold: 'error'
            })

            this.$nextTick(() => {
              this.$router.replace('/')
            })
          } else {
            this.achievements = this._normalization(res.studentGrades[0])
            this._getName(res.studentGrades[0])
            // 得到等级判定结果
            this._getFinalBoard(
              this._judgeLevel(res.studentGrades[0]),
              res.studentGrades[0]
            )
            setTimeout(() => {
              this._closeIndicator()   
            }, 1000)         
          }
        })
        .catch(err => {
          console.error(err)
          this._closeIndicator()
          this._showToast({
            msg: '后台出了点小问题，请稍后再试',
            mold: 'error'
          })
          this.$nextTick(() => {
            this.$router.replace('/')
          })
        })
    },
    _computeDays (past, now) {
      return parseInt((new Date(now).getTime() - new Date(past).getTime()) / 3600 / 1000 / 24)
    },
    _getYearFromSemester(str) {
      // str例子： '2016-2017-1'
      // 返回值为数组，为 [2016, 2017, 1]
      return str.split('-').map(val => {
        return parseInt(val)
      })
    },
    /**
     * @param {object} 获取的学生信息
     * @return {array} 提取所需数据组成的数组
     * 重组后端数据
     */
    _normalization(data) {
      let achievements = []
      /*
        * 第一页
        * data：1. 日期  2. 学期
        * */
      achievements.push({
        data: [
          `${this.date.getFullYear()}年${this.date.getMonth() + 1}月`,
          data.semester.length
        ]
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
      // achievements.push({
      //   data: ['艺术楼A402', '设计概论']
      // })
      // /*
      // * 第四页
      // * data: 1. 教过最多课的老师的名字 2. 他教过你的课程 [>2]
      // * */
      // achievements.push({
      //   data: ['金晰', ['界面设计', '艺术创意与策划']]
      // })
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
        data: [
          this._computeDays(`${this._getYearFromSemester(data.semester[0]._id)[0]}-9-1`, new Date()), data.learningTime]
      })
      /*
        * 第七页
        * data: 1. 表现最棒的学期 2. 最高的gpa
        * */
      let years = this._getYearFromSemester(data.bestSemester)
      let endYear = years[1] // 学期结束的年份
      let semester = years[2] // 第 ${semester} 学期 0 代表第三学期
      let grade = endYear - this._getYearFromSemester(data.semester[0]._id)[0]
      achievements.push({
        data: [
          `大${this.gradesWords[grade]}第${this.gradesWords[semester]}学期`,
          data.maxTermGPA
        ]
      })
      /*
        * 第八页
        * data: 1. 分数最高的前三门课程
        * */
      achievements.push({
        data: [
          data.topCourse.map(item => {
            return item.KCMC
          })
        ]
      })
      return achievements
    },
    /**
     * @param {object} 从中提取出 averangeGPA
     * @returns {number} 评判的等级 0-学渣 1-修行生 2-得分王 3-掠分王
     * 评判等级函数
     */
    _judgeLevel({averangeGPA}) {
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
    /**
     * @param {number} level 学生等级
     * @param {object} data 学生信息
     * 得到最终页的面板成绩
     */
    _getFinalBoard(level, data) {
      let {nick, classname, color} = STYLE_CONFIG[level]
      let { topCourse, averangeGPA, classPos, name, position } = data
      this.finalBoard = {
        nick: nick,
        name: name,
        position: position + '%',
        classname: classname,
        color: color,
        courseList: topCourse.map(course => {
          return {
            name: course.KCMC.length > 6 ? course.KCMC.slice(0, 5) + '...' : course.KCMC,
            value: course.ZCJ
          }
        }),
        argGPA: averangeGPA,
        posInClass: classPos
      }
    },
    _showIndicator({text, icon}) {
      Indicator.open({
        text: text,
        spinnerType: icon
      })
    },
    _showToast({msg, mold}) {
      Toast({
        message: msg,
        position: 'middle',
        duration: 2000,
        iconClass: `icon icon-${mold}`
      })
    },
    _closeIndicator() {
      Indicator.close()
    }
  },
  created() {
    this.gradesWords = ['三', '一', '二', '三', '四']
    this.date = new Date()
    /*
      * 由于网络问题，可能导致获取数据时比较慢，出现空白
      * 因此这里加载loading界面
      * */
    this._getAchievement()
    this._showIndicator({
      text: '正在获取你的GPA...',
      spinnerType: 'fading-circle'
    })
    this.isMaster = this.$root.$bus.isMaster
  },
  watch: {
    achievements(list) {
      if (list.length > 0) {
        this._closeIndicator()
      }
    }
  },
  components: {
    FullPage
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/mixin';
@import '~common/stylus/function';
@import '~common/stylus/variable';
@import './stylus/correction'; // 特殊处理
@import './stylus/animations'; // 动画处理
@import './stylus/person_type'; // 人物类型设置

.page-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .tip-layout {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    bg-image('~images/tip');
    bg-options()
    z-index: 111;
    background-size: cover;
  }
  .pages {
    position: relative;
    .visitor {
      font-weight: bold;
      font-dpr(56px)
      color: #000;
    }
    .page-content {
      margin: 0 auto;
      margin-top: rem(200);
      height: auto;
      p {
        font-dpr($font-text);
        font-family: 'xiari';
        font-weight: bold;
        color: $color-text;
        margin-bottom: rem(65);
        line-height: rem(60);
        span {
          font-weight: bold;
        }
        .page-data {
          color: $color-text-data;
          font-dpr($font-text-data);
          font-weight: bold;
        }
      }
    }

    .page-image {
      position: absolute;
      z-index: -1;
      bottom: rem(176);
      left: 50%;
      transform: translateX(-50%);
      width: rem(661);
      height: rem(470);
      margin: 0 auto;
      bg-options();
      background-size: contain;

      .moving-item {
        position: absolute;
        bg-options();
        background-size: contain;
      }
    }
  }
  .pages:nth-of-type(7) {
    .title {
      font-family: "zhanghai";
      font-dpr(170px);
      font-weight: bold;
      text-align: center;
      margin-top: rem(57);
      white-space: pre-wrap;
    }

    .board-top {
      margin: 0 rem(20);
      margin-top: rem(18);
      border-radius: rem(50);
      padding: rem(40);
      padding-bottom: rem(60);

      .sub-title {
        text-align: center;
        font-family: "zhanghai";
        font-dpr(60px);
        font-weight: normal;
        letter-spacing: 2px;
      }
      figure {
        display: flex;
        flex-direction: row;
        .image {
          width: rem(195);
          height: rem(282);
          bg-options();
          background-size: contain;
        }
        ul {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          padding-left: rem(48);
          li {
            flex: 1;
            display: flex;
            align-items: flex-end;
            position: relative;
            .name {
              font-dpr(36px);
            }
            .score {
              position: absolute;
              right: 0;
              font-dpr(36px);
              span {
                display: inline-block;
                font-dpr(48px);
                color: $color-text;
                line-height: rem(36);
              }
            }
          }
        }
      }
    }
    .board-bottom {
      margin: 0 rem(20);
      padding: 0 rem(40);
      .block-1 {
        display: flex;
        justify-content: space-between;
        margin-top: rem(70);
        div {
          text-align: center;
          h4 {
            font-dpr(48px);
            font-family: "zhanghai";
            font-weight: normal;
          }
          p {
            margin-top: rem(21);
            text-align: center;
            font-dpr(60px);
            letter-spacing: -1px;
          }
        }
      }
      .block-2 {
        margin-top: rem(82);
        display: flex;
        .text {
          font-dpr(60px);
          font-family: "zhanghai";
          width: 100%;
          text-align:justify;
          text-justify:distribute-all-lines;
          text-align-last:justify;
          -moz-text-align-last:justify;
          /*ff*/
          -webkit-text-align-last:justify;
          /*chrome 20+*/
          .value {
            font-dpr(72px);
            font-family: Arial, Helvetica, sans-serif;
          }
        }
      }
    }
    .share {
      margin-top: rem(70);
      .share-button {
        width: rem(532);
        height: rem(88);
        bg-options()
        background-size: cover;        
        margin: 0 auto;
      }
    }
    footer {
      position: absolute;
      bottom: rem(16);
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      font-dpr(28px)
      .icon {
        width: rem(70);
        height: rem(36);
        margin: rem(27) 0 rem(19) 0;
        bg-options();
        background-size: cover;
      }
    }
  }
}
</style>