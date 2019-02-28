<template>
  <div>
    <el-card  :body-style="{ padding: '0px' }">
      <el-row style="margin: 5px 10px" class="row">
        <div style="float: left">
          <el-button style="border: 2px solid #4cafe3; background: #008CD7; border-radius: 5px;color: #EAF6FD;" type="text"   v-on:click="addOrg()">
            <i class="el-icon-plus"  ></i>增加学校
          </el-button>
        </div>
      </el-row>

      <el-row class="row">
        <el-col :span="18">
          <el-row>
            <el-col span="16">
              <el-input placeholder="请输入学校名字" v-model="name"></el-input>
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
            label="学校名"
            min-width="250" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1" style="color:darkgray">{{scope.row.name}}</span>
              <span v-if="scope.row.status==0">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"  min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1" style="color:darkgray">停用中</span>
              <span v-if="scope.row.status==0">启用中</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="120"  align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status==0"
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
    <!--新增学校弹窗-->
    <el-dialog
      @close="dialogCls"
      :visible.sync="dialogVisible"
      title="新增学校"
      width="30%" :close-on-click-modal="false"
    >
      <el-input v-model="knowledgeName1" type="textarea" placeholder="请输入学校名字" style="margin-bottom: 15px" @input="changeOrg"></el-input>
      <el-alert v-if="isError"
                title="该学校名称已存在"
                type="error">
      </el-alert>
      <el-button v-if="isError" type="primary" disabled>保存并上传</el-button>
      <el-button v-else @click="save(knowledgeName1)"  type="primary" >保存并上传</el-button>
    </el-dialog>
    <!--修改知识点弹窗-->
    <el-dialog
      @close="dialogCls"
      title="修改学校名字"
      :visible.sync="dialogVisible1"
      width="30%" :close-on-click-modal="false"
    >
      <el-input v-model="knowledgeName1" type="textarea" placeholder="在这里修改学校名称"style="margin-bottom: 15px"  @input="changeOrg"></el-input>
      <el-alert v-if="isError"
                title="该学校名已存在"
                type="error">
      </el-alert>
      <el-button v-if="isError" type="primary" disabled>保存修改</el-button>
      <el-button v-else @click="modify(knowledgeName1)"  type="primary" >保存修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import OrgService from '@/common/service/OrgService'
  import Pager from '@/components/pager'
  export default {
    name: "OrgManage",
    data(){
      return{
        courses: [],
        pages:0,
        name:'',//知识点名称
        currentPage:1,  //当前页
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
        if(this.name.length>0){
          param['name']=this.name;
        }
        return param;
      },
      change:function () {
        this.search();
      },
      changeOrg:function(){
        var param = {};
        if(this.knowledgeName1.length>0){
          param['name']=this.knowledgeName1;
        }
        param['notLikeName']=1;

        if(this.knowledgeName1!=''){
          OrgService.searchOrgByPage(param,this.currentPage, 5).then(res => {
            if(res!=null){
              if(res.data.data.page_total!=0){
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
      search:function () {
        OrgService.searchOrgByPage(this.getParam(),this.currentPage, 5).then(res => {
          if (res == null) {
            this.tableData=[];
            this.pages = 0;
          } else {
            console.info(JSON.stringify(res))
            this.tableData=res.data.data.list;
            this.pages = res.data.data.page_total;
          }
        })
      },
      addOrg:function(){
        this.dialogVisible=true;
      },
      stop(index, row) {
        this.tableData[index].state=1;
        var param={};
        param['id']=row.id;
        param['status']=1;
        OrgService.updateOrg(param).then(res=>{
         this.search()

        })
      },
      reuse(index, row){
        this.tableData[index].state=0;
        var param={};
        param['id']=row.id;
        param['status']=0;
        OrgService.updateOrg(param).then(res=>{
          this.search()
        })
      },
      update(index, row) {
        this.updateId=row.id;
        this.knowledgeName1=row.name;
        this.dialogVisible1=true;
      },
      nextPage:function (index) {
        this.currentPage = index;
        this.search();
      },
      save(knowledgeName){
        var param={};
        if(knowledgeName.length>0){
          param['name']=knowledgeName;
        }else{
          alert("请输入知识点名称");
          return;
        }
        OrgService.addOrg(param).then(res=>{
          console.info("添加成功");
          this.search();
          this.knowledgeName1=''
        })
      },
      modify(knowledgeName){
        var param={};
        if(knowledgeName.length>0){
          param['name']=knowledgeName;
        }
        if(this.updateId!=''){
          param['id']=this.updateId;
        }
        OrgService.updateOrg(param).then(res=>{
          console.info("修改成功");
          this.knowledgeName1='';
          this.search()
        })
      },
      dialogCls:function () {
        this.errorText='';
        this.knowledgeName1='';
        this.isError=false;
        this.errorText='';
      }
    },
    components:{
      pager:Pager
    },
    created:function () {
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
  @import "org.css";
</style>

<style scoped>

</style>
