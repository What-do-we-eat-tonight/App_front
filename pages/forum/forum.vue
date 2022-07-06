<template>
	<view class = "container">
		<uni-section :title="'问题' + (index + 1)" type="line" v-for = "(ques, index) in questions">
			<uni-card  :title='"用户名"+" 提问"' :sub-title="ques.q_user" :extra='ques.q_time' :thumbnail="ques_avatar" @click="onClick">
				<text class="uni-body">{{ques.q_con}}</text>
				<view slot="actions" class="card-actions">
					<view class="card-actions-item" >
						<uni-icons type="heart" size="18" color="#999" @click="like_it(ques.q_id, index)" v-if = "!state"></uni-icons>
						<uni-icons type="heart-filled" size="18" color="#ff0000" @click="dislike_it(ques.q_id, index)" v-else-if = "state"></uni-icons>
						<text class="card-actions-item-text">{{ques.q_like}}</text>
					</view>
					<view class="card-actions-item" @click="actionsClick()">
						<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">评论</text>
					</view>
				</view>
			</uni-card>
			<uni-card  :title='ans.user_id+" 回复" + ques.q_user' sub-title="副标题" :extra='ans.answer_time' :thumbnail="ans_avatar" @click="onClick" v-for="(ans, index2) in answers1[index]">
				<text class="uni-body">{{ans.answer}}</text>
				<view slot="actions" class="card-actions">
					<view class="card-actions-item" @click="like_it(ans.ans_num, index2)">
						<uni-icons type="heart" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">{{ans.like_num}}</text>
					</view>
					<view class="card-actions-item" @click="comment()">
						<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">评论</text>
					</view>
				</view>
			</uni-card>
		</uni-section>

	</view>
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
					state: false
				}
			},
		
		methods: {
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
			async like_it(ques_id, index){
				//this.like_ques[index] = !this.like_ques[index];
				this.state = !this.state;
				console.log(this.like_ques);
			},
			async dislike_it(ques_id, index){
				this.state = !this.state;
				//this.like_ques[index] = !this.like_ques[index];
				console.log(this.like_ques);
			},
			getMore() {
				uni.showToast({
					title: '点击查看更多',
					icon: 'none'
				})
			},
			async getAnswers1(){
				let test = {
					ques_num1:'COMP1221'
				};
				await this.$u.post('student_user/GetQuestion',test).then((res)=>{
					this.questions = res;
				});
				console.log(this.questions);
			}
		},
		onLoad() {
			//console.log("=========");
			this.getQuestions();
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