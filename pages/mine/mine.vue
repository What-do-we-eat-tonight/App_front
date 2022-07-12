<template>
	<view>
		<button type="default" @click="change_password()">修改密码</button>
		<button type="default" @click="my_info()">查看个人信息</button>
		<view v-if="isLogin" style="margin-top:5%;margin-bottom:50rpx;">
			<u-button @click="logout" style="width:30%;" :ripple="true" type="primary">退出登录</u-button>
		</view>
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
				},
				info:{}
			}
		},
		methods: {
			get_message() {
				this.isLogin = uni.getStorageSync("isLogin");
				this.is_t = uni.getStorageSync("is_t");
				console.log("isLogin=", this.isLogin);
			},
			async my_info(){
				let post_info = {
					user_id:uni.getStorageSync('login_id')
				}
				console.log(post_info);
				this.info = await this.$u.post("student_user/getuserinfo", post_info);
				let that = this;
				console.log(this.info);
				if(uni.getStorageSync('is_t')){
					uni.showModal({
						title:"个人信息",
						content: that.info[0].teacher_no + '\n' + this.info[0].teacher_name + '\n' + this.info[0].email,
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
				else{
					uni.showModal({
						title:"个人信息",
						content: that.info[0].sno + '\n' + this.info[0].sname + '\n' + this.info[0].major + '\n' + this.info[0].classes,
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}

			},
			logout() {
				uni.setStorageSync("is_t",false)
				uni.setStorageSync("isLogin", false) //在客户端存储信息，结构式键值对
				
				this.$u.toast('退出登录成功!');
				this.$u.route({
					url: 'pages/index/index'
				})
			},
			async change_password(){
				this.$u.route({
					url: 'pages/change_password/change_password'
				});
			}
		},
		onShow() {
			this.get_message()
		}
	}
</script>

<style>

</style>
