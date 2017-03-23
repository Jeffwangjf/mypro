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
            });
            
            // 添加日期插件
            
            // 添加省市县三级联动
            $('.hometown').region({
                url:'/public/assets/jquery-region/region.json'   
            });

            // 添加富文本插件
            CKEDITOR.replace('ckeditor',{
                toolbarGroups : [
                    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] }
                ]
            });
            
            // 表单验证

            // var tcId=data.result.tc_id;
            $('#settingsFormId').validate({
                sendForm:false,             //此处false没有引号**************
                valid:function () {
                    // 同步更新富文本的内容变化
                    for(var instance in  CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    //拼接省市县
                    var p=$('#p option:selected').text();
                    var c=$('#c').find(' option:selected').text();
                    var d=$('#d').find(' option:selected').text();
                    var hometown=p+'|'+c+'|'+d;
                    $(this).ajaxSubmit({
                        type : 'post',
                        url : '/api/teacher/modify',
                        data : {tc_hometown : hometown},
                        dataType : 'json',
                        success : function(data){
                            if(data.code == 200){
                                location.href = '/index/settings';
                            }
                        }
                    });
                }
            })
        }
    })
})