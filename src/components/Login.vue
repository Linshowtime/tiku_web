<template>
  <div >

  <el-main  :style="note">
    <el-form
      :model="LoginForm"
      ref="LoginForm"
      :rules="rule"
      label-width="0"
      class="login-form">
      <h3>用户登录/题库</h3>

      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="LoginForm.username"
          placeholder="username" >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="LoginForm.password"
          placeholder="password" >
        </el-input>
      </el-form-item>
      <el-form-item prop="role">
        <el-radio-group v-model="LoginForm.role">
          <el-radio :label="1">管理员</el-radio>
          <el-radio :label="2">学生</el-radio>
          <el-radio :label="3">教师</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item >
        <el-button
          type="danger"
          class="submitBtn"
          round
          @click.native.prevent="submit"
          :loading="logining">
          登录
        </el-button>
        <el-button
          type="primary"
          class="resetBtn"
          round
          @click.native.prevent="reset">
          重置
        </el-button>
        <hr>
        <p>还没有账号，马上去<span class="to" @click="toregin">注册</span></p>
      </el-form-item>
    </el-form>
  </el-main>
    <div class="login_copyright">
      <span>&copy;2018-2022<a href="">LinShowTime</a>版权所有</span>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        note: {
          backgroundImage: "url(" + require("../../static/imgs/timg.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition:"center",
          backgroundAttachment:"fixed",


        },
        LoginForm: {
          username: '',
          password: '',
          role:2
        },
        logining: false,
        rule: {
          username: [
            {
              required: true,
              max: 14,
              min: 7,
              message: '用户名是必须的，长度为7-14位',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '密码是必须的！',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      // ...
      submit () {
        this.$refs.LoginForm.validate(valid => {
          if (valid) {
            this.logining = true
            // console.log('开始请求后台数据，验证返回之类的操作！')
            // 登录作为参数的用户信息
            let LoginParams = {
              username: this.LoginForm.username,
              password: this.LoginForm.password
            }
            // 调用axios登录接口
          } else {
            console.log('submit err')
          }
        })
      },
      reset () {
        this.$refs.LoginForm.resetFields()
      },
      toregin () {
        this.$router.push('/regin')
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
