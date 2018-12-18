require("../CSS/normalize.css")
require("../CSS/login.css");
var app=new Vue({
	el:'#body',
	data:{
		navs:[
			{label:'首页'},
			{label:'下载'},
			{label:'关于'}
		],
		isActive:4,
		isHas:'',
		logPh:'请输入手机号',
		passPh:'请输入密码',
		spanOpen:false,
		spanOpen1:false,
		phone:'',
		password:'',
		thisVal:"",//手机号输入值
		thisVal1:"",//密码输入值
		imgc:false,
		noPass:false,
		noCall:false,
		noSub:false,
		noMessage:''//后台返回msg
		// clientHeight:""//高度
	},

	methods:{
		clickActive:function(n){
			this.isActive=n;
			if(n==0){
				window.location.href="index.html"
			}
			},
		foucsInt1:function(){//手机号input获取焦点
			this.logPh="";
			this.spanOpen=true;
		},
		blurInt1:function(){//手机号失去焦点
			if(this.thisVal==""){
			this.logPh="请输入手机号";
			this.spanOpen=false
			}else{
				this.spanOpen=true
				if(this.thisVal!==""&&this.noCall==true){
					this.noCall=false;
				}
			}
		},
		foucsInt2:function(){//密码框获得焦点
			this.passPh="";
			this.spanOpen1=true;
		},
		blurInt2:function(){//密码框失去焦点
			if(this.thisVal1==""){
			this.passPh="请输入密码"
			this.spanOpen1=false
		 }else{
				this.spanOpen1=true
				if(this.thisVal1!==""&&this.noPass==true){
					this.noPass=false;
				}
			}
		},
		choseImg:function(){
			if(this.imgc==false){
				this.imgc=true
			}else{
				this.imgc=false
			}
		},
		etargets(e){
			e.preventDefault()
			window.location.href="Registration.html?phone="+this.phone+"&password="+this.password;
		},
		submit:function(){
			 var reg=/^1(3|4|5|7|8|9)\d{9}$/;//手机号正则
			 var passReg=/^[0-9A-Za-z]{6,20}$/;
			if(this.thisVal==""&&this.thisVal1!==""){
				this.noCall=true
			}else if(this.thisVal!==""&&this.thisVal1==""){
				this.noPass=true
			}else{
				if(!reg.test(this.thisVal)||!passReg.test(this.thisVal1)){
					console.log("1111");
					this.noSub=true;
				}else if(reg.test(this.thisVal)&&passReg.test(this.thisVal1)){
					console.log("32131	")
					axios({
						method:'POST',
						url:'/loginAuth',
						data:{loginname:this.thisVal,password:this.thisVal1,rememberMe:this.imgc}
					}).then(res=>{
						
						if(res.data.code=='200'){
							window.location.href="./InquireHome.html"
						}else{
							this.noMessage=res.data.msg;
							
						}
					}).catch(err=>{
						console.log(err)
					})
				}
//				else{
//					$.ajax({
//						url:"192.168.1.253:7081/loginAuth",
//						type:"POST",
//						data:{
//							"loginname":"15211112225",
//							"password":"123456",
//							"rememberMe":true
//						},
//						dataType:"json",
//						success:function(result){
//							console.log(result);
//							alert("123456")
//						},
//						error:function(XMLHttpRequest){
//							
//						}
//					});
//				}
			}
		},

	}
})
