<template >
	<!--	课程信息	公告栏	讨论区	评价-->
	<view class="parent">
		<view class="title">{{class_name}}</view>
		
		<u-cell-group>
			<u-cell-item v-if="!isAnnouncement" @click="toAnnouncementlist" index="Announcement" title="公告"
						:arrow="true" arrow-direction="right">
				<!-- is-dot:设置徽标的类型为一个圆点；type设置主题,error:红色；offset偏移值 -->
				<!-- 消息提示 -->
				<u-badge :is-dot="true" type="error" :offset="[46,80]"></u-badge>
			</u-cell-item>
			
			<u-cell-item v-if="!isForum" @click="toForum" index="Forum" title="讨论区"
						 :arrow="true" arrow-direction="right">
			</u-cell-item>
			
			<u-cell-item v-if="!isJudge" @click="toJudge" index="Judge" title="评价" 
						:arrow="true" arrow-direction="right">
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAnnouncement: false,
				isForum: false,
				isJudge: false,
				c:{
						c_no:'',
					},
				class_name:''//修改为调用test()函数，从class list调取课程信息（名称）
			}
		},
		methods: {
			//获取课程号及课程名称
			async get_message(){
				this.c.c_no = uni.getStorageSync("cno");
				this.class_name = uni.getStorageSync("cname");
				console.log(this.c);
				console.log(this.class_name);
			},
			//连接至公告页面
			toAnnouncementlist(Announcement) {
				console.log('========', Announcement);
				this.$u.route({
					url: '/pages/teacher_announcement/teacher_announcement',
					type: 'to'
				});
			},
			//连接至讨论区页面
			toForum(Forum) {
				console.log('========', Forum);
				this.$u.route({
					url: '/pages/forum/question_teacher',
					type: 'to'
				});
			},
			//连接至评价页面
			toJudge(Judge) {
				console.log('========', Judge);
				this.$u.route({
					url: '/pages/evaluation/evaluation_teacher',
					type: 'to'
				});
			}
		},
		onShow() {
			this.get_message(),
			this.isAnnouncement = uni.getStorageSync("isAnnouncement");
			this.isForum = uni.getStorageSync("isForum");
			this.isJudge = uni.getStorageSync("isJudge");
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.get_message(),
			this.isAnnouncement = uni.getStorageSync("isAnnouncement");
			this.isForum = uni.getStorageSync("isForum");
			this.isJudge = uni.getStorageSync("isJudge");
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style scoped>
	.parent {
		padding: 100rpx 5rpx;
		margin: auto;
	}
	.title{
		height: 100px;
		width: 150px;
		margin: auto;
		font-size: 1.2rem;
	}
</style>