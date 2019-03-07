<template>
  <div>
    <el-card  :body-style="{ padding: '0px' }">
      <el-row class="row">
        <el-table
          :data="tableData"
          border
          style="width: 99%;margin: 3px 3px;" :cell-style="cellStyle" :header-cell-style="rowClass"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80" align="center">
          </el-table-column>
          <el-table-column
            label="试卷名称"
            min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.paperName}}</span>
              </template>
          </el-table-column>
          <el-table-column
            label="开始时间"
            min-width="75" align="center">
            <template slot-scope="scope">
            <span style="font-size: 15px">{{scope.row.startTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="截止时间"
            min-width="75" align="center">
            <template slot-scope="scope">
            <span style="font-size: 15px">{{scope.row.endTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"  min-width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1" >已完成</span>
              <span v-if="scope.row.state==0">未完成</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="120"  align="center">
            <template slot-scope="scope">
              <el-button
              v-if="scope.row.state==0&&compareTime(scope.row.startTime,scope.row.endTime)"
              size="mini"
              type="text" @click="goto(scope.row)"><span style="color: red;font-size: 16px;text-decoration-line: underline;">进入考试</span></el-button>
              <el-button
                v-if="!compareTime(scope.row.startTime,scope.row.endTime)"
                size="mini"
                type="text"><span style="color: red;font-size: 16px;">不在考试时间内</span></el-button>
              <el-button
                size="mini"
                type="text"
                v-if="scope.row.state==1"
                @click="look(scope.row.id)" ><span style="text-decoration-line: underline;font-size: 16px">查看结果</span></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import testPaperService from '@/common/service/testPaperService'
  export default {
    name: "exam",
    data(){
      return{
        tableData:[
        //   {
        //   name:'附小六年级数学单元测试一',
        //   startTime: '2019-2-26 12:00',
        //   endTime: '2019-2-26 14:00',
        //   state:0
        // },
        //   {
        //     name:'附小六年级英语单元测试一',
        //     startTime: '2019-2-26 15:00',
        //     endTime: '2019-2-26 17:00',
        //     state:0
        //   },
        //   {
        //     name:'附小六年级语文单元测试一',
        //     startTime: '2019-2-26 18:00',
        //     endTime: '2019-2-26 20:00',
        //     state:1
        //   }
          ],
      }
    },
    methods:{
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'padding:0px;height:60px;font-size:16px'
      },
      rowClass({row, rowIndex}) {
        return 'background:#f7f7f7;padding:0px;color:#66b1ff;font-size:16px'
      },
      goto(row){
        this.$router.push({
          name: 'onExam',
          params: {
            paperId: row.paperId,
            totalTime: row.totalTime,
            recordId: row.id
          }
        })
      },
      compareTime(time1,time2){
    var time = Date.parse( new Date());
    var date1 = Date.parse(new Date(time1.replace(/-/g, '/')));
    var date2 = Date.parse(new Date(time2.replace(/-/g, '/')));
    if (date1<time&&date2>time) {
      return true;
    };
    return false;
  },
      look(id){
        this.$router.push({
          path: '/result',
          query: {
            recordId: id
          }
        })
      }
    },
    created:function () {
      var param={};
      param["type"]=1;
      param["registerNo"]=sessionStorage.getItem('registerNo')
      testPaperService.searchExamRecord(param).then(res=>{
        this.tableData=res.data.data;
      })
    }
  }
</script>
<style >
  .row{
    border-top:1px solid #EBEBEB;
    min-height: 55px;
    line-height: 55px;
  }
</style>

