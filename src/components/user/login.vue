
<template>
	<div id = 'mydiv'>
		<div id = 'kuang'>
			<div class="myspan">
					<label class="mylabel" style="color: white;">
			用户名：</label><el-input v-model="userCode" style="inline-size: auto;"></el-input>
			</div>
			<div class="myspan" style="margin-top: 40px;"><label class="mylabel" style="color: white;">
			密&nbsp;&nbsp;码：</label><el-input placeholder="请输入密码" v-model="password" style="inline-size: auto;" show-password>
			</el-input>
			</div>
			<el-button type="primary" style="margin-top: 40px; width: 12.5rem;" @click="userlogin()">登录</el-button>
			<a @click=gotoregister()>注册</a>
		</div>
	</div>
</template>
<script>
	/* import BMap from 'BMap' */
	export default({
			data(){
				return{
					userCode:""	,
					password:"",
					loc:'',
				}
			},
			methods:{
				userlogin(location){
					console.log(this.userCode)
					console.log(this.password)
					let that = this;
					this.getlocation();
					sessionStorage.removeItem('userId')
					let  user = {"userCode":this.userCode,"pwd":this.password,"loc":this.loc}
					this.$http.post('http://localhost/user/login',user)
					  .then(function (response) {
						   sessionStorage.setItem("userId",response.data.login_user.userId);
					    console.log(response);
						that.$router.push('/employee/dept')
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
				},getlocation() {
					this.loc='辽宁省沈阳市铁西区';
			},gotoregister(){
				this.$router.push('/user/register')
			}
				
	},
	})
</script>

<style>
	a{
		font-size: 30px;
		color: #fff;
	}
	#mydiv{
		background-image: url(../../assets/lisitheme1_1.jpg);
		width: 1525px;
		height: 730px;
		position: absolute;
	}
	#kuang{
		width: 600px;
		height: 25rem;
		/* border: #fff solid 1px; */
		position:fixed;
		margin-left: 25rem;
		margin-top: 12.5rem;
	}
	.myspan{
		width: 18.75rem;
		height: 3.125rem;
		margin-top: 60px;
		margin-left: 120px;
		
	}
	.mylabel{
		width: 9.375rem;
		height: 2.5rem;
		color: #ffffff;
		font-size: larger;
	}
	.el-header, .el-footer {
	    background-color: #B3C0D1;
	    color: #333;
	    text-align: center;
	    line-height: 60px;
	  }
	  
	  .el-aside {
	    background-color: #D3DCE6;
	    color: #333;
	    text-align: center;
	    line-height: 200px;
	  }
	  
	  .el-main {
	    background-color: #E9EEF3;
	    color: #333;
	    text-align: center;
	    line-height: 160px;
	  }
	  
	  body > .el-container {
	    margin-bottom: 40px;
	  }
	  
	  .el-container:nth-child(5) .el-aside,
	  .el-container:nth-child(6) .el-aside {
	    line-height: 260px;
	  }
	  
	  .el-container:nth-child(7) .el-aside {
	    line-height: 320px;
	  }
</style>
