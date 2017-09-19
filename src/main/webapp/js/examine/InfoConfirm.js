	
	var pageIndex = "1";
	var sortIndex = -1;
	$(function() {
		 pageAjax();
		 $('.inputSmall').datetimepicker({
	         	language:  'zh-CN',
	         	format:'YYYY-MM-DD',
	         	viewformat: 'YYYY-MM-DD  '
	         });
		 $("#qbtn").click(function() {
				pageAjax();
			});
		$('#datatable').dataTable({
			"aoColumnDefs" : [ {
				'bSortable' : false,
				'aTargets' : [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
			} ],
			"order" : [],
			scrollCollapse : true,
			"sDom" : 't<"dt-panelfooter clearfix"ip>',
			"iDisplayLength" : 10,//每页默认显示行数
			"language" : {
				"lengthMenu" : "",
				"zeroRecords" : "  ",
				"info" : "",
				"infoEmpty" : "",
				"infoFiltered" : "",
				"oPaginate" : {
					"sPrevious" : false,
					"sNext" : false
				}
			}
		});
	 });
	function trimStr(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	
	//查询已送签资料
	function pageAjax(thisIndex, dataType, curr) {
		alert(11);
		var index = layer.load(3, {
			shade : [ 0.7, '#fff' ]
		//0.1透明度的白色背景
		});
	
		var url = '/visa/examine/InfoConfirm/list.html?'+ $("#form1").serialize();
			
	
		$.getJSON(url, {
			pageNumber : curr || 1
			
		//向服务端传的参数，此处只是演示
		}, function(res) {
			var html = tabledata(res.data);
			alert(html);
			document.getElementById('tttt').innerHTML = html;
			layer.close(index);
			//排序
			checkColumnValue(thisIndex, dataType, "datatable");
			//显示分页
			laypage({
				cont : 'datatable_paginate1', //容器。值支持id名、原生dom对象，jquery对象。
				pages : res.pagesum, //通过后台拿到的总页数
				curr : curr || 1, //当前页
				skin : '#00EE00',
				//groups: 5, //连续显示分页数
				jump : function(obj, first) { //触发分页后的回调
					if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
						pageIndex = obj.curr;
						pageAjax(thisIndex, dataType, obj.curr);
					}
				}
			});
		});
	
	};	
function findLink(option){
	var type ="";
	if(option ==1){
		type='发齐确认';
	}
	else if(option == 2){
		type='做资料';
	}
	else if(option == 3){
		type='送签';
	}else if(option == 4){
		type='销售确认';
	}else if(option == 5){
		type='出签确认';
	}else if(option == 6){
		type='销签确认';
	} 
	var ids =$("input[type=checkbox]:checked");
	if(ids.length==0){
		layer.msg('请选择数据行!');
	}else if (ids.length>1){
		layer.msg('请选择单数据行!');
	}else{
		window.location.href = "/visa/examine/InfoConfirm/findTeam.html?id="+ids.val()+"&type="+type;
	}
}



//数据
function tabledata(list) {
	 	var str = "";
		for ( var i = 0; i < list.length; i++) {
//			alert(formatterundefined(list[i].publishAll));
			str += "<tr>";
			str += "<td><label class=\"option block mn\"><input type=\"checkbox\" name=\"ids\" value=\""+list[i][0]+"\"><span class=\"checkbox mn\"></span></label></td>";
			str += "<td>" + list[i][1] + "</td>";
			str += "<td>" + list[i][2]+ "</td>";
			str += "<td>" + formatterdate(list[i][3]) + "</td>";
			str += "<td>" + formatterundefined(list[i][4]) + "</td>";
			str += "<td>" + formatterundefined(list[i][5]) + "</td>";
			str += "<td>" + formatterundefined(list[i][6]) + "</td>";
			str += "</tr>";
		}
		return str; 
	}

//格式化日期
function formatterdate(val, row) {
	if (val != null && val != "") {
		var date = new Date(val);
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	} else {
		return "";
	}
}

//格式化undefined
function formatterundefined(val, row) {
	if (val == undefined) {
		return "";
	} else {
		return val;
	}
}
 