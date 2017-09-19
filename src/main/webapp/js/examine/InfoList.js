var pageIndex = "1";
var sortIndex = -1;


$(function(){
	var fid = $("#fid").val();
	$.ajax({
		url:"/visa/examine/InfoConfirm/getGestInfo.html",
		type:"post",
		dataType:"json",
		data:{"id":fid},
		success:function(result){
			var dataStr =eval (result);
			init(dataStr);
		},
	});
	
	findInfo();
});


function init(dataStr){
	$('#datatable').dataTable({
		"aoColumnDefs" : [ {
			'bSortable' : false,
			'aTargets' : [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
		} ],
 		"order" : [], 
		scrollCollapse : true,
		"bPaginate": false, //翻页功能 
		"sDom" : 't<"dt-panelfooter clearfix"ip>',
		"bInfo": true,//页脚信息 
		 data: dataStr,
		 columns: [
		            //{  data: "id"},
		            { data: "name" },
		            { data: "hzCode" },
		            { data: "jjdCode" },
		            { data: "teamCode" },
		            { data: "jdCode" },
		            { data: "checkUser" },
		            { data: "money" },
		            { data: "guarantee" },
		            { data: "remark" }
		        ],
		        select: {
		            style:    'os',
		            selector: 'td:first-child'
		        },
		        'language': {  
		        	'info': '合计人数： _TOTAL_人 ',  
		        	'infoEmpty': '没有数据',  
		        	'infoFiltered': '(过滤总件数 _MAX_ 条)'  ,
	                'emptyTable': '没有数据',  
	                'loadingRecords': '加载中...',  
	                'processing': '查询中...',  
	                'search': '检索:',  
	                'lengthMenu': '每页 _MENU_ 件',  
	                'zeroRecords': '没有数据',  
	                'paginate': {  
	                },  
		}
	});
}

//数据
function data(list) {
	var type =$("#type").val().replace(/(^\s*)|(\s*$)/g, ''); ;
	var str = "";
	for ( var i = 0; i < list.length; i++) {
		var ttype =list[i].confim_type;
		str += "<tr>";
		if(ttype===type){
			str += "<td><label class=\"option block mn\"><input type=\"checkbox\"  checked='checked'  name=\"ids\" value=\""+list[i].id+"\"><span class=\"checkbox mn\"></span></label></td>";
		}else{
			str += "<td><label class=\"option block mn\"><input type=\"checkbox\"   disabled='disabled' name=\"ids\" value=\""+list[i].id+"\"><span class=\"checkbox mn\"></span></label></td>";
		}
		
		str += "<td>" + list[i].role + "</td>";
		str += "<td>" + list[i].confim_type + "</td>";
		if(list[i].cf_user == undefined){
			str += "<td></td>";
		}else{
			str += "<td>" + list[i].cf_user + "</td>";
		}
		
		if(list[i].confim_date == undefined){
			str += "<td></td>";
		}else{
			str += "<td>" + list[i].confim_date + "</td>";
		}
		if(ttype===type){
			if(list[i].gest_amount == undefined){
				str += "<td><input type ='text' value=''/></td>";
			}else{
				str += "<td><input type ='text' value='" + list[i].gest_amount+ "'/></td>";
			}
			if(list[i].protection_amount == undefined){
				str += "<td><input type ='text' value=''/></td>";
			}else{
				str += "<td><input type ='text' value='" + list[i].protection_amount+ "'/></td>";
			}
			if(list[i].remarks == undefined){
				str += "<td><input type ='text' value=''/></td>";
			}else{
				str += "<td><input type ='text' value='" + list[i].remarks + "'/></td>";
			}
		}else{
			if(list[i].gest_amount == undefined){
				str += "<td></td>";
			}else{
				str += "<td>" + list[i].gest_amount + "</td>";
			}
			if(list[i].protection_amount == undefined){
				str += "<td></td>";
			}else{
				str += "<td>" + list[i].protection_amount+ "</td>";
			}
			if(list[i].remarks == undefined){
				str += "<td></td>";
			}else{
				str += "<td>" + list[i].remarks+ "</td>";
			}
		}
		str += "</tr>";
	}
	return str;
}
//分页
function findInfo() {
	var teamNo = $("#id_team_no").val();
	var url = "/visa/examine/InfoConfirm/findInfo.html?teamno="+teamNo;
	alert(url);
	$.ajax({
		url:url,
		dataType:"json",
		success:function(result){
			var html = data(result);
			alert(html);
			document.getElementById('tttt').innerHTML = html;
		}
	});
};
//格式化日期
function formatterdate(val, row) {
	if (val != null && val != "") {
		var date = new Date(val);
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	} else {
		return "";
	}
}
//全选
function onAll(obj){
	var list = $("input[name = ids]");
	for(var i = 0;i<list.length;i++){
		list[i].checked=obj.checked;
	}
}

//获取选中的id
function checkValue() {
	var c_value = [];
	$('input[name="ids"]:checked').each(function() {
		c_value.push($(this).val());
	});
	return c_value;
}

function save(type,no){
		var tr = $("#confim").children("tbody").find('tr');
		var list =[] ;
		var teamNo =$("#teamNo").val();
		tr.each(function() {
			var tds = $(this).find('td');
			var input = $(tds[0]).find("label").find("input[type='checkbox']");
					var  arr =null;
				if(input[0].checked){
					var text5 = $(tds[5]).find("input[type='text']");
					var text6 = $(tds[6]).find("input[type='text']");
					var text7 = $(tds[7]).find("input[type='text']");
					arr ={
							teamCode:teamNo,
							id:input[0].value,
							role:$(tds[1]).text(),
							confimType:$(tds[2]).text(),
							cfUser:$(tds[3]).text(),
							//confimDate:$(tds[4]).text(),
							gestAmount:text5[0].value,
							protectionAmount:text6[0].value,
							remarks:text7[0].value 
							}
				}
				if(arr!=null){
				list.push(arr);
				}
		});
		var json = JSON.stringify(list);
		$.ajax({
			url:"/visa/examine/InfoConfirm/save.html",
			type:"post",
			dataType:"json",
			data:"json="+json+"&type="+type+"&no="+no,
			success:function(result){
					layer.msg("保存成功!");
					pageAjax();
			}
		});
}




















