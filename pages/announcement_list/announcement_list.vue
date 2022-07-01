<template>
	<view class="index">
		<u-button @click="test">江湖</u-button>
		<view v-for="(item,idx) in announcement_list" :key="idx" class="announcement">
			<view class="content">公告内容为：{{item.content}}</view>
			<u-row gutter="16">
				<u-col span="6">
					<view class="teacher_name">教师编号：{{item.tno}}</view>
				</u-col>
				<u-col span="6">
					<view class="class_name">课程编号：{{item.cno}}</view>
				</u-col>
			</u-row>
			<u-button @click="get" class="getclick">确认收到</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login_id:'000111',
				title: 'Hello',
				c:{
					cno:'003',
				},
				announcement_list:[
					
				],
			}
		},
		//生命周期方法，表示页面正在加载还未显示之前执行的逻辑。
		onLoad() {
			//this.getMealList();
		},
		methods: {
			/*
			//获得餐品清单
			//方法为异步，则内部请求可以实现同步化
			async getMealList(){
				//加await 异步请求同步化
				this.meallist = await this.$u.get('/meal-list');
				console.log("======");
				
				//this.list = this.meallist.map(item=>({image:this.$u.apiBaseUrl + '/blob/' + item.meal_pic,title:item.meal_name}));
				
			}*/
			async test(){
				//this.c.cno = uni.getStorageSync("login_id");
				console.log(this.login_id);
				console.log(this.c);
				this.announcement_list = await this.$u.post('/student_user/announcement-list',this.c);
			}
		}
	}
</script>

<style scoped>
	/*scoped 样式仅在本页面有效*/
	.index{
		width: 600rpx;
		height: 400rpx;
		margin: auto;
	}
	.announcement{
		margin: 10rpx auto;
		width: 80%;
		height: 180rpx;
		background-color: white;
	}
	.content{
		
	}
	.teacher_name{
		
	}
	.class_name{
		
	}
	.getclick{
		margin: 10rpx auto;
		width:30%;
		height:40rpx;
	}
</style>

