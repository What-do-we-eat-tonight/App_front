<template>
	<view class="register">
		
		<view style="width:300rpx;margin-top:15%;margin-bottom:50rpx;">
			<u-image width="100%" height="300rpx" src="/static/teacher1.png" shape="circle"></u-image>
		</view>
		
		<u-form :model="regTeacher" ref="uForm" style="width:90%;background-color: #FFFFFF;padding:0 20rpx;">
			<u-form-item prop="teacher_no">
				<u-input v-model="regTeacher.teacher_no" placeholder="请输入账号" />
			</u-form-item>
			<u-form-item prop="teacher_name">
				<u-input v-model="regTeacher.teacher_name"  placeholder="请输入姓名"  />
			</u-form-item>
			<u-form-item prop="email">
				<u-input v-model="regTeacher.email"  placeholder="请输入邮箱"   />
			</u-form-item>
			<u-form-item prop="password">
				<u-input v-model="regTeacher.password" type='password' placeholder="请输入密码" :password-icon="true"  />
			</u-form-item>
			<u-form-item prop="repassword">
				<u-input v-model="regTeacher.repassword" type='password' placeholder="请再次输入密码" :password-icon="true"  />
			</u-form-item>
		</u-form>
			<u-button @click="register" style="width:30%;margin-top:5%;" :ripple="true"  type="primary">注册</u-button>
			
			<u-toast ref="uToast"/>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				action:this.$u.apiBaseUrl+'/teacher_user/upload',
				regTeacher:{
					teacher_no:'',
					teacher_name:'',
					email:'',
					password:'',
				},
				rules:{
					teacher_no:[{
							required:true,//必填
							message:'请填写账号',
							trigger:['blur']
						}
					],
					teacher_name:[{
							required:true,//必填
							message:'请填写姓名',
							trigger:['blur']
						}
					],
					email:[{
							required:true,//必填
							message:'请填写邮箱',
							trigger:['blur']
						}
					],
					password:[{
							required:true,//必填
							message:'请填写密码',
							trigger:['blur']
						},
						{
							min: 6,
							message:'密码不得少于6个字符',
							trigger:['blur']
						}
					],
					repassword:[{
							required:true,
							message:'请再次输入密码',
							trigger:['blur']
						},
						{
							validator: (rule, value, callback) => {
								return value == this.regTeacher.password;
							},
							message: '两次密码不一致',
							trigger: ['blur'],
						}
					]
				}
			}
		},
		methods: {
			uploadAvatar(){
				//this.$refs.uUpload 获取对页面组件的引用
				this.$refs.uUpload.upload();
			},
			
			onUploadAvatar(result, index, lists, name){
				if(result.success){
					this.regTeacher.u_avatar = result.data;
					this.$u.toast('上传成功');
				}
			},
			register(){
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						console.log('验证通过');
						await this.$u.post('/teacher_user/register',this.regTeacher);
						this.$u.toast('注册成功');
						this.$u.route({
							url:'/pages/teacher_login/teacher_login',
							type:'redirect'
						});
					} else {
						console.log('验证失败');
						this.$u.toast('注册信息错误');
					}
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
		}
</script>

<style scoped>
	.register{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
