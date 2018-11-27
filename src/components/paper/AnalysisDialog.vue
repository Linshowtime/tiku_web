<template id="analysisDialog">
  <el-dialog   :visible.sync="newDialogVisible"  @close="closeDialog()" >
    <div slot="title" class="title">
    试卷分析
    </div>
      <div class="subjectItemName" v-html="cssFormat(parentsubject.content) " style="text-align: left"></div>
    <div v-if="parentsubject.commonSubjectTypeId == 1 || parentsubject.commonSubjectTypeId===2" style="text-align: left">
      <el-row v-for="option in parentsubject.optionsContentList" v-html="option" class="subjectOption"></el-row>
    </div>
    <el-row style="text-align: left" >
      <span style="font-weight: bolder">知识点:</span>{{parentsubject.knowledgeNames}}
    </el-row>
    <br>
    <el-row style="text-align: left">
      <span style="font-weight: bolder">答案:</span> <span v-html="cssFormat(parentsubject.rightAnswer) "></span>
    </el-row>
    <br>
    <el-row style="text-align: left">
      <span style="font-weight: bolder">解析:</span><span v-html="cssFormat(parentsubject.analysis) "></span>
    </el-row>
    <el-row style="text-align: left">
      <span style="font-weight: bolder">难易度:</span> <span v-if="parentsubject.difficulty ===0">
      易
    </span>
      <span v-if="parentsubject.difficulty ===1">
      中
    </span>
      <span v-if="parentsubject.difficulty ===2">
      难
    </span>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <!--<div v-if="selectSubjectIds.indexOf(parentsubject) ===-1">-->
        <!--<el-button type="text" v-on:click="selectSubject(parentsubject,'select')">选择此题<i class="el-icon-circle-plus el-icon&#45;&#45;right"></i></el-button>-->
      <!--</div>-->
      <!--<div v-else><el-button type="text" v-on:click="selectSubject(parentsubject,'cancel')">取消此题<i class="el-icon-remove el-icon&#45;&#45;right"></i></el-button></div>-->

    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: "AnalysisDialog",
        props:["parentsubject","newDialogVisible","rand"],
      data(){
          return{
            selectSubjectIds:[],
            newDialogVisible:false,
            parentsubject:{}
          }
      },
      methods:{
        cssFormat:function (htmlStr) {
          if(!htmlStr){
            return ''
          }
          // htmlStr.replace('<p>','');
          // htmlStr.replace('</p>','');
          htmlStr.replace('</br>','');
          return htmlStr.replace('align="center"','');
        },
        closeDialog:function(){
          this.newDialogVisible=false;
          this.parentsubject={};
          this.$emit("subjectvisable",false)
        },
        selectSubject:function (subject, type) {
          //alert(this.selectSubjectIds.indexOf(subject))
          let addsubjecturl=process.env.Paper_Service_URL+'/api/exam/paper/addSubjectToPaper';
          this.paper = this._global.storage.getSession('srcPaper');
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
                    console.info("-----------------添加成功")
                  }
                }
              )
            }
          }else{
            this.selectSubjectIds.splice(this.selectSubjectIds.indexOf(subject), 1);

            if(this.paper) {
              let  deletesubjecturl=process.env.Paper_Service_URL+'/api/exam/paper/deletePaperSubject/'+   this.paper.list[0].id+'/'+subject.id;
              this.$ajax.get(deletesubjecturl).then(res => {
                if (res.data.resultCode == '0000') {
                  console.info("-----------------删除成功")
                }
              });

            }
          }

        }
      }

    }

</script>

<style >
#analysisDialog  .subjectItemName{
    min-height: 50px;
    line-height:50px;
    color: #1794D8;
    text-decoration: underline;
    font-size: 16px;
  }
#analysisDialog  .title {
    text-align: left;
    height: 30px;
  }
#analysisDialog  .el-dialog__header{
     padding:10px 10px 0px;
    background: #ECF5FF;
  }
#analysisDialog  .el-dialog__body{
    padding: 0px 20px 20px;
  }
#analysisDialog  .el-dialog__footer{
    background: #ECF5FF;
    text-align: center;
    padding: 0px;
    margin-top: 5px;
  }
</style>
