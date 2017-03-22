/**
 * Created by Administrator on 2017/3/18.
 */
require.config({
    baseUrl:'/public',      //自定义依赖的根路径
    paths:{
        jquery: 'assets/jquery/jquery.min',
        cookie: 'assets/jquery-cookie/jquery.cookie',
        echarts: 'assets/echarts/echarts.min',
        template:'assets/artTemplate/template',
        bootstrap:'assets/bootstrap/js/bootstrap',
        nprogress:'assets/nprogress/nprogress',
        datepicker:'assets/bootstrap-datepicker/js/bootstrap-datepicker',
        language:'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        validate:'assets/validate/jquery-validate',
        form : 'assets/jquery-form/jquery.form',
        util:'js/util',
        overlay:'js/overlay',
    },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        language:{
            deps:['jquery','datepicker']
        },
        validate:{
            deps:['jquery']
        }
    }
})