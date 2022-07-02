<template>
	<view class="index">
		<!-- u-navbar 自定义导航栏内容 -->
		<!-- 在pages.json文件中修改对应的style -->
		<!-- 课程的公告栏 -->
		<u-navbar back-text="返回" title="课程公告" @click="toback" index="back"></u-navbar>
		
		<view v-for="(item,idx) in announcement_list" :key="idx" class="announcement">
			<view class="content_title">公告内容为：</view>
			<view class="content">{{item.content}}</view>
			<u-row gutter="66">
				<u-col span="66">
					<view class="teacher_no">教师编号：{{item.tno}}</view>
				</u-col>
				<u-col span="66">
					<view class="class_no">课程编号：{{item.cno}}</view>
				</u-col>
			</u-row>
			<u-button class="getclick">确认收到</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				c:{
					cno:'',
				},
				announcement_list:[],
			}
		},
		//生命周期方法，表示页面正在加载还未显示之前执行的逻辑。
		onLoad() {
			//this.getMealList();
		},
		methods: {
			async test(){
				//this.c.cno = uni.getStorageSync("login_id");
				this.c.cno = uni.getStorageSync("cno");
				console.log(this.c);
				this.announcement_list = await this.$u.post('/student_user/announcement-list',this.c);
			},
			async toback(back){
				console.log('========', back);
				this.$u.route({
					url: '/pages/class/class',//修改成“公告”页面地址
					type: 'to'
				});
			}
		},
		onShow(){
			this.test();
		}
	}
</script>

<style scoped>
	/*scoped 样式仅在本页面有效*/
	.index{
		width: 600rpx;
		height: 500rpx;
		margin: auto;
	}
	.announcement{
		margin: 60rpx auto auto;
		width: 100%;
		height: auto;
		background-color: white;
	}
	
	.content_title{
		margin: 10rpx auto;
		width:90%;
		font-family:Helvetica;
		font-size: 1.2rem;
	}
	
	.content{
		margin: 10rpx auto;
		width:90%;
		font-family:Helvetica;
		font-size: 1.2rem;
		color: red;
	}
	.teacher_no{
		margin: 10rpx auto 0rpx;
		width:100%;
		height:40rpx;
	}
	.class_no{
		margin: 10rpx auto;
		width:100%;
		height:40rpx;
	}
	.getclick{
		margin: 10rpx auto;
		width:30%;
		height:40rpx;
	}
</style>

