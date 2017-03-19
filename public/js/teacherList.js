/**
 * Created by Administrator on 2017/3/19.
 */

define(['template','jquery'],function (template,$) {
        $.ajax({
            type:'get',
            url:'/api/teacher',
            dataType:'json',
            success:function (data) {
                console.log(data);
                // 解析数据
                var html=template('teacherListTemplate',{list:data.result});
                // 渲染页面
                $('#teacherListTbody').html(html);
                // $('#operationBox').find('a:eq(0)').click(function () {
                // })
            },

        })


})