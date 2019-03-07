<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18" offset=3>
        <el-row :gutter="10">
          <el-col :span="24">
              <el-row class="row" style="margin: 0px 10px">
                <el-col :span="4" style="text-align: left">
                  <el-button type="primary" plain @click="goto()">返回首页</el-button>
                </el-col>
                <el-col :span="16" style="text-align: center;color: red">
                  {{h}}小时{{m}}分{{s}}秒
                </el-col>
                <el-col :span="4" style="text-align: right">
                  <el-button type="primary" plain @click="save()">提交试卷</el-button>
                </el-col>

              </el-row>
              <el-row class="row paperTitle margin-row">
                <span v-html="paper.list[0].name"></span>
              </el-row>
              <el-row class="row paperTitle margin-row">
                试卷总分:
                <span v-html="paper.list[0].score"></span>
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
                    <el-col :span="4" >
                      <el-input v-model="subject.userAnswer" placeholder="请输入你的答案" ></el-input>
                    </el-col>
                    <el-col :span="19"  >
                     <div style="float: right"> 此题分数:{{subject.score}}</div>
                    </el-col>
                  </el-row>
                </div>


              </el-row>

              <!-- 试卷题目信息展示结束 -->

          </el-col>
        </el-row>
      </el-col>
      <!-- 右侧空白列-->
      <el-col :span="3"><div class="grid-content"></div></el-col>
    </el-row>
    <message-dialog v-bind:message="msgDialogValue" v-bind:messageVisible="msgVisible" v-on:visable="childByValue"></message-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import MessageDialog from '@/components/util/MessageDialog'
  import testPaperService from '@/common/service/testPaperService'
  import commonService from '@/common/service/commonService'
  export default {
    data(){
      return{
        msgDialogValue:'',  //消息框消息
        msgVisible:false,   //消息框可见性控制
        subjectList: [],
        paperId: '',
        paper:{},
        totalTime:'',
        recordId:'',
        h:'',
        m:'',
        s:''
      }
    },
    name: "onExam",
    components:{
      messageDialog: MessageDialog
    },
    methods: {
      save: function () {
        testPaperService.submitRecordAnswer(this.recordId,this.subjectList).then(res=>{
          console.info("提交成功");
          this.$router.push({
            path:'/exam'
          })
        })
      },
      countTime: function () {
        //时间差
        var that = this
        var leftTime = this.totalTime*1000;
        //定义变量 d,h,m,s保存倒计时的时间
        if (leftTime >= 0) {
          this.h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
          this.m = Math.floor(leftTime / 1000 / 60 % 60);
          this.s = Math.floor(leftTime / 1000 % 60);
          this.totalTime--;
          //递归每秒调用countTime方法，显示动态时间效果
          setTimeout(that.countTime, 1000);
        }
        else{
          alert("答题时间已到，系统将为你自动提交试卷");
          this.save();
        }
      },
      childByValue: function (visable) {
        // knowledgeName就是子组件传过来的值
        this.msgVisible = visable;

      },
      goto(){
        this.$router.push({
          path: '/exam'
        })
      }
    },
    created() {
      commonService.Connect().then(res => {

      });
      this.paperId=this.$route.params.paperId;
      this.totalTime=this.$route.params.totalTime*60;
      this.recordId=this.$route.params.recordId;
      var param={}
      param["id"]=this.paperId;

      testPaperService.searchTestPaperByPage(param,1,5).then(res=>{
        this.paper =res.data.data;
      })
      //获取试卷题目
      testPaperService.getTestPaperQuestions(this.paperId).then(res => {

        this.subjectList = res.data.data;
      })
        this.countTime()
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
  @import "onExam.css";
</style>
