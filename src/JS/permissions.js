require("../CSS/normalize.css")
require("../CSS/permissions.css");
var app=new Vue({
	el:'#body',
	data(){
		return{
				titleIndex:[
					{'index':'0'},
					{'index':'1'},
					{'index':'2'},
					{'index':'3'}
				],
				bckArr:[
					// {label:'空间角色'},
					// {label:'网点角色'}
				],
				
				rules2:{
					name:[
						{ required: true, message: '请输入角色名称',trigger:'blur'}
					],
					desc:[
						{ required: true, message: '请输入描述',trigger:'blur'}
					]
				},
				isActive:0,
				changeTitles:3,
				tablesOneClick:true,
				tablesTwoClick:false,
				roleOptions:[],				//请求所有信息
				dialogVisible:false,		//编辑弹出框
				dialogVisible1:false,		//查看弹出框
				dialogVisible2:false,		//
				Detail_Deleting:'删 除',				//删除按钮内容
				disabled:true,						//删除按钮disabeled
				loading:false,						//loading加载状态
				revise:{
					input:'',
					textarea:'',
				},
				permissionMenu:[],			//
				see:{
					input:'系统管理员',
					textarea:'系统默认角色，拥有系统所有权限，该角色不能被删除或修改。'
				},
				checked:'',
				checkboxList:[],
				disabled1:false,
				form:{
					name:'',
					desc:'',
					type:[]
				},
				newForm:{
					name:'',
					desc:'',
					type1:[],
					type2:[],
					type3:[],
					type4:[]
				},
				checked1:false,
				checked2:false,
				checked3:false,
				checked4:false,
				checked5:false,
				checked6:false,
				checked7:false,
				checked8:false,
				seeShow:false,
				reviseShow:false,
				submitShow:false,
				newPermissions1:[],				//新建角色接口请求数据
				newPermissions2:[],				//新建角色接口请求数据
				newPermissions3:[],				//新建角色接口请求数据
				newPermissions4:[],				//新建角色接口请求数据
				newPermissions5:[],				//新建角色接口请求数据
				newPermissions6:[],				//新建角色接口请求数据
				newPermissions7:[],				//新建角色接口请求数据
				newPermissions8:[],				//新建角色接口请求数据
				finnalCommit:[],
				finnalCommit1:[],
				reviseForm:{
					name:'',
					desc:'',
					type1:[],
					type2:[],
					type3:[],
					type4:[]
				},
				reviseFormId:'',				//id
				pageNum:1,						//页码
				totals:0,//客户总条数
				visible:[],			
			};
	},	
// 	
// 	watch:{
// 		visible(){
// 			console.log(this.visible)
// 		}
// 	},
	created(){
		this.beginPlc();
	},
	mounted(){
		setTimeout(()=>{
			this.handleHeight()
		})
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
		bckClick:function(n){
			this.isActive=n;
			if(this.isActive==0){
				this.tablesOneClick=true;
				this.tablesTwoClick=false;
			
			}else if(this.isActive==1){
				this.tablesTwoClick=true;
				this.tablesOneClick=false;
			}	
		},
		cClick(formName){
			this.$refs[formName].validate((valid)=>{
				 if (valid) {
					
					 if(this.newForm.type1.length>0){
					 	this.finnalCommit.push(this.newPermissions1.id)
					 }
					 if(this.newForm.type2.length>0){
					 	this.finnalCommit.push(this.newPermissions2.id)
					 }
					 if(this.newForm.type3.length>0){
					 	this.finnalCommit.push(this.newPermissions3.id)
					 }
					 if(this.newForm.type4.length>0){
					 	this.finnalCommit.push(this.newPermissions4.id)
					 }
					 for(var i=0;i<this.newPermissions1.children.length;i++){
					 	for(var j=0;j<this.newForm.type1.length;j++){
					 		if(this.newForm.type1[j]==this.newPermissions1.children[i].describes){
					 			this.finnalCommit.push(this.newPermissions1.children[i].id)
					 		}
					 	}
					 }
					 for(var i=0;i<this.newPermissions2.children.length;i++){
					 	for(var j=0;j<this.newForm.type2.length;j++){
					 		if(this.newForm.type2[j]==this.newPermissions2.children[i].describes){
					 			this.finnalCommit.push(this.newPermissions2.children[i].id)
					 		}
					 	}
					 }
					 for(var i=0;i<this.newPermissions3.children.length;i++){
					 	for(var j=0;j<this.newForm.type3.length;j++){
					 		if(this.newForm.type3[j]==this.newPermissions3.children[i].describes){
					 			this.finnalCommit.push(this.newPermissions3.children[i].id)
					 		}
					 	}
					 }
					 for(var i=0;i<this.newPermissions4.children.length;i++){
					 	for(var j=0;j<this.newForm.type4.length;j++){
					 		if(this.newForm.type4[j]==this.newPermissions4.children[i].describes){
					 			this.finnalCommit.push(this.newPermissions4.children[i].id)
					 		}
					 	}
					 }
					 console.log(this.finnalCommit)
					 axios({
					 	method:'POST',
					 	url:'/addRole',
					 	data:{
					 		role:this.newForm.name,
					 		describes:this.newForm.desc,
					 		permissions:this.finnalCommit
					 	}
					 }).then(res=>{
					 	console.log(res.data);
					 	if(res.data.code=="200"){
							this.dialogVisible1 = false;
							this.beginPlc();
					 	}
					 })
					 
				 }
			}).catch(err=>{
				this.open7(err.response.data.msg)
			})
			
		},
		dClick(sid){
			console.log(sid)
			if(this.reviseForm.type1.length>0){
				this.finnalCommit1.push(this.newPermissions5.id)
			}
			if(this.reviseForm.type2.length>0){
				this.finnalCommit1.push(this.newPermissions6.id)
			}
			if(this.reviseForm.type3.length>0){
				this.finnalCommit1.push(this.newPermissions7.id)
			}
			if(this.reviseForm.type4.length>0){
				this.finnalCommit1.push(this.newPermissions8.id)
			}
			for(var i=0;i<this.newPermissions5.children.length;i++){
				for(var j=0;j<this.reviseForm.type1.length;j++){
					if(this.reviseForm.type1[j]==this.newPermissions5.children[i].describes){
						this.finnalCommit1.push(this.newPermissions5.children[i].id)
					}
				}
			}
			for(var i=0;i<this.newPermissions6.children.length;i++){
				for(var j=0;j<this.reviseForm.type2.length;j++){
					if(this.reviseForm.type2[j]==this.newPermissions6.children[i].describes){
						this.finnalCommit1.push(this.newPermissions6.children[i].id)
					}
				}
			}
			for(var i=0;i<this.newPermissions7.children.length;i++){
				for(var j=0;j<this.reviseForm.type3.length;j++){
					if(this.reviseForm.type3[j]==this.newPermissions7.children[i].describes){
						this.finnalCommit1.push(this.newPermissions7.children[i].id)
					}
				}
			}
			for(var i=0;i<this.newPermissions8.children.length;i++){
				for(var j=0;j<this.reviseForm.type4.length;j++){
					if(this.reviseForm.type4[j]==this.newPermissions8.children[i].describes){
						this.finnalCommit1.push(this.newPermissions8.children[i].id)
					}
				}
			}
			axios({
				method:'POST',
				url:'/updateRole/'+sid,
				data:{
					id:this.reviseFormId,
					role:this.reviseForm.name,
					describes:this.reviseForm.desc,
					permissions:this.finnalCommit1
				}
			}).then(res=>{
				console.log(res.data)

				if(res.data.code=="200"){
					this.beginPlc();
					console.log("123")
				}
			})
		},
		delRole(id,v){
			
			axios({
				method:'GET',
				url:'/delRole',
				params:{roleId:id}
			}).then(res=>{
				console.log(res.data)
				if(res.data.code=="200"){
					this.loading=!this.loading
					setTimeout(()=>{
						this.loading=false
						this.Detail_Deleting='删除成功' 
						this.$set(this.visible, v, false);
					},1000)	
					setTimeout(()=>{
						this.beginPlc();
					},1500)
				}
				
			})
		},
		Delete_this(e){
			let checked=e.target.checked;
			if(checked) {
				this.disabled=false
			}
			else{
				this.disabled=true
			}
		},
		delClick(){
			this.disabled=true;
			this.Detail_Deleting='删除'; 

		},
		//删除详情
		Detail_Delete(v){
				this.$set(this.visible, v, false);
		},
		//客户点击页码
		handleCurrentChange(val){
			this.beginPlc()
		},
		//页面请求
		beginPlc:function(){
			this.finnalCommit1=[];
			axios({
				method:'GET',
				url:'/allRoles',
				params:{pageNum:this.pageNum}
			}).then(res=>{
				if(res.data.code=="200"){
					console.log(res.data.data)
					this.roleOptions=res.data.data;
					this.totals=res.data.data[0].total;
					res.data.data[0].visible2=false;
					this.visible.push(res.data.data[0].visible2)
					for(var i=0;i<res.data.data.length;i++){
						if(res.data.data[i].rolesType==0||res.data.data[i].rolesType==1){
							res.data.data[i].seeShow=true;
							res.data.data[i].reviseShow=false;
						}else if(res.data.data[i].rolesType==2){
							res.data.data[i].seeShow=false;
							res.data.data[i].reviseShow=true;
							
						}
					}
					console.log(this.visible)
					// console.log(res.data.data)
				}
			})
		},
		//修改编辑请求
		reviseRole:function(id){
			axios({
				method:'GET',
				url:'/role',
				params:{roleId:id}
			}).then(res=>{
				if(res.data.code=="200"){
					if(res.data.data.rolesType==0||res.data.data.rolesType==1){
						this.disabled1=true;
						this.dialogVisible=true;
						this.submitShow=false;
						this.form.name=res.data.data.role;
						this.form.desc=res.data.data.describes;
						this.permissionMenu=res.data.data.permissionMenu;
						for(var i=0;i<res.data.data.permissionMenu.length;i++){
							for(var j=0;j<res.data.data.permissionMenu[i].children.length;j++){
								if(res.data.data.permissionMenu[i].children[j].checked==1){
									this.form.type.push(res.data.data.permissionMenu[i].children[j].describes)
								}
							}
						}
						
					}else if(res.data.data.rolesType==2){
						console.log(res.data.data)
						this.reviseForm.name=res.data.data.role;
						this.dialogVisible2=true;
						this.reviseForm.desc=res.data.data.describes;
						this.newPermissions5=res.data.data.permissionMenu[0];
						this.newPermissions6=res.data.data.permissionMenu[1];
						this.newPermissions7=res.data.data.permissionMenu[2];
						this.newPermissions8=res.data.data.permissionMenu[3];
						this.reviseFormId=res.data.data.id;
						for(var i=0;i<res.data.data.permissionMenu[0].children.length;i++){
							if(res.data.data.permissionMenu[0].children[i].checked==1){
								this.reviseForm.type1.push(res.data.data.permissionMenu[0].children[i].describes)
							}
						}
						for(var i=0;i<res.data.data.permissionMenu[1].children.length;i++){
							if(res.data.data.permissionMenu[1].children[i].checked==1){
								this.reviseForm.type2.push(res.data.data.permissionMenu[1].children[i].describes)
							}
						}
						for(var i=0;i<res.data.data.permissionMenu[2].children.length;i++){
							if(res.data.data.permissionMenu[2].children[i].checked==1){
								this.reviseForm.type3.push(res.data.data.permissionMenu[2].children[i].describes)
							}
						}
						for(var i=0;i<res.data.data.permissionMenu[3].children.length;i++){
							if(res.data.data.permissionMenu[3].children[i].checked==1){
								this.reviseForm.type4.push(res.data.data.permissionMenu[3].children[i].describes)
							}
						}
						console.log(this.newPermissions5)
					}
				}
			});
			// console.log(this.form.type)
		},
		newMan(){				//新建角色
			axios({
				method:'GET',
				url:'/permissions'	
			}).then(res=>{
				if(res.data.code=="200"){
					console.log(res.data.data)
					this.newPermissions1=res.data.data[0];
					this.newPermissions2=res.data.data[1];
					this.newPermissions3=res.data.data[2];
					this.newPermissions4=res.data.data[3];
				}
			})
			
		},
		clearForm(){
			this.form={
				name:'',
				desc:'',
				type:[]
			}
		},
		clearForm1(){
			this.reviseForm={
				name:'',
				desc:'',
				type1:[],
				type2:[],
				type3:[],
				type4:[]
			}
		},
		clearForm2(){
			this.newForm={
				name:'',
				desc:'',
				type1:[],
				type2:[],
				type3:[],
				type4:[]
				
			}
			this.checked1=false;
			this.checked2=false;
			this.checked3=false;
			this.checked4=false;
		},
// 		checked1:function(){
// 			console.log(this.checked)
// 		},
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
		clickAll1(){
			var _this = this;
      
			if (!_this.checked1) { //实现反选
                    _this.newForm.type1 = [];
            } else { //实现全选
                _this.newForm.type1 = [];
                this.newPermissions1.children.forEach(function(item, index) {
                 _this.newForm.type1.push(item.describes);
                 });
             }
		},
		 reviseClickAll1:function(){
            if(this.newPermissions1.children.length==this.newForm.type1.length){ //判断每一个CheckBox是否选中   全选中让全选反选按钮选中
                this.checked1=true;
            }else{  // 不选中 让全选反选按钮不选中
                this.checked1=false;
            }
        },
		clickAll2(){
			var _this = this;
		
			if (!_this.checked2) { //实现反选
					_this.newForm.type2 = [];
			} else { //实现全选
				_this.newForm.type2 = [];
				this.newPermissions2.children.forEach(function(item, index) {
				_this.newForm.type2.push(item.describes);
				});
			}
		},
		reviseClickAll2(){
			if(this.newPermissions2.children.length==this.newForm.type2.length){ //判断每一个CheckBox是否选中   全选中让全选反选按钮选中
				this.checked2=true;
			}else{  // 不选中 让全选反选按钮不选中
				this.checked2=false;
			}
		},
		clickAll3(){
			var _this = this;
		
			if (!_this.checked3) { //实现反选
					_this.newForm.type3 = [];
			} else { //实现全选
				_this.newForm.type3 = [];
				this.newPermissions3.children.forEach(function(item, index) {
				_this.newForm.type3.push(item.describes);
				});
			}
		},
		reviseClickAll3(){
			if(this.newPermissions3.children.length==this.newForm.type3.length){ //判断每一个CheckBox是否选中   全选中让全选反选按钮选中
				this.checked3=true;
			}else{  // 不选中 让全选反选按钮不选中
				this.checked3=false;
			}
		},
		clickAll4(){
			var _this = this;
		
			if (!_this.checked4) { //实现反选
					_this.newForm.type4 = [];
			} else { //实现全选
				_this.newForm.type4 = [];
				this.newPermissions4.children.forEach(function(item, index) {
				_this.newForm.type4.push(item.describes);
				});
			}
		},
		reviseClickAll4(){
			if(this.newPermissions4.children.length==this.newForm.type4.length){ //判断每一个CheckBox是否选中   全选中让全选反选按钮选中
				this.checked4=true;
			}else{  // 不选中 让全选反选按钮不选中
				this.checked4=false;
			}
		},
		clickAll5(){
			var _this = this;
		
			if (!_this.checked5) { //实现反选
					_this.reviseForm.type1 = [];
			} else { //实现全选
				_this.reviseForm.type1 = [];
				this.newPermissions5.children.forEach(function(item, index) {
				_this.reviseForm.type1.push(item.describes);
				});
			}
		},
		reviseClickAll5:function(){
			if(this.newPermissions5.children.length==this.reviseForm.type1.length){ //判断每一个CheckBox是否选中   全选中让全选反选按钮选中
				this.checked5=true;
			}else{  // 不选中 让全选反选按钮不选中
				this.checked5=false;
			}
		},
		clickAll6(){
			var _this = this;
		
			if (!_this.checked6) { //实现反选
					_this.reviseForm.type2 = [];
			} else { //实现全选
				_this.reviseForm.type2 = [];
				this.newPermissions6.children.forEach(function(item, index) {
				_this.reviseForm.type2.push(item.describes);
				});
			}
		},
		reviseClickAll6(){
			if(this.newPermissions6.children.length==this.reviseForm.type2.length){ //判断每一个CheckBox是否选中   全选中让全选反选按钮选中
				this.checked6=true;
			}else{  // 不选中 让全选反选按钮不选中
				this.checked6=false;
			}
		},
		clickAll7(){
			var _this = this;
		
			if (!_this.checked7) { //实现反选
					_this.reviseForm.type3 = [];
			} else { //实现全选
				_this.reviseForm.type3 = [];
				this.newPermissions7.children.forEach(function(item, index) {
				_this.reviseForm.type3.push(item.describes);
				});
			}
		},
		reviseClickAll7(){
			if(this.newPermissions7.children.length==this.reviseForm.type3.length){ //判断每一个CheckBox是否选中   全选中让全选反选按钮选中
				this.checked7=true;
			}else{  // 不选中 让全选反选按钮不选中
				this.checked7=false;
			}
		},
		clickAll8(){
			var _this = this;
		
			if (!_this.checked8) { //实现反选
					_this.reviseForm.type4 = [];
			} else { //实现全选
				_this.reviseForm.type4 = [];
				this.newPermissions8.children.forEach(function(item, index) {
				_this.reviseForm.type4.push(item.describes);
				});
			}
		},
		reviseClickAll8(){
			if(this.newPermissions8.children.length==this.reviseForm.type4.length){ //判断每一个CheckBox是否选中   全选中让全选反选按钮选中
				this.checked8=true;
			}else{  // 不选中 让全选反选按钮不选中
				this.checked8=false;
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
		//switch
		switchs(e,aaa){
		
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