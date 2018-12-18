require("../CSS/normalize.css")
require("../CSS/architecture1.css");
require("../CSS/architecture.css")


//var flags;
var app=new Vue({
	el:'#body',
	data(){
		//部门名称
		var validatePass = (rule, value, callback) => {
			if(value === '') {
				callback(new Error('部门名称不能为空'));
				this.zIndex=false
				this.holder='请输入部门名称(必填)'
			} else {
				this.zIndex=true
				callback()
			}
		}
		//人员名称
		var validatePass1 = (rule, value, callback) => {
			if(value === '') {
				callback(new Error('人员名称不能为空'));
				this.zIndex2=false
				this.holder2='请输入人员名称(必填)'
			} else {
				this.zIndex2=true
				callback()
			}
		}
		//电话号码
		var validatePassx = (rule, value, callback) => {
						var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
						if(value === "") {
							this.zIndex1=false
							this.holder1='请输入手机号(必填)'
							callback(new Error('手机号不能为空'));
						} else if(!reg.test(value)){
							this.zIndex1=true
							callback(new Error('请输入正确格式的手机号'));
						}else{
							this.zIndex1=true
							callback()
						}
				}	
		//职位名称
		var validatepassnj = (rule, value, callback) => {
			if(value !== ""){
				this.zIndex6=true
				callback()
			}else{
				this.zIndex6=false
				this.holder3="请输入职位名称(必填)"
				callback(new Error('职位名称不能为空'));
			}
		}
		//邮箱
		var validatePasst = (rule, value, callback) => {
			var reg= /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
				if(!reg.test(value)){
					callback(new Error('请输入正确的邮箱'));
					this.zIndex4=false
					this.holder4="请输入邮箱(必填)"
				}else if(value==""){
					this.zIndex4=false
					callback(new Error('邮箱不能为空'))
				}else{
					this.zIndex4=true
					callback()
				}
		}
		return{
			titleIndex:[
				{'index':'0'},
				{'index':'1'},
				{'index':'2'},
				{'index':'3'}
			],
			bckArr:[
				{label:'空间角色'},
				{label:'网点角色'}
			],
			isActive:0,
			changeTitles:3,
			dialogVisible1:false,
			distables:true,//判断能否编辑
			nodeType:40,//部门或者个人的名称
			options: [],//部门
			optionsId:"",//角色
			flags:{},
			list:[],
			form:{
				organizeId:'', //部门id
				name:'', //新建部门名称
				describes:''
			},
			//人员
			form1:{
				name:'',
				phone:'',
				positionsn:'',
				organizeId:'',
				email:'',
				roleId:'',//角色id
			},
			rules3: {
				name:[
					{validator: validatePass}
				]
			},
			
			//新建部门名称
			zIndex:false,
			holder:"请输入部门名称(必填)",
			//电话
			zIndex1:false,
			holder1:"请输入手机号码(必填)",
			//人员
			zIndex2:false,
			holder2:"请输入人员名称(必填)",
			//职位名称
			zIndex6:false,
			holder3:"请输入职位名称(必填)",
			//邮箱
			zIndex4:false,
			holder4:"请输入邮箱(必填)",
			fileIds:[],//文件上传数组名
			dialogImageUrl: '',	//图片上传url
        	dialogVisible3: false,//放大
			removeFile:[],//文件移除数组名
			finalFile:[],//最终上传文件数组名
			updataFiles:[],//编辑页面显示的图片
			//删除
			visible2:false,
			loading:false,
			dialogVisible2:false,
			Detail_Deleting:'删 除',
		 	disabled:true,//是否删除按钮可点击
			checked:false,//删除复选框
			nodeTypes:'first',
			organizeId:'',//编辑Id
			dialogVisible4:false,
			dialogVisible5:false,
			rules4: {
				name:[
					{
						validator:validatePass1
					}
				],
				email:[
					{
						validator:validatePasst
					}
				],
				phone:[
					{
						validator:validatePassx
					}
				],
				positionsn:[
					{
						validator:validatepassnj
					}
				],
			},
		}
	},
	mounted(){
		setTimeout(()=>{
			this.handleHeight()
		})
	},
	created(){
		this.getRoleId()
	},
	methods:{
		//重置表单方法
		resetForm(formName) {
     		this.$refs[formName].resetFields();
      	},
		bckClick:function(n){
			this.isActive=n;
		},
		//点击页面上面的新建按钮
		newClick(){
			this.nodeTypes="first"
			this.organizeId=''
			this.nodeType=40
			this.distables=true
			this.form.organizeId=''
			this.form1.organizeId=''
			this.dialogVisible1=true
			this.updataFiles=[]
			this.finalFile=[]
			this.removeFile=[]
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
//			let RightNavMenu=document.getElementsByClassName("proplow")[0];
//			let	ConentPageLeft=document.getElementById("ConentPageLeft")
//			ConentPageLeft.style.height=RightNavMenu.offsetHeight+106+'px'
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
		/****部门/人员名称失去焦点****/
		validatePass0(){
			this.zIndex=true;
			this.holder=""
		},
		validatePassn(){
			this.zIndex1=true;
			this.holder1="";
		},
		validatePass3(){
			this.zIndex2=true;
			this.holder2="";
		},
		validatePass4(){
			this.zIndex6=true;
			this.holder3="";
		},
		validatePass5(){
			this.zIndex4=true;
			this.holder4="";
		},
		/*********************/
		//点击切换不同的工单列表
		handleSelect(index,indexPath){
			
		},
		//选择个人或者部门
		department(){
			console.log(this.nodeTypes)
			if(this.nodeTypes=="first"){
				this.nodeType=40
				this.updataFiles=[]
				this.finalFile=[]
				this.removeFile=[]
//				setTimeout(()=>{
				this.resetForm('form')
//				})
			}else{
				this.nodeType=41
				this.updataFiles=[]
				this.finalFile=[]
				this.removeFile=[]
				this.form1.roleId=''
//				setTimeout(()=>{
				this.resetForm('form1')
//				})
			}
		},
		//获取部门
		getDepartment(){
			var _url="/findAllDepartment";
			 	var data={}
			 	myGetByJson(_url,data).then(res=>{
//					console.log(res.data.data)
					if(res.data.code==300){
						window.location.href=res.data.redirect
					}else{
						if(res.data.data!=null && res.data.data.length>0){
							this.options=res.data.data
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
		//获取角色id
		getRoleId(){
			var _url="/findAssignRoles";
			 	var data={}
			 	myGetByJson(_url,data).then(res=>{
					console.log(res.data.data)
					if(res.data.code==300){
						window.location.href=res.data.redirect
					}else{
						if(res.data.data!=null && res.data.data.length>0){
							this.optionsId=res.data.data
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
		//详情页上新建部门
		addNewdepart(){
			this.flags=flags
			this.organizeId=""
			console.log(this.flags)
			this.form.organizeId=this.flags.organizeId
			this.form1.organizeId=this.flags.organizeId
			this.distables=false
			this.dialogVisible1=true
		},
		//详情上编辑部门或者个人
		editorNewdepart(){
			this.flags=flags
			this.organizeId=this.flags.organizeId
			this.zIndex=true
			this.updataFiles=[]
			if(this.flags.imgUrl!==null){
				var pic={
					name:this.flags.imgUrl.substring(this.flags.imgUrl.lastIndexOf("/")+1),
					url:this.flags.imgUrl
				}
				this.updataFiles.push(pic)
			}
			if(this.flags.nodesType==40){
				this.dialogVisible4=true
				this.form.name=this.flags.name
				this.form.describes=this.flags.describes
				this.form.organizeId=this.flags.organizeId
			}else{
				this.dialogVisible5=true
				this.form1.name=this.flags.name
				this.form1.phone=this.flags.phone
				this.form1.roleId=this.optionsId[0].id
				this.form1.positionsn=this.flags.positions
				this.form1.email=this.flags.email
			}
			
		},
		//文件上传成功时的钩子
		uploadFileSuccess:function(response, file, fileList){  				
			let fileItems=response.data;
//			console.log(fileItems)
			this.fileIds.push(fileItems)
//			console.log(this.fileIds)
		},
		//文件上传移除操作
		handleRemove(file,response,fileList) {     					
			this.removeFile.push(file.response.data)
//			console.log(this.removeFile)
		},
		//文件上传点击放大图片操作
		handlePictureCardPreview(file) {     						
			this.dialogImageUrl = file.url;
			this.dialogVisible3 = true;
		},
		//提交新建部门表单
		submitForm0(formName) {
			this.$refs[formName].validate((valid) => {
			    if (valid) {
			        var temp=[];
			        this.finalFile=[]
					for(var i=0;i<this.removeFile.length;i++){
						temp[this.removeFile[i]]=true;
					}
					for(var i=0;i<this.fileIds.length;i++){
						if(!temp[this.fileIds[i]]){
							this.finalFile.push(this.fileIds[i])
						}
					}
					if(this.organizeId==''){
						var _url="/addDepartment"
					    var data={
					        parentNodeId:this.form.organizeId,
					        name:this.form.name,
					        describes:this.form.describes,
							fileIds:this.finalFile,
							delFileIds:this.removeFile
					    }
					    myPostByJson(_url,data).then(res=>{
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.dialogVisible1=false
								this.updataFiles=[]
								this.open6(res.data.data)
								window.location.reload();
							}
						})
						.catch(err=>{
							this.open7(err.response.data.msg)
							if(err.response.data.code==20001){
								window.location.href=err.response.data.url
							}
						})
					}else{
						var _url="/updateDepartment/"+this.organizeId
				        	var data={
				        		organizeId:this.organizeId,
					       		name:this.form.name,
					        	describes:this.form.describes,
								fileIds:this.finalFile,
								delFileIds:this.removeFile
				        	}
				        	myPostByJson(_url,data).then(res=>{
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
//									this.dialogVisible1=false
									this.dialogVisible4=false
									this.open6(res.data.data)
									this.updataFiles=[]
									window.location.reload();
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
		 //点击删除按钮
		deleteNewdepart(){
			this.flags=flags
			this.dialogVisible2=true
			this.Detail_Deleting='删除'
			this.checked=false
			this.disabled=true
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
		//删除
		deletes(){
			this.flags=flags
			var _url="/delOrganize";
			var data={organizeId:this.flags.id,nodesType:this.flags.nodesType}
			myGetByJson(_url,data).then(res=>{
			 	console.log(res)
			 	this.loading=!this.loading
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					this.loading=false
					this.Detail_Deleting='删除成功'
					this.visible2=false
					this.dialogVisible2=false
					this.open6(res.data.data)
					window.location.reload();
				}
			})
			.catch(err=>{
				this.open7(err.response.data.msg)
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
		},
		//新建人员 
		submitForm(formName){
			this.$refs[formName].validate((valid) => {
			    if (valid) {
			        var temp=[];
			        this.finalFile=[]
					for(var i=0;i<this.removeFile.length;i++){
						temp[this.removeFile[i]]=true;
					}
					for(var i=0;i<this.fileIds.length;i++){
						if(!temp[this.fileIds[i]]){
							this.finalFile.push(this.fileIds[i])
						}
					}
					if(this.organizeId==''){
						var _url="/employee"
					    var data={
					        parentNodeId:this.form1.organizeId,//父部们id
					        name:this.form1.name,//姓名
					        phone:this.form1.phone,//电话
					        roleId:this.form1.roleId,
					        positions:this.form1.positionsn,//职位
					        email:this.form1.email,//邮箱
							fileIds:this.finalFile,
							delFileIds:this.removeFile
					    }
					    myPostByJson(_url,data).then(res=>{
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.dialogVisible1=false
								this.updataFiles=[]
								this.open6(res.data.data)
								window.location.reload();
							}
						})
						.catch(err=>{
							this.open7(err.response.data.msg)
							if(err.response.data.code==20001){
								window.location.href=err.response.data.url
							}
						})
					}else{
							
							var _url="/employee/"+this.organizeId
				        	var data={
				        		organizeId:this.organizeId,
					       		name:this.form1.name,
					        	phone:this.form1.phone,
					        	roleId:this.form1.roleId,
					        	positions:this.form1.positionsn,
					        	email:this.form1.email,//邮箱
								fileIds:this.finalFile,
								delFileIds:this.removeFile
				        	}
				        	myPostByJson(_url,data).then(res=>{
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
//									this.dialogVisible1=false
//									this.dialogVisible4=false
									this.open6(res.data.data)
									this.updataFiles=[]
									window.location.reload();
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
		},
	}
})

