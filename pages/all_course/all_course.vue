<template>
	<view class="course_list">
		<!-- u-search 搜索组件，集成了常见搜索框所需功能 -->
		<!-- clearabled 清除控件 -- 当输入框有内容时用于一键清除 -->
		<!-- :show-action="false"  无右侧控件 -->
		<u-search placeholder="输入课程名" shape="square" :clearabled="true"
				  :show-action="false" border-color="#7A7E83" margin="20rpx " 
				  @change="text" @search="text"></u-search>
				  
		<!-- v-for 用于循环渲染 -->
		<view v-for="(item,idx) in All_courses_list" :key="idx">
			<!-- uni-collapse 用于展示手风琴效果 -->
			<uni-collapse  :accordion="true">
				<uni-collapse-item :title="item.c_name">
					<u-cell-item :arrow="false" icon="integral-fill" :title="item.c_name" :value="item.time"
					:label="`Selected? ${(item.selectedCourse)} ; Conflict? ${(item.timeConflict)}`"   
					@click="test(item.c_no)"/>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				cno_show:'',
				All_courses_list: [{}],
				s: {
					sno: ''
				},
				text:''
			}
		},
		methods: {
			async getid() {//从本地缓存中获取该生的学号
				this.s.sno = uni.getStorageSync("login_id");
			},
			async post_all_courses(){ //显示所有课程的列表  （已加入课程也显示）
				this.All_courses_list = await this.$u.post('/student_user/SelectCourse', this.s);
				console.log(this.All_courses_list);
			},
			async test(cno){ //跳转到class详情页面  在class详情页面添加课程
				uni.setStorageSync("cno",cno)//在客户端存储信息，结构式键值对
				this.$u.route({
								url: 'pages/class/class',
							})
				console.log(cno);
			}
		},
		onShow() {
			this.getid()
			this.post_all_courses()
		}
	}
	
</script>

<style>
	.course_list {
		display: flex;
		flex-direction: column;
	}
</style>






