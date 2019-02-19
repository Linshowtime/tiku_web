<template>
  <div>
    <el-card  :body-style="{ padding: '0px' }">
      <el-row style="margin: 5px 10px" class="row">
        <div style="float: left">
          <el-button style="border: 2px solid #4cafe3; background: #008CD7; border-radius: 5px;color: #EAF6FD;" type="text"   v-on:click="addKnowledge()">
            <i class="el-icon-plus"  ></i>增加用户
          </el-button>
          <el-button   style="border: 2px solid #4cafe3; background: #008CD7; border-radius: 5px;color: #EAF6FD;" type="text" v-on:click="batchAddKnowledge()">
            <i class="el-icon-upload"></i> 批量用户
          </el-button>
        </div>
      </el-row>

      <el-row class="row">
        <el-col :span="3">
          <el-select placeholder="机构" style="margin: 0px 3px;" v-model="courseId"  @change="change()">
            <el-option
              v-for="item in courses"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="18">
          <el-row>
            <el-col span="16">
              <el-input placeholder="请输入姓名" v-model="name"></el-input>
            </el-col>
            <el-col span="2">
              <el-button @click="search()" type="primary">搜索</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-table
          :data="tableData"
          border
          style="width: 99%;margin: 3px 3px;" :cell-style="cellStyle" :header-cell-style="rowClass"
          @selection-change="handleSelectionChange"
          ref="multipleTable"
        >

          <el-table-column  width="120"  align="center"  type="selection">

          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="80" align="center">
          </el-table-column>
          <el-table-column
            label="姓名"
            min-width="250" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1" style="color:darkgray">{{scope.row.name}}</span>
              <span v-if="scope.row.state==0">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"  min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1" style="color:darkgray">停用中</span>
              <span v-if="scope.row.state==0">启用中</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="120"  align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.state==0"
                size="mini"
                type="text"
                @click="stop(scope.$index, scope.row)" ><span style="color: red;text-decoration-line: underline;font-size: 16px">停用</span></el-button>
              <el-button
                v-else
                size="mini"
                type="text"
                @click="reuse(scope.$index, scope.row)" ><span style="text-decoration-line: underline;font-size: 16px">启用</span></el-button>
              <el-button
                size="mini"
                type="text"
                @click="update(scope.$index, scope.row)"><span style="text-decoration-line: underline;font-size: 16px">修改</span></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <pager v-bind:totalPage="pages"  v-on:gotoNext="nextPage"></pager>
      </el-row>
    </el-card>
    <!--批量上传弹窗 -->
    <el-dialog
      @close="dialogCls"
      title="批量上传知识点"
      :visible.sync="dialogVisible2"
      width="30%" :close-on-click-modal="false"
    >
      <div style="height: 100%;text-align: left;margin-bottom: 15px;border-bottom: 1px solid #EBEBEB;padding-bottom: 10px">
        <el-button   style=" border: 1px solid #EBEBEB;border-radius: 5px;color: #008CD7;" type="text" v-on:click="downloadExcel()">
          下载批量导入知识点模板<i class="el-icon-download"></i>
        </el-button>
        <div style="color: #fa5c5c;margin: 5px 0px">注意:需要严格按照知识点导入模板的要求编辑，才能顺利完成导入</div>
      </div>

      <form style="height: 100%;text-align: left;margin-bottom: 15px;border-bottom: 1px solid #EBEBEB;padding-bottom: 10px">
        <el-select placeholder="学科" v-model="courseId1"  @change="change()">
          <el-option
            v-for="item in courses"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <div style="color: #fa5c5c;margin: 5px 0px">注意:模板编辑好后，请选择相对应的学科</div>
        <input type="file" name="file"  id="file" @change="getFile($event)"/>
        <div v-html="errorText" v-if="batcherror"></div>
      </form>
      <el-button @click="submitForm($event)"  type="primary" > 保存</el-button>
    </el-dialog>
    <!--新增知识点弹窗-->
    <el-dialog
      @close="dialogCls"
      :visible.sync="dialogVisible"
      title="新增知识点"
      width="30%" :close-on-click-modal="false"
    >
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="学科" v-model="courseId1"  @change="addChange()">
        <el-option
          v-for="item in courses"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <el-input v-model="knowledgeName1" type="textarea" placeholder="在这里输入知识点，并上传知识点(一次只能上传一个知识点，要上传多个请使用批量上传)"style="margin-bottom: 15px" @input="changeKnowledge"></el-input>
      <el-alert v-if="isError"
                title="该知识点已存在"
                type="error">
      </el-alert>
      <el-button v-if="isError" type="primary" disabled>保存并上传</el-button>
      <el-button v-else @click="save(courseId1,knowledgeName1)"  type="primary" >保存并上传</el-button>
    </el-dialog>
    <!--修改知识点弹窗-->
    <el-dialog
      @close="dialogCls"
      title="修改知识点"
      :visible.sync="dialogVisible1"
      width="30%" :close-on-click-modal="false"
    >
      <div style="height: 100%;text-align: left;margin-bottom: 15px">
        {{subject}}
      </div>
      <el-input v-model="knowledgeName1" type="textarea" placeholder="在这里修改知识点"style="margin-bottom: 15px"  @input="changeKnowledge"></el-input>
      <el-alert v-if="isError"
                title="该知识点已存在"
                type="error">
      </el-alert>
      <el-button v-if="isError" type="primary" disabled>保存修改</el-button>
      <el-button v-else @click="modify(knowledgeName1)"  type="primary" >保存修改</el-button>
    </el-dialog>
    <!--确认启用弹窗 -->
    <el-dialog
      @close="dialogCls"
      title="启用"
      :visible.sync="dialogVisible3"
      width="30%" :close-on-click-modal="false"
    >
      <div style="margin: 10px 45px;font-size: 18px">您要启用选中的{{multipleSelection.length}}个知识点吗？</div>
      <el-button @click="confirm(0)"  type="primary" >全部启用</el-button>
    </el-dialog>

    <!--确认停用弹窗 -->
    <el-dialog
      @close="dialogCls"
      title="停用"
      :visible.sync="dialogVisible4"
      width="30%" :close-on-click-modal="false"
    >
      <div style="margin: 10px 45px;font-size: 18px">您要停用选中的{{multipleSelection.length}}个知识点吗？</div>
      <el-button @click="confirm(1)"  type="danger" >全部停用</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import commonService from '@/common/service/commonService'
  import knowledgeService from '@/common/service/knowledgeService'
  import Pager from '@/components/pager'
  export default {
    name: "KnowledgeManage",
    data(){
      return{
        courseId: '',  //学科id
        courseId1:'',//添加知识点时选择学科的id
        courses: [],
        pages:0,
        name:'',//知识点名称
        currentPage:1,  //当前页
        updateId:'',//修改知识点Id
        //选中索引号
        multipleSelection:[],
        // checked:true,
        dialogVisible:false,
        dialogVisible1:false,
        dialogVisible2:false,
        dialogVisible3:false,
        dialogVisible4:false,
        knowledgeName:'',
        knowledgeName1:'',
        subject:'',
        isError:false,
        // tableData:[{
        //   name: '读写拼音',
        //   state: '0',
        //   subject:'语文'
        // }, {
        //   name: '字形',
        //   state: '1',
        //   subject:'语文'
        // }, {
        //   name: '作文',
        //   state: '1',
        //   subject:'语文'
        // }, {
        //   name: '听力',
        //   state: '0',
        //   subject:'英语'
        // }]
        tableData:[],
        file:'',
        errorText:'',
        batcherror:false
      }
    },
    methods:{
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'padding:0px;height:60px;font-size:16px'
      },
      rowClass({ row, rowIndex}) {
        return 'background:#f7f7f7;padding:0px;color:#66b1ff;font-size:16px'
      },
      //搜索自动组装参数
      getParam:function () {
        var param = {};
        if (this.courseId.length > 0) {
          param['subjectId'] = this.courseId;
        }
        if(this.name.length>0){
          param['name']=this.name;
        }
        return param;
      },
      change:function () {
        this.search();
      },
      addChange:function(){
        var param = {};
        if (this.courseId1.length > 0) {
          param['subjectId'] = this.courseId1;
        }
        if(this.knowledgeName1.length>0){
          param['name']=this.knowledgeName1;
        }
        param['notLikeName']=1;
        if(this.courseId1!=''&&this.knowledgeName1!=''){
          knowledgeService.searchKnowledgeByPage(param,this.currentPage, 5).then(res => {
            if(res!=null){
              if(res.pages!=0){
                this.isError=true;
              }
              else{
                this.isError=false;
              }
            }
            else{
              this.isError=false;
            }

          })
        }
      },
      changeKnowledge:function(){
        var param = {};
        if (this.courseId1.length > 0) {
          param['subjectId'] = this.courseId1;
        }
        if(this.knowledgeName1.length>0){
          param['name']=this.knowledgeName1;
        }
        param['notLikeName']=1;

        if(this.courseId1!=''&&this.knowledgeName1!=''){
          knowledgeService.searchKnowledgeByPage(param,this.currentPage, 5).then(res => {
            if(res!=null){
              if(res.pages!=0){
                this.isError=true;
              }
              else{
                this.isError=false;
              }
            }
            else{
              this.isError=false;
            }

          })
        }
        else{
          this.isError=false;
        }
      },
      mutiplyUse:function(){
        this.dialogVisible3=true;
      },
      mutiplyStop:function(){
        this.dialogVisible4=true;
      },
      search:function () {
        knowledgeService.searchKnowledgeByPage(this.getParam(),this.currentPage, 5).then(res => {
          if (res == null) {
            this.tableData=[];
            this.pages = 0;
          } else {
            this.tableData=res.list;
            this.pages = res.pages;
          }
        })
      },
      confirm:function(num){
        if(num==0){
          for(var i=0;i<this.tableData.length;i++){
            if(this.multipleSelection.indexOf(this.tableData[i])>-1){
              this.tableData[i].state=0;
              var param={};
              param['id']= this.tableData[i].id;
              param['state']=1;
              knowledgeService.updateKnowledge(param).then(res=>{
                this.dialogVisible3=false;
              })
            }
          }
        }
        else if(num==1){
          for(var i=0;i<this.tableData.length;i++){
            if(this.multipleSelection.indexOf(this.tableData[i])>-1){
              this.tableData[i].state=1;
              var param={};
              param['id']= this.tableData[i].id;
              param['state']=1;
              knowledgeService.updateKnowledge(param).then(res=>{
                this.dialogVisible4=false;
              })
            }
          }
        }
      },
      addKnowledge:function(){
        this.dialogVisible=true;
      },
      batchAddKnowledge:function(){
        this.dialogVisible2=true;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // for(var i=0;i<this.multipleSelection.length;i++){
        //   if(this.multipleSelection[i].state==0){
        //     this.showStop=true;
        //   }else{
        //     this.showUse=true;
        //   }
        // }
      },
      stop(index, row) {
        this.tableData[index].state=1;
        var param={};
        param['id']=row.id;
        param['state']=1;
        knowledgeService.updateKnowledge(param).then(res=>{


        })
      },
      reuse(index, row){
        this.tableData[index].state=0;
        var param={};
        param['id']=row.id;
        param['state']=0;
        knowledgeService.updateKnowledge(param).then(res=>{
          console.info("修改成功");
        })
      },
      update(index, row) {
        this.subject='';
        this.updateId=row.id;
        for(var i=0;i<this.courses.length;i++){
          if(row.subjectId==this.courses[i].id){
            this.subject=this.courses[i].name;
          }
        }
        this.knowledgeName1=row.name;
        this.courseId1=row.subjectId;
        this.dialogVisible1=true;
      },
      nextPage:function (index) {
        this.currentPage = index;
        this.search();
      },
      save(courseId,knowledgeName){
        var param={};
        if (courseId.length > 0) {
          param['subjectId'] = courseId;
        }else{
          alert("请选择学科");
          return;
        }
        if(knowledgeName.length>0){
          param['name']=knowledgeName;
        }else{
          alert("请输入知识点名称");
          return;
        }
        knowledgeService.addKnowledge(param).then(res=>{
          console.info("添加成功");
          this.search();
          this.courseId1=''
          this.knowledgeName1=''
        })
      },
      modify(knowledgeName){
        var param={};
        if(knowledgeName.length>0){
          param['name']=knowledgeName;
        }
        if(this.updateId.length>0){
          param['id']=this.updateId;
        }
        knowledgeService.updateKnowledge(param).then(res=>{
          console.info("修改成功");
          this.knowledgeName1='';
          this.courseId1=''
          this.search()
        })
      },
      downloadExcel(){
        let url=process.env.Knowledge_Service_URL+'knowledge/api/downloadExcel';
        this.$ajax.get(url,{responseType: 'arraybuffer'}).then((res)=>{
          let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = "批量导入知识点模板";
          link.click();
        }).catch(function (res) {});
      },
      getFile(event) {
        this.file = event.target.files[0];
        this.batcherror=false;
        this.errorText='';
      },
      submitForm(event) {
        event.preventDefault();
        let formData = new FormData();
        if (this.courseId1.length > 0) {
          formData.append('subjectId', this.courseId1);
        }else{
          alert("请选择学科");
          return;
        }
        formData.append('file', this.file);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let url=process.env.Knowledge_Service_URL+'knowledge/api/upload';
        var that=this;
        this.batcherror=false;
        this.errorText=''
        this.$ajax.post(url, formData, config).then(function (res) {
          if (res.data.result.code == '500') {
            alert("文件格式有误");
          } else if (res.data.result.code == '501') {
            that.errorText='';
            var result = res.data.result.message.split(";");
            for (var i = 0; i < result.length; i++) {
              that.errorText += "<p style='color: red'>" + result[i] + "<p>"
            }
            that.batcherror = true;
          }
          if(res.data.result.code != '500'&&res.data.result.code != '501'){
            alert("批量上传成功");
            that.dialogVisible2 = false;
            var obj=  document.getElementById("file");
            obj.outerHTML=obj.outerHTML;
          }
        })
      },
      dialogCls:function () {
        this.batcherror=false;
        this.errorText='';
        this.knowledgeName1='';
        this.courseId1='';
        this.isError=false;
        this.batcherror=false;
        this.errorText='';
        var obj=  document.getElementById("file");
        obj.outerHTML=obj.outerHTML;
      }
    },
    components:{
      pager:Pager
    },
    created:function () {
      commonService.getTopSubject().then(res=>{
        this.courses=res;
      });
      this.search()
    }
  }
</script>
<style >
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
  @import "user.css";
</style>
