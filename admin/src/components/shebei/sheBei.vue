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
        </el-select>&nbsp;
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
    <!-- 修改设备对话框 -->
    <el-dialog
      title="修改设备信息"
      :visible.sync="reviseFormVisible"
      :close-on-click-modal="false"
      style="width: 80%; margin: 0 auto;"
    >
      <el-form :model="equipmentDetail" label-width="80px" ref="addForm">
        <el-form-item label="公司编号">
          <el-input v-model="equipmentDetail.customerCode" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="ID" prop="id">
          <el-input v-model="equipmentDetail.id" ref="roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="equipmentDetail.name" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="equipmentDetail.deviceCode" ref="roleId" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reviseFormVisible = false">取消</el-button>
        <el-button type="primary" @click="rewrite">提交</el-button>
      </div>
    </el-dialog>
    <!-- 注册(添加)设备 -->
    <el-dialog title="添加设备" :visible.sync="dialogVisible" @close="addDialogClosed">
      <el-form :model="addDevice" :rules="addDeviceFormRules" ref="addDeviceFormRef">
        <el-form-item label="设备名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addDevice.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" :label-width="formLabelWidth" prop="deviceCode">
          <el-input v-model="addDevice.deviceCode" auto-complete="off"></el-input>
        </el-form-item>
       <el-form-item label="设备类型" :label-width="formLabelWidth" prop="type">
          <el-input v-model="addDevice.type" auto-complete="off"></el-input>
        </el-form-item>
       <el-form-item label="网络情况" :label-width="formLabelWidth" prop="network">
          <el-input v-model="addDevice.network" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="ip地址" :label-width="formLabelWidth" prop="ip">
          <el-input v-model="addDevice.ip" auto-complete="off"></el-input>
        </el-form-item>
       <el-form-item label="所在位置" :label-width="formLabelWidth" prop="address">
          <el-input v-model="addDevice.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-input v-model="addDevice.status" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="最后上网时间" :label-width="formLabelWidth" prop="lastOnline">
          <el-input v-model="addDevice.lastOnline" auto-complete="off"></el-input>
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
      deviceDetail: [], // 存放单个设备数据--数组格式
      reviseFormVisible: false, // 控制修改页面是否显示
      formLabelWidth: '80px',
      // 获取设备要传的参数
      queryinfo: {
        customerCodes: 'K_KCZG_COM',
        pageNumer: 1,
        pageSize: 10
      },
      total: 0, // 数据总条数
      // 添加设备规则校验
      addDeviceFormRules: {
        deviceCode: [
          {required: true, message: '设备编号不能为空', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '设备名不能为空', trigger: 'blur'}
        ]
      }, 
      // 添加设备要传的参数
      addDevice: {
        name: '',
        deviceCode: '',
        customerCode: 'K_KCZG_COM',
        id: '',
        type: '',
        network: '',
        ip: '',
        address: '',
        status: '',
        lastOnline: ''
      },
      // 修改设备要传的参数
      equipmentDetail: {

      },
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
    // 点击编辑显示修改设备对话框
    showRevise(userinfo) {
      this.reviseFormVisible = true
      this.equipmentDetail = userinfo
    },
    // 修改设备
    rewrite() {
      this.$axios({
        method: 'POST',
        url: 'device/registerDevice',
        params: this.deviceDetail,
        headers: {
          'Content-Type': 'application/json',
          authorization: sessionStorage.getItem('token')
        }
      }).then(res => {
        if (res.status !== 200) {
          this.$message.error('修改用户失败！')
        }
      })
      this.$message.success('成功修改用户信息')
      this.reviseFormVisible = false
      this.getUserList()
    },
    // 关闭添加设备对话框清空内容
    addDialogClosed() {
      this.$refs.addDeviceFormRef.resetFields()
    },
    // 添加设备点击提交函数
    addDevices() {
      this.$refs.addDeviceFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$axios({
          method: 'POST',
          url: 'device/add',
          params: this.addDevice,
          headers: {
            'Content-Type': 'application/json',
            authorization: sessionStorage.getItem('token')
          }
        })
        if (res.status !== 200) {
          this.$message.error('添加设备失败！')
        }
        this.$message.success('已成功添加设备！')
        this.dialogVisible = false
        this.getDeviceList()
      })
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
