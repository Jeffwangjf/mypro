
	define(['jquery','echarts','template','util','cookie','overlay'],function ($,echarts,template,util) {

		// 左边栏的列表显示隐藏---------------------------------------------------------------

		$('.navs ul').prev('a').on('click', function () {
			$(this).next().slideToggle();
		});

		// 跳转登录页-------------------------------------------------------------------------

		var pathname=location.pathname;		//获取请求url中的路径部分
		var flag=$.cookie('PHPSESSID');		//使用jQuery获取cookie中的PHPSESSIONID
		if( !flag && pathname.indexOf('login') == -1 ){		//cookie中没有sessionid且路径中没有login
			location.href='/login';
		}

		// 登录功能-------------------------------------------------------------------------

		$('#loginForm').submit(function () {    //为表单绑定提交事件
			var formData=$(this).serialize();   //获取表单输入信息
			$.ajax({                            //发送ajax请求
				type:'post',
				url:'/api/login',               //反向代理解决跨域
				data:formData,                  //将表单信息发送
				dataType:'json',                //json格式的数据
				success:function (data) {       //请求成功
					if(data.code==200){
						var result=JSON.stringify(data.result);
						$.cookie('result',result,{path:'/'});
						location.href='/index/index';
					}
				},
				error:function (data) {
					alert('用户名或密码错误，请重新输入');
					$('#loginForm').find('input').val('');  //获取input,清空内容
				}
			});
			return false;	//阻止默认跳转行为
		});

		// 退出登录功能-------------------------------------------------------------------------

		$('#logoutId').click(function () {
			$.ajax({
				type:'post',
				url:'/api/logout',
				dataType:'json',
				success:function (data) {
					if(data.code==200){
						location.href='/login';
					}
				}
			})
		})

		// 用户信息变更-------------------------------------------------------------------------

		// var resultObj=JSON.parse($.cookie('result'));   //将cookie中的result属性值装换成对象格式
		// $('.aside>.profile>.avatar>img').attr('src',resultObj['tc_avatar']);
		// $('.aside>.profile>h4').html(resultObj['tc_name']); //设置图片路径和用户名


		// 尝试使用模板渲染用户信息
		var resultObj=JSON.parse($.cookie('result'));
		var tem=' <div class="avatar img-circle">'+
			'<img src="{{tc_avatar}}">'+
			'</div>'+
			'<h4>{{tc_name}}</h4>';				//省去创建模板的步骤
		var render=template.compile(tem);		//调用template的compile方法，传入拼接字符串，返回一个函数
		var html=render(resultObj);				//解析数据
		$('.aside>.profile').html(html);		//渲染页面


		// 点击列表高亮显示
		util.setMenu(location.pathname);

	})
