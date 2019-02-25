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
              <span>{{scope.row.name}}</span>
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
                v-if="scope.row.state==0"
                size="mini"
                type="text"><span style="color: red;font-size: 16px;text-decoration-line: underline;">开始考试</span></el-button>
              <el-button
                v-else
                size="mini"
                type="text"
                @click="reuse(scope.$index, scope.row)" ><span style="text-decoration-line: underline;font-size: 16px">查看结果</span></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <pager v-bind:totalPage="pages"  v-on:gotoNext="nextPage"></pager>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import commonService from '@/common/service/commonService'
  import knowledgeService from '@/common/service/knowledgeService'
  import Pager from '@/components/pager'
  export default {
    name: "exam",
    data(){
      return{
        pages:1,
        currentPage:1,  //当前页
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
        tableData:[{
          name:'附小六年级数学单元测试一',
          startTime: '2019-2-26 12:00',
          endTime: '2019-2-26 14:00',
          state:0
        },
          {
            name:'附小六年级英语单元测试一',
            startTime: '2019-2-26 15:00',
            endTime: '2019-2-26 17:00',
            state:0
          },
          {
            name:'附小六年级语文单元测试一',
            startTime: '2019-2-26 18:00',
            endTime: '2019-2-26 20:00',
            state:1
          }],
      }
    },
    methods:{
      cellStyle({row, column, rowIndex, columnIndex}){
        return 'padding:0px;height:60px;font-size:16px'
      },
      rowClass({ row, rowIndex}) {
        return 'background:#f7f7f7;padding:0px;color:#66b1ff;font-size:16px'
      }
    },
    components:{
      pager:Pager
    },
    created:function () {

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

