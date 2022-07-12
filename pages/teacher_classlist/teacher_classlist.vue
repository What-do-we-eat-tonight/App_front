<template>
	<view class="list">
		<u-search placeholder="计算机组成结构" shape="square" :clearabled="true"
				  :show-action="false" border-color="#7A7E83" margin="20rpx ">
		</u-search>
		
		<!-- v-for 用于循环渲染 -->
		<view v-for="(item,idx) in classlist" :key="idx">
			<!-- uni-collapse 用于展示手风琴效果 -->
			<uni-collapse  :accordion="true">
				<uni-collapse-item :title="item.c_name">
					<!-- 新消息提示标志 -->
					<!-- <u-badge v-if="!item.ifConfirm" :is-dot="true" type="error" :offset="[10,10]"></u-badge> -->
					<view v-for="(time,index) in item.time" :key="index">
						<u-cell-item :arrow="false" icon="integral-fill" :title="item.c_name" :label="time" 
								@click="test(item.c_no,item.c_name)"/>
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
				t:{
					teacher_id:'',
				},
				classlist:[],
			}
		},
		methods: {
			//从本地缓存中获取该生的学号
			async getid() {
				this.t.teacher_id = uni.getStorageSync("t_id");
				// console.log(this.t.tno);
			},
			// 向后端传参并获取课程列表数据
			async postlist(){ 
				console.log(this.t);
				//回传的数据为：c_name,c_no,time[]
				this.t.teacher_id = uni.getStorageSync('login_id');
				this.classlist = await this.$u.post('/teacher_user/NewTeachingCourse',this.t);
				// console.log("=============",this.classlist);
			},
			async test(c_no,c_name){
				uni.setStorageSync("c_no",c_no),//在客户端存储信息，结构式键值对
				uni.setStorageSync("c_name",c_name),
				this.$u.route({
								url: 'pages/teacher_class/teacher_class',
							});
			}
		},
		onShow() {
			this.getid(),
			this.postlist()
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.getid();
			this.postlist();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style scoped>
	.list {
		display: flex;
		flex-direction: column;
	}
</style>