//服务端地址
export const apiBaseUrl = 'http://39.106.29.224:9999';
uni.$u.apiBaseUrl = apiBaseUrl;

const install = (app, options) => {
	
	app.config.globalProperties.$u.apiBaseUrl = apiBaseUrl;
	
	
};

export default {install};
