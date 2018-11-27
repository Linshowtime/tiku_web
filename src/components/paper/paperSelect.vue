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

                     <!--<paper-type-chart v-bind:chartData="pieData"></paper-type-chart>-->
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

             <el-col :span="12" style="text-align: right" v-if="isAllShow==true">

                 <el-button   v-if=" choseAll===1" style="border: 2px solid #4cafe3; background: #008CD7; border-radius: 5px;color: #EAF6FD;" type="text" v-on:click="selectAllSubject('select')" round>
                   全部选择<i class="el-icon-circle-plus el-icon--right"></i>
                 </el-button>

                 <el-button v-else style="border: 2px solid #4cafe3; background: #008CD7; border-radius: 5px;color: #EAF6FD;" type="text" v-on:click="selectAllSubject('cancel')" round>
                   全部取消<i class="el-icon-remove el-icon--right"></i>
                 </el-button>

             </el-col>
             <el-col :span="12" style="text-align: right" v-if="isAllShow==false">

               <el-button  disabled   style=" border-radius: 5px;"  v-on:click="selectAllSubject('select')" round  type="info" plain>
                 全部选择<i class="el-icon-circle-plus el-icon--right"></i>
               </el-button>
             </el-col>
           </el-row>
           <el-row class="row paperTitle margin-row">
             <span v-html="paper.list[0].name"></span>
           </el-row>
           <el-row class="row margin-row" style="background: #F3F7F8">
             <span v-if="isLimit==true">答题时间:{{time}}</span><span v-if="isLimit==false">没有时间限制</span>
           </el-row>
           <!-- 试卷题目信息展示 -->
           <el-row>
             <div  v-for="(subject,index) in subjectList" :key="index" class="subject">
               <el-row >
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
                     <!--<el-table-column  label="分数">-->
                       <!--<template slot-scope="scope">-->
                         <!--<el-input v-model="scope.row.score" @change = "scoreChange"></el-input>-->
                       <!--</template>-->
                     <!--</el-table-column>-->
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
                   <el-button type="text" >组卷次数:{{subject.useCount == null ? 0 :subject.useCount}}次</el-button>
                 </el-col>
                 <!--<el-col :span="2" offset=1>
                   <el-button type="text">得分率:{{radio}}</el-button>
                 </el-col>-->
                 <el-col :span="2" offset=14>
                   <el-button type="text"  @click="see(subject)">查看解析</el-button>
                 </el-col>
                 <el-col :span="2" offset=1>
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
   <entry-paper-edit ref="entryPaperEdit"></entry-paper-edit>


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
          paper:{},
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
        selectAllSubject:function(type){
          if(type === 'select') {
            this.choseAll=0;
            this.selectSubjectIds=this.subjectList;
            let batchaddurl=this._global.requestUrl.batchAddQuestionsToTestPaperUrl
            this.paper = this._global.storage.getSession('srcPaper');
            var params = new Array();
            for(var i=0;i<this.subjectList.length;i++){
              var param={};
              if(this.paper) {
                param['paperId']= this.paper.list[0].id;
              }
              param['subjectId']=this.subjectList[i].id;
              params.push(param);
            this._global.paperUtil.flushSrcPaperSubjectSum(this.subjectList[i],'add');
            }
            this.$ajax.post(batchaddurl,params).then(res=> {
              if (res.data.resultCode == '0000') {
                this.$refs.entryPaperEdit.flushSubject();
                this.msgDialogValue='批量添加成功';
                this.msgVisible = true;
              }else{
                alert(JSON.stringify(res.data));
              }
            })
          }
          else{
            this.choseAll=1;
            this.paper = this._global.storage.getSession('srcPaper');
            var params = new Array();
            for(var i=0;i< this.selectSubjectIds.length;i++){
              var param={};
              if(this.paper) {
                param['paperId']= this.paper.list[0].id;
              }
              param['subjectId']= this.selectSubjectIds[i].id;
              params.push(param);
             this._global.paperUtil.flushSrcPaperSubjectSum(this.selectSubjectIds[i],'del');
            }
            this.selectSubjectIds=[];
              let  batchdeleteurl=this._global.requestUrl.batchDeleteQuestionsFromTestPaperUrl;
              this.$ajax.post(batchdeleteurl,params).then(res => {
                if (res.data.resultCode == '0000') {
                  this.$refs.entryPaperEdit.flushSubject();
                }
              });

          }
          this.newDialogVisible=false;
          }
        ,
        returnChose:function(){
          this.$router.push({name: 'examPaper'})
        },
        selectSubject:function (subject, type) {
          //alert(this.selectSubjectIds.indexOf(subject))
          let addsubjecturl=this._global.requestUrl.addQuestionToTestPaperUrl;
          this.paper = this._global.storage.getSession('srcPaper');
          if(!this.paper){
            alert("请先选择试卷");
            return;
          }
          if(type === 'select'){
            if(this.selectSubjectIds.indexOf(subject) === -1){
              this.selectSubjectIds.push(subject);
              var param = {};
              if(this.paper) {
                param['paperId']= this.paper.list[0].id;
              }
              param["subjectId"]=subject.id;
              this.$ajax.post(addsubjecturl,param).then(res=>{
                  if (res.data.resultCode == '0000') {
                    //alert("添加成功");
                    //更新试卷题目数
                    //alert(JSON.stringify(subject));
                    this._global.paperUtil.flushSrcPaperSubjectSum(subject,'add');
                    this.$refs.entryPaperEdit.flushSubject();
                  }
                }
              )
            }
          }else{
            this.selectSubjectIds.splice(this.selectSubjectIds.indexOf(subject), 1);
            if(this.paper) {
              let  deletesubjecturl=this._global.requestUrl.deleteQuestionFromTestPaperUrl+this.paper.list[0].id+'/'+subject.id;
              this.$ajax.get(deletesubjecturl).then(res => {
                if (res.data.resultCode == '0000') {
                  alert("取消成功");
                  //更新试卷题目数
                  this._global.paperUtil.flushSrcPaperSubjectSum(subject,'del');
                  this.$refs.entryPaperEdit.flushSubject();
                }
              });

            }
          }
          this.newDialogVisible=false;
        },
      formatSeconds: function(value) {
        if (value > 0) {
          var result=''
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
      },
      scoreChange: function () {
        var sum=0;
        for(var i=0; i<this.subjectList.length;i++){
          if(this.subjectList[i].childSubjectList.length >0 ){
            var csum=0;
            for(var j=0; j<this.subjectList[i].childSubjectList.length; j++){
              if(this.subjectList[i].childSubjectList[j].score>0) {
                csum += parseInt(this.subjectList[i].childSubjectList[j].score);
              }
            }
            Vue.set(this.subjectList[i],'score',csum);
            sum += csum;
          }else{
            if(this.subjectList[i].score>0) {
              sum += parseInt(this.subjectList[i].score);
            }
          }
        }
        this.paperTotalScore = sum;
      }
      },
      mounted(){
        this.paperId=this.$route.query.paperId;
        if(!this.paperId){
            alert('请确定选择试卷');
            return;
        }
        let url =this._global.requestUrl.testPaperSearchUrl+'1/10';
        //获取试卷基本信息
        this.$ajax.post(url,{'id':this.paperId}).then(res =>{
          if(res.data.resultCode == '0000'){
            this.paper = res.data.data;
            if(this.paper.list[0].issubjecttime==0&&this.paper.list[0].papertime==0){
              this.isLimit=false;
            }
          }
        });
        //获取试卷题目
        let paperSubjectUrl =this._global.requestUrl.getTestPaperQuestionsUrl+this.paperId;
        this.$ajax.get(paperSubjectUrl).then(res =>{

          if(res.data.resultCode == '0000'){
            this.time=this.formatSeconds(res.data.data.paperTime)
            //将试卷题目赋值给本地变量
            this.subjectList = res.data.data.subjects;
            if(this.subjectList.length==0){
              this.isAllShow=false;
            }
            //计算试卷中题目类型，以及每种类型题目数量
            for(var i=0; i<this.subjectList.length; i++){
              var type = this.subjectList[i].commonSubjectTypeId;

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
          }
        });

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
