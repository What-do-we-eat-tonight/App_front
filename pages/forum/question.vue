<template>
	<uni-card  :title='ques.q_name+" 提问"' :sub-title="ques.q_user" :extra='ques.q_time' :thumbnail="ques_avatar" v-for = "(ques, index) in questions" 
		@touchstart="gtouchstart(ques.q_id, ques.q_user)"
		@touchmove="gtouchmove()"
		@touchend="showDeleteButton(ques.q_id)">
		<view class="tag-view">
			<uni-tag text="老师提问" type="primary" :circle="true" v-if = "ques.q_user[0] == '1'"/>
		</view>
		<text class="uni-body">{{ques.q_con}}</text>
		<view slot="actions" class="card-actions">
			<view class="card-actions-item" >
				<uni-icons type="heart" size="18" color="#999" @click="like_it(ques.q_id, index)" v-if = "!ques.hasliked"></uni-icons>
				<uni-icons type="heart-filled" size="18" color="#ff0000" @click="dislike_it(ques.q_id, index)" v-else-if = "ques.hasliked"></uni-icons>
				<text class="card-actions-item-text">{{ques.q_like}}</text>
			</view>
			<view class="card-actions-item" @click="to_answer(ques.q_id)">
				<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
				<text class="card-actions-item-text">回答</text>
			</view>
		</view>
	</uni-card>
	<uni-card>
		<uni-easyinput type = "textarea" v-model="new_ques" placeholder="我也要提问...."></uni-easyinput>	
		<u-button @click="send" type="primary">发送</u-button>
	</uni-card>
</template>

<script>
	export default {
		components: {},
			data() {
				return {
					ques_avatar: '/static/ques2.png',
					ans_avatar:'/static/ans2.png',
					questions:[],
					value:'',
					answers1:[],
					answers2:[],
					like_ques:[],
					like_ans:[],
					state: false,
					new_ques:'',
					num:-1,
					ques_user:-1
				}
			},
		
		methods: {
			async send(){
				let ques_post = {
					cno:uni.getStorageSync('cno'),
					question:this.new_ques,
					sno:uni.getStorageSync("login_id"),
					time:"2022"
				};
				await this.$u.post('student_user/PutQuestion',ques_post);
				this.$u.toast('发布问题成功');
				this.getQuestions();
				this.new_ques = '';
			},
			async getQuestions(){
				let test = {
					cno:uni.getStorageSync('cno'),
					user_id:uni.getStorageSync("login_id")
				};
				console.log(test);
				await this.$u.post('student_user/GetQuestion',test).then((res)=>{
					this.questions = res;
					this.like_ques.push({});
				});
				console.log(this.questions);
			},

			async like_it(ques_id, index){
				//this.like_ques[index] = !this.like_ques[index];
				this.questions[index].hasliked = true;
				this.questions[index].q_like ++;
				// question_thumbs
				let like_ques_post = {
					sequence_num:ques_id,
					sno:uni.getStorageSync('login_id')
				};
				await this.$u.post('student_user/question_thumbs',like_ques_post);
				this.$u.toast('点赞成功');
			},
			async dislike_it(ques_id, index){
				//暂时没有设置取消点赞功能
				this.questions[index].hasliked = false;
				this.questions[index].q_like --;
				// question_thumbs
				let dislike_ques_post = {
					sequence_num:ques_id,
					sno:uni.getStorageSync('login_id')
				};
				await this.$u.post('student_user/question_thumbs_cancel',dislike_ques_post);
				this.$u.toast('点赞成功');
		
			},
			to_answer(q_num){
				uni.setStorageSync("q_num", q_num);
				
				this.$u.route({
								url: 'pages/forum/answer',
								type: 'to'
							})
			},
			//长按事件（起始）
			gtouchstart(item, id) {
				var self = this;
				this.timeOutEvent = setTimeout(function () {
				self.longPress(item, id);
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
			async longPress(val, id) {
				this.timeOutEvent = 0;
				//执行长按要执行的内容，如弹出菜单
				var that = this;
				that.num = val;
				that.ques_user = id;
				console.log(that.num);
				uni.showModal({
					title: '确认删除提问',
					content: '请确认是否删除这条提问',
					success:async function (res) {
						if (res.confirm) {
							//确认 删除提问
							if(uni.getStorageSync('login_id') != that.ques_user){
								//无权删除
								console.log(uni.getStorageSync('login_id'));
								console.log(that.ques_user);
								that.$u.toast("你无权删除");
							}
							else{
								//that.dele = true;
								//console.log(that.dele);
								let del = {
									q_id: that.num,
									user_id:uni.getStorageSync("login_id")
								};
								console.log(del);
											
								await that.$u.post('student_user/delete_question', del);
								that.$u.toast('删除成功');
							}

						} else if (res.cancel) {
							//不删除
						}
					}
				});
			}
			
		},
		onLoad() {
			//console.log("=========");
			this.getQuestions();
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.getQuestions();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onBackPress(e){
			console.log(e);
			if(e.from == 'backbutton'){
				setTimeout(()=>{
					this.$u.route('/pages/class/class');
				}, 500);
			}
		}
		
	}
</script>

<style scoped>
	.container {
		overflow: hidden;
	}
	
	.custom-cover {
		flex: 1;
		flex-direction: row;
		position: relative;
	}
	
	.cover-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		background-color: rgba($color: #000000, $alpha: 0.4);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 15px;
		font-size: 14px;
		color: #fff;
	}
	
	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		border-top: 1px #eee solid;
	}
	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;
	}
	.cover-image {
		flex: 1;
		height: 150px;
	}
	.no-border {
		border-width: 0;
	}
</style>