function isBtnShow(menuId){
 	$.ajax({
 			url : "/visa/sys/functionAuthorization/findButtoms.html",
			type:"post",
			dataType:"json",
			data:{"menuId":menuId},
			success:function(result){
					if(result=="login"){
						layer.msg("用户过期，请重新登录!");
						top.location.href = "/visa";
					}else{
						if(result !=""){
							for (var i = 0; i < result.length; i++) {
								var id=result[i]['bid'];
								$("#"+id).css({"display":"none"});
							}
						}
					}
			}
 	});
}