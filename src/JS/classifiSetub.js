require("../CSS/normalize.css")
require("../CSS/classifiSetub.css")

	var page=new Vue({
			el:"#pages2",
			data(){
				//产品名称
//				var validatePass = (rule, value, callback) => {
//					if(value === '') {
//						callback(new Error('故障类别名称不能为空'));
//						this.zIndex=false
//						this.holder='请输入故障类别名称(必填)'
//					} else {
//						this.zIndex=true
//						callback()
//					}
//				}
				
				return{
					//主菜单的4个按钮
					titleIndex:[
						{'index':'0'},
						{'index':'1'},
						{'index':'2'},
						{'index':'3'}
					],
					changeTitles:3,
					list:[],
					totals:0,
					indexDelete:'',
//					click_color:false,
//					Valength:0,
					 //删除
			        visible2:false,
			        loading:false,
//			        dialogVisible1:false,
			        Detail_Deleting:'删 除',
		 			disabled:true,//是否删除按钮可点击
					checked:false,//删除复选框
					visible:[],
					productTypeId:[],
//					productListDetail:{},
//					dialogVisible3:false,//弹窗
//					detail_obj:{"id":1},//详情
//					visible2:false,
//					loading:false,
//					Detail_Deleting:'删 除',
//		 			disabled:true,//是否删除按钮可点击
//					checked:false,//删除复选框
//					dialogVisible1:false,//新建故障弹窗
					//产品类别
			        options3:[],
					//产品名称名称
//					zIndex:false,
//					holder:"请输入产品类别名称(必填)",
					numberValidateForm2:{
//						id:'',
						pageNum:1,
						productTypeId:'',
						name:'',
						describes:'',
						typeName:'',
					},
					rules3:{
//						name:[
//							{validator: validatePass}
//						]
					},
				}
			},
			mounted(){
				setTimeout(()=>{
					this.handleHeight()
				})
			},
			created(){
				this.classifiSetup()
				this.product_label()
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
			    handleClose(key, keyPath) {
					setTimeout(()=>{
						this.handleHeight()
					},350)
			  	},
				//点击切换不同的工单列表
				handleSelect(index,indexPath){
					
				},
				//焦点问题
				//产品类别
//				validatePass2(){
//					this.zIndex=true;this.holder=""
//				},
				/**********************查询列表****************************/
				//查询详情
				classifiSetup(){
					var _url="/findAllFaultTypes";
					var params=this.numberValidateForm2
					myGetByJson(_url,params).then(res=>{
						console.log(res.data.data)
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.list=res.data.data
							if(res.data.data.length>0){
								this.totals=res.data.data[0].total
								for(var i=0;i<this.list.length;i++){
									if(res.data.data.length>=1){
										this.list[i].flag=true
	      								this.list[i].editorBlue=false
	      								this.list[i].deleteBlue=false
	      								this.list[i].visible2=false;
	      								this.list[i].productTypeId=Number(this.list[i].productTypeId)
	      								this.productTypeId.push(this.list[i].productTypeId)
	      								this.visible.push(this.list[i].visible2)
									}
								}
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
				//产品分类
				product_label(){
					var _url="/allProductTypes";
					var params={}
					myGetByJson(_url,params).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							console.log(res.data.data)
							this.options3=res.data.data
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
					this.numberValidateForm2.productTypeId=index
					let obj = {};
		            obj = this.options3.find((item)=>{
		                return item.id === index;
		            });
		            for(var i=0;i<this.list.length;i++){
		            	this.list[i].typeName = obj.name;
		            }
				},
				//添加故障类别
				addmeau(){
			  		if(!this.numberValidateForm2.editorBlue){
      					this.numberValidateForm2={
			        		pageNum:1,
							productTypeId:'',
							name:'',
							describes:'',
							typeName:'',
							editorBlue:false,
							deleteBlue:false,
			        	}
      					this.list.push(this.numberValidateForm2)
      					this.numberValidateForm2.editorBlue=true
      				}
			  },
				/*点击编辑/保存*/
				create_editors(index,id){
					if(id==this.list[index].id && id!==undefined){
						let newitem=this.list[index]
						newitem.flag=!newitem.flag
						if(newitem.flag){
							this.list[index].editorBlue=false
							var _url="/updateFaultTypes/"+id
			        		var list={
			        			name:this.list[index].name,
			        			productTypeId:this.list[index].productTypeId,
			        			describes:this.list[index].describes,
			        			id:id,
			        			pageNum:1,
			        			typeName:this.list[index].typeName
			        		}
			        		
							myPostByJson(_url,list).then(res=>{
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
									this.classifiSetup()
									this.open6(res.data.data)
								}
							})
							.catch(err=>{
								this.open7(err.response.data.msg)
								if(err.response.data.code==20001){
									window.location.href=err.response.data.url
								}
							})
						}else{
							this.list[index].editorBlue=true
							this.list[index].deleteBlue=false
						}
						Vue.set(this.list,index,newitem)
					}else if(id==undefined){
						var _url="/addFaultTypes"
						var list=this.numberValidateForm2
						myPostByJson(_url,list).then(res=>{
							console.log(res)
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.classifiSetup()
								this.open6(res.data.data)
								this.numberValidateForm2.editorBlue=false
							}
						})
						.catch(err=>{
							this.open7(err.response.data.msg)
							if(err.response.data.code==20001){
								window.location.href=err.response.data.url
							}
						})
						Vue.set(this.list)
					}
				},
				//点击删除/取消
				 create_deletes(index,id){
					if(id===this.list[index].id && id!==undefined){
						this.indexDelete=id
						let newitem=this.list[index]
						if(newitem.flag){
							this.loading=false;
							this.disabled=true
							this.checked=false
							this.Detail_Deleting='删除'	
						}else{
							this.list[index].deleteBlue=true
							this.list[index].flag=true
						}
						Vue.set(this.list,index,newitem)
					}else if(id==undefined){
						this.list.splice(index,1)
						this.numberValidateForm2.editorBlue=false
					}
				},
				//点击取消删除
				Detail_Delete(v){
					this.$set(this.visible, v, false);
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
		 	Delete_Detail(index){
		 		var _url="/delFaultTypes";
				var list={
					faultTypeId:this.indexDelete
				}
				myGetByJson(_url,list).then(res=>{
					this.loading=!this.loading
					if(res.data.code==300){
						window.location.href=res.data.redirect
					}else{
						this.loading=false
						this.Detail_Deleting='删除成功'
						this.$set(this.visible, index, false);
						this.open6(res.data.data)
						this.classifiSetup()
					}
				})
				.catch(err=>{
					this.open7(err.response.data.msg)
					if(err.response.data.code==20001){
						window.location.href=err.response.data.url
					}
				})
		 	},
		 	//点击取消
			Detail_Delete(v){
				this.$set(this.visible, v, false);
			},
				
				////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
//				//点击新建按钮重置表单
//				create_classify(){
//					this.zIndex=false;this.holder="请输入产品类别名称(必填)";
//					this.numberValidateForm2.id=''
//					setTimeout(()=>{
//						this.resetForm('numberValidateForm2')
//					})
//					this.dialogVisible1=true
//				},
//				
//				//提交故障分类
//			    submitForm0(formName) {
//			        this.$refs[formName].validate((valid) => {
//			        if (valid) {
//			        	var _url,data
//			        	if(this.numberValidateForm2.id==''){
//			        		_url="/addFaultTypes"
//			        		data=this.numberValidateForm2
//			          		myPostByJson(_url,data).then(res=>{
//			          			console.log(res)
//								if(res.data.code==300){
//									window.location.href=res.data.redirect
//								}else{
//									this.dialogVisible1=false
//									this.open6(res.data.data)
//									this.classifiSetup()
//								}
//							})
//				        	.catch(err=>{
//								this.open7(err.response.data.msg)
//							})     	
//			        	}else{ 
//			        		_url="/updateFaultTypes/"+this.numberValidateForm2.id
//			        		data=this.numberValidateForm2
//			          		myPostByJson(_url,data).then(res=>{
//			          			console.log(res)
//								if(res.data.code==300){
//									window.location.href=res.data.redirect
//								}else{
//									this.dialogVisible1=false
//									this.dialogVisible3=false
//									this.open6(res.data.data)
//									this.classifiSetup()
//								}
//							})
//				        	.catch(err=>{
//								this.open7(err.response.data.msg)
//							})     		
//			        	}
//			        }else{
//			            console.log('error submit!!');
//			            return false;
//			        }
//			        
//			      });
//			    },
			    //点击查看详情
//				Detail(id){
//					console.log(id)
//					this.dialogVisible3=true
//					var _url="/findFaultTypes"
//					var data={
//						faultTypeId:id
//					}
//					myGetByJson(_url,data).then(res=>{
//						console.log(res)
//						if(res.data.code==300){
//							window.location.href=res.data.redirect
//						}else{
//							this.productListDetail=res.data.data
//						}
//					})
//					.catch(err=>{
//						this.open7(err.response.data.msg)
//					})
//				},
				//客户点击页码
				handleCurrentChange(val){
					this.numberValidateForm2.pageNum=val
					this.classifiSetup()
				},
//				//点击编辑 
//				Detail_Editor(id){
//					this.numberValidateForm2.id=id
//					for(var i=0;i<this.list.length;i++){
//						if(id===this.list[i].id){
//							this.numberValidateForm2.productTypeId=this.list[i].productTypeId
//							this.numberValidateForm2.name=this.list[i].name
//							this.numberValidateForm2.describes=this.list[i].describes
//							this.numberValidateForm2.typeName=this.list[i].typeName
//							this.numberValidateForm2.productTypeId=this.list[i].productTypeId
//						}
//					}
//					this.dialogVisible1=true
//				},
				//
				//判断能不能删除
//				Delete_true(){
//				   this.checked=!this.checked
//				   if(this.checked){
//				   	 this.disabled=false
//				   }else{
//				   	 this.disabled=true
//				   }
//				},
				//删除详情
//				Detail_Delete(){
//					this.visible2=true
//					this.loading=false;
//					this.disabled=true
//					this.checked=false
//					this.Detail_Deleting='删除'
//		 		},
		 		//确定删除
//		 		Delete_Detail(id){
//		 			var _url="/delFaultTypes";
//					var params={faultTypeId:id}
//					myGetByJson(_url,params).then(res=>{
//						this.loading=!this.loading
//						if(res.data.code==300){
//							window.location.href=res.data.redirect
//						}else{
//							console.log(res.data.data)
//							this.loading=false
//							this.Detail_Deleting='删除成功'
//							this.visible2=false
//							this.dialogVisible3=false
//							this.open6(res.data.data)
//							this.classifiSetup()
//						}
//					})
//					.catch(err=>{
//						this.open7(err.response.data.msg)
//					})		
//		 		},
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
