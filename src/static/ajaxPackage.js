//封装ajax POST
	function myPostByJson(a,b){
		var result=axios({
			method:'POST',
			url:a,
			headers:{
				'Content-Type':'application/json; charset=UTF-8'
			},
			data:b
		})
		return result
	}
//封装ajax GET
	function myGetByJson(a,b){
		var result=axios({
			method:'get',
			url:a,
			params:b
		})
		return result
	}
	