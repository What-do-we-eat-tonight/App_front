<template>
	<view>
		<view v-if="isLogin" style="margin-top:5%;margin-bottom:50rpx;">
			<u-button @click="logout" style="width:30%;" :ripple="true" type="primary">退出登录</u-button>
		</view>
		<u-button> 我的信息</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				is_t:false,
				loginTeacher: {
					teacher_id: '',
					teacher_pwd: ''
				}
			}
		},
		methods: {
			get_message() {
				this.isLogin = uni.getStorageSync("isLogin");
				this.is_t = uni.getStorageSync("is_t");
				console.log("isLogin=", this.isLogin);
			},
			logout() {
				uni.setStorageSync("is_t",false)
				uni.setStorageSync("isLogin", false) //在客户端存储信息，结构式键值对
				
				this.$u.toast('退出登录成功!');
				this.$u.route({
					url: 'pages/index/index'
				})
			}
		},
		onShow() {
			this.get_message()
		}
	}
</script>

<style>

</style>
