<template>
	<uni-collapse v-for="(ans, index) in answers">
		<uni-collapse-item titleBorder="none" >
			<template v-slot:title>
				<uni-list>
				<uni-card  :title='ans.user_name+" 回答"' :sub-title="ans.user_id" :extra='ans.answer_time'  :thumbnail="ans_avatar" 
					@touchstart="gtouchstart(ans.answer_num, ans.user_id)"
					@touchmove="gtouchmove()"
					@touchend="showDeleteButton(ans.answer_num, ans.user_id)">
					<view class="tag-view" style="margin-bottom: 5px;margin-top: 0px;margin-left: 5px;">
						<uni-tag text="老师赞过" type="error" :circle="true" v-if = "ans.teacher_like"/>
					</view>
					<text class="uni-body">{{ans.answer}}</text>
					<view slot="actions" class="card-actions">
						<view class="card-actions-item" >
							<uni-icons type="heart" size="18" color="#999" @click="like_it1(ans.answer_num, index)" v-if = "!ans.hasliked"></uni-icons>
							<uni-icons type="heart-filled" size="18" color="#ff0000" @click="dislike_it1(ans.answer_num, index)" v-else></uni-icons>
							<text class="card-actions-item-text">{{ans.like_num}}</text>
						</view>
						<view class="card-actions-item" @click="comment2(ans.user_name, ans.answer_num)">
							<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">评论({{ans.len}})</text>
						</view>
					</view>
				</uni-card>
				</uni-list>
			</template>
			<view class="content" v-for = "(ans2, index2) in ans.answer2s" style = "margin-top: 0px;margin-bottom: 0px;">
				<uni-card  :title='ans2.user_name' :sub-title="ans2.user_id" :extra='ans2.answer_time'
					@touchstart="gtouchstart2(ans2.answer_num, ans2.user_id)"
					@touchmove="gtouchmove2()"
					@touchend="showDeleteButton2(ans2.answer_num, ans2.user_id)">
					<view class="tag-view" style="margin-bottom: 5px;margin-top: 0px;margin-left: 5px;">
						<uni-tag text="老师赞过" type="error" :circle="true" v-if = "ans2.teacher_like"/>
					</view>
					<text class="uni-body">{{ans2.answer}}</text>
					<view slot="actions" class="card-actions">
						<view class="card-actions-item" >
							<uni-icons type="heart" size="18" color="#999" @click="like_it2(ans2.answer_num, index, index2)" v-if = "!ans2.hasliked"></uni-icons>
							<uni-icons type="heart-filled" size="18" color="#ff0000" @click="dislike_it2(ans2.answer_num, index, index2)" v-else></uni-icons>
							<text class="card-actions-item-text">{{ans2.like_num}}</text>
						</view>
						<view class="card-actions-item" @click="comment2(ans2.user_name, ans.answer_num)">
							<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
							<text class="card-actions-item-text">评论</text>
						</view>
					</view>
				</uni-card>
			</view>
		</uni-collapse-item>

	</uni-collapse>
	<uni-card>
		<!--
		<uni-easyinput type = "textarea" v-model="new_ans" :focus="focus" placeholder="我也要写回答...." v-if = "level1"></uni-easyinput>
		<uni-easyinput type = "textarea" v-model="ans2" :focus="focus" :placeholder="'回复:' + ans_who" v-else></uni-easyinput>
		-->
		
		<textarea  style="height: 50px;" v-model="new_ans" ref = "myinput" focus placeholder="我也要写回答...." v-if = "level1"/>
		<textarea  style="height: 50px;" v-model="ans2" ref = "myinput" :focus="is_focus" :placeholder="'回复:' + ans_who" v-else/>
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
					new_ans:'',
					answers:[],
					like_ques:[],
					like_ans:[],
					state: false,
					level1:true,
					ans_who:'',
					ans2:'',
					question_no:0,
					ans_no:0,
					is_focus:false,
					num:-1,
					ans_user:-1,
					timeOutEvent1:0,
					timeOutEvent2:0
				}
			},
		
		methods: {
			comment1(){
				//一级评论
				this.level1 = true;
				this.ans_who = '';
				this.ans_no = -1;
			},
			comment2(name, num){
				//二级评论
				this.is_focus = false;
				this.level1 = false;
				this.ans_no = num;
				this.ans_who = name;
				console.log(this.level1);
				this.$nextTick(()=>{
					this.is_focus = true;
				})
			},
			async send(){
				let ans_post = {};
				if(this.level1){
					ans_post = {
						question_no: uni.getStorageSync("q_num"),
						answer: this.new_ans,
						user_id: uni.getStorageSync("login_id")
					};
					console.log(ans_post);
					await this.$u.post('student_user/answer1',ans_post);
					this.$u.toast('发送成功');
				}else{
					ans_post = {
						answer_no: this.ans_no,
						answer: this.ans2,
						user_id: uni.getStorageSync("login_id"),
						answer_who:this.ans_who
					};
					console.log(ans_post);
					await this.$u.post('student_user/answer2',ans_post);
					this.$u.toast('发送成功');
				}
				
			},
			async getQuestions(){
				let test = {
					cno:'COMP1221'
				};
				await this.$u.post('student_user/GetQuestion',test).then((res)=>{
					this.questions = res;
					this.like_ques.push({});
				});
				console.log(this.questions);
				let i = 0;
				for(var ques in this.questions){
					console.log(ques);
					let ele = this.questions[i];
					let get_answer_post = {
						question_num1 :ele.q_id
					};
					console.log(get_answer_post);
					await this.$u.post('student_user/getanswer',get_answer_post).then((res)=>{
						this.answers1.push(res);
						this.like_ans.push(false);
						console.log(res);
					})
					i++;
				}

				console.log(this.questions);
			},
			async like_it1(num, index){
				//点赞
				this.answers[index].hasliked = true;
				this.answers[index].like_num++;
				this.answers[index].teacher_like = true;
				let like_ans1_post = {
					sequence_num:num,
					tno:uni.getStorageSync('login_id')
				};
				console.log(like_ans1_post);
				await this.$u.post('teacher_user/answer_thumbs',like_ans1_post);
				this.$u.toast('点赞成功');
			},
			async like_it2(num, index1, index2){
				this.answers[index1].answer2s[index2].hasliked = true;
				this.answers[index1].answer2s[index2].like_num ++;
				this.answers[index1].answer2s[index2].teacher_like = true;
				let like_ans2_post = {
					sequence_num:num,
					tno:uni.getStorageSync('login_id')
				};
				await this.$u.post('teacher_user/answer2_thumbs',like_ans2_post);
				this.$u.toast('点赞成功');
			},
			async dislike_it1(num, index){
				//取消点赞
				this.answers[index].hasliked = false;
				this.answers[index].like_num--;
				//this.answers[index].teacher_like = false;
				
				let dislike_ans1_post = {
					sequence_num:num,
					tno:uni.getStorageSync('login_id')
				};
				await this.$u.post('teacher_user/answer_thumbs_cancel', dislike_ans1_post);
				this.$u.toast('取消点赞成功');
			},
			async dislike_it2(num, index1, index2){
				this.answers[index1].answer2s[index2].hasliked = false;
				this.answers[index1].answer2s[index2].like_num --;
				//this.answers[index1].answer2s[index2].teacher_like = false;
				let dislike_ans2_post = {
					sequence_num:num,
					tno:uni.getStorageSync('login_id')
				};
				await this.$u.post('teacher_user/answer2_thumbs_cancel',dislike_ans2_post);
				this.$u.toast('取消点赞成功');
			},
			async getAnswers(){
				let test = {
					question_num1:uni.getStorageSync("q_num"),
					user_id:uni.getStorageSync('login_id')
				};
				console.log(test);
				await this.$u.post('student_user/getanswer',test).then((res)=>{
					this.answers = res;
				});
				console.log(this.answers);
			},
			//长按事件（起始）
			gtouchstart(item, id) {
				var self = this;
				this.timeOutEvent1 = setTimeout(function () {
				self.longPress(item, id);
				}, 500); //这里设置定时器，定义长按500毫秒触发长按事件
				return false;
			},
			//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
			showDeleteButton(item) {
				clearTimeout(this.timeOutEvent1); //清除定时器
				if (this.timeOutEvent1 != 0) {
					//这里写要执行的内容（如onclick事件）
					console.log("点击但未长按");
				}
				return false;
			},
			//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
			gtouchmove() {
				clearTimeout(this.timeOutEvent1); //清除定时器
				this.timeOutEvent1 = 0;
			},
			//真正长按后应该执行的内容
			async longPress(val, id) {
				this.timeOutEvent1 = 0;
				//执行长按要执行的内容，如弹出菜单
				var that = this;
				that.num = val;
				that.ans_user = id;
				console.log(that.num);
				uni.showModal({
					title: '确认删除回答',
					content: '请确认是否删除这条回答',
					success:async function (res) {
						if (res.confirm) {
							//确认 删除提问
							//that.dele = true;
							//console.log(that.dele);
							let del = {
								answer_no1:that.num
							};
							console.log(del);
										
							await that.$u.post('student_user/del_answer1', del);
							that.$u.toast('删除成功');
			
						} else if (res.cancel) {
							//不删除
						}
					}
				});
			},
			//长按事件（起始）
			gtouchstart2(item, id) {
				var self = this;
				this.timeOutEvent2 = setTimeout(function () {
				self.longPress2(item, id);
				}, 500); //这里设置定时器，定义长按500毫秒触发长按事件
				return false;
			},
			//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
			showDeleteButton2(item) {
				clearTimeout(this.timeOutEvent2); //清除定时器
				if (this.timeOutEvent2 != 0) {
					//这里写要执行的内容（如onclick事件）
					console.log("点击但未长按");
				}
				return false;
			},
			//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
			gtouchmove2() {
				clearTimeout(this.timeOutEvent2); //清除定时器
				this.timeOutEvent2 = 0;
			},
			//真正长按后应该执行的内容
			async longPress2(val, id) {
				this.timeOutEvent = 0;
				//执行长按要执行的内容，如弹出菜单
				var that = this;
				that.num = val;
				that.ans_user = id;
				console.log(that.num);
				uni.showModal({
					title: '确认删除回复',
					content: '请确认是否删除这条回复',
					success:async function (res) {
						if (res.confirm) {
							//确认 删除提问
							//that.dele = true;
							//console.log(that.dele);
							let del = {
								answer_no2:that.num
							};
							console.log(del);
										
							await that.$u.post('student_user/del_answer2', del);
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
			this.getAnswers();
		},
		onBackPress(){
			console.log("yesyesyes");
			/*
			uni.showModal({
			title: '提示',  
			content: '是否退出uni-app？',  
			success: function(res) {  
				if (res.confirm) {  
					// 退出当前应用，改方法只在App中生效  
					plus.runtime.quit();  
				} else if (res.cancel) {  
					console.log('用户点击取消');  
				}  
			}  
			});  
			return true  ;
			*/

		},
		onPullDownRefresh() {
			console.log('refresh');
			this.getAnswers();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>


<style scoped lang="scss">
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
		height: 20px;
		//border-top: px #eee solid;
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
		.example-body {
			flex-direction: column;
			flex: 1;
		}
	
		.content {
			padding-left: 15px;
			margin-right: 30px;
		}
	
		.text {
			font-size: 14px;
			color: #666;
			line-height: 20px;
		}
	
		.button {
			// margin-top: 10px;
			margin: 10px;
			margin-bottom: 0;
		}
</style>