<template>
  <div class="paperList" v-bind:class="{active: parentPapers.record_total==null || parentPapers.record_total==0}">
    <div class="totalNum">共{{parentPapers.record_total==null?0:parentPapers.record_total}}份相关试卷</div>
    <div v-for="paper in parentPapers.list" class="paperItem">
      <el-button type="text" v-on:click="goto(paper.id)">{{paper.name}}</el-button>
      <div class="paperItemScore">
        <el-row>
          <el-col :span="9">
            <div style="margin-left: 10px;">
              试卷类型:<span v-if="paper.typeName!=null">{{paper.typeName}}</span>
              <span v-else>无类型</span>
            </div>

          </el-col>
          <el-col :span="15"  style="text-align: right;">
            <!--<div style="border: 1px solid #1292D3; margin: 3px; border-radius:5px; background-color: #F3F7F8">
              <el-button type="text" style="height: max-content"><i class="el-icon-document"></i>试卷分析</el-button>
            </div>-->
             <div style="margin-right: 10px;">创建时间:{{paper.createDate}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";

    export default {
      components: {ElRow},
      name: "paper-item",
        props:['parentPapers'],
        methods:{
          goto:function (paperId) {
            this.$router.push({
              path: '/paperSelect',
              query: {
                paperId: paperId
              }
            })


          }
        }
    }
</script>

<style scoped>
.paperItem{
  border:1px solid #EBEBEB;
  margin: 10px;
  min-height: 80px;
  text-align: left;
}
.paperList{
  border:1px solid #EBEBEB;
}
  .paperItemName{
    min-height: 50px;
    line-height:50px;
    color: #1794D8;
    text-decoration: underline;
    font-size: 16px;
    margin-left: 10px;
  }
  .paperItemScore{
    min-height: 40px;
    background: #FAFAFA;
    line-height:40px;
    border-top: 1px solid #EBEBEB;
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
