var webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
//因为webpack只支持JS，如果把css也编译到JS里面，一旦请求单CSS，也要把所有的css一块请求，ExtractTextPlugin可以把单个CSS从webpack中提取出来，调用哪个直接提取比较方便！
const htmlWebpackPlugin = require('html-webpack-plugin');
//删除文件夹插件
var CleanPlugin = require('clean-webpack-plugin');
//resolve
const resolve = dir => path.join(__dirname,  dir)
module.exports = {
	entry: {
		homePage:["babel-polyfill",'./src/JS/homePage.js'],
		login:["babel-polyfill",'./src/JS/login.js'],//首页
		resetPassword:["babel-polyfill",'./src/JS/resetPassword.js'],
		resetSubmission:["babel-polyfill",'./src/JS/resetSubmission.js'],
		Registration:["babel-polyfill",'./src/JS/Registration.js'],
		createOrganization:["babel-polyfill",'./src/JS/createOrganization.js'],
		skipLogin:["babel-polyfill",'./src/JS/skipLogin.js'],
		snquireHome:["babel-polyfill",'./src/JS/snquireHome.js'],
		manage:["babel-polyfill",'./src/JS/manage.js'],
		customerManagement:["babel-polyfill",'./src/JS/customerManagement.js'],
		customerManagementDetails:["babel-polyfill",'./src/JS/customerManagementDetails.js'],
		customerMangementLast:["babel-polyfill",'./src/JS/customerMangementLast.js'],
		customerMangementFile:["babel-polyfill",'./src/JS/customerMangementFile.js'],
		systemSetub:["babel-polyfill",'./src/JS/systemSetub.js'],
		productSetub:["babel-polyfill",'./src/JS/productSetub.js'],
		classifiSetub:["babel-polyfill",'./src/JS/classifiSetub.js'],
		workTime:["babel-polyfill",'./src/JS/workTime.js'],
		servicemodal:["babel-polyfill",'./src/JS/servicemodal.js'],
		architecture:["babel-polyfill",'./src/JS/architecture.js'],
		permissions:["babel-polyfill",'./src/JS/permissions.js'],
		dataStatistics:["babel-polyfill",'./src/JS/dataStatistics.js'],
	}, //入口
	output: {
    	filename: 'js/[name].js',
    	path: __dirname + '/dist/'
  	},//出口
  	module: {
	    rules: [
		    //CSS
		    { 
		      	test: /\.css$/,
		      	use: ExtractTextPlugin.extract({
	          		fallback: "style-loader",
	          		use: "css-loader"
	        	}) 
		    },
	        //sass文件的处理
       	    {
		        test: /\.scss$/,
		        use: ExtractTextPlugin.extract({
		          	fallback: 'style-loader',
		          	use: ['css-loader', 'sass-loader']
		        })
       		},
       		//图片的配置
       		{
        		test: /\.(png|jpg|gif|woff|ttf)$/,
        		loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]",
                options:{
                    publicPath:'./images'
                },
      		},
      		//页面引入图片
      		{
      			test: /\.(htm|html)$/i,
				use:'html-withimg-loader'
			},
			
			//babel
			{
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('./src'), resolve('test')],
				exclude: /node_modules/
            },
	    ]
  	},
  	plugins:[
  		//css文件
  		new ExtractTextPlugin({
  			filename:"CSS/[name].css"
  		}),
  		//处理html文件(一个htmlWebpackPlugin只能处理一个html，一个页面处理一个htmlWebpackPlugin)				
		new htmlWebpackPlugin({  
            filename : 'index.html',//输出的html路径  
            template : 'src/index.html', //html模板路径  
            inject : true,  
            title : '',  
            chunks : ['homePage'], //打包时只打包index的js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        
        new htmlWebpackPlugin({  
            filename : 'login.html',//输出的html路径  
            template : 'src/login.html', //html模板路径  
            inject : true,  
            title : '',  
            chunks : ['login'], //打包时只打包index的js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        new htmlWebpackPlugin({  
            filename : 'resetPassword.html',//输出的html路径  
            template : 'src/resetPassword.html', //html模板路径  
            inject : true,  
            title : 'resetPassword',
            chunks:["resetPassword"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        new htmlWebpackPlugin({  
            filename : 'resetSubmission.html',//输出的html路径  
            template : 'src/resetSubmission.html', //html模板路径  
            inject : true,  
            title : 'resetSubmission',
            chunks:["resetSubmission"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        new htmlWebpackPlugin({  
            filename : 'Registration.html',//输出的html路径  
            template : 'src/Registration.html', //html模板路径  
            inject : true,  
            title : 'Registration',
            chunks:["Registration"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        new htmlWebpackPlugin({  
            filename : 'createOrganization.html',//输出的html路径  
            template : 'src/createOrganization.html', //html模板路径  
            inject : true,  
            title : 'createOrganization',
            chunks:["createOrganization"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
           new htmlWebpackPlugin({  
            filename : 'skipLogin.html',//输出的html路径  
            template : 'src/skipLogin.html', //html模板路径  
            inject : true,  
            title : 'skipLogin',
            chunks:["skipLogin"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //关于我们
        new htmlWebpackPlugin({  
            filename : '/bottomhtml/aboutUs.html',//输出的html路径  
            template : 'src/bottomhtml/aboutUs.html', //html模板路径   
            inject : true,  
            title : '',
            chunks:[""],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //联系我们
        new htmlWebpackPlugin({  
            filename : '/bottomhtml/callUs.html',//输出的html路径  
            template : 'src/bottomhtml/callUs.html', //html模板路径   
            inject : true,  
            title : '',
            chunks:[""],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //加入我们
        new htmlWebpackPlugin({  
            filename : '/bottomhtml/joinUs.html',//输出的html路径  
            template : 'src/bottomhtml/joinUs.html', //html模板路径   
            inject : true,  
            title : '',
            chunks:[""],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //意见反馈
        new htmlWebpackPlugin({  
            filename : '/bottomhtml/feedBack.html',//输出的html路径  
            template : 'src/bottomhtml/feedBack.html', //html模板路径   
            inject : true,  
            title : '',
            chunks:[""],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //新闻动态
        new htmlWebpackPlugin({  
            filename : '/bottomhtml/news.html',//输出的html路径  
            template : 'src/bottomhtml/news.html', //html模板路径   
            inject : true,  
            title : '',
            chunks:[""],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
		new htmlWebpackPlugin({  
			filename : 'manage.html',//输出的html路径  
			template : 'src/manage.html', //html模板路径  
			inject : true,  
			title : 'manage',
			chunks : ['manage'],
			minify: {
				// 删除注释
				removeComments: true,
				// 删除空格
				collapseWhitespace: true,
				// 删除空格缩进
				removeAttributeQuotes: true
			}
		}),
        //帮助中心
        new htmlWebpackPlugin({  
            filename : '/bottomhtml/helpCenter.html',//输出的html路径  
            template : 'src/bottomhtml/helpCenter.html', //html模板路径   
            inject : true,  
            title : '',
            chunks:[""],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //服务条款
        new htmlWebpackPlugin({  
            filename : '/bottomhtml/service.html',//输出的html路径  
            template : 'src/bottomhtml/service.html', //html模板路径   
            inject : true,  
            title : '',
            chunks:[""],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //工单管理
        new htmlWebpackPlugin({  
            filename : 'InquireHome.html',//输出的html路径  
            template : 'src/InquireHome.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["snquireHome"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //客户管理
         new htmlWebpackPlugin({  
            filename : 'customerManagement.html',//输出的html路径  
            template : 'src/customerManagement.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["customerManagement"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //最近服务客户
        new htmlWebpackPlugin({  
            filename : 'customerMangementLast.html',//输出的html路径  
            template : 'src/customerMangementLast.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["customerMangementLast"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //产品档案
         new htmlWebpackPlugin({  
            filename : 'customerMangementFile.html',//输出的html路径  
            template : 'src/customerMangementFile.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["customerMangementFile"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //客户详情 
        new htmlWebpackPlugin({  
            filename : 'customerManagementDetails.html',//输出的html路径  
            template : 'src/customerManagementDetails.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["customerManagementDetails"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //系统设置
        new htmlWebpackPlugin({  
            filename : 'systemSetub.html',//输出的html路径  
            template : 'src/systemSetub.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["systemSetub"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //产品设置  
        new htmlWebpackPlugin({  
            filename : 'productSetub.html',//输出的html路径  
            template : 'src/productSetub.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["productSetub"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //故障类别
        new htmlWebpackPlugin({  
            filename : 'classifiSetub.html',//输出的html路径  
            template : 'src/classifiSetub.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["classifiSetub"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //工作时间 
         new htmlWebpackPlugin({  
            filename : 'workTime.html',//输出的html路径  
            template : 'src/workTime.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["workTime"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //服务模式 
        new htmlWebpackPlugin({  
            filename : 'servicemodal.html',//输出的html路径  
            template : 'src/servicemodal.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["servicemodal"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //组织架构 
        new htmlWebpackPlugin({  
            filename : 'architecture.html',//输出的html路径  
            template : 'src/architecture.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["architecture"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //权限设置
        new htmlWebpackPlugin({  
            filename : 'permissions.html',//输出的html路径  
            template : 'src/permissions.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["permissions"],
            // 代码压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true,
                // 删除空格缩进
                removeAttributeQuotes: true
            }
        }),
        //数据统计 
        new htmlWebpackPlugin({  
            filename : 'dataStatistics.html',//输出的html路径  
            template : 'src/dataStatistics.html', //html模板路径     
            inject : true,  
            title : '',
            chunks:["dataStatistics"],
            //代码压缩
            minify:{
                //删除注释
                removeComments: true,
                //删除空格
                collapseWhitespace: true,
                //删除空格缩进
                removeAttributeQuotes: true
            }
        }),
         // 代码压缩插件
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false
            }
        }),	
        //删除dist目录
	    new CleanPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }) 
  	]
}
