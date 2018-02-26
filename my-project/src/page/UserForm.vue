<template>
	<div class="my-form">
		<el-form :label-position="labelPosition" :model="formData" ref="userForm" :rules="formRule" lable-width="100px" class="demo-form">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="formData.name"></el-input>
			</el-form-item>
			<el-form-item label="帐号" prop="account">
				<el-input v-model="formData.account"></el-input>
			</el-form-item>
			<el-form-item label="日期" prop="date">
				<el-date-picker style="width:100%;" type="date" placeholder="" v-model="formData.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-select style="width:100%;" v-model="formData.status">
					<el-option label="启用" value="1"></el-option>
					<el-option label="停用" value="0"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="所属机构" prop="dept">
				<el-input v-model="formData.dept"></el-input>
			</el-form-item>
			<el-form-item>
			    <el-button type="primary" @click="submitForm('userForm')">保存</el-button>
			    <el-button @click="resetForm('userForm')">重置</el-button>
		    </el-form-item>
		</el-form>
		<go-welcome></go-welcome>
	</div>
</template>
<script>
	import GoWelcome from '@/components/GoWelcome';
	export default{
		props: ['id'],
		components: {
			GoWelcome
		},
		data() {
			console.log(this.$route.params.id);
			let now = new Date();
			let formatDate = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
			return {
				labelPosition: 'right',
				formData: {
					name: '',
					account: '',
					date: formatDate,
					status: '',
					dept: ''
				},
				formRule: {
					name: [
						{required: true, message: '请输入姓名', trigger: 'blur'}
					],
					account: [
						{required: true, message: '请输入账号', trigger: 'blur'}
					],
					date: [{
						required: true, message: '请选择日期', trigger: 'change'
					}],
					status: [{
						required: true, message: '请选择状态', trigger: 'change'
					}],
					dept: [{
						required: true, message: '请输入所属机构', trigger: 'blur'
					}]
				}
			};
		},
		mounted() {//载入后 生命周期钩子函数
			let self = this;
			let id = this.$route.params.id;
			if (id !== 'new') {
				try{
					this.getEditData().then(function(data) {
						self.formData = data;
					});
				} catch (error) {
					console.error('nust return a promese object!');
				}
			}
		},
		methods: {
			submitForm(formName) {
				var self = this;
				let id = this.$route.params.id;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit success');
						if (id == 'new') {
							self.$store.dispatch('addUser', self.formData);//1修改list
							// self.$store.commit('ADD_USER', self.formData);//2修改list
							console.log('new down');//1时先于mutations执行（异步执行），2时后于mutations执行（执行完才打印，同步）
						} else {
							self.$store.dispatch('editUser', self.formData);
							console.log('edit down');
						}
						self.$router.replace({name: 'userGrid'});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			getEditData() {
				let self = this;
				let id = this.$route.params.id;
				// this.axios.get('/json/userView.json',{params: {id: id}}).then(function(res) {
				// 	console.log(res);
				// }).catch(function(error) {
				// 	console.log(error);
				// });

				return new Promise(function (resolve) {
					setTimeout(function() {
						self.$store.dispatch('getUserIndex', id);
						let user = self.$store.state.userLists[self.$store.state.activeIndex];
						console.log('=========', user);
						resolve(user);
					}, 200);
				})
			}
		}
	}
</script>
<style>
	.my-form{
		text-align: left;
		width: 460px;
    	margin: 0 auto;
	}
</style>