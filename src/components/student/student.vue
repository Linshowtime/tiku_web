<template>
  <el-row class="container">
    <el-col :span="18" class="header" offset="3">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="9">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="this.auth==0" @click.native="authUser">点击认证</el-dropdown-item>
            <el-dropdown-item v-else style="color:silver">已认证</el-dropdown-item>
            <el-dropdown-item divided @click.native="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="3"><div class="grid-content"></div></el-col>
    </el-col>
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
    <el-dialog
      @close="dialogCls"
      title=身份认证
      :visible.sync="dialogVisible1"
      width="30%" :close-on-click-modal="false"
    >
      <el-input v-model="studentNo"  placeholder="请输入学号完成认证"style="margin-bottom: 15px" ></el-input>
      <el-button  @click="confirmAuth(studentNo)"  type="primary" >开始认证</el-button>
    </el-dialog>
    <el-dialog
      @close="dialogCls"
      title=密码修改
      :visible.sync="dialogVisible2"
      width="30%" :close-on-click-modal="false"
    >
      <el-input v-model="password"  placeholder="请输入新密码"style="margin-bottom: 15px" ></el-input>
      <el-button  @click="confirmChange(password)"  type="primary" >确认修改</el-button>
    </el-dialog>
  </el-row>
</template>

<script>
  import { manageTypes} from '@/common/js/student'
  import commonService from '@/common/service/commonService'
  export default {
    data() {
      return {
        sysName:'学生端',
        collapsed:false,
        sysUserName: '',
        sysUserAvatar: '../../../static/imgs/avtar.jpeg',
        manageTypes:manageTypes,
        currentManageType:'',
        auth: 0,
        dialogVisible1:false,
        dialogVisible2:false,
        studentNo:'',
        password:''

      }
    },
    methods: {
      chooseType:function(o){
        this.currentManageType=o;
        switch(o.index){
          case '1':
            this.$router.push('/exam');
            break;
          case '2':
            this.$router.push('/exercise')
            break;
          case '3':
            this.$router.push('/wrong')
            break;
          case '4':
            this.$router.push('/notes');
         break;
        }
      },
      authUser:function(){
      this.dialogVisible1=true;
      },
      changePassword:function(){
        this.dialogVisible2=true;
        this.password=''
      },
      confirmChange:function(password){
        var param={};
        if(password.length>0){
          param['password']=password;
        }else{
          alert("请输入新密码");
          return;
        }
        if(this.sysUserName.length>0){
          param['registerNo']=this.sysUserName;
        }else{
          alert("请重新登录");
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('registerNo');
          sessionStorage.removeItem('auth');
          this.$router.push('/login');
          return;
        }
        commonService.updateUser(param).then(res=>{
          this.dialogVisible2=false;
        })
      },
      confirmAuth:function(studentNo){
        var param={};
        if(studentNo.length>0){
          param['studentNo']=studentNo;
        }else{
          alert("请输入学号");
          return;
        }
        if(this.sysUserName.length>0){
          param['registerNo']=this.sysUserName;
        }else{
          alert("请重新登录");
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('registerNo');
          sessionStorage.removeItem('auth');
          this.$router.push('/login');
          return;
        }
        commonService.authStudent(param).then(res=>{
          if(res.data.code==0) {
            this.auth = 1;
            sessionStorage.setItem('auth', 1);
          }
          else {
            alert(res.data.msg);
          }
          this.dialogVisible1=false;
        });
      },
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('registerNo');
          sessionStorage.removeItem('auth');
          _this.$router.push('/login');
        }).catch(() => {
        });
      },
      //折叠导航栏
      collapse:function(){
        this.collapsed=!this.collapsed;
      },
      showMenu(i,status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
      }
    },
    mounted() {
      commonService.Connect().then(res=>{

      });
        this.sysUserName = this.$route.query.registerNo;
        if(this.sysUserName==null||this.sysUserName==''){
          this.sysUserName=sessionStorage.getItem('registerNo');
        }
        if(sessionStorage.getItem('auth')!=null){
          this.auth=sessionStorage.getItem('auth');
        }
    }
  }
</script>

<style scoped lang="scss">

  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: #20a0ff;;
      color:#fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        //width:230px;
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width:230px;
      }
      .logo-collapse-width{
        width:60px
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex:0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:60px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }
        }
      }
      .menu-collapsed{
        flex:0 0 60px;
        width: 60px;
      }
      .menu-expanded{
        flex:0 0 230px;
        width: 230px;
      }
      .content-container {
        // background: #f1f2f7;
        flex:1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 230px;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          //margin-bottom: 15px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
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

  @import "student.css";
</style>
