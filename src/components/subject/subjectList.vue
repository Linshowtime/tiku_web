<template>
  <div>
    <div class="subjectList" v-bind:class="{active: parentSubjects.record_total==null || parentSubjects.total==0}">

      <div class="totalNum">共{{parentSubjects.record_total==null?0:parentSubjects.record_total}}份相关试题</div>
      <div v-for="subject in parentSubjects.list" class="subjectItem">
        <el-row class="subjectItemName">
          <div  v-html="cssFormat(subject.content) "></div>
        </el-row>
        <div v-if="subject.subjectTypeId == 2">
          <el-row v-for="option in subject.optionList" v-html="option" class="subjectOption"></el-row>
        </div>
        <el-row class="subjectItemScore">
          <el-col :span="18">知识点:<span style="color: #038dd6">{{subject.knowledgeName}}</span></el-col>
          <el-col :span="3"><el-button type="text"  @click="see(subject)">查看解析</el-button></el-col>
          <!--<el-col :span="3">-->
            <!--<div v-if="selectSubjectIds.indexOf(subject) ===-1">-->
              <!--<el-button type="text" v-on:click="selectSubject(subject,'select')">选择此题</el-button>-->
            <!--</div>-->
            <!--<div v-else><el-button type="text" v-on:click="selectSubject(subject,'cancel')" style="color:red">取消此题</el-button></div>-->
          <!--</el-col>-->
        </el-row>

      </div>
      <subject-diglog v-bind:parentsubject="subject" v-bind:newDialogVisible="newDialogVisible" v-bind:rand="rand"  v-on:subjectvisable="childBysubjectValue" ></subject-diglog>
    </div>

    <entry-paper-edit ref="entryPaperEdit"></entry-paper-edit>
  </div>

</template>

<script>
  import AnalysisDialog from '@/components/paper/AnalysisDialog'
  import EntryPaperEdit from '@/components/entryPaperEdit'
  import testPaperService from '@/common/service/testPaperService'
  export default {
    data(){
      return{
        selectSubjectIds: [],
        subject:{},
        newDialogVisible:false,
        rand:'',
        parentSubjects:""
      }
    }
,
    components:{
      subjectDiglog: AnalysisDialog,
      entryPaperEdit:EntryPaperEdit,
    },
    name: "subject-item",
    props:['parentSubjects','parentChoseIds'],
    methods:{
      cssFormat:function (htmlStr) {
        if(!htmlStr){
          return ''
        }
        return htmlStr.replace('align="center"','');
      },
      childBysubjectValue:function(subjectvisable){
        this.newDialogVisible=subjectvisable
      },
      see:function(subject){
        this.subject=subject;
        this.newDialogVisible=true;
        this.rand=Math.random();
      },
      selectSubject:function (subject, type) {
        this.paper = this._global.storage.getSession('srcPaper');
        if(type === 'select'){
          if(this.selectSubjectIds.indexOf(subject) === -1){
            this.selectSubjectIds.push(subject);
            var param = {};
            if(this.paper) {
              param['paperId']= this.paper.list[0].id;
            }
            param["subjectId"]=subject.id;
            testPaperService.addSubjectToTestPaper(param).then(res =>{
              this._global.paperUtil.flushSrcPaperSubjectSum(subject,'add');
              this.$refs.entryPaperEdit.flushSubject();
            })
          }
        }else{
          this.selectSubjectIds.splice(this.selectSubjectIds.indexOf(subject), 1);

          if(this.paper) {
            testPaperService.deleteSubjectFromTestPaper( this.paper.list[0].id,subject.id).then(res =>{
              alert("取消成功");
              this._global.paperUtil.flushSrcPaperSubjectSum(subject,'del');
              this.$refs.entryPaperEdit.flushSubject();
            })

          }
        }
        }
      }

  }
</script>

<style scoped>
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
  .totalNum{
    margin: 10px;
    text-align: left;
    color: red;
  }
  .active{
    display: none;
  }
</style>
