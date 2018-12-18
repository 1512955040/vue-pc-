require("../CSS/normalize.css")
require("../CSS/workTime.css")
	var page=new Vue({
			el:"#pages4",
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
					//上方导航栏
					bckArr:[  							
						{label:'工作时间'},
						{label:'例外日期'},
					],
					isActive:0,       
					workTimes:true,//工作时间
					
			        timer:[],
			        workTimer:[],
			        workTimeOrNot:'工作时间',
//			        startTime: '',//开始时间
//      			endTime: '',//结束时间
//      			value2: 6,//初始状态
//      			value3: 6,//初始状态
//      			value4: 6,//初始状态
//      			value5: 6,//初始状态
//      			value6: 6,//初始状态
//      			value7: 6,//初始状态
//      			value8: 6,//初始状态
//			        officetime:'',//开始时间
			        sid:'',//匿名Id
			        //工作日 非工作日
			        options_Num1:[
			     		{label:'工作日',id:6},
			     		{label:'非工作日',id:5}
			     	],
			        //例外时间form表单
			        form:{
			        	ssid:'',
			        	name:'',
			        	freeTimeStart:'',
			        	freeTimeStop:'',
			        	officeTime:'',
			        	closingTime:'',
			        	isWorkday:'',
//			        	editors:"保存",
//						deletes:"取消",
						editorBlue:false,
						deleteBlue:false,
			        },
			        //删除
			        visible2:false,
			        loading:false,
			        visible:[],
			        Detail_Deleting:'删 除',
		 			disabled:true,//是否删除按钮可点击
					checked:false,//删除复选框
				}
			},
			mounted(){
				setTimeout(()=>{
					this.handleHeight()
				})
				
			},
			created(){
				this.formTime()
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
				//点击切换table页
				workdays(index){
					this.isActive=index
					if(index==0){
						this.workTimes=true
						this.workTimeOrNot="工作时间"
						this.formTime()
					}
					else{
						this.workTimeOrNot="例外时间"
						this.workTimes=false
						this.formList()//查询
					}
				},
				//工作时间开始时间改变
				picker(e,num,id,isWorkday){
					if(id===this.workTimer[num].id){
						var _url="/updateWorkingHours/"+id
						var	datas={
							id:id,
							closingTime:this.workTimer[num].closingTime,
							officeTime:e,
							isWorkday:isWorkday
						}
						myPostByJson(_url,datas).then(res=>{
							console.log(res)
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.formTime()
								this.open6(res.data.data)
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
				//工作时间结束时间
				pickers(e,num,id,isWorkday){
					if(id===this.workTimer[num].id){
						var _url="/updateWorkingHours/"+id
						var	datas={
							id:id,
							closingTime:e,
							officeTime:this.workTimer[num].officeTime,
							isWorkday:isWorkday
						}
						myPostByJson(_url,datas).then(res=>{
							console.log(res)
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.formTime()
								this.open6(res.data.data)
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
				//switch开关
				switchs(e,num,id){
					if(id===this.workTimer[num].id){
						var _url="/updateWorkingHours/"+id
						var	datas={
							id:id,
							closingTime:this.workTimer[num].closingTime,
							officeTime:this.workTimer[num].officeTime,
							isWorkday:e
						}
						myPostByJson(_url,datas).then(res=>{
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.formTime()
								this.open6(res.data.data)
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
				//查询工作时间
				formTime(){
					var _url="/workingHours";
					var datas={}
					myGetByJson(_url,datas).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							if(res.data.data.length>0){
								this.workTimer=res.data.data
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
      			//查询表单
      			formList(){
      				var _url="/exceptionHours";
					var datas={}
					myGetByJson(_url,datas).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.timer=res.data.data
							if(res.data.data!=null && res.data.data.length>0){
								for(var i=0;i<this.timer.length;i++){
	      							this.timer[i].flag=true
	      							this.timer[i].editorBlue=false
	      							this.timer[i].deleteBlue=false
//	      							this.timer[i].editors="编辑"
//	      							this.timer[i].deletes="删除"
	      							this.timer[i].begintimer=this.timer[i].officeTime
	      							this.timer[i].endTimer=this.timer[i].closingTime
	      							this.timer[i].freeTimeStart=formatDateTime(this.timer[i].freeTimeStart).substring(0,10)
	      							this.timer[i].freeTimeStop=formatDateTime(this.timer[i].freeTimeStop).substring(0,10)
	      							this.timer[i].visible2=false;
									this.visible.push(this.timer[i].visible2)
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
      			
      			//点击工作时间非工作时间
      			isWorkdayId(index){
      				console.log(index)
      			},
      			//点击开始时间time
      			changeTimer(keys){
      				console.log(keys)
      			},
      			//点击结束时间
      			changeTimers(keys){
      				
      			},
      			//点击新增日期
      			create_except(){
      				if(!this.form.editorBlue){
      					this.form={
			        		ssid:'',
			        		name:'',
			        		freeTimeStart:'',
			        		freeTimeStop:'',
			        		officeTime:'',
			        		closingTime:'',
			        		isWorkday:'',
							editorBlue:false,
							deleteBlue:false,
			        	}
      					this.timer.push(this.form)
      					this.form.editorBlue=true
      				}
      			},
				//单个编辑/保存
				create_editors(index,id){
					console.log(id)
					if(id===this.timer[index].id && id!==undefined){
						let newitem=this.timer[index]
						newitem.flag=!newitem.flag
						if(newitem.flag){
							this.timer[index].editorBlue=false
							var _url="/updateExceptionHours/"+this.timer[index].id;
							var datas={
								id:this.timer[index].id,
			        			name:this.timer[index].name,
			        			freeTimeStart:formatDateTime(this.timer[index].freeTimeStart).substring(0,10),
			        			freeTimeStop:formatDateTime(this.timer[index].freeTimeStop).substring(0,10),
			        			officeTime:this.timer[index].officeTime,
			        			closingTime:this.timer[index].closingTime,
			        			isWorkday:this.timer[index].isWorkday
							}
							myPostByJson(_url,datas).then(res=>{
								console.log(res)
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
									this.formList()
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
							this.timer[index].editorBlue=true
							this.timer[index].deleteBlue=false
//							this.timer[index].editors="保存"
//							this.timer[index].deletes="取消"
						}
						Vue.set(this.timer,index,newitem)
					}else if(id==undefined){
						var _url="/addExceptionHours";
						var datas=this.form
						myPostByJson(_url,datas).then(res=>{
//							console.log(res)
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.formList()
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
						Vue.set(this.timer)
					}
				},
				//点击删除/取消
				create_deletes(index,id){
					if(id===this.timer[index].id && id!==undefined){
						this.sid=id
						let newitem=this.timer[index]
						if(newitem.flag){
							this.loading=false;
							this.disabled=true
							this.checked=false
							this.Detail_Deleting='删除'	
						}else{
							this.timer[index].deleteBlue=true
							this.timer[index].flag=true
//							this.timer[index].editors="编辑"
						}
						Vue.set(this.timer,index,newitem)
					}else if(id==undefined){
						this.timer.splice(index,1)
						this.form.editorBlue=false
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
		 			var _url="/delExceptionHours";
					var datas={
						exceptionHoursId:this.sid
					}
					myGetByJson(_url,datas).then(res=>{
						this.loading=!this.loading
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.loading=false
							this.Detail_Deleting='删除成功'
							this.$set(this.visible, index, false);
//							this.dialogVisible1=false
							this.open6(res.data.data)
							this.formList()
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
