/**
 * Created by Administrator on 2017/3/20.
 */

define(['jquery'],function ($) {
    return {
        setMenu:function (pathname) {
            $('.navs a[href="'+pathname+'"]').addClass('active').closest('ul').show();
        },
        paramValue:function (param) {
            var contentParam=location.search;
            var contentParam=contentParam.slice(1);
            var obj={};
            if(contentParam){
                var paramArr=contentParam.split('&');
                for(var i=0;i<paramArr.length;i++){
                    var pArr=paramArr[i].split('=');
                    // 把数组拆开后以键值对存入对象
                    obj[pArr[0]]=pArr[1];
                }
            }
            return obj[param];
        }
    }
})