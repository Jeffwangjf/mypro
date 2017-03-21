/**
 * Created by Administrator on 2017/3/21.
 */

define(['jquery','util','template', 'datepicker', 'language','validate'], function ($,util,template) {

    // 编辑页面

    var tc_id=util.paramValue('tc_id');
    if(tc_id){
        $.ajax({
            type:'get',
            url:'/api/teacher/edit',
            data:{tc_id:tc_id},
            dataType:'json',
            success:function (data) {
                // 给响应的数据添加自定义属性值
                data.result.titleInfo='编辑';
                data.result.btnInfo='保 存';
                // 根据响应的数据填充模板内容
                console.log(data.result);
                // 解析模板
                var html=template('addTeacherFormTempalte',data.result);
                // 渲染到相应位置
                $('#addTeacherPage').html(html);
            }
        })
    }else {

    // 添加页面

        // 解析模板
        var html=template('addTeacherFormTempalte',{
            titleInfo:'添加',
            btnInfo:'添加'
        })
        // 渲染到页面
        $('#addTeacherPage').html(html);
    }


})