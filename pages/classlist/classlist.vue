<template>
	<view class="classlist">
		<!-- clearabled 清除控件 -- 当输入框有内容时用于一键清除 -->
		<!-- :show-action="false"  无右侧控件 -->
		<u-search placeholder="计算机组成结构" shape="square" :clearabled="true" 
				  :show-action="false" border-color="#7A7E83" margin="20rpx " 
				  @change="text" @search="text"></u-search>
		<view v-for="(item,idx) in courselist" :key="idx" class="announcement">
			<uni-collapse accordion>
				<uni-collapse-item :title="item.c_name">
					<u-cell-item :arrow="false" icon="integral-fill" :title="item.c_name" :label="item.dayOfWeek" 
								 :value="item.section"  @click="test(item.c_no)"/>
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
			}
		},
		methods: {
			//从本地缓存中获取该生的学号
			async getid() {
				this.s.sno = uni.getStorageSync("login_id");
				//用以测试学号是否已经成功从本地缓存中获取
				if (this.s.sno) {
					console.log(this.s.sno); 
				}
			},
			async postlist(){ //async使得login方法为异步，则内部请求可以实现同步化
				this.courselist = await this.$u.post('/student_user/CourseTable', this.s);
				console.log(this.courselist);
			},
			async test(name){
				uni.setStorageSync("con_show",name)//在客户端存储信息，结构式键值对
				this.$u.route({
								url: 'pages/class/class',
							})
				console.log(name);
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
