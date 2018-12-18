require("../CSS/dataStatistics.css");
var app=new Vue({
	el:'#body',
	data:{
		titleIndex:[
			{'index':'0'},
			{'index':'1'},
			{'index':'2'},
			{'index':'3'}
		],
		changeTitles:2,
		bckArr:[
			{label:'客服统计'},
			{label:'工单统计'},
		],
		isActive:0,
		div1:true,
		div2:false,
		option:'',
	},
	created(){
		setTimeout(()=>{
			// this.beginPlc();
		})
	},
	mounted(){
		setTimeout(()=>{
			this.handleHeight();
			this.beginPlc();
		});
	
	},
	methods:{
		//页面开始请求
		beginPlc(){
			//饼状图请求
			axios({
				method:'GET',
				url:'/workload'
			}).then(res=>{
				if(res.data.code=="200"){
					var data1=res.data.data;
					var temp=[];
					for(var i=0;i<data1.length;i++){
						temp.push(data1[i].name);
					}
					var myChart=echarts.init(document.getElementById("circle1"));
					myChart.setOption(this.option={
						title : {
							text: '本周的大致工作量',
							x:'center'
						},
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend: {
							orient: 'vertical',
							left: 'left',
							data:temp
						},
						series : [
							{
								name: '访问来源',
								type: 'pie',
								radius : '55%',
								center: ['50%', '60%'],
								data:data1,
								itemStyle: {
									emphasis: {
										shadowBlur: 10,
										shadowOffsetX: 0,
										shadowColor: 'rgba(0, 0, 0, 0.5)'
									}
								}
							}
						]
					});
				}
			})
			//折线图请求
			axios({
				method:'GET',
				url:'/createOrderTrendLine'
			}).then(res=>{
				// console.log(res.data)
				if(res.data.code=="200"){
					var data=res.data.data;
					var temp=[];
					var temp1=data[0].list.map(function (item) {
								return item[1];
							});
					var temp2=data[1].list.map(function (item) {
								return item[1];
							});
					var temp3=data[2].list.map(function (item) {
								return item[1];
							});
					var temp4=data[3].list.map(function (item) {
								return item[1];
							});
					for(var i=0;i<data.length;i++){
						temp.push(data[i].name);
					}
					var myChart1=echarts.init(document.getElementById("circle2"));
					myChart1.setOption(this.option={
						title: {
							text: '本月客服接单趋势图',
							x:'center'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data:temp,
							top:'5%'
						},
						grid: {
							top:'11%',
							left: '3%',
							right: '4%',
							bottom: '3%',
							height:'300px',
							containLabel: true
						},
						xAxis: {
						data: data[0].list.map(function (item) {
								return item[0];
							})
						},
						yAxis: {
							splitLine: {
								show: false
							}
						},
						
						dataZoom: [
							{
							startValue: '2018-10-23'
						}, {
							type: 'inside'
						}],
						 series: [
						{
							name:data[0].name,
							type:'line',
							stack: '总量',
							color:'#E4393C',
							data: temp1
						},
						{
							name:data[1].name,
							type:'line',
							stack: '总量',
							color:'#ffde33',
							data:temp2
						},
						{
							name:data[2].name,
							type:'line',
							stack: '总量',
							color:'#33CC33',
							data:temp3
						},
						{
							name:data[3].name,
							type:'line',
							stack: '总量',
							color:'#0099CC',
							data:temp4
						},
						
					]
					})
				}
			})
			//第一个柱状图请求
			axios({
				method:'GET',
				url:'/maxCreateOrderBar'
			}).then(res=>{
				console.log(res.data)
				if(res.data.code=="200"){
					var data=res.data.data;
					var temp=[];
					var temp1=data[0].dateName;
					temp.push(data[0].name,data[1].name)
					var myChart2=echarts.init(document.getElementById("circle3"));
					myChart2.setOption(this.option = {
						title: {
							text: '本周前五位客服专员',
							x:'center'
						},
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						legend: {
							data:temp,
							top:'5%'

						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis:  {
							type: 'category',
							data: temp1
						},
						yAxis: {
							type: 'value'
						},
						series: [
							{
								name: '直接解决',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideTop'
									}
								},
								data: data[0].dataValue
							},
							{
								name: '外派解决',
								type: 'bar',
								stack: '总量',
								label: {
									normal: {
										show: true,
										position: 'insideTop'
									}
								},
								data: data[1].dataValue
							}
						]
					});
				}
			})
			//第二个柱状图
				axios({
					method:'GET',
					url:'/minCreateOrderBar'
				}).then(res=>{
					console.log(res.data)
					if(res.data.code=="200"){
						var data=res.data.data;
						var temp=[];
						var temp1=data[0].dateName;
						temp.push(data[0].name,data[1].name)
						var myChart3=echarts.init(document.getElementById("circle4"));
							myChart3.setOption(this.option = {
								title: {
									text: '本周后五位客服专员',
									x:'center'
								},
								tooltip : {
									trigger: 'axis',
									axisPointer : {            // 坐标轴指示器，坐标轴触发有效
										type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
									}
								},
								legend: {
									data:temp,
									top:'5%'
			
								},
								grid: {
									left: '3%',
									right: '4%',
									bottom: '3%',
									containLabel: true
								},
								xAxis:  {
									type: 'category',
									data: temp1
								},
								yAxis: {
									type: 'value'
								},
								series: [
									{
										name: '直接解决',
										type: 'bar',
										stack: '总量',
										label: {
											normal: {
												show: true,
												position: 'insideTop'
											}
										},
										data: data[0].dataValue
									},
									{
										name: '外派解决',
										type: 'bar',
										stack: '总量',
										label: {
											normal: {
												show: true,
												position: 'insideTop'
											}
										},
										data: data[1].dataValue
									}
								]
							});
						}
					});
				//工单饼状图
				axios({
					method:'GET',
					url:'/orderDispose'
				}).then(res=>{
					if(res.data.code=="200"){
						var data1=res.data.data;
						var temp=[];
						for(var i=0;i<data1.length;i++){
							temp.push(data1[i].name);
						}
						var myChart4=echarts.init(document.getElementById("circle5"));
						myChart4.setOption(this.option={
							title : {
								text: '本周工单处理情况分布',
								x:'center'
							},
							tooltip : {
								trigger: 'item',
								formatter: "{a} <br/>{b} : {c} ({d}%)"
							},
							legend: {
								orient: 'vertical',
								left: 'left',
								data:temp
							},
							series : [
								{
									name: '访问来源',
									type: 'pie',
									radius : '55%',
									center: ['50%', '60%'],
									data:data1,
									itemStyle: {
										emphasis: {
											shadowBlur: 10,
											shadowOffsetX: 0,
											shadowColor: 'rgba(0, 0, 0, 0.5)'
										}
									}
								}
							]
						});
					}
				})
				//本周工单处理趋势图
				axios({
					method:'GET',
					url:'/overdueOrderChartLine'
				}).then(res=>{
					// console.log(res.data)
					if(res.data.code=="200"){
						var data=res.data.data;
						console.log(data)
						var temp=[];
						var temp1=data[0].list.map(function (item) {
									return item[1];
								});
						var temp2=data[1].list.map(function (item) {
									return item[1];
								});
						var temp3=data[2].list.map(function (item) {
									return item[1];
								});
						for(var i=0;i<data.length;i++){
							temp.push(data[i].name);
						}
						var myChart6=echarts.init(document.getElementById("circle6"));
						myChart6.setOption(this.option={
							title: {
								text: '本周工单处理趋势图',
								x:'center'
							},
							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data:temp,
								top:'5%'
							},
							grid: {
								top:'11%',
								left: '3%',
								right: '4%',
								bottom: '3%',
								height:'300px',
								containLabel: true
							},
							xAxis: {
							data: data[0].list.map(function (item) {
									return item[0];
								})
							},
							yAxis: {
								splitLine: {
									show: false
								}
							},
							
							dataZoom: [
								{
								startValue: '2018-10-23'
							}, {
								type: 'inside'
							}],
							series: [
							{
								name:data[0].name,
								type:'line',
								stack: '总量',
								color:'#E4393C',
								data: temp1
							},
							{
								name:data[1].name,
								type:'line',
								stack: '总量',
								color:'#ffde33',
								data:temp2
							},
							{
								name:data[2].name,
								type:'line',
								stack: '总量',
								color:'#33CC33',
								data:temp3
							},
							
						]
						})
					}
				});
				//运维工程师工作效率趋势图
				axios({
					method:'GET',
					url:'/overdueOrderAverageChartLine'
				}).then(res=>{
					if(res.data.code=="200"){
						var data=res.data.data;
						console.log(data)
						var temp=[];
						var temp1=data[0].list.map(function (item) {
									return item[1];
								});
						var temp2=data[1].list.map(function (item) {
									return item[1];
								});
						for(var i=0;i<data.length;i++){
							temp.push(data[i].name);
						}
						var myChart6=echarts.init(document.getElementById("circle7"));
						myChart6.setOption(this.option={
							title: {
								text: '运维工程师工作效率趋势图',
								x:'center'
							},
							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data:temp,
								top:'5%'
							},
							grid: {
								top:'11%',
								left: '3%',
								right: '4%',
								bottom: '3%',
								height:'300px',
								containLabel: true
							},
							xAxis: {
							data: data[0].list.map(function (item) {
									return item[0];
								})
							},
							yAxis: {
								splitLine: {
									show: false
								}
							},
							
							dataZoom: [
								{
								startValue: '2018-10-23'
							}, {
								type: 'inside'
							}],
							series: [
							{
								name:data[0].name,
								type:'line',
								stack: '总量',
								color:'#E4393C',
								data: temp1
							},
							{
								name:data[1].name,
								type:'line',
								stack: '总量',
								color:'#A0CFFF',
								data:temp2
							}	
						]
						})
					}
				})
				//运维工程师工作质量趋势图
				axios({
					method:'GET',
					url:'/successOrderPercentChartLine'
				}).then(res=>{
					if(res.data.code=="200"){
						var data=res.data.data;
						console.log(data)
						var temp=[];
						var temp1=data[0].list.map(function (item) {
									return item[1];
								});
						for(var i=0;i<data.length;i++){
							temp.push(data[i].name);
						}
						var myChart7=echarts.init(document.getElementById("circle8"));
						myChart7.setOption(this.option={
							title: {
								text: '运维工程师工作质量趋势图',
								x:'center'
							},
							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data:temp,
								top:'5%'
							},
							grid: {
								top:'11%',
								left: '3%',
								right: '4%',
								bottom: '3%',
								height:'300px',
								containLabel: true
							},
							xAxis: {
							data: data[0].list.map(function (item) {
									return item[0];
								})
							},
							yAxis: {
								splitLine: {
									show: false
								}
							},
							
							dataZoom: [
								{
								startValue: '2018-10-23'
							}, {
								type: 'inside'
							}],
							series: [
							{
								name:data[0].name,
								type:'line',
								stack: '总量',
								color:'#E4393C',
								data: temp1
							},
							
						]
						})
					}
				})
		},
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
// 				let RightNavMenu=document.getElementsByClassName("proplow")[0];
// 				let	ConentPageLeft=document.getElementById("ConentPageLeft")
// 				ConentPageLeft.style.height=RightNavMenu.offsetHeight+106+'px'
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
			bckClick(n){
				this.isActive=n
				if(n==0){
					this.div1=true;
					this.div2=false;
				}else if(n==1){
					this.div1=false;
					this.div2=true;
				}
			}
	}
})