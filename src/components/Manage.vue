<template>
  <div>
    <headcommon  v-bind:manageIndex="3"></headcommon>
    <!-- 筛选条件行-->
    <el-row :gutter="20">
      <!-- 中间筛选条件列-->
      <el-col :span="18" offset="3">
        <el-row :gutter="10">
          <!--左侧栏-->
          <el-col :span="5">
            <el-card :body-style="{ padding: '0px' }">
              <div v-for="o in manageTypes" :key="o" class="text leftItem"
                   v-bind:class="{leftItemClick:currentManageType==o}"
                   v-on:click="chooseType(o)"
              >
                <el-row class="row">
                  <el-col :span="12" style="text-align: left; ">
                    <el-button type="text" style="margin-left: 10px;color: #505050">{{ o.text }}</el-button>
                  </el-col>
                  <el-col :span="12" style="text-align: right">
                    <el-button type="text" style="margin-right: 10px; color: #505050">></el-button>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>

          <!--搜索条件栏-->
          <el-col :span="19">
          <router-view></router-view>

          </el-col>
        </el-row>
      </el-col>
      <!-- 右侧空白列-->
      <el-col :span="3"><div class="grid-content"></div></el-col>

    </el-row>


  </div>
</template>

<script>
  import { manageTypes} from '@/common/js/knowledgeManage'
  import Head from '@/components/head'
  import commonService from '@/common/service/commonService'
  export default {
    name: "Manage",
    data(){
      return{
        currentManageType:'',
        manageTypes:manageTypes
      }
    },
    components:{
      headcommon: Head
    },
    methods:{
      chooseType:function(o){
        this.currentManageType=o;
        switch(o.index){
          case '1':
            this.$router.push('/org');
            break;
          case '2':
            this.$router.push('/studentmanage')
            break;
          case '3':
            this.$router.push('/teachermanage')
            break;
          case '4':
            this.$router.push('/KnowledgeManage');
            break;
          case '5':
            this.$router.push('/knowledgeTreeManage');

            break;
          case '6':
            this.$router.push('/subjectManage')

            break;
        }
      },
      //搜索自动组装参数
      getParam:function () {
        var param = {};
        return param;
      },
    },

    created:function () {
      commonService.Connect().then(res=>{

      });

    }
  }
</script>

<style>
  @import "Manage.css";
</style>

