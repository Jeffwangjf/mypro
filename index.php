<?php

    //index.php后面的文件路径

    $path='index';          //定义变量，表示路径
    $filename='index';      //定义变量，表示文件名称
	if(array_key_exists('PATH_INFO',$_SERVER)){      //判断$_SERVER数组中是否存在PATH_INFO属性
	    $url=$_SERVER['PATH_INFO'];      //将数组中的属性值取出
	    $str=substr($url,1);            //去掉第一个字符/
	    $arr=explode('/',$str);         //以/对字符串进行切割
	    if(count($arr)==2){             //判断是否存在两级路径
	        $path=$arr[0];              //分别赋值
	        $filename=$arr[1];
	    }
	}else {
	    $filename='login';        //表示登录页面
	}
    include('./view/'.$path.'/'.$filename.'.html');      //include载入页面
?>