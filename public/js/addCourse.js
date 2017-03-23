/**
 * Created by Administrator on 2017/3/22.
 */

define(['jquery','util','validate','form'],function ($,util) {
    util.setMenu('/course/add')
    $('#addCourseForm').validate({
        sendForm:false,
        valid:function () {
            $(this).ajaxSubmit({
                type:'post',
                url:'/api/course/create',
                // data:{cs_name:cs_name},      //在input标签内部通过name、value上传
                dataType:'json',
                success:function (data) {
                    if(data.code==200){
                        location.href='/course/basic?cs_id='+data.result.cs_id;
                    }
                }
            })
        }
    })
})