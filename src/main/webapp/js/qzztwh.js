jQuery(function($){
	//日期格式化插件
    Date.prototype.format =function(format){
        var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4- RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    }
	//获取选中的id
	function checkValue() {
		var c_value = [];
		$('input[name="ids"]:checked').each(function() {
			c_value.push($(this).val());
		});
		return c_value;
	}
	//获取选中的id
	function getTeamId() {
		var teamId = [];
		$('input[name="ids"]:checked').each(function() {
			teamId.push($(this).attr("teamid"));
		});
		return teamId;
	}
	//获取选中的id
	function getlq() {
		var sqcs = [];
		$('input[name="ids"]:checked').each(function() {
			sqcs.push($(this).attr("sqcs"));
		});
		return sqcs;
	}
	var qzztwh = {
		init: function(){
			qzztwh.bindEvents();
        },
        bindEvents: function(){
        	pageAjax();
			try{
				$('#datatable').dataTable({
					"bAutoWidth":false,//自动计算列宽
					'sScrollX': "100%",
					"aoColumnDefs" : [ {
						'bSortable' : false,
						'aTargets' : [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17 ]
					} ],
					"order" : [],
					"sDom" : 't<"dt-panelfooter clearfix"ip>',
					"language" : {
						"lengthMenu" : "",
						"zeroRecords" : " ",
						"info" : "",
						"infoEmpty" : "",
						"infoFiltered" : "",
						"oPaginate" : {
							"sPrevious" : false,
							"sNext" : false
						}
					}
				});
				
			}catch(e){}
			
        	$('#queryBtn').on('click', function(){
        		pageAjax();
        	});
        	
        	$('#qzzt_id').on('click', function(){
        		var id = checkValue();
        		if(id == ''){
        			layer.msg("请选择要维护数据");
        			return;
        		}
        		var url = "/visa/ywbb/qzzt/findQzztwh.html?id="+id;
				$.ajax({
					url : url,
					async : false,
					dataType : "json",
					success : function(result) {
						if(result.qqrq == '' || result.qqrq == null){
							$("#qqrq").val("");
						}else{
							$("#qqrq").val(new Date(result.qqrq).format('yyyy-MM-dd'));
						}
						var sgth = result.embassyTeamNo;
						if(typeof(sgth) == "undefined"){
							$("#sgth").val("");
						}else{
							$("#sgth").val(sgth);
						}
						$("#jqyy").val(result.jqyy);
						$("#xqzk").val(result.xqzk);
						$("#bz").val(result.bz);
						$("#qzztwh_id").val(id);
						$("#qzztwhModal").modal('show');
					},
					error:function(){
						layer.msg('请求失败');
					}
				});
        	});
        	
        	$("#qrwh").on('click',function(){
        		var con =layer.confirm('您确认要操作吗？', {
    				btn : [ '确认', '取消' ]
    			//按钮
    			}, function() {
    				layer.close(con);
    				var url = "/visa/ywbb/qzzt/updQzztwh.html?"+$("#qzztwhForm").serialize();
    				$.ajax({
    					url : url,
    					async : false,
    					dataType : "json",
    					success : function(result) {
    						if (result == "1") {
    							layer.msg('操作成功!');
    							pageAjax();
    							$("#qzztwhModal").modal('hide');
    						} else {
    							layer.msg('操作失败!');
    						}
    					},
    					error:function(){
    						layer.msg('请求失败');
    					}
    				});
    			});
        	});
        	
        	$("#qzzt_ckmd").on("click",function(){
        		var teamid = getTeamId();
        		var lq = getlq();
        		
        		if(teamid == ''){
        			layer.msg("请选择数据");
        			return;
        		}
        		location.href="/visa/qzzxgl/outsignmanage/findSqztbckmx.html?teamid="+teamid+"&lq="+lq;
        	});
        }
	}
	qzztwh.init();
});