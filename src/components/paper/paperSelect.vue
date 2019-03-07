<template>
 <div>
   <headcommon></headcommon>
   <el-row :gutter="20">
     <el-col :span="18" offset=3>
       <el-row :gutter="10">
         <!--左侧栏-->
         <el-col :span="5">
           <el-row>
             <el-card  :body-style="{ padding: '0px' }">
               <div slot="header" class="card-header">
                 <span>试卷分析</span>
               </div>
               <div>
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
                   <el-col :span="9" offset="3">试卷总分:</el-col>
                   <el-col :span="9">
                     <el-button disabled >{{ paperTotalScore}}</el-button>
                   </el-col>
                 </el-row>
               </div>
             </el-card>
           </el-row>
         </el-col>
         <!--搜索条件栏-->
         <el-col :span="19">
           <el-card  :body-style="{ padding: '0px' }">
           <el-row style="margin: 5px 10px">
             <el-col :span="12" style="text-align: left">
              <el-button style="border: 2px solid #4cafe3; background: #edf5ff; border-radius: 5px;" type="text" v-on:click="returnChose()" round>
                <i class="el-icon-back "></i>返回选题
              </el-button>
             </el-col>
           </el-row>
           <el-row class="row paperTitle margin-row">
             <span v-html="paper.list[0].name"></span>
           </el-row>
           <!-- 试卷题目信息展示 -->
           <el-row>
             <div  v-for="(subject,index) in subjectList" :key="index" class="subject">
               <el-row >
                 <el-row class="subjectContent">{{subject.content}}</el-row>
                 <!-- 选择题选项-->
                 <div v-if="subject.subjectTypeId == 2">
                   <el-row v-for="option in subject.optionList" v-html="option" class="subjectOption"></el-row>
                 </div>
               </el-row>
               <el-row class="subjectInfo">
                 <el-col :span="2" offset=17>
                   <el-button type="text"  @click="see(subject)">查看解析</el-button>
                 </el-col>
                 <el-col :span="2" offset=1 v-if="mode==1">
                   <div v-if="selectSubjectIds.indexOf(subject) ===-1">
                     <el-button type="text" v-on:click="selectSubject(subject,'select')" >确认选择</el-button>
                   </div>
                   <div v-else><el-button type="text" v-on:click="selectSubject(subject,'cancel')" style="color:red"> 取消选择</el-button></div>
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
   <subject-diglog v-bind:parentsubject="subject" v-bind:newDialogVisible="newDialogVisible" v-bind:rand="rand"  ></subject-diglog>
   <entry-paper-edit ref="entryPaperEdit"  v-if="mode==1"></entry-paper-edit>


   <message-dialog v-bind:message="msgDialogValue" v-bind:messageVisible="msgVisible" v-on:visable="childByValue"></message-dialog>
 </div>
</template>
<script>
  import Vue from 'vue'
  import Head from '@/components/head'
  import EntryPaperEdit from '@/components/entryPaperEdit'
  import AnalysisDialog from '@/components/paper/AnalysisDialog'
  import PaperTypeChart from '@/components/charts/PieChart'
  import MessageDialog from '@/components/util/MessageDialog'
  import testPaperService from '@/common/service/testPaperService'
    export default {
      data(){
        return{
          msgDialogValue:'',  //消息框消息
          msgVisible:false,   //消息框可见性控制
          selectSubjectIds:[],
          subject:{},
          newDialogVisible:false,
          rand:'',
          choseAll:1,
          time:'',
          subjectList:{},
          paperId: '',
          num:7,
          radio:0.7,
          mode:'',
          paper:{},
          srcPaper:{},
          subjectType:{},
          pieData:{
            data:[],
            showData:[]
          },
          paperTotalScore:0,
          isLimit:true,
          isAllShow:true
        }
      },
      name: "paperSelect",
      components:{
        headcommon: Head,
        entryPaperEdit:EntryPaperEdit,
        paperTypeChart:PaperTypeChart,
        subjectDiglog: AnalysisDialog,
        messageDialog: MessageDialog
      },
      methods:{
        childByValue: function (visable) {
          // knowledgeName就是子组件传过来的值
          this.msgVisible = visable

        },
        see:function(subject){
          this.subject=subject;
          this.newDialogVisible=true;
          this.rand=Math.random();
        },
        returnChose:function(){
          this.$router.push({name: 'home'})
        },
        selectSubject:function (subject, type) {
          if(type === 'select'){
            if(this.selectSubjectIds.indexOf(subject) === -1){
              this.selectSubjectIds.push(subject);
              var param = {};
              if(this.srcPaper) {
                param['examPaperId']= this.srcPaper.list[0].id;
              }
              param["subjectId"]=subject.id;
              testPaperService.addSubjectToTestPaper(param).then(res=>{
                if(res.data.code==0) {
                  this._global.paperUtil.flushSrcPaperSubjectSum(subject, 'add');
                  this.$refs.entryPaperEdit.flushSubject();
                }else{
                  alert(res.data.msg)
                }
              })
            }
          }else{
            this.selectSubjectIds.splice(this.selectSubjectIds.indexOf(subject), 1);
            var param = {};
            if(this.srcPaper) {
              param['examPaperId']= this.srcPaper.list[0].id;
            }
            param["subjectId"]=subject.id;
            testPaperService.deleteSubjectFromTestPaper(param).then(res=>{
              alert("取消成功");
              //更新试卷题目数
              this._global.paperUtil.flushSrcPaperSubjectSum(subject,'del');
              this.$refs.entryPaperEdit.flushSubject();
            })
            }
          this.newDialogVisible=false;
        },
      scoreChange: function () {
        var sum=0;
        for(var i=0; i<this.subjectList.length;i++){
            if(this.subjectList[i].score>0) {
              sum += parseInt(this.subjectList[i].score);
            }
          }

        this.paperTotalScore = sum;
      }
      },
      mounted(){
        this.paperId=this.$route.query.paperId;
        this.mode = this.$route.query.mode;
        this.srcPaper=this._global.storage.getSession('srcPaper');
        if(!this.paperId){
            alert('请确定选择试卷');
            return;
        }
        var param={}
        param["id"]=this.paperId;

        testPaperService.searchTestPaperByPage(param,1,5).then(res=>{
          this.paper =res.data.data;
        })
        if(!this.srcPaper){
          alert('请确定选择试卷');
          return;
        }
        testPaperService.getTestPaperQuestions(this.srcPaper.list[0].id).then(res=>{
          this.selectSubjectIds=res.data.data;
        })
        //获取试卷题目
        testPaperService.getTestPaperQuestions(this.paperId).then(res=>{
          this.subjectList = res.data.data;
          //计算试卷中题目类型，以及每种类型题目数量
          for(var i=0; i<this.subjectList.length; i++){
            var type = this.subjectList[i].subjectTypeId;
            if(this.subjectType.hasOwnProperty(type)){
              Vue.set(this.subjectType,type,this.subjectType[type]+1)
            }else{
              Vue.set(this.subjectType,type,1)
            }
          }

          //拼装化拼图需要的数据
          for(var key in this.subjectType){
            this.pieData.data.push(this._global.subjectTypeName[key]);
            var obj = {};
            obj['name'] = this._global.subjectTypeName[key]
            obj['value'] = this.subjectType[key]
            this.pieData.showData.push(obj)
          }
          this.$refs.child.drawPie();
          this.scoreChange();

        })

      }
    }

</script>

<style>
  .el-card__header{
    padding: 0px 0px;
    min-height: 53px;
    background: #F3F7F8;
    line-height: 53px;
  }
</style>

<style scoped>
  @import "paperSelect.css";
</style>
