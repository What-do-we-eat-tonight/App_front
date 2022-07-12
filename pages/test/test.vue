<template>
	<view class="">
		<u-field
			v-model="code"
			label="验证码"
			placeholder="请填写验证码"
		>
			<u-button size="mini" slot="right" type="success" @click="getCode">{{codeText}}</u-button>
		</u-field>
		<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				codeText: ''
			}
		},
		methods: {
			codeChange(text) {
				this.codeText = text;
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 1000);
				}else {
					this.$u.toast('倒计时结束后再发送');
				}
			}
		}
	}
</script>