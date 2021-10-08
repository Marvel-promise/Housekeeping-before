<template>
	<div>
		<!-- <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15" @ready="handler">
				</baidu-map> -->
				用户名：<el-input v-model="staffName" placeholder="请输入你的真实姓名"></el-input>
				手机号:<el-input v-model="staffPhone" placeholder="请输入手机号"></el-input>
				用户账号：<el-input v-model="staffCode"></el-input>
				密码:<el-input placeholder="请输入密码" v-model="staffPwd" show-password></el-input>
				确认密码：<el-input placeholder="请确认密码" v-model="rePassword" show-password></el-input>
				部门：<el-select v-model="staffDepartmentid" placeholder="请选择">
				<el-option
				  v-for="item in departments"
				  :key="item.departmentId"
				  :label="item.departmentName"
				  :value="item.departmentId">
				</el-option>
				</el-select>
				省：<el-select v-model="staffProvince" @change=getCity() placeholder="请选择" >
		    <el-option
		      v-for="item in provinces"
		      :key="item.id"
		      :label="item.province"
		      :value="item.provinceid" >
		    </el-option>
		  </el-select>
				市：<el-select v-model="staffCity" @change=getArea() placeholder="请选择">
		    <el-option
		      v-for="item in cities_"
		      :key="item.id"
		      :label="item.city"
		      :value="item.cityid">
		    </el-option>
		  </el-select>
				县：<el-select v-model="staffArea" placeholder="请选择">
		    <el-option
		      v-for="item in areas"
		      :key="item.id"
		      :label="item.area"
		      :value="item.areaid">
		    </el-option>
		  </el-select>
				描述:<el-input v-model="staffDescription" placeholder="工作经验"></el-input>
				<el-button type="primary" @click="userlogin()">注册</el-button>
			</div>
		</template>
	</div>
</template>

<script>
	export default({
		
			data(){
				return{
					staffName:this.staffName,
					staffPhone:this.staffPhone,
					staffCode:this.staffCode,
					staffPwd:this.staffPwd,
					rePassword:this.rePassword,
					staffProvince:"",
					staffCity:"",
					staffArea:"",
					staffDepartmentid:'',
					staffDescription:this.staffDescription,
					provinces:"",
					cities_:"",
					areas:"",
					departments:'',
				}
			},
			created() {
				this.getprovince();
				this.getDepartment();
			},
			methods:{
				userlogin(){
					if(this.staffPwd != this.rePassword){
						console.log("密码不相等");
						return;
					}
					if(this.staffCode == null || this.staffCode == undefined){
						this.staffCode == this.staffPhone
					}
					let staff = {"staffName":this.staffName,"staffCode":this.staffCode,"staffPwd":this.staffPwd,
					"staffProvinceId":this.staffProvince,"staffCityId":this.staffCity,"staffAreaId":this.staffArea,
					"staffPhone":this.staffPhone,
					"staffDepartmentid":this.staffDepartmentid,
					"staffDescription":this.staffDescription}
					this.$http.post('http://localhost/staff/add', staff)
					  .then(function (response) {
					    console.log(response);
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
					let cities={"provinceid":this.staffProvince}
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
					let areas={"cityid":this.staffCity}
					this.$http.post('http://localhost/area/area', areas)
					  .then(function (response) {
					    console.log(response);
						 that.areas = response.data
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
				},getDepartment(){
					let that = this
					this.$http.post('http://localhost/department/getAll')
					.then(function(response){
						console.log(response)
						that.departments = response.data.dept;
					})
					.catch(function(error){
						
					})
				}
			}
	})
	
</script>

<style>
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
