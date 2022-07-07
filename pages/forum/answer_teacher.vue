<template>
	<uni-collapse v-for="(ans, index) in answers">
		<uni-collapse-item titleBorder="none" >
			<template v-slot:title>
				<uni-list>
				<uni-card  :title='ans.user_name+" 回答"' :sub-title="ans.user_id" :extra='ans.answer_time'  :thumbnail="ans_avatar">
					<view class="tag-view">
						<uni-tag text="老师赞过" type="error" :circle="true" v-if = "ans.teacher_like"/>
					</view>
					<text class="uni-body">{{ans.answer}}</text>
					<view slot="actions" class="card-actions">
						<view class="card-actions-item" >
							<uni-icons type="heart" size="18" color="#999" @click="like_it1(ans.answer_num, index)" v-if = "!ans.hasliked"></uni-icons>
							<uni-icons type="heart-filled" size="18" color="#ff0000" @click="dislike_it()" v-else></uni-icons>
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
			<view class="content" v-for = "(ans2, index2) in ans.answer2s">
				<uni-card  :title='ans2.user_name' :sub-title="ans2.user_id" :extra='ans2.answer_time'>
					<view class="tag-view">
						<uni-tag text="老师赞过" type="error" :circle="true" v-if = "ans2.teacher_like"/>
					</view>
					<text class="uni-body">{{ans2.answer}}</text>
					<view slot="actions" class="card-actions">
						<view class="card-actions-item" >
							<uni-icons type="heart" size="18" color="#999" @click="like_it2(ans2.answer_num, index, index2)" v-if = "!ans2.hasliked"></uni-icons>
							<uni-icons type="heart-filled" size="18" color="#ff0000" @click="dislike_it()" v-else></uni-icons>
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
		
		<input type = "textarea" rows="7" v-model="new_ans" ref = "myinput" focus placeholder="我也要写回答...." v-if = "level1"/>
		<input type = "textarea" rows="7" v-model="ans2" ref = "myinput" focus :placeholder="'回复:' + ans_who" v-else/>
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
					focus:false
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
				this.level1 = false;
				this.ans_no = num;
				this.ans_who = name;
				console.log(this.level1);
				this.$refs.myinput.focus();
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
		
				let like_ans2_post = {
					sequence_num:num,
					tno:uni.getStorageSync('login_id')
				};
				await this.$u.post('teacher_user/answer2_thumbs',like_ans2_post);
				this.$u.toast('点赞成功');
			},
			async dislike_it(){
				//取消点赞
				//暂时没有设计
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
			}
		},
		onLoad() {
			//console.log("=========");
			this.getAnswers();
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
		.example-body {
			flex-direction: column;
			flex: 1;
		}
	
		.content {
			padding: 15px;
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