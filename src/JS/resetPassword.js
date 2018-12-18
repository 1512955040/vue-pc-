require("../CSS/normalize.css")
require("../CSS/resetPassword.css")
	var resetPassword =new Vue({
			el:"#resetPassword",
			data(){
				//手机号失去焦点
				var validatePass1 = (rule, value, callback) => {
					var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
					if(value === '') {
						callback(new Error('手机号不能为空'));
						this.zIndex1=false
						this.holder1='请输入手机号'
					} else if(!reg.test(value)){
						callback(new Error('请输入正确格式的手机号'));
						this.zIndex1=true
					}else{
						this.zIndex1=true
						this.zIndex7=true
						callback()
					}
				};
				//手机验证码失去焦点
				var validatePass4 = (rule, value, callback) => {
					var regs=/^\d{6}$/;
					if(value === '') {
						callback(new Error('手机验证码不能为空'));
						this.zIndex4=false
						this.holder4='请输入手机验证码'
					} else if(!regs.test(value)){
						callback(new Error('请输入六位数字验证码'));
						this.zIndex4=true
					}else{
						this.zIndex4=true
						callback()
					}
				};
				return{
					zIndex:false,
					holder1:"请输入手机号",
					thisValue:"",//手机号
					zIndex1:false,
					holder4:"请输入手机验证码",
					thisValue1:"",
					identifying:"获取验证码",
					contentValue:60,
					zIndex2:false, 
					zIndex4:false,
					zIndex5:false,
					zIndex7:false,   
					numberValidateForm: {
			          phone:'',
			          phoneCaptcha:''
			        },
			        rules2: {
						phone:[
							{
						        validator: validatePass1,
						    }
						],
						phoneCaptcha:[
							{
						        validator: validatePass4,
						    }
						]
					}
				}
			},
			methods:{
				//手机号获得焦点
				validatePass1(){
					this.zIndex1=true;
					this.holder1=""
				},
				//手机验证码
				validatePass4(){
					this.zIndex4=true;
					this.holder4=""
				},
				//点击获取验证码
				idenfyIng:function(e){
					e.preventDefault()
					var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
					if(reg.test(this.numberValidateForm.phone)){
						if(!this.zIndex7) return
						axios({
							method:'get',
							url:"/phoneTest/"+this.numberValidateForm.phone,				
							params:{
								phone:this.numberValidateForm.phone
							}
						})
						.then(res=>{
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.zIndex7=false
								this.zIndex5=true
								this.identifying=this.contentValue +"秒后重新获取";
								let idenfyTimer=setInterval(()=>{
									this.contentValue--;
									this.identifying=this.contentValue +"秒后重新获取";
									if(this.contentValue<0){
										clearInterval(idenfyTimer)
										this.identifying="重新发送验证码"
										this.contentValue=60;
										this.zIndex7=true
										this.zIndex5=false
									}
								},1000)
								this.numberValidateForm.phoneCaptcha=res.data.data.substring(8,14)
							}
						})
						.catch(err=>{
							this.open7(err.response.data.msg)
							if(err.response.data.code==20001){
								window.location.href=err.response.data.url
							}
						})
					}
				},//
				//点击下一步
				submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			        if (valid) {
			          	axios({
							method:'POST',
							url:"/captchaAuth",
							headers:{
								'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
							},
							params:{
								phone:this.numberValidateForm.phone,
								captcha:this.numberValidateForm.phoneCaptcha
							}
						})
			          	.then(res=>{
			          		console.log(res.data)
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								window.location.href="resetSubmission.html?phoneHash="+res.data.data
							}
						})
						.catch(err=>{
							this.open7(err.response.data.msg)
							if(err.response.data.code==20001){
								window.location.href=err.response.data.url
							}
						})
			        } else {
			            console.log('error submit!!');
			            return false;
			          }
			        });
			    },
			      //警示弹窗
			    open7(code) {
			         this.$confirm(code, '提示', {
          				dangerouslyUseHTMLString: false,
          				type: 'warning',
          				center: true
        			})
        			.then(() => {
				        this.$message({
				            type: 'success',
				        });
				    })
        			.catch(() => {
				        this.$message({
				            type: 'info',
				        });          
				    });
			    }
			}
		})