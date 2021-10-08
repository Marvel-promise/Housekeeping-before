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
				<img src="../../assets/guang.jpg" alt="加载图片" style="height: 100%; width: 100%;">
			</el-header>
		    <el-main>
				<el-table
				   :data="tableData"
				   border
				   style="width: 100%">
				   <el-table-column
				     fixed
				     prop="departmentId"
				     label="部门号"
				     width="150">
				   </el-table-column>
				   <el-table-column
				     prop="departmentName"
				     label="部门名称"
				     width="150">
				   </el-table-column>
					<el-table-column
					 prop="departmentDescription"
						label="部门详细描述"
						width="965">
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
			 tableData:''
	      };
	    },
		created(){
			this.getdepts();
		},
	    methods: {
			getdepts(){
				let that = this;
				this.$http.post('http://localhost/department/getAll')
				  .then(function (response) {
				    console.log(response);
					that.tableData = response.data.dept;
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			}
	      ,getmylog(){
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
