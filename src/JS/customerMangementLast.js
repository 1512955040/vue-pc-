require("../CSS/normalize.css")
require("../CSS/customerMangementLast.css")
var num=1;
var page=new Vue({
			el:"#page",
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
					if(value ==='') {
						callback(new Error('联系人不能为空'));
						this.zIndex2=false
						this.holder2='联系人(必填)'
					}else{
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
					dialogVisible2:false,
					//工单管理列表
					manageList:[],
					totals:0,//客户总条数
					label:'',//客户标签汉字
					parentsId:'',//省份城市区县的id
					//点击的竖行菜单的哪一个
					workerOlderNum:'',
      				province:'',
      				//客户标签
					customer_Label:[
						{"value":"普通客户","id":4},
						{"value":"VIP客户","id":3}
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
			        	describes:'',
			       },
			        numberValidateForm2:{
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
			        //产品类别
			        options3:[{
        				label: '请选择产品类别',
        				options: []
        			}],
        			//产品
        			options4:[{
        				label: '请选择产品',
        				options: [{name:"啦啦啦",id:1},{name:"水屌",id:2}]
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
					form: { 
					  pageNum:1, //分页页码
					  query:'',//查询input输入框
			          label: '',//客户标签id
			          province:'',//省份
			          city:'',//城市
			          county:'',//区县
			          createTime:'',//创建时间
			          endCreateTime:'',//创建结束时间
			          startTime:'',//服务开始时间
			          endTime:''//服务结束时间			
			       },
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
					_url="/serviceLog"
					data = this.form
					var a=Number(getUrlParms("pageNum"))
					if(a!==undefined && a!==null){
						this.form.pageNum=a
					}
					myPostByJson(_url,data).then((res)=>{
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
								res.data.data[i].startTime=formatDateTime(res.data.data[i].startTime)
							}
						}
					}).catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})
				},
				//点击客户详情跳转页面
				Worksheet(index){
					window.location.href="customerManagementDetails.html?id="+index
				},
				//点击sla
				editor_list(index,id){
					this.dialogVisible2=true;
					var	_url="/slaTypeInfo"
			        var	data={
			        	slaTypeId:id
			        }
			        myGetByJson(_url,data).then(res=>{
						if(res.data.code==300){
							window.location.href=res.data.redirect
						}else{
							this.numberValidateForm2=res.data.data
						}
					})
				    .catch(err=>{
						this.open7(err.response.data.msg)
						if(err.response.data.code==20001){
							window.location.href=err.response.data.url
						}
					})     	
				},
				//客户点击页码
				handleCurrentChange(val){
					this.Customer_details()
					this.form.pageNum=val
					var stateObject={};
					var title="";
					var newUrl="customerMangementLast.html?pageNum="+val;
					history.pushState(stateObject,title,newUrl);
				},
				//刷选选择客户标签
				customer_tag(keys){
					this.form.label=keys
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
							console.log(this.parentId)
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
					for(var i=0;i<this.options_Num2.length;i++){
						if(val==this.options_Num2[i].id){
							this.form.province=this.options_Num2[i].name
						}
					}
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
					for(var i=0;i<this.options_Num3.length;i++){
						if(val==this.options_Num3[i].id){
							this.form.city=this.options_Num3[i].name
						}
					}
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
//					this.countysId=val
					for(var i=0;i<this.options_Num4.length;i++){
						if(val==this.options_Num4[i].id){
							this.form.county=this.options_Num4[i].name
						}
					}
				},
				//点击筛选
				search_filter(){
					this.Customer_details()
				},
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

				//点击左键省市县失去焦点
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
				//点击切换用户状态
			    change_title(index){
			    	this.numberValidateForm1.label=index
			    },
/***************************************************************************************************************/
			    
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
				//点击切换不同的工单列表
				handleSelect(index,indexPath){
//						this.In_Out=false
						setTimeout(()=>{
							LeftHeight()
							this.form.query=""
							this.Customer_details()
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
