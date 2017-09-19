
/**
 * 
 * @param path 地址
 * @param title 弹出窗名称
 * @param width 
 * @param height
 * @param btn1
 * @param btn2
 * @param event 事件
 */
function openModal(path){
	createModal();
//	$("#myModalLabel").html(title);
//	$("#myModalDialog").css("width",width);
//	$("#myModalDialog").css("height",height);
//	$("#myModalBtn1").html(btn1);
//	$("#myModalBtn2").html(btn2);
	$("#myModalDialog").load(path,function(){});
	$('#myModal').modal({
		keyboard: true
	});
}


function createModal(){
	$("#myModal").remove();
	var htmlModal="<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">";
	htmlModal+="<div id=\"myModalDialog\">";
//	htmlModal+="<div class=\"modal-dialog\" id=\"myModalDialog\">";
//	htmlModal+="<div class=\"modal-content\">";
//	htmlModal+="<div class=\"modal-header\">";
//	htmlModal+="<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>";
//	htmlModal+="<h4 class=\"modal-title\" id=\"myModalLabel\"></h4>";
//	htmlModal+="</div>";
//	htmlModal+="<div class=\"modal-body\" id=\"myModalBody\"></div>";
//	htmlModal+="<div class=\"modal-footer\">";
//	htmlModal+="<button type=\"button\" class=\"btn btn-primary\" id=\"myModalBtn1\">提交更改</button>";
//	htmlModal+="<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"myModalBtn2\">关闭</button>";
//	htmlModal+="</div>";
//	htmlModal+="</div>";
//	htmlModal+="</div>";
	htmlModal+="</div>";
	htmlModal+="</div>";
	$("body").append(htmlModal);
}
function closeModal(){
	$('#myModal').hide();
}


function openIframe(title,path){
	layer.open({
		type: 2,
		title: title,
		area: ['100%', '100%'],
		skin: 'layui-layer-rim', //加上边框
		content: path
//      type: 2,
//      title: title,
//      shadeClose: true,
//      shade: false,
//      maxmin: true, //开启最大化最小化按钮
//      area: ['100%', '100%'],
//      content: path
		
//		type: 2,
//		title: title,
//		shadeClose: true,
//		area: ['100%', '100%'],
//		shade: 0.8,
//		closeBtn: 0,
//		shadeClose: true,
//		content: path
    });
}

function reclareLod(){
	$("#iframe")[0].contentWindow.rload();
}
function reclareLod1(cs){
	$("#iframe")[0].contentWindow.rload(cs);
}