<template>
	<!--
	课程信息
	公告栏
	讨论区
	评价-->
	<view class="parent">
		<view class="child">{{class_name}}</view>
		
		<u-cell-group>
			<u-cell-item v-if="!isAnnouncement" @click="toAnnouncement" index="Announcement" title="公告" :arrow="true"
				arrow-direction="right"></u-cell-item>
			<u-cell-item v-if="!isForum" @click="toForum" index="Forum" title="讨论区" :arrow="true"
				arrow-direction="right"></u-cell-item>
			<u-cell-item v-if="!isJudge" @click="toJudge" index="Judge" title="评价" :arrow="true"
				arrow-direction="right"></u-cell-item>
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
						cno:'003',
					},
				announcement_list:[],
				class_name:'jisuanjizucheng'//修改为调用test()函数，从class list调取课程信息（名称）
			}
		},
		
		methods: {
			async test(){//访问数据库调取数据并显示
				//this.c.cno = uni.getStorageSync("login_id");
				console.log(this.login_id);
				console.log(this.c);
				await this.$u.post('/student_user/announcement-list',this.c);
			},
			
			toAnnouncement(Announcement) {
				console.log('========', Announcement);
				this.$u.route({
					//url:'/pages/Announcement/Announcement',
					url: '/pages/login/login',//修改成“公告”页面地址
					type: 'to'
				});
			},
			
			toForum(Forum) {
				console.log('========', Forum);
				this.$u.route({
					//url:'/pages/Forum/Forum',
					url: '/pages/login/login',//修改成“讨论区”页面地址
					type: 'to'
				});
			},
			
			toJudge(Judge) {
				console.log('========', Judge);
				this.$u.route({
					//url:'/pages/Judge/Judge',
					url: '/pages/login/login',//修改成“评价”页面地址
					type: 'to'
				});
			}
		},
		onShow() {
			this.isAnnouncement = uni.getStorageSync("isAnnouncement");
			this.isForum = uni.getStorageSync("isForum");
			this.isJudge = uni.getStorageSync("isJudge");
			console.log("isAnnouncement===", this.isAnnouncement);
			console.log("isForum===", this.isForum);
			console.log("isJudge===", this.isJudge);
		},
	}
</script>

<style scoped>
	.parent {
		padding: 100rpx 5rpx;
		margin: auto;
	}
	.child{
		height: 150px;
		width: 150px;
		margin: auto;
	}
</style>
