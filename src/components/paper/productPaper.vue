<template>
  <div>
    <el-row :gutter="20">

      <el-col :span="18" offset="3">
        <el-row :gutter="10">
          <!--左侧栏-->
          <el-col :span="5">
            <el-card :body-style="{ padding: '0px' }">
              <el-row style="background: #F3F7F9" class="row">
                <el-col :span="12">
                  <el-select placeholder="学科" style="margin: 0px 3px;" v-model="courseId" @change="change()">
                    <el-option
                      v-for="item in courses"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-select placeholder="年级" style="margin: 0px 3px;" v-model="gradeId" @change="change()">
                    <el-option
                      v-for="item in grades"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>

              <div v-for="o in paperTypes" :key="o" class="text leftItem"
                   v-bind:class="{leftItemClick:currentPaperType==o}"
                   v-on:click="chooseType(o)"
              >
                <el-row class="row">
                  <el-col :span="12" style="text-align: left; ">
                    <el-button type="text" style="margin-left: 10px;color: #505050">{{ o }}</el-button>
                  </el-col>
                  <el-col :span="12" style="text-align: right">
                    <el-button type="text" style="margin-right: 10px; color: #505050">></el-button>
                  </el-col>
                </el-row>

              </div>
            </el-card>
          </el-col>

          <!--右侧栏-->
          <el-col :span="19">
            <el-card :body-style="{ padding: '0px' }">
              <el-row class="row" id="paperProduct-search">
                <el-col :span="3">
                  <el-button type="text" class="serachTextButton">搜索试卷</el-button>

                </el-col>
                <el-col :span="10">
                  <div class="demo-input-size">
                    <el-input placeholder="请输入试卷标题或关键字" v-model="paperName">
                    </el-input>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-button v-on:click="search">搜索</el-button>
                </el-col>
              </el-row>

              <el-row class="row">
                <el-col :span="2">
                  <el-button type="text" class="serachTextButton">地区</el-button>
                </el-col>
                <el-col :span="22" style="text-align: left">
                  <el-button-group style="margin-top: 5px;margin-bottom: 5px;">
                    <el-button v-bind:type="currentArea==''?'primary':'button'" v-on:click='currentArea = "";search()'>
                      全部
                    </el-button>
                    <el-button
                      v-for="area in commonlyAreas"
                      v-on:click='currentArea = area.id;search()'
                      v-bind:type="currentArea==area.id?'primary':'button'"
                    >
                      {{area.name}}
                    </el-button>
                  </el-button-group>
                </el-col>
              </el-row>

              <el-row class="row">
                <el-col :span="2">
                  <el-button type="text" class="serachTextButton">期数</el-button>
                </el-col>
                <el-col :span="22" style="text-align: left">
                  <el-button-group style="margin-top:5px;margin-bottom: 5px;">
                    <el-button
                      v-for="lt in periods"
                      v-on:click='currentPeriod = lt.id;search()'
                      v-bind:type="currentPeriod==lt.id?'primary':'button'"
                    >
                      {{lt.name}}
                    </el-button>
                  </el-button-group>
                </el-col>

              </el-row>

              <el-row class="row">
                <el-col :span="2">
                  <el-button type="text" class="serachTextButton">年份</el-button>
                </el-col>
                <el-col :span="22" style="text-align: left">
                  <el-button-group style="margin-top: 5px;margin-bottom: 5px;">

                    <el-button v-bind:type="currentYear==2?'primary':'button'"
                               v-on:click='currentYear = 2;lessYear=1;search()'>全部
                    </el-button>
                    <el-button
                      v-for="year in years"
                      v-on:click='currentYear = year;lessYear=1;search()'
                      v-bind:type="currentYear==year?'primary':'button'"
                    >
                      {{year}}
                    </el-button>
                    <el-button
                      v-for="year in lessYears"
                      v-on:click='lessYear = year;currentYear=1;search()'
                      v-bind:type="lessYear==year?'primary':'button'"
                    >
                      {{year}}以前
                    </el-button>
                  </el-button-group>
                </el-col>
              </el-row>

              <!--<el-row class="row">-->
              <!--<el-col :span="2">-->
              <!--<el-button type="text" class="serachTextButton">班型</el-button>-->
              <!--</el-col>-->
              <!--<el-col :span="6" style="text-align: left">-->
              <!--<el-select filterable placeholder="请选择" v-model="claType">-->
              <!--<el-option-->
              <!--v-for="item in classTypes"-->
              <!--:key="item"-->
              <!--:label="item"-->
              <!--:value="item">-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--</el-col>-->

              <!--<el-col :span="2">-->
              <!--<el-button type="text" class="serachTextButton">讲次</el-button>-->
              <!--</el-col>-->
              <!--<el-col :span="6" style="text-align: left">-->
              <!--<el-select placeholder="请选择" v-model="lect">-->
              <!--<el-option-->
              <!--v-for="item in lects"-->
              <!--:key="item.id"-->
              <!--:label="item.name"-->
              <!--:value="item.id">-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--</el-col>-->

              <!--</el-row>-->
              <el-row class="row">

              </el-row>
            </el-card>

            <el-row style="margin-top: 10px;">
              <paper-item v-bind:parentPapers="papers"></paper-item>
            </el-row>

            <el-row style="margin-top: 10px;">
              <pager v-bind:totalPage="pages" v-on:gotoNext="nextPage"></pager>
            </el-row>

          </el-col>
        </el-row>
      </el-col>

      <el-col :span="3">
        <div class="grid-content"></div>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import productPaper from '@/common/js/productPaper'
import paperItem from '@/components/paper/paperItem'
import pager from '@/components/pager'
import Pager from '../pager'
import commonService from '@/common/service/commonService'
import testPaperService from '@/common/service/testPaperService'

export default {
  created: function () {
    // 获取区域
    this.$ajax.get(this._global.requestUrl.allAreasUrl).then(res => {
      if (res.data.resultCode == '0000') {
        this.commonlyAreas = productPaper.controller.getCommonAreas(res.data.data)
      }
    })
    // 获取班型
    this.$ajax.get(this._global.requestUrl.getTestPaperClassTypeUrl).then(res => {
      if (res.data.resultCode == '0000') {
        this.classTypes = res.data.data
      }
    })
    // 获取顶级学科
    this.$ajax.get(this._global.requestUrl.getTopSubjectUrl).then(res => {
      if (res.data.resultCode == '0000') {
        this.courses = res.data.data
      }
    })
    // 获取年级信息
    this.$ajax.get(this._global.requestUrl.getGradesUrl).then(res => {
      if (res.data.resultCode == '0000') {
        this.grades = res.data.data
      }
    })

    this.paper = this._global.storage.getSession('srcPaper')
    if (this.paper) {
      this.courseId = this.paper.list[0].courseid
      this.gradeId = this.paper.list[0].gradeid
      if (this.paper.list[0].orgId) {
        this.orgId = this.paper.list[0].orgId
      }
    }
    this.search()
  },
  data () {
    return {
      commonlyAreas: [],
      paperTypes: productPaper.model.paperTypes,
      lects: productPaper.model.lects,
      periods: productPaper.model.periods,
      years: productPaper.model.years,
      lessYear: '',
      lessYears: productPaper.model.lessYears,
      papers: {},
      classTypes: [],
      currentPeriod: '',
      currentArea: '',
      currentYear: '',
      currentPaperType: '',
      paperName: '',
      claType: '',
      lect: '',
      pages: 0,
      currentPage: 1,
      pageSize: 20,
      courseId: '', // 学科id
      gradeId: '', // 年级id
      courses: [],
      grades: [],
      paper: {},
      paperId: '', // 新建的试卷id,
      orgId: ''// 机构Id
    }
  },
  methods: {
    search: function () {
      var baseUrl = this._global.requestUrl.testPaperSearchUrl + this.currentPage + '/' + this.pageSize
      var param = {}
      if (this.paperName.length > 0) {
        param['name'] = this.paperName
      }
      if (this.currentPeriod.length > 0) {
        param['season'] = this.currentPeriod
      }
      if (this.currentPaperType.length > 0) {
        param['typename'] = this.currentPaperType
      }
      if (this.currentYear.length > 0 && this.currentYear != 1) {
        param['yearid'] = this.currentYear
      }
      if (this.lessYear.length > 0 && this.lessYear != 1) {
        param['lessYear'] = this.lessYear
      }
      if (this.currentArea.length > 0) {
        param['areaid'] = this.currentArea
      }
      if (this.claType.length > 0) {
        param['classType'] = this.claType
      }

      if (this.lect.length > 0) {
        param['lectureno'] = this.lect
      }
      if (this.gradeId.length > 0) {
        param['gradeid'] = this.gradeId
      }
      if (this.courseId.length > 0) {
        param['courseid'] = this.courseId
      }
      if (this.orgId.length > 0) {
        param['orgId'] = this.orgId
      }
      this.$ajax.post(
        baseUrl,
        param
      ).then(res => {
        if (res.data.resultCode === '0000') {
          if (res.data.data == null) {
            this.papers = {}
            this.pages = 0
          } else {
            this.papers = res.data.data
            this.pages = res.data.data.pages
          }
        } else {
          this.papers = {}
          this.pages = 0
        }
      })
    },
    chooseType: function (o) {
      this.currentPaperType = o
      this.search()
    },
    change: function () {
      this.search()
    },
    nextPage: function (index) {
      this.currentPage = index
      this.search()
    }
  },
  components: {
    Pager,
    paperItem: paperItem
  },
  mounted () {
    commonService.Connect().then(res=>{

    });
    // /* const oScript = document.createElement('script');
    //    oScript.type = 'text/javascript';
    //    oScript.src = 'http://assets.growingio.com/2.1/gio.js';
    //    document.body.appendChild(oScript);
    //    gio('init', '870c1ad8942016cd', {});
    //    gio('send'); */
    //
    // this.paperId = this.$route.query.paperId
    // if (!this.paperId) {
    //   var paper = this._global.storage.getSession('srcPaper')
    //   if (!paper) {
    //     alert('请先选择试卷')
    //     this.$router.back(-1)
    //     // return;
    //   } else {
    //     this.paperId = paper.list[0].id
    //     testPaperService.searchTestPaperByPage({'id': this.paperId}, 1, 10).then(res => {
    //       var paper = res
    //       // 将要编辑的试卷信息保存的本地sessionStorage
    //       this._global.storage.setSession('srcPaper', paper, 0)
    //     })
    //   }
    // } else {
    //   testPaperService.searchTestPaperByPage({'id': this.paperId}, 1, 10).then(res => {
    //     var paper = res
    //     // 将要编辑的试卷信息保存的本地sessionStorage
    //     this._global.storage.setSession('srcPaper', paper, 0)
    //   })
    // }

  }
}
</script>
<style>
  #paperProduct-search .el-input__inner {
    -webkit-appearance: none;
    background-color: #f6f7fb;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }
</style>
<style scoped>
  @import "productPaper.css";
</style>
