<template>
	<view class="register">
		<u-form style="width:90%;background-color: #FFFFFF;padding:0 20rpx;">
			<u-form-item >
				<u-input v-model="addannouncement.tno"  placeholder="请输入您的账号" />
			</u-form-item>
			<u-form-item >
				<u-input v-model="addannouncement.cno"  placeholder="请输入课程编号" />
			</u-form-item>
			<u-form-item >
				<u-input v-model="addannouncement.content"  placeholder="请输入公告内容"  />
			</u-form-item>
		</u-form>
			<u-button @click="add" style="width:30%;margin-top:5%;" :ripple="true"  type="primary">确认添加</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addannouncement:{
					tno:'',
					cno:'',
					content:'',
				}
			}
		},
		methods: {
			async add(){
				console.log(this.addannouncement);
				await this.$u.post('/teacher_user/insert-announcement',this.addannouncement);
				//到这里一定成功
				this.$u.toast('添加成功!');
				this.$u.route({
								url: 'pages/announcement_list/announcement_list',
								type: 'to'
							})
			},
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
