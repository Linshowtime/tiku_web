<template>
    <div>
      <headcommon></headcommon>
      <el-row :gutter="20">
        <el-col :span="18" offset=3>
          <el-row :gutter="10">
            <!--左侧栏-->
            <el-col :span="5">
              <el-row class="paperEdit">
                <el-card  :body-style="{ padding: '0px' }">
                  <div slot="header" class="clearfix">
                    <span>试卷分析</span>
                  </div>
                  <div id="paperEdit">
                    <div v-if="pieData.showData.length>0">
                      <el-row v-for="obj in pieData.showData" class="row">

                        <el-col :span="14">{{obj.name}}:</el-col>
                        <el-col :span="10" style="text-align: left">
                          {{obj.value}}
                        </el-col>

                        <paper-type-chart v-bind:chartData="pieData"></paper-type-chart>
                      </el-row>
                    </div>
                    <div v-else><el-row class="row">目前试卷为空</el-row></div>
                    <el-row class="row">
                      <el-col :span="14">试卷总分值:</el-col>
                      <el-col :span="10" style="text-align: left">
                        <el-input v-model="paperTotalScore" readonly="readonly"></el-input>
                      </el-col>
                    </el-row>
                    <el-row class="row">
                      <el-col :span="14">每题分值:</el-col>
                      <el-col :span="10" style="text-align: left">
                        <el-input v-model="perScore" v-on:change="perScorechange"></el-input>
                      </el-col>
                    </el-row>

                  </div>
                </el-card>
              </el-row>

            </el-col>

            <el-col :span="19">
              <el-card :body-style="{ padding: '0px' }">
                <el-row class="row" style="margin: 0px 10px">
                  <el-col :span="24" style="text-align: right">
                    <!--<el-button type="warning" plain>试卷预览</el-button>-->
                    <el-button type="primary" plain @click="save">试卷暂存</el-button>
                    <!--<el-button type="info" plain>下载试卷</el-button>-->
                    <!--<el-button type="info" plain>发布试卷</el-button>-->
                  </el-col>
                </el-row>

                <el-row class="row paperTitle margin-row">
                <span v-html="paper.list[0].name"></span>
                </el-row>
              <!-- 试卷题目信息展示 -->
                <el-row>
                  <div  v-for="(subject,index) in subjectList" :key="index" class="subject">
                      <el-row>
                        <el-row v-html="subject.content" class="subjectContent"></el-row>
                        <!-- 选择题选项-->
                        <div v-if="subject.subjectTypeId == 2">
                          <el-row v-for="option in subject.optionList" v-html="option" class="subjectOption"></el-row>
                        </div>
                      </el-row>

                      <el-row class="subjectInfo">
                        <el-col :span="2" >
                          <el-button type="text">此题分数</el-button>
                        </el-col>
                        <el-col :span="2">
                          <el-input v-model="subject.score" @change="scoreChange"></el-input>
                        </el-col>
                        <el-col :span="1" >
                          <el-button type="text" >分</el-button>
                        </el-col>
                        <el-col :span="2" offset=10>
                          <el-button type="text"  @click="see(subject)" >查看解析</el-button>
                        </el-col>
                        <el-col :span="1" offset=1>
                          <el-button type="text" v-on:click="subjectMove('up',index)">上移</el-button>
                        </el-col>
                        <el-col :span="1" offset=1>
                          <el-button type="text" v-on:click="subjectMove('down',index)">下移</el-button>
                        </el-col>
                        <el-col :span="1" offset=1 >
                          <el-button type="text" @click="deleteSubject(subject)">删除</el-button>
                        </el-col>
                      </el-row>
                  </div>


                </el-row>

              <!-- 试卷题目信息展示结束 -->
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <!-- 右侧空白列-->
        <el-col :span="3"><div class="grid-content"></div></el-col>
      </el-row>
      <!--查看解析弹框-->
      <subject-diglog v-bind:parentsubject="subject" v-bind:newDialogVisible="newDialogVisible" v-bind:rand="rand"  v-on:subjectvisable="childBysubjectValue" ></subject-diglog>
      <message-dialog v-bind:message="msgDialogValue" v-bind:messageVisible="msgVisible" v-on:visable="childByValue"></message-dialog>

    </div>



</template>

<script>
  import Vue from 'vue'
  import Head from '@/components/head'
  import PaperTypeChart from '@/components/charts/PieChart'
  import {subjectList} from '@/common/js/paperEdit'
  import AnalysisDialog from '@/components/paper/AnalysisDialog'
  import MessageDialog from '@/components/util/MessageDialog'
  import testPaperService from '@/common/service/testPaperService'
  import commonService from '@/common/service/commonService'

    export default {
      data(){
        return{
          msgDialogValue:'',  //消息框消息
          msgVisible:false,   //消息框可见性控制
          srcDiv: 0,
          subjectList: [],
          subject:{},
          newDialogVisible:false,   //查看解析弹窗可见性控制
          rand:'',
          paperId: '',
          paper:{},
          subjectType:{},
          pieData:{     //试卷饼图数据
            data:[],
            showData:[]
          },
          paperTotalScore:0 ,   //试卷总分
          perScore:0
        }
      },
        name: "paper-edit",
        components:{
          headcommon: Head,
          paperTypeChart:PaperTypeChart,
          subjectDiglog: AnalysisDialog,
          messageDialog: MessageDialog
        },
        methods: {

          //关闭手工录题执行回调
          dialogCls: function () {
            location.reload();
          },
          childByValue: function (visable) {
            // knowledgeName就是子组件传过来的值
            this.msgVisible = visable;

          },
          childBysubjectValue: function (subjectvisable) {
            this.newDialogVisible = subjectvisable;
          },

          //删除题目
          deleteSubject: function (subject) {
            var param = {};
            if(this.paper) {
              param['examPaperId']= this.paper.list[0].id;
            }
            param["subjectId"]=subject.id;
            if (this.paper) {
              testPaperService.deleteSubjectFromTestPaper(param).then(res => {
                this._global.paperUtil.flushSrcPaperSubjectSum(subject, 'del');
                testPaperService.getTestPaperQuestions(this.paperId).then(res => {
                  //将试卷题目赋值给本地变量
                  this.subjectList = res.data.data;
                  this.subjectType = [];
                  //计算试卷中题目类型，以及每种类型题目数量
                  for (var i = 0; i < this.subjectList.length; i++) {
                    var type = this.subjectList[i].subjectTypeId;
                    this.subjectList[i].examPaperId=this.paperId;
                    this.subjectList[i].subjectId= this.subjectList[i].id;
                    if (this.subjectType.hasOwnProperty(type)) {
                      Vue.set(this.subjectType, type, this.subjectType[type] + 1);
                    } else {
                      Vue.set(this.subjectType, type, 1);
                    }
                  }
                  this.pieData.showData = [];
                  //拼装化拼图需要的数据
                  for (var key in this.subjectType) {

                    this.pieData.data.push(this._global.subjectTypeName[key]);
                    var obj = {};
                    obj['name'] = this._global.subjectTypeName[key];
                    obj['value'] = this.subjectType[key];
                    this.pieData.showData.push(obj);
                  }

                  this.scoreChange();
                  this.newDialogVisible = false;
                  this.msgVisible = false;
                })

              })
            }
          },
          //修改每题分数
          perScorechange: function () {
            var i;
            for (i = 0; i < this.subjectList.length; i++) {
              this.subjectList[i].score = this.perScore;
              Vue.set(this.subjectList, i, this.subjectList[i]);
            }

            this.paperTotalScore = i * this.perScore;
          },
          //查看解析

          see: function (subject) {
            this.subject = subject;
            this.newDialogVisible = true;
            this.rand = Math.random();
          },

          //试卷保存
          save: function () {
            testPaperService.saveTestPaper(this.subjectList).then(res => {

              if (res != null) {
                this.msgDialogValue = '保存成功';
                this.msgVisible = true;
              }
              if (res == null) {
                this.msgDialogValue = "分数不能为空";
                this.msgVisible = true;
              }
              sessionStorage.removeItem('srcPaper')
              this.$router.push('/paperManage')
            })
          },
          //上移、下移题目
          subjectMove: function (type, index) {
            var temp = this.subjectList[index]
            if (type == 'up') {
              if (index - 1 >= 0) {
                temp.orderNo = index;
                this.subjectList[index - 1].orderNo = index + 1;
                Vue.set(this.subjectList, index, this.subjectList[index - 1]);
                Vue.set(this.subjectList, index - 1, temp);
              } else {
                alert('已经是最前面了，无法上移');
              }

            }

            if (type == 'down') {
              if (index + 1 < this.subjectList.length) {
                temp.orderNo = index + 2;
                this.subjectList[index + 1].orderNo = index + 1;
                Vue.set(this.subjectList, index, this.subjectList[index + 1]);
                Vue.set(this.subjectList, index + 1, temp);
              } else {
                alert('已经是最后面了，无法下移');
              }

            }
          },
          //修改题目分数
          scoreChange: function () {
            var sum = 0;
            for (var i = 0; i < this.subjectList.length; i++) {
                if (this.subjectList[i].score > 0) {
                  sum += parseFloat(this.subjectList[i].score);
              }
            }
            this.paperTotalScore = sum;
            this.perScore = '';
          }
          },
          mounted () {
            commonService.Connect().then(res => {

            });
            this.paper = this._global.storage.getSession('srcPaper')
            if (!this.paper) {
              alert('请先选择试卷');
              this.$router.back(-1);
              //return;
            }
            this.paperId = this.paper.list[0].id;
            //获取试卷题目
            testPaperService.getTestPaperQuestions(this.paperId).then(res => {

              this.subjectList = res.data.data;
              ;

              //计算试卷中题目类型，以及每种类型题目数量
              for (var i = 0; i < this.subjectList.length; i++) {
                var type = this.subjectList[i].subjectTypeId;
                this.subjectList[i].examPaperId=this.paperId;
                this.subjectList[i].subjectId= this.subjectList[i].id;
                if (this.subjectType.hasOwnProperty(type)) {
                  Vue.set(this.subjectType, type, this.subjectType[type] + 1);
                } else {
                  Vue.set(this.subjectType, type, 1);
                }
              }
              //保存题目数
              this._global.storage.setSession('srcPaperSubjectSum', this.subjectList.length, 0);
              //拼装化拼图需要的数据
              for (var key in this.subjectType) {
                this.pieData.data.push(this._global.subjectTypeName[key]);
                var obj = {};
                obj['name'] = this._global.subjectTypeName[key];
                obj['value'] = this.subjectType[key];
                this.pieData.showData.push(obj);
              }
              this.$refs.child.drawPie();
              this.scoreChange();
            })



        }
  }
</script>
<style >
  .el-card__header{
    padding: 0px 0px;
    min-height: 53px;
    background: #F3F7F8;
    line-height: 53px;
  }
  #paperEdit .el-input__inner{
    -webkit-appearance: none;
    background-color: #F3F7F8;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 31px;
    line-height: 31px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 60%;
  }

  #addSubject .el-dialog__header {
    padding: 20px 20px 10px;
    height: 5%;
  }

  #addSubject .el-dialog__body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    height: 80%;
  }

  #addSubject .el-dialog__footer {
    padding: 10px 20px 20px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 5%;
  }

  #batchAddSubject .el-dialog__header {
    padding: 20px 20px 10px;
    height: 5%;
  }

  #batchAddSubject .el-dialog__body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    height: 80%;
  }

  #batchAddSubject .el-dialog__footer {
    padding: 10px 20px 20px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 5%;
  }
</style>
<style scoped>
  @import "paperEdit.css";
</style>
