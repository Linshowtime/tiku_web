<template>
  <div>
    <el-card  :body-style="{ padding: '0px' }">
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
            label="试卷名称"
            min-width="80" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="120"  align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="add(scope.row)"><span style="text-decoration-line: underline;font-size: 16px">发起考试</span></el-button>
              <el-button
                size="mini"
                type="text"
                @click="see(scope.row)"><span style="text-decoration-line: underline;font-size: 16px">查看考试情况</span></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <el-dialog
      @close="dialogCls"
      :visible.sync="dialogVisible"
      title="发起考试"
      width="30%" :close-on-click-modal="false"
    >
      <div style="height: 100%;text-align: left;margin-bottom: 15px"><el-select placeholder="班级" v-model="addExam.classId" >
        <el-option
          v-for="item in classs"
          :key="item.id"
          :label="item.className"
          :value="item.id">
        </el-option>
      </el-select></div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px">
      <el-date-picker
        v-model="addExam.startTime"
        type="date"
        placeholder="开始日期"
        :picker-options="pickerOptions0">
      </el-date-picker>
      </div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px">
      <el-date-picker
        v-model="addExam.endTime"
        type="date"
        placeholder="结束日期"
        :picker-options="pickerOptions1">
      </el-date-picker>
      </div>
      <div style="height: 100%;text-align: left;margin-bottom: 15px">
        <el-input v-model="addExam.totalTime"  placeholder="输入考试总时长(以分钟为单位)" style="margin-bottom: 15px" @blur="BlurText($event)"></el-input>
      </div>
      <el-button  @click="confirmAdd()"  type="primary" >分配该班级进行考试</el-button>
    </el-dialog>

    <el-dialog
      @close="dialogCls"
      :visible.sync="dialogVisible1"
      title="考试情况"
      width="50%" :close-on-click-modal="false"
    >
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
            <span>{{scope.row.studentName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="100"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state==0">未开始</span>
            <span v-if="scope.row.state==1">已完成</span>
          </template>
        </el-table-column>
        <el-table-column label="得分" min-width="100"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state==0">***</span>
            <span v-if="scope.row.state==1">{{scope.row.score}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100"  align="center">
          <template slot-scope="scope">
               <el-button
                 v-if="scope.row.state==1"
                 size="mini"
                 type="text"
                 @click="look(scope.row.id)" ><span style="color: red;text-decoration-line: underline;font-size: 16px">查看详情</span></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import commonService from '@/common/service/commonService'
  import testPaperService from '@/common/service/testPaperService'
  export default {
    name: "paper",
    data () {
      return {
        dialogVisible:false,
        dialogVisible1:false,
        tableData: [],
        tableData1:[],
        classs:[],
        orgId: '',
        addExam:{
          paperId:'',
          classId:'',
          startTime:'',
          endTime:'',
          totalTime:''
        },
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.addExam.endTime != "") {
              return time.getTime() <Date.now() -1*24*60*60*1000|| time.getTime() >= this.this.addExam.endTime;
            } else {
              return time.getTime() <Date.now()- 1*24*60*60*1000;
            }

          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() < this.addExam.startTime || time.getTime() <Date.now()- 1*24*60*60*1000;
          }
        }
      }
      }
    ,
    methods: {
      cellStyle ({row, column, rowIndex, columnIndex}) {
        return 'padding:0px;height:60px;font-size:16px'
      },
      rowClass ({row, rowIndex}) {
        return 'background:#f7f7f7;padding:0px;color:#66b1ff;font-size:16px'
      },
      BlurText(e){
        let boolean = new RegExp("^[1-9][0-9]*$").test(e.target.value)
        if(!boolean&e.target.value!=''){
         this.$message.warning("请输入整数")
          e.target.value=''
        }
      },
      look(id){
        this.$router.push({
          path: '/result',
          query: {
            recordId: id
          }
        })
      },
      add: function (row) {
        this.dialogVisible = true;
        this.addExam.paperId = row.id;
      },
      confirmAdd()
      {
        testPaperService.addExamRecord(this.addExam).then(res=>{
          alert("发布成功")
        })
      }  ,
      see:function(row){
        var param={};
        param["paperId"]=row.id;
        param["type"]=0;
        param["registerNo"]=sessionStorage.getItem('registerNo')
        testPaperService.searchExamRecord(param).then(res=>{
          this.tableData1=res.data.data;
        })
        this.dialogVisible1 = true;
      },
      dialogCls: function () {
        this.addExam.totalTime=''
      }
    },
      created: function () {
        commonService.getOrgId(sessionStorage.getItem('registerNo')).then(res=>{
          this.orgId=res.data.data;
          var param={};
          param['orgId']=this.orgId;
          param['state']=1;
          testPaperService.searchTestPaperByPage(param,1,100).then(res=>{
            this.tableData =res.data.data.list;
          })
          }
        )
        commonService.getClassByRegisterNo(sessionStorage.getItem('registerNo')).then(res=>{
          this.classs=res.data.data;
        })

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

