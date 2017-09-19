var index = 1;
$(function(){
	msgcount();
	$('<audio id="chatAudio"><source src="/visa/bsound/5097.wav" type="audio/wav"> <source src="/visa/bsound/1689.wav" type="audio/wav"></audio>').appendTo('body');
});


function sendMessage() {
	dwrVehicleInfoService.perform();
}

function putInfo(serverdata) {
	$("#showdata").append(serverdata+"<br>");
}
function clientFunction(serverdata) {
	var msg = jQuery.parseJSON(serverdata);
	var str = "<tr>";
	str += "<td style='display: none;'>"+index+"</td>";
	str += "<td>"+msg.msg+"</td>";
	str += "<td>"+formatterdate(msg.msgdate)+"</td>";
	str += "<td><a href='javascript:void(0)' onclick='javascript:del("+index+",\""+msg.code+"\")'>X</a></td>";
	str += "</tr>";
	$("#messageId").prepend(str);
	msgcount();
	$('#chatAudio')[0].play(); //播放声音 
	$("#dock-image").animate({"scrollTop": $('#dock-image')[0].scrollHeight}, "slow");//调整滚动条
	index++;
}

function msgcount(){
	var table = $("#msgtable");
	var tbody=table.children("tbody");
	var tbodyTr = tbody.find("tr");
	if(tbodyTr.length == 0){
		var msg = "暂无消息";
		$(".title-text").empty();
		$(".title-text").append(msg);
	}else{
		var msg = "新消息("+tbodyTr.length+")";
		$(".title-text").empty();
		$(".title-text").append(msg);
	}
//		var testEle = document.getElementById("dock_title");  
//		alert(testEle.getAttribute("data-title")); //获取
//		testEle.setAttribute("data-title","aaa");  // 设置  
}

function formatterdate(v) {
	var date = new Date(v);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}

function del(i,code){
	var table = $("#msgtable");
	var tbody=table.children("tbody");
	var tbodyTr = tbody.find("tr");
	tbodyTr.each(function(){
		var tds = $(this).find("td");
		if($(tds[0]).html() == i){
			$(this).remove();
		}
	});
	msgcount();//更新消息提示
	var url = "/visa/sys/message/del.html?code="+code;
	$.ajax({
		url:url,
		success:function(data){
		}
	});
}

function getData(){
	var url = "/visa/sys/message/findMsgByadmin.html";
	$.ajax({
		url:url,
		success:function(data){
			data=jQuery.parseJSON(data);
			if(data.length == 0){
				$(".title-text").empty();
				$(".title-text").append("暂无消息");
			}else{
				var str = "";
				for(var i =0;i<data.length;i++){
					str += "<tr>";
					str += "<td style='display: none;'>"+index+"</td>";
					str += "<td>"+data[i].msg+"</td>";
					str += "<td>"+formatterdate(data[i].msgdate)+"</td>";
					str += "<td><a href='javascript:void(0)' onclick='javascript:del("+index+",\""+data[i].code+"\")'>X</a></td>";
					str += "</tr>";
					index++;
				}
				$("#messageId").append(str);
				msgcount();
				$('#chatAudio')[0].play(); //播放声音 
			}
		}
	});
}