/**
 * Created by Administrator on 2017/3/22.
 */

define(['jquery', 'template', 'ckeditor', 'region', 'validate', 'form', 'datepicker', 'language', 'uploadify'], function ($, template, CKEDITOR ) {
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
                width:120,
                height:120,
                type:'post',
                buttonText: '',
                fileObjName: 'tc_avatar',
                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/avatar',
                onUploadSuccess : function(file,data){
                    data=JSON.parse(data);
                    $('.preview img').attr('src',data.result.path);
                }
            })
            
            // 添加日期插件
            
            // 添加省市县三级联动
            $('.hometown').region({
                url:'/public/assets/jquery-region/region.json'    //引入json文件
            })

            // 添加富文本插件
            CKEDITOR.replace('ckeditor',{
                toolbarGroups : [
                    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] }
                ]
            });
        }
    })
})