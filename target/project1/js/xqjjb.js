jQuery(function($){
	
	$(document).keyup(function(event){
		if(event.keyCode== 13) {
			 if(pageIndex!=1&&pageIndex!=''){
					pageIndex="1";
				}
			 pageAjax();
		   }
	});
	//数据
	function data(list) {
		var str = "";
		for ( var i = 0; i < list.length; i++) {
			str += "<tr>";
			str += "<td><div class='admin-form theme-warning tc-checkbox-1'><label class=\"option block mn\"><input type=\"radio\" name=\"ids\" teamid=\""+list[i].team_id+"\" teamno=\""+list[i].tuanh+"\" sqcs=\""+list[i].sqcsId+"\" value=\""+list[i].id+"\"><span class=\"checkbox mn\"></span></label></div></td>";
			str += "<td>" + formatterundefined(list[i].cwjjrq) + "</td>";
			str += "<td>" + formatterundefined(list[i].sgth) + "</td>";
			str += "<td>" + formatterundefined(list[i].cfrq) + "</td>";
			
			str += "<td>" +formatterundefined(list[i].tuanh) + "</td>";
			str += "<td>" + formatterundefined(list[i].xlmc) + "</td>";
			str += "<td>" + formatterundefined(list[i].qzzl) + "</td>";
			str += "<td>" + formatterundefined(list[i].sqcs) + "</td>";
			str += "<td>" + formatterundefined(list[i].sqrs) + "</td>";
			str += "<td>" + formatterundefined(list[i].lindui) + "</td>";
			str += "<td>" + formatterundefined(list[i].jidiao) + "</td>";
			str += "<td>" + formatterundefined(list[i].htrq) + "</td>";
			str += "<td>" + formatterundefined(list[i].jdjjrq) + "</td>";
			str += "<td>" + formatterundefined(list[i].jdjjrs) + "</td>";
			str += "<td>" + formatterundefined(list[i].xqrq) + "</td>";
			str += "<td>" + formatterundefined(list[i].xhrq) + "</td>";
			str += "<td>" + formatsfjs(list[i].sfjs) + "</td>";
			str += "<td>" + formatterundefined(list[i].wjsyy) + "</td>";
			str += "<td>" + formatterundefined(list[i].cqrs) + "</td>";
			str += "<td>" + formatterundefined(list[i].jqrs) + "</td>";
			str += "<td>" + formatterundefined(list[i].qcbzrs) + "</td>";
			str += "<td>" + formatterundefined(list[i].msxq) + "</td>";
			str += "</tr>";
		}
		return str;
	}

	//格式化undefined
	function formatterundefined(val) {
		if (val == undefined) {
			return "";
		} else {
			return val;
		}
	}
	//是否及时
	function formatsfjs(val) {
		if (val == '0') {
			return "";
		}else if (val == '1'){
			return "及时";
		}else if (val == '2'){
			return "不及时";
		}
	}
	function pageAjax(thisIndex,  curr) {
		curr=pageIndex;
		var index = layer.load(3, {
			shade : [ 0.7, '#fff' ]
		//0.1透明度的白色背景
		});
		var url = '/visa/ywbb/xqjjb/list.html?'+$("#form1").serialize();
		$.getJSON(url, {
			pageNumber : curr || 1
		//向服务端传的参数，此处只是演示
		}, function(res) {
			var html = data(res.data);
			document.getElementById('tttt').innerHTML = html;
			layer.close(index);
			//显示分页
			laypage({
				cont : 'datatable_paginate1', //容器。值支持id名、原生dom对象，jquery对象。
				pages : res.pagesum, //通过后台拿到的总页数
				curr : curr || 1, //当前页
				skin : '#00EE00',
				jump : function(obj, first) { //触发分页后的回调
					if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
						pageIndex = obj.curr;
						pageAjax(thisIndex,obj.curr);
					}
				}
			});
		});
		$("#fenye").val(pageIndex);
	};
	
	
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
	//获取选中的送签城市
	function getTeamsqcs() {
		var sqcs = [];
		$('input[name="ids"]:checked').each(function() {
			sqcs.push($(this).attr("sqcs"));
		});
		return sqcs;
	}
	//获取选中的id
	function getTeamNo() {
		var teamno = [];
		$('input[name="ids"]:checked').each(function() {
			teamno.push($(this).attr("teamno"));
		});
		return teamno;
	}
	var xqjjb = {
		init: function(){
			xqjjb.bindEvents();
			pageAjax();
			try{
				$('#datatable').dataTable({
					"bAutoWidth":false,//自动计算列宽
					'sScrollX': "100%",
					"aoColumnDefs" : [ {
						'bSortable' : false,
						'aTargets' : [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
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
        },
        bindEvents:function(){
        	$("#qbtn").on("click",function(){
        		 if(pageIndex!=1&&pageIndex!=''){
						pageIndex="1";
					}
					pageAjax();
				
        		
        	});
        	$("#xqjjb_id").on("click",function(){
        		var id = checkValue();
        		if(id == ''){
        			layer.msg("请选择要维护数据");
        			return;
        		}
        		var url = "/visa/ywbb/xqjjb/findXqjjbwh.html?id="+id;
				$.ajax({
					url : url,
					async : false,
					dataType : "json",
					success : function(result) {
						$("#cwjjrq").val(result.cwjjrq);
						$("#jdjjrq").val(result.jdjjrq);
						$("#jdjjrs").val(result.jdjjrs);
						$("#xqrq").val(result.xqrq);
						$("#xhrq").val(result.xhrq);
						$("#sfjs").val(result.sfjs);
						$("#wjsyy").val(result.wjsyy);
						$("#msxq").val(result.msxq);
						$("#xqjjb_id2").val(id);
						$("#xqjjbModal").modal('show');
					},
					error:function(){
						layer.msg('请求失败');
					}
				});
        	});
        	
        	$("#xqjjwh").on("click",function(){
        		var con =layer.confirm('您确认要操作吗？', {
    				btn : [ '确认', '取消' ]
    			}, function() {
    				layer.close(con);
    				var url ="/visa/ywbb/xqjjb/updXqjjb.html?"+$("#xqjjForm").serialize();
    				$.ajax({
    					url : url,
    					async : false,
    					dataType : "json",
    					success : function(result) {
    						if (result == "1") {
    							layer.msg('操作成功!');
    							pageAjax();
    							$("#xqjjbModal").modal('hide');
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
        	
        	
        	$("#xqjjb_ckmd").on("click",function(){
        		var teamid = getTeamId();
        		if(teamid == ''){
        			layer.msg("请选择数据");
        			return;
        		}
        		location.href="/visa/qzzxgl/outsignmanage/findSqztbckmx.html?teamid="+teamid;
        	});
        	
        }
	};
	xqjjb.init();
});
