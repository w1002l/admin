<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="设备名称"></el-input>
        </el-form-item>
        <el-select v-model="roleValue" placeholder="设备编号" style="width: 120px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogVisible = true">添加设备</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 设备列表 -->
    <el-table :data="devicelist" stripe border>
      <el-table-column type="index" :resizable="false"></el-table-column>
      <el-table-column prop="customerCode" label="公司编号"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <el-table-column prop="deviceCode" label="设备编号"></el-table-column>
      <el-table-column prop="type" label="设备类型"></el-table-column>
      <el-table-column prop="network" label="网络情况"></el-table-column>
      <el-table-column prop="ip" label="ip地址"></el-table-column>
      <el-table-column prop="address" label="所在位置"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="lastOnline" label="最后上网时间" width>
        <template v-slot="scope">{{ scope.row.lastOnline | dateFormat }}</template>
      </el-table-column>

      <el-table-column label="操作" width="150">
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
    <!-- 查看设备详情 -->
    <el-dialog title="设备详情" :visible.sync="dialogTableVisible">
      <el-table :data="deviceDetail" border stripe>
        <el-table-column prop="customerCode" label="公司编号"></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="deviceCode" label="设备编号"></el-table-column>
        <el-table-column prop="type" label="设备类型"></el-table-column>
        <el-table-column prop="network" label="网络情况"></el-table-column>
        <el-table-column prop="ip" label="ip地址"></el-table-column>
        <el-table-column prop="address" label="所在位置"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="lastOnline" label="最后上网时间">
          <template v-slot="scope">{{ scope.row.lastOnline | dateFormat }}</template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 注册(添加)设备 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" @close="addDialogClosed">
      <el-form :model="addDevice" :rules="addDeviceFormRules" ref="addDeviceFormRef">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addDevice.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth" prop="userCode">
          <el-input v-model="addDevice.userCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
          <el-input v-model="addDevice.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPwd">
          <el-input v-model="addDevice.checkPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="customerName">
          <el-input v-model="addDevice.customerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="有效时间" :label-width="formLabelWidth">
          <el-input v-model="addDevice.vaildTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否锁定" :label-width="formLabelWidth">
          <el-switch v-model="addDevice.lock"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addDevices">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  data() {
    return {
      devicelist: [], //设备列表
			dialogTableVisible: false, // 控制查看页面是否显示
			dialogVisible: false, // 控制添加页面是否显示
			deviceDetail: [], // 存放单个设备数据
			formLabelWidth: '80px',
      // 获取设备要传的参数
      queryinfo: {
        customerCodes: 'K_KCZG_COM',
        pageNumer: 1,
        pageSize: 12
      },
			total: 0, // 数据总条数
			addDeviceFormRules: {}, // 添加设备规则校验
			addDevice: {},
      options: [
        {
          value: '1',
          label: '管理员'
        },
        {
          value: '2',
          label: '普通用户'
        }
      ],
      value: '',
      tableData: [],
      roleValue: ''
    }
  },
  created() {
    this.getDeviceList()
  },
  methods: {
    // 获取设备数据，渲染列表
    async getDeviceList() {
      const { data: res } = await this.$axios({
        method: 'POST',
        url: 'device/query',
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
      this.devicelist = res.data.content
      this.total = res.data.totalElements
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.queryinfo.pageSize = val
      this.getDeviceList()
    },
    // 当前第几页
    handleCurrentChange(val) {
      this.queryinfo.pageNumer = val
      this.getDeviceList()
    },
    // 查看详情
    showDetail(userinfo) {
      this.dialogTableVisible = true
      // 把对象放进数组，用unshift()方法
      this.deviceDetail.unshift(userinfo)
      // 让数组元素始终保持一个
      this.deviceDetail.length = 1
		},
		// 关闭添加设备对话框清空内容
    addDialogClosed() {
      this.$refs.addDeviceFormRef.resetFields()
		},
		// 添加设备点击提交函数
		addDevices() {
			
		}
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin: 10px 0;
}
.el-table th,
.el-table td {
  text-align: center !important;
}
</style>
