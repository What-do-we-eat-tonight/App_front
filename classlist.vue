<template>
	<view class="classlist">
		<view v-for="(item,idx) in courselist" :key="idx">
			<uni-collapse accordion>
				<uni-collapse-item :title="item.c_name">
					<u-cell-item :arrow="false" icon="integral-fill" :title="item.c_name" :label="item.dayOfWeek" :value="item.section" />

				</uni-collapse-item>
			</uni-collapse>					
			


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				courselist: [{}],
				s: {
					sno: ''
				},
			}
		},
		methods: {
			//从本地缓存中获取该生的学号
			async getid() {
				this.s.sno = uni.getStorageSync("sno");
				//用以测试学号是否已经成功从本地缓存中获取
				if (this.s.sno) {
					console.log(this.s.sno);
				}
			},
			//从服务端获取数据
			async postlist() { //async使得login方法为异步，则内部请求可以实现同步化
				this.courselist = await this.$u.post('/student_user/CourseTable', this.s);
				console.log(this.courselist);
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
