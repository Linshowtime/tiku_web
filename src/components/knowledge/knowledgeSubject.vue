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
                  <el-select  placeholder="学科" style="margin:0px 3px;" v-model="queryModel.courseId" @change="change()">
                      <el-option
                        v-for="item in courses"
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
                <knowledge-tree style="margin-top: 5px;" v-bind:orgId="this.queryModel.orgId" v-bind:subject="this.queryModel.courseId" v-bind:studySection="this.studySection" v-on:knowledgeId="childByValue"></knowledge-tree>
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
                    <el-input placeholder="请输入题目关键字" v-model="queryModel.content">
                    </el-input>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-button @click="search()">搜索</el-button>
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :span="2" class="serachText">
                  <el-button type="text" class="serachTextButton">题型</el-button>
                </el-col>
                <el-col :span="8" style="text-align: left">
                  <el-select  filterable placeholder="请选择" style="margin-top: 5px;margin-bottom: 5px;" v-model="queryModel.subjectTypeId" @change="changeType()">
                    <el-option
                      :key="'全部'"
                      :label="'全部'"
                      :value="''">
                    </el-option>
                    <el-option
                      v-for="item in questionTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
                <el-row class="row">
                  <el-col :span="2" class="serachText">
                    <el-button type="text" class="serachTextButton">机构</el-button>
                  </el-col>
                  <el-col :span="8" style="text-align: left">
                    <el-select  filterable placeholder="请选择" style="margin-top: 5px;margin-bottom: 5px;" v-model="queryModel.orgId" @change="changeType()">
                      <el-option
                        :key="'全部'"
                        :label="'全部'"
                        :value="''">
                      </el-option>
                      <el-option
                        v-for="item in orgs"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
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
                    <el-button  v-on:click="clickdifficulty('')"  v-bind:type="queryModel.difficulty==''?'primary':'button'">全部</el-button>
                    <el-button  v-on:click="clickdifficulty('1')" v-bind:type="queryModel.difficulty==1?'primary':'button'">易</el-button>
                    <el-button v-on:click="clickdifficulty('2')" v-bind:type="queryModel.difficulty==2?'primary':'button'">中</el-button>
                    <el-button v-on:click="clickdifficulty('3')" v-bind:type="queryModel.difficulty==3?'primary':'button'">难</el-button>
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
  import testPaperService from '@/common/service/testPaperService'
    export default {
      name: "knowledge-subject",
      data(){
        return{
          studySection:'',
          orgs:[],
          paperId:'',
          questionTypes:[
            {
              id:1,
              name:"填空题"
            },
            {
              id:2,
              name:"选择题"
            },
            {
              id:3,
              name:"判断题"
            }
          ],
          queryModel:{
            subjectTypeId:'',
            courseId:'',
            content:'',
            knowledgeId:'',
            difficulty:'',
            publish:1,
            orgId:''
          },
          segmentCourseId:'',
          subjectList:{},
          currentPage:1,  //当前页
          pages:0,
          paper:{},
          editPaper:{},
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
          questionService.searchQuestionByPage(this.queryModel, this.currentPage, process.env.PageSize).then(res => {

              this.subjectList = res.data.data;
              this.pages = res.data.data.page_total;
              this.queryModel.knowledgeId=''

          })
        },
        //点击难易度
        clickdifficulty:function(n){
          this.queryModel.difficulty=n;
          this.search()
        },
        nextPage:function (index) {
          this.currentPage = index;
          this.search();
        },
        childByValue: function (knowledgeId) {
          this.queryModel.knowledgeId = knowledgeId;

          this.search();
        },
        change: function(){
          this.search()
        },
        changeType:function(){
          this.search()
        },
      },

      created:function () {
        commonService.Connect().then(res=>{

        });
        this.paperId = this.$route.query.paperId;
        if(this.paperId!=null){
          var param={}
          param["id"]=this.paperId;
          testPaperService.searchTestPaperByPage(param,1,5).then(res=>{
            this.editPaper = res.data.data;
            this._global.storage.setSession('srcPaper',this.editPaper)
          })
        }
        else {
          if(this._global.storage.getSession('srcPaper')!=null) {
            this.editPaper = this._global.storage.getSession('srcPaper');
          }
          else{
            alert("请先选择试卷，再进行组卷!");
            this.$router.push('paperManage');
          }
        }
        if(this.editPaper!=null){
          testPaperService.getTestPaperQuestions(this.editPaper.list[0].id).then(res=>{
            this.selectSubjectIds=res.data.data;
            this._global.storage.setSession('srcPaperSubjectSum',res.data.data.length)
            this.$refs.entryPaperEdit.flushSubject();
          })

        }
        //获取学科
        commonService.getTopSubject().then(res=>{
          console.info(JSON.stringify(res.data))
          this.courses=res.data.data;
        });
        //获取学段
        commonService.getStages().then(res=>{
          this.studySections=res.data.data;;
        });
        commonService.getOrgs().then(res=>{
          this.orgs=res.data.data;
        });
        this.search()

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
