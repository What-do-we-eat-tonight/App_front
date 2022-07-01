<template>
	<view class="register">
		
		<view style="width:300rpx;margin-top:15%;margin-bottom:50rpx;">
			<u-image width="100%" height="300rpx" src="/static/student1.png" shape="circle"></u-image>
		</view>
		
		<u-form style="width:90%;background-color: #FFFFFF;padding:0 20rpx;">
			<u-form-item>
				<u-input v-model="regStudent.sno" placeholder="请输入账号" />
			</u-form-item>
			<u-form-item>
				<u-input v-model="regStudent.sname" placeholder="请输入姓名" />
			</u-form-item>
			<u-form-item>
				<u-input v-model="regStudent.school_class"  placeholder="请输入班级"  />
			</u-form-item>
			<u-form-item>
				<u-input v-model="regStudent.major"  placeholder="请输入专业"   />
			</u-form-item>
			<u-form-item>
				<u-input v-model="regStudent.password" type='password' placeholder="请输入密码" :password-icon="true"  />
			</u-form-item>
		</u-form>
		
			<u-button @click="register" style="width:30%;margin-top:5%;" :ripple="true"  type="primary">注册</u-button>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				regStudent:{
					sno:'',
					sname:'',
					school_class:'',
					major:'',
					password:'',
				}
			}
		},
		methods: {
			async register(){
				console.log(this.regStudent);
				await this.$u.post('/student_user/register',this.regStudent);
				//到这里一定成功
				this.$u.toast('注册!');
				this.$u.route({
								url: 'pages/index/index',
								type: 'tab'
							})
			},
		},
		onShow(){
			this.isLogin = uni.getStorageSync("isLogin");
			console.log("+++++" + this.isLogin);
		}
	}
</script>

<style scoped>
	.register{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
