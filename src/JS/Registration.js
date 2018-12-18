require("../CSS/normalize.css")
require("../CSS/Registration.css")
var Registration = new Vue({
			el: "#Registration",
			data() {
				//联系人失去焦点
				var validatePass = (rule, value, callback) => {
					if(value === '') {
						callback(new Error('联系人不能为空'));
						this.zIndex=false
						this.holder='请输入联系人'
					} else {
						this.zIndex=true
						callback()
					}
				};
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
				//密码失去焦点
				var validatePass2 = (rule, value, callback) => {
					var reg=/^(\w){6,20}$/;
					if(value === '') {
						callback(new Error('密码不能为空'));
						this.zIndex2=false
						this.holder2='密码(6-20)字母、数字、无空格'
					} else if(!reg.test(value)){
						callback(new Error('密码(6-20)字母、数字、无空格'));
						this.zIndex2=true
					}else{
						this.zIndex2=true
						callback()
					}
				};
				//图片验证码失去焦点
				var validatePass3 = (rule, value, callback) => {
					if(value === '') {
						callback(new Error('图片验证码不能为空'));
						this.zIndex3=false
						this.holder3='请输入图片验证码'
					}else{
						this.zIndex3=true
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
			    return {
			    	zIndex:false,
			    	zIndex1:false,
			    	zIndex2:false,
			    	zIndex3:false,
			    	zIndex4:false,
			    	zIndex5:false,  //获取验证码按钮可点击
			    	zIndex6:true,
			    	zIndex7:false,//验证码点击完之后是否可点击
			    	holder:'请输入联系人',
			    	holder1:'请输入手机号',
			    	holder2:'密码(6-20)字母、数字、无空格',
			    	holder3:"请输入图片验证码",
			    	holder4:"请输入手机验证码",
			    	identifying:"获取验证码",
			    	contentValue:60,
			    	edge:'',//验证码图片
			        numberValidateForm: {
			          name: '',
			          phone:'',
			          password:'',
			          captcha:'',
			          phoneCaptcha:''
			        },
			        rules2: {
						name: [
							{
								validator: validatePass,
						  	}
						],
						phone:[
							{
						        validator: validatePass1,
						    }
						],
						password:[
							{
						        validator: validatePass2,
						    }
						],
						captcha:[
							{
						        validator: validatePass3,
						    }
						],
						phoneCaptcha:[
							{
						        validator: validatePass4,
						    }
						],
					}
			    };
    		},
    		mounted(){
    			//接收首页传过来的参数
    			this.url_word()
    		},
    		created:function(){
    			this.edge='/captcha?' + Math.floor(Math.random()*100)
    		},
    		methods: {
    			//获取图片验证码
    			aadd(){
    				this.$refs.imagesPic.src='/captcha?' + Math.floor(Math.random()*100)
				},
				goindex(){
					window.location.href="index.html"
				},
				//获取首页传过来的参数
				url_word(){
					var requests=new Object();
					requests = GetRequest();
					var a=requests['phone']
					var b=requests['password']
					this.numberValidateForm.phone=a
					this.numberValidateForm.password=b	
				},
    			 //联系人获得焦点
				validatePass0(){
					this.zIndex=true;
					this.holder=""
				},
				//手机号获得焦点
				validatePass1(){
					this.zIndex1=true;
					this.holder1=""
				},
				//密码获得焦点
				validatePass2(){
					this.zIndex2=true;
					this.holder2=""
				},
				//图片验证码获得焦点
				validatePass3(){
					this.zIndex3=true;
					this.holder3=""
				},
				//手机验证码
				validatePass4(){
					this.zIndex4=true;
					this.holder4=""
				},
				//获取验证码
				idenfyIng:function(e){
					var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
					e.preventDefault()
					if(reg.test(this.numberValidateForm.phone)){
						if(!this.zIndex7) return
						axios({
							method:'get',
							url:"/phoneTest/"+this.numberValidateForm.phone,				
							data:{
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
				},
				//表单提交
			    submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
			          	axios({
							method:'POST',
							url:"/creator",				
							data:this.numberValidateForm
						})
			          	.then(res=>{
							console.log(res.data)
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								window.location.href="createOrganization.html?dataHash="+res.data.data
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