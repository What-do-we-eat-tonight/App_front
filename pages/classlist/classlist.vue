<template>
	<view class="classlist">
		<!-- u-search 搜索组件，集成了常见搜索框所需功能 -->
		<!-- clearabled 清除控件 -- 当输入框有内容时用于一键清除 -->
		<!-- :show-action="false"  无右侧控件 -->
		<u-search placeholder="计算机组成结构" shape="square" :clearabled="true" 
				  :show-action="false" border-color="#7A7E83" margin="20rpx " 
				  @change="text" @search="text"></u-search>
				<u-button>确定收到</u-button>  
		<!-- v-for 用于循环渲染 -->
		<view v-for="(item,idx) in courselist" :key="idx">
			<!-- uni-collapse 用于展示手风琴效果 -->
			<uni-collapse  :accordion="true">
				<uni-collapse-item :title="item.c_name">
					<u-cell-item :arrow="false" icon="integral-fill" :title="item.c_name" 
					:label="item.time" @click="test(item.c_no)"/>
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
				courselist: [{}],
				s: {
					sno: ''
				},
				text:''
			}
		},
		methods: {
			//从本地缓存中获取该生的学号
			async getid() {
				this.s.sno = uni.getStorageSync("login_id");
			},
			//async使得login方法为异步，则内部请求可以实现同步化
			async postlist(){ 
				this.courselist = await this.$u.post('/student_user/NewCourseTable', this.s);
				console.log(this.courselist);
			},
			async test(cno){
				uni.setStorageSync("cno",cno)//在客户端存储信息，结构式键值对
				this.$u.route({
								url: 'pages/class/class',
							})
				console.log(cno);
			}
		},
		onShow() {
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
