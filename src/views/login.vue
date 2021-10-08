<template>
	<div>
		用户名：<el-input v-model="username"></el-input>
		密码:<el-input placeholder="请输入密码" v-model="userpwd" show-password></el-input>
		<el-button type="primary" @click="denglu()">登录</el-button>
	</div>
	
</template>

<script>
	export default({
			data(){
				return{
					username:""	,
					userpwd:""
				}
			},
			methods:{
				denglu(){
					console.log(this.username)
					console.log(this.userpwd)
					
					let  user = {"usercode":this.username,"userpwd":this.userpwd}
					
					// let xhr  = new XMLHttpRequest();
					// xhr.open("POST","http://localhost:9999/login")
					// // post  请求体
					// xhr.setRequestHeader("Content-Type","application/json;charset=utf-8")
					// xhr.onreadystatechange=()=>{
					// 	if(xhr.readyState==4&&xhr.status==200){
					// 		let res = JSON.parse(xhr.responseText)
					// 		console.log(res)
					// 		if(res.statecode==200){
					// 			location.href="http://www.baidu.com"
					// 		}else{
					// 			alert("登录失败")
					// 		}
					// 	}
					// }
					// xhr.send(JSON.stringify(user));
					this.$http.post('http://localhost/department/getAll', {
					    
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
