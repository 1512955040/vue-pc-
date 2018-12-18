require("../CSS/normalize.css")
require("../CSS/servicemodal.css")
	var page=new Vue({
			el:"#pages4",
			data(){
				//服务模式名称失去焦点
				var validatePass = (rule, value, callback) => {
					if(value === '') {
						this.zIndex=false
						this.holder='服务模式名称(必填)'
						callback(new Error('服务模式不能为空'));
					}else if(value.length > 20 ){
						callback(new Error('服务模式不能超过20字'));
					}
					else {
						this.zIndex=true
						callback()
					}
				}
				//服务模式描述失去焦点
				var validatePass1 = (rule, value, callback) => {
					if(value.length > 40 ){
						callback(new Error('服务模式描述不能超过40字'));
					}
					else {
						callback()
					}
				}
				
				return{
					//主菜单的4个按钮
					titleIndex:[
						{'index':'0'},
						{'index':'1'},
						{'index':'2'},
						{'index':'3'}
					],
					changeTitles:3,
					dialogVisible1:false,//新建弹窗
					customer:'新建服务模式',
					//删除
					visible2:false,//删除弹窗
					loading:false,
					Detail_Deleting:'删 除',
		 			disabled:true,//是否删除按钮可点击
					checked:false,//删除复选框
					dialogVisible3:false,//详情弹窗
					sla_id:'',//点击编辑传递详情
					zIndex:false,
					holder:"请输入服务模式名称(必填)",
					list:[],//sla列表
					//新建服务模式
					numberValidateForm1:{
						id:'',
			        	name:'',
			        	describes:'',
			        	ordinary:{
			        		responseTime:1,
			        		solveTime:1
			        	},
			        	emergency:{
			        		responseTime:1,
			        		solveTime:1
			        	},
			        	veryEmergency:{
			        		responseTime:1,
			        		solveTime:1
			        	}
			        },
			         //新建服务模式限制
			        rules3: {
						name:[
							{
						        validator: validatePass,
						   }
						],
						describes:[
							{
						        validator: validatePass1,
						   }
						]
					},
				}
			},
			mounted(){
				setTimeout(()=>{
					this.handleHeight()
				})
			},
			created(){
				this.sla_list()
			},
			methods: {
				//重置表单方法
			    resetForm(formName){
        			this.$refs[formName].resetFields();
      			},
				//跳转页面方法
				changeTitle(index){
					this.changeTitles=index
					if(index===0){
						window.location.href="InquireHome.html"
					}else if(index===1){
						window.location.href="customerManagement.html"
					}else if(index===2){
						window.location.href="dataStatistics.html"
					}else if(index===3){
						window.location.href="systemSetub.html"
					}
				},
				//左侧导航条动态高度
				handleHeight(){
					let RightNavMenu=document.getElementsByClassName("proplow")[0];
					let	ConentPageLeft=document.getElementById("ConentPageLeft")
					ConentPageLeft.style.height=RightNavMenu.offsetHeight+106+'px'
				},
				
			    handleOpen(key, keyPath) {
					setTimeout(()=>{
						this.handleHeight()
					},350)
			    },
			    handleClose(key, keyPath) {
					setTimeout(()=>{
						this.handleHeight()
					},350)
			  	},
				//点击切换不同的工单列表
				handleSelect(index,indexPath){
					
				},
				validatePass0(){
					this.zIndex=true;
					this.holder=""
				},
				//查询sla列表
				sla_list(){
					var _url="/slaTypeList";
					var datas={}
					myGetByJson(_url,datas).then(res=>{
						console.log(res)
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							if(res.data.data.length>0){
								this.list=res.data.data
							}
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
				},
				//添加服务模式
				createNewModel(){
					this.customer="新建服务模式"
					this.dialogVisible1=true
					this.sla_id=""
					setTimeout(()=>{
						this.resetForm('numberValidateForm1')
						this.numberValidateForm1={
							id:'',
				        	name:'',
				        	describes:'',
				        	ordinary:{
				        		responseTime:1,
				        		solveTime:1
				        	},
				        	emergency:{
				        		responseTime:1,
				        		solveTime:1
				        	},
				        	veryEmergency:{
				        		responseTime:1,
				        		solveTime:1
				        	}
			       	 	}
					})
				},
				//给Ul添加鼠标移入事件
				DetailIn(index){
					document.getElementsByClassName('image_add')[index].style.color="#1CAF9A"
				},
				//给Ul添加鼠标移出事件
				DetailOut(index){
					document.getElementsByClassName('image_add')[index].style.color="#8e9daa"
				},
				//提交添加服务
			    submitForm0(formName){
			        this.$refs[formName].validate((valid) => {
			        if (valid) {
			        	var _url,data
			        	if(this.sla_id==''){
			        		_url="/slaTypeInfo"
			        		data=this.numberValidateForm1
			          		myPostByJson(_url,data).then(res=>{
			          			//console.log(res)
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
									this.dialogVisible1=false
									this.open6(res.data.data)
									this.sla_list()
								}
							})
				        	.catch(err=>{
								this.open7(err.response.data.msg)
								if(err.response.data.code==20001){
									window.location.href=err.response.data.url
								}
							})     	
			        	}else{
			        		_url="/slaTypeInfo/"+this.numberValidateForm1.id
			        		data=this.numberValidateForm1
			          		myPostByJson(_url,data).then(res=>{
			          			console.log(res)
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
									this.dialogVisible1=false
									this.dialogVisible3=false;
									this.open6(res.data.data)
									this.sla_list()
								}
							})
				        	.catch(err=>{
								this.open7(err.response.data.msg)
								if(err.response.data.code==20001){
									window.location.href=err.response.data.url
								}
							})     		
			        	}
			        }else{
			            console.log('error submit!!');
			            return false;
			        }
			    });
			},
			//点击查看详情
			editor_list(id){
					this.dialogVisible3=true;
					this.sla_id=id
					this.numberValidateForm1.id=id
					var	_url="/slaTypeInfo"
			        var	data={
			        	slaTypeId:id
			        }
			        myGetByJson(_url,data).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.numberValidateForm1=res.data.data
						}
					})
				    .catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})     	
				},
			//点击编辑
			editorList(){
				var urls="/checkSla"
				var _data={
					slaTypeId:this.numberValidateForm1.id
				}
				 myGetByJson(urls,_data).then(res=>{
					if(res.data.code==300){
						window.location.href=res.data.redirect
					}else{
						this.customer="服务模式编辑"
						this.dialogVisible3=false;
						this.dialogVisible1=true
						var	_url="/slaTypeInfo"
					        var	data={
					        	slaTypeId:this.numberValidateForm1.id
					        }
					        myGetByJson(_url,data).then(res=>{
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
									this.numberValidateForm1=res.data.data
								}
							})
						    .catch(err=>{
								this.open7(err.response.data.msg)
								if(err.response.data.code==20001){
									window.location.href=err.response.data.url
								}
							})		
					}
				})
				.catch(err=>{
					this.open7(err.response.data.msg)
					if(err.response.data.code==20001){
						window.location.href=err.response.data.url
					}
				})  
			},
				//点击取消/删除
				Detail_Delete(){
					this.visible2=true
					this.loading=false;
					this.disabled=true
					this.checked=false
					this.Detail_Deleting='删除'
				},
				//判断能不能删除
				Delete_true(){
				   this.checked=!this.checked
				   if(this.checked){
				   	 this.disabled=false
				   }else{
				   	 this.disabled=true
				   }
				},
		 		//确定删除
		 		Delete_Detail(){
		 			var _url="/delSlaType";
					var datas={
						slaTypeId:this.numberValidateForm1.id
					}
					myGetByJson(_url,datas).then(res=>{
						this.loading=!this.loading
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.loading=false
							this.Detail_Deleting='删除成功'
							this.visible2=false
							this.dialogVisible3=false
							this.open6(res.data.data)
							this.sla_list()
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
		 		},
			  	//提示成功彈窗
				open6(code){
					this.$message({
          				showClose: true,
          				message: code,
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
    		},
		})
