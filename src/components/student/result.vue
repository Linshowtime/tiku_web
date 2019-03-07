<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18" offset=3>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-card :body-style="{ padding: '0px' }">
              <el-row class="row" style="margin: 0px 10px">
                <el-col :span="24" style="text-align: left">
                  <el-button type="primary" plain @click="back">返回</el-button>
                </el-col>
              </el-row>

              <el-row class="row paperTitle margin-row">
                <span v-html="result.paperName"></span>
              </el-row>
              <el-row class="row paperTitle margin-row">
               <el-col :span="12">试卷分数:<span v-html="result.score"></span></el-col>
               <el-col :span="12">你的得分:<span v-html="result.userScore"></span></el-col>
              </el-row>
              <!-- 试卷题目信息展示 -->
              <el-row>
                <div  v-for="(subject,index) in result.subjectDtos" :key="index" class="subject">
                  <el-row>
                    <el-row v-html="subject.content" class="subjectContent"></el-row>
                    <!-- 选择题选项-->
                    <div v-if="subject.subjectTypeId == 2">
                      <el-row v-for="option in subject.optionList" v-html="option" class="subjectOption"></el-row>
                    </div>
                  </el-row>

                  <el-row class="subjectInfo">
                    <el-col :span="4" >
                      <el-button type="text">正确答案:{{subject.answer}}</el-button>
                    </el-col>
                    <el-col :span="4" >
                      <el-button type="text">你的答案:{{subject.userAnswer}}</el-button>
                    </el-col>
                    <el-col :span="2" offset=10>
                      <el-button type="text">此题分数:{{subject.score}}</el-button>
                    </el-col>
                    <el-col :span="2" offset="2">
                      <el-button type="text"  @click="see(subject)" >查看解析</el-button>
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
  </div>



</template>

<script>
  import Vue from 'vue'
  import AnalysisDialog from '@/components/paper/AnalysisDialog'
  import testPaperService from '@/common/service/testPaperService'
  import commonService from '@/common/service/commonService'
  export default {
    data(){
      return{
        newDialogVisible:false,   //查看解析弹窗可见性控制
        rand:'',
        result:'',
        recordId:''
      }
    },
    name: "result",
    components:{
      subjectDiglog: AnalysisDialog,
    },
    methods: {
      //关闭手工录题执行回调
      dialogCls: function () {
        location.reload();
      },
      childBysubjectValue: function (subjectvisable) {
        this.newDialogVisible = subjectvisable;
      },
      see: function (subject) {
        this.subject = subject;
        this.newDialogVisible = true;
        this.rand = Math.random();
      },
      back(){
       this.$router.back(-1);
      }

    },
    mounted() {
      commonService.Connect().then(res => {
      });
      this.recordId= this.$route.query.recordId;
      testPaperService.getExamResult(this.recordId).then(res=>{
        this.result=res.data.data;
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
  @import "result.css";
</style>
