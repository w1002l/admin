<template>
  <div id="login-container">
    <!-- 公司名称 -->
    <div class="company-name">
      <p>安徽科创中光科技有限公司用户管理系统</p>
    </div>
    <!-- 登录表单 -->
    <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" class="login-form">
      <el-form-item prop="userCode">
        <el-input v-model="loginFormData.userCode" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginFormData.password" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item class="btn-group">
        <el-button type="info" @click="resetLoginForm">重置</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFormData: {
        userCode: 'phs',
        password: '123456'
      },
      loginFormRules: {
        userCode: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async vaild => {
        if (vaild) {
          var formData = new FormData()
          formData.append('userCode', 'phs')
          formData.append('password', '123456')
          await this.$axios.post('auth/login', formData).then(res => {
            if (res.status == 200) {
              console.log(res)

              this.$message({
                message: '登录成功',
                type: 'success'
              })
              window.sessionStorage.setItem('token', res.data.data.token)
              this.$router.push('/home')
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#login-container {
  min-width: 400px;
  width: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ddd url(../assets/bg.png) no-repeat center;
  background-size: cover;
  .company-name {
    position: absolute;
    top: 20px;
    left: 30px;
    font-size: 30px;
    color: #fff;
    text-shadow: 0px 0px 4px #fff;
  }
  .login-form {
    box-sizing: border-box;
    width: 400px;
    padding: 5rem 2rem 0 2rem;
    background-color: #e4edf4;
    position: absolute;
    top: 35%;
    left: 60%;
    // transform: translate(-50%, -50%);
    border-radius: 20px;
    .btn-group {
      display: flex;
      justify-content: flex-end;
    }
  }
  .login-form::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -140%);
    width: 150px;
    height: 150px;
    background: #fff url(../assets/login.jpeg) no-repeat center;
    background-size: 100%;
    border-radius: 50%;
    box-shadow: 0px 0px 20px 10px #ddd;
  }
}
</style>
<style lang="less">
// 设置icon图标
.el-icon-lock,
.el-icon-user {
  font-size: 15px;
  font-weight: 500;
}

// 去掉校验的红星
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  content: '';
  width: 0px;
  margin-right: 0px;
}
</style>