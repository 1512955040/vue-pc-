require("../CSS/normalize.css")
require("../CSS/customerManagementDetails.css");

var app=new Vue({
	el:"#body",
	data(){
		var validatePass = (rule, value, callback) => {
					if(value === '') {
						callback(new Error('联系人不能为空'));
					}else if(value.length > 20 ){
						callback(new Error('联系人名称不能超过20字'));
					}
					else {
						
						callback()
					}
				}
		var validatePass1 = (rule, value, callback) => {
					if(value.length > 50 ){
						callback(new Error('详细地址不能超过50字'));
					}
					else {
						callback()
					}
				}
		return{
			rules3:{
				name:[
							{
						        validator: validatePass,
						   }
						],
						address:[
							{
						        validator: validatePass1,
						   }
						]
			},
			bckArr:[  							//上方导航栏
			{label:'产品档案'},
			{label:'联系人'},
			{label:'合同'},
			{label:'历史工单'}
		],
		//主菜单的4个按钮
		titleIndex:[
			{'index':'0'},
			{'index':'1'},
			{'index':'2'},
			{'index':'3'}
		],
		//性别
		customer_sex:[
			{"value":"男","id":1},
			{"value":"女","id":2}
		],
		changeTitles:1,
		isActive:0,                        //导航栏选中clas
		isArchives:true,					//新建产品档案按钮显示
		isLinkman:false, 					//新建联系人按钮显示
		isFile:false,						//上传附件按钮显示
		options: [{							//更多操作选项
					value: '选项1',
					label: '编辑客户'
				}, {
					value: '选项2',
					label: '删除客户'
				}],
		value:'', 							//更多操作value
		tablesOneClick:true,                //表格1显示
		tablesTwoClick:false,                //表格2显示
		tablesThrClick:false,                //表格3显示
		tablesFourClick:false,                //表格4显示
		dialogVisible:false,				//详情弹出框
		dialogVisible3:false,				//新建产品档案弹出框
		dialogVisible1:false,				//新建联系人弹出框
		dialogVisible2:false, 				//合同上传弹出框
		dialogVisible4:false,				//新建联系人详情弹出框
		dialogVisible10:false,			//客户编辑弹出框
		visible2:false,						//新建联系人详情弹出框
		Detail_Deleting:'删 除',				//删除按钮内容
		disabled:true,						//删除按钮disabeled
		loading:false,						//loading加载状态
		input:'',							//
		textarea:'',						//
		visible3:false,
		visible4:false,
		receveId:'',						//url获取参数
		customerName:'',					//客户名称
		contact1:'',							//联系人
		phone:'',							//手机号
		email:'',							//邮箱
		province1:'',						//区域省
		address:'',							//详细地址
		labelStr:'',						//标签
		customerId:'',						//客户Id
		createTime:'',						//开始时间
		startTime:'',						//最近服务
		formChange:{
			name:'',
			contact:'',
			number:'',
			email:'',
			phone:'',
			label:'',
			province:'',
			city:'',
			county:'',
			address:'',
			contactId:''
		},
		form: {								//新建产品档案form表单
			  name: '',
			  product:'',
			  type:'',
			  date1: '',
			  date2: '',
			  warrant: '',
				textarea:'',
			  price: '',
			  date3: '',
			  number:''
        },
		contract:{							//合同上传form表单
			name:'',
			number:'',
			left:'',
			right:'',
			beginTime:'',
			offTime:'',
			SLA:'',
			type:''
		},
		contractTypeOptions:[				//合同上传合同类别	
			{
				value:60,
				label:'普通合同'
			},
			{
				value:61,
				label:'服务合同'
			}
		],
		slaOptions:[],						//SLA类别
		productId:'',						//产品id
		tablesOneOptions:[],				//产品列表请求过来数据
		tablesTwoOptions:[],				//联系人列表请求数据						
		linkManName:'',						//联系人姓名input value
		regoinOptions:[],					//产品类别选择框
		typeId:'',							//产品类别对应Id
		contactDetailsId:'',				//新建联系人详情对应id
		productOptions:[                    //产品选择框 
			
		],	
		contactDetailsOptions:[],			//新建联系人详情请求数据
		warOptions:[						//保修状态
			{
				value:'0',
				label:'无保修'
			},
			{
				value:'3',
				label:'3个月'
			},
			{
				value:'6',
				label:'6个月(半年)'
			},
			{
				value:'12',
				label:'12个月(一年)'
			},
			{
				value:'24',
				label:'24个月(两年)'
			},
			{
				value:'36',
				label:'36个月(三年)'
			},
			{
				value:'60',
				label:'60个月(五年)'
			},
			{
				value:'120',
				label:'120个月(十年)'
			},
		],
		details:[],						//详情弹出框
		detailsId:'',					//详情id
		contact:{						//新建联系人v-model
			name:'',
			phone:'',
			radio:1,
			prosition:'',
			email:'',
			address:'',
			dec:''
		},
		options_Num2: [],//省
		options_Num3:[],//城市
		options_Num4:[],//县城
		proviceId:0,//省id
		citysId:'',//城市id
		countysId:'',//区县id
		show:false,
		provinces:'',

		info:[	
						{ "value": "北京"},
						{ "value": "黑龙江省"},
						{ "value": "北京"},
						{ "value": "吉林省"},
						{ "value": "北京"},
						{ "value": "北京"},
		],
		//城市
		shows:false,
		citys:'',
		info0:[
			{ "value": "上海"},
						{ "value": "高州"},
						{ "value": "吉林"},
						{ "value": "长春"},
						{ "value": "太远"},
						{ "value": "石家庄"},
						{ "value": "山西"},
						{ "value": "邢台"},
		],
		//区县
		showss:false,
		v1:'',
		info1:[
			{ "value": "纳贡"},
						{ "value": "巨鹿"},
						{ "value": "威县"},
		],
		numberValidateForm1:{
			name:'',
			contact:'',
			phone:'',
			email:'',
			label:4,//客户标签
			province:'',//省份
			city:'',//城市
			county:'',
			describes:'',
		},
		historyOptions:[],				//历史工单
		pact:[],						//合同
		fileIds:[],						//合同上传成功返回id
		removeFile:[],					//合同上传移除文件名
		finalFile:[],					//最终上传文件名
		dialogVisible5:false,			//合同上传放大镜
		dialogImageUrl: '',	//图片上传url
		disabled1:false, 				//合同上传sla
		contractDetailsOptions:"",		//合同详情
		dialogVisible6:false,			//合同详情弹出框
		contractStatus:'',				//合同激活颜色
		pageNum:1,						//页码
		pageNum1:1,						//
		pageNum2:1,
		pageNum3:1,
		checked1:false,
		totals:0,//客户总条数
		totals1:0,//
		totals2:0,
		totals3:0,
		clickA:0,
		isInstre:false,//可激活按钮
		isInstre1:false,//已激活按钮
		changeContactOptions:[
			{
				label:'请选择联系人',
				options:[]
			}
		],
		phoneDisabled:false,
		emailDisabled:false,
				//客户标签 
		customer_Label:[
			{"value":"普通客户","id":4},
			{"value":"VIP客户","id":3}
		],
		}
		
	},
	watch:{	
		formChange:{
			 handler(val,oldVal){
					if(val.phone!==""){
						this.phoneDisabled=true;
					}
          },
            deep:true
      }
	},
	computed:{
		
	},

	created(){
		this.receveParams();
		this.changeContact();//载入页面联系人接口
	},
	mounted(){

	},
	methods:{
		//产品档案点击页码
		handleCurrentChange(val){
			this.beginProduct();
		},
		//联系人点击页码
		handleCurrentChange1(val){
			this.beginCustomer();
		},
		handleCurrentChange2(val){
			this.beginPact();
		},
		handleCurrentChange3(val){
			this.beginHistory();
			var stateObject={};
			var title="";
			var newUrl="customerManagementDetails.html?id="+this.receveId+"&page=3&page1="+this.pageNum3;
			history.pushState(stateObject, title, newUrl);
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
		bckClick:function(n){            //导航栏点击事件
			this.isActive=n;
			if(n==0){
				var stateObject={};
				var title="";
				var newUrl="customerManagementDetails.html?id="+this.receveId;
				history.replaceState(stateObject, title, newUrl);
				this.isArchives=true;
				this.isLinkman=false;
				this.isFile=false;
				this.tablesOneClick=true;
				this.tablesTwoClick=false;
				this.tablesThrClick=false;
				this.tablesFourClick=false;
			}else if(n==1){
				var stateObject={};
				var title="";
				var newUrl="customerManagementDetails.html?id="+this.receveId;
				history.replaceState(stateObject, title, newUrl);
				this.isArchives=false;
				this.isLinkman=true;
				this.isFile=false;
				this.tablesOneClick=false;
				this.tablesTwoClick=true;
				this.tablesThrClick=false;
				this.tablesFourClick=false;
			}else if(n==2){
				var stateObject={};
				var title="";
				var newUrl="customerManagementDetails.html?id="+this.receveId;
				history.replaceState(stateObject, title, newUrl);
				this.isArchives=false;
				this.isLinkman=false;
				this.isFile=true;
				this.tablesOneClick=false;
				this.tablesTwoClick=false;
				this.tablesThrClick=true;
				this.tablesFourClick=false;
			}else if(n==3){
				var stateObject={};
				var title="";
				var newUrl="customerManagementDetails.html?id="+this.receveId+"&page=3&page1="+this.pageNum3;
				 history.replaceState(stateObject, title, newUrl);
				this.isArchives=false;
				this.isLinkman=false;
				this.isFile=false;
				this.tablesOneClick=false;
				this.tablesTwoClick=false;
				this.tablesThrClick=false;
				this.tablesFourClick=true;
			}
		},
		/////////////////////////////////////////筛选省市县//////////////////////////////////////////////
		//筛选省,市，县封装
		check_pro(num){
			var _url="/districts";
			var parentId={parentId:this.parentsId}
			myGetByJson(_url,parentId).then(res=>{
				if(res.data.code==200){
						if(num==1){
							this.options_Num2=res.data.data	
						}else if(num==2){
							this.options_Num3=res.data.data	
						}else if(num==3){
							this.options_Num4=res.data.data
						}
					}
				})
				.catch(err=>{
					console.log(err)
				})
		},
		//筛选点击省取接口
		check_province(){
				this.parentsId=0;
				this.form.city='';
				this.form.county='';
				this.check_pro(1)
		},
		//筛选选择省
		check_save(val){
				this.parentsId=val
				this.province=val
		},
		//筛选点击城市
		check_citys(){
			this.form.county=''
			if(this.form.province==''){
				this.parentsId=''
			}else if(this.form.province!==''){
				this.parentsId=this.province
			}
				this.check_pro(2)
		},
		//筛选选择城市
		check_unit(val){
			this.parentsId=val
			this.citysId=val
		},
		//点击县城
		check_county(){
			if(this.form.province==''){
				this.parentsId=''
			}else if(this.form.city=='' && this.form.province!==''){
				this.parentsId=this.province
			}
			else{
				this.parentsId=this.citysId
			}
				this.check_pro(3)
		},
		//筛选县城
		check_countcity(val){
			this.parentsId=val
			//this.countysId=val
		},
		//点击筛选
		search_filter(){
			this.Customer_details()
		},
///////////////////////////////////////////////////////////新建客户添加省市县//////////////////////////////////////////////////
		//新建点击省取接口
		check_province0(){
			this.parentsId=0;
			this.numberValidateForm1.city='';
			this.numberValidateForm1.county='';
			this.check_pro(1)
		},
		//选择省
		check_save0(val){
//								console.log(val)
								this.parentsId=val
								this.province=val
			//					numberValidateForm1
								for(var i=0;i<this.options_Num2.length;i++){
									if(val==this.options_Num2[i].id){
										this.numberValidateForm1.province=this.options_Num2[i].name
									}
								}
		},
		check_province1(){
			this.parentsId=0;
			this.formChange.city='';
			this.formChange.county='';
			this.check_pro(1)
		},
		//选择省
		check_save1(val){
//								console.log(val)
								this.parentsId=val
								this.province=val
			//					numberValidateForm1
								for(var i=0;i<this.options_Num2.length;i++){
									if(val==this.options_Num2[i].id){
										this.formChange.province=this.options_Num2[i].name;
//										console.log(this.formChange.province)
									}
								}
		},
		//点击城市
						check_citys0(){
							this.form.county=''
							if(this.numberValidateForm1.province==''){
								this.parentsId=''
							}else if(this.numberValidateForm1.province!==''){
								this.parentsId=this.province
							}
							this.check_pro(2)
						},
						//选择城市
						check_unit0(val){
							this.parentsId=val
							this.citysId=val
							for(var i=0;i<this.options_Num3.length;i++){
								if(val==this.options_Num3[i].id){
									this.numberValidateForm1.city=this.options_Num3[i].name
								}
							}
						},
			//点击城市
							check_citys1(){
								this.form.county=''
								if(this.formChange.province==''){
									this.parentsId=''
								}else if(this.formChange.province!==''){
									this.parentsId=this.province
								}
								this.check_pro(2)
							},
							//选择城市
							check_unit1(val){
								this.parentsId=val
								this.citysId=val
								for(var i=0;i<this.options_Num3.length;i++){
									if(val==this.options_Num3[i].id){
										this.formChange.city=this.options_Num3[i].name
									}
								}
							},			
						//点击县城
						check_county0(){
							if(this.numberValidateForm1.province==''){
								this.parentsId=''
							}else if(this.numberValidateForm1.city=='' && this.numberValidateForm1.province!==''){
								this.parentsId=1000000000
							}
							else{
								this.parentsId=this.citysId
							}
							this.check_pro(3)
						},
						//筛选县城
						check_countcity0(val){
							this.parentsId=val
		//					this.countysId=val
							for(var i=0;i<this.options_Num4.length;i++){
								if(val==this.options_Num4[i].id){
									this.numberValidateForm1.county=this.options_Num4[i].name
								}
							}
						},
					//点击县城
					check_county1(){
						if(this.formChange.province==''){
							this.parentsId=''
						}else if(this.formChange.city=='' && this.formChange.province!==''){
							this.parentsId=1000000000
						}
						else{
							this.parentsId=this.citysId
						}
						this.check_pro(3)
					},
					//筛选县城
					check_countcity1(val){
						this.parentsId=val
	//					this.countysId=val
						for(var i=0;i<this.options_Num4.length;i++){
							if(val==this.options_Num4[i].id){
								this.formChange.county=this.options_Num4[i].name
							}
						}
					},					
		//删除详情
		Detail_Delete(){
			this.visible2=true
		},
		//判断是否能删除
		Delete_this(e){
			// this.checked1=!this.checked1;
			let checked=e.target.checked;
			if(checked) {
				this.disabled=false
			}
			else{
				this.disabled=true
			}
		},
		//确定删除
		Delete_Detail(id){
			if(this.dialogVisible){
				axios({
					method:'GET',
					url:'/delBuyHistory',
					params:{buyHisId:id}
				}).then(res=>{
					if(res.data.code==300){
						window.location.href=res.data.redirect
					}else{
						this.loading=!this.loading
						setTimeout(()=>{
							this.loading=false
							this.Detail_Deleting='删除成功'
							this.visible2=false
							this.dialogVisible=false
							
						},1000)	
						setTimeout(()=>{
								this.beginProduct();
						},1500)	
					}					
				}).catch(err=>{
					this.open7(err.response.data.msg)
					if(err.response.data.code==20001){
						window.location.href=err.response.data.url
					}
				})
			}else if(this.dialogVisible4){
				axios({
					method:'GET',
					url:'/delContacts',
					params:{contactsId:id}
				}).then(res=>{
					if(res.data.code==300){
						window.location.href=res.data.redirect
					}else{
						this.loading=!this.loading
						setTimeout(()=>{
							this.loading=false
							this.Detail_Deleting='删除成功'
							this.visible2=false
							this.dialogVisible4=false
						},1000)	
						setTimeout(()=>{
							this.beginCustomer();
						},1500)	
					}
				}).catch(err=>{
					this.open7(err.response.data.msg)
					if(err.response.data.code==20001){
						window.location.href=err.response.data.url
					}
				})
			}
			
						
		},
		//点击切换性别
		change_sex(index){
			this.contact.radio=index
		}, 
		//删除客户档案
		Delete_Customer(){
			axios({
				method:'GET',
				url:'/delCustomer',
				params:{customerUuid:this.receveId}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					this.loading=!this.loading
					setTimeout(()=>{
						this.loading=false
						this.Detail_Deleting='删除成功'
						this.visible4=false;
					},1000)	
					setTimeout(()=>{
						window.location.href="customerManagement.html"
					},1500)
				}
		
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
		},
		receveParams:function(){
			this.receveId=getUrlParms("id");
				var a=getUrlParms("page");
				var b=Number(getUrlParms("page1"));
				if(a!==undefined&&b!==undefined){
					this.isActive=3;
					this.pageNum3=b;
					this.isArchives=false;
					this.isLinkman=false;
					this.isFile=false;
					this.tablesOneClick=false;
					this.tablesTwoClick=false;
					this.tablesThrClick=false;
					this.tablesFourClick=true;
				}
				this.beginHistory();
			this.beginCustomer();
			this.beginProduct();
			this.beginDetails();
			this.beginPact();
		},
		beginDetails(){
			axios({												//左边详情请求
				method:'GET',
				url:'/customer',
				params:{customerUuid:this.receveId}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
//					console.log(res.data.data)
					var data=res.data.data;
					this.customerName=data.name;
					this.customerId=data.id;
					this.contact1=data.contact;
					this.phone=data.phone;
					this.email=data.email;
					this.province1=data.province+data.city+data.county;
					this.address=data.address;
					this.labelStr=data.labelStr;
					if(data.createTime==null||data.createTime==""){
						this.createTime="";
					}else{
						this.createTime=formatDateTime(data.createTime);
					}
					if(data.startTime==null||data.startTime==""){
						this.startTime="";
					}else{
						this.startTime=formatDateTime(data.startTime);
					}		
					this.form.name=data.name;
				}	
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
		},
		beginProduct(){
			axios({											//右边产品档案请求
				method:'GET',
				url:'/buyHistorys',
				params:{customerUuid:this.receveId,pageNum:this.pageNum}
			}).then(res=>{
				console.log(res.data)
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					var data=res.data.data;		
					if(data.length>0){
						this.totals=res.data.data[0].total;
						for(var i=0;i<data.length;i++){
							data[i].buyDate=formatDate(data[i].buyDate);
							data[i].warrantyEnd=formatDate(data[i].warrantyEnd)
						}
						this.tablesOneOptions=data;
					}else{
						this.totals=0
					}
					
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			});
		},
		beginCustomer(){
			axios({										//联系人接口
				method:'GET',
				url:'/contacts',
				params:{customerUuid:this.receveId,pageNum:this.pageNum1} 
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
//					console.log(res.data.data,1);
					var data=res.data.data;
					if(data.length>0){
						this.totals1=res.data.data[0].total;
						for(var i=0;i<data.length;i++){
							data[i].createTime=formatDate(data[i].createTime);
						}
						this.tablesTwoOptions=data;
					}else{
						this.totals1=0;
					}
					
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			});
		},
		beginPact(){
			axios({									//合同
							method:'GET',
							url:'/contract',
							params:{customerUuid:this.receveId,pageNum:this.pageNum2}
						}).then(res=>{
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								var data=res.data.data;
//								console.log(data)
								if(data.length>0){
									this.totals2=res.data.data[0].total;
									for(var i=0;i<data.length;i++){
										data[i].dateTime="起始时间"+formatDateTime(data[i].effectiveTime)
										data[i].dateTime2="结束时间"+formatDateTime(data[i].ineffectiveTime);
										data[i].isStre=false;
										data[i].isStre1=false;
										if(data[i].contractStatus==58&&data[i].contractType==61&&data[i].isActivation==5){
											data[i].isStre=true;
											data[i].isStre1=false;
				
										}else if(data[i].contractStatus==58&&data[i].contractType==61&&data[i].isActivation==6){
											data[i].isStre=false;
											data[i].isStre1=true;
										}
										if(data[i].contractStatus==57){
											data[i].contractStatusColor="danger"
											data[i].disabled=true;
										}else if(data[i].contractStatus==58){
											data[i].contractStatusColor="success"
											data[i].disabled=true;
										}else if(data[i].contractStatus==59){
											data[i].contractStatusColor="info"
											data[i].disabled=true;
										}
									}
									this.pact=data;
								}else{
									this.totals2=0;
								}
							}
						}).catch(err=>{
							console.log(err)
// 							this.open7(err.response.data.msg);
// 							if(err.response.data.code==20001){
// 								window.location.href=err.response.data.url
// 							}
						})
		},
		beginHistory(){
			axios({										//历史工单
				method:'GET',
				url:'/historyOrder',
				params:{customerUuid:this.receveId,pageNum:this.pageNum3}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					var data=res.data.data;
//					console.log(res.data.data,3)
					if(data.length>0){
						this.totals3=res.data.data[0].total;
						for(var i=0;i<data.length;i++){
							data[i].createTime=formatDateTime(data[i].createTime)
						}
						this.historyOptions=data;
					}else{
						this.totals3=0
					}
					
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			});
		},
		workSheet(index){											//历史工单页面跳转
			window.location.href="manage.html?id="+index
		},
		backClick(){
			window.history.back(-1); 

		},
		radioClick1:function(){
			this.radio=1;
		},
		radioClick2:function(){
			this.radio=2;
		},
		typeClick:function(){       			//产品类别选择框获取焦点事件
			axios({
				method:'GET',
				url:'/productTypes',
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					this.regoinOptions=res.data.data;
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			});
		},
		productClick:function(){
			for(var i=0;i<this.regoinOptions.length;i++){
				if(this.regoinOptions[i].name==this.form.type){
					this.typeId=this.regoinOptions[i].id;
				}
			}
			axios({
				method:'GET',
				url:'/products',
				params:{typeId:this.typeId}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					this.productOptions=res.data.data
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			});
		},
		submitArh:function(){						//新建产品档案表单提交
			for(var i=0;i<this.productOptions.length;i++){
				if(this.productOptions[i].name==this.form.product){
					this.productId=this.productOptions[i].id;
				}
			}
			if(!this.dialogVisible){
//			console.log(this.productId)
			axios({
				method:'POST',
				url:'/buyHistory',
				data:{
					productId:this.productId,
					name:this.form.name,
					model:this.form.type,
					productUuid:this.form.number,
					producedDate:this.form.date1,
					typeId:this.typeId,
					customerId:this.customerId,
					buyDate:this.form.date2,
					buyPrice:this.form.price,
					warrantyEnd:this.form.date3,
					warrantyPeriod:this.form.warrant,
					describes:this.form.textarea
				}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					this.beginProduct();
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			});
		}else{
			for(var i=0;i<this.regoinOptions.length;i++){						//查找产品类型
				if(this.regoinOptions[i].name==this.form.type){
					this.typeId=this.regoinOptions[i].id;
				}
			}
//			console.log(this.productId,this.typeId)
			axios({
				method:'POST',
				url:'/buyHistory/'+this.detailsId,
				data:{
					productId:this.productId,
					name:this.form.name,
					model:this.form.type,
					productUuid:this.form.number,
					producedDate:this.form.date1,
					typeId:this.typeId,
					customerId:this.customerId,
					buyDate:this.form.date2,
					buyPrice:this.form.price,
					warrantyEnd:this.form.date3,
					warrantyPeriod:this.form.warrant,
					describes:this.form.textarea
				}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					this.beginProduct();
					this.dialogVisible=false;
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			});
		}		
		},
		detailsClick:function(id){         					//点击档案详情
		this.detailsId=id;
			axios({
				method:'GET',
				url:'/buyHistory',
				params:{buyHisId:id}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					this.dialogVisible=true;
					var data=res.data.data;
					data.buyDate=formatDate(data.buyDate);
					data.warrantyEnd=formatDate(data.warrantyEnd);
					data.producedDate=formatDate(data.producedDate);
					this.details=data;
//					console.log(this.details)
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
		},
		submitContact(){								//新建联系人表单提交
			if(!this.dialogVisible4){
				axios({
					method:'POST',
					url:'/contacts',
					data:{
						customerId:this.customerId,
						name:this.contact.name,
						sex:this.contact.radio,
						position:this.contact.prosition,
						phone:this.contact.phone,
						email:this.contact.email,
						province:this.numberValidateForm1.province,
						city:this.numberValidateForm1.city,
						county:this.numberValidateForm1.county,
						address:this.contact.address,
						describes:this.contact.dec
					}
				}).then(res=>{
					if(res.data.code==300){
						window.location.href=res.data.redirect
					}else{
						this.beginCustomer();
					}
				}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
			}else{
				axios({
					method:'POST',
					url:'/contacts/'+this.contactDetailsId,
					data:{
						name:this.contact.name,
						sex:this.contact.radio,
						position:this.contact.prosition,
						phone:this.contact.phone,
						email:this.contact.email,
						province:this.numberValidateForm1.province,
						city:this.numberValidateForm1.city,
						county:this.numberValidateForm1.county,
						address:this.contact.address,
						describes:this.contact.dec
					}
				}).then(res=>{
					if(res.data.code==300){
						window.location.href=res.data.redirect
					}else{
						this.beginCustomer();
						this.beginDetails();
						this.dialogVisible4=false;
					}
				}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
			}
		},
		uploadFileSuccess:function(response, file, fileList){  				//合同上传成功时的钩子
			let fileItems=response.data;
//			console.log(fileItems)
			this.fileIds.push(fileItems)
//			console.log(this.fileIds)
		},
		handleRemove(file,response,fileList) {     					//文件上传移除操作
			this.removeFile.push(file.response.data)
//			console.log(this.removeFile)
		},
		handlePictureCardPreview(file) {     						//文件上传点击放大图片操作
			this.dialogImageUrl = file.url;
			this.dialogVisible4 = true;
		},
		archDetails(id){												//新建产品档案点击编辑请求
			var a=document.getElementById("newWork");
			var b=a.getElementsByClassName("el-dialog__title")[0];
			b.innerHTML="产品档案编辑";
//			console.log(b)
			axios({
				method:'GET',
				url:'/buyHistory',
				params:{buyHisId:id}
			}).then(res=>{
//				console.log(res.data)
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{	
					var data=res.data.data;
					this.productId=data.productId;
					this.typeId=data.typeId;
					this.form.name=data.customerName;
					this.form.type=data.typeName;
					this.form.product=data.name;
					this.form.number=data.productUuid;
					this.form.date1=formatDate(data.producedDate);
					this.form.date2=formatDate(data.buyDate);
					this.form.price=data.buyPrice;
					this.form.warrant=data.warrantyPeriod;
					this.form.date3=formatDate(data.warrantyEnd);
					this.form.textarea=data.describes;
					}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
		},
		newarchClick(){													//新建产品档案清空表单
			var a=document.getElementById("newWork");
			var b=a.getElementsByClassName("el-dialog__title")[0];
			b.innerHTML="新建产品档案";
			this.form.name=this.customerName;
			this.form.type='';
			this.form.product='';
			this.form.number='';
			this.form.date1='';
			this.form.date2='';
			this.form.price='';
			this.form.warrant='';
			this.form.date3='';
			this.form.textarea='';
		},
		newContactClick(){
				var a=document.getElementById("buildCustomer");
				var b=a.getElementsByClassName("el-dialog__title")[0];
				b.innerHTML="新建联系人";
				this.contact.name="";
				this.contact.email="";
				this.contact.radio="";
				this.contact.phone="";
				this.contact.dec="";
				this.contact.prosition="";
				this.contact.address="";
				this.numberValidateForm1.province="";
				this.numberValidateForm1.city="";
				this.numberValidateForm1.county="";
		},
		contactDetails(id){								//新建联系人详情请求
		this.contactDetailsId=id;
			axios({
				method:'GET',
				url:'/contactOne',
				params:{id:id}
			}).then(res=>{
				console.log(res.data)
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{	
					this.dialogVisible4=true;
					var data=res.data.data;
					if(data.sex==1){
						data.sex="男"
					}else{
						data.sex="女"
					}
					this.contactDetailsOptions=data;
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
		},
		download(id){										//合同下载
				axios({
					method:'GET',
					url:'/downLoad',
					params:{fileUuid:id},
					headers: {
						'Content-Type': 'application/json'
					},
					// responseType:'arraybuffer'
				}).then(res=>{
					if(res.data.code==300){
						window.location.href=res.data.redirect
					}else{
						let headers = res.headers;
						let blob = new Blob([res.data.data], {
							type: headers['content-type']
						});
						let link = document.createElement('a');
						link.href = window.URL.createObjectURL(blob);
						const fileName = headers['content-disposition'];
						var title = fileName.split('=')[1] ;
						link.download = title;
						link.click(); 
					}
				}).catch(err=>{
					this.open7(err.response.data.msg);
					if(err.response.data.code==20001){
						window.location.href=err.response.data.url
					}
				})
		},
		contactEdit(id){
			var a=document.getElementById("buildCustomer");
			var b=a.getElementsByClassName("el-dialog__title")[0];
			b.innerHTML="联系人编辑"
			axios({
				method:'GET',
				url:'/contactOne',
				params:{id:id}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					var data=res.data.data;
					console.log(res.data)
					this.contact.name=data.name;
					this.contact.email=data.email;
					this.contact.phone=data.phone;
					this.contact.address=data.address;
					this.contact.prosition=data.position;
					this.contact.radio=data.sex;
					this.contact.dec=data.dec;
					this.numberValidateForm1.province=data.province;
					this.numberValidateForm1.city=data.city;
					this.numberValidateForm1.county=data.county
				}
			}).catch(err=>{
					this.open7(err.response.data.msg);
					if(err.response.data.code==20001){
						window.location.href=err.response.data.url
					}
				})
		},
		SLAfocus(){											//SLA接口
			var s=document.getElementsByClassName("el-select-dropdown__list")[1];
			s.style.width="600px"
			axios({
				method:'GET',
				url:'/slaType'
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					this.slaOptions=res.data.data
				}
			}).catch(err=>{
					this.open7(err.response.data.msg);
					if(err.response.data.code==20001){
						window.location.href=err.response.data.url
					}
				})
		},
		contractTypeBlur(){									//合同类别change事件
			console.log(this.contract.type)
			if(this.contract.type==60){
				this.disabled1=true;
			}else{
				this.disabled1=false
			}
		},
		submitContract(){									//合同上传
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
				url:'/contract',
				data:{
					contractNumber:this.contract.number,
					contractName:this.contract.name,
					firstParty:this.contract.left,
					secondParty:this.contract.right,
					effectiveTime:this.contract.beginTime,
					ineffectiveTime:this.contract.offTime,
					slaTypeId:this.contract.SLA,
					contractType:this.contract.type,
					customerId:this.customerId,
					fileIds:this.finalFile,
					delFileIds:this.removeFile
				}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					this.beginPact();
				}
			}).catch(err=>{
					this.open7(err.response.data.msg);
					if(err.response.data.code==20001){
						window.location.href=err.response.data.url
					}
			})
		},
		contractDetails(id){
			console.log(id)
			axios({
				method:'GET',
				url:'/contractOne',
				params:{contractUuid:id}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					this.dialogVisible6=true;
					res.data.data.effectiveTime=formatDate(res.data.data.effectiveTime);
					res.data.data.ineffectiveTime=formatDate(res.data.data.ineffectiveTime);
						this.contractDetailsOptions=res.data.data;
					console.log(this.contractDetailsOptions,1)
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
		},
		contractJh(id){
			axios({
				method:'POST',
				url:'/contract/'+id,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				params:{customerUuid:this.receveId}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					window.location.reload();
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
		},
		//修改客户档案
		changeCustomer(){
			axios({
				method:'get',
				url:'/customer/',
				params:{customerUuid:this.receveId}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect
				}else{
					console.log(res.data.data,4)
					this.formChange.name=res.data.data.name;
					this.formChange.label=res.data.data.label;
					this.formChange.province=res.data.data.province;
					this.formChange.city=res.data.data.city;
					this.formChange.county=res.data.data.county;
					this.formChange.address=res.data.data.address;
					this.formChange.contact=res.data.data.contact;
					this.formChange.phone=res.data.data.phone;
					this.formChange.email=res.data.data.email;
					this.formChange.contactId=res.data.data.contactId;
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
		},
		//修改客户档案联系人接口
		changeContact(){
			axios({
				method:'GET',
				url:'/contacts',
				params:{customerUuid:this.receveId}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect;
				}else{
					this.changeContactOptions[0].options=res.data.data;
					console.log(res.data.data)
					
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
				if(err.response.data.code==20001){
					window.location.href=err.response.data.url
				}
			})
		},
		contact__pe(){
			console.log(this.formChange.contactId)

			var contactId=this.formChange.contactId;
			for(var i=0;i<this.changeContactOptions[0].options.length;i++){
				if(contactId==this.changeContactOptions[0].options[i].id){
					this.formChange.phone=this.changeContactOptions[0].options[i].phone;
					this.formChange.email=this.changeContactOptions[0].options[i].email;
				}
			}
		},
		//点击切换用户状态
			change_title(index){
				this.formChange.label=index
			},
		//编辑客户提交
		submitChangeCustomer(){
			axios({
				method:'POST',
				url:'/customer/'+this.receveId,
				data:{
					name:this.formChange.name,
					contactId:this.formChange.contactId,
					phone:this.formChange.phone,
					email:this.formChange.email,
					label:this.formChange.label,
					province:this.formChange.province,
					city:this.formChange.city,
					county:this.formChange.county,
					address:this.formChange.address
				}
			}).then(res=>{
				if(res.data.code==300){
					window.location.href=res.data.redirect;
				}else{
					this.beginDetails();
				}
			}).catch(err=>{
				this.open7(err.response.data.msg);
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
	}
})