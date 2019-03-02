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
                  <el-select placeholder="学科" style="margin: 0px 3px;" v-model="queryModel.courseId" @change="change()">
                    <el-option
                      v-for="item in courses"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-select placeholder="年级" style="margin: 0px 3px;" v-model="queryModel.gradeId" @change="change()">
                    <el-option
                      v-for="item in grades"
                      :key="item.id"
                      :label="item.gradename"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>

              <div v-for="o in paperTypes" :key="o" class="text leftItem"
                   v-bind:class="{leftItemClick:currentPaperType==o.id}"
                   v-on:click="chooseType(o)"
              >
                <el-row class="row">
                  <el-col :span="12" style="text-align: left; ">
                    <el-button type="text" style="margin-left: 10px;color: #505050">{{ o.name }}</el-button>
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
                    <el-input placeholder="请输入试卷标题或关键字" v-model="queryModel.name">
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
                    <el-button v-bind:type="queryModel.areaId==''?'primary':'button'" v-on:click='queryModel.areaId = "";search()'>
                      全部
                    </el-button>
                    <el-button
                      v-for="area in commonlyAreas"
                      v-on:click='queryModel.areaId = area.id;search()'
                      v-bind:type="queryModel.areaId==area.id?'primary':'button'"
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
                      v-on:click='queryModel.periodId = lt.id;search()'
                      v-bind:type="queryModel.periodId==lt.id?'primary':'button'"
                    >
                      {{lt.name}}
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
import Pager from '@/components/pager'
import commonService from '@/common/service/commonService'
import testPaperService from '@/common/service/testPaperService'

export default {
  created: function () {
    // 获取顶级学科
    commonService.getTopSubject().then(res => {
      this.courses = res.data.data;
    });
    // 获取年级信息
  commonService.getAllGrade().then(res=>{
    this.grades = res.data.data;
  });
    this.search()
  },
  data () {
    return {
      queryModel:{
        id:'',
        name:'',
        gradeId:'',
        paperTypeId:'',
        areaId:'',
        periodId:'',
        courseId:''
      },
      commonlyAreas: [{
      id:1,
        name:'广州'
      },
        {
          id:2,
          name:'佛山'
        },
        {
          id:3,
          name:'揭阳'
        },
        {
          id:4,
          name:'东莞'
        },
        {
          id:5,
          name:'中山'
        },
        {
          id:6,
          name:'珠海'
        }
        ],
      paperTypes: productPaper.model.paperTypes,
      papers: {},
      currentArea: '',
      currentPaperType: '',
      paperName: '',
      claType: '',
      pages: 0,
      currentPage: 1,
      pageSize: 20,
      courseId: '', // 学科id
      gradeId: '', // 年级id
      courses: [],
      grades: [],
      paper: {},
      paperId: '', // 新建的试卷id,
      orgId: '',// 机构Id
      periods:productPaper.model.periods
    }
  },
  methods: {
    search: function () {
      testPaperService.searchTestPaperByPage(this.queryModel,this.currentPage,5).then(res=>{
        if(res.data.data.list==null){
          this.papers=[],
            this.pages=0
        }
        this.papers =res.data.data;
        this.pages=res.data.data.page_total;
      })
    },
    chooseType: function (o) {
      this.queryModel.paperTypeId = o.id
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
    pager:Pager,
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
