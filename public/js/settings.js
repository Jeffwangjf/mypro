/**
 * Created by Administrator on 2017/3/22.
 */

define(['jquery', 'template', 'ckeditor', 'region', 'validate', 'form', 'datepicker', 'language', 'uploadify'], function ($, template, CKEDITOR, uploadify) {
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var html = template('settingsTpl', data.result);
            $('#putSettingsTpl').html(html);

            // 执行图片上传
            $('#upfile').uploadify({
                swf: '/public/assets/uploadify/uploadify.swf',
                width:120,
                height:120,
                type:'post',
                buttonText: '',
                fileObjName: 'tc_avatar',
                data:{tc_avatar:'tc_avator'},
                uploader: '/api/uploader/avatar',
                onUploadSuccess : function(file,data){
                    console.log(data);  //???????????????????????
                }
            })


        }
    })
})