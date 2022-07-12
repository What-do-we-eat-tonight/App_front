<template>
	<view v-if="!isLogin" class="login">
		
		<view style="width:300rpx;margin-top:15%;margin-bottom:50rpx;">
			<u-image width="100%" height="300rpx" src="/static/student1.png" shape="circle"></u-image>
		</view>
		
		<u-form style="width:90%;background-color: #FFFFFF;padding:0 20rpx;">
			<u-form-item>
				<u-input v-model="loginUser.u_id" placeholder="请输入账号" />
			</u-form-item>
			<u-form-item>
				<u-input v-model="loginUser.u_pwd" type='password' placeholder="请输入密码"  :password-icon="true" />
			</u-form-item>
		</u-form>
		
		<view style="width:600rpx;margin-top:70rpx">
			<u-row gutter="16">
				<u-col span="6">
					<u-button @click="login" style="width:80%;" :ripple="true"  type="primary">登录</u-button>
				</u-col>
				<u-col span="6">
					<u-button @click="register" style="width:80%;" :ripple="true"  type="primary">注册</u-button>
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
				login_id:'',//存储学生的学号
				login_id2:'',
				is_t: false, //是否是教师
				isLogin:false,//存储登录状态
				loginUser:{
					u_id:'',
					u_pwd:''
				}
			}
		},
		methods: {
			async login(){
				console.log(this.loginUser);
				await this.$u.post('/student_user/login',this.loginUser);
				//到这里一定成功
				uni.setStorageSync("isLogin",true)//在客户端存储信息，结构式键值对
				uni.setStorageSync("login_id",this.loginUser.u_id)//在客户端存储信息，结构式键值对
				uni.setStorageSync("is_t", false)
				console.log(this.is_t)
				// this.login_id2 = uni.getStorageSync("login_id");
				// console.log('the login id is'+this.login_id2);
				this.$u.toast('登陆成功!');
				this.$u.route({
								url: 'pages/classlist/classlist',
								type: 'tab'
							})
			},
			async logout(){

				console.log(this.loginUser);
				uni.setStorageSync("isLogin",false)//在客户端存储信息，结构式键值对
				console.log("isLogin is " + this.isLogin);
        uni.clearStorageSync();

				this.$u.toast('退出登录成功!');
				this.$u.route({
								url: 'pages/index/index',
							})
			},

			async register(){
				this.$u.route({
								url: 'pages/register/register',
							})
			}
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
