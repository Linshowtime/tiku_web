<template>
  <div >
  <el-main  :style="note">
    <el-form
      :model="RegisterForm"
      ref="RegisterForm"
      :rules="rule"
      label-width="0"
      class="login-form">
      <h3>用户注册/题库</h3>

      <el-form-item prop="registerNo">
        <el-input
          type="text"
          v-model="RegisterForm.registerNo"
          placeholder="请输入账号" >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="RegisterForm.password"
          placeholder="请输入密码" >
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          type="phone"
          v-model="RegisterForm.phone"
          placeholder="请输入手机号码" >
        </el-input>
      </el-form-item>
      <el-form-item prop="msgNum">
        <el-input style="float: left;width: 50%"
          type="msgNum"
          v-model="RegisterForm.msgNum"
          placeholder="请输入验证码" >
        </el-input>
        <el-button  @click.native.prevent="getMsgNum" type="info" :disabled="!show" size="small"> {{message}}  </el-button>
      </el-form-item>
      <el-form-item prop="role">
        <el-radio-group v-model="RegisterForm.role">
          <el-radio :label="0">学生</el-radio>
          <el-radio :label="1">教师</el-radio>
          <el-radio :label="2">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item >
        <el-button
          type="primary"
          class="submitBtn"
          round
          @click.native.prevent="submit"
          :loading="logining">
          注册
        </el-button>
        <hr>
        <p>已有账号，马上去<span class="to" @click="tologin">登录</span></p>
      </el-form-item>
    </el-form>
  </el-main>
    <div class="login_copyright">
      <span>&copy;2018-2022<a href="">LinShowTime</a>版权所有</span>
    </div>

  </div>
</template>

<script>
  import CommonService from '@/common/service/commonService'
  export default {
    data () {
      return {
        wait: 60,
        message: '免费获取验证码',
        hash: '',
        tamp: '',
        show: true,
        note: {
          backgroundImage: "url(" + require("../../static/imgs/timg.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition:"center",
          backgroundAttachment:"absolute",
        },
        RegisterForm: {
          registerNo: '',
          password: '',
          phone:'',
          role: 2,
          msgNum:''
        },
        logining: false,
        rule: {
          registerNo: [
            {
              required: true,
              max: 14,
              min: 7,
              message: '账号是必须的，长度为7-14位',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '密码是必须的！',
              trigger: 'blur'
            }
          ],
          role: [
            {
              required: true,
              message: '角色是必选的！',
              trigger: 'blur'
            }
          ],
          msgNum: [
            {
              required: true,
              message: '验证码是不能为空！',
              trigger: 'blur'
            }
          ],
          phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { type: 'string', min: 11, max:11,message: '手机号必须为11位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // ...
      submit () {
        this.$refs.RegisterForm.validate(valid => {
          if (valid) {
            this.logining = true
            var that = this
            // 登录作为参数的用户信息
            let RegisterParams = {
              registerNo: this.RegisterForm.registerNo,
              password: this.RegisterForm.password,
              phone: this.RegisterForm.phone,
              role: this.RegisterForm.role
            }
            let validateParams = {
              tamp  : this.tamp,
              hash : this.hash,
              msgNum : this.RegisterForm.msgNum
            }
            CommonService.validateNum(validateParams).then(res=>{
              if(res.data.code ==0){
                // 调用axios注册接口
                CommonService.register(RegisterParams).then(res=>{
                   if (res.data.code ==0) {
                     alert("注册成功");
                   }
                   else{
                     alert(res.data.msg);
                   }
                }
                )
              }
              else{
                alert(res.data.msg);
              }
              that.logining = false
            })
          } else {
            console.log('submit err')
          }
        })
      },
      tologin () {
        this.$router.push('/login')
      },
      getMsgNum() {
        var phoneNumber = this.RegisterForm.phone;
        var that =this ;
        this.setButtonStatus(); // 设置按钮倒计时
        var obj = {
          phoneNumber: phoneNumber
        };
        CommonService.sendMsg(obj).then(res=>{
      //   alert(JSON.stringify(res.data));
          that.hash=res.data.hash;
          that.tamp=res.data.tamp;
        })

      },
      setButtonStatus() {
        var that=this;
        if (this.wait == 0) {
          this.message="免费获取验证码";
          this.show = true;
          this.wait = 60;
        } else {
          this.message=this.wait+"秒后可以重新发送";
          this.show=false;
          this.wait--;
          setTimeout(function() {
            that.setButtonStatus()
          }, 1000)
        }
      }
    }
  }
</script>

<style scoped>

  .login-form {
    margin: 20px auto;
    width: 310px;
    background: #fff;
    box-shadow: 0 0 35px #B4BCCC;
    padding: 30px 30px 0 30px;
    border-radius: 25px;
    margin-left: 65%;
    height: 50%;

  }
  .submitBtn {
    width: 65%;
  }
  .to {
    color: #67C23A;
    cursor: pointer;
  }
  .login_copyright{
    margin-top:10px;
  }
  .login_copyright span {
    display: inline-block;
    color: #60819D;
    height: 23px;
    line-height: 23px;
  }
</style>
