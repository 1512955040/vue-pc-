require("../CSS/normalize.css")
require("../CSS/customerMangementFile.css")
var num=1;
var page=new Vue({
			el:"#pagev",
			data(){
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
				//联系电话失去焦点
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
					changeTitles:1,
					//工单管理列表
					manageList:[],
					productfire:'新建客户产品档案',
					totals0:0,//档案总条数
					label:'',//客户标签汉字
					parentsId:'',//省份城市区县的id
					//点击的竖行菜单的哪一个
					workerOlderNum:'',
					//新建用户弹窗默认false
					dialogVisible1:false,
					//新建档案弹窗默认false
					dialogVisible2:false,
					//档案详情弹窗默认false
					dialogVisible3:false,
					//删除复选框
					checked:false,
					//客户名称
					zIndex:false,
					holder:"客户名称(必填)",
					//联系人
					zIndex2:false,
					holder2:"联系人(必填)",
					//手机号
					zIndex3:false,
      				holder3:"手机号(必填)",
      				//邮箱
      				zIndex4:false,
      				holder4:'客户邮箱',
      				//序列号
      				zIndex5:false,
      				holder5:'序列号',
      				//购买价格
      				insIf6:false,
      				holder6:'请输入购买价格',
      				//客户标签
					customer_Label:[
						{"value":"普通客户","id":4},
						{"value":"VIP客户","id":3}
					],
					//省份
					show:false,
					provinces:'',
					info:[	
          				{ "value": "北京"},
					],
					//城市
					shows:false,
					citys:'',
					info0:[
						{ "value": "上海"},
          				
					],
					//区县
					showss:false,
					v1:'',
					info1:[
						{ "value": "纳贡"},
					],
					//点击筛选
					showIf:false,
					//新建用户表单数组
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
			        },
			        //新建档案
			        numberValidateForm2:{
			        	customerName:'',
			        	typeId:'',//产品类别id
			        	typeName:'',//产品类别汉字
			        	productId:'',//产品id
			        	name:'',//产品汉字
			        	customerId:'',//客户id
			        	customerUuid:'',//客户Uuid
			        	productUuid:'',//序列号
			        	warrantyPeriod:'',//保修期限id
			        	producedDate:'',//生产日期
			        	buyDate:'',//购买时间
			        	buyPrice:'',//价格
			        	endWarrantyEnd:'',//保修截止日期
			        	describes:''
			        },
			        //当新建档案客户焦点
			        shown:false,
			        //客户数组
			        info5:[],
			        valueLength:'',//客户数组长度
			        detail_obj:{},//点击详情
			        //产品类别
			        options3:[{
        				label: '请选择产品类别',
        				options: []
        			}],
        			//产品
        			options4:[{
        				label: '请选择产品',
        				options: []
        			}],
			        //新建用户限制条件
			        rules3: {
						name:[
							{validator: validatePass}
						],
						contact:[
							{validator:validatePass3}
						],
						phone:[
							{validator: validatePass4}
						],
						email:[
							{validator: validatePass5}
						]
					},
					//新建档案限制条件
					rules4:{
						
					},
					//筛选客户标签
					options_Num1: [
					 {
			          value: 4,
			          label: '普通会员'
			        },{
			          value: 3,
			          label: '高级会员'
			        }],
			        options_Num2: [],//省
			        options_Num3:[],//城市
			        options_Num4:[],//县城
			        proviceId:0,//省id
			        citysId:'',//城市id
			        countysId:'',//区县id
			        options_Num5:[],//選擇產品
			        options_Num6:[{"value":38,"name":"在保"},{"value":39,"name":"未在保"}],//在保状态
			        warrantyStatus:'',//在保状态id
			        //保修期限
			        options_Num7:[
			        	{"id":6,"name":"半年"},
			        	{"id":12,"name":"一年"},
			        	{"id":24,"name":"两年"},
			        	{"id":36,"name":"三年"},
			        	{"id":60,"name":"五年"},
			        	{"id":120,"name":"十年"},
			        	{"id":-1,"name":"终生"},
			        ],
			        warrantyPeriod:'',//保修期限id
			        visible2: false,
		 			loading:false,
		 			Detail_Deleting:'删 除',
		 			disabled:true,//是否删除按钮可点击
			        form1:{
			        	pageNum:1,//产品档案的页数
			        	name:'',//'1-3'產品	
			        	warrantyStatus:'',//在保状态id
			        	warrantyPeriod:'',//保修期限id
			        	producedDate:'',//生产日期
			        	endProducedDate:'',//生产日期结束
			        	buyDate:'',//购买日期
			        	endBuyDate:'',//购买结束日期
			        	warrantyEnd:'',//保修开始日期
			        	endWarrantyEnd:'',//保修结束日期
			        	query:''
			        }
				}
			},
			created(){
				//工单详情
				this.Customer_details()
				
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
					}
					else if(index===3){
						window.location.href="systemSetub.html"
					}
				},
				
				//客户详情
				Customer_details(){
						var _url,data
						_url="/buyHistorys"
						data=this.form1
						myPostByJson(_url,data).then((res)=>{
							console.log(res.data.data)
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.manageList=res.data.data
								if(res.data.data!=null && res.data.data.length>0){
									this.totals0=res.data.data[0].total
								}else{
									this.totals0=0
								}
								for(var i=0;i<res.data.data.length;i++){
									res.data.data[i].buyDate=formatDateTime(res.data.data[i].buyDate).substring(0,10)
									res.data.data[i].warrantyEnd=formatDateTime(res.data.data[i].warrantyEnd).substring(0,10)
								}
							}
						}).catch(err=>{
							this.open7(err.response.data.msg)
							if(err.response.data.code==20001){
								window.location.href=err.response.data.url
							}
						})
				},
				//档案点击页码
				handleCurrentChange0(val){
					this.Customer_details()
				},
				
/////////////////////////////////////////筛选省市县//////////////////////////////////////////////
				//筛选省,市，县封装
				check_pro(num){
					var _url="/districts";
					var parentId={parentId:this.parentsId}
					myGetByJson(_url,parentId).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							console.log(res.data.data)
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
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
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
					this.parentsId=val
					this.province=val
				},
				//点击城市
				check_citys0(){
					this.numberValidateForm1.county=''
					if(this.numberValidateForm1.province==''){
						this.parentsId=''
					}else if(this.numberValidateForm1.province!==''){
						this.parentsId=this.province
					}
					this.check_pro(2)
				},
				//筛选选择城市
				check_unit0(val){
					this.parentsId=val
					this.citysId=val
				},
				//点击县城
				check_county0(){
					if(this.numberValidateForm1.province==''){
						this.parentsId=''
					}else if(this.numberValidateForm1.city=='' &&  this.numberValidateForm1.province!==''){
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
				},

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
				//客户名称焦点
				validatePass0(){
					this.zIndex=true;this.holder=""
				},
				//联系人
				validatePass3(){
					this.zIndex2=true;this.holder2=""
				},
				//手机号
				validatePass4(){
					this.zIndex3=true;this.holder3=""
				},
				//客户邮箱
				validatePass5(){
					this.zIndex4=true;this.holder4=""
				},
				//序列号
				validatePass6(){
					this.zIndex5=true;this.holder5=''
				},
				inps_num(){
					this.zIndex5=false;this.holder5='序列号'
				},
				//请输入购买价格
				validatePass7(){
					this.zIndex6=true;this.holder6=''
				},
				inps_price(){
					this.zIndex6=false;this.holder6='请输入购买价格'
				},
				//点击切换用户状态
			    change_title(index){
			    	this.numberValidateForm1.label=index
			    },
				//点击新建按钮
				createNewCustomer(){
					this.productfire="新建客户产品档案"
					this.dialogVisible2=true
					setTimeout(()=>{
						this.createNewMans()
						this.resetForm('numberValidateForm2')
						this.numberValidateForm2.customerName=""
					})
				},
/******************************************************************产品档案新建******************************************************/				
				//当新建档案客户获得焦点的时候
				user_Search(){
					var _url="/customers";
					var params={query:''}
					myGetByJson(_url,params).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.info5=res.data.data
//							console.log(this.info5)
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
				//新建点击查询
				btn_Searchbtn(e){
					e.preventDefault()
					var _url="/customers";
					var params={query:this.numberValidateForm2.customerName}
					myGetByJson(_url,params).then(res=>{
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
				//点击选择客户
				checkCustomer(index,id,Uuid){
					this.resetForm('numberValidateForm2')
					this.shown=false
					for(var i=0;i<this.datasn.length;i++){
						if(id===this.datasn[i].id){
							this.numberValidateForm2.customerName=this.datasn[i].name
						}
					}
					this.numberValidateForm2.customerId=id //客户id
					this.numberValidateForm2.customerUuid=Uuid //客户Uuid
				},
				//下拉框点击左键失去焦点
			    createNewMans(){
			    	let _that=this;
					document.addEventListener('click',function(e){
						if(!!_that.$refs.userInfon.contains(e.target)) return;
						_that.shown=false
					})
			    },
				//点击查询产品类别
				group_produce(){
					var _url="/productTypes";
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
//				//点击选择产品类别
				check_Produce(keys){
					console.log(keys)
					this.numberValidateForm2.typeId=keys
				},
				//点击查询产品
				group_products(){
					var _url="/products";
					var params={typeId:this.numberValidateForm2.typeId}
					myGetByJson(_url,params).then(res=>{
						console.log(res.data.data)
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
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
					console.log(keys)
					this.numberValidateForm2.productId=keys
				},
				//点击选择保修期限
				check_terms(keys){
					this.numberValidateForm2.warrantyPeriod=keys
				},
				//点击档案提交表单
			   	submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
				        if (valid) {
				        	//编辑
				        	if(this.dialogVisible3){
				        		var _url="/buyHistory/"+this.detail_obj.id
				        		var data=this.numberValidateForm2
				        		myPostByJson(_url,data).then((res)=>{
									if(res.data.code==300){
										window.location.href=res.data.redirect
									}else{
										this.Customer_details()
										this.dialogVisible2=false
										this.dialogVisible3=false
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
				        		//新建
				        		var _url="/buyHistory"
				        		var data=this.numberValidateForm2
				        		myPostByJson(_url,data).then((res)=>{
									if(res.data.code==300){
										window.location.href=res.data.redirect
									}else{
										this.Customer_details()
										this.dialogVisible2=false
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
				        }else{
				            console.log('error submit!!');
				            return false;
				        }
			        });
			    },
/***************************************************************************************************************/
				//新建客户档案
			    CreateNewMan(){
			    	let _this=this;
			    	this.shown=false
			    	this.dialogVisible1=true
			    	setTimeout(()=>{
			    		this.resetForm('numberValidateForm1')
			    	})
			    },
			    //新建客户表单提交
			    submitForm0(formName) {
			        this.$refs[formName].validate((valid) => {
			        if (valid) {
			        	var _url="/customer"
			        	var data=this.numberValidateForm1
			          	myPostByJson(_url,data).then(res=>{
							if(res.data.code==300){
								window.location.href=res.data.redirect
							}else{
								this.dialogVisible1=false
								this.open6(res.data.data)
								this.Customer_details()
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
			    
				//详情点击查询
				search_CustomerName(){
					this.Customer_details()
				},
				//点击筛选按钮
				check_remove(){
					this.showIf=!this.showIf
					if(this.showIf){
						this.$refs.check_left.style.left="750px"
					}else{
						this.$refs.check_left.style.left="1096px"
					}
				},
				//篩選点击產品
				check_goods(){
					var _url="/productName";
					var params={}
					myGetByJson(_url,params).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.options_Num5=res.data.data
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
					})
				},
				//点击选择在保状态
				check_status(keys){
					this.form1.warrantyStatus=keys
				},
				//点击选择保修期限
				check_term(keys){
					this.form1.warrantyPeriod=keys
				},
				//档案详情接口
				detail_terms(index){
					var _url="/buyHistory";
					var params={buyHisId:index}
					myGetByJson(_url,params).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							console.log(res.data.data)
							this.dialogVisible3=true
							res.data.data.producedDate=formatDateTime(res.data.data.producedDate).substring(0,10)
							res.data.data.buyDate=formatDateTime(res.data.data.buyDate).substring(0,10)
							res.data.data.warrantyEnd=formatDateTime(res.data.data.warrantyEnd).substring(0,10)
							this.detail_obj=res.data.data
						}
					})
					.catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
				},
				//点击查看本条档案详情
				Detail(index){
					this.detail_terms(index)
				},
				//档案详情点击编辑 
				Detail_Editor(index){
					this.productfire="客户产品档案编辑"
					this.detail_terms(index)
					this.dialogVisible2=true
					this.numberValidateForm2=this.detail_obj
					this.numberValidateForm2.typeName=this.detail_obj.typeName
					this.numberValidateForm2.typeId=this.detail_obj.typeId
					this.numberValidateForm2.name=this.detail_obj.name
					this.numberValidateForm2.productId=this.detail_obj.productId
				},
				//删除详情
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
		 		Delete_Detail(index){
		 			var _url="/delBuyHistory";
					var params={buyHisId:index}
					myGetByJson(_url,params).then(res=>{
						this.loading=!this.loading
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							console.log(res.data.data)
							this.loading=false
							this.Detail_Deleting='删除成功'
							this.visible2=false
							this.dialogVisible3=false
							this.open6(res.data.data)
							this.Customer_details()
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
    		computed:{
				datasn:function(){
					if(this.numberValidateForm2.customerName===''){
						this.valueLength=this.info5.length
						return this.info5
					}else if(this.numberValidateForm2.customerName!==''){
						var npc=this.info5.filter((blogaaa)=>{
  							return blogaaa.name.match(this.numberValidateForm2.customerName) || blogaaa.phone.match(this.numberValidateForm2.customerName)
  						})
						this.valueLength=npc.length
						return npc
					}
				},
			},
			watch:{
		 		visible2(a,b){
		 			if(a===true && this.loading===true){
		 				this.loading=true
		 			}
		 			else if(a===false && this.loading===true){
		 				this.loading=false
		 			}
		 		},
		 		
		 	}
		 	
		})
