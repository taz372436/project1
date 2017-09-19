$(document).ready(function() {
  
	execute(null);
} );

function execute(dataStr){
	    $('#example').dataTable({
			searching:false,
			processing:true,
			ordering:true,
			lengthChange:false,
			//lengthMenu:5,
			pageLength:2,
			pagingType:'full_numbers', //  full   simple  full_numbers
			language:{ //国际化
					"decimal":        "",
					"emptyTable":     "没有数据",
					"info":           "第 _PAGE_ 页 / 总 _PAGES_ 页",
					"infoEmpty":      "没有数据",
					"infoFiltered":   "(过滤总件数 _MAX_ 条)",
					"infoPostFix":    "",
					"thousands":      ",",
					"lengthMenu":     "Show _MENU_ entries",
					"loadingRecords": "加载中...",
					"processing":     "查询中...",
					"search":         "检索:",
					"zeroRecords":    "没有数据",
					"paginate": {
						"first":      "首页",
						"last":       "尾页",
						"next":       "下一页",
						"previous":   "上一页"
					},
				}
	});
}
