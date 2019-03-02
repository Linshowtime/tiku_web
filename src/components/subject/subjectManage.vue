<template>
  <div>
    <el-card  :body-style="{ padding: '0px' }">
      <el-row style="margin: 5px 10px" class="row">
        <div style="float: left">
          <el-button style="border: 2px solid #4cafe3; background: #008CD7; border-radius: 5px;color: #EAF6FD;" type="text" v-on:click="addSubject()">
            <i class="el-icon-plus"  ></i>增加题目
          </el-button>
        </div>
      </el-row>
          <div v-for="subject in Subjects" class="subjectItem">
            <el-row class="subjectItemName">
              {{subject.content}}
            </el-row>
            <div v-if="subject.subjectTypeId == 2">
              <el-row v-for="option in subject.optionList" v-html="option" class="subjectOption"></el-row>
            </div>
            <el-row class="subjectItemScore">
              <el-col :span="16" v-if="subject.publish==0">知识点:<span style="color: #038dd6">{{subject.knowledgeName}}</span></el-col>
              <el-col :span="18" v-if="subject.publish==1">知识点:<span style="color: #038dd6">{{subject.knowledgeName}}</span></el-col>
              <el-col :span="2" v-if="subject.publish==0"><el-button type="text"  @click="see(subject)">查看解析</el-button></el-col>
              <el-col :span="3" v-if="subject.publish==1"><el-button type="text"  @click="see(subject)">查看解析</el-button></el-col>
              <el-col :span="2" v-if="subject.publish==0"><el-button type="text" @click="updateSubject(subject)">修改题目</el-button></el-col>
              <el-col :span="2" v-if="subject.publish==0"><el-button type="text" @click ="deleteSubject(subject.id)">删除题目</el-button></el-col>
              <el-col :span="2" v-if="subject.publish==0"><el-button type="text" @click="publishSubject(subject)">发布</el-button></el-col>
              <el-col :span="3" v-if="subject.publish==1"><el-button type="text" style="color:red">已发布</el-button></el-col>
            </el-row>
          <subject-diglog v-bind:parentsubject="subject" v-bind:newDialogVisible="newDialogVisible" v-bind:rand="rand"  v-on:subjectvisable="childBysubjectValue" ></subject-diglog>
        </div>
        <pager v-bind:totalPage="pages"  v-on:gotoNext="nextPage"></pager>
    </el-card>
    <el-dialog
      @close="dialogCls"
      :visible.sync="addVisible"
      title="新增题目"
      width="50%" :close-on-click-modal="false"
    >
      <el-input v-model="addSubjectModel.content" type="textarea" placeholder="请输入题目内容" style="margin-bottom: 15px" ></el-input>
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="学科" v-model="addSubjectModel.courseId"  @change="ChangeCourse(addSubjectModel.courseId)">
        <el-option
          v-for="item in courses"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="机构" v-model="updateSubjectModel.orgId"  @change="ChangeCourse(updateSubjectModel.courseId)">
        <el-option
          v-for="item in orgs"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="知识点" v-model="addSubjectModel.knowledgeId" >
        <el-option
          v-for="item in knowledges"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="题目类型" v-model="addSubjectModel.subjectTypeId">
        <el-option
          v-for="item in subjectType"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="难易度" v-model="addSubjectModel.difficulty" >
        <el-option
          v-for="item in difficultys"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <el-input v-if="addSubjectModel.subjectTypeId==2" v-model="addSubjectModel.choice1"  placeholder="选项1内容" style="margin-bottom: 15px" ></el-input>
      <el-input v-if="addSubjectModel.subjectTypeId==2" v-model="addSubjectModel.choice2"  placeholder="选项2内容" style="margin-bottom: 15px" ></el-input>
      <el-input v-if="addSubjectModel.subjectTypeId==2" v-model="addSubjectModel.choice3"  placeholder="选项3内容" style="margin-bottom: 15px" ></el-input>
      <el-input v-if="addSubjectModel.subjectTypeId==2"  v-model="addSubjectModel.choice4"  placeholder="选项4内容" style="margin-bottom: 15px" ></el-input>
      <el-input  v-model="addSubjectModel.answer" type="textarea" placeholder="请输入答案" style="margin-bottom: 15px" ></el-input>
      <el-input v-model="addSubjectModel.analysis" type="textarea" placeholder="请输入解析" style="margin-bottom: 15px" ></el-input>
      <el-button  @click="save()"  type="primary" >保存并上传</el-button>
    </el-dialog>

    <el-dialog
      @close="dialogCls"
      :visible.sync="updateVisible"
      title="修改题目"
      width="50%" :close-on-click-modal="false"
    >
      <el-input v-model="updateSubjectModel.content" type="textarea" placeholder="请输入题目内容" style="margin-bottom: 15px" ></el-input>
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="学科" v-model="updateSubjectModel.courseId"  @change="ChangeCourse(updateSubjectModel.courseId)">
      <el-option
        v-for="item in courses"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select></div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="机构" v-model="updateSubjectModel.orgId"  @change="ChangeCourse(updateSubjectModel.courseId)">
        <el-option
          v-for="item in orgs"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="知识点" v-model="updateSubjectModel.knowledgeId" >
        <el-option
          v-for="item in knowledges"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="题目类型" v-model="updateSubjectModel.subjectTypeId">
        <el-option
          v-for="item in subjectType"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="难易度" v-model="updateSubjectModel.difficulty" >
        <el-option
          v-for="item in difficultys"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <el-input v-if="updateSubjectModel.subjectTypeId==2" v-model="updateSubjectModel.choice1"  placeholder="选项1内容" style="margin-bottom: 15px" ></el-input>
      <el-input v-if="updateSubjectModel.subjectTypeId==2" v-model="updateSubjectModel.choice2"  placeholder="选项2内容" style="margin-bottom: 15px" ></el-input>
      <el-input v-if="updateSubjectModel.subjectTypeId==2" v-model="updateSubjectModel.choice3"  placeholder="选项3内容" style="margin-bottom: 15px" ></el-input>
      <el-input v-if="updateSubjectModel.subjectTypeId==2"  v-model="updateSubjectModel.choice4"  placeholder="选项4内容" style="margin-bottom: 15px" ></el-input>
      <el-input  v-model="updateSubjectModel.answer" type="textarea" placeholder="请输入答案" style="margin-bottom: 15px" ></el-input>
      <el-input v-model="updateSubjectModel.analysis" type="textarea" placeholder="请输入解析" style="margin-bottom: 15px" ></el-input>
      <el-button  @click="comfirmUpdate()"  type="primary" >确认修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import Pager from '@/components/pager'
  import AnalysisDialog from '@/components/paper/AnalysisDialog'
  import commonService from '@/common/service/commonService'
  import questionService from '@/common/service/questionService'
  import knowledgeService from '@/common/service/knowledgeService'
  export default {
    name: "studentManage",
    data(){
      return{
        addVisible:false,
        updateVisible:false,
        knowledges:[],
        courses:[],
        orgs:[],
        pages:0,
        currentPage:1,  //当前页
        subject:{},
        newDialogVisible:false,
        rand:'',
        parentSubjects:"",
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
        addSubjectModel:{
          content:'',
          subjectTypeId:2,
          knowledgeId:'',
          answer:'',
          choice1:'',
          choice2:'',
          choice3:'',
          choice4:'',
          difficulty:1,
          analysis:'',
          publish:'',
          courseId:'',
          orgId:'',
          creator:''
        },
        updateSubjectModel:{
          id:'',
          content:'',
          subjectTypeId:'',
          knowledgeId:'',
          answer:'',
          choice1:'',
          choice2:'',
          choice3:'',
          choice4:'',
          difficulty:'',
          analysis:'',
          publish:'',
          courseId:'',
          orgId:''
        },
        subjectModel:{
          content:''
        },
        subjectType:[{
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
        difficultys:[{
          id:1,
          name:'易'
        },
          {
            id:2,
            name:'中'
          },
          {
            id:3,
            name:'难'
          }
          ]
      }
    },
    methods: {
      nextPage:function (index) {
        this.currentPage = index;
      },
      childBysubjectValue:function(subjectvisable){
        this.newDialogVisible=subjectvisable
      },
      save(){
        if(sessionStorage.getItem('registerNo')!=null) {
          this.addSubjectModel.creator = sessionStorage.getItem('registerNo');
        }
       questionService.addQuestion(this.addSubjectModel).then(res=>{
         this.addVisible=false;
         this.search();
       })
      },
      updateSubject:function(subject){
        this.updateSubjectModel.analysis=subject.analysis;
        this.updateSubjectModel.choice1=subject.choice1;
        this.updateSubjectModel.choice2=subject.choice2;
        this.updateSubjectModel.choice3=subject.choice3;
        this.updateSubjectModel.choice4=subject.choice4;
        this.updateSubjectModel.content=subject.content;
        this.updateSubjectModel.knowledgeId=subject.knowledgeId;
        this.updateSubjectModel.courseId=subject.courseId;
        this.updateSubjectModel.id=subject.id;
        this.updateSubjectModel.answer=subject.answer;
        this.updateSubjectModel.orgId=subject.orgId;
        this.updateVisible=true;
      },
      comfirmUpdate:function(){
        questionService.modifyQuestion(this.updateSubjectModel).then(res=>{
          this.updateVisible=false;
          this.search();
        })
      },
      publishSubject:function(subject){
       subject.publish=1;
        questionService.modifyQuestion(subject).then(res=>{
          this.search()
        })
      },
      ChangeCourse:function(id){
        var param={}
        if(id!=''){
          param["subjectId"]=id;
          knowledgeService.searchKnowledgeByPage(param,1,100).then(res=>{
            this.knowledges=res.data.data.list;
          })
        }
      },
      see:function(subject){
        this.subject=subject;
        this.newDialogVisible=true;
        this.rand=Math.random();
      },
      addSubject(){
        this.addVisible=true
      },
      deleteSubject:function(id){
       alert("确认删除此道题？");
       questionService.deleteQuestion(id).then(res=>{
         alert("删除成功");
         this.search()
       })
      },
      nextPage:function (index) {
        this.currentPage = index;
        this.search();
      },
      search(){
    questionService.searchQuestionByPage(this.subjectModel,this.currentPage,5).then(res=>{
      this.Subjects=res.data.data.list;
      this.pages=res.data.data.page_total;
    })
      }
    },
    components:{
      pager:Pager,
      subjectDiglog: AnalysisDialog,
    },
    created:function () {
      commonService.getTopSubject().then(res=>{
        this.courses=res.data.data;
      });
      commonService.getOrgs().then(res=>{
        this.orgs=res.data.data;
      });
     this.search();
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
</style>

<style scoped>
  @import "subjectManage.css";
</style>
