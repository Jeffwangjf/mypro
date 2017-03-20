/**
 * Created by Administrator on 2017/3/19.
 */

define(['template','jquery','bootstrap'],function (template,$) {
        // 渲染讲师列表
        $.ajax({                        //发送ajax请求
            type:'get',
            url:'/api/teacher',         //请求接口
            dataType:'json',
            success:function (data) {
                // 解析数据
                var html=template('teacherListTemplate',{list:data.result});
                // 渲染页面
                $('#teacherListTbody').html(html);


                // 查看讲师信息
                $('.operationBox').find('a:eq(0)').click(function () {
                    var tcId=$(this).parents('td').attr('data-tcId');
                    console.log($(this).parents('td'));
                    console.log(tcId);
                    $.ajax({
                        type:'get',
                        url:'/api/teacher/view',
                        data:{tc_id:tcId},
                        dataType:'json',
                        success:function (data) {
                            if(data.code==200){
                                data.result.tc_hometown=data.result.tc_hometown.replace(/\|/g,' ');
                                var html=template('teacherViewTemplate',data.result);
                                $('#teacherModalId').html(html);
                                $('#teacherModal').modal();
                            }
                        }
                    })
                })
            },

        })


})