

//$("th").setInput();

(function($){
	$.fn.extend({
	    "setInput": function () {
    		this.click(function(){
    			var flag = $(this).attr("flag");
    			console.log(flag);
    			if(flag == null || flag == "" || typeof(flag) == "undefined"){
    				$(this).attr("flag","true");
	    			var td = $(this);
	    			//保存td中的文本数据
	    			var text = Trim(td.text(),"g");
	    			//清空td中的数据
	    			td.text("");
	    			
	    			//利用JQuery插入一个input标签
	    			var input = $("<input>");
	    			//设置input标签中的值
	    			input.attr("value",text);
	    			input.attr("class","form-control input-sm");
	    			input.css("border","none");
	    			
	    			//给input注册键盘按下弹起事件
	    			input.keyup(function(event){
	    				//获取键盘按下的code值
	    				var key = event.keyCode;
	    				//判断是否是回车键
	    				if (key == 13){
	    					//获取input的value中值
	    					var ntext = input.val();
	    					//将input中的值赋给td
	    					td.html(ntext);
	    					$(td).attr("flag","");
	    				}
	    			});
	    			input.blur(function(event){
	    				//获取input的value中值
	    				var ntext = input.val();
	    				//将input中的值赋给td
	    				td.html(ntext);
	    				$(td).attr("flag","");
	    			});
	    			//将input标签添加到td中
	    			td.append(input);
	    			//将input中的内容选中
	    			input.get(0).select();
    			}
    		});
    		function Trim(str,is_global){
                var result;
                result = str.replace(/(^\s+)|(\s+$)/g,"");
                if(is_global.toLowerCase()=="g"){
                    result = result.replace(/\s/g,"");
                }
                return result;
            }
	    },
	    "setTextArea": function () {
    		this.click(function(){
    			var flag = $(this).attr("flag");
    			console.log(flag);
    			if(flag == null || flag == "" || typeof(flag) == "undefined"){
    				$(this).attr("flag","true");
	    			var obj = $(this);
	    			//保存div中的文本数据
	    			var text = ReplaceSeperator(obj.text());
	    			//清空div中的数据
	    			obj.empty();
	    			
	    			//利用JQuery插入一个input标签
	    			var textarea = $("<textarea></textarea>");
	    			//设置input标签中的值
	    			textarea.text(text);
	    			textarea.attr("class","form-control");
	    			textarea.attr("contenteditable","true");
	    			textarea.css("border","none");
	    			textarea.css("overflow-y","visible");
	    			textarea.css("width","100%");
	    			textarea.css("height","100%");
	    			textarea.css("background","#fafafa");
	    			
//	    			textarea.blur(function(event){
//	    				//获取input的value中值
//	    				var ntext = textarea.text();
//	    				alert("#############"+ntext)
////	    				var str = ntext.replace('/n', '<br>'); 
//	    				var str = ReplaceSeperator(ntext); 
//	    				alert(str)
//	    				obj.empty();
//	    				obj.append(str);
//	    				$(obj).attr("flag","");
//	    			});
	    			//将input标签添加到td中
	    			obj.append(textarea);
	    			textarea.focus();
    			}
    		});
    		function Trim(str,is_global){
                var result;
                result = str.replace(/(^\s+)|(\s+$)/g,"");
                if(is_global.toLowerCase()=="g"){
                    result = result.replace(/\s/g,"");
                }
                return result;
            }
    		function ReplaceSeperator(mobiles) {
    		    var i;
    		    var result = "";
    		    var c;
    		    for (i = 0; i < mobiles.length; i++) {
    		        c = mobiles.substr(i, 1);
    		        if (c == ";" || c == "," || c == "，" || c == "\n")
    		            result = result + "；";
    		        else if (c != "\r")
    		            result = result + c;
    		    }
    		    return result;
    		}
	    }
	});
})(jQuery);


/*
//json格式方式书写js函数的方法。如以下代码：

//jsJson.test1();//调用实例
var jsJson = function(){  
      return {  
            test1:function(){  
                alert("test1");  
            },  
            test2:function(){  
                alert("test2");  
        }  
      };  
}();  
*/

/*
//$("#modil").bold("a01","a02","a03");//调用实例
(function ($) {
  $.fn.extend({
    "bold": function () {
    	alert(arguments.length);
    	alert(arguments[0]);
    	alert(arguments[1]);
    	alert(arguments[2]);
      ///<summary>
      /// 加粗字体
      ///</summary>
      return this.css({ fontWeight: "bold" });
    }
  });
})(jQuery);
*/


/*

//调用实例
//var t = $myJs("modil");
//alert(t.html());
//t.html("hello");
//alert(t.html());
//调用实例

//防止命名冲突
(function(){
	//模拟jquery
	var myJs = function(selector){
		return new myJs.fn.init(selector);
	}

	myJs.fn = myJs.prototype = {
		init: function(selector) {
			if (typeof selector == "string") {
	        	this[0] = document.getElementById(selector);
	        	return this;
			}
		},
        html: function() {
        	//arguments对象是比较特别的一个对象，实际上是当前函数的一个内置属性。
            if (arguments.length == 0) {
                return this[0].innerHTML;
            }else {
                this[0].innerHTML = arguments[0];
            }
        },
        version: "8.8.8"
	}
	
	//为了使xjs实例对象继承xjs原型初始的里的方法和属性，通过把xjs原型赋给xjs对象
	myJs.fn.init.prototype = myJs.fn;
	
	//给myJs起个简单的别名如$
	window.$myJs = window.myJs = myJs;
})();
*/

/*

//js 封装方法
var myOpinion = myOpinion || {};
myOpinion.prototype={
	init:function(obj,i){
		obj.click(function(){
			alert('hello');
		});
	},
	closeWindow:function(obj,d){
		obj.click(function(){
			d.hide();
		});
	}
}

$(function(){
	var my = myOpinion.prototype;
	my.init($("tr"));
	$("#contact").add(my.closeWindow($("#modil"),$("#modilAdd")));
});
*/



/*

//js 封装方法
var klm = klm || {};

klm = (function(){
    //第一个写法
	klm.init = function(){
		alert('hello');
	}

    //第二个写法
	klm.browser = (function(ua){
		var b = {
			msie:/msie/.test(ua) && !/opera/.test(ua),
            opera:/opera/.test(ua),
            safari:/webkit/.test(ua) && !/chrome/.test(ua),
            firefox:/firefox/.test(ua),
            chrome:/chrome/.test(ua)
		};
	})(window.navigator.userAgent.toLowerCase());

	//将其定义方法以接口方式返回给外界引用
	return{
		init: klm.init,
        browser:klm.browser  
	}

})();
*/