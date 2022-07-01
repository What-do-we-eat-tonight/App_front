<template>
	<view class="register">
		
		<view style="width:300rpx;margin-top:15%;margin-bottom:50rpx;">
			<u-image width="100%" height="300rpx" src="/static/teacher1.png" shape="circle"></u-image>
		</view>
		
		<u-form style="width:90%;background-color: #FFFFFF;padding:0 20rpx;">
			<u-form-item>
				<u-input v-model="regTeacher.teacher_no" placeholder="请输入账号" />
			</u-form-item>
			<u-form-item>
				<u-input v-model="regTeacher.teacher_name"  placeholder="请输入姓名"  />
			</u-form-item>
			<u-form-item>
				<u-input v-model="regTeacher.email"  placeholder="请输入邮箱"   />
			</u-form-item>
			<u-form-item>
				<u-input v-model="regTeacher.password" type='password' placeholder="请输入密码" :password-icon="true"  />
			</u-form-item>
		</u-form>
		
			<u-button @click="register" style="width:30%;margin-top:5%;" :ripple="true"  type="primary">注册</u-button>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				regTeacher:{
					teacher_no:'',
					teacher_name:'',
					email:'',
					password:'',
				}
			}
		},
		methods: {
			async register(){
				console.log(this.regTeacher);
				await this.$u.post('/teacher_user/register',this.regTeacher);
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
