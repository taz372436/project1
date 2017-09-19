;(function($, window, document, undefined){
		var tbody = $('#datatable > tbody');
		var rows = tbody.children();
		var selectedRows = new Array(1);
		var _move=false;//移动标记
		var index;
		
		var strDiv = "<div class='dragdiv alpha1'><table width='100%' class='table'><tbody id='div_table'></tbody></table></div>";
		$(document.body).append(strDiv); 
//		var parentdiv=$(strDiv);        //创建一个父div
//    	parentdiv.attr('id','parent');        //给父div设置id
//    	parentdiv.addclass('parentdiv');    //添加css样式
//    	var childdiv=$('<div></div>');        //创建一个子div
//    	childdiv.attr('id','child');            //给子div设置id
//    	childdiv.addclass('childdiv');    //添加css样式
//    	childdiv.appendto(parentdiv);        //将子div添加到父div中
//		var drag = function(id){
//		parentdiv.appendto('body');            //将父div添加到body中
		
		$(document).bind("contextmenu",function(e){
	        return false;
	    });
		
		$(function(){
			onBuildDrag();
		})
		
		//压下鼠标时选取行
		rows.dblclick(function(e){
			rows.unbind("mousedown");
			rows.unbind("mousemove");
			rows.unbind("mouseup");
			layer.msg("允许编辑内容");
			rows.mousedown(function(e){
				if(e.which == 3){
					onBuildDrag();
					layer.msg("禁止编辑内容");
				}
			});
		});
		
		function onBuildDrag(){
			//压下鼠标时选取行
			rows.mousedown(function(e){
				if(e.which == 1){
					$("#div_table").empty();
					_move=true;
					index = $(this).index();
					var group = $(this).attr("group");
					if(group == "true"){
						var groupId = $(this).attr("groupId");
						rows.each(function(){
							if(groupId == $(this).attr("groupId")){
								$("#div_table").append("<tr>"+$(this).html()+"</tr>");
								selectedRows.push(this);
							}
						});
					}else{
						$("#div_table").append("<tr>"+$(this).html()+"</tr>");
						selectedRows.push(this);
					}
					tbody.css('cursor', 'move');
					
					$(".dragdiv").css({top:e.pageY-10,left:23});
					return false;    //防止拖动时选取文本内容，必须和 mousemove 一起使用 
				}
			});
			rows.mousemove(function(e){
				if(_move){
					$(".dragdiv").css("display","block");
					$(".dragdiv").css({top:e.pageY-10,left:23});//控件新位置  
				}
				return false;//防止拖动时选取文本内容，必须和 mousedown 一起使用 
			});
			//释放鼠标键时进行插入 
			rows.mouseup(function(){
				if(selectedRows.length > 0){
					if(index == $(this).index()){
						flag=false;
						_move=false;
						$(".dragdiv").css("display","none");
						tbody.css('cursor', 'default');
						selectedRows = new Array(1);
						return;
					}
					var group = $(this).attr("group");
					if(group == "true"){
						_move=false;
						$(".dragdiv").css("display","none");
						tbody.css('cursor', 'default');
						selectedRows = new Array(1);
						layer.msg("不能移动到合并单元格的行！");
						return;
					}
					var lastIndex = $(tbody).find('tr:last').index();
					var flag = true;
					if(lastIndex == $(this).index()){
						for(var j = selectedRows.length;j>0;j--){
							$(this).after($(selectedRows[j])); //插入 
						}
						flag=false;
					}
					
					if($(this).index() == 0){
						for(var j = 0;j<selectedRows.length;j++){
							$(this).before($(selectedRows[j])); //插入 
						}
						flag=false;
					}
					
					if(flag){
						if(index < $(this).index()){
							for(var j = selectedRows.length;j>0;j--){
								$(this).after($(selectedRows[j])); //插入 
							}
						}else{
							for(var j = 0;j<selectedRows.length;j++){
								$(this).before($(selectedRows[j])); //插入 
							}
						}
					}
					tbody.css('cursor', 'default');
					selectedRows = new Array(1);
					sortIndex();
				}
				_move=false;
				$(".dragdiv").css("display","none");
			});
			
			//标示当前鼠标所在位置 
			rows.hover(
				function(){
					$(this).addClass('mouseOver');    //区分大小写的，写成 'mouseover' 就不行
				},
				function(){
					$(this).removeClass('mouseOver');
				}
			);
			
			//当用户压着鼠标键移出 tbody 时，清除 cursor 的拖动形状，以前当前选取的 selectedRow             
			tbody.mouseover(function(event){
				event.stopPropagation(); //禁止 tbody 的事件传播到外层的 div 中 
			});
		}
		
		function sortIndex(){//重置序号
			var index=1;
			var tbody = $('#datatable > tbody');
			var rows = tbody.children();
			rows.each(function(){
				var tds = $(this).children();
				$(tds[0]).find("span").html(index);
				index++;
			});
		}
})(window.jQuery || window.Zepto, window, document);
