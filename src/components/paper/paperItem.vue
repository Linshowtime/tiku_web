<template>
  <div class="paperList" v-bind:class="{active: parentPapers.total==null || parentPapers.total==0}">
    <div class="totalNum">共{{parentPapers.total==null?0:parentPapers.total}}份相关试卷</div>
    <div v-for="paper in parentPapers.list" class="paperItem">
      <el-button type="text" v-on:click="goto(paper.id)"><div class="paperItemName" v-html="cssFormat(paper.name) "></div></el-button>
      <div class="paperItemScore">
        <el-row>
          <el-col :span="9">
            <div style="margin-left: 10px;">
              试卷类型:<span v-if="paper.typename!=null">{{paper.typename}}</span>
              <span v-else>无类型</span>
            </div>

          </el-col>
          <el-col :span="15"  style="text-align: right;">
            <!--<div style="border: 1px solid #1292D3; margin: 3px; border-radius:5px; background-color: #F3F7F8">
              <el-button type="text" style="height: max-content"><i class="el-icon-document"></i>试卷分析</el-button>
            </div>-->
            <div style="margin-right: 10px;">创建时间:<span v-html="changetime(paper.createdate)"></span></div>

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
          cssFormat:function (htmlStr) {
            if(!htmlStr){
              return ''
            }

            return htmlStr.replace('align="center"','');
          },
          changetime:function(time){

           return time.substring(0,19).replace('T',' ');
          },
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
