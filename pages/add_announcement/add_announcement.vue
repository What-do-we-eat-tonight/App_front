<template>
	<view class="register">
		<u-form style="width:90%;background-color: #FFFFFF;padding:0 20rpx;">
			<u-form-item >
				<u-input v-model="addannouncement.tno"  placeholder="请输入您的工号" />
			</u-form-item>
			<u-form-item >
				<u-input v-model="addannouncement.cno"  placeholder="请输入课程编号" />
			</u-form-item>
			<u-form-item >
				<u-input v-model="addannouncement.content"  placeholder="请输入公告内容"  />
			</u-form-item>
		</u-form>
		<u-modal v-model="show" :content="content" @confirm="add" showCancelButton="true"
				 confirm-text="确认" cancel-text="取消" ></u-modal>
		<u-button @click="open" style="width:30%;margin-top:5%;" :ripple="true"  type="primary" >
			确认添加
		</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				content: '公告发布后不可修改，您是否确认添加公告？',
				addannouncement:{
					tno:'',
					cno:'',
					content:'',
				}
			}
		},
		methods: {
			open(){
				this.show = true;
			},
			async add(){
				
				console.log(this.addannouncement);
				await this.$u.post('/teacher_user/insert-announcement',this.addannouncement);
				//到这里一定成功
				this.$u.toast('添加成功!');
				this.$u.route({
								url: 'pages/teacher_announcement/teacher_announcement',
								type: 'to'
							})
			}
		}
	}
</script>

<style scoped>
	.register{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
