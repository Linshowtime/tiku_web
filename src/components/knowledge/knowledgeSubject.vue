<template>
    <div>
      <headcommon v-bind:initIndex="2"  v-bind:manageIndex="1"></headcommon>
      <!-- 筛选条件行-->
      <el-row :gutter="20">
        <!-- 中间筛选条件列-->
        <el-col :span="18" offset="3">
          <el-row :gutter="10">
            <!--左侧栏-->
            <el-col :span="5">
              <el-card :body-style="{ padding: '0px' }">
              <el-row style="background: #F3F7F9"  class="row">
                <el-col :span="12">
                  <el-select  placeholder="学科" style="margin:0px 3px;" v-model="subject" @change="change()">
                        <el-option
                          v-for="item in subjects"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-select  placeholder="学段" style="margin:0px 3px;" v-model="studySection" @change="change()">
                      <el-option
                        v-for="item in studySections"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row  class="row">
                <!--<knowledge-tree style="margin-top: 5px;" :segmentCourseId="this.segmentCourseId" v-on:knowledgeName="childByValue"></knowledge-tree>-->
                <knowledge-tree style="margin-top: 5px;" v-bind:orgId="this.orgId" v-bind:subject="this.subject" v-bind:studySection="this.studySection"v-on:knowledgeName="childByValue"></knowledge-tree>
              </el-row>
              </el-card>
            </el-col>

            <!--搜索条件栏-->
            <el-col :span="19">
              <el-card :body-style="{ padding: '0px' }" id="knowledge-search">
              <el-row class="row">
                <el-col :span="3" class="serachText">
                  <el-button type="text" class="serachTextButton" >题目关键字</el-button>

                </el-col>
                <el-col :span="10">
                  <div class="demo-input-size">
                    <el-input placeholder="请输入题目关键字" v-model="subjectContent">
                    </el-input>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-button @click="search()">搜索</el-button>
                </el-col>
              </el-row>

              <el-row class="row">
                <el-col :span="3" class="serachText">
                  <el-button type="text" class="serachTextButton" >知识点关键字</el-button>

                </el-col>
                <el-col :span="10">
                  <div class="demo-input-size">
                    <el-input placeholder="请输入知识点关键字" v-model="knowledgeNames">
                    </el-input>
                  </div>
                </el-col>

              </el-row>


              <el-row class="row">
                <el-col :span="2" class="serachText">
                  <el-button type="text" class="serachTextButton">题型</el-button>
                </el-col>
                <el-col :span="8" style="text-align: left">
                  <el-select  filterable placeholder="请选择" style="margin-top: 5px;margin-bottom: 5px;" v-model="questionType" @change="changeType()">
                    <el-option
                      :key="'全部'"
                      :label="'全部'"
                      :value="'全部'">
                    </el-option>
                    <el-option
                      v-for="item in questionTypes"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>


              <el-row class="row">
                <el-col :span="2" class="serachText">
                  <el-button type="text" class="serachTextButton">难易度</el-button>
                </el-col>
                <el-col :span="21" style="text-align: left">
                  <el-button-group style="margin-top: 5px;margin-bottom: 5px;">
                    <el-button  v-on:click="clickdifficulty('')"  v-bind:type="difficulty==''?'primary':'button'">全部</el-button>
                    <el-button  v-on:click="clickdifficulty('1')" v-bind:type="difficulty==1?'primary':'button'">易</el-button>
                    <el-button v-on:click="clickdifficulty('2')" v-bind:type="difficulty==2?'primary':'button'">中</el-button>
                    <el-button v-on:click="clickdifficulty('3')" v-bind:type="difficulty==3?'primary':'button'">难</el-button>
                  </el-button-group>
                </el-col>
              </el-row>


              <el-row class="row">
                <el-col :span="2" class="serachText">
                  <el-button type="text" class="serachTextButton">来源</el-button>
                </el-col>
                <el-col :span="21" style="text-align: left">
                  <el-button-group style="margin-top: 5px;margin-bottom: 5px;">
                    <el-button  v-on:click="clicksource('')"  v-bind:type="source==''?'primary':'button'">全部</el-button>
                    <el-button  v-on:click="clicksource('真题卷')"  v-bind:type="source=='真题卷'?'primary':'button'">真题卷</el-button>
                    <el-button  v-on:click="clicksource('模拟题')"  v-bind:type="source=='模拟题'?'primary':'button'">模拟题</el-button>
                    <el-button  v-on:click="clicksource('期中期末')"  v-bind:type="source=='期中期末'?'primary':'button'">期中期末</el-button>
                    <el-button v-on:click="clicksource ('单元卷')"  v-bind:type="source=='单元卷'?'primary':'button'">单元卷</el-button>
                  </el-button-group>
                </el-col>
              </el-row>


              <el-row class="row">
                <el-col :span="2" class="serachText">
                  <el-button type="text" class="serachTextButton">排序</el-button>
                </el-col>
                <el-col :span="21" style="text-align: left">
                  <el-button-group style="margin-top: 5px;margin-bottom: 5px;">
                    <el-button v-on:click="sort(1)">
                      <div v-if="index ==1 && timeSortType==1">
                        创建时间<i class="el-icon-caret-bottom el-icon--right"></i>
                      </div>
                      <div v-else-if="index ==1 && timeSortType==2">
                        创建时间<i class="el-icon-caret-top el-icon--right"></i>
                      </div>
                      <div v-else>
                        创建时间
                      </div>
                    </el-button>

                    <el-button v-on:click="sort(2)">
                      <div v-if="index ==2 && pageTimesSortType==1">
                        组卷次数<i class="el-icon-caret-bottom el-icon--right"></i>
                      </div>
                      <div v-else-if="index ==2 && pageTimesSortType==2">
                        组卷次数<i class="el-icon-caret-top el-icon--right"></i>
                      </div>
                      <div v-else>
                        组卷次数
                      </div>
                    </el-button>

                    <!--<el-button v-on:click="sort(3)">-->
                      <!--<div v-if="index ==3 && wrongTimesSortType==1">-->
                        <!--答错次数<i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>-->
                      <!--</div>-->
                      <!--<div v-else-if="index ==3 && wrongTimesSortType==2">-->
                        <!--答错次数<i class="el-icon-caret-top el-icon&#45;&#45;right"></i>-->
                      <!--</div>-->
                      <!--<div v-else>-->
                        <!--答错次数-->
                      <!--</div>-->
                    <!--</el-button>-->

                    <el-button v-on:click="sort(4)">
                      <div v-if="index ==4 && difficultySortType==1">
                        难度排序<i class="el-icon-caret-bottom el-icon--right"></i>
                      </div>
                      <div v-else-if="index ==4 && difficultySortType==2">
                        难度排序<i class="el-icon-caret-top el-icon--right"></i>
                      </div>
                      <div v-else>
                        难度排序
                      </div>
                    </el-button>

                  </el-button-group>

                </el-col>
              </el-row>
              </el-card>

              <!-- 筛选结果行-->
              <el-row style="margin-top: 10px;">
                  <subject-list v-bind:parentSubjects="subjectList" v-bind:parentChoseIds="selectSubjectIds"></subject-list>
              </el-row>


              <!-- 分页行-->
             <el-row>
                <pager v-bind:totalPage="pages"  v-on:gotoNext="nextPage"></pager>
              </el-row>



            </el-col>
          </el-row>
        </el-col>


        <!-- 右侧空白列-->
        <el-col :span="3"><div class="grid-content"></div></el-col>

      </el-row>


    </div>
</template>

<script>
  import { study_section, subject} from '@/common/js/knowledgeSubject'
  import Head from '@/components/head'
  import KnowledgeTree from '@/components/knowledge/knowledgeTree'
  import SubjectList from '@/components/subject/subjectList'
  import Pager from '@/components/pager'
  import questionService from '@/common/service/questionService'
  import commonService from '@/common/service/commonService'

    export default {
      name: "knowledge-subject",
      data(){
        return{
          studySections: study_section, //学段
          subjects: this._global.courses, //科目
          studySection:'',
          subject: '',
          orgId:'',
          questionTypes:'',  //题目类型
          questionType:'',
          difficulty:'',  //难易度
          knowledgeNames:'',  //知识点名称
          segmentCourseId:'',
          subjectList:{},
          currentPage:1,  //当前页
          pages:0,
          index:0, //排序
          paper:{},
          timeSortType:0,
          pageTimesSortType:0,
          wrongTimesSortType:0,
          difficultySortType:0,
          subjectContent:'',
          orderByObject:'',//待排序对象
          orderByType:0,//排序方式
          source:'',//题目来源,
          selectSubjectIds:[]

        }
      },
      components:{
        headcommon: Head,
        knowledgeTree: KnowledgeTree,
        subjectList: SubjectList,
        pager:Pager
      },
      methods:{
        //题目分页搜索
        search: function () {
          questionService.searchQuestionByPage(this.getParam(), this.currentPage, process.env.PageSize).then(res => {
            if (res == null) {
              this.subjectList = {};
              this.pages = 0;
            } else {
              this.subjectList = res
              this.pages = res.pages;
            }
          })
        },
        //点击难易度
        clickdifficulty:function(n){
          this.difficulty=n;
          this.search()
        },
        clicksource:function(n){
          this.source=n;
          this.search();
        },
        //搜索自动组装参数
        getParam:function () {
          var param = {};
          if(this.questionType.length>0&&this.questionType!='全部'){
            param['subjectTypeName'] = this.questionType;
          }
         if(this.subjectContent.length>0){
           param['subjectContent']=this.subjectContent;
         }
          if(this.difficulty.length>0){
            param['difficulty'] = this.difficulty-1;
          }

          if(this.knowledgeNames.length>0){
            param['knowledgeNames'] = this.knowledgeNames;
          }
          if(this.studySection.length>0){
            param["segmentId"]=this.studySection;
          }
          if(this.subject.length>0){
            param["courseId"]=this.subject;
          }
          if(this.orderByObject.length>0){
            param['orderByObject'] = this.orderByObject;
          }
          if(this.orderByType>0){
            param['orderByType'] = this.orderByType;
          }
          if(this.source.length>0){
            param['sourceFrom']=this.source;
          }
          if(this.orgId.length>0){
            param['orgId']=this.orgId;
          }
          return param;
        },
        nextPage:function (index) {
          this.currentPage = index;
          this.search();
        },
        childByValue: function (knowledgeName) {
          // knowledgeName就是子组件传过来的值
          this.knowledgeNames = knowledgeName
          this.search();
        },
        sort:function (index) {
          //sortType: 1,升序，2:降序
          this.index = index;
          if(this.timeSortType == 0){
            this.timeSortType =1;
          }else{
            this.timeSortType = this.timeSortType == 1? 2:1;
          }
          if(this.index==1){
            this.orderByObject='create_date';
            this.orderByType=this.timeSortType==2?2:1
            this.search()
          }
          if(this.pageTimesSortType == 0){
            this.pageTimesSortType =1;
          }else{
            this.pageTimesSortType = this.pageTimesSortType == 1? 2:1;
          }

          if(this.index==2){
            this.orderByObject='use_count';
            this.orderByType=this.pageTimesSortType==2?2:1
            this.search()
          }
          if(this.wrongTimesSortType == 0){
            this.wrongTimesSortType =1;
          }else{
            this.wrongTimesSortType = this.wrongTimesSortType == 1? 2:1;
          }
          // if(this.index==3){
          //   this.orderByObject='wrong_count';
          //   this.orderByType=this.wrongTimesSortType==2?2:1
          //   this.search();
          // }
          if(this.difficultySortType == 0){
            this.difficultySortType =1;
          }else{
            this.difficultySortType = this.difficultySortType == 1? 2:1;
          }
          if(this.index==4){
            this.orderByObject='difficulty'
            this.orderByType=this.difficultySortType==2?2:1
            this.search()
          }
        },
        change: function(){
          commonService.getStageSubjectIdByStageAndSubject(this.studySection,this.subject).then(res =>{
              if(res == null){
                alert('学段，学科不匹配');
              }else{
                this.segmentCourseId=res;
                questionService.getQuestionType(this.segmentCourseId).then(res =>{
                  this.questionTypes = res;
                })
              }
          });
          this.search()
        },
        changeType:function(){
          this.search()
        },
      },

      created:function () {
         this.paper = this._global.storage.getSession('srcPaper');

        if(this.paper){
          this.subject=this.paper.list[0].courseid;
          if(this.paper.list[0].orgId) {
            this.orgId = this.paper.list[0].orgId;
          }
          let paperSubjectNewUrl = this._global.requestUrl.getTestPaperQuestionsUrl + this.paper.list[0].id;
          //获取正在组卷试卷题目
          this.$ajax.get(paperSubjectNewUrl).then(res => {
            if (res.data.resultCode == '0000') {
              this.selectSubjectIds = res.data.data.subjects;
            }
          });
          commonService.getStageByGrade(this.paper.list[0].gradeid).then(res =>{
            this.studySection= res.segmentId;
            commonService.getStageSubjectIdByStageAndSubject(res.segmentId,this.paper.list[0].courseid).then(res => {
              this.segmentCourseId = res;
              questionService.getQuestionType(this.segmentCourseId).then(res =>{
                this.questionTypes = res;
              })
            })
          })

        }

        let courseurl = process.env.BASE_URL + "/api/common/findAllTopCourses";
        this.$ajax.get(courseurl).then(res => {
          if (res.data.resultCode == '0000') {
            this.subjects = res.data.data;
          }
        });
        let segmenturl = process.env.BASE_URL + "/api/common/findAllBaseSegments";
        this.$ajax.get(segmenturl).then(res => {
          if (res.data.resultCode == '0000') {
            this.studySections = res.data.data;
            this.search()
          }
        });


        //获取学科
        commonService.getTopSubject().then( res => {
          this.subjects = res;
        })
        //获取学段
        commonService.getStages().then(res => {
         this.studySections = res
        })


      }
    }
</script>

<style>
  #knowledge-search .el-input__inner {
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
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
</style>
<style scoped>
  @import "knowledgeSubject.css";
</style>
