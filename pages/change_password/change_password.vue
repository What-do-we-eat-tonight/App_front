<template>
	<view class="change_pass">
	<u-form style="width:90%;background-color: #FFFFFF;padding:0px 20rpx;">
	<u-form-item class = "item">
		<u-input v-model="old_password" type='password' placeholder="请输入之前使用的密码" />
	</u-form-item>
	<u-form-item class = "item">
		<u-input v-model="new_password" type='password' placeholder="请输入新密码" />
	</u-form-item>
	<u-form-item class = "item">
		<u-input v-model="new_password2" type='password' placeholder="请确认新密码" />
	</u-form-item>
	</u-form>
	<u-button @click="change_pass()" style="width:30%;margin-top:5%;" :ripple="true"  type="primary">确认修改</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				old_password:'',
				new_password:'',
				new_password2:''
			}
		},
		methods: {
				
			async change_pass(){
					
				if(this.new_password != this.new_password2){
					//两次密码不一样
				    this.$u.toast("两次输入的密码不一样");
					this.new_password = '';
					this.new_password2 = '';
					
				}
					
				else{
					//post请求
					let c_post = {
						password:this.old_password,
						newpassword:this.new_password,
						user_id:uni.getStorageSync("login_id")
					};
					console.log(c_post);
					await this.$u.post('student_user/changePassword',c_post);
					this.$u.toast("修改成功");
				}
			}
		},
		onShow(){

		}
	}
</script>

<style>
	.change_pass{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.item{
	}
</style>