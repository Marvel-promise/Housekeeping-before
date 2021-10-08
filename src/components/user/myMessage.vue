<template>
	<div>
		<el-container class='home-container'>
			  <el-aside width="200px">
				  <el-row class='myrow' :span='12'>
				    <el-col class="my_col" :span="12">
				      <el-menu
				        default-active="2"
				        class="el-menu-vertical-demo"
				        @open="handleOpen"
				        @close="handleClose"
				        background-color="#545c64"
				        text-color="#fff"
				        active-text-color="#ffd04b">
				        <el-submenu index="1">
				          <template slot="title">
				            <i class="el-icon-location"></i>
				            <span>我自己</span>
				          </template>
				          <el-menu-item-group>
				            <template slot="title">自己操作</template>
							<el-menu-item index="1-1" @click=getmylog()>我的日志</el-menu-item>
				            <el-menu-item index="1-1" @click=getmymessage()>我的信息</el-menu-item>
				            <el-menu-item index="1-2" @click=exit()>退出登录</el-menu-item>
				          </el-menu-item-group>
				          <el-menu-item-group title="关于服务">
				            <el-menu-item index="1-3" @click=getdept()>服务部门</el-menu-item>
				          </el-menu-item-group>
				          <el-submenu index="1-4">
				            <template slot="title">我的预约</template>
				            <el-menu-item index="1-4-1" @click=getmyres()>所有预约</el-menu-item>
				          </el-submenu>
				        </el-submenu>
				        <el-menu-item index="2">
				          <i class="el-icon-menu"></i>
				          <span slot="title" @click=addres() >寻找预约</span>
				        </el-menu-item>
				      </el-menu>
				    </el-col>
				  </el-row>
			  </el-aside>
			  <el-container >
			    <el-header>
					<img src="../../assets/ad4.jpg" alt="加载图片" style="height: 100%; width: 100%;">
				</el-header>
			    <el-main>
						<div id= "mydiv1" class="zhuce" style="margin-top: 0px;">
							用户名：<el-input v-model="username" placeholder="请输入你的真实姓名" style="inline-size: auto; margin-top: 50px;" ></el-input>
									手机号:<el-input v-model="userPhone" placeholder="请输入手机号" style="inline-size: auto;"></el-input>
									</br>
									用户账号：<el-input v-model="userCode" :disabled="true" style="inline-size: auto; margin-top: 20px;"></el-input></br>
									密码:<el-input placeholder="请输入密码" v-model="password" style="inline-size: auto; margin-top: 20px;" show-password></el-input>
									确认密码：<el-input placeholder="请确认密码" v-model="rePassword" style="inline-size: auto; margin-top: 1.25rem;" show-password></el-input>
									</br>
									性别：
									<el-radio v-model="Gender" label="男" style=" margin-top: 1.25rem;" >男</el-radio>
									  <el-radio v-model="Gender" label="女" style=" margin-top: 1.25rem;" >女</el-radio>
									邮箱：<el-input v-model="userEmil" style="inline-size: auto; margin-top: 1.25rem;" ></el-input></br>
									省：<el-select v-model="userProvince" @change=getCity() placeholder="请选择" style="margin-top: 20px;" >
							  <el-option
							    v-for="item in provinces"
							    :key="item.id"
							    :label="item.province"
							    :value="item.provinceid" >
							  </el-option>
							</el-select>
									市：<el-select v-model="userCity" @change=getArea() placeholder="请选择">
							  <el-option
							    v-for="item in cities_"
							    :key="item.id"
							    :label="item.city"
							    :value="item.cityid">
							  </el-option>
							</el-select>
									县：<el-select v-model="userArea" placeholder="请选择">
							  <el-option
							    v-for="item in areas"
							    :key="item.id"
							    :label="item.area"
							    :value="item.areaid">
							  </el-option>
							 
							</el-select>
							 </br>
									详细地址:<el-input v-model="userDetailArea" placeholder="某某小区几栋几号楼" style="margin-top: 30px; inline-size: auto;"></el-input>
									</br><el-button type="primary" @click="userlogin()" style="margin-top: 20px; inline-size: auto;">修改</el-button>
									<el-button type="primary" @click="getuser()">重置</el-button>
						</div>
						<div id="my_div" >
							<img src="../../assets/wangyiyun.jpg" style="height: 500px;width: 600px;" alt="网易云音乐下载">
						</div>
					</el-main>
			    <el-footer>
					</hr>
					家政网&reg; 版权&copy;
					</el-footer>
			  </el-container>
			</el-container>
		</div>
		
	</div>
</template>

<script>
	  export default {
	    data() {
	      return {
	        username:'',
	        userPhone:'',
	        userCode:'',
	        password:'',
	        rePassword:'',
	        userEmil:'',
	        userProvince:"",
	        userCity:"",
	        userArea:"",
	        Gender: '',
	        userDetailArea:this.userDetailArea,
	        provinces:"",
	        cities_:"",
	        areas:"",
			}
	    },created() {
	    	this.getuser();
	    },
	      methods:{
			  userlogin(){
				  if(this.password == null || this.password == ''){
					  let that = this;
					  let  user = {'userId':sessionStorage.getItem("userId"),"userName":this.username,"userCode":this.userCode,"userPhone":this.userPhone,
					  "userEmil":this.userEmil,"userProvinceId":this.userProvince,
					  "userCityId":this.userCity,
					  "userAreaId":this.userArea,
					  "userDetailArea":this.userDetailArea,"userGender":this.Gender}
					  this.$http.post('http://localhost/user/update',user)
					    .then(function (response) {
					  	  that.getuser();
					      console.log(response);
					    })
					    .catch(function (error) {
					      console.log(error);
					    });
					  
				  }else{
					  if(this.password != this.rePassword){
						  alert("两个密码不相同");
						  return;
					  }else{
						   let that = this;
						  let  user = {'userId':sessionStorage.getItem("userId"),"userName":this.username,"userCode":this.userCode,"userPhone":this.userPhone,
						  "userPassword":this.password,"userEmil":this.userEmil,"userProvinceId":this.userProvince,
						  "userCityId":this.userCity,
						  "userAreaId":this.userArea,
						  "userDetailArea":this.userDetailArea,"userGender":this.Gender}
						  this.$http.post('http://localhost/user/update',user)
						    .then(function (response) {
							sessionStorage.removeItem('userId');
						  	 that.$router.push('/user/login');
						      console.log(response);
						    })
						    .catch(function (error) {
						      console.log(error);
						    });
					  }
				  }
			  },getmylog(){
					this.$router.push('/user/log');
				},getmymessage(){
					this.$router.push("/user/message");
				},getmyres(){
					this.$router.push("/res/all");
				},exit(){
					sessionStorage.removeItem('userId');
					this.$router.push("/user/login");
				},getdept(){
					console.log("/dept/dept")
					this.$router.push('/dept/dept')
				},addres(){
					this.$router.push("/employee/dept")
				},getuser(){
						var userid = sessionStorage.getItem('userId');
						let that = this
						if(userid == null || userid == undefined || userid ==''){
							this.$router.push('/user/login');
						}else{
							this.$http.get('http://localhost/user/detail/'+userid)
							  .then(function (response) {
								  that.username = response.data.user.userName
								  that.userPhone = response.data.user.userPhone
								  that.userCode = response.data.user.userCode
								  /* that.userArea.value = response.data.user.areaid
								  that.userCity.value = response.data.user.cityid
								  that.userArea.label = response.data.user.areaid
								  that.userCity.label = response.data.user.city */
								 that.userProvince =response.data.user.province
								   that.userCity =response.data.user.city
								    that.userArea =response.data.user.area
								 /* that.userProvince.value = response.data.user.provinceid;
								  that.userProvince.label = response.data.user.province; */
								  that.Gender = response.data.user.userGender;
								  that.userEmil = response.data.user.userEmil;
								  that.userDetailArea = response.data.user.userDetailArea;
								  that.getprovince();
							    console.log(response);
							  })
							  .catch(function (error) {
							    console.log(error);
							  });
						}
						
					},getprovince(){
	      				 let that = this
	      				this.$http.get('http://localhost/province/allProvince')
	      				  .then(function (response) {
	      				    console.log(response);
	      					 that.provinces = response.data
	      				  })
	      				  .catch(function (error) {
	      				    console.log(error);
	      				  });
	      			},getCity(){
	      				console.log(this.userProvince)
	      				let that = this
	      				let cities={"provinceid":this.userProvince}
	      				/* alert(province_id)
	      				alert(cities) */
	      				this.$http.post('http://localhost/city/city', cities)
	      				  .then(function (response) {
	      				    console.log(response);
	      					 that.cities_ = response.data
	      				  })
	      				  .catch(function (error) {
	      				    console.log(error);
	      				  });
	      			},getArea(city_id){
	      				let that = this
	      				let areas={"cityid":this.userCity}
	      				this.$http.post('http://localhost/area/area', areas)
	      				  .then(function (response) {
	      				    console.log(response);
	      					 that.areas = response.data
	      				  })
	      				  .catch(function (error) {
	      				    console.log(error);
	      				  });
	      			}
	      		}
	      }
</script>

<style>
	.zhuce{
		background-image: url(../../assets/beijing.jpg);
	}
	#mydiv1{
		height: 500px;
		width: 600px;
		display: inline-block;
		float: left;
		padding: 5px;
		margin: 0px;
		
	}
	#my_div{
		height: 500px;
		width: 600px;
		float: right;
	}
	.my_col{
		width: 100%;
		height: 100%;
		background-color: #220;
	}
	.myrow{
		height: 100%;
	}
	.home-container{
		height: 100%;
		width: 100%;
	}
	.time {
	    font-size: 13px;
	    color: #999;
	  }
	  
	  .bottom {
	    margin-top: 13px;
	    line-height: 12px;
	  }
	
	  .button {
	    padding: 0;
	    float: right;
	  }
	
	  .image {
	    width: 100%;
	    display: block;
	  }
	
	  .clearfix:before,
	  .clearfix:after {
	      display: table;
	      content: "";
	  }
	  
	  .clearfix:after {
	      clear: both
	  }
</style>
