
 	function createNewMan(userRef){
		let _that=this;
			document.addEventListener('click',function(e){
				if(!!userRef.contains(e.target)) return;
				_that.shown=false
			})
	}
