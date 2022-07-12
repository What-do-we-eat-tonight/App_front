<template>
	<view class="container" blurEffect="light">
		<uni-card isFull :is-shadow="false" v-for="(item, index) in items" 		   
				@touchstart="gtouchstart(item.evaluation_num)"
				@touchmove="gtouchmove()"
				@touchend="showDeleteButton(item)">
			<text>{{item.C_evaluation_text}}</text>
		</uni-card>
		<uni-card>
		<uni-easyinput type = "textarea" v-model="value" placeholder="请输入课程评价" ></uni-easyinput>
		</uni-card>
		<u-button @click="send" type="primary">发送</u-button>
		
	</view>
</template>

<script>
	export default {
		components: {},
			data() {
				return {
					items:[],
					value:'',
					timeOutEvent:0,
					dele:false,
					num:-1
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
			},
			//长按事件（起始）
			gtouchstart(item) {
				var self = this;
				this.timeOutEvent = setTimeout(function () {
				self.longPress(item);
				}, 500); //这里设置定时器，定义长按500毫秒触发长按事件
				return false;
			},
			//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
			showDeleteButton(item) {
				clearTimeout(this.timeOutEvent); //清除定时器
				if (this.timeOutEvent != 0) {
					//这里写要执行的内容（如onclick事件）
					console.log("点击但未长按");
				}
				return false;
			},
			//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
			gtouchmove() {
				clearTimeout(this.timeOutEvent); //清除定时器
				this.timeOutEvent = 0;
			},
			//真正长按后应该执行的内容
			async longPress(val) {
				this.timeOutEvent = 0;
				//执行长按要执行的内容，如弹出菜单
				var that = this;
				that.num = val;
				console.log(that.num);
				uni.showModal({
					title: '确认删除评价',
					content: '请确认是否删除这条评价',
					success:async function (res) {
						if (res.confirm) {
							//确认 删除评价
							that.dele = true;
							//console.log(that.dele);
							let del = {
								eva_no: that.num,
								user_id:uni.getStorageSync("login_id")
							};
							console.log(del);

							await that.$u.post('/student_user/delete_eva', del);
							that.$u.toast('删除成功');
						} else if (res.cancel) {
							//不删除
						}
					}
				});
			}
		},
		onLoad() {
			//console.log("=========");
			this.getitems();
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.getitems();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onBackPress(e){
			console.log(e);
			if(e.from == 'backbutton'){
				this.$u.route('/pages/class/class');
			}
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
