<template>
  <div>
    <div style="display: none">{{index=initIndex}}{{ManageIndex=manageIndex}}</div>
    <el-row style="text-align: left;">
      <el-col :span="3"><div class="grid-content"></div></el-col>
      <el-col :span="7">
        <div>
          <img src="static/imgs/logo.png">
        </div>
      </el-col>
      <el-col :span="6" :gutter="1">
        <el-button type="text" :class="{topActive:ManageIndex == 3}"  style="color: black;margin-left:10%;font-size: 15px;" v-on:click="Select(3)">题库管理</el-button>
        <el-button type="text"  :class="{topActive:ManageIndex == 2}" style="color: black;margin-left: 10%;font-size: 15px;" v-on:click="Select(2)">试卷管理</el-button>
        <el-button type="text"  :class="{topActive:ManageIndex == 1}" style="color: black;margin-left:10%;font-size: 15px;"v-on:click="Select(1)">在线组卷</el-button>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="3"><div class="grid-content"></div></el-col>
    </el-row>

    <el-row >
      <div v-if="manageIndex!=3&&manageIndex!=2">
      <el-col :span="3"><div class="grid-content" ></div></el-col>
      <el-col :span="9" :class="{active:index == 1}" class="tab-header"style="min-height: 52px;"><div class="grid-content" v-on:click="tabSelect(1)">按产品选题</div></el-col>
      <el-col :span="9" :class="{active:index == 2}" class="tab-header"style="min-height: 52px;"><div class="grid-content" v-on:click="tabSelect(2)">按知识点选题</div></el-col>
      <!--<el-col :span="6" :class="{active:index == 3}" style="min-height: 52px;"><div class="grid-content" v-on:click="tabSelect(3)">按大型考试卷选题</div></el-col>-->
      <el-col :span="3"><div class="grid-content"></div></el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {ElRow},
    props:['initIndex','manageIndex'],
    data(){
      return {
        msg: 'Use Vue 2.0 Today!',
        index:1,
        ManageIndex:1
      }
    },
    methods: {
      tabSelect: function (num) {
        //this.index = num;
        if(num == 1){
          this.$router.push({name: 'home'});
        }

        if(num == 2){
          this.$router.push({name: 'knowledgeSubject'});
        }
        // if(num == 3){
        //   this.$router.push({name: 'examPaper'});
        // }
        //const { href } = this.$router.resolve({
          //name: 'knowledgeSubject'
        //})
        //window.open(href)
      },
      Select: function (num) {
        if(num == 1){
          this.$router.push({name: 'knowledgeSubject'});
        }

        if(num == 2){
          this.$router.push({name: 'paperManage'});
        }
        if(num == 3){
          this.$router.push({name: 'manage'});
        }

      }
    }
  }
</script>

<style scoped>

  @import "home.css";

</style>
