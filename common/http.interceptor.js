import {apiBaseUrl} from './common.config'

const install = (app, options) => {
	
	const $u_ = app.config.globalProperties.$u;
	
	const config = {
		baseUrl: apiBaseUrl, // 请求的本域名
		//method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '长安故事...', // 请求loading中的文字提示
		loadingTime: 300, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		// header: {
		// 	'content-type': 'application/json;charset=UTF-8'
		// },
	};
	
	

	app.config.globalProperties.$u.http.setConfig(config);

	app.config.globalProperties.$u.http.interceptor.request = (config) => {

		const token = uni.getStorageSync('Token');
		config.header.Token = token;


		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if (config.url == '/user/login') config.header.noToken = true;
		// 最后需要将config进行return
		return config;

	};

	// 响应拦截，判断状态码是否通过
	app.config.globalProperties.$u.http.interceptor.response = (res) => {
		console.log("响应数据：",res);
		if (res.code == 200) {
			// res为服务端返回值，可能有code，data等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return res.data;
		} else if (res.code == 520) {
			// 假设520为Token失效，这里跳转登录
			$u_.toast('未登录');
			// setTimeout(() => {
			// 	// 此为uView的方法，详见路由相关文档
			// 	$u_.route('/pages/login/login')
			// }, 1500)
			return false;
		} else if (res.code == 500) {			
			$u_.toast(res.message);			
			return false;
		} else if (res.code == 530) {			
			$u_.toast(res.message);				
			return false;
		} else {
			$u_.toast('未知错误码:'+res.code);
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
}

export default {install};
