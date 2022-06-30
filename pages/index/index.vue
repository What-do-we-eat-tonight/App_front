<template>
	<view class="index">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
			}
		},
		//生命周期方法，表示页面正在加载还未显示之前执行的逻辑。
		onLoad() {
			//this.getMealList();
		},
		methods: {
			/*
			//获得餐品清单
			//方法为异步，则内部请求可以实现同步化
			async getMealList(){
				//加await 异步请求同步化
				this.meallist = await this.$u.get('/meal-list');
				console.log("======");
				
				//this.list = this.meallist.map(item=>({image:this.$u.apiBaseUrl + '/blob/' + item.meal_pic,title:item.meal_name}));
				
			}*/
		}
	}
</script>

<style scoped>
	/*scoped 样式仅在本页面有效*/
	.index{
		width: 800px;
		height: 400px;
		margin: auto;
	}
</style>
