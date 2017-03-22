/**
 * Created by Administrator on 2017/3/22.
 */

define(['jquery','template','ckeditor','region','validate','form','datepicker','language','uploadify'],function ($,template,CKEDITOR) {
    $.ajax({
        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success:function (data) {
            console.log(data);
            var html=template('settingsTpl',data.result);
            $('#putSettingsTpl').html(html);
        }
    })
})