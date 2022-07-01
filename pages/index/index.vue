<template>
	
	<view class ="text_con">
		<view class ="text">
			欢迎使用“讲的啥”智能教学辅助系统
		</view>
	</view>
	
	<view class="eva1">
		<view style="width:100%;margin-top:12%;margin-bottom:50rpx;">
			<u-image width="500rpx" height="500rpx" src="/static/whoareyou.jpg" shape="square" style=" margin: auto;"></u-image>
		</view>
	</view>
	
	<view>
	  <!--<router-link to='/goods/title'>显示商品标题</router-link>-->
	  <!--<router-link to='/goods/image'>显示商品图片</router-link>-->	
		<view class = "button_container">
			<u-button type="primary" @click="jumpT" class="button">我是教师</u-button>
		</view>
		<view class = "button_container">
			<u-button type="primary" @click="jumpS" class="button">我是学生</u-button>
		</view>
	</view>
	
</template>

<script>
	export default {
	  data(){
	    return{
	      msg: ''
	    }
	  },
	  methods: {
	    jumpS(){
	    this.$u.route({
	    				url: 'pages/login/login',
						type: 'tab'
	    			})
	    },
		jumpT(){
	    this.$u.route({
	    				url: 'pages/teacher_login/teacher_login',
	    			})
	    }
	  }
	}
</script>

<style scoped>
	.eva{
		padding:200rpx 5rpx;
	}
	
	.eva{
		padding:100rpx 5rpx;
	}

	.class{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.eva {
	    width : 100%;
	}
	.button_container{
		width:100%;
		margin:20rpx;
	}
	.button{
		width:80%;
	}
	.text_con{
		margin-top:80rpx;
		margin-left: 30rpx ;
		margin-left: 30rpx ;
	}
	.text{
		width:80%;
		text-align: center;
		border: 3px solid skyblue;
		margin: auto;
	}
</style>