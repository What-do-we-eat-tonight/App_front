<template>
	<!--	课程信息	公告栏	讨论区	评价-->
	<view class="parent">
		<view class="title">{{class_name}}</view>
		
		<u-cell-group>
			<u-cell-item v-if="!isAnnouncement" @click="toAnnouncementlist" index="Announcement" title="公告"
						:arrow="true" arrow-direction="right">
				<!-- is-dot:设置徽标的类型为一个圆点；type设置主题,error:红色；offset偏移值 -->
				<!-- 消息提示 -->
				<u-badge :is-dot="true" v-if = "!new_annonce" type="error" :offset="[46,80]"></u-badge>
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
						cno:'',
					},
				//参数包括：公告号、教师工号、教师姓名、课程号、课程名、公告内容、公告发布时间
				announcement_list:[{}],
				class_name:'',//修改为调用test()函数，从class list调取课程信息（名称）
				new_annonce:false,
				announcement_state:[]
			}
		},
		
		methods: {
			async test(){//访问数据库调取数据并显示
				//获取课程号
				this.c.cno = uni.getStorageSync("cno");
				this.class_name = await uni.getStorageSync("cname")
				let getan = {
					sno:uni.getStorageSync("login_id"),
					cno:uni.getStorageSync('cno')
				}
				//获取课程公告列表并将课程公告列表存储至本地
				this.announcement_list = await this.$u.post('/student_user/announcement-list',getan);
				
				
				for(var item in this.announcement_list){
					if(!item.ifConfirm){
						this.new_annonce = true;
						console.log("yesyesyes");
						break;
						
					}
				}
				console.log(this.announcement_list);
				//获取课程名称
				//this.class_name = this.announcement_list[0].cname;
			},
			//连接至公告页面
			toAnnouncementlist(Announcement) {
				console.log('========', Announcement);
				this.$u.route({
					url: '/pages/announcement_list/announcement_list',
					type: 'to'
				});
			},
			
			toForum(Forum) {
				console.log('========', Forum);
				this.$u.route({
					url: '/pages/forum/question',//修改成“讨论区”页面地址
					type: 'to'
				});
			},
			
			toJudge(Judge) {
				console.log('========', Judge);
				this.$u.route({
					url: '/pages/evaluation/evaluation',//修改成“评价”页面地址
					type: 'to'
				});
			}
		},
		onShow() {
			this.test();
			
			this.isAnnouncement = uni.getStorageSync("isAnnouncement");
			this.isForum = uni.getStorageSync("isForum");
			this.isJudge = uni.getStorageSync("isJudge");
			console.log("isAnnouncement===", this.isAnnouncement);
			console.log("isForum===", this.isForum);
			console.log("isJudge===", this.isJudge);
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.test();
			this.isAnnouncement = uni.getStorageSync("isAnnouncement");
			this.isForum = uni.getStorageSync("isForum");
			this.isJudge = uni.getStorageSync("isJudge");
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onBackPress(e){
			console.log(e);
			if(e.from == 'backbutton'){
				uni.switchTab(
					{   
					url:'/pages/classlist/classlist',
					success:()=> {
							console.log(1);
							},
					fail: (res) => {
					console.log('navigate failed',res);
				}
				}
				)

			}
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