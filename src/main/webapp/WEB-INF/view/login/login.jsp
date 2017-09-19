<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<!-- Meta, title, CSS, favicons, etc. -->
<meta charset="utf-8">
<title>taz的系统</title>
<meta name="keywords" content="HTML5 Bootstrap 3 Admin Template UI Theme" />
<meta name="description" content="AdminDesigns - SHARED ON THEMELOCK.COM">
<meta name="author" content="AdminDesigns">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800'>
<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Roboto:400,500,700,300">

<!-- Theme CSS -->
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/skin/default_skin/css/theme.css">
<%-- <link href="<%=request.getContextPath()%>/static/js/bootstrap/css/bootstrap.min.css" rel="stylesheet"> --%>
<!-- Admin Forms CSS -->
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/assets/admin-tools/admin-forms/css/admin-forms.css">

<link rel="shortcut icon" href="/project1/css/favicon.ico" type="image/x-icon" />
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
<style type="text/css">

/*    .mb15{ */
/*      margin-bottom: -30px; */
/*    } */
</style>
</head>

<body class="external-page sb-l-c sb-r-c">
	<!-- Start: Main -->
	<div id="main" class="animated fadeIn">
		<!-- Start: Content-Wrapper -->
		<section id="content_wrapper">
			<!-- begin canvas animation bg -->
			<div id="canvas-wrapper">
				<canvas id="demo-canvas"></canvas>
			</div>
			<!-- Begin: Content -->
			<section id="content">
				<div class="admin-form theme-info" id="login1"
					style="max-width: 600px;">
					<div class="row table-layout"
						style="margin-bottom: -30px; margin-left: -30px;">
						<div class="col-xs-6 va-m pln" style="float: left">
							<img src="<%=request.getContextPath()%>/assets/img/logos/ptwlogo.png" title="凤凰logo" class="img-responsive w250">
						</div>
					</div>
					<div class="panel panel-info mt10 br-n">
						<div class=" heading-border "></div>
						<!-- end .form-header section -->
						<form method="post" id="contact" action="/visa/sys/admin/login.html">
							<div class="panel-body bg-light "
								style="padding: 30px 30px 20px 30px">
								<div class="row">
									<div class="col-sm-7 pr30">
										<div class="section">
											<label for="username"
												class="field-label text-muted fs18 mb10">用户名</label> <label
												for="username" class="field prepend-icon"> <input
												type="text" name="userName" id="userName" class="gui-input"
												placeholder="用户名"> <label for="username"
												class="field-icon"><i class="fa fa-user"></i> </label> </label>
										</div>
										<!-- end section -->

										<div class="section">
											<label for="username"
												class="field-label text-muted fs18 mb10">密码</label> <label
												for="password" class="field prepend-icon"> <input
												type="password" name="userPassword" id="userPassword"
												class="gui-input" placeholder="密码"> <label
												for="password" class="field-icon"><i
													class="fa fa-lock"></i> </label> </label>
										</div>
										<!-- end section -->

									</div>
								</div>
							</div>
							<!-- end .form-body section -->
							<div class="panel-footer clearfix p10 ph15">
								<button type="button" class="button btn-primary mr10 pull-right" onclick="login();">登录</button>
							</div>
							<!-- end .form-footer section -->
						</form>
					</div>
				</div>

			</section>
			<!-- End: Content -->

		</section>
		<!-- End: Content-Wrapper -->

	</div>
	<!-- End: Main -->

	<!-- BEGIN: PAGE SCRIPTS -->

	<!-- jQuery -->
	<script type="text/javascript" src="<%=request.getContextPath()%>/vendor/jquery/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/vendor/jquery/jquery_ui/jquery-ui.min.js"></script>

	<!-- Bootstrap -->
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/bootstrap/bootstrap.min.js"></script>

	<!-- Page Plugins -->
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/pages/login/EasePack.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/pages/login/rAF.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/pages/login/TweenLite.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/pages/login/login.js"></script>

	<!-- Theme Javascript -->
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/utility/utility.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/main.js"></script>
	<!-- layer -->
	<script type="text/javascript" src="<%=request.getContextPath()%>/layer/layer.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-form.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/demo.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/CookieUtil.js"></script>

	<!-- Page Javascript -->
	<script type="text/javascript">
		jQuery(document).ready(function() {

			"use strict";
			Core.init();
			Demo.init();
			CanvasBG.init({
				Loc : {
					x : window.innerWidth / 2,
					y : window.innerHeight / 3.3
				},
			});

		});

		$("body").keyup(function() {
			if (event.keyCode == 13) {
				login();
			}
		});
		
		function login() {
			var username = $('#userName').val();
			var password = $('#userPassword').val();
			if (username == null || username == "") {
				layer.msg("用户名不能为空！");
				return;
			}
			if (password == null || password == "") {
				layer.msg("密码不能为空!");
				return;
			}
			login_a();
// 			isCookidSession(username);

		}
		
		function isCookidSession(username){
			var url = "/visa/sys/admin/isCookidSession.html?username=" + username;
			$.ajax({
				type : "POST",
				url : url,
				success : function(data) {
					if (data == '1') {
						login_a();
					}
					if (data == '2') {
						window.location.href = '/visa/main/index.html';
					}
					if (data == '3') {
						layer.msg("已存在登陆的用户，请退出后重新登录。");
					}
				}
			});
		}
		
		function login_a(){
			var param = $("#contact").serialize();
			var url = "/project1/login/check.html?" + param;
			$.ajax({
				type : "POST",
				url : url,
				success : function(msg) {
					if (msg == 'success') {
// 						document.cookie = 'loginName=' + username;
						CookieUtil.set("loginName",username);
						window.location.href = '/visa/main/index.html';
					} else {
						layer.msg(msg);
						return;
					}
				}
			});
		}
	</script>

	<!-- END: PAGE SCRIPTS -->

</body>

</html>
