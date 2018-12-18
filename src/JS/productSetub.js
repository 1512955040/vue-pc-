require("../CSS/normalize.css")
require("../CSS/productSetup.css")
	var page=new Vue({
			el:"#pages",
			data(){
				//产品名称
				var validatePass = (rule, value, callback) => {
					if(value === '') {
						callback(new Error('产品名称不能为空'));
						this.zIndex=false
						this.holder='产品名称(必填)'
					} else {
						this.zIndex=true
						callback()
					}
				}
				//产品型号
				var validatePass1 = (rule, value, callback) => {
					if(value === '') {
						callback(new Error('产品型号不能为空'));
						this.zIndex1=false
						this.holder1='产品型号(必填)'
					} else {
						this.zIndex1=true
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
					product:'新建产品',
					list:[],//查询数组
					totals:0,//客户总条数
					dialogVisible3:false,//弹窗
					detail_obj:{"id":1},//详情
					visible2:false,
					loading:false,
					Detail_Deleting:'删 除',
		 			disabled:true,//是否删除按钮可点击
					checked:false,//删除复选框
					dialogVisible1:false,//新建产品弹窗
					//产品类别
			        options3:[{
        				label: '请选择产品类别',
        				options: []
        			}],
					//产品名称名称
					zIndex:false,
					holder:"请输入产品名称(必填)",
					//产品型号
					zIndex1:false,
					holder1:"请输入产品型号(必填)",
					//产品品牌
					zIndex2:false,
      				holder2:"请输入产品品牌",
      				productListDetail:{},
      				fileIds:[],						//合同上传成功返回id
					removeFile:[],					//合同上传移除文件名
					finalFile:[],					//最终上传文件名
					dialogVisible5:false,			//合同上传放大镜
					dialogImageUrl: '',//图片上传url
					fileList2:[],
					updataFiles:[],
					numberValidateForm2:{
						pageNum:1,
						typeId:'',
						name:'',
						model:'',
						brand:'',
						typeName:''
					},
					rules3:{
						name:[
							{validator: validatePass}
						],
						model:[
							{validator: validatePass1}
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
				this.setup()
			},
			methods: {
				//重置表单方法
			    resetForm(formName) {
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
			    handleClose(key, keyPath){
					setTimeout(()=>{
						this.handleHeight()
					},350)
			  	},
				//点击切换不同的工单列表
				handleSelect(index,indexPath){
					
				},
				//新建产品焦点问题
				//产品名称
				validatePass2(){
					this.zIndex=true;
					this.holder=""
				},
				//产品型号
				validatePass3(){
					this.zIndex1=true;
					this.holder1=""
				},
				//产品品牌
				validatePass4(){
					this.zIndex2=true;
					this.holder2=""
				},
				validatePass5(){
					this.zIndex2=false;
					this.holder2="产品品牌"
				},
				/****************************查询********************************/
				//查询产品设置列表 
				setup(){
					var _url="/findAllProducts";
					var params=this.numberValidateForm2
					myGetByJson(_url,params).then(res=>{
						//console.log(res)
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.list=res.data.data
							if(res.data.data.length>0){
								this.totals=res.data.data[0].total
							}else{
								this.totals=0
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
				//产品类别 
				product_label(){
					var _url="/allProductTypes";
					var params={}
					myGetByJson(_url,params).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.options3[0].options=res.data.data
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
				},
				productClick(index){
					console.log(index)
					this.numberValidateForm2.typeId=index
				},
				//点击添加产品
				create_product(){
					this.product="新建产品"
					this.dialogVisible1=true
					this.productListDetail.id=""
					this.zIndex=false;this.holder="请输入产品名称(必填)";
					this.zIndex1=false;this.holder1="请输入产品型号(必填)";
					this.updataFiles=[]
					this.finalFile=[]
					setTimeout(()=>{
						this.numberValidateForm2={
							pageNum:1,
							typeId:'',
							name:'',
							model:'',
							brand:'',
							typeName:''
						}
						this.resetForm('numberValidateForm2')
					})
				},
				//点击查看详情 
				Detail(id){
					this.dialogVisible3=true
					var _url="/findProduct"
					var data={
						productId:id
					}
					myGetByJson(_url,data).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.productListDetail=res.data.data
							this.fileList2=res.data.data.fileInfos
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
				},
				//查看详情点击编辑
				Detail_Editor(id){
					this.product="产品编辑"
					this.dialogVisible1=true
					this.updataFiles=[]
					this.numberValidateForm2=this.productListDetail
					if(this.fileList2!=null && this.fileList2.length>0){
						for(var i=0;i<this.fileList2.length;i++){
							var pic={
								name:this.fileList2[i].substring(this.fileList2[i].lastIndexOf("/")+1),
								url:this.fileList2[i]
							}
							this.updataFiles.push(pic)
						}
					}
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
				//删除详情
				Detail_Delete(){
					this.visible2=true
					this.loading=false;
					this.disabled=true
					this.checked=false
					this.Detail_Deleting='删除'
		 		},
		 		//确定删除
		 		Delete_Detail(id){
		 			var _url="/delProducts";
					var params={productId:id}
					myGetByJson(_url,params).then(res=>{
						this.loading=!this.loading
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.loading=false
							this.Detail_Deleting='删除成功'
							this.visible2=false
							this.dialogVisible3=false
							this.open6(res.data.data)
							this.setup()
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})		
		 		},
				//新建产品表单提交
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
						if(this.productListDetail.id==undefined || this.productListDetail.id==""){
							var _url="/addProducts"
				        	var data={
				        		pageNum:this.numberValidateForm2.pageNum,
								typeId:this.numberValidateForm2.typeId,
								name:this.numberValidateForm2.name,
								model:this.numberValidateForm2.model,
								brand:this.numberValidateForm2.brand,
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
									this.setup()
								}
							})
					        .catch(err=>{
								this.open7(err.response.data.msg)
								if(err.response.data.code==20001){
									window.location.href=err.response.data.url
								}
							})
						}else{
							var _url="/updateProducts/"+this.productListDetail.id
				        	var data={
				        		id:this.productListDetail.id,
				        		pageNum:this.numberValidateForm2.pageNum,
								typeId:this.numberValidateForm2.typeId,
								name:this.numberValidateForm2.name,
								model:this.numberValidateForm2.model,
								brand:this.numberValidateForm2.brand,
								fileIds:this.finalFile,
								delFileIds:this.removeFile
				        	}
				        	myPostByJson(_url,data).then(res=>{
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
									this.dialogVisible1=false
									this.dialogVisible3=false
									this.open6(res.data.data)
									this.updataFiles=[]
									this.setup()
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
				//客户点击页码
				handleCurrentChange(val){
					this.numberValidateForm2.pageNum=val
					this.setup()
				},
				//合同上传成功时的钩子
				uploadFileSuccess:function(response, file, fileList){  	
					let fileItems=response.data;
					this.fileIds.push(fileItems)
				},
				//删除的图片
				handleRemove(file,response,fileList) { 
					let url = file.response && file.response.data ? file.response.data : file.name;
					this.removeFile.push(url)
				},
				handlePictureCardPreview(file,fileList) {//文件上传点击放大图片操作
					this.dialogImageUrl = file.url;
					this.dialogVisible5 = true;
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
