<template>
	<view v-if="!isLogin" class="login">
		<u-navbar back-text="返回" title="剑未配妥，出门已是江湖"></u-navbar>
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
</template>

<script>
	export default {
		data() {
			return {
				s_id:'',
				is_t:false,
				isLogin:false,
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
				uni.setStorageSync("is_t",false);
				console.log("老师：",this.is_t);
				
				this.s_id2 = uni.getStorageSync("s_id");
				console.log('the s_id is'+this.s_id2);
				
				this.$u.toast('登陆成功!');
				this.$u.route({
								url: 'pages/classlist/classlist',
								type: 'tab'
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
