require("../CSS/normalize.css")
require("../CSS/snquireHomes.css")
	let isTrue=true;
	var page=new Vue({
			el:"#page",
			data(){
				//新建客户
				//客户名称失去焦点
				var validatePass = (rule, value, callback) => {
					if(value === '') {
						callback(new Error('客户名称不能为空'));
						this.zIndex=false
						this.holder='客户名称(必填)'
					} else {
						this.zIndex=true
						callback()
					}
				}
				//联系人失去焦点
				var validatePass3 = (rule, value, callback) => {
					if(value === '') {
						callback(new Error('联系人不能为空'));
						this.zIndex2=false
						this.holder2='联系人(必填)'
					} else {
						this.zIndex2=true
						callback()
					}
				}
				//手机号
				var validatePass4 = (rule, value, callback) => {
					var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
					if(value === '') {
						callback(new Error('手机号不能为空'));
						this.zIndex3=false
						this.holder3='手机号(必填)'
					} else if(!reg.test(value)){
						callback(new Error('请输入正确格式的手机号'));
						this.zIndex3=true
					}else{
						this.zIndex3=true
						callback()
					}
				}
				//邮箱
				var validatePass5 = (rule, value, callback) => {
					var reg= /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
					if(!reg.test(value) && value!==""){
						callback(new Error('请输入正确的邮箱'));
						this.zIndex4=true
					}else if(value===""){
						this.holder4='客户邮箱'
						callback()
					}else{
						this.zIndex4=true
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
					changeTitles:0,
					//工单的徽章数目
					workOlderNum:{},
					//工单管理列表
					manageList:[],
					//点击的竖行菜单的哪一个
					workerOlderNum:49,
					//查询input输入框
					customer_info:'',
					//产品类别
					options3: [{
          				label: '请选择产品类别',
          				options: []
        			}],
        			value7: '',
        			//产品
        			options4: [{
          				label: '请选择产品',
          				options: []
        			}],
        			
        			//产品型号
//      			options8:[{
//      				label: '请选择产品型号',
//      				options: [{
//      					name:"CN-231",
//      					id:"123"
//      				}]
//      			}],
        			//部门
        			options9:[{
        				label: '请选择工单处理部门',
        				options: []
        			}],
        			value6: '',
        			//联系人
        			options5: [{
          				label: '请选择联系人',
          				options: []
        			}],
        			zIndex1:false,//手机号
        			holder1:"手机号",
        			zIndex:false,
        			holder:"客户名称(必填)",
        			zIndex2:false,//联系人
        			holder2:"联系人(必填)",
      				zIndex3:false,
      				holder3:"手机号(必填)", //新建用户手机号
      				zIndex4:false,
      				holder4:'客户邮箱',
      				holder5:'请输入渠道',//渠道
      				insIf6:false,//产品型号
      				holder6:'产品型号',
      				zIndex5:false,
					dialogVisible: false,
					dialogVisible1:false,
					dialogVisible5:false,//填写回单
					v:'',//省份
					show:false,
					v0:'',
					shows:false,
					v1:'',
					showss:false,
					shown:false,
					valueLength:'',
					parentsId:'',//省份城市区县的id
					proviceId:0 ,//省会id统一为0
					cityId:'',//城市ID
					countyId:'',//区县ID
					currentPage1:1,//分页器
					totals:0,//总页数
//					emergency:[
//						{"value":"低"},
//						{"value":"中"},
//						{"value":"高"}
//					],
//					changeActive:0,
					urgency:[
						{"value":"一般","id":28},
						{"value":"紧急","id":27},
						{"value":"非常紧急","id":26}
					],
					//性别
      				customer_sex:[
      					{"value":"男","id":1},
      					{"value":"女","id":2}
      				],
					//客户标签
					customer_Label:[
						{"value":"一般客户","id":4},
						{"value":"VIP客户","id":3}
					],
					info5:[],
					info:[],//省会
					info0:[],//城市
					info1:[],//区县
					//维修工单需要提交的form表单
        			numberValidateForm: {
//			          restaurants: [],
//      			  state3: '',
					  customerId:"",//客户Id
					  customerName:"",//客户姓名
					  productTypeId:'',//产品类别id
					  productId:'',//产品id
					  productModel:'',//产品型号
					  serviceRequest: '',//产品描述
					  emergency:28,//紧急程度id
					  contactName: '',//联系人
					  channel:'',//渠道
        			  customerPhone:'',//手机号
      			  	  customerUuid:'',
    			  	  organizeId:'',//部门id
			        },
			        numberValidateForm1:{
			        	name:'',
			        	contact:'',
			        	phone:'',
			        	email:'',
			        	label:4,//客户标签
			        	province:'',//省份
			        	city:'',//城市
			        	county:'',
			        	address:'',
//			        	sex:1,
			        },
			        numberValidateForm2:{
			        	orderUuid:'',
			        	values0:'',//产品类别
			        	values1:'',//产品
			        	values2:'',//序列号
			        	stateValue:'',//在保状态
			        	faultValue:'',//故障类别
			        	values3:'',//处理信息
			        	values4:'',//备注
			        },
			        options11:[				//在保状态
						{
							value:38,
							label:'在保'
						},
						{
							value:39,
							label:'非在保'
						},
						{
							value:37,
							label:'未知'
						}
					],
					//故障类别
					options10:[{
          				label: '请选择故障类别',
          				options: []
        			}],
        			fileIds:[],//文件上传数组名
        			dialogImageUrl: '',	//图片上传url
       				dialogVisible3: false ,//放大
       				removeFile:[],//文件移除数组名
					finalFile:[],//最终上传文件数组名
					
					rules3: {
						name:[
							{
						        validator: validatePass,
						   }
						],
						contact:[
							{
								validator: validatePass3
							}
						],
						phone:[
							{
						        validator: validatePass4,
						  }
						],
						email:[
							{
								validator: validatePass5,
							}
						]
					},
					rules5:{
						
					}
				}
			},
			mounted(){
				//导航条左侧高度
				setTimeout(()=>{
					this.handleHeight()
				})
			},
			created(){
				//ajax请求工单个数
				this.singleNum()
				//ajax请求所有工单
				this.workNum()
			},
			methods: {
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
				//请求工单个数
				singleNum(){
					axios({
						method:'get',
						url:"/statistics",
						data:{},	
					})
					.then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.workOlderNum=res.data.data
						}	
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
				},
				//载入页面请求工单
				workNum(){
					axios({
						method:'get',
						url:"/status",
						params:{
							status:this.workerOlderNum,
							pageNum:this.currentPage1,
							query:this.customer_info
						}
					})
					.then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect   
						}else{
							console.log(res.data.data)
							this.manageList=res.data.data
							if(res.data.data.length>0){
								this.totals=res.data.data[0].total
							}else{
								this.totals=0
							}
							for(var i=0;i<res.data.data.length;i++){
								res.data.data[i].createTime=formatDateTime(res.data.data[i].createTime)
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
				//点击切换不同的工单列表
				handleSelect(index,indexPath){
					switch(index){
						case "1-1":
							this.workerOlderNum=49;
							break;
						case "1-2":
							this.workerOlderNum=50;
							break;
//						case "1-4":
//							this.workerOlderNum=15
//							break;
						case "1-3":
							this.workerOlderNum=16
							break;
						case "1-4":
							this.workerOlderNum=17
							break;
						case "1-5":
							this.workerOlderNum=18
							break;
						case "1-6":
							this.workerOlderNum=19
							break;
						case "1-7":
							this.workerOlderNum=20
							break;
						case "1-8":
							this.workerOlderNum=51
							break;
//						case "1-10":
//							this.workerOlderNum=21
//							break;
//						case "1-11":
//							this.workerOlderNum=22
//							break;
					}
					this.currentPage1=1
					//ajax请求所有工单
					axios({
						method:'get',
						url:"/status",
						params:{
							status:this.workerOlderNum,
							pageNum:this.currentPage1,
							query:this.customer_info
						}
					})
					.then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.manageList=res.data.data
							console.log(res.data.data.length)
							if(this.manageList.length===0){
								this.totals=0
							}else{
								this.totals=res.data.data[0].total
							}
							for(var i=0;i<res.data.data.length;i++){
								res.data.data[i].createTime=formatDateTime(res.data.data[i].createTime)
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
				//分页器方法
			    handleCurrentChange(val) {
			     	this.currentPage1=val
			     	this.workNum()
			    },
				//左侧导航条动态高度
				handleHeight(){
					var ConentPageLeft=document.getElementById("ConentPageLeft")
					let tt1 = document.getElementById('tt1')
					let tt2 = document.getElementById('tt2')
					let t0=document.getElementById('t1').offsetHeight;
					let t00=document.getElementById('t2').offsetHeight;
					if((t0+t00+106+tt1.offsetHeight+tt2.offsetHeight) > ConentPageLeft.offsetHeight){
						ConentPageLeft.style.height=t0+t00+106+tt1.offsetHeight+tt2.offsetHeight+"px";
					}
					else{
						ConentPageLeft.style.height="824px";
					}
				},
			    handleOpen(key, keyPath) {
					setTimeout(()=>{
						this.handleHeight()
					})
			    },
			    handleClose(key, keyPath) {
					setTimeout(()=>{
						this.handleHeight()
					})
			   },
			   //页面跳转
			   Worksheet(index){
//			   	console.log(index)
			   		window.location.href="manage.html?id="+index
			   },
			   //点击新建   productTypeId:'',//产品类别id productId:'',//产品id productModel:'',//产品型号 serviceRequest: '',//产品描述  emergency:28,//紧急程度id contactName: '',//联系人 channel:'',//渠道 customerPhone:'',//手机号
			    create_news(){
			    	this.numberValidateForm={
			    		customerName:'',
			    		productModel:'',
			    		serviceRequest:'',
			    		emergency:28,
			    		contactName:'',
			    		customerPhone:'',
			    		channel:''
			    	}
			    	this.value7=""
			    	this.value6=""
			    	this.dialogVisible=true
			    	this.zIndex1=false
        			this.holder1='手机号'
        			this.zIndex6=false
        			this.holder6='产品型号'
			    	setTimeout(()=>{	
			    		this.createNewMans()
			    	})
			    },
			   //页面查询
			   inquiry_this(){
			   		this.currentPage1=1
			   		axios({
						method:'get',
						url:"/status",
						params:{
							query:this.customer_info,
							status:this.workerOlderNum,
							pageNum:this.currentPage1
						}
					})
			   		.then(res=>{
			   			if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.manageList=res.data.data
							if(res.data.data.length>0){
								this.totals=res.data.data[0].total
							}else{
								this.totals=0
							}
							for(var i=0;i<res.data.data.length;i++){
								res.data.data[i].createTime=formatDateTime(res.data.data[i].createTime)
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
				//点击优先级
//				changes(index){
//					this.changeActive=index
//				},
				 //点击切换性别
			    change_sex(index){
//			    	this.numberValidateForm1.sex=index
			    },
				//点击紧急程度
				changes0(index){
					this.numberValidateForm.emergency=index
//					console.log(this.numberValidateForm.emergency)
				},
				//搜索客户名称获得焦点id name phone
				user_Search(){
					axios({
						method:'get',
						url:"/customers",
						params:{
							query:''
						}
					})
					.then(res=>{
//						console.log(res.data.data)
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.info5=res.data.data
							this.shown=true
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
				},
				//点击查询
				btn_Searchbtn(e){
					e.preventDefault()
					axios({
						method:'get',
						url:"/customers",
						params:{
							query:this.numberValidateForm.customerName
						}
					})
					.then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.info5=res.data.data
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
				},
				//客户名称下拉框点击事件
				checkCustomer(index,id,Uuid){
					this.numberValidateForm={customerName:'',customerPhone:'',productModel:'',serviceRequest:'',emergency:28,contactName:'',channel:''}
					this.value7="";this.value6="";
					this.shown=false
					for(var i=0;i<this.datasn.length;i++){
						if(id===this.datasn[i].id){
							this.numberValidateForm.customerName=this.datasn[i].name
						}
					}
					this.numberValidateForm.customerId=id //客户id
					this.numberValidateForm.customerUuid=Uuid //客户Uuid
				},
				//点击查询产品类别
				group_produce(){
					axios({
						method:'get',
						url:"/productTypes",
						params:{}
					})
					.then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.options3[0].options=res.data.data
							console.log(this.options3[0].options)
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
				},
				//点击选择产品类别
				check_Produce(keys){
					this.numberValidateForm.productTypeId=keys
					for(var i=0;i<this.options3[0].options.length;i++){
						if(keys==this.options3[0].options[i].id){
							this.numberValidateForm2.values0=this.options3[0].options[i].name
						}
					}
					
				},
				//点击查询产品
				group_products(){
					axios({
						method:'get',
						url:"/products",
						params:{
							typeId:this.numberValidateForm.productTypeId,
							customerId:this.numberValidateForm.customerId
						}
					})
					.then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							console.log(res.data.data)
							this.options4[0].options=res.data.data
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
				},
				//点击选择产品
				check_Products(keys){
					this.numberValidateForm.productId=keys
					axios({
						method:'get',
						url:"/products",
						params:{
							typeId:this.numberValidateForm.productTypeId,
							customerId:this.numberValidateForm.customerId
						}
					})
					.then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							console.log(res.data.data)
							this.options4[0].options=res.data.data
							this.zIndex6=true
        					this.holder6=''
							for(var i=0;i<res.data.data.length;i++){
								if(keys===res.data.data[i].id){
									this.numberValidateForm.productModel=res.data.data[i].model
									this.numberValidateForm2.values1=res.data.data[i].name
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
				//点击SLA请求数据
//				group_sla(){
//					axios({
//						method:'get',
//						url:"/slaType",
//						params:{}
//					})
//					.then(res=>{
//						console.log(res)
//						if(res.data.code==200){
//							this.options6[0].options=res.data.data
//						}else{
//							this.open7(res.data.msg)
//						}
//					})
//					.catch(err=>{
//						console.log(err)
//					})
//				},
				//获取选中的sla_id 传id
//				sla_Id(keys){
//					this.sla_id=keys
//				},
				//点击联系人请求数据 传汉字 customerUuid
				group_customer(){
					//console.log(this.numberValidateForm.customerUuid)
					axios({
						method:'get',
						url:"/contacts",
						params:{
							customerUuid:this.numberValidateForm.customerUuid
						}
					})
					.then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.options5[0].options=res.data.data
						}
					})
					.catch(err=>{
						this.numberValidateForm.contactName=""
						if(isTrue){
							this.open7(err.response.data.msg)
							isTrue=false
							if(err.response.data.code==20001){
								window.location.href=err.response.data.url
							}
						}
					})
				},
				//选择联系人
				check_Customer(keys){
					console.log(keys)
					axios({
						method:'get',
						url:"/contacts",
						params:{
							customerUuid:this.numberValidateForm.customerUuid
						}
					})
					.then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.options5[0].options=res.data.data
							this.zIndex1=true
        					this.holder1=''
							for(var i=0;i<res.data.data.length;i++){
								if(keys===res.data.data[i].name){
									this.numberValidateForm.customerPhone=res.data.data[i].phone
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
				//获得焦点请求部门
				group_department(){
					axios({
						method:'get',
						url:"/notEmptyDepartment",
						params:{}
					})
					.then(res=>{
						console.log(res.data.data)
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.options9[0].options=res.data.data
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
				},
			   	//点击确定
			   	submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
				        if (valid) {
					        axios({
								method:'POST',
								url:"/order",
								headers:{
									'Content-Type':'application/json; charset=UTF-8'
								},
								data:this.numberValidateForm
							})
				          	.then(res=>{
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
									//ajax请求工单个数
									this.singleNum()
									//ajax请求所有工单
									this.workNum()
									this.dialogVisible=false
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
				            console.log('error submit!!');
				            return false;
				        }
			        });
			    },
			    //点击左键失去焦点
			    createNewMans(){
			    	let _that=this;
					document.addEventListener('click',function(e){
						if(!!_that.$refs.userInfon.contains(e.target)) return;
						_that.shown=false
					})
			    },
			    //新建客户
			    CreateNewMan(){
			    	let _this=this;
			    	this.shown=false
			    	this.dialogVisible1=true
			    	setTimeout(()=>{
			    		_this.checkLmb()
			    		this.zIndex=false;this.zIndex2=false;this.zIndex3=false;this.zIndex4=false;
			    		this.holder="客户名称(必填)";this.holder2="联系人(必填)";this.holder3="手机号(必填)";this.holder4="客户邮箱";
			    		this.numberValidateForm1.province="";this.numberValidateForm1.city="";this.numberValidateForm1.county=""
			    		this.resetForm('numberValidateForm1')
			    	})
			    },
			    //点击切换用户状态
			    change_title(index){
			    	this.numberValidateForm1.label=index
			    },
			  
				//渠道获得焦点
				validatePass6(){
					this.zIndex5=true;
					this.holder5=""
				},
				//渠道失去焦点
				group_channel(){
					this.zIndex5=false;
					this.holder5="请输入渠道"
				},
				//客户名称获得焦点
				validatePass0(){
					this.zIndex=true;
					this.holder=""
				},
				 //联系人
				validatePass3(){
					this.zIndex2=true;
					this.holder2=""
				},
				//手机号
				validatePass4(){
					this.zIndex3=true;
					this.holder3=""
				},
				//客户邮箱
				validatePass5(){
					this.zIndex4=true;
					this.holder4=""
				},
				//点击省，市，县ajax封装
				provinces(){
					console.log(this.parentsId)
					axios({
						method:'get',
						url:"/districts",
						params:{
							parentId:this.parentsId
						},
					})
					.then(res=>{
						console.log(res)
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							if(this.show){
								this.info=res.data.data	
							}else if(this.shows){
								this.info0=res.data.data
							}else{
								this.info1=res.data.data
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
				//点击省份请求接口
				el_appselect(){
					this.show=!this.show
					if(this.show){
						this.parentsId=0
						this.provinces()
					}
				},
				//点击城市请求接口
				el_appSelect0(){
					this.shows =!this.shows
					if(this.shows){
						if(this.proviceId==''){
							this.parentsId=''
						}else{
							this.parentsId=this.proviceId
						}
						this.provinces()
					}
				},
				//点击选择乡镇接口
				el_appSelect1(){
					this.showss=!this.showss
					if(this.showss){
						if(this.proviceId=='' || this.cityId==''){
							this.parentsId=''
						}else{
							this.parentsId=this.cityId
						}
						this.provinces()
					}
				},
				//新建工单点击确定
			   	submitForm0(formName) {
			        this.$refs[formName].validate((valid) => {
			        if (valid) {
			          	axios({
							method:'POST',
							url:"/customer",
							headers:{
								'Content-Type':'application/json; charset=UTF-8'
							},
							data:this.numberValidateForm1
						})
				        .then(res=>{
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.dialogVisible1=false
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
			            console.log('error submit!!');
			            return false;
			        }
			      });
			    },
			    //新建工单点击取消 
			    Cancellation(){
			    	this.dialogVisible1 = false
			    	this.numberValidateForm1.province="省份";this.numberValidateForm1.city="城市";this.numberValidateForm1.county="区县"
			    },
			    //重置表单方法
			    resetForm(formName) {
        			this.$refs[formName].resetFields();
      			},
      			//选择省会
				capital(index,id){
					this.v=this.datas[index].name
					this.proviceId=id;
					this.parentsId=this.proviceId;
					this.show=false
					this.numberValidateForm1.province=this.v
					this.v=''
					this.numberValidateForm1.city=""
					this.numberValidateForm1.county=''
				},
				//选择城市
				citys(index,id){
					this.v0=this.datas0[index].name;
					this.cityId=id;
					this.parentsId=this.cityId
					this.shows=false
					this.numberValidateForm1.city=this.v0
					this.v0=''
					this.numberValidateForm1.county=""
				},
				//选择区县
				countys(index,id){
					this.v1=this.datas1[index].name
					this.countyId=id
					this.parentsId=this.countyId
					this.showss=false
					this.numberValidateForm1.county=this.v1
					this.v1=''
				},
				//点击左键失去焦点
				checkLmb(){
					let _this=this;
					document.addEventListener('click',function(e){
						if(!!_this.$refs.userInfo.contains(e.target)) return;
						_this.show=false
						if(!!_this.$refs.userInfos.contains(e.target)) return;
						_this.shows=false
						if(!!_this.$refs.userInfoss.contains(e.target)) return;
						_this.showss=false
					})
				},
			/******************************************填写回单**********************************************/	
				//故障类别
				faultClick(){         //故障类别交互
					axios({
						method:'GET',
						url:'/faultTypes',
						params:{productTypeId:this.numberValidateForm.productTypeId}
					}).then(res=>{
						console.log(res.data.data)
						
						this.options10[0].options=res.data.data;
					})
				},
				uploadFileSuccess:function(response, file, fileList){  				//文件上传成功时的钩子
					let fileItems=response.data;
					console.log(fileItems)
					this.fileIds.push(fileItems)
					console.log(this.fileIds)
				},
				handleRemove(file,response,fileList) {     					//文件上传移除操作
					this.removeFile.push(file.response.data)
					console.log(this.removeFile)
				},
				handlePictureCardPreview(file) {     						//文件上传点击放大图片操作
					this.dialogImageUrl = file.url;
					this.dialogVisible3 = true;
				},
				//点击运营部门
				submitForm2(formName) {
			        this.$refs[formName].validate((valid) => {
				        if (valid) {
					        axios({
								method:'POST',
								url:"/order",
								headers:{
									'Content-Type':'application/json; charset=UTF-8'
								},
								data:this.numberValidateForm
							})
				          	.then(res=>{
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
									//ajax请求工单个数
									this.singleNum()
									//ajax请求所有工单
									this.workNum()
									this.dialogVisible=false
									this.open6(res.data.data)
									this.dialogVisible5=true
									this.numberValidateForm2.orderUuid=res.data.msg
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
				//点击提交运营部门
				submitForm5(formName) {
			        this.$refs[formName].validate((valid) => {
				        if (valid) {
				        	var temp=[];
							for(var i=0;i<this.removeFile.length;i++){
								temp[this.removeFile[i]]=true;
							}
							for(var i=0;i<this.fileIds.length;i++){
								if(!temp[this.fileIds[i]]){
									this.finalFile.push(this.fileIds[i])
								}
							}
					        axios({
								method:'POST',
								url:"/reportServer/"+this.numberValidateForm2.orderUuid,
								headers:{
									'Content-Type':'application/json; charset=UTF-8'
								},
								data:{
									orderUuid:this.numberValidateForm2.orderUuid,
									productType:this.numberValidateForm2.values0,//产品类别
									productName:this.numberValidateForm2.values1,//产品
									warrantyStatus:this.numberValidateForm2.stateValue,//在保状态
									disposeDescribes:this.numberValidateForm2.values3,//处理信息
									faultType:this.numberValidateForm2.faultValue,//故障类别
									productUuid:this.numberValidateForm2.values2,//产品序列号
									fileIds:this.finalFile,
									describes:this.numberValidateForm2.values4
								}
							})
				          	.then(res=>{
								if(res.data.code==300){
									window.location.href=res.data.redirect
								}else{
									//ajax请求工单个数
									this.singleNum()
									//ajax请求所有工单
									this.workNum()
//									this.dialogVisible=false
									this.open6(res.data.data)
									this.dialogVisible=false
									this.dialogVisible5=false
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
    		computed:{
  				datas:function(){
					if(this.v===''){
						return this.info
					}else if(this.v!==''){
						return this.info.filter((blogaaa)=>{
  							return blogaaa.value.match(this.v)
  						})
					}
				},
				datas0:function(){
					if(this.v0===''){
						return this.info0
					}else if(this.v0!==''){
						return this.info0.filter((blogaaa)=>{
  							return blogaaa.value.match(this.v0)
  						})
					}
				},
				datas1:function(){
					if(this.v1===''){
						return this.info1
					}else if(this.v1!==''){
						return this.info1.filter((blogaaa)=>{
  							return blogaaa.value.match(this.v1)
  						})
					}
				},
				datasn:function(){
					if(this.numberValidateForm.customerName==''){
						this.valueLength=this.info5.length
						return this.info5
					}else if(this.numberValidateForm.customerName!==''){
						var npc=this.info5.filter((blogaaa)=>{
  							return blogaaa.name.match(this.numberValidateForm.customerName) || blogaaa.phone.match(this.numberValidateForm.customerName)
  						})
						this.valueLength=npc.length
						return npc
					}
				}
  			},
		})