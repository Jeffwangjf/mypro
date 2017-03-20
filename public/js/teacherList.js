/**
 * Created by Administrator on 2017/3/19.
 */

define(['template', 'jquery', 'bootstrap'], function (template, $) {
    // 渲染讲师列表
    $.ajax({                        //发送ajax请求
        type: 'get',
        url: '/api/teacher',         //请求接口
        dataType: 'json',
        success: function (data) {
            // 解析数据
            var html = template('teacherListTemplate', {list: data.result});
            // 渲染页面
            $('#teacherListTbody').html(html);


            // 查看讲师信息
            $('.operationBox').find('a:eq(0)').click(function () {
                var tcId = $(this).parents('td').attr('data-tcId');   //在属性中保存参数
                $.ajax({
                    type: 'get',
                    url: '/api/teacher/view',
                    data: {tc_id: tcId},      //请求参数
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g, ' ');
                            var html = template('teacherViewTemplate', data.result);
                            $('#teacherModalId').html(html);
                            $('#teacherModal').modal();     //使用js开启模态框
                        }
                    }
                })
            })

            // 启用注销讲师信息
            $('.operationBox').find('a:eq(2)').click(function () {
                var tcId = $(this).parents('td').attr('data-tcId');   //在属性中保存参数
                var tcStatus = $(this).parents('td').attr('data-status');
                var that=this;
                $.ajax({
                    type: 'post',
                    url: '/api/teacher/handle',
                    data: {tc_id: tcId, tc_status: tcStatus},      //请求参数
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if(data.result.tc_status==0){
                            $(that).text('注销');
                        }else {
                            $(that).text('启用');
                        }
                    }
                })
            })


        },

    })


})