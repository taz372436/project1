
$(function() {
	//回车查询
	 $(document).keyup(function(event){
		 if(event.keyCode== 13) {
			pageAjax();
		  }
	 });
	pageAjax();
	$("#jjdNum").focus();
	$('#datatable').dataTable({
		"aoColumnDefs" : [ {
			'bSortable' : false,
			'aTargets' : [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14 ]
		} ],
		"order" : [ [ 1, 'asc' ] ],
		scrollCollapse : true,
		"iDisplayLength" : 10,//每页默认显示行数
		"sDom" : 't<"dt-panelfooter clearfix"ip>',
		"iDisplayLength" : 10,//每页默认显示行数
		"language" : {
			"lengthMenu" : "",
			"zeroRecords" : "正在加载...",
			"info" : "",
			"infoEmpty" : "",
			"infoFiltered" : "",
			"oPaginate" : {
				"sPrevious" : false,
				"sNext" : false
			}
		}
	});
	$("#datatable_paginate").css("display", "none");
	$("#dataTables_info").css("display", "none");
	Sort.init("datatable");
	$("#qbtn").click(function() {
		pageAjax();
	});
	//数据
	function data(list) {
		var str = "";
		for ( var i = 0; i < list.length; i++) {
			str += "<tr>";
			str += "<td><label class=\"option block mn\"><input type=\"checkbox\" name=\"ids\" value=\""+list[i].id+"\"><span class=\"checkbox mn\"></span></label></td>";
			//str += "<td>" + list[i].code + "</td>";
			str += "<td>" + '<a class="btn light btn-sm DTTT_button_copy" aria-controls="datatable3" data-toggle="modal" onclick="teamInFo(this,\''+list[i].id+'\')" >'+ list[i].code +'<a>'+ "</td>";
			str += "<td>" + list[i].barCode + "</td>";
			str += "<td>" + list[i].teamNo + "</td>";
			str += "<td>" + list[i].goTime + "</td>";
			str += "<td>" + list[i].findNumber + "</td>";
			str += "<td>" + list[i].findNumberOne + "</td>";
			str += "<td>" + list[i].findNumberTwo + "</td>";
			str += "<td>" + list[i].isUrgent + "</td>";
			str += "<td>" + list[i].remarks + "</td>";
			str += "</tr>";
			 
		}
		return str;
	}

	function pageAjax(thisIndex, dataType, curr) {
		
		var url = '/visa/examine/examineScheduling/initialize.html?' + $("#form1").serialize();
		$.getJSON(url, {
			pageNumber : curr || 1
		//向服务端传的参数，此处只是演示
		}, function(res) {
			var html = data(res.data);
			document.getElementById('tttt').innerHTML = html;
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
	}

//	
//$('#datatable').dataTable({
//	searching:false,
//	processing:true,
//	ordering:true,
//	lengthChange:false,
//	pageLength:10,
//    processing: true,
//    serverSide: true,
//    bInfo:true,
//    "ajax": "/visa/examine/examineScheduling/initialize.html",   
//   
//	aoColumnDefs : [
//	                   {'bSortable' : false,'aTargets' : [ 0 ],
//	                	   "render": function ( data, type, full, meta ) {
//           	   					return "<input type='checkbox'  class='checkbox mn'  value='" + data + "' title='" + data + "' id='checkbox' />";
//		                	   	}
//	                   } ,
//               ],
//    columns: [
//	            {  data: "id"},
//	            { data: "code" },
//	            { data: "barCode" },
//	            { data: "teamNo" },
//	            { data: "goTime" },
//	            { data: "findNumber" },
//	            { data: "findNumberOne" },
//	            { data: "findNumberTwo" },
//	            { data: "isUrgent" },
//	            { data: "remarks" }
//	        ],
//	        'language': {  
//	        	'info': '当前数据为从第 _START_ 到第 _END_ 条数据；总共有 _TOTAL_ 条记录',  
//	        	'infoEmpty': '没有数据',  
//	        	'infoFiltered': '(过滤总件数 _MAX_ 条)'  ,
//                'emptyTable': '没有数据',  
//                'loadingRecords': '加载中...',  
//                'processing': '查询中...',  
//                'search': '检索:',  
//                'lengthMenu': '每页 _MENU_ 件',  
//                'zeroRecords': '没有数据', 
//                'paginate': {  
//					"first":      "首页",
//					"last":       "尾页",
//					"next":       "下一页",
//					"previous":   "上一页"
//                },  
//	        }
//});
}); 
function search1()  
{  
    table.ajax.reload();  
}  

$("#banli").click(function(){
	var ids =$("input[type=checkbox]:checked");
				if(ids.length==0){
					layer.msg('请选择数据行!');
				}else if (ids.length==1){
					var option ={"ids": ids.val()};
					transaction(option);
				}else{
					var array = [];
					for(var i = 0 ; i <ids.length ;i++){
						array.push( ids[i].value);
					}
					var option ={"ids": array.toString()};
					transaction(option);
				}
	});

//获取选中的id
function checkValue() {
	var c_value = [];
	$('input[name="ids"]:checked').each(function() {
		c_value.push($(this).val());
	});
	return c_value;
}
//打开修改层
$("#exp").click(function() {
	$(this).attr("data-target","");
	//$(btn).attr("data-target","");
	var ids = checkValue();
	if (ids == "" || ids == null) {
		layer.msg("请至少选择一条数据!");
		return;
	}
	if (ids.length>1) {
		layer.msg("请至少选择一条数据!");
		return;
	}
	$(this).attr("data-target","#exption");
	//$(btn).attr("data-target","#exption");
	var url = "/visa/examine/examineScheduling/find.html?id=" + ids;
	$.ajax({
		url : url,
		async : false,
		dataType : "json",
		success : function(data) {
			$("#barCode").val(data.no);
			$("#code").val(data.barCode);
			$("#teamNo").val(data.teamNo);
			/*$("#goTime").val(data.goTime);*/
			$("#isUrgent").val(data.isUrgent);
			$("#description").val(data.remarks);
			

		}
	});
});
//
//$("#exp").click(function(){
//	$(this).attr("data-target","");
//	var ids =$("input[type=checkbox]:checked");
//	if(ids.length==0){
//			layer.msg('请选择数据!');
//	}else if (ids.length>1){
//			layer.msg('请选择一条数据!');
//	}else{
//		var Object = null;
//		var table = $('#datatable').dataTable();
//		var nTrs = table.fnGetNodes();//fnGetNodes获取表格所有行
//		alert(nTrs);
//		for(var i = 0; i < nTrs.length; i++){  
//	           var id = table.fnGetData(nTrs[i])['id'];
//	           if(id == ids.val()){
//	        	   Object = table.fnGetData(nTrs[i]);
//	           }
//	       }  
//		setValue(Object);
//		$(this).attr("data-target","#exption");
//	}
//});


//function setValue(Object){
//	$("#barCode").val(Object.barCode);
//	$("#code").val(Object.code);
//	$("#teamNo").val(Object.teamNo);
//	$("#goTime").val(Object.goTime);
//	$("#guestCount").val(Object.guestCount);
//	$("#isUrgent").val(Object.isUrgent);
//	$("#remarks").val(Object.remarks);
//}


		
function transaction(option){		
$.ajax({
	url:"/visa/examine/examineScheduling/transaction.html",
	type:"post",
	dataType:"json",
	data:option,
	success:function(result){
		if(result == "1"){
			msg('加急中，耐心等待!');
		}
	}
});
}

//提示
function msg(title) {
	layer.msg(title, {
		time : 1500,
	}, function() {
		location.reload();
	});
}
//全部人数
function renshu(){
	$('.aa').each(function() {
		var no=$(this).attr("no");
		var _this = $(this);
		$.ajax({
	        type: "POST",
	        url: "/visa/yueqian/team/findRenShu.html",
	        data: {no:no},
	        dataType: "json",
	        success: function(data){
	        	_this.html(data.findNumber);//0 未删除
	        	_this.next().html(data.findNumberOne).next().html(data.findNumberTwo);
	        	
	        }
	    });
	});
}

 
 
//全部人数
function renshu(){
	$('.aa').each(function() {
		var no=$(this).attr("no");
		var _this = $(this);
		
		$.ajax({
	        type: "POST",
	        url: "/visa/zlgly/dataDeliveryReceipt/findRenShu.html",
	        data: {no:no},
	        dataType: "json",
	        success: function(data){
	        	_this.html(data.findNumber);//0 未删除
	        	_this.next().html(data.findNumberOne).next().html(data.findNumberTwo);
	        	
	        }
	    });
	});
	
	
}

/*$(function() {
	
	
	
	

	
	
	
	
	$.ajax({
			url:"/visa/examine/examineScheduling/initialize.html",
			type:"post",
			dataType:"json",
			success:function(result){
				var dataStr =eval (result);
				init(dataStr);
			}
		
	});
});*/
/*


function init(dataStr){
	$('#datatable').dataTable({
		"order" : [ [ 1, 'asc' ] ],
		scrollCollapse : true,
		"sDom" : 't<"dt-panelfooter clearfix"ip>',
		pageLength:10,
		"bPaginate" : true,// 分页按钮
		 'pagingType' :'full_numbers',
		 data: dataStr,
		 bDestroy:true,
		 "aoColumnDefs" : [
				                   {'bSortable' : false,'aTargets' : [ 0 ],
				                	   "render": function ( data, type, full, meta ) {
                       	   					return "<input type='checkbox'  class='checkbox mn'  value='" + data + "' title='" + data + "' id='checkbox' />";
					                	   	}
				                   } ,
		                   ],
		 columns: [
		            {  data: "id"},
		            { data: "code" },
		            { data: "barCode" },
		            { data: "teamNo" },
		            { data: "goTime" },
		            { data: "guestCount" },
		            { data: "isUrgent" },
		            { data: "remarks" }
		        ],
		        select: {
		            style:    'os',
		            selector: 'td:first-child'
		        },
		        'language': {  
		        	'info': '第 _PAGE_ 页 / 总 _PAGES_ 页',  
		        	'infoEmpty': '没有数据',  
		        	'infoFiltered': '(过滤总件数 _MAX_ 条)'  ,
	                'emptyTable': '没有数据',  
	                'loadingRecords': '加载中...',  
	                'processing': '查询中...',  
	                'search': '检索:',  
	                'lengthMenu': '每页 _MENU_ 件',  
	                'zeroRecords': '没有数据', 
	                'paginate': {  
						"first":      "首页",
						"last":       "尾页",
						"next":       "下一页",
						"previous":   "上一页"
	                },  
		}
	});
}

$("#qbtn").click(function(){
	$("#datatable").dataTable().fnClearTable();
	$.ajax({
		url:"/visa/examine/examineScheduling/initialize.html",
		type:"post",
		dataType:"json",
		data:{"jjdNum":$("#jjdNum").val(),"tmNum":$("#tmNum").val()},
		success:function(result){
			var dataStr =eval (result);
			init(dataStr);
		}
	});
});




*/
	
	
		
		
		
	
	
	
	