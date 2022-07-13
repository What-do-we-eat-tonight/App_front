<template>
	<view class="register">
		<view style="width:300rpx;margin-top:15%;margin-bottom:50rpx;">
			<u-image width="100%" height="300rpx" src="/static/student1.png" shape="circle"></u-image>
		</view>
		
		<u-form :model="regStudent" ref="uForm" style="width:90%;background-color: #FFFFFF;padding:0 20rpx;">
			<u-form-item  prop="sno">
				<u-input v-model="regStudent.sno" placeholder="请输入账号"/>
			</u-form-item>
			<u-form-item  prop="sname">
				<u-input v-model="regStudent.sname" placeholder="请输入姓名"/>
			</u-form-item>
			<u-form-item prop="school_class">
				<u-input v-model="regStudent.school_class"  placeholder="请输入班级" />
			</u-form-item>
			<u-form-item prop="major">
				<u-input v-model="regStudent.major"  placeholder="请输入专业" />
			</u-form-item>
			<u-form-item prop="password" >
				<u-input v-model="regStudent.password" type='password' placeholder="请输入密码" :password-icon="true" />
			</u-form-item>
			<u-form-item prop="repassword" >
				<u-input v-model="regStudent.repassword" type='password' placeholder="请输入密码" :password-icon="true" />
			</u-form-item>
		</u-form>
		
		<u-button @click="register" style="width:30%;margin-top:5%;" :ripple="true"  type="primary">注册</u-button>
		
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				action:this.$u.apiBaseUrl+'/student_user/upload',
				regStudent:{
					sno:'',
					sname:'',
					school_class:'',
					major:'',
					password:'',
				},
				rules:{
					sno:[{
							required:true,//必填
							message:'请填写账号',
							trigger:['blur']
						}
					],
					sname:[{
							required:true,//必填
							message:'请填写姓名',
							trigger:['blur']
						}
					],
					school_class:[{
							required:true,//必填
							message:'请填写班级',
							trigger:['blur']
						}
					],
					major:[{
							required:true,//必填
							message:'请填写专业',
							trigger:['blur']
						}
					],
					password:[{
							required:true,//必填
							message:'请输入密码',
							trigger:['blur']
						},
						{
							min: 6,
							message:'账号不得少于6个字符',
							trigger:['blur']
						}
					],
					repassword:[{
							required:true,//必填
							message:'请再次输入密码',
							trigger:['blur']
						},
						{
							validator: (rule, value, callback) => {
								return value == this.regStudent.password;
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
					this.regStudent.u_avatar = result.data;
					this.$u.toast('上传成功');
				}
			},
			register(){
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						console.log('验证通过');
						await this.$u.post('/student_user/register',this.regStudent);
						this.$u.toast('注册成功');
						this.$u.route({
							url:'/pages/login/login',
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
	.u-form-item{
		  color: wheat;
	}
</style>
