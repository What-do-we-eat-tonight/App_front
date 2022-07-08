<!-- 课程的公告栏 -->
<template>
	<view class="index">
		<!-- 以下用以显示课程列表 -->
		<view v-for="(item,idx) in announcement_list" :key="idx">
			<!-- 点击进入课程公告内容页面 -->
			<uni-collapse :accordion="true" @click="changestate(idx)">
				<!-- 课程公告标题栏 -->
				<uni-collapse-item align="left" :title="get_title(item.content).toString()" :open="true">
					<!-- 新消息提示标志 -->
					<u-badge v-if="!item.ifConfirm" :is-dot="true" type="error" :offset="[10,10]"></u-badge>
					<!-- 课程公告内容栏 -->
					<u-cell-item :arrow="false">
						<!-- 内容左对齐 -->
						<view align="left">{{item.content}}</view>
						<!-- 时间右对齐 -->
						{{item.submit_time}}
						<!-- 确认收到按钮 -->
						<!-- ifConfirm=0,未确认；ifConfirm=1,已确认； -->
						<u-button type="info" class="content" @click="confirm(idx)" v-if="!item.ifConfirm">
							确定收到</u-button>
					</u-cell-item>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用于获取公告列表
				c: {
					cno: '', //该课程的课程号
					sno:'',
				},
				//用于修改公告确认状态的向后端传输的数据
				a:{
					ano:'',
					sno:'',
				},
				announcement_list: [], //课程公告列表内容
				announcement_state:[],
				is_state:[],
				//t、title用以截断字符串
				title: [{}],
				t: '',
			}
		},
		methods: {
			//获取课程公告列表
			async test() {
				//获取学号
				this.c.sno = uni.getStorageSync("login_id");
				//获取课程号
				this.c.cno = uni.getStorageSync("cno");
				//获取课程公告列表
				this.announcement_list = await this.$u.post('/student_user/announcement-list', this.c);
				console.log(this.announcement_list);
			},
			//用以修改is_state的bool值，从而完成按钮的文字切换
			async changestate(idx){
				this.is_state[idx]=false;
			},
			//修改课程状态
			async confirm(idx) {
				//获取学号
				this.a.sno = uni.getStorageSync("login_id");
				//获取公告号
				this.a.ano = this.announcement_list[idx].ano;
								
				//向后端传参，用以修改数据库中公告确认状态，并获取结果
				this.announcement_state = await this.$u.post('/student_user/confirm-announcement',this.a);
				
				//重新获取课程公告列表
				this.announcement_list = await this.$u.post('/student_user/announcement-list', this.c);
				this.is_state[idx] = this.announcement_list[idx].ifConfirm;
			},
			//截取公告第一分句作为公告标题
			get_title(content) {
				var t = content;
				var title = t.split("",10);
				title[0]=title[0]+title[1]+title[2]+title[3]+title[4]+title[5]+title[6]+title[7]+title[8]+title[9];
				return title[0];
			},
			//返回课程列表页面
			async toback(back) {
				console.log('========', back);
				this.$u.route({
					url: '/pages/class/class', //修改成“公告”页面地址
				});
			},
		},
		onShow() {
			this.test();
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
