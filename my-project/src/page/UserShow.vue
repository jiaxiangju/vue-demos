<template>
	<div class="user-show">
		<p>
			<label>ID：</label>
			<label>{{this.$route.params.id}}</label>
		</p>
		<p>
			<label>姓名：</label>
			<label>{{showData.name}}</label>
		</p>
		<p>
			<label>帐号：</label>
			<label>{{showData.account}}</label>
		</p>
		<p>
			<label>所属机构：</label>
			<label>{{showData.dept}}</label>
		</p>
		<go-welcome></go-welcome>
	</div>
</template>
<script>
	import GoWelcome from '@/components/GoWelcome';
	export default{
		name: 'userShow',
		props: ['id'],
		data () {
			return {
				showData: {}
			}
		},
		components: {
			GoWelcome
		},
		mounted() {//载入后 生命周期钩子函数
			let self = this;
			let id = this.$route.params.id;
			if (id !== 'new') {
				try{
					this.getData().then(function(data) {
						self.showData = data;
					});
				} catch (error) {
					console.error('nust return a promese object!');
				}
			}
		},
		methods: {
			getData() {
				let self = this;
				let id = this.$route.params.id;
				return new Promise(function (resolve) {
					setTimeout(function() {
						self.$store.dispatch('getUserIndex', id);
						let user = self.$store.state.userLists[self.$store.state.activeIndex];
						resolve(user);
					}, 200);
				})
			}
		}
	}
</script>
<style>
	.user-show{
		text-align: left;
		width: 1100px;
		margin: 0 auto;
	}
</style>