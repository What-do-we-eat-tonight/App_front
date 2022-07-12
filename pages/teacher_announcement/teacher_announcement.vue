<!-- 课程的公告栏 -->
<!-- 1、查看公告确认人数
	 2、添加新的公告
	 3、查看公告内容-->
<template>
	<view class="index">
		<!-- 以下用以显示课程列表 -->
		<view v-for="(item,idx) in announcement_list" :key="idx">
			<!-- 点击进入课程公告内容页面 -->
			<uni-collapse :accordion="true">
				<!-- 课程公告标题栏 -->
				<uni-collapse-item align="left" :title="get_title(item.content).toString()" >
					<!-- 课程公告内容栏 -->
					<u-cell-item :arrow="false">
						<!-- 内容左对齐 -->
						<view align="left">{{item.content}}</view>
						<!-- 时间右对齐 -->
						{{item.submit_time}}
						
					</u-cell-item>
					<u-row gutter="16">
							<u-col span="8">
								<!-- 查看已收到的人数 -->
								<u-button type="info" class="content" >已确定收到的人数为：{{item.confirmNum}}</u-button>
							</u-col>
							<u-col span="4">
								<u-modal v-model="show" :content="content" :show-cancel-button="true" 
										 @confirm="delete_announcement"></u-modal>
								<u-button type="error" @click="open(idx)">删除公告</u-button>
							</u-col>
					</u-row>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				content: '您是否确认删除公告？',
				idx:'',
				//用于获取公告列表
				c: {
					cno: '', //该课程的课程号
					sno:'',
				},
				announcement_list: [], //存储获得的课程公告列表内容
				//t、title用以截断字符串
				title: [{}],
				t: {
					ano:'',
				},
			}
		},
		methods: {
			//获取课程公告列表
			async test() {
				//获取课程号
				this.c.cno = uni.getStorageSync("cno");
				console.log(this.c);
				//获取课程公告列表
				//列表内容：ano,cname,cno,content,ifconfirm,submit_time,tname,tno
				this.announcement_list = await this.$u.post('/student_user/announcement-list', this.c);
			},
			//截取公告第一分句作为公告标题
			get_title(content) {
				var t = content;
				var title = t.split("",10);
				title[0]=title[0]+title[1]+title[2]+title[3]+title[4]+title[5]+title[6]+title[7]+title[8]+title[9];
				return title[0];
			},
			open(idx){
				this.show = true;
				this.idx = idx;
			},
			//用于删除公告
			async delete_announcement(){
				this.t.ano = this.announcement_list[this.idx].ano;
				console.log(this.t);
				await this.$u.post('/teacher_user/delete-announcement',this.t);
				//到这里一定成功
				this.$u.toast('删除成功!');
				this.$u.route({
								url: 'pages/teacher_announcement/teacher_announcement',
								type: 'to'
							})
			}
		},
		//跳转至添加公告页面
		onNavigationBarButtonTap(){
			this.$u.route({
				url:'/pages/add_announcement/add_announcement',
			});
		},
		onShow() {
			this.test();
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.test();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style lang="scss" scoped>
	/*scoped 样式仅在本页面有效*/
	.index {
		width: 600rpx;
		height: 500rpx;
		margin: auto;
		text-align: center;
	}
	.content {
		font-family: Helvetica;
		text-align: left;
		font-size: 0.8rem;
	}
</style>
