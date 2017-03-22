/**
 * Created by Administrator on 2017/3/21.
 */

define(['jquery', 'util', 'template', 'datepicker', 'language', 'validate','form'], function ($, util, template) {

    // 编辑页面

    var tc_id = util.paramValue('tc_id');
    if (tc_id) {
        $.ajax({
            type: 'get',
            url: '/api/teacher/edit',
            data: {tc_id: tc_id},
            dataType: 'json',
            success: function (data) {
                // 给响应的数据添加自定义属性值
                data.result.titleInfo = '编辑';
                data.result.btnInfo = '保 存';
                // 根据响应的数据填充模板内容
                console.log(data.result);
                // 解析模板
                var html = template('addTeacherFormTempalte', data.result);
                // 渲染到相应位置
                $('#addTeacherPage').html(html);
                checkForm('/api/teacher/update');       //调用方法
            }
        })
    } else {

        // 添加页面

        // 解析模板
        var html = template('addTeacherFormTempalte', {
            titleInfo: '添加',
            btnInfo: '添 加'
        })
        // 渲染到页面
        $('#addTeacherPage').html(html);
        checkForm('/api/teacher/add');      //调用方法
    }

    // 定义表单验证方法
    function checkForm(url) {
        $('#addTeacherForm').validate({     //默认有提交
            onkeyup:'true',
            sendForm: false,     //阻止默认提交
            eachInvalidField: function () {
                $(this).closest('.form-group').removeClass('has-success').addClass('has-error')
            },      //输入框样式变化
            eachValidField: function () {
                $(this).closest('.form-group').removeClass('has-error').addClass('has-success')
            },
            // 关于提示信息
            description: {
                tcName: {
                    required:'用户名不能为空'
                },
                tcPass:{
                    required:'用户名不能为空',
                    pattern:'请输入六位数字'
                },
                tcJoinDate: {
                    required:'入职日期不能为空'
                },
            },

            // 验证有效提交表单
            valid:function () {
                console.log(this);
                $(this).ajaxSubmit({
                    type:'post',
                    url:url,
                    dataType:'json',
                    success:function (data) {
                        if(data.code==200){
                            location.href='/teacher/list'
                        }
                    }
                })
            }

        })
    }


})