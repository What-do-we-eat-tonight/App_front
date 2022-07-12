<template>
	<uni-card  :title='ques.q_name+" 提问"' :sub-title="ques.q_user" :extra='ques.q_time' :thumbnail="ques_avatar" v-for = "(ques, index) in questions">
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
					new_ques:''
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
				this.$u.toast('发布问题成功成功');
			},
			async getQuestions(){
				let test = {
					cno:'COMP1221',
					user_id:uni.getStorageSync("login_id")
				};
				await this.$u.post('student_user/GetQuestion',test).then((res)=>{
					this.questions = res;
					this.like_ques.push({});
				});
				console.log(this.questions);
			},

			async like_it(ques_id, index){
				//this.like_ques[index] = !this.like_ques[index];
				this.questions[index].hasliked = true;
				
				// question_thumbs
				let like_ques_post = {
					sequence_num:ques_id,
					tno:uni.getStorageSync('login_id')
				};
				await this.$u.post('teacher_user/question_thumbs',like_ques_post);
				this.$u.toast('点赞成功');
			},
			async dislike_it(ques_id, index){
				//暂时没有设置取消点赞功能
				//this.questions[index].hasliked = false;
				//this.like_ques[index] = !this.like_ques[index];
		
			},
			to_answer(q_num){
				uni.setStorageSync("q_num", q_num);
				
				this.$u.route({
								url: 'pages/forum/answer_teacher',
								type: 'to'
							})
			}
		},
		onLoad() {
			//console.log("=========");
			this.getQuestions();
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