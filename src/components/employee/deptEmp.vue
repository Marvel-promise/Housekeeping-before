import Qs from qs;
<template>
	<div>
		<el-container class='home-container'>
		  <el-aside width="200px">
			  <!-- <img src="../../assets/lisitheme1_1.jpg" alt="边框图片"> -->
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
			        <el-menu-item index="2" disabled>
			          <i class="el-icon-menu"></i>
			          <span slot="title" @click=addres() >寻找预约</span>
			        </el-menu-item>
			      </el-menu>
			    </el-col>
			  </el-row>
		  </el-aside>
		  <el-container >
		    <el-header style="background-color: #f40;">
				部门：<el-select class="my_select" v-model="dept" @change=getstaff() placeholder="请选择" >
				<el-option
				  v-for="item in depts"
				  :key="item.departmentId"
				  :label="item.departmentName"
				  :value="item.departmentId" >
				</el-option>
				</el-select>
				省：<el-select class="my_select"  v-model="province" @change=getCity() @blur=getstaff() placeholder="请选择" >
				<el-option
				  v-for="item in provinces"
				  :key="item.id"
				  :label="item.province"
				  :value="item.provinceid" >
				</el-option>
				</el-select>
				市：<el-select class="my_select" v-model="city" @change=getstaff() placeholder="请选择" >
				<el-option
				  v-for="item in cities"
				  :key="item.id"
				  :label="item.city"
				  :value="item.cityid">
				</el-option>
				</el-select>
			</el-header>
		    <el-main>
				<el-table
				   :data="tableData"
				   border
				   style="width: 100%">
				   <el-table-column
				     fixed
				     prop="departmentName"
				     label="职业"
				     width="150">
				   </el-table-column>
				   <el-table-column
				     prop="staffName"
				     label="员工姓名"
				     width="120">
				   </el-table-column>
					<el-table-column
					 prop="staffPhone"
						label="联系方式"
						width="120">
						</el-table-column>
						<el-table-column
							prop="province"
							label="工作省份"
							width="120">
						</el-table-column>
					<el-table-column
						 prop="city"
							    label="城市"
							    width="120">
							</el-table-column>
				   <el-table-column
				     prop="area"
				     label="地区"
				     width="120">
				   </el-table-column>
				   <el-table-column
				     prop="staffDescription"
				     label="描述"
				     width="220">
				   </el-table-column>
				   <el-table-column
				     fixed="right"
				     label="操作"
				     width="100">
				     <template slot-scope="scope">
				       <el-button @click="handleClick(scope.row)" type="text" size="small">预约干活</el-button>
				     </template>
				   </el-table-column>
				 </el-table>
				<el-pagination>
				  background
				  layout="prev, pager, next"
				  :total="pageNum">
				</el-pagination>
				</el-main>
		    <el-footer>
				</hr>
				家政网&reg; 版权&copy;
				</el-footer>
		  </el-container>
		</el-container>
		
		
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	         activeName: 'second',
			 province:'',
			 provinces:'',
			 departmentId:'',
			 dept:'',
			 depts:'',
			 city:'',
			 cities:'',
			 currentPage:1,
			 pageSize:10,
			 currentDate: new Date(),
			 staff_num:'',
			 pageNum:'',
			 total:'',
			 tableData:'',
	      };
	    },
		created(){
			this.getAllDepartment();
			this.getprovince();
			this.getstaff();
		},
	    methods: {
	      handleClick(tab, event) {
			 var userCode = sessionStorage.getItem("userId");
			 if(userCode == undefined || userCode == ''){
				 this.$router.push('/user/login')
			 }else{
				 sessionStorage.setItem("Staff_id",tab.staffId);
				 sessionStorage.setItem("departmentId",tab.departmentId)
				 console.log(tab);
				 this.$router.push('/reservation/new_re')
			 }
	        console.log(tab, event);
	      },handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },getprovince(){
					 let that = this
					this.$http.get('http://localhost/province/allProvince')
					  .then(function (response) {
					    console.log(response);
						 that.provinces = response.data
						 that.getstaff();
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
				},getAllDepartment(){
					let that = this
					this.$http.post('http://localhost/department/getAll')
					.then(function(response){
						console.log(response)
						that.depts = response.data.dept;
					})
					.catch(function(error){
					})
				},getCity(){
					console.log(this.province)
					let that = this
					let cities={"provinceid":this.province}
					/* alert(province_id)
					alert(cities) */
					this.$http.post('http://localhost/city/city', cities)
					  .then(function (response) {
					    console.log(response);
						 that.cities = response.data;
						 that.getstaff();
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
				},getstaff(){
					let detailStaff;
					var deptId = this.dept;
					var proId =this.province;
					var citId =this.city;
					  var url = 'http://localhost/staff/condition'
					  if(deptId != ''){
						  url = url + '/'+deptId
					  }else{
						   url = url + '/'+ 0
					  }
					  if(proId!=''){
						   url = url + '/'+proId
					  }else{
						   url = url + '/'+ 0
					  }
					  if (citId != ''){
						  url = url + '/'+citId
					  }else{
						   url = url + '/'+ 0
					  }
					  let that = this;
					this.$http.get(url +'/'+this.currentPage+'/'+this.pageSize+'')
					  .then(function (response) {
					    console.log(response);
						if(response.data.status == 200){
							that.pageNum = response.data.staff.pages;
							that.tableData = response.data.staff.list;
						}
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
				},add_re(staff_id){
					sessionStorage.setItem("staff_id",staff_id);
					this.$router.push("/reservation/new_re");
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
	    }
	  }
</script>

<style>
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
