var timeNum = 5 * 60;

$(function () {
    //邮件完成提示
    var autoOptions = {
        targetCls: '.email_acount',       // 目标input元素
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

    $("body").fadeIn(3000);
    $("#contentLeft").height($(window).height()); //获取浏览器高度以让色块铺满

    //去注册
    $("#btnRegister").click(function () {
        $("#readDiv").hide();
        timer(timeNum);
        $("#WaitingContent").show();
    });


    //当有密码的时候才显示切换图标
    $("#txtPass1,#txtPass").keyup(function () {
        var val = $.trim($(this).val());
        if (val != "") {
            $(".ipass").show();
        } else {
            $(".ipass").hide();
        }
        $("#txtPass").val(val);
        $("#txtPass1").val(val);
    });

    //密码可视切换
    $(".ipass").toggle(function () {
        $("#txtPass").attr("name", "txtPass2").attr("id", "txtPass2");
        $("#txtPass1").attr("name", "txtPass").attr("id", "txtPass").show().val($("#txtPass2").val());
        $("#txtPass2").attr("name", "txtPass1").attr("id", "txtPass1").hide();
        $(this).css("color", "#FF9800").attr("title", "隐藏密码");
    }, function () {
        $("#txtPass").attr("name", "txtPass2").attr("id", "txtPass2");
        $("#txtPass1").attr("name", "txtPass").attr("id", "txtPass").show().val($("#txtPass2").val());
        $("#txtPass2").attr("name", "txtPass1").attr("id", "txtPass1").hide();
        $(this).css("color", "#BBBBBB").attr("title", "显示密码");
    });

    //勾选协议切换
    $(".xieyi").toggle(function () {
        $(this).attr("class", "fa fa-toggle-off xieyi").css("color", "#212121");
    }, function () {
        $(this).attr("class", "fa fa-toggle-on xieyi").css("color", "#FF9800");
    });

    //微信关注流程
    $(".first_msg").click(function () {
        $(".amao_msg").addClass("amao_msg_padding");
        $(".first_msg").hide();
        $(".msg_first_item").show().addClass("msg_left");
        setTimeout(function () {
            $(".msg_two_item").show().addClass("msg_left");
        }, 2000);
        setTimeout(function () {
            $(".sys_confirmMsg").fadeIn();
        }, 5000);
    });

    //微信-不感兴趣
    $(".outmsg").click(function () {
        $(".msg_first_item,.msg_two_item,.sys_confirmMsg").hide();
        $(".Disturb").show().addClass("msg_left");
        setTimeout(function () {
            $(".amao_msg").fadeOut();
        }, 10000);
    });

    //微信-先看看
    $(".gomsg").click(function () {
        $(".sys_confirmMsg").hide();
        $(".sys_msg_item").show().addClass("msg_right");
    });

    validateFrom();
})

//倒计时
function timer(intDiff) {
    var nextime = intDiff;
    var intervalId = window.setInterval(function () {
        nextime--;
        var day = 0,
        hour = 0,
        minute = 0,
        second = 0; //时间默认值
        if (nextime > 0) {
            day = Math.floor(nextime / (60 * 60 * 24)); //天
            hour = Math.floor(nextime / (60 * 60)) - (day * 24); //小时
            minute = Math.floor(nextime / 60) - (day * 24 * 60) - (hour * 60); //分钟
            second = Math.floor(nextime) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60); //秒
        }
        if (hour <= 9)
            hour = '0' + hour;
        if (minute <= 9)
            minute = '0' + minute;
        if (second <= 9)
            second = '0' + second;

        $("#timeShow").html(minute + ":" + second);

        if (nextime == 0) {
            $("#WaitingContent").hide();
            $("#registerDiv").show();
            clearInterval(intervalId);
        }
    }, 1000);
}

//提交
$.validator.setDefaults({
    submitHandler: function () {
        $.ajax({
            type: "post",
            url: "http://www.hougelou.com/Service/User/user.ashx",
            data: {
                "key": "Register",
                "email": $("#txtEmail").val(),
                "biming": $("#txtName").val(),
                "pass": $.md5($("#txtPass").val()),
                "code": $("#txtCode").val()
            },
            beforeSend: function () {
                $("#btnReg span").text("正在注册…");
            },
            complete: function () {
                $("#btnReg span").text("注册");
            },
            success: function (e) {
                if (e == "1") {
                    var strhtml = "<div style=\"margin-bottom:20px;font-size: 16px;\">注册成功，请登录你的邮箱“" + $("#txtEmail").val() + "”激活你的账号</div>";
                    var emailkey = $("#txtEmail").val().substring($("#txtEmail").val().indexOf('@') + 1);
                    var emailData = [{ "name": "QQ邮箱", "url": "https://mail.qq.com/" }, { "name": "126网易邮箱", "url": "http://mail.126.com/" }, { "name": "163网易邮箱", "url": "http://mail.163.com/" }, { "name": "雅虎邮箱", "url": "https://login.yahoo.com/config/mail?&.src=ym&.intl=cn" }, { "name": "搜狐邮箱", "url": "http://mail.sohu.com/" }, { "name": "新浪邮箱", "url": "http://mail.sina.com.cn/"}];
                    for (var i = 0; i < emailData.length; i++) {
                        if (emailData[i].url.indexOf(emailkey) >= 0) {
                            strhtml += "<div><a href=\"" + emailData[i].url + "\">" + "登录" + emailData[i].name + "</a></div>";
                            break;
                        }
                    }

                    $("#contentRight").html(strhtml);
                } else if (e == "-3") {
                    $.catshow("验证码错误", 6000, true, "#ea8363");
                } else {
                    $.catshow("注册失败，重试若仍不行，可以反馈给我们的团队，我们会尽快修复。", 6000, true, "#ea8363");
                }
                $("#ValdiateCode").attr("src", $("#ValdiateCode").attr("src") + Math.random());
                $("#txtCode").val("");
            }
        });
    }
});



//验证
function validateFrom() {
//    jQuery.validator.addMethod("XieYiCheck", function (value, element) {
//        if ($("#xieyi .fa-toggle-off").length > 0) {
//            return false;
//        }
//        else {
//            return true;
//        }
//    }, "你没有同意我们的使用协议，很抱歉我们将不能给你提供服务。");

    var dataCode = {
        key: "ValidateCode",
        code: function () {
            return $("#txtCode").val();
        }
    };
    var remoteCode = GetRemoteInfo('http://www.hougelou.com/Service/common.ashx', dataCode);

    //账号是否存在
    var dataHaveEmail = {
        key: "HaveEmail",
        Email: function () {
            return $("#txtEmail").val();
        }
    };
    var remoteHaveEmail = GetRemoteInfo('http://www.hougelou.com/Service/commonHander.ashx', dataHaveEmail);


    $("#form1").validate({
        rules: {
            txtEmail: {
                required: true,
                email: true,
                remote: remoteHaveEmail
            },
            txtPass: {
                required: true,
                rangelength: [6, 20]
            },
            txtName: {
                required: true
            },
            txtCode: {
                required: true,
                remote: remoteCode
            }
            //            ,
            //            xieyiValidate: {
            //                XieYiCheck: true
            //            }
        },
        messages: {
            txtEmail: {
                required: "还没有输入Email哦"
            },
            txtPass: {
                required: "密码是一定要输入的哦",
                rangelength: "请输入6-20位密码"
            },
            txtName: {
                required: "要起一个什么样的笔名呢"
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

