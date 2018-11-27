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

                        <!--<paper-type-chart v-bind:chartData="pieData"></paper-type-chart>-->
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

              <el-row style="margin-top: 20px;" class="paperEdit">
                <el-card :body-style="{ padding: '0px' }">
                  <div slot="header" class="clearfix">
                    <span>试卷编辑</span>
                  </div>
                  <div v-on:click="gotoSelectSubject">
                    <el-row class="row">
                      <el-col :span="12" style="text-align: left; ">
                        <el-button type="text" style="margin-left: 10px;color: #505050" >题库选题</el-button>
                      </el-col>
                      <el-col :span="12" style="text-align: right">
                        <el-button type="text" style="margin-right: 10px; color: #505050">></el-button>
                      </el-col>
                    </el-row>
                  </div>

                  <div v-on:click="addSubject">
                  <el-row class="row">
                    <el-col :span="12" style="text-align: left; ">
                      <el-button type="text" style="margin-left: 10px;color: #505050"  >手工录题</el-button>
                    </el-col>
                    <el-col :span="12" style="text-align: right">
                      <el-button type="text" style="margin-right: 10px; color: #505050">></el-button>
                    </el-col>
                  </el-row>
                  </div>
                  <div v-on:click="batchAddSubject">
                  <el-row class="row">
                    <el-col :span="12" style="text-align: left; ">
                      <el-button type="text" style="margin-left: 10px;color: #505050"  >批量上传</el-button>
                    </el-col>
                    <el-col :span="12" style="text-align: right">
                      <el-button type="text" style="margin-right: 10px; color: #505050">></el-button>
                    </el-col>
                  </el-row>
                  </div>
                </el-card>

              </el-row>


            </el-col>

            <!--搜索条件栏-->
            <el-col :span="19">
              <el-card :body-style="{ padding: '0px' }">
                <el-row class="row" style="margin: 0px 10px">
                  <el-col :span="10" style="text-align: left">用户{{paper.list[0].creator}}创建的试卷</el-col>
                  <el-col :span="14" style="text-align: right">
                    <!--<el-button type="warning" plain>试卷预览</el-button>-->
                    <el-button type="primary" plain @click="save">试卷暂存</el-button>
                    <!--<el-button type="info" plain>下载试卷</el-button>-->
                    <!--<el-button type="info" plain>发布试卷</el-button>-->
                  </el-col>
                </el-row>

                <el-row class="row paperTitle margin-row">
                <span v-html="paper.list[0].name"></span>
                </el-row>

                <el-row class="row margin-row" style="background: #F3F7F8">
                  <span v-if="isLimit==true">答题时间：{{time}}</span><span v-if="isLimit==false">没有时间限制</span>
                </el-row>

                <el-row style="margin: 5px 10px;">
                  <div  v-bind:class="{wihteSubject:subjectList.length <1,hasSubject:subjectList.length>0}" >
                    <span style="color: red">您当前处于试卷编辑模式</span><br/>

                      您可以从 <a href="" style="color: #0a89cf">题库选题</a> 或者 <a href="javascript:void(0)"  v-on:click="addSubject" style="color: #0a89cf">手工录题</a>
                      还可以 <a href="javascript:void(0)" style="color: #0a89cf" v-on:click="batchAddSubject" >批量上传</a>
                      题目来组成您的试卷

                  </div>
                </el-row>

              <!-- 试卷题目信息展示 -->
                <el-row>
                  <div  v-for="(subject,index) in subjectList" :key="index" class="subject">
                      <el-row>
                        <el-row v-html="subject.content" class="subjectContent"></el-row>
                        <!-- 选择题选项-->
                        <div v-if="subject.commonSubjectTypeId == 1 || subject.commonSubjectTypeId===2">
                          <el-row v-for="option in subject.optionsContentList" v-html="option" class="subjectOption"></el-row>
                        </div>
                        <!-- 子母题-->
                        <div v-if="subject.childSubjectList.length > 0">
                          <el-table :data="subject.childSubjectList" border style="width: 95%; margin: 10px auto;">
                            <el-table-column  label="题目" width="350">
                              <template slot-scope="scope">
                               <div v-html="scope.row.content"></div>
                              </template>
                            </el-table-column>
                            <el-table-column label="答案">
                              <template slot-scope="scope">
                                <div v-html="scope.row.rightAnswer"></div>
                              </template>
                            </el-table-column>
                            <el-table-column label="解析">
                              <template slot-scope="scope">
                                <div v-html="scope.row.analysis"></div>
                              </template>
                            </el-table-column>
                            <el-table-column prop="knowledgeNames" label="知识点"></el-table-column>
                            <el-table-column  label="分数">
                              <template slot-scope="scope">
                                <el-input v-model="scope.row.score" @change = "scoreChange"></el-input>
                              </template>
                            </el-table-column>
                            <!--<el-table-column  label="排序">-->
                              <!--<template slot-scope="scope">-->
                                <!--<el-input v-model="scope.row.orderNo"></el-input>-->
                              <!--</template>-->
                            <!--</el-table-column>-->
                          </el-table>
                        </div>
                      </el-row>

                      <el-row class="subjectInfo">
                        <el-col :span="2">
                          <el-button type="text" v-if="isShow==true">答题时间</el-button>
                        </el-col>
                        <el-col :span="2">
                          <el-input v-model="subject.timeLimit" @change = "timeChange" v-if="isShow==true"></el-input>
                        </el-col>
                        <el-col :span="1">
                          <el-button type="text" v-if="isShow==true">秒</el-button>
                        </el-col>
                        <el-col :span="2" offset=1>
                          <el-button type="text">此题分数</el-button>
                        </el-col>
                        <el-col :span="2">
                          <el-input v-model="subject.score" @change="scoreChange"></el-input>
                        </el-col>
                        <el-col :span="1">
                          <el-button type="text" >分</el-button>
                        </el-col>
                        <el-col :span="2" offset=5>
                          <el-button type="text"  @click="see(subject)" >查看解析</el-button>
                        </el-col>
                        <el-col :span="2">
                          <el-button type="text" v-on:click="subjectMove('up',index)">上移</el-button>
                        </el-col>
                        <el-col :span="2" >
                          <el-button type="text" v-on:click="subjectMove('down',index)">下移</el-button>
                        </el-col>
                        <el-col :span="2" >
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
      <!-- 手工录题对话框-->
      <el-dialog
        @close="dialogCls"
        id="addSubject"
        fullscreen="true"
        title="手工录题"
        :visible.sync="dialogVisible"
        width="92%"  :close-on-click-modal="false"
        >
        <div style="height: 100%"><iframe v-bind:src="addSubjectUrl" style="width: 100%; height: 100%;" frameborder="0"></iframe></div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"  type="info" plain >关闭</el-button>
      </span>
      </el-dialog>
      <el-dialog
        @close="dialogBatch"
        id="batchAddSubject"
        fullscreen="true"
        title="批量导入"
        :visible.sync="batchDialogVisible"
        width="92%"
        :close-on-click-modal="false"
      >
        <div style="height: 100%"><iframe v-bind:src="batchAddSubjectUrl" style="width: 100%; height: 100%;" frameborder="0"></iframe></div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="batchDialogVisible = false" type="info" plain >关闭</el-button>
      </span>
      </el-dialog>
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
          perScore:'',
          msgDialogValue:'',  //消息框消息
          msgVisible:false,   //消息框可见性控制
          addSubjectUrl:'',   //手工录题url
          dialogVisible: false,   //手工录题弹窗可见性控制
          batchAddSubjectUrl:'',   //批量导入url
          batchDialogVisible: false,   //批量导入弹窗可见性控制,
          time:'',
          srcDiv: 0,
          subjectList: subjectList,
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
          isShow:true,
          isLimit:true
        }
      },
        name: "paper-edit",
        components:{
          headcommon: Head,
          paperTypeChart:PaperTypeChart,
          subjectDiglog: AnalysisDialog,
          messageDialog: MessageDialog
        },
        methods:{

          //关闭手工录题执行回调
          dialogCls:function () {
            location.reload();
          },
          dialogBatch:function(){
            location.reload();
          },
          childByValue: function (visable) {
            // knowledgeName就是子组件传过来的值
            this.msgVisible = visable;

          },
          childBysubjectValue:function(subjectvisable){
            this.newDialogVisible=subjectvisable;
          },

          //删除题目
          deleteSubject: function(subject){
            if(this.paper) {
              testPaperService.deleteSubjectFromTestPaper(this.paper.list[0].id, subject.id).then(res => {
                this._global.paperUtil.flushSrcPaperSubjectSum(subject, 'del');
                testPaperService.getTestPaperQuestions(this.paperId).then(res => {
                  this.time = this.formatSeconds(res.paperTime);
                  //将试卷题目赋值给本地变量
                  this.subjectList = res.subjects;
                  this.subjectType=[];
                  //计算试卷中题目类型，以及每种类型题目数量
                  for (var i = 0; i < this.subjectList.length; i++) {
                    var type = this.subjectList[i].commonSubjectTypeId;

                    if (this.subjectType.hasOwnProperty(type)) {
                      Vue.set(this.subjectType, type, this.subjectType[type] + 1);
                    } else {
                      Vue.set(this.subjectType, type, 1);
                    }
                  }
                  this.pieData.showData=[];
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

          see:function(subject){
            this.subject=subject;
            this.newDialogVisible=true;
            this.rand=Math.random();
          },

          //手工录题
          addSubject: function () {
            var srcPaper = this._global.storage.getSession('srcPaper').list[0];
            if (!srcPaper) {
              alert('请先创建试卷再进行手工录题');
              return;
            }
            //根据试卷年级id获取学段id
            commonService.getStageByGrade(srcPaper.gradeid).then(res => {
              srcPaper['segmentid'] = res.segmentId;
              var url = this._global.requestUrl.manualAddQuestionUrl + srcPaper.segmentid + '/' + srcPaper.courseid + '/' + srcPaper.id + '/1';
              this.addSubjectUrl = url;
            })
            /* this.$ajax.get(process.env.Paper_Service_URL+'/api/common/findSegmentByGradeId?gradeId='+srcPaper.gradeid).then( res => {
               if(res.data.resultCode == '0000'){
                 srcPaper['segmentid'] = res.data.data.segmentId;
                 var url =process.env.Exam_Web_URL+ 'import/single-import-paper/'+srcPaper.segmentid+'/'+srcPaper.courseid+'/'+srcPaper.id+'/1';
                 this.addSubjectUrl = url;
               }
             })*/

            this.dialogVisible = true;
            //window.location.href = url;
          },
          //批量导入
          batchAddSubject :function () {
            var srcPaper = this._global.storage.getSession('srcPaper').list[0];
            if (!srcPaper) {
              alert('请先创建试卷再进行批量导入');
              return;
            }
            //根据试卷年级id获取学段id
            commonService.getStageByGrade(srcPaper.gradeid).then(res => {
              srcPaper['segmentid'] = res.segmentId;
              var url = this._global.requestUrl.batchAddQuestionUrl + srcPaper.segmentid + '/' + srcPaper.courseid + '/' + srcPaper.id + '/1';
              this.batchAddSubjectUrl = url;
            })
            /* this.$ajax.get(process.env.Paper_Service_URL+'/api/common/findSegmentByGradeId?gradeId='+srcPaper.gradeid).then( res => {
               if(res.data.resultCode == '0000'){
                 srcPaper['segmentid'] = res.data.data.segmentId;
                 var url =process.env.Exam_Web_URL+ 'import/single-import-paper/'+srcPaper.segmentid+'/'+srcPaper.courseid+'/'+srcPaper.id+'/1';
                 this.addSubjectUrl = url;
               }
             })*/

            this.batchDialogVisible = true;
            //window.location.href = url;
          },
          //试卷保存
          save: function () {
            testPaperService.saveTestPaper(this.subjectList).then(res => {

        if(res!=null) {
      this.msgDialogValue = '保存成功';
      this.msgVisible = true;
     }
              if(res==null){
                this.msgDialogValue = "分数不能为空";
                this.msgVisible = true;
              }
            })
          },

          //点击题库选题
          gotoSelectSubject:function () {
            this.msgVisible = false;
            this.$router.push({
              name: 'home',
              params:{
                'paper':this.paper
              }
            })
          },
          //上移、下移题目
          subjectMove:function (type, index) {
            var temp = this.subjectList[index]
            if(type=='up'){
              if(index-1>=0){
                temp.orderNo=index;
                this.subjectList[index-1].orderNo = index+1;
                Vue.set(this.subjectList,index,this.subjectList[index-1]);
                Vue.set(this.subjectList,index-1,temp);
              }else{
                alert('已经是最前面了，无法上移');
              }

            }

            if(type=='down'){
              if(index+1<this.subjectList.length){
                temp.orderNo=index+2;
                this.subjectList[index+1].orderNo = index+1;
                Vue.set(this.subjectList,index,this.subjectList[index+1]);
                Vue.set(this.subjectList,index+1,temp);
              }else{
                alert('已经是最后面了，无法下移');
              }

            }
          },

          //试卷时间
          timeChange:function(){
            var totaltime=0;
            for(var i=0; i<this.subjectList.length;i++){
              if(this.subjectList[i].timeLimit) {
                totaltime += parseInt(this.subjectList[i].timeLimit);
              }
            }
            this.time=this.formatSeconds(totaltime);
          },
          //修改题目分数
          scoreChange: function () {
            var sum=0;
            for(var i=0; i<this.subjectList.length;i++){
                if(this.subjectList[i].childSubjectList.length >0 ){
                    var csum=0;
                    for(var j=0; j<this.subjectList[i].childSubjectList.length; j++){
                      if(this.subjectList[i].childSubjectList[j].score>0) {
                        csum += parseFloat(this.subjectList[i].childSubjectList[j].score);
                      }
                    }
                    Vue.set(this.subjectList[i],'score',csum);
                    sum += csum;
                }else{
                  if(this.subjectList[i].score>0) {
                    sum += parseFloat(this.subjectList[i].score);
                  }
                }
            }
            this.paperTotalScore = sum;
            this.perScore='';
          },

          //格式化时间
          formatSeconds: function(value) {
            if (value > 0) {
              var result='';
              var secondTime = parseInt(value);// 秒
              var minuteTime = 0;// 分
              var hourTime = 0;// 小时
              if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
                //获取分钟，除以60取整数，得到整数分钟
                minuteTime = parseInt(secondTime / 60);
                //获取秒数，秒数取佘，得到整数秒数
                secondTime = parseInt(secondTime % 60);
                //如果分钟大于60，将分钟转换成小时
                if (minuteTime > 60) {
                  //获取小时，获取分钟除以60，得到整数小时
                  hourTime = parseInt(minuteTime / 60);
                  //获取小时后取佘的分，获取分钟除以60取佘的分
                  minuteTime = parseInt(minuteTime % 60);
                }
              }
              if (hourTime > 0) {
                result = "" + parseInt(hourTime) + "小时";
              }
              if (minuteTime > 0) {
                result = result+"" + parseInt(minuteTime) + "分";
              }
               result = result + parseInt(secondTime) + "秒";
              return result;
            }
            else{
              return "0秒"
            }
          }
        },

        mounted(){

          const oScript = document.createElement('script');
          oScript.type = 'text/javascript';
          oScript.src = '@/common/js/growingIo.js';
          document.body.appendChild(oScript);

          this.paperId=this.$route.query.paperId;
          if(!this.paperId){

            this.paper = this._global.storage.getSession('srcPaper')
            if(!this.paper){
              alert('请先选择试卷');
              this.$router.back(-1);
              //return;
            }
            this.paperId = this.paper.list[0].id;
            this.isShow=this.paper.list[0].issubjecttime==1?true:false;
            if(this.paper.list[0].issubjecttime==0&&this.paper.list[0].papertime==0){
              this.isLimit=false;
            }
          }

          testPaperService.searchTestPaperByPage({"id":this.paperId},1,10).then(res => {
            this.paper = res;
            this.isShow=this.paper.list[0].issubjecttime==1?true:false;
            if(this.paper.list[0].issubjecttime==0&&this.paper.list[0].papertime==0){
              this.isLimit=false;
            }
            //将要编辑的试卷信息保存的本地sessionStorage
            this._global.storage.setSession('srcPaper',this.paper,0);
          })


          //获取试卷题目
          testPaperService.getTestPaperQuestions(this.paperId).then(res =>{
            this.time=this.formatSeconds(res.paperTime);
            //将试卷题目赋值给本地变量
            this.subjectList = res.subjects;


            var subjectSum = 0;
            //计算试卷中题目类型，以及每种类型题目数量
            for(var i=0; i<this.subjectList.length; i++){
              var type = this.subjectList[i].commonSubjectTypeId;

              if(this.subjectType.hasOwnProperty(type)){
                Vue.set(this.subjectType,type,this.subjectType[type]+1);
              }else{
                Vue.set(this.subjectType,type,1);
              }

              //计算试卷题目数
              if(this.subjectList[i].childSubjectList.length >0 ){
                subjectSum += this.subjectList[i].childSubjectList.length;
              }else{
                subjectSum += 1;
              }
            }

            //保存题目数
            this._global.storage.setSession('srcPaperSubjectSum',subjectSum,0);


            //拼装化拼图需要的数据
            for(var key in this.subjectType){
              this.pieData.data.push(this._global.subjectTypeName[key]);
              var obj = {};
              obj['name'] = this._global.subjectTypeName[key];
              obj['value'] = this.subjectType[key];
              this.pieData.showData.push(obj);
            }

            this.scoreChange();
          })

          //this.drawLine(this.pieData);

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
