<template>
	<view class="container" blurEffect="light">
		<uni-card isFull :is-shadow="false" v-for="(item, index) in items">
			<text>{{item.C_evaluation_text}}</text>
		</uni-card>
		<uni-card>
		<uni-easyinput type = "textarea" v-model="value" placeholder="请输入课程评价" ></uni-easyinput>
		</uni-card>
		<u-button @click="send" type="primary">发送</u-button>
		{{value}}
	</view>
</template>

<script>
	export default {
		components: {},
			data() {
				return {
					items:[],
					value:''
				}
			},
		
		methods: {
			getMore() {
				uni.showToast({
					title: '点击查看更多',
					icon: 'none'
				})
			},
			async getitems(){
				//console.log("----------");
				let test = {
					sno:uni.getStorageSync("login_id"),
					cno:uni.getStorageSync("cno")
				};
				await this.$u.post('/student_user/evaluation',test).then((res)=> {
					this.items = res
					console.log(res);
				});
				console.log(this.items);
			},
			async send(){
				let put_evaluation_info = {
					sno:uni.getStorageSync("login_id"),
					cno:uni.getStorageSync("cno"),
					evaluation_text:this.value,
					count:1
				};
				console.log(put_evaluation_info);
				await this.$u.post('/student_user/putEvaluation',put_evaluation_info);
				this.$u.toast('发送成功');
			}
		},
		onLoad() {
			//console.log("=========");
			this.getitems();
		}
	}
</script>

<style lang="scss">

	.container {
		/* #ifndef APP-NVUE */
		position: absolute;
		left: 0;
		right:0;
		top: 0;
		bottom: 0;
		/* #endif */
	}
</style>
