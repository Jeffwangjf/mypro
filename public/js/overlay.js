/**
 * Created by Administrator on 2017/3/20.
 */
define(['jquery','nprogress'],function ($,nprogress) {
    $(document).ajaxStart(function () {
        $('.overlay').show();
    });
    $(document).ajaxStop(function () {
        $('.overlay').hide();
    })
    
    // 进度条
    nprogress.start();
    nprogress.done();

    
})