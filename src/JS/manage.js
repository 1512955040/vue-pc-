require("../CSS/normalize.css")
require("../CSS/manage.css");

var app=new	Vue({
	el:"#body",
	data:{
		rules:{
			categoryValue:[{ required: true, message: '请选择产品类别', trigger: 'change' }],
			productValue:[{ required: true, message: '请选择产品', trigger: 'change' }],
			serialValue:[{required: true, message: '请输入产品序列号', trigger: 'blur' }],
			textarea:[{required: true, message: '请输入处理信息', trigger: 'blur' }],

		},
		activeName: 'second',
		bckArr:[
			{label:'处理过程'},
			{label:'回单信息'},
			// {label:'客户评价'}
			],
		isActive:0,
		//主菜单的4个按钮
		titleIndex:[
			{'index':'0'},
			{'index':'1'},
			{'index':'2'},
			{'index':'3'}
		],
		information_options:'',//个人信息
		changeTitles:0,
		options1:[],
        value: '',
		value3:'',
		rate:'123',
		tablesOneClick:true,
		tablesTwoClick:false,
		tablesThrClick:false,
		workCon:'待关闭',      //工单状态
		tableData:[
			
		],
		rateText:"一般",
		dialogVisible: false,//工单派工弹出框,
		dialogVisible1:false,//填写回单弹出,,
		receveId:'',//浏览器接参
		orderNumber:'',//工单编号
		customerName:'',//客户名称
		productName:'',//产品名称
		productModel:'',//产品型号
		serviceRequest:'',//服务请求
		slaTypeName:'',//SLA类型
		priorityStr:'',//优先级
		emergencyStr:'',//紧急程度
		contactName:'',//联系人
		customerPhone:'',//联系电话
		channel:'',//渠道
		orderStatusStr:'',	//按钮样式
		departmentName:'',	//委派部门
		orderStatus:'',//
		orderType:'',//工单类型
		createTime:'',//创建时间
		productType:'',//产品类别
		operation:[],//操作详情
		isSheet:false,//工单派工显示与否
		isForm:false,//填写回单显示与否
		isReview:false,//工单审核显示与否
		isClose:false,//工单关闭显示与否
		closeOk:false,//工单已关闭
		backBtn1:false,//
		backBtn2:false,//
		options2:[{
				value:'选项1',
				label:'选择产品类别'
		}
		],//填写回单产品类别
		options4:[ 				//填写回单产品选择框
			{
				value:'选项1',
				label:'选择产品'
			}
		],
		options5:[				//填写回单在保状态选择框
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
		options6:[				//填写回单故障类别选择框
			{
				value:'选项1',
				label:'请选择故障类别'
			}
		],
		ruleForm:{
			categoryValue:'',
			productValue:'',
			serialValue:'',
			stateValue:'',
			faultValue:'',
			textarea:'',
			textarea1:'',
		},
		textarea:'',//处理信息value
		textarea1:'',//备注value
		fileList:[{name:'123...',url:''}],//长传的文件列表,
		options3:[],//工单派工select选择框
		value7:'',//工单派工select选择框value
		sheetNum:'',//工单派工客户编号
		sheetName:'',//工单派工客户名称
		empsId:'',//工单派工人员id
		categoryValue:'',//产品类别选择框value
		productValue:'',//产品选择框value
		stateValue:'',//在保状态value
		productTypeId:'',//产品类别ID
		serialValue:'',//产品序列号value	
		faultValue:'',//故障类别value
		outerVisible: false,//审核通过外层
        innerVisible: false,//审核通过内层
		centerDialogVisible: false,//审核通过居中
		checkResult:'',//审核通过状态码
		fileIds:[],//文件上传数组名
		dispathId:'',//点击填写回单的状态码
		dialogImageUrl: '',	//图片上传url
        dialogVisible3: false ,//放大
		dialogVisibleBranch:false,//修改部门弹出框
		removeFile:[],//文件移除数组名
		finalFile:[],//最终上传文件数组名
		dispatchId:'',//点击审核状态码
		evaluateName:'',//评价客户姓名
		evaluateTime:'',//评价时间
		evaluateDsr:'',//评价详情
		valueBah:'',
		branchOptions:[],
		textareareplace:'',//重新派工原因
		dialogVisibleReplace:false,
		Uuid:'',			//点击重新派工接受状态吗
	},
	created:function(){
		this.receving();
	},
	mounted:function(){
	

	},
	watch:{
		value3:function(){ //客户评价
			if(this.value3==1){
				this.rateText="极差"
			}else if(this.value3==2){
				this.rateText="失望"
			}else if(this.value3==3){
				this.rateText="一般"
			}else if(this.value3==4){
				this.rateText="满意"
			}else{
				this.rateText="惊喜"
			}
		}
	},
	methods:{
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
		backClick(){
			window.history.back(-1); 
		},
		handleClick:function(tab,event){
			console.log(tab,event);
			
		},
		bckClick:function(n){
			this.isActive=n;
			if(this.isActive==0){
				this.tablesOneClick=true;
				this.tablesTwoClick=false;
				this.tablesThrClick=false;
			}else if(this.isActive==1){
				this.tablesTwoClick=true;
				this.tablesOneClick=false;
				this.tablesThrClick=false;
			}else if(this.isActive==2){
				this.tablesThrClick=true;
				this.tablesOneClick=false;
				this.tablesTwoClick=false;
			}
		},
		reviewed:function(){
					
		},
		receving:function(){//获取参数
			this.receveId=getUrlParms("id");
			console.log(this.receveId)
			axios({						//左边客户详情
				methods:'GET',
				url:'/order',
				params:{id:this.receveId}
			}).then(res=>{
				var data=res.data.data;
				console.log(data)
				if(res.data.code=="200"){
					this.orderNumber=data.orderNumber;
					this.customerName=data.customerName;
					this.productName=data.productName;
					this.productModel=data.productModel;
					this.serviceRequest=data.serviceRequest;
					this.slaTypeName=data.slaTypeName;
					this.priorityStr=data.priorityStr;
					this.emergencyStr=data.emergencyStr;
					this.contactName=data.contactName;
					this.customerPhone=data.customerPhone;
					this.channel=data.channel;
					this.orderType=data.orderType;
					this.orderStatus=data.orderStatus;
					this.orderStatusStr=data.orderStatusStr;
					this.createTime=formatDateTime(data.createTime);
					this.productType=data.productType;
					this.productTypeId=data.productTypeId;
					this.departmentName=data.departmentName;
					this.options2.push({
						value:'选项2',
						label:data.productType
					});
					this.options4.push({
						value:"选项2",
						label:data.productName
					});
					this.ruleForm.productValue=data.productName;
					this.ruleForm.categoryValue=data.productType;
					this.sheetNum=data.orderNumber;
					this.sheetName=data.customerName;
				}				
			});
			axios({					//客户详情请求
				methods:'GET',
				url:'/orderLog',
				params:{orderId:this.receveId}
			}).then(res=>{
				var data=res.data.data;
				console.log(data)
				if(res.data.code=='200'){
					if(data[0].nextOperation=="16"){
						this.isSheet=true;
						this.isForm=false;
						this.isReview=false;
						this.isClose=false;
						this.closeOk=false;
						this.backBtn1=true;
						this.backBtn2=false;
					}else if(data[0].nextOperation=="17"){
						this.isSheet=false;
						this.isForm=true;
						this.isReview=false;
						this.isClose=false;
						this.closeOk=false;
						this.backBtn1=false;
						this.backBtn2=true;
					}else if(data[0].nextOperation=="18"){
						this.isSheet=false;
						this.isForm=false;
						this.isReview=true;
						this.isClose=false;
						this.closeOk=false;
						this.backBtn1=false;
						this.backBtn2=false;
					}else if(data[0].nextOperation=="19"){
						this.isSheet=false;
						this.isForm=false;
						this.isReview=false;
						this.isClose=true;
						this.closeOk=false;
						this.backBtn1=false;
						this.backBtn2=false;
					}else if(data[0].nextOperation=="20"){
						this.isSheet=false;
						this.isForm=false;
						this.isReview=false;
						this.isClose=false;
						this.closeOk=true;
						this.backBtn1=false;
						this.backBtn2=false;
					}
					for(var i=0;i<data.length;i++){
					var dataArr={};
					dataArr={
						departmentName:data[i].departmentName,
						operationStr:data[i].operationStr,
						operationTime:formatDateTime(data[i].operationTime),
						describes:data[i].describes,
						employeeName:data[i].employeeName
					};
					this.operation.push(dataArr);
					console.log(this.operation)
					}
				}
			});
			axios({											//客户评价
				methods:'GET',
				url:'/evaluation',
				params:{orderId:this.receveId}
			}).then(res=>{
				var data=res.data.data;
				if(res.data.code=='200'){
					this.evaluateName=data.customerName;
					if(data.result==7){
						this.value3=5
					}else if(data.result==8){
						this.value3=4
					}else if(data.result==9){
						this.value3=3
					}else if(data.result==10){
						this.value3=2
					}else if(data.result==11){
						this.value3=1
					}
					this.evaluateTime=formatDateTime(data.evaluationTime);
					this.evaluateDsr=data.describes;
				};
				
			});
			axios({                                             //回单信息
				methods:'GET',
				url:'/report',
				params:{orderId:this.receveId}
			}).then(res=>{
				if(res.data.code=="200"){
					var data=res.data.data[0];
					this.tableData=[
						{firstRow:'产品及型号',secRow:data.productName+"("+this.productModel+")"},
						{firstRow:'产品序列号',secRow:data.productUuid},
						{firstRow:'故障类型',secRow:data.faultType},
						{firstRow:'处理人员',secRow:data.employeeName},
						{firstRow:'处理时间',secRow:formatDate(data.reportTime)},
						{firstRow:'处理信息',secRow:data.disposeDescribes},
					];
					console.log(this.tableData)
				}
			});
			this.information();
		},
		information(){													//个人信息请求
			axios({
				method:'GET',
				url:'/details'
			}).then(res=>{
					this.information_options=res.data.data;
					console.log(this.information_options)
			})
		},
		sheetClick:function(){ 										//工单派工点击请求
			axios({
				methods:'GET',
				url:'/findEmployees',
				params:{orderUuid:this.receveId}
			}).then(res=>{
				console.log(res.data)
				var data=res.data.data;
				if(res.data.code=='200'){
					this.options3=data;
					console.log(this.options3)
				}
			})
		},
		sheetOkClick:function(){									//工单派工点击确定请求,
			var value7=this.value7;
			var forI='';var forJ='';
			// console.log(this.options3[0].emps[0].name)
			for(var i=0;i<this.options3.length;i++){
				// console.log(this.options3[i].emps);
				for(var j=0;j<this.options3[i].emps.length;j++){
					if(this.options3[i].emps[j].name==value7){
						forI=i;
						forJ=j;
					}
				}
			};
			this.empsId=this.options3[forI].emps[forJ].id;
			// console.log(this.empsId)	
			axios({
				method:"post",
				url:'/dispatch/'+this.receveId,
				headers:{'Content-Type':'application/json; charset=UTF-8'},
				data:{orderNumber:this.orderNumber,customerName:this.customerName,employeeId:this.empsId,employeeName:this.value7},
			}).then(res=>{
				if(res.data.code=='200'){
					window.location.reload();
				}
			})
		},
// 		formClick:function(){
// 			axios({
// 				method:'POST',
// 				url:'/report/'+this.receveId,
// 				headers:{'Content-Type':'multipart/form-data; charset=UTF-8'},
// 			}).then(res=>{
// 				console.log(res.data)
// 			})
// 		}
		faultClick:function(){         //故障类别交互
			axios({
				method:'GET',
				url:'/faultTypes',
				params:{productTypeId:this.productTypeId}
			}).then(res=>{
				var data=res.data.data;
				console.log(data,1);
				if(res.data.code=='200'){
					this.options6=data;
					
				}
			})
		},
		reviewOk:function(){
			this.checkResult=13;
			axios({
				method:'POST',
				url:'/check/'+this.receveId,
				headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
				params:{ckeckResult:this.checkResult,dispatchId:this.dispatchId}
			}).then(res=>{
				if(res.data.code=='200'){
					window.location.reload();
				}
			})
		},
		reviewFault:function(){  						//审核不通过交互
			this.checkResult=14;
			axios({
				method:'POST',
				url:'/check/'+this.receveId,
				headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
				params:{ckeckResult:this.checkResult,dispatchId:this.dispatchId}
			}).then(res=>{
				if(res.data.code=='200'){
						window.location.reload();
				}
			})
		},
		closeWork:function(){			//关闭工单按钮操作
			axios({
				method:'POST',
				url:'/close/'+this.receveId,
				data:{orderId:this.receveId}
			}).then(res=>{
				console.log(res.data);
				var btn=document.getElementsByClassName("closeBtn");
				console.log(btn)
				if(res.data.code=='200'){
					window.location.reload();
				}
			})
		},
		formClick:function(){                  //点击填写回单时的交互
			axios({
				method:'GET',
				url:'/accountPermission',
				params:{orderUuid:this.receveId}
			}).then(res=>{
				if(res.data.code=='200'){
					this.dialogVisible1 = true;
					console.log(res.data.data)
					this.dispathId=res.data.data;
				}else{
					this.dialogVisible1=false;
					console.log(res.data.data.msg)
				}
			}).catch(err=>{
				this.open7(err.response.data.msg)
			})
		},
		uploadFileSuccess:function(response, file, fileList){  				//文件上传成功时的钩子
			let fileItems=response.data;
			console.log(fileItems)
			this.fileIds.push(fileItems)
			console.log(this.fileIds)
		},
// 		beforeUploadFile:function(file){									//文件上传之前的钩子
// 			const isSize = file.size / 1024 / 1024 < 10;
// 			if(!isSize){
// 				this.$message({  
//                         message: '上传文件大小不能超过 10MB!',  
//                         type: 'warning'  
//                     });  
// 			}
// 		},
		isFormOk:function(formName){  		//填写回单提交交互
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
			console.log(this.finalFile)
			axios({
				method:'POST',
				url:'/report/'+this.receveId,
				data:{
					dispathUuid:this.dispathId,
					productType:this.ruleForm.categoryValue,
					productName:this.ruleForm.productValue,
					warrantyStatus:this.ruleForm.stateValue,
					disposeDescribes:this.ruleForm.textarea,
					faultType:this.ruleForm.faultValue,
					productUuid:this.ruleForm.serialValue,
					fileIds:this.finalFile,
					describes:this.ruleForm.textarea1
				}
			}).then(res=>{
				dialogVisible1 = false;
				console.log(res.data)
				window.location.reload();
			})
			}
			})
		},
		handleRemove(file,response,fileList) {     					//文件上传移除操作
			this.removeFile.push(file.response.data)
			console.log(this.removeFile)
		},
		handlePictureCardPreview(file) {     						//文件上传点击放大图片操作
			this.dialogImageUrl = file.url;
			this.dialogVisible3 = true;
		},
		isReviewOk:function(){										//点击工单审核按钮操作
			axios({
				method:'GET',
				url:'/checkPermission',
				params:{orderId:this.receveId}
			}).then(res=>{
				if(res.data.code=='200'){
					this.outerVisible=true;
					this.dispatchId=res.data.data;
					console.log(this.dispatchId)
				}
			}).catch(err=>{
				this.open7(err.response.data.msg)
			})
		},
		changeBranch(){												//点击修改部门请求
			axios({
				method:'GET',
				url:'/checkChangeOrderPermission'
			}).then(res=>{
				if(res.data.code=="200"){
					this.dialogVisibleBranch=true;
				}
			}).catch(err=>{
				this.open7(err.response.data.msg)
			})
		},
		branchFoucs(){											//点击修改部门选择框
			axios({
				method:'GET',
				url:'/notEmptyDepartment'
			}).then(res=>{
				console.log(res.data)
				if(res.data.code=="200"){
					this.branchOptions=res.data.data;
				}
			}).catch(err=>{
				this.open7(err.response.data.msg)
			})
		},
		branchSubmit(){
			var name="";
			for(var i=0;i<this.branchOptions.length;i++){
				if(this.valueBah==this.branchOptions[i].organizeId){
					name=this.branchOptions[i].name
				}
			}
			console.log(this.valueBah,name)
			axios({
				method:'POST',
				url:'/changeOrder/'+this.receveId,
				params:{deptId:this.valueBah,deptName:name},
				headers:{
				'Content-Type':'application/x-www-form-urlencoded'
				}
			}).then(res=>{
				if(res.data.code=="200"){
					window.location.reload();
				}
			}).catch(err=>{
				this.open7(err.response.data.msg)
			})
		},
		replace(){									//重新派工按钮请求
			axios({
				method:'GET',
				url:'/accountPermission',
				params:{
					orderUuid:this.receveId
				}
			}).then(res=>{
				console.log(res.data)
				if(res.data.code=="200"){
					this.Uuid=res.data.data;
					this.dialogVisibleReplace=true
				}
			}).catch(err=>{
				this.open7(err.response.data.msg)
			})
		},
		replaceClick(){
			axios({
				method:'POST',
				url:'/backOrder/'+this.receveId,
				params:{
					dispatchUuid:this.Uuid,
					reason:this.textareareplace
				}
			}).then(res=>{
				if(res.data.code=="200"){
					window.location.reload();
				}
			}).catch(err=>{
				this.open7(err.response.data.msg)
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

