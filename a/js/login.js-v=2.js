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


    //获得记住的email
    if ($.cookie("hougelou_useremail") != null) {
        $("#txtEmail").val($.cookie("hougelou_useremail"));
    }

    $("body").fadeIn(3000);
    $("#contentLeft").height($(window).height()); //获取浏览器高度以让色块铺满

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
        $(this).css("color", "#FF5722").attr("title", "隐藏密码");
    }, function () {
        $("#txtPass").attr("name", "txtPass2").attr("id", "txtPass2");
        $("#txtPass1").attr("name", "txtPass").attr("id", "txtPass").show().val($("#txtPass2").val());
        $("#txtPass2").attr("name", "txtPass1").attr("id", "txtPass1").hide();
        $(this).css("color", "#BBBBBB").attr("title", "显示密码");
    });

    //记住密码切换
    $("#RememberMe").toggle(function () {
        $("#RememberMei").attr("class", "fa fa-toggle-off").css("color", "#212121");
    }, function () {
        $("#RememberMei").attr("class", "fa fa-toggle-on").css("color", "#FF9800");
    });

    validateFrom();
})

//提交
$.validator.setDefaults({
    submitHandler: function () {
        $.ajax({
            type: "post",
            url: "http://www.hougelou.com/Service/User/user.ashx",
            data: {
                "key": "Login",
                "email": $("#txtEmail").val(),
                "pass": $.md5($("#txtPass").val()),
                "code": $("#txtCode").val()
            },
            beforeSend: function () {
                $("#btnLogin span").text("正在登录…");
            },
            complete: function () {
                $("#btnLogin span").text("登录");
            },
            success: function (e) {
                if (e == "1") {
                    if ($("#RememberMei").hasClass("fa-toggle-on")) {
                        $.cookie("hougelou_useremail", $("#txtEmail").val(), { expires: 60 }); //记住email
                    } else {
                        $.cookie('hougelou_useremail', null); //移除
                    }
                    location.href = "../index.html"/*tpa=http://www.hougelou.com/index.html*/;
                } else {
                    if (e == "-2") {
                        $.catshow("抱歉，你的账号被冻结，不能登录", 6000, true, "#ea8363");
                    } else if (e == "-1") {
                        $.catshow("抱歉，你的账号未激活", 6000, true, "#ea8363");
                    } else {
                        $.catshow("登录失败，邮箱或密码不正确", 6000, true, "#ea8363");
                    }
                    $("#ValdiateCode").attr("src", $("#ValdiateCode").attr("src") + Math.random());
                    $("#txtCode").val("");
                }
            }
        });
    }
});



//验证
function validateFrom() {
    var dataCode = {
        key: "ValidateCode",
        code: function () {
            return $("#txtCode").val();
        }
    };
    var remoteCode = GetRemoteInfo('http://www.hougelou.com/Service/common.ashx', dataCode);


    $("#form1").validate({
        rules: {
            txtEmail: {
                required: true,
                email: true
            },
            txtPass: {
                required: true
            },
            txtCode: {
                required: true,
                remote: remoteCode
            }
        },
        messages: {
            txtEmail: {
                required: "请输入你的邮箱"
            },
            txtPass: {
                required: "密码是一定要输入的哦"
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

