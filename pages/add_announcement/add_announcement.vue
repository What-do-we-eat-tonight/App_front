<template>
	<view>
		<uni-card>
			<u-input type="textarea" v-model="addannouncement.content" placeholder="请输入公告内容" :height="300"
				:clearable="true"></u-input>
		</uni-card>

		<u-row gutter="8" justify="center">
			<u-col span="4">
				<u-modal v-model="show" :content="content" @confirm="add" showCancelButton="true" confirm-text="确认"
					cancel-text="取消"></u-modal>
				<u-button @click="open" :ripple="true" type="primary">
					确认添加
				</u-button>
			</u-col>
			<u-col span="4">
				<u-button @click="get_draft" :ripple="true" type="success">
					恢复草稿
				</u-button>
			</u-col>
		</u-row>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: '公告发布后不可修改，您是否确认添加公告？',
				addannouncement: {
					tno: '',
					cno: ''
				},
				recive_content: [],
			}
		},
		methods: {
			open() {
				this.show = true;
			},
			async add() {
				console.log(this.addannouncement);
				await this.$u.post('/teacher_user/insert-announcement', this.addannouncement);
				//到这里一定成功
				this.$u.toast('添加成功!');
				this.$u.route({
					url: 'pages/teacher_announcement/teacher_announcement',
					type: 'to'
				})
			},
			//加载草稿公告的内容
			async get_draft() {
				this.addannouncement.tno = uni.getStorageSync("login_id");
				this.addannouncement.cno = uni.getStorageSync("cno");
				console.log(this.addannouncement);

				this.recive_content = await this.$u.post('/teacher_user/get-draft-announcement', this.addannouncement);
				console.log("==============");
				console.log(this.recive_content);

				this.addannouncement.content = this.recive_content[0].content;
				console.log(this.addannouncement.content);
			}
		},
		onNavigationBarButtonTap(){
			this.recive_content = this.$u.post('/teacher_user/save-draft-announcement', this.addannouncement);
			console.log("==============");
			console.log(this.recive_content);
			this.$u.toast('保存成功!');
		}
	}
</script>

<style scoped>
	.register {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
