require("../CSS/normalize.css")
require("../CSS/resetSubmission.css")
var resetSubmission = new Vue({
			el: "#resetSubmission",
			data(){
				//失去焦点
				var validatePass = (rule, value, callback) => {
					if(value === '') {
						callback(new Error('请输入密码'));
						this.zIndex=false
						this.zIndex2=false
						this.holder='请输入密码'
					} else {
						if(this.ruleForm2.checkPass !== '') {
							this.$refs.ruleForm2.validateField('checkPass');
						}
						callback();
					}
				};
				var validatePass2 = (rule, value, callback) => {
					if(value === '') {
						callback(new Error('请再次输入密码'));
						this.zIndex1=false
						this.holder1='请输入密码'
						this.zIndex2=false
					} else if(value !== this.ruleForm2.pass) {
						callback(new Error('两次输入密码不一致!'));
						this.zIndex2=false
					} else {
						callback();
						this.zIndex2=true
					}
				};
				return{
					zIndex:false,
					zIndex1:false,
					zIndex2:false,
					holder:"请输入密码",
					holder1:"请再次输入密码",
					timer:2,
					ruleForm2: {
						pass: '',
						checkPass:'',
						phone:''
					},
					rules2: {
						pass: [
							{
								validator: validatePass,
								trigger: 'blur'
							}
						],
						checkPass:[
							{
								validator: validatePass2,
								trigger: 'blur'
							}
						]
					}
				}
			},//el-message el-message--success is-closable
			created(){
				this.Phones()
				console.log(this.phone)
			},
			methods:{
				//页面传参接收手机号
				Phones:function(){
					this.ruleForm2.phone=getUrlParms("phoneHash")
				},
				//密码获得焦点
				validatePass0(){
					this.zIndex=true;
					this.holder=""
				},
				//再次输入密码获得焦点
				validatePass1(){
					this.zIndex1=true;
					this.holder1=""
				},
				//form表单提交
				submitForm(formName) {
					this.$refs[formName].validate((valid) => {
						if(valid) {
							axios({
							method:'post',
							url:"/password",
							headers:{
								'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
							},
							params:{
								uuid:this.ruleForm2.phone,
								password1:this.ruleForm2.pass,
								password2:this.ruleForm2.checkPass
							}
						})
			          	.then(res=>{
			          		if(res.data.code==300){
			          			window.location.href=res.data.redirect
			          		}else{
			          			this.open6()
			          			let timer=setInterval(()=>{
			          				this.timer--;
			          				if(this.timer==0){
			          					clearInterval(timer)
			          					window.location.href="index.html"
			          				}
			          			},1000)
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
				//提示成功彈窗
				open6(){
					this.$message({
          				showClose: true,
          				message: '重置密码成功',
          				type: 'success'
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