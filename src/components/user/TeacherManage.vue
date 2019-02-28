<template>
  <div>
    <el-card  :body-style="{ padding: '0px' }">
      <el-row style="margin: 5px 10px" class="row">
        <div style="float: left">
          <el-button style="border: 2px solid #4cafe3; background: #008CD7; border-radius: 5px;color: #EAF6FD;" type="text"   v-on:click="addTeacher()">
            <i class="el-icon-plus"  ></i>增加教师
          </el-button>
          <el-button   style="border: 2px solid #4cafe3; background: #008CD7; border-radius: 5px;color: #EAF6FD;" type="text" v-on:click="batchAddKnowledge()">
            <i class="el-icon-upload"></i> 批量增加教师
          </el-button>
        </div>
      </el-row>

      <el-row class="row">
        <el-col :span="3">
          <el-select placeholder="学校" style="margin: 0px 3px;" v-model="orgId"  @change="change()">
            <el-option
              v-for="item in orgs"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select placeholder="学科" style="margin: 0px 3px;" v-model="courseId"  @change="change()">
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
          ref="multipleTable"
        >
          <el-table-column  width="100"  align="center"  type="selection">

          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="80" align="center">
          </el-table-column>
          <el-table-column
            label="工号"
            min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1" style="color:darkgray">{{scope.row.teacherNo}}</span>
              <span v-if="scope.row.state==0">{{scope.row.teacherNo}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1" style="color:darkgray">{{scope.row.name}}</span>
              <span v-if="scope.row.state==0">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="学校名称"
            min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1" style="color:darkgray">{{scope.row.orgName}}</span>
              <span v-if="scope.row.state==0">{{scope.row.orgName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="学科"
            min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1" style="color:darkgray">{{scope.row.courseName}}</span>
              <span v-if="scope.row.state==0">{{scope.row.courseName}}</span>
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
      title="批量上传学生"
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
        <el-select placeholder="学科" v-model="orgId1"  @change="change()">
          <el-option
            v-for="item in orgs"
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
      title="新增学生"
      width="30%" :close-on-click-modal="false"
    >
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="学校" v-model="orgId1" >
        <el-option
          v-for="item in orgs"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="学科" v-model="courseId1" >
        <el-option
          v-for="item in courses"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select></div>
      <el-input v-model="knowledgeName1"  placeholder="在这里输入教师姓名"style="margin-bottom: 15px" ></el-input>
      <el-input v-model="teacherNo"  placeholder="在这里输入教师工号"style="margin-bottom: 15px" ></el-input>
      <el-button v-if="isError" type="primary" disabled>保存并上传</el-button>
      <el-button v-else @click="save(courseId1,orgId1,knowledgeName1)"  type="primary" >保存并上传</el-button>
    </el-dialog>
    <!--修改知识点弹窗-->
    <el-dialog
      @close="dialogCls"
      title="修改学生信息"
      :visible.sync="dialogVisible1"
      width="30%" :close-on-click-modal="false"
    >
      <div style="height: 100%;text-align: left;margin-bottom: 15px">
        {{subject}}
      </div>
      <el-input v-model="knowledgeName1"  placeholder="在这里修改学生信息"style="margin-bottom: 15px" ></el-input>
      <el-button  @click="modify(knowledgeName1)"  type="primary" >保存修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import commonService from '@/common/service/commonService'
  import Pager from '@/components/pager'
  export default {
    name: "StudentManage",
    data(){
      return{
        orgId: '',
        orgId1:'',
        orgs: [],
        pages:0,
        name:'',
        currentPage:1,
        updateId:'',
        dialogVisible:false,
        dialogVisible1:false,
        dialogVisible2:false,
        dialogVisible3:false,
        dialogVisible4:false,
        knowledgeName:'',
        knowledgeName1:'',
        subject:'',
        isError:false,
        tableData:[],
        file:'',
        errorText:'',
        batcherror:false,
        teacherNo:'',
        courseId:'',
        courseId1:''
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
        if (this.orgId!='') {
          param['orgId'] = this.orgId;
        }
        if (this.courseId!='') {
          param['courseId'] = this.courseId;
        }
        if(this.name.length>0){
          param['name']=this.name;
        }
        return param;
      },
      search:function () {
        commonService.searchTeacherByPage(this.getParam(),this.currentPage, 5).then(res => {
          if (res == null) {
            this.tableData=[];
            this.pages = 0;
          } else {
            this.tableData=res.data.data.list;
            this.pages = res.data.data.page_total;
          }
        })
      },
      addTeacher:function(){
        this.dialogVisible=true;
      },
      batchAddKnowledge:function(){
        this.dialogVisible2=true;
      },
      stop(index, row) {
        this.tableData[index].state=1;
        var param={};
        param['teacherNo']=row.teacherNo;
        param['state']=1;
        commonService.updateTeacher(param).then(res=>{


        })
      },
      reuse(index, row){
        this.tableData[index].state=0;
        var param={};
        param['teacherNo']=row.teacherNo;
        param['state']=0;
        commonService.updateTeacher(param).then(res=>{
          console.info("修改成功");
        })
      },
      update(index, row) {
        this.updateId=row.teacherNo;

        this.knowledgeName1=row.name;
        this.orgId1=row.orgId;
        this.dialogVisible1=true;
      },
      nextPage:function (index) {
        this.currentPage = index;
        this.search();
      },
      save(courseId,orgId,knowledgeName){
        var param={};
        if (courseId!='') {
          param['courseId'] = courseId;
        }else{
          alert("请选择学科");
          return;
        }
        if (orgId!='') {
          param['orgId'] = orgId;
        }else{
          alert("请选择学校");
          return;
        }
        if (this.teacherNo.length>0) {
          param['teacherNo'] = this.teacherNo;
        }else{
          alert("请输入工号");
          return;
        }
        if(knowledgeName.length>0){
          param['name']=knowledgeName;
        }else{
          alert("请输入教师名字");
          return;
        }
        commonService.addTeacher(param).then(res=>{
          console.info("添加成功");
          this.search();
          this.orgId1=''
          this.knowledgeName1=''
          this.teacherNo=''
          this.courseId1=''

        })
      },
      modify(knowledgeName){
        var param={};
        if(knowledgeName.length>0){
          param['name']=knowledgeName;
        }
        if(this.updateId!=''){
          param['teacherNo']=this.updateId;
        }
        commonService.updateTeacher(param).then(res=>{
          console.info("修改成功");
          this.knowledgeName1='';
          this.orgId1='';
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
        if (this.orgId1.length > 0) {
          formData.append('subjectId', this.orgId1);
        }else{
          alert("请选择学校");
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
        this.orgId1='';
        this.isError=false;
        this.batcherror=false;
        this.errorText='';
        var obj=  document.getElementById("file");
        obj.outerHTML=obj.outerHTML;
      },
      change:function () {
        this.search();
      },
    },
    components:{
      pager:Pager
    },
    created:function () {
      commonService.getOrgs().then(res=>{
        this.orgs=res.data.data;
      });
      commonService.getTopSubject().then(res=>{
        this.courses=res.data.data;
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
