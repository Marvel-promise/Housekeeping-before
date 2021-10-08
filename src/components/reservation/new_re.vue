<template>
	<div style="background-image: url(../../assets/xin.jpg);">
		<el-container style="height: 720px;width: 100%;">
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
		  <el-container>
		    <el-header><img src="../../assets/ad5.jpg" alt="加载图片" style="height: 100%; width: 100%;"></el-header>
		    <el-main>
				<div style="height: 600px;width: 1200px; background: url(../../assets/beijing.jpg);">
					<div style="height: 350px;">
						<div id="userspan">
							<div class="xinxi"><label class="xinxi_">员工名字：</label><label class="xinxi_" >{{staff_name}}</label></div>
							<div class="xinxi"><label class="xinxi_" >员工部门：</label><label class="xinxi_" >{{dept_name}}</label></div>
							<div class="xinxi"><label class="xinxi_">员工联系方式：</label><label  class="xinxi_">{{staff_phone}}</label></div>
							<div class="xinxi"><label class="xinxi_" >员工描述：</label><label class="xinxi_" >{{staff_des}}</label></div>
						</div>
						<div id = "resspan">
							<div style="text-align: left; line-height: 1.5; margin-top: 40px;">
								省：<el-select v-model="userProvince" @change=getCity() placeholder="请选择" >
								  <el-option
								    v-for="item in provinces"
								    :key="item.id"
								    :label="item.province"
								    :value="item.provinceid" >
								  </el-option>
								</el-select>
							</div>
							<div style="text-align: left; line-height: 1.5; margin-top: 30px;">
									市：<el-select v-model="userCity" @change=getArea() placeholder="请选择">
							  <el-option
							    v-for="item in cities_"
							    :key="item.id"
							    :label="item.city"
							    :value="item.cityid">
							  </el-option>
							</el-select>
							</div>
							<div style="text-align: left; line-height: 1.5; margin-top: 30px;">
									县：<el-select v-model="userArea" placeholder="请选择">
									  <el-option
									    v-for="item in areas"
									    :key="item.id"
									    :label="item.area"
									    :value="item.areaid">
									  </el-option>
									</el-select>
							</div>
							<div style="text-align: left; line-height: 1.5; margin-top: 30px;">
									详细地址:<el-input v-model="workDetailArea" style="inline-size: auto;" placeholder="某某小区几栋几号楼"></el-input>
							</div>
							<div style="text-align: left; line-height: 1.5; margin-top: 30px;">
									<div class="block">
									    <span class="demonstration">服务时间</span>
									    <el-date-picker
									      v-model="value2"
									      type="datetimerange"
									      :picker-options="pickerOptions"
									      range-separator="至"
									      start-placeholder="开始日期"
									      end-placeholder="结束日期"
									      align="right">
									    </el-date-picker>
									  </div>
									  </div>
						</div>
					</div>
					<div style="">
						<el-button type="primary" @click="addres()">预约</el-button>
					</div>
				</div>
			</el-main>
		    <el-footer></hr>
				家政网&reg; 版权&copy;</el-footer>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	export default({
			data(){
				return{
					staff:'',
					user:'',
					staff_name:'',
					dept_name:'',
					staff_phone:'',
					staff_des:'',
					startTime:'',
					endTime:'',
					province:'',
					userProvince:"",
					workDetailArea:"",
					userCity:"",
					userArea:"",
					city:'',
					area:'',
					provinces:'',
					cities_:'',
					areas:'',
					detials:'',		
							 pickerOptions: {
							          shortcuts: [{
							            text: '最近一周',
							            onClick(picker) {
							              const end = new Date();
							              const start = new Date();
							              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							              picker.$emit('pick', [start, end]);
							            }
							          }, {
							            text: '最近一个月',
							            onClick(picker) {
							              const end = new Date();
							              const start = new Date();
							              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							              picker.$emit('pick', [start, end]);
							            }
							          }, {
							            text: '最近三个月',
							            onClick(picker) {
							              const end = new Date();
							              const start = new Date();
							              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							              picker.$emit('pick', [start, end]);
							            }
							  }]
						   },value2: '',
				}
			},
			created() {
				this.getUser();
				this.getDepartment();
				this.getoneStaff();
				this.getprovince();
			},
			methods:{
				addres(){
					console.log(this.value2);
					let res = {
						"reservationUserId":sessionStorage.getItem("userId"),
						"reservationDepartmentId":sessionStorage.getItem("departmentId"),
						"reservationStaffId":sessionStorage.getItem("Staff_id"),
						"workProvinceId":this.userProvince,
						"workCityId":this.userCity,
						"workAreaId":this.userArea,
						"workDetailArea":this.workDetailArea,
						"status":"未执行",
						"startTime":this.value2[0],
						"endTime":this.value2[1],
					}
					let that = this
					this.$http.post('http://localhost/reservation/add',res)
					  .then(function (response) {
					    console.log(response);
						that.$router.push("/res/all")
						//that.$router.push('/employee/dept')
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
					
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
				}
				,getoneStaff(){
					var staff_ = sessionStorage.getItem("Staff_id");
					let that = this;
					console.log(staff_)
					let staff_1 = {'staffId':staff_}
					this.$http.post('http://localhost/staff/getone',staff_1)
					  .then(function (response) {
					    console.log(response);
						that.staff_name = response.data.staff.staffName;
						that.staff_phone=response.data.staff.staffPhone;
						that.dept_name = response.data.staff.departmentName;
						that.staff_des = response.data.staff.staffDescription;
						//that.$router.push('/employee/dept')
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
				},getUser(){
					var user_ = sessionStorage.getItem("userId");
					let that = this;
					let user = {'userId':user_}
					this.$http.post('http://localhost/user/getone',user)
					  .then(function (response) {
					    console.log(response);
						//that.$router.push('/employee/dept')
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
					
				},getDepartment(){
					var department_ = sessionStorage.getItem("departmentId");
					let that = this;
					this.$http.get('http://localhost/department/getOne/'+department_)
					  .then(function (response) {
					    console.log(response);
						//that.$router.push('/employee/dept')
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
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
	})
	
</script>

<style>
	#userspan{
		display: inline; 
		height: 450px;
		width: 700px;
		float: left;
		/* border: #f40 solid 10px; */
		text-align: left;
	}
	#resspan{
		display: inline;
		float: right;
		height: 450px;
		width: 500px;
		/* border: #000 solid 1px; */
	}
	.xinxi{
		margin: 0px;
		padding: 0rem;
		border: #fff solid 1px;
		height: 80px;
		width: 600px;
		line-height:1.5;
		
		
	}
	.xinxi .xinxi_{
		display: inline;
		padding: 0px;
		margin: 5px;
		height: 100px;
		width: 300px;
		font-size: 20px;
		letter-spacing: 0;
		line-height: 0rem;
		margin-top: 10px;
	}
	.h1,.h2{
		display: inline;
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
	  #userspan{
		  width: 400px;
		  height: 500px;
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
