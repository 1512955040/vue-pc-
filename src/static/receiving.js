
//页面传参接收参数单个参数
function getUrlParms (name) {
    let tstr = window.location.href;
    let index = tstr.indexOf('?')
    let str = tstr.substring(index + 1);
    let arr = str.split('&');
    let result = {};
    arr.forEach((item) => {
        let a = item.split('=');
        result[a[0]] = a[1];
    })
    return result[name];
}
//多个参数
   function recevingDefault(parameter,parameter1){
   		var url = location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1')
		var theRequest = new Object();
		if ( url.indexOf( "?" ) != -1 ) {
			var str = url.substr( 1 ); //substr()方法返回从参数值开始到结束的字符串；
			var strs = str.split( "&" );
			for (var i = 0; i<strs.length; i++) {
			   	theRequest[strs[ i ].split( "=" )[ 0 ]] = ( strs[ i ].split( "=" )[ 1 ] );
			}
			parameter=theRequest.parameter1
		}	
	}
