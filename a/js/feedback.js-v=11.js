$(function () {

    //切换反馈类型
    $(".feedBackType .typeItem").click(function () {
        $(this).attr("class", "typeItem current").siblings().attr("class", "typeItem");
        $(".feedBackType .typeItem").each(function (k, v) {
            $(v).text($(v).attr("icon"));
        });

        $(this).text($(this).attr("title"));
    });

    $("#btnInput").click(function () {
        if ($.trim($("#txtContact").val()) == "") {
            $.catshow("请告诉我怎么联系到你", 3000);
            return;
        }

        if ($.trim($("#txtContent").val()) == "") {
            $.catshow("要是想告诉我什么，就写上几句吧", 3000);
            return;
        }

        if ($.trim($("#txtCode").val()) == "") {
            $.catshow("验证码还没填写哦", 3000);
            return false;
        } else {
            $.ajax({
                type: "post",
                url: "http://www.hougelou.com/Service/common.ashx",
                async: false,
                data: {
                    "key": "ValidateCodeJS",
                    "code": $("#txtCode").val()
                },
                success: function (e) {
                    var data = eval("(" + e + ")");
                    if (data.result == "0") {
                        $.catshow(data.msg, 3000);
                        $("#validateImg").attr("src", $("#validateImg").attr("src") + Math.random());
                    } else {
                        Save();
                    }
                }
            });
        }

    })

})


//提交
function Save() {
    $.ajax({
        type: "post",
        url: "http://www.hougelou.com/Service/commonHander.ashx",
        data: {
            "key": "AddFeedBack",
            "type": $(".feedBackType .current").attr("typeval"),
            "contact": $("#txtContact").val(),
            "content": $("#txtContent").val()
        },
        beforeSend: function () {
            $("#btnInput span").text("正在提交…");
        },
        complete: function () {
            $("#btnInput span").text("提交");
        },
        success: function (data) {
            if (data == "1") {
                $.catshow("我们已收到你的反馈，谢谢(>^ω^<)喵", 5000);
                $("#validateImg").attr("src", $("#validateImg").attr("src") + Math.random());
                $("#txtCode").val("");
            } else if (data == "0") {
                $.catshow("未能提交成功，重试若仍不行，可以我们联系", 4000, true, "#ea8363");
            }
        }
    });
}