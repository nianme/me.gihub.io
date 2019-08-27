$(function () {
    validateFrom();

    //邮件完成提示
    var autoOptions = {
        targetCls: '.email_val',       // 目标input元素
        parentCls: '.email_parent',       // 当前input元素的父级类
        hiddenCls: '.hiddenCls',       // 当前input隐藏域 
        searchForm: '.form', //form表单
        hoverBg: 'hoverBg',          // 鼠标移上去的背景
        inputValColor: 'red',              // 输入框输入提示颜色
        mailArr: ["@qq.com.htm"/*tpa=http://www.hougelou.com/js/@qq.com*/, "@126.com.htm"/*tpa=http://www.hougelou.com/js/@126.com*/, "@163.com.htm"/*tpa=http://www.hougelou.com/js/@163.com*/, "@sina.com.htm"/*tpa=http://www.hougelou.com/js/@sina.com*/, "@foxmail.com.htm"/*tpa=http://www.hougelou.com/js/@foxmail.com*/, "@sohu.com.htm"/*tpa=http://www.hougelou.com/js/@sohu.com*/, "@yahoo.com.htm"/*tpa=http://www.hougelou.com/js/@yahoo.com*/], //邮箱数组
        isSelectHide: true,                // 点击下拉框 是否隐藏 默认为true
        callback: null                 // 点击某一项回调函数
    };
    new EmailAutoComplete(autoOptions);
    $(".auto-tip li").live("click", function () {
        $(".email_parent .error").text("");
    });

    //当有密码的时候才显示切换图标
    $("#txtPass1,#txtPass").keyup(function () {
        var val = $.trim($(this).val());
        if (val != "") {
            $(".eye_block").show();
        } else {
            $(".eye_block").hide();
        }
        $("#txtPass").val(val);
        $("#txtPass1").val(val);
    });

    //密码的明文/密文处理
    $(".eye_block").toggle(function () {
        $("#txtPass").show();
        $("#txtPass1").hide();
        $("#txtPass").val($("#txtPass1").val());

        $(".eye_block").css("color", "#BBBBBB").attr("title", "显示密码");
    }, function () {
        $("#txtPass").hide();
        $("#txtPass1").show();
        $("#txtPass1").val($("#txtPass").val());

        $(".eye_block").css("color", "#FF5722").attr("title", "隐藏密码");
    });

})

//提交
$.validator.setDefaults({
    submitHandler: function () {
        if ($("#HFEmail").val() != "") {
            //修改密码
            $.ajax({
                type: "post",
                url: "http://www.hougelou.com/Service/User/user.ashx",
                data: {
                    "key": "FindModifyPass",
                    "email": $("#HFEmail").val(),
                    "t": $("#HFT").val(),
                    "vc": $("#HFVC").val(),
                    "pass": $.md5($("#txtPass").val())
                },
                beforeSend: function () {
                    $("#btnModify span").text("正在提交…");
                },
                complete: function () {
                    $("#btnModify span").text("提交");
                },
                success: function (e) {
                    if (e == "1") {
                        $("#ModifyPass").html("<div style='font-size: 20px;'><i class=\"fa fa-check\" style=\"margin-right:10px;\"></i>密码重置成功</div><div style='margin-top:5px;'>欢迎回来，继续用文字去看见自己。</div>");
                    } else {
                        $.catshow("密码重置失败", 3000, true, "#ea8363");
                    }
                }
            });
        } else {
            $.ajax({
                type: "post",
                url: "http://www.hougelou.com/Service/User/user.ashx",
                data: {
                    "key": "SendFindEmail",
                    "email": $("#txtAccount").val()
                },
                beforeSend: function () {
                    $("#btnLogin span").text("重置密码邮件发送中…");
                },
                complete: function () {
                    $("#btnInput").val("发送重置邮件");
                },
                success: function (e) {
                    if (e == "1") {
                        var strhtml = "<div style=\"margin-bottom:20px;\">修改密码链接已经发送至你的邮箱" + $("#txtAccount").val() + "，请登录你的邮箱点击修改链接。</div>";
                        var emailkey = $("#txtAccount").val().substring($("#txtAccount").val().indexOf('@') + 1);
                        var emailData = [{ "name": "QQ邮箱", "url": "https://mail.qq.com/" }, { "name": "126网易邮箱", "url": "http://mail.126.com/" }, { "name": "163网易邮箱", "url": "http://mail.163.com/" }, { "name": "雅虎邮箱", "url": "https://login.yahoo.com/config/mail?&.src=ym&.intl=cn" }, { "name": "搜狐邮箱", "url": "http://mail.sohu.com/" }, { "name": "新浪邮箱", "url": "http://mail.sina.com.cn/"}];
                        for (var i = 0; i < emailData.length; i++) {
                            if (emailData[i].url.indexOf(emailkey) >= 0) {
                                strhtml += "<div><a href=\"" + emailData[i].url + "\">" + "登录" + emailData[i].name + "</a></div>";
                                break;
                            }
                        }

                        $("#FindPassDiv").html(strhtml);
                    } else if (e == "-1") {
                        $.catshow("邮箱不存在，请认真检查你的邮箱地址是否正确", 6000, true, "#ea8363");
                    } else {
                        $.catshow("发送失败，请认真检查你的邮箱地址是否正确", 6000, true, "#ea8363");
                    }
                    $("#ValdiateCode").attr("src", $("#ValdiateCode").attr("src") + Math.random());
                }
            });
        }
    }
});

//验证
function validateFrom() {
    if ($("#HFEmail").val() != "") {
        //修改密码
        $("#form1").validate({
            rules: {
                txtPass1: {
                    required: true,
                    rangelength: [6, 20]
                }
            },
            messages: {
                txtPass1: {
                    required: "你还没有输入密码哦",
                    rangelength: "请输入6-20位密码"
                }
            }
        , success: function (label) {
            label.html("&nbsp;").attr("class", "success").siblings("label").remove(); //非得这样，以前那样的又行
        },
            errorPlacement: function (error, element) {
                element.parent().find(".success").remove();
                error.appendTo(element.parent().find("span"));
            }
        });
    } else {
        var dataCode = {
            key: "ValidateCode",
            code: function () {
                return $("#txtCode").val();
            }
        };
        var remoteCode = GetRemoteInfo('http://www.hougelou.com/Service/common.ashx', dataCode);

        $("#form1").validate({
            rules: {
                txtAccount: {
                    required: true
                },
                txtCode: {
                    required: true,
                    remote: remoteCode
                }
            },
            messages: {
                txtAccount: {
                    required: "请输入你注册时的邮箱"
                },
                txtCode: {
                    required: "还要输入一只调皮的验证码哟"
                }
            }
        , success: function (label) {
            label.html("&nbsp;").attr("class", "success").siblings("label").remove(); //非得这样，以前那样的又行
        },
            errorPlacement: function (error, element) {
                element.parent().find(".success").remove();
                error.appendTo(element.parent().find("span").first());
            }
        });
    }

}
