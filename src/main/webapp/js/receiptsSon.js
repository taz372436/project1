		var tidindex=1;
		var tableid ="";//表格id
		var singleState="";//状态
		var transferNum = "";//资料交接单编号
		var teamNo = "";//团号
		var Hzd=function(){
			return {
		    	init:function(a,b,c,d){
		    		tableid=a;
		    		singleState=b;
		    		transferNum=c;
		    		teamNo=d;
		            
		    		findZlhzd(transferNum,1);
		    		findZlhzd(transferNum,2);
		    		findZlhzd(transferNum,3);
	
	//	    		$('#nestable-contextual').nestable({
	//	    			group: 1
	//	    		}).on('change', updateOutput);
		    		
		    		//默认关闭
	//	    		$('#nestable-contextual').nestable({
	//	    			group: 1
	//	    		}).on('mousedown', function(e){
	//                    e.stopPropagation();
	//                });
	                $('#nestable-contextual').nestable("collapseAll");
	                
	//	            updateOutput($('#nestable-contextual').data('output', $('#nestable-output3')));
		    	}
		    }
		}();
		
        
        function onInput(btn,id){
        	if($(btn).attr("class") == "glyphicons glyphicons-circle_ok"){
        		return;
        	}
        	var en_name = $(btn).parent("div").parent("td").attr("en_name");
        	//弹窗事件，这个方法是预定好了的
        	$('#myModal').modal('show');
        	$('#miaoshu').val($("#"+id).val());
        	$('#buhege option').each(function(){
        		if($(this).val()==$("#"+id).attr("opt_val")) {
        			$(this).attr("selected", true);
        		}
        	});
        	
        	$("#btn_id").val(id);
        	$("#en_name").val(en_name);
        	$("#en_name_idx").val($(btn).parents("tr").index());
        	
        }
        
        function onIcon(obj){
        	var id = $(obj).attr("unqualifiedCauseId");
        	if($(obj).is(':checked')){
        		$(obj).parent().next("span").attr("class","glyphicons glyphicons-circle_ok");
        	}else{
        		if($("#"+id).val() == ""){
	        		$(obj).parent().next("span").attr("class","glyphicons glyphicons-pencil");
        		}else{
	        		$(obj).parent().next("span").attr("class","glyphicons glyphicons-table");
        		}
        	}
        }
        
        // 查询回执单
        function findZlhzd(transferNum,singleState){
        	var url = "/visa/csgl/confirmation/findZlhzd.html?transferNum="+transferNum+"&singleState="+singleState;
        	$.ajax({
				url:url,
				dataType:"json",
				success:function(data){
					var str = generateHtml(data);
					if(singleState == "1"){
						$("#csschzd").html(str);
					}else if(singleState == "2"){
						$("#ckschzd").html(str);
					}else if(singleState == "3"){
						$("#zzlschzd").html(str);
					}
				}
			});
        }
      	// 格式化日期
		function formatterdate(val, row) {
			if (val != null && val != "") {
				var date = new Date(val);
				return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+ " "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
			} else {
				return "";
			}
		}
      	// 生成HTMLd
        function generateHtml(data){
        	var sHtml = '';
        	for(var i=0;i<data.length;i++){
	        	sHtml += '<li class="dd-item" data-id="14">';
	        	sHtml += '<div class="dd-handle dd-nodrag" style="height:45px;line-height:30px;"><b>回执单号:</b>'+data[i].single_receipt_num+'&nbsp;&nbsp;&nbsp;<b>生成日期:</b>'+formatterdate(data[i].single_time)+'&nbsp;&nbsp;&nbsp;<b>制单人:</b>'+data[i].single_player+'<a style="float:right;" class="btn btn-default light btn-sm DTTT_button_copy" onclick="javascript:jjbl(\'hzdtable'+tidindex+'\')"/">保存</a></div>';
	        	sHtml += '<div class="dd-content">';
//	        	sHtml+='<a class="btn btn-default light btn-sm DTTT_button_copy" id="updButton" tabindex="0" aria-controls="datatable3"	data-toggle="modal" style=" margin-right: 10px" onclick="javascript:jjbl(\'hzdtable'+tidindex+'\')"/"><span>催办</span></a>';
	        	sHtml += '<table id="hzdtable'+tidindex+'" class="table table-striped table-bordered table-hover admin-form theme-warning">';
	        	sHtml += thread();
	        	sHtml += tbody(data[i].detailedList);
	        	sHtml += '</table>';
	        	sHtml += '</div>';
	        	sHtml += '</li>';
	    		tidindex++;
	
        	}
        	return sHtml;
        }
        
        function thread(){
        	var sHtml ='<thead>';
        	sHtml +='<tr>';
        	sHtml +='<th style="width: 10px;"></th>';
        	sHtml +='<th>客人姓名</th>';
        	sHtml +='<th>不合格项</th>';
        	sHtml +='<th>不合格原因</th>';
        	sHtml +='<th>是否补齐</th>';
        	sHtml +='<th>是否2次</th>';
        	sHtml +='<th>补齐类型</th>';
        	sHtml +='</tr>';
        	sHtml +='</thead>';
        	return sHtml;
        }
        function dy(aa){
        	var url="/visa/csgl/dataSingleReceipt/listPageSon.html?id="+aa;
			window.open(url);
        }
        
        function tbody(list){
        	var sHtml ='<tbody>';
        	for(var i=0;i<list.length;i++){
	        	sHtml +='<tr>';
	        	sHtml +='<td style="width: 10px;">'+(i+1)+'</td>';
	        	sHtml +='<td>'+list[i].guestName+'</td>';
	        	sHtml +='<td>'+list[i].unqualifiedItem+'</td>';
	        	sHtml += '<td><input type="text" value="'+list[i].unqualifiedCause+'"></td>'
	        	//sHtml +='<td>'+list[i].unqualifiedCause+'</td>';
	        	if( list[i].whetherFilled==0){
	        		sHtml += '<td>'+
		  					'<select class="form-control input-sm">'+
		  					'<option value="0" >否</option>'+
		  					'<option value="1" >是</option></select>'+
							'</td>';
				}
				if( list[i].whetherFilled==1){
					sHtml += '<td>'+
  						'<select class="form-control input-sm">'+
  						'<option value="1" >是</option>'+
  						'<option value="0" >否</option>'+
  						'</select>'+
  						'</td>';
				}
				sHtml += "<td>";
				if(list[i].twCishu==1){
					sHtml += "<div class='admin-form theme-warning tc-checkbox-1'><label style=\"width: 21px;\"  class=\"option\"><input checked=\"checked\" type=\"checkbox\" name=\"ids\" value=\""+list[i].twCishu+"\" ><span class=\"checkbox\"></span></label></div>";
				}else if(list[i].twCishu==0){
					sHtml += "<div class='admin-form theme-warning tc-checkbox-1'><label style=\"width: 21px;\"  class=\"option\"><input type=\"checkbox\" name=\"ids\" value=\""+list[i].twCishu+"\" ><span class=\"checkbox\"></span></label></div>";
				}
				sHtml += "</td>" ;
	        	sHtml +='<td>'+filledType(list[i].filledType)+'</td>';
	        	sHtml += '<td style="display:none"><input type="hidden" value='+list[i].id+' name="id"></td>';
	        	sHtml +='</tr>';
        	}
        	sHtml +='</tbody>';
        	return sHtml;
        }
        // 是否补齐
        function iswhetherFilled(v){
        	if(v==1){
        		return "是";
        	}else{
        		return "否";
        	}
        }
        
        // 补齐类型
        function filledType(v){
        	if(v==0){
        		return "必补资料";
        	}else if(v==1){
        		return "送审有风险";
        	}else if(v==2){
        		return "不合规，但送审能通过";
        	}else if(v==3){
        		return "假补真";
        	}else if(v==4){
        		return "假可送";
        	}
        }
        //保存
    	function jjbl(tid) {
        	var table = $("#"+tid);
       	    var tbody = table.children("tbody");
       	    var tr = tbody.find("tr");
       	    var list =[] ;
			tr.each(function() {
						var tds = $(this).find('td');
						var id=$(tds[7]).find("input[name='id']").val();
						var text5 =$(tds[4]).find("select").val();
						var text3 =$(tds[3]).find("input").val();
						var test6=$(tds[5]).find("input").is(":checked");
						var text7 ="";
						if(test6==true){
							text7=1;
						}else if(test6==false){
							text7=0;
						}
		    	var arr={whetherFilled:text5,id:id,unqualifiedCause:text3,twCishu:text7};
		    	if(arr!=null){
		    		list.push(arr);
				}
			});
			var json = JSON.stringify(list);
		 	var url= "/visa/csgl/confirmation/saveCsHzd.html";
			$.ajax({
				url : url,
				dataType:"json",
				data:"json="+json,
				type : 'POST',
				async : false,
				success : function(data) {
					if (data == "1") {
						layer.msg('保存成功!');
					} else {
						layer.msg('保存失败!');
					}
				}
			});  
		} 
    	function aa(){
    		alert(1);
    		$('input[name="ids"]:checked').val(1);
    	}
    	//获取选中的id
		function checkValue22() {
			var c_value = [];
			$('input[name="ids"]:checked').each(function() {
				c_value.push($(this).val());
			});
			return c_value;
		}
