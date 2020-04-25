<template>
	<section style="width: 80%;">
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
				      :value="item.value">
				    </el-option>
				  </el-select>
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="tableData" stripe border style="width: 100%">
			<el-table-column  prop="customerCode" label="公司编号" width="120">
			</el-table-column>
			<el-table-column prop="id" label="ID" width="100">
			</el-table-column>
			<el-table-column prop="name" label="设备名称" width="120">
			</el-table-column>
			<el-table-column prop="deviceCode" label="设备编号" width="120">
			</el-table-column>
			<el-table-column prop="type" label="设备类型" width="120">
			</el-table-column>
			<el-table-column prop="network" label="网络情况" width="120">
			</el-table-column>
			<el-table-column prop="ip" label="ip地址" width="120">
			</el-table-column>
			<el-table-column prop="address" label="所在位置" width="150">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="120">
			</el-table-column>
			<el-table-column prop="lastOnline" label="最后上网时间" width="">
			</el-table-column>
			
			
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="block">
			<el-pagination 
			 :page-sizes="[10,15,20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="100" style="float: right; margin-top: 20px;">
			</el-pagination>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				options: [{
					value: '1',
					label: '管理员'
				}, {
					value: '2',
					label: '普通用户'
				}],
				value: '',
				tableData: [],
				roleValue: '',
			}
		}
	}
</script>
<style lang="less" scoped>
	.el-table th, .el-table td {
		text-align: center !important;
	}

</style>
