<template>
  <div id="container">
    <el-container>
      <el-header>
        <div class="text">
          <img src="../assets/logo.png" alt />
          <span>用户管理系统</span>
        </div>
        <div class="chathead">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img src="../assets/login.jpeg" alt />
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix">个人信息</el-dropdown-item>
              <el-dropdown-item class="clearfix" @click="loginOut">
                <span @click="loginOut">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-row class="tac">
            <el-col>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#4E73DF"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <hr class="sidebar-divider my-0" />
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">用户列表</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <hr class="sidebar-divider my-0" />
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-s-help"></i>
                    <span>设备管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">设备列表</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <hr class="sidebar-divider my-0" />
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-s-help"></i>
                    <span>设备管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">设备列表</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <hr class="sidebar-divider my-0" />
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-s-help"></i>
                    <span>设备管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">设备列表</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    loginOut() {
      this.$router.push('/')
    },
  }
}
</script>

<style lang="less" scoped>
#container {
  background-color: #f8f9fc;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
}
.el-icon-caret-bottom {
  vertical-align: 12px;
}
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
}
.el-menu {
  border-right: 0;
}
.el-row {
  height: 100%;
  background-color: #4E73DF;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  background-color: #fff;
  box-shadow: 0px 5px 10px #ddd;
  color: #fff;
  .text {
    width: 250px;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #4e73df;
    font-size: 30px;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .chathead {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
.sidebar-divider {
  border: none;
  border-top: 1px solid rgba(255,255,255,.15);
  margin: 0 1.5rem 1rem;
}
.my-0 {
    margin-bottom: 0!important;
}
</style>