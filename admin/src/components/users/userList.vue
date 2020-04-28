<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="公司/用户名称"></el-input>
        </el-form-item>
        <el-select v-model="roleValue" placeholder="选择角色" style="width: 120px;">
          <el-option
            v-for="item in rolelist"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-form-item>
          <el-button type="primary" @click="searchUser">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 用户列表 -->
    <el-table :data="userlist" border stripe>
      <el-table-column type="index" :resizable="false" width="60"></el-table-column>
      <el-table-column prop="userCode" label="账号" :resizable="false" width="120"></el-table-column>
      <el-table-column prop="name" label="姓名" :resizable="false" width="120"></el-table-column>
      <el-table-column prop="customerName" label="公司名称" :resizable="false"></el-table-column>
      <el-table-column prop="roleName" label="角色" :resizable="false" width="150"></el-table-column>
      <el-table-column prop="role" label="角色编码" :resizable="false" width="150"></el-table-column>
      <el-table-column prop="vaildTime" label="有效时间" width="170px">
        <template v-slot="scope">{{ scope.row.vaildTime | dateFormat }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态码" :resizable="false" width="100"></el-table-column>
      <el-table-column prop="lock" label="锁定" :resizable="false" width="100">
        <template v-slot="scope">
          <el-switch v-model="scope.row.lock" @change="userStateChanged(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" :resizable="false">
        <template v-slot="scope">
          <el-button type="primary" size="small" @click="showDetail(scope.row)">查看</el-button>
          <el-button type size="small" @click="showRevise(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pageNumber"
        :page-sizes="[10, 20, 40, 70]"
        :page-size="queryinfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float: right; margin-top: 20px;"
      ></el-pagination>
    </div>

    <!-- 添加成员对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addUserFormRules" ref="addUserFormRef">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth" prop="userCode">
          <el-input v-model="addForm.userCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
          <el-input v-model="addForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPwd">
          <el-input v-model="addForm.checkPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="customerName">
          <el-input v-model="addForm.customerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="value123" placeholder="选择角色" @change="selectRole">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间" :label-width="formLabelWidth">
          <el-input v-model="addForm.vaildTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否锁定" :label-width="formLabelWidth">
          <el-switch v-model="addForm.lock"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">提交</el-button>
      </div>
    </el-dialog>

    <!-- 查看用户详情 -->
    <el-dialog title="用户详情" :visible.sync="dialogTableVisible">
      <el-table :data="userDetail" border stripe>
        <el-table-column prop="customerName" label="公司名称" :resizable="false"></el-table-column>
        <el-table-column prop="userCode" label="账号" :resizable="false"></el-table-column>
        <el-table-column prop="pwd" label="密码" :resizable="false"></el-table-column>
        <el-table-column prop="name" label="姓名" :resizable="false"></el-table-column>
        <el-table-column prop="roleName" label="角色" :resizable="false"></el-table-column>
        <el-table-column prop="role" label="角色编号" :resizable="false"></el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template v-slot="scope">{{ scope.row.createTime | dateFormat }}</template>
        </el-table-column>
        <el-table-column prop="vaildTime" label="有效时间">
          <template v-slot="scope">{{ scope.row.vaildTime | dateFormat }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态码" :resizable="false"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改信息"
      :visible.sync="reviseFormVisible"
      :close-on-click-modal="false"
      style="width: 80%; margin: 0 auto;"
    >
      <el-form :model="modification" label-width="80px" ref="addForm">
        <el-form-item label="公司编号" prop="customerCode">
          <el-input v-model="modification.customerCode" auto-complete="off" placeholder="请输入公司编号"></el-input>
        </el-form-item>
        <el-form-item label="公司角色" prop="role">
          <el-select
            v-model="modification.roleName"
            disabled
            placeholder="请选择"
            size="medium"
            style="width: 100%;"
          >
            <el-option
              v-for="item in rolelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="modification.name" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="code">
          <el-input v-model="modification.userCode" auto-complete="off" placeholder="请设置账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            type="password"
            v-model="modification.password"
            auto-complete="off"
            placeholder="请设置密码,长度20个字符以内"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reviseFormVisible = false">取消</el-button>
        <el-button type="primary" @click="rewrite">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    // 校验两次输入的密码是否一致
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userlist: [], // 存放用户列表数组
      userDetail: [], // 存放单个用户数据
      // modification: {}, // 存放单个用户数据
      roleValue: '',
      addFormVisible: false, // 控制新增页面是否显示
      reviseFormVisible: false, // 控制编辑页面是否显示
      dialogVisible: false,
      formLabelWidth: '80px',
      switchValue: true,
      defaultTime: '',
      dialogTableVisible: false, // 控制查看页面是否显示
      value123: '',
      rolelist: [
        {
          id: '1',
          value: '管理员'
        },
        {
          id: '2',
          value: '运维人员'
        },
        {
          id: '3',
          value: '销售人员'
        },
        {
          id: '4',
          value: '客户领导'
        },
        {
          id: '5',
          value: '客户运维'
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }
        ]
      },

      //添加用户
      addForm: {
        id: '',
        userCode: '',
        customerCode: 'K_KCZG_COM',
        name: '',
        pwd: '',
        checkPwd: '',
        customerName: '',
        roleName: '',
        vaildTime: '',
        lock: '',
        role: '',
        nickName: '',
        status: '',
        deviceType: ''
      },
      // 添加用户校验规则
      addUserFormRules: {
        userCode: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          {
            require: true,
            min: 3,
            max: 10,
            message: '账户名长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            require: true,
            min: 3,
            max: 10,
            message: '姓名长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            require: true,
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        checkPwd: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        customerName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          {
            require: true,
            min: 3,
            max: 10,
            message: '公司名称长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      },
      // 修改用户
      modification: {
        name: '',
        nickName: '',
        status: '',
        lock: '',
        customerCode: '',
        pwd: ''
      },
      // 获取用户数据要传的参数
      queryinfo: {
        customerCodes: 'K_KCZG_COM',
        pageNumer: 1,
        pageSize: 10,
        name: '',
        role: ''
      },
      total: 0 // 总数据条目
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 获取数据，渲染用户列表
    async getUserList() {
      const { data: res } = await this.$axios({
        method: 'POST',
        url: 'user/query',
        params: this.queryinfo,
        headers: {
          'Content-Type': 'application/json',
          authorization: sessionStorage.getItem('token')
        }
      })
      if (res.status != 200) {
        return '获取数据失败'
      }
      console.log(res)
      this.userlist = res.data.content
      this.total = res.data.totalElements
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.queryinfo.pageSize = val
      this.getUserList()
    },
    // 当前第几页
    handleCurrentChange(val) {
      this.queryinfo.pageNumer = val
      this.getUserList()
    },

    // 添加用户
    addUser() {
      this.dialogVisible = true
      this.$refs.addUserFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$axios({
          method: 'POST',
          url: 'user/add',
          params: this.addForm,
          headers: {
            'Content-Type': 'application/json',
            authorization: sessionStorage.getItem('token')
          }
        })
        if (res.status !== 200) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        this.dialogVisible = false
        this.getUserList()
      })
    },
    // 获取下拉列表选中的值
    selectRole(val) {
      var obj = {}
      obj = this.rolelist.find(item => {
        return item.value === val
      })
      // 把角色id赋给role
      this.addForm.role = obj.id
      console.log(this.addForm.role)
    },
    // 关闭添加对话框清空内容
    addDialogClosed() {
      this.$refs.addUserFormRef.resetFields()
    },

    // 显示修改对话框
    showRevise(userinfo) {
      this.reviseFormVisible = true
      this.modification = userinfo
    },
    // 修改用户
    async rewrite() {
      const { data: res } = await this.$axios({
        method: 'POST',
        url: 'user/update',
        params: this.modification,
        headers: {
          'Content-Type': 'application/json',
          authorization: sessionStorage.getItem('token')
        }
      })
      if (res.status !== 200) {
        this.$message.error('修改用户失败！')
      }
      this.$message.success('成功修改用户信息')
      this.reviseFormVisible = false
      this.getUserList()
    },

    // 查看
    showDetail(userinfo) {
      this.dialogTableVisible = true
      // 把对象放进数组，用unshift()方法
      this.userDetail.unshift(userinfo)
      // 让数组元素始终保持一个
      this.userDetail.length = 1
    },

    // 查询
    searchUser() {}
  }
}
</script>

<style lang="less" scoped>
.el-dialog--small {
  width: 70%;
}
.el-breadcrumb {
  margin: 10px 0;
}
/* 把表单label文字首尾对齐 */
.el-form-item label:after {
  content: '';
  display: inline-block;
  width: 100%;
}
.el-form-item__label {
  text-align: justify;
  height: 50px;
}

.dialog-box {
  width: 50%;
  margin: 0 auto;
}
</style>
