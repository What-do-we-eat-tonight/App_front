<template>
	<!-- 课程的公告栏 -->
	<view class="index">
		<!-- u-navbar 自定义导航栏内容 -->
		<!-- 在pages.json文件中修改对应的style -->
		<!-- <u-badge :is-dot="true" type="error" :offset="[46,80]"></u-badge> -->
		<u-navbar back-text="返回" title="课程公告" @click="toback" index="back"></u-navbar>

		<view v-for="(item,idx) in announcement_list" :key="idx">
			<!-- 新消息提示标志 -->
			<u-badge v-if="!item.state" :is-dot="true" type="error" :offset="[10,10]"></u-badge>
			<!-- 点击进入课程公告内容页面 -->
			<uni-collapse :accordion="true">
				<!-- 课程公告标题栏 -->
				<uni-collapse-item align="left" :title="get_title(item.content).toString()">
					<!-- 新消息提示标志 -->
					<!-- <u-badge v-if="!item.state" :is-dot="true" type="error" :offset="[10,10]"></u-badge> -->
					<!-- 课程公告内容栏 -->
					<u-cell-item :arrow="false">
						<!-- 内容左对齐 -->
						<view align="left">{{item.content}}</view>
						<!-- 时间右对齐 -->
						{{item.submit_time}}
						<!-- 确认收到按钮 -->
						<u-button type="info" class="content" @click="get_it1(idx)" v-if = "is_state == false">确定收到</u-button>
						<u-button type="info" class="content" @click="get_it2(idx)" v-else-if = "is_state == true">已经收到</u-button>
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
				is_state: false,
				c: {
					cno: '', //该课程的课程好
				},
				announcement_list: [{
					"ano": "1",
					"atitle": "课程简述",
					"tname": "可望",
					"cno": "COMP1221",
					"cname": "计算机体系结构",
					"content": "本课程作为计算机专业核心课程，介绍形式语言、自动机、文法、词法分析、语法分析和语义分析，既有独立的II型和III型语言理论，也有强调原理性的程序分析和转换方法。通过本课程学习，认识一类计算的规律，掌握通用的理论和方法。",
					"submit_time": "2022-06-30 10:00:14",
					"state": false
				}], //课程公告列表内容
				title: [{}]
			}
		},
		//生命周期方法，表示页面正在加载还未显示之前执行的逻辑。
		onLoad() {
			//this.getMealList();
		},
		methods: {
			//获取课程公告列表
			async test() {
				//获取课程号
				this.c.cno = uni.getStorageSync("cno");
				//获取课程公告列表
				this.announcement_list = await this.$u.post('/student_user/announcement-list', this.c);
			},
			//修改公告状态
			git_it2(idx) {
				this.announcement_list[idx].state = true;

				if (this.announcement_list[idx].state) {
					console.log("===================");
				}
			},
			get_it1(idx) {
				this.announcement_list[idx].state = true;
				this.is_state = !this.is_state;
				if (this.announcement_list[idx].state) {
					console.log("===================");
				}
			},
			//截取公告第一分句作为公告标题
			get_title(content) {
				var t = content;
				var title = t.split('，');
				console.log(title[0]);
				return title[0];
			},
			//返回课程列表页面
			async toback(back) {
				console.log('========', back);
				this.$u.route({
					url: '/pages/class/class', //修改成“公告”页面地址
					type: 'to'
				});
			},
		},
		onShow() {
			//this.test();
		}
	}
</script>

<style scoped>
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
