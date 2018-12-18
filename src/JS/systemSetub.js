require("../CSS/normalize.css")
require("../CSS/systemSetub.css")
var num=1;
var page=new Vue({
			el:"#page",
			data(){
				return{
				//主菜单的4个按钮
					titleIndex:[
						{'index':'0'},
						{'index':'1'},
						{'index':'2'},
						{'index':'3'}
					],
					changeTitles:3,
					datas:[],
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
//					//分类表单提交
//			        rules3: {
//						
//					},
					//目录表单
					form:{
						name:'',
						describes:'',
						editorBlue:false,
						deleteBlue:false,
					},
				}
			},
			mounted(){
				setTimeout(()=>{
					this.handleHeight()
				})
			},
			created(){
				//查询左侧内容
				this.PageLeft()
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
			    handleOpen(key, keyPath){
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
			  	//提示成功彈窗
				open6(code){
					this.$message({
          				showClose: true,
          				message: code,
          				type: 'success'
        			});
				},
			  	//警示弹窗
				open7(code){
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
			 	//查询左侧分类目录
			 	PageLeft(){
			 		var _url="/productTypes";
			 		var data={}
			 		myGetByJson(_url,data).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect	
						}else{
							if(res.data.data!=null && res.data.data.length>0){
								this.datas=res.data.data
								for(var i=0;i<this.datas.length;i++){
									if(res.data.data.length>=1){
										this.datas[i].flag=true
	      								this.datas[i].editorBlue=false
	      								this.datas[i].deleteBlue=false
	      								this.datas[i].visible2=false;
	      								this.visible.push(this.datas[i].visible2)
									}
								}
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
				
			 	//单个编辑/保存
				create_editors(index,id){
					if(id==this.datas[index].id && id!==undefined){
						let newitem=this.datas[index]
						newitem.flag=!newitem.flag
						if(newitem.flag){
							console.log(this.datas[index])
							this.datas[index].editorBlue=false
//							this.datas[index].editors="编辑"
							var _url="/updateProductTypes/"+id
			        		var datas={
			        			name:this.datas[index].name,
			        			describes:this.datas[index].describes,
			        			id:id
			        		}
							myPostByJson(_url,datas).then(res=>{
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
									this.PageLeft()
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
							this.datas[index].editorBlue=true
							this.datas[index].deleteBlue=false
//							this.datas[index].editors="保存"
						}
						Vue.set(this.datas,index,newitem)
					}else if(id==undefined){
						var _url="/addProductTypes";
						var datas=this.form
						myPostByJson(_url,datas).then(res=>{
							console.log(res)
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.PageLeft()
								this.open6(res.data.data)
								this.form.editorBlue=false
							}
						})
						.catch(err=>{
							this.open7(err.response.data.msg)
							if(err.response.data.code==20001){
								window.location.href=err.response.data.url
							}
						})
						Vue.set(this.datas)
					}
				},
			  //添加分类
			  addmeau(){
			  		if(!this.form.editorBlue){
      					this.form={
			        		name:'',
							describes:'',
							editorBlue:false,
							deleteBlue:false,
			        	}
      					this.datas.push(this.form)
      					this.form.editorBlue=true
      				}
			  },
			 //点击删除/取消
			 create_deletes(index,id){
				if(id===this.datas[index].id && id!==undefined){
					this.indexDelete=id
					let newitem=this.datas[index]
					if(newitem.flag){
						this.loading=false;
						this.disabled=true
						this.checked=false
						this.Detail_Deleting='删除'	
					}else{
						this.datas[index].deleteBlue=true
						this.datas[index].flag=true
//						this.datas[index].editors="编辑"
					}
					Vue.set(this.datas,index,newitem)
				}else if(id==undefined){
					this.datas.splice(index,1)
					this.form.editorBlue=false
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
		 	//确定删除	
		 	Delete_Detail(index){
		 		var _url="/delProductTypes";
				var datas={
					productTypeId:this.indexDelete
				}
				myGetByJson(_url,datas).then(res=>{
					this.loading=!this.loading
					if(res.data.code==300){
						window.location.href=res.data.redirect
					}else{
						this.loading=false
						this.Detail_Deleting='删除成功'
						this.$set(this.visible, index, false);
						this.open6(res.data.data)
						this.PageLeft()
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
    	}	
	})
