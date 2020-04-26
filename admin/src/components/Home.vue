<template>
  <div id="container">
    <el-container>
      <el-header>
        <div class="text">
          <img src="../assets/logo.png" alt />
          <span>用户管理系统</span>
        </div>
        <el-button type="primary" :icon="isCollapse? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"  circle @click="toggleCollapse"></el-button>
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
        <el-aside :width="isCollapse? '64px' : '250px'">
          <el-row class="tac">
            <el-col>
              <el-menu
                router
                :default-active="this.$router.path"
                class="el-menu-vertical-demo"
                background-color="#4E73DF"
                text-color="#fff"
                active-text-color="#ffd04b"
                :collapse="isCollapse"
                :collapse-transition="false"
              >
                <hr class="sidebar-divider my-0" />
                <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                  <template slot="title">
                    <i :class="icons[item.id]"></i>
                    <span>{{item.authName}}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      :index="subItem.path"
                      v-for="subItem in item.children"
                      :key="subItem.id"
                    > 
                      <i class="el-icon-set-up"></i>
                      <span>{{subItem.authName}}</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <hr class="sidebar-divider my-0" />
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
    return {
      isCollapse: false,
      menulist: [
        {
          id: 1,
          authName: '用户管理',
          children: [
            {
              id: 1,
              authName: '用户列表',
              path: '/userlist'
            }
          ]
        },
        {
          id: 2,
          authName: '设备管理',
          children: [
            {
              id: 2,
              authName: '设备列表',
              path: '/shebei'
            }
          ]
        }
      ],
      icons: 
        {
          '1': 'el-icon-s-custom',
          '2': 'el-icon-bangzhu'
        }
      
    }
  },
  methods: {
    loginOut() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
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
.el-button.is-circle {
  position: absolute;
  top: 10px;
  left: 260px;
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
  background-color: #4e73df;
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
      width: 50px;
      height: 50px;
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
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin: 0 1.5rem 1rem;
}
.my-0 {
  margin-bottom: 0 !important;
}
</style>