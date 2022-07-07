<template>
	<view class="classlist" v-if="is_teacher">
		
		<u-search placeholder="计算机组成结构" shape="square" :clearabled="true" 
				  :show-action="false" border-color="#7A7E83" margin="20rpx " 
				  @change="text" @search="text"></u-search>
				  
		<!-- v-for 用于循环渲染 -->
		<view v-for="(item,idx) in t_courselist" :key="idx">
			<uni-collapse  :accordion="true">
				<uni-collapse-item :title="item.c_name">
					<view v-for="(time,index) in item.time" :key="index">
						<u-cell-item :arrow="false" icon="integral-fill" :title="item.c_name" :label="time" 
								@click="t_test(item.c_no,item.c_name)"/>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
	<view v-if="!is_teacher">
		<u-search placeholder="计算机组成结构" shape="square" :clearabled="true"
				  :show-action="false" border-color="#7A7E83" margin="20rpx " 
				  @change="text" @search="text"></u-search>
				  
		<view v-for="(item,idx) in s_courselist" :key="idx">
			<uni-collapse :accordion="true">
				<uni-collapse-item :title="item.c_name">
					<view v-for="(time,index) in item.time" :key="index">
						<u-cell-item :arrow="false" icon="integral-fill" :title="item.c_name" :label="time"
									@click="s_test(item.c_no,item.c_name)">
						</u-cell-item>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				is_teacher:false,
				t_courselist: [],
				s_courselist: [],
				// course_message:[],
				t:{
					teacher_id:'',
				},
				s: {
					sno: ''
				},
				text:'',//用于搜索的文本
			}
		},
		methods: {
			//从本地缓存中获取该生的学号
			async primary(){
				this.is_teacher = uni.getStorageSync("is_t");
				console.log("是否是老师：",this.is_teacher);
			},
			async getid() {
				//登陆者是老师，则获取其工号
				if(this.is_teacher){
					this.t.teacher_id = uni.getStorageSync("t_id");
					console.log(this.t);
				}
				//登陆者是学生，则获取其学号
				if(!this.is_teacher){
					this.s.sno = uni.getStorageSync("login_id");
					console.log(this.s);
				}
			},
			// 获取课程列表数据
			async postlist(){ 
				// this.course_message = await this.$u.post('/student_user/CourseTable',this.s);
				if(this.is_teacher){
					this.t_courselist = await this.$u.post('/teacher_user/NewTeachingCourse',this.t);
					console.log(this.t_courselist);
				}
				if(!this.is_teacher){
					this.s_courselist = await this.$u.post('/student_user/NewCourseTable', this.s);
					console.log(this.s_courselist);
				}
			},
			async s_test(cno,cname){
				uni.setStorageSync("cno",cno)//在客户端存储信息，结构式键值对
				uni.setStorageSync("cname",cname),
				this.$u.route({
								url: 'pages/class/class',
							})
			},
			async t_test(c_no,c_name){
				uni.setStorageSync("c_no",c_no),//在客户端存储信息，结构式键值对
				uni.setStorageSync("c_name",c_name),
				this.$u.route({
								url: 'pages/teacher_class/teacher_class',
							})
			}
			
		},
		onShow() {
			this.primary()
			this.getid()
			this.postlist()
		}
	}
</script>

<style scoped>
	.classlist {
		display: flex;
		flex-direction: column;
	}
</style>