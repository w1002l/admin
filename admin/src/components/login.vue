<template>
  <div id="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginFormData"
      :rules="loginFormRules"
      label-width="40px"
      class="login-form"
    >
      <el-form-item label="账户" prop="name">
        <el-input v-model="loginFormData.name" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginFormData.password" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item class="btn-group">
        <el-button type="info" @click="resetLoginForm">重置</el-button>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFormData: {
        name: 'dzq',
        password: '123456'
      },
      loginFormRules: {
        name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="less" scoped>
// 加粗label中的文字
/deep/.el-form-item__label {
  font-weight: bold;
}
// 设置icon图标
/deep/.el-icon-lock {
  font-size: 15px;
  font-weight: 500;
}
/deep/.el-icon-user {
  font-size: 15px;
  font-weight: 500;
}
// 去掉校验的红星
/deep/.el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  content: '';
  width: 0px;
  margin-right: 0px;
}
#login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ddd;
  .login-form {
    box-sizing: border-box;
    width: 500px;
    padding: 5rem 2rem 0 2rem;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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