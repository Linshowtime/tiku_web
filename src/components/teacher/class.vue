<template>
  <div>
    <el-card  :body-style="{ padding: '0px' }">
      <el-row style="margin: 5px 10px" class="row">
        <div style="float: left">
          <el-button style="border: 2px solid #4cafe3; background: #008CD7; border-radius: 5px;color: #EAF6FD;" type="text"   v-on:click="add()">
            <i class="el-icon-plus"  ></i>增加班级
          </el-button>
        </div>
      </el-row>
      <el-row class="row">
        <el-table
          :data="tableData"
          border
          style="width: 99%;margin: 3px 3px;" :cell-style="cellStyle" :header-cell-style="rowClass"
          ref="multipleTable"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80" align="center">
          </el-table-column>
          <el-table-column
            label="班级名称"
            min-width="80" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.className}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="120"  align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="update(scope.row)"><span style="text-decoration-line: underline;font-size: 16px">修改</span></el-button>
              <el-button
                size="mini"
                type="text"
                @click="editStudent(scope.row.id)"><span style="text-decoration-line: underline;font-size: 16px">编辑班级学生</span></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <el-dialog
      @close="dialogCls"
      :visible.sync="dialogVisible"
      title="新增班级"
      width="30%" :close-on-click-modal="false"
    >
      <el-input v-model="addClassModel.className"  placeholder="在这里输入班级名称"style="margin-bottom: 15px" ></el-input>
      <el-button  @click="save()"  type="primary" >保存并上传</el-button>
    </el-dialog>
    <el-dialog
      @close="dialogCls"
      title="修改班级名称"
      :visible.sync="dialogVisible1"
      width="30%" :close-on-click-modal="false"
    >
      <el-input v-model="updateClassModel.className"  placeholder="在这里修改班级名称"style="margin-bottom: 15px" ></el-input>
      <el-button  @click="modify()"  type="primary" >保存修改</el-button>
    </el-dialog>
    <el-dialog
      @close="dialogCls"
      title="编辑班级学生"
      :visible.sync="dialogVisible2"
      width="30%" :close-on-click-modal="false"
    >
      <el-row style="margin: 5px 10px" class="row">
        <div style="float: left">
          <el-button style="border: 2px solid #4cafe3; background: #008CD7; border-radius: 5px;color: #EAF6FD;" type="text"   v-on:click="addStudent()">
            <i class="el-icon-plus"  ></i>增加学生
          </el-button>
        </div>
      </el-row>
      <el-row class="row">
      <el-table
        :data="tableData1"
        border
        style="width: 99%;margin: 3px 3px;" :cell-style="cellStyle" :header-cell-style="rowClass"
        ref="multipleTable"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80" align="center">
        </el-table-column>
        <el-table-column
          label="学号"
          min-width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.studentNo}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120"  align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="removeStudent(scope.row.studentNo)"><span style="text-decoration-line: underline;font-size: 16px">删除</span></el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-row>
    </el-dialog>
    <el-dialog
      @close="dialogCls"
      :visible.sync="dialogVisible3"
      title="新增学生"
      width="30%" :close-on-click-modal="false"
    >
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="学生" v-model="studentNo" >
        <el-option
          v-for="item in students"
          :key="item.studentNo"
          :label="item.name"
          :value="item.studentNo">
        </el-option>
      </el-select></div>
      <el-button  @click="confirmAdd(studentNo)"  type="primary" >保存并上传</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import commonService from '@/common/service/commonService'

  import Pager from '@/components/pager'
  export default {
    name: "class",
    data(){
      return{
        dialogVisible:false,
        dialogVisible1:false,
        dialogVisible2:false,
        dialogVisible3:false,
        tableData:[],
        tableData1:[],
        studentNo:'',
        students:[],
        orgId:'',
        editClassId:'',
        addClassModel:{
          className:'',
          registerNo:''
        },
        updateClassModel:{
          id:'',
          className:'',
          registerNo:''
        }
      }
    },
    methods:{
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'padding:0px;height:60px;font-size:16px'
      },
      rowClass({ row, rowIndex}) {
        return 'background:#f7f7f7;padding:0px;color:#66b1ff;font-size:16px'
      },
      add:function(){
        this.dialogVisible=true;
      },
      update(row) {
        this.dialogVisible1=true;
        this.updateClassModel.id=row.id;
        this.updateClassModel.className=row.className;
      },
      save(){
        commonService.addClass(this.addClassModel).then(res=>{
          console.info("添加成功");
          this.search();
        })
      },
      removeStudent(studentNo){
        var param={}
        param['studentNo']=studentNo;
        param['classId']=this.editClassId;
        commonService.removeStudentFromClass(param).then(res=>{
          this.searchStudent()
        })
      },
      confirmAdd(studentNo){
        var param={}
        param['studentNo']=studentNo;
        param['classId']=this.editClassId;
        commonService.addStudentToClass(param).then(res=>{
          this.searchStudent()
        })
      },
      modify(){
        commonService.modifyClass(this.updateClassModel).then(res=>{
          console.info("修改成功");
          this.search()
        })
      },
      searchStudent(){
        var param = {};
        param['classId']=this.editClassId;
        commonService.searchStudentByPage(param,1, 100).then(res => {
          if (res == null) {
            this.tableData1=[];
          } else {
            this.tableData1=res.data.data.list;
          }
        })
      },
      editStudent(id){
        this.editClassId=id;
        this.searchStudent();
        this.dialogVisible2=true;
      },
      dialogCls:function () {
        this.addClassModel.className='';
        this.updateClassModel.className=''
        this.studentNo=''
      },
      search(){
        commonService.getClassByRegisterNo(sessionStorage.getItem('registerNo')).then(res=>{
          this.tableData=res.data.data;
        })
      },
      addStudent(){
        commonService.getOrgId(sessionStorage.getItem('registerNo')).then(res=>{
          this.orgId=res.data.data;
        })
        var param = {};
        param['orgId']=this.orgId;
        commonService.searchStudentByPage(param,1,10000).then(res=>{
          this.students=res.data.data.list;
          for(var i = 0; i <  this.students.length; i++) {
            this.students[i]["value"] =this.students[i]['studentNo'];//'text'是需要的字段
            if(this.students[i]["classId"]!=0){
              this.students.splice(i,1)
            }
          }

        });
        this.dialogVisible3=true
      },
    },
    created:function () {
      this.addClassModel.registerNo=sessionStorage.getItem('registerNo');
      this.updateClassModel.registerNo=sessionStorage.getItem('registerNo')
      commonService.searchTeacherByPage({"teacherNo":sessionStorage.getItem('registerNo')},1,5).then(res=>{
        this.orgId=res.data.data.list[0].orgId;
        }
      )
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
  .text {
    font-size: 16px;
  }
  .row{
    border-top:1px solid #EBEBEB;
    min-height: 55px;
    line-height: 55px;
  }
</style>

