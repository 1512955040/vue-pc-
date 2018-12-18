require("../CSS/normalize.css")
require("../CSS/createOrganization.css")
		var dataHash;
		var createOrganization =new Vue({
			el:'#createOrganization',
			data() {
				//组织全称失去焦点
				var validatePass = (rule, value, callback) => {
					if(value === ''){
						callback(new Error('组织全程不能为空'));
						this.zIndex=false
						this.holder='请输入组织全程'
					}else{
						this.zIndex=true
						callback()
					}
				};
				//组织简称失去焦点
				var validatePass1 = (rule, value, callback) => {
					if(value === '') {
						callback(new Error('组织简称不能为空'));
						this.zIndex1=false
						this.holder1='请输入组织简称'
					}else{
						this.zIndex1=true
						callback()
					}
				};
			    return {
			    	zIndex:false,
			    	zIndex1:false,
			    	zIndex2:false,
			    	holder:'请输入组织全程',
			    	holder1:'请输入组织简称',
			    	hashData:'',
			        numberValidateForm: {
			          fullname: '',
			          shortname:'',
			        },
			        rules2:{
						fullname:[
							{
								validator: validatePass,
						  	}
						],
						shortname:[
							{
						        validator: validatePass1,
						    }
						],
					}  
			    };
    		},
    		created(){
    			this.dataHashs()
    		},
    		methods:{
    			 //组织获得焦点
				validatePass0(){
					this.zIndex=true;
					this.holder=""
				},
				//组织简称获得焦点
				validatePass1(){
					this.zIndex1=true;
					this.holder1=""
				},
				//接受参数
				dataHashs(){
					var dataUrl=getUrlParms("dataHash")
					this.hashData=dataUrl
				},
				//表单提交
			    submitForm(formName){
			        this.$refs[formName].validate((valid)=>{
				        if (valid) {
				          	axios({
								method:'POST',
								url:"/company/"+this.hashData,
								data:{
									companyName:this.numberValidateForm.fullname,
									abbreviate:this.numberValidateForm.shortname
								}
							})
				          	.then(res=>{
								console.log(res.data)
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
									window.location.href="skipLogin.html?phone="+res.data.data
								}
							})
							.catch(err=>{
								this.open7(err.response.data.msg)
								if(err.response.data.code==20001){
									window.location.href=err.response.data.url
								}
							})
				        }else{
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
			    },
			    //返回上一步
			    stepBack(){
			      	window.location.href="Registration.html"
			    }
    		}
		})