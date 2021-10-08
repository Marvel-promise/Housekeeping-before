<template>
	<div id="mydiv3">
		<!-- <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15" @ready="handler">
		</baidu-map> -->
		<div style="padding: 10px; text-align:left; width: 700px;margin-left: 100px;;" align="center">
			用&nbsp;&nbsp;户&nbsp;名：<el-input v-model="username" placeholder="请输入你的真实姓名" style="inline-size: auto; margin-top: 80px;"></el-input>
			手机号:<el-input v-model="userPhone" placeholder="请输入手机号" style="inline-size: auto; margin-top: 30px;"></el-input></br>
		</div >
		<div style="padding: 10px; text-align:left; width: 700px;margin-left: 100px;;" align="center">
			用户账号：<el-input v-model="userCode" style="inline-size: auto; margin-top: 30px;"></el-input></br>
		</div>
		<div style="padding: 10px; text-align:left; width: 800px;margin-left: 100px;;" align="center">
			&nbsp;密&nbsp;码&nbsp;&nbsp;:<el-input placeholder="请输入密码" v-model="password" style="inline-size: auto; margin-top: 30px;" show-password></el-input>
			确认密码：<el-input placeholder="请确认密码" style="inline-size: auto; margin-top: 30px;" v-model="rePassword" show-password></el-input><br>
		</div>
		
		<div style="padding: 10px; text-align:left; width: 800px;margin-left: 100px;;" align="center">
			<span style="inline-size: auto; margin-top: 30px;">
				&nbsp;性&nbsp;&nbsp;别 &nbsp;：
				<el-radio v-model="Gender" label="男">男</el-radio>
				  <el-radio v-model="Gender" label="女">女</el-radio>
			</span>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮&nbsp;&nbsp;&nbsp;&nbsp;箱&nbsp;：&nbsp;<el-input v-model="userEmil" style="inline-size: auto; margin-top: 30px;"></el-input>
		</div>
		<!-- <Form :model="formItem" ref="formItem" :rules="ruleInline" :label-width="80">
            <FormItem label="省 : " prop="userProvince">
                <Select style="width:200px" v-model="formItem.userProvince">
                    <Option v-for="item in formItem.stateList" :value="item.value" :key="item.value" name="userProvince">{{
                        item.label }}
                    </Option>
                </Select>
            </FormItem>
        </Form> -->
		<div style="padding: 10px; text-align:left; width: 900px;margin-left: 100px;;" align="center">
			省：<el-select v-model="userProvince" style="inline-size: auto; margin-top: 30px;" @change=getCity() placeholder="请选择" >
			  <el-option
			    v-for="item in provinces"
			    :key="item.id"
			    :label="item.province"
			    :value="item.provinceid" >
			  </el-option>
			</el-select>
					市：<el-select v-model="userCity" style="inline-size: auto; margin-top: 30px;" @change=getArea() placeholder="请选择">
			  <el-option
			    v-for="item in cities_"
			    :key="item.id"
			    :label="item.city"
			    :value="item.cityid">
			  </el-option>
			</el-select>
					县：<el-select v-model="userArea" style="inline-size: auto; margin-top: 30px;" placeholder="请选择">
			  <el-option
			    v-for="item in areas"
			    :key="item.id"
			    :label="item.area"
			    :value="item.areaid">
			  </el-option>
				
			</el-select>
		</div>
		<div style="padding: 10px; text-align:left; width: 900px;margin-left: 100px;;" align="center">
			详细地址:<el-input v-model="userDetailArea"  style="inline-size: auto; margin-top: 30px;"placeholder="某某小区几栋几号楼"></el-input>
		</div>
		</br>
		<el-button type="primary" @click="userlogin()" style="inline-size: auto;">注册</el-button>
		<a @click=godelu()>我有账号，登录</a>
	</div>
</template>

<script>
	export default({
		
			data(){
				return{
					username:this.username,
					userPhone:this.userPhone,
					userCode:this.userCode,
					password:this.password,
					rePassword:this.rePassword,
					userEmil:this.userEmil,
					userProvince:"",
					userCity:"",
					userArea:"",
					Gender: '男',
					userDetailArea:this.userDetailArea,
					provinces:"",
					cities_:"",
					areas:""
				}
			},
			created() {
				this.getprovince()
			},
			methods:{
				userlogin(){
					console.log(this.userCode)
					console.log(this.password)
					if(this.password != this.rePassword){
						console.log("密码不相等");
						return;
					}
					if(this.userCode == null || this.userCode == undefined){
						this.userCode == this.userPhone
					}
					let  user = {"userName":this.username,"userCode":this.userCode,"userPhone":this.userPhone,
					"userPassword":this.password,"userEmil":this.userEmil,"userProvinceId":this.userProvince,
					"userCityId":this.userCity,
					"userAreaId":this.userArea,
					"userDetailArea":this.userDetailArea,"userGender":this.Gender}
					this.$http.post('http://localhost/user/add', user)
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
				},godenglu(){
					this.$router.push("/user/login")
				}
			}
	})
	
</script>

<style>
	#mydiv3{
		width: 100%;
		height: 730px;
		background-image: url(../../assets/lisitheme1_4.jpg);
		font-size: 30px;
		color: #fff;
	}
</style>
