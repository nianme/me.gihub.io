$(function () {
    UE.getEditor('txtContent', { "initialFrameHeight": "400", "initialFrameWidth": "702", "wordCount": 0, "elementPathEnabled": false,"autoFloatEnabled":false, "initialContent": "", toolbars: [["bold", "underline", "strikethrough", "insertorderedlist", "insertunorderedlist", "blockquote", "link", "unlink", "horizontal"]], contextMenu: [] });


    if ($.cookie('WriteCookie') == null) {
        $("#DivTips").slideDown();
    }

    //隐藏提示
    $("#HideTips").click(function () {
        $("#DivTips").slideUp();
        $.cookie("WriteCookie", "1", { expires: 30 });
    });

    $("#btnInput").click(function () {
        if ($.trim($("#txtTitle").val()) == "") {
            $.catshow("请输入标题", 3000);
            return;
        }

        if ($.trim($("#txtName").val()) == "") {
            $.catshow("请输入作者名称", 3000);
            return;
        }

        if ($.trim($("#txtContact").val()) == "") {
            $.catshow("请输入联系方式，方便我们后续联系到你哦", 4000);
            return;
        }

        if ($.trim(UE.getEditor('txtContent').getContent()) == "") {
            $.catshow("请输入文字内容", 3000);
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
                        SaveTougao();
                    }
                }
            });
        }

    })

});


//提交
function SaveTougao() {
    $.ajax({
        url: 'http://www.hougelou.com/service/commonHander.ashx',
        type: 'POST',
        async: true,
        data: {
            "key": "InputTouGao",
            "name": $("#txtName").val(),
            "title": $("#txtTitle").val(),
            "content": UE.getEditor('txtContent').getContent(),
            "contact": $("#txtContact").val(),
            "desc": $("#txtDesc").val()
        },
        dataType: 'text',
        timeout: 6000,
        beforeSend: function () {
            $("#btnInput span").text("正在提交…");
        },
        complete: function () {
            $("#btnInput span").text("提交");
        },
        success: function (e) {
            try {
                if (e == "1") {
                    $.catshow("投稿成功。谢谢你的文字，我们会尽快给你回复的", 6000);
                    $("#validateImg").attr("src", $("#validateImg").attr("src") + Math.random());
                    $("#txtCode").val("");
                } else {
                    $.catshow("保存失败。重复尝试后仍不行，请联系我们", 6000, true, "#ea8363");
                }
            }
            catch (ex) {
                $.catshow("投稿成功。谢谢你的文字，我们会尽快给你回复的", 6000);
            }
        }
    })
}