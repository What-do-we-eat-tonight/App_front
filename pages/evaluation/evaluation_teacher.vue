<template>
	<view class="container" blurEffect="light">
		<uni-card isFull :is-shadow="false" v-for="(item, index) in items">
			<text>{{item.C_evaluation_text}}</text>
		</uni-card>
	</view>
</template>

<script>
	export default {
		components: {},
			data() {
				return {
					items:[]
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
					tno:uni.getStorageSync("login_id"),
					cno:uni.getStorageSync("cno")
				};
				await this.$u.post('/teacher_user/evaluation',test).then((res)=> {
					this.items = res
					console.log(res);
				});
				console.log(this.items);
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
