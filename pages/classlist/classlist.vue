<template>
	<view class="classlist">
		<view v-for="(item,idx) in courselist" :key="idx" class="announcement">
			<u-cell-item icon="setting-fill" :title="item.c_name" @click="test(item.c_no)"/>
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
