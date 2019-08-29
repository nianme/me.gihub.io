//create by 阿猫 2017-01-09
$(function () {
    var cat_showstyle = "<style type=\"text/css\">";
    cat_showstyle += ".CatShowMsg{background-color: #5cb85c;padding: 6px 16px;min-width:200px;color: White;position: fixed;text-align: center;z-index:100000000;}";
    cat_showstyle += "</style>";

    $("body").append(cat_showstyle)
})

jQuery.extend({
    "catshow": function (text, delayTime, Only, bgcolor, font_color, left, _top) {
        if ((Only == undefined || Only == true) && $(".CatShowMsg").length > 0) {
            $(".CatShowMsg").remove();
        }


        var w_left = left;
        var w_top = _top;
        if (_top == undefined || _top == "") {
            w_top = $(window.parent.document).scrollTop();
        }
        //判断是否在iframe中
        if (self.window.frames.name != "ContentIframe") {//只要名称不为ContentIframe
            // 页面不在iframe中时处理
            w_top = 0; //不在iframe里时用fixed时直接置顶
        }

        var w_bgcolor = bgcolor;
        if (bgcolor != undefined && bgcolor != "") {
            w_bgcolor = "background-color:" + bgcolor + ";";
        }

        var w_font_color = font_color;
        if (font_color != undefined && font_color != "") {
            w_font_color = "color:" + w_font_color + ";";
        }
        var myID = "cat" + Math.random().toString().substring(2);
        var showBody = $("<div id=\"" + myID + "\" class=\"CatShowMsg box\" style=\"top:" + w_top + "px;" + w_bgcolor + w_font_color + "\">" + text + "</div>");
        $("body").append(showBody);

        if (left == undefined || left == "") {
            w_left = ($("body").outerWidth(true) / 2) - ($("#" + myID).outerWidth(true) / 2);
        }
        $("#" + myID).css("left", w_left + "px");

        //延迟删除
        if (delayTime != undefined) {
            $("#" + myID).delay(delayTime).fadeOut(function () {
                if (Only == undefined || Only == true) {
                    $("#" + myID).remove();
                } else {
                    $(showBody).remove();
                }
            });
        }
    }
});