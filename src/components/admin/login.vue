<template>
	<div id = 'mydiv'>
		用户名：<el-input v-model="adCode"></el-input>
		密码:<el-input placeholder="请输入密码" v-model="adpwd" show-password></el-input>
		<el-button type="primary" @click="denglu()">登录</el-button>
	</div>
</template>

<script>
	export default({
			data(){
				return{
					adCode:""	,
					adpwd:""
				}
			},
			methods:{
				denglu(){
					console.log(this.adCode)
					console.log(this.adpwd)
					
					let  user = {"adCode":this.adCode,"adPwd":this.adpwd}
					this.$http.post('http://localhost/ad/login', {
					    login_user:user
					  })
					  .then(function (response) {
					    console.log(response);
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
				}
			}
	})
</script>

<style>
	
</style>
