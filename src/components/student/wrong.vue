<template>
  <div>
    <el-card  :body-style="{ padding: '0px' }">
      <div v-for="subject in Subjects" class="subjectItem">
        <el-row class="subjectItemName">
          {{subject.content}}
        </el-row>
        <div v-if="subject.subjectTypeId == 2">
          <el-row v-for="option in subject.optionList" v-html="option" class="subjectOption"></el-row>
        </div>
        <el-row>
        <el-col :span="12">正确答案:{{subject.answer}}</el-col>
          <el-col :span="12">你的答案:<span style="color: red">{{subject.userAnswer}}</span></el-col>
        </el-row>
        <el-row class="subjectItemScore">
          <el-col :span="18">知识点:<span style="color: #038dd6">{{subject.knowledgeName}}</span></el-col>
          <el-col :span="3"><el-button type="text"  @click="see(subject)">查看解析</el-button></el-col>
        </el-row>
        <subject-diglog v-bind:parentsubject="subject" v-bind:newDialogVisible="newDialogVisible" v-bind:rand="rand"  v-on:subjectvisable="childBysubjectValue" ></subject-diglog>
      </div>
    </el-card>
  </div>
</template>

<script>
  import AnalysisDialog from '@/components/paper/AnalysisDialog'
  import testPaperService from '@/common/service/testPaperService'
  export default {
    name: "wrong",
    data(){
      return{
        newDialogVisible:false,
        rand:'',
        Subjects:[
          //   {
          //   id:'1',
          //   content:"如果JDK的安装路径是\"d:\\jdk\"，若想在命令行窗口中任何路径下，都可以直接使用javac和java命令，" +
          //     "需要将环境变量Path设置为以下哪个选项：（     ）",
          //   subjectTypeId:2,
          //   optionList:["A. d:\\jdk","B. d:\\jdk\\bin","C. d:\\jre\\bin "],
          //   knowledgeName:"计算机基础",
          //   analysis:'JDK是java开发工具类',
          //   Answer: "A",
          //   difficulty:1,
          //   publish:1,
          //   courseName:'数学'
          // }
        ],
      }
    },
    methods: {
      nextPage:function (index) {
        this.currentPage = index;
      },
      childBysubjectValue:function(subjectvisable){
        this.newDialogVisible=subjectvisable
      },
      see:function(subject){
        this.subject=subject;
        this.newDialogVisible=true;
        this.rand=Math.random();
      },
      nextPage:function (index) {
        this.currentPage = index;
        this.search();
      }
    },
    components:{
      subjectDiglog: AnalysisDialog
    },
    created:function () {
       testPaperService.getErrorRecord(sessionStorage.getItem('registerNo')).then(res=>{
        this.Subjects=res.data.data;
      })
    }
  }
</script>
<style >
  .subjectItem{
    border:1px solid #EBEBEB;
    margin: 10px;
    min-height: 90px;
    text-align: left;
  }

  .subjectItem:hover{
    border:2px solid #2A9FDC;
  }
  .subjectItem:hover .subjectItemScore{
    border-top:2px solid #2A9FDC;
    background: #ebf8fe;
  }
  .subjectList{
    border:1px solid #EBEBEB;
  }
  .subjectItemName{
    min-height: 50px;
    line-height:50px;
    font-size: 16px;
  }
  .subjectItemScore{
    min-height: 40px;
    background: #FAFAFA;
    line-height:40px;
  }

  .el-dialog__header {
    padding: 10px 10px 10px;
    background: #f0f0f0;
    text-align: left;
  }
  .el-dialog__title{
    color: #66b1ff;
  }
  .el-dialog__headerbtn {
    position: absolute;
    top: 15px;
    right: 10px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
  }
  .row{
    border-top:1px solid #EBEBEB;
    min-height: 55px;
    line-height: 55px;
  }

</style>
