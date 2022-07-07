<template>
	<view v-if="!isLogin" class="login">
		
		<view style="width:300rpx;margin-top:15%;margin-bottom:50rpx;">
			<u-image width="100%" height="300rpx" src="/static/teacher1.png" shape="circle"></u-image>
		</view>
		
		<u-form style="width:90%;background-color: #FFFFFF;padding:0 20rpx;">
			<u-form-item>
				<u-input v-model="loginTeacher.teacher_id" placeholder="请输入账号" />
			</u-form-item>
			<u-form-item>
				<u-input v-model="loginTeacher.teacher_pwd" type='password' placeholder="请输入密码"  :password-icon="true" />
			</u-form-item>
		</u-form>
		
		<view style="width:600rpx;margin-top:70rpx">
			<u-row gutter="16">
				<u-col span="6">
					<u-button @click="login" style="width:80%;" :ripple="true"  type="primary">登录</u-button>
				</u-col>
				<u-col span="6">
					<u-button @click="login" style="width:80%;" :ripple="true"  type="primary">注册</u-button>
				</u-col>
			</u-row>
		</view>
		
	</view>
	
	<view v-if="isLogin" style="margin-top:5%;margin-bottom:50rpx;">
		<u-button @click="logout" style="width:30%;" :ripple="true"  type="primary">退出登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin:false,
				loginTeacher:{
					teacher_id:'',
					teacher_pwd:''
				}
			}
		},
		methods: {
			async login(){
				console.log(this.loginTeacher);
				await this.$u.post('/teacher_user/login',this.loginTeacher);
				//到这里一定成功
				uni.setStorageSync("isLogin",true)//在客户端存储信息，结构式键值对
				uni.setStorageSync('login_id',this.loginTeacher.teacher_id);
				this.$u.toast('登陆成功!');
				this.$u.route({
								url: 'pages/teacher_classlist/teacher_classlist',
								type: 'to'
							})
			},
			async logout(){
				console.log(this.loginTeacher);
				uni.setStorageSync("isLogin",false)//在客户端存储信息，结构式键值对
				console.log("isLogin is " + this.isLogin);
				this.$u.toast('退出登录成功!');
				this.$u.route({
								url: 'pages/index/index',
								type: 'to'
							})
			}
		},
		async register(){
			this.$u.route({
							url: 'pages/teacher_register/teacher_register',
						})
		},
		onShow(){
			this.isLogin = uni.getStorageSync("isLogin");
			console.log("+++++" + this.isLogin);
		}
	}
</script>

<style scoped>
	.login{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
