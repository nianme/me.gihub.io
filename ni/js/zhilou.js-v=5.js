var curPage = 1; //当前页数
var size = 6; //每页显示个数
var total = parseInt($(".contentTwo").attr("total")); //总页数
var currentTop = 0; //现在的纸片距离顶部的距离

$(function () {
    //喜欢
    $("body").on("click", ".xihuan", function () {
        var itemObj = $(this).parents(".item");
        if ($(".showZhiPian").css("display") == "block") {
            itemObj = $(this).parents(".showZhiPian"); //弹窗详情窗口
        }
        var ZID = $(itemObj).attr("zid");

        //检查是否已登录
        var login = $(".user_login_div .login").attr("login");
        if (login == "0") {
            var goURL = "/zhipian/" + ZID;
            LoginWin(goURL);
            return false;
        }

        if ($(itemObj).attr("ed") != "1") {
            $(".showZhiPian[zid=" + ZID + "] .xihuan,.item[zid=" + ZID + "] .xihuan").css("color", "#4E4C4C"); //先执行效果再提交，防止体验延迟
            $(".showZhiPian[zid=" + ZID + "],.item[zid=" + ZID + "]").attr("ed", "1");
            AddLike(ZID);
        } else {
            $(".showZhiPian[zid=" + ZID + "] .xihuan,.item[zid=" + ZID + "] .xihuan").removeAttr("style");
            $(".showZhiPian[zid=" + ZID + "],.item[zid=" + ZID + "]").removeAttr("ed");
            DeleteLike(ZID);
        }
    });

    //查看更多
    $("body").on("click", ".more", function () {
        if (curPage < total) {
            curPage++;
            GetMoreZhiLou();
        }
    });

    //查看详情
    $("body").on("click", ".look", function () {
        currentTop = $(this).parents(".item").offset().top - 50; //记录纸片的位置
        $(".footerDiv,.contentTwo,.PageTitle").hide();
        $(".topbar").attr("class", "topbarhident").hide(); //隐藏头部

        var parentsObj = $(this).parents(".item");
        var userName = $.trim($(parentsObj).find(".zhipian_name").text());
        var htmlStr = "<img src='" + $(parentsObj).find(".userInfo img").attr("src") + "' />";
        htmlStr += "<div class=\"user_R box\">";
        htmlStr += "<div class=\"zhipian_name\">" + userName + "</div>";
        htmlStr += "<div class=\"zhipian_time\">" + $(parentsObj).find(".zhipian_time").html() + "</div>";
        htmlStr += "<div class=\"Address\">" + $(parentsObj).find(".Address").html() + "</div>";
        htmlStr += "</div>";
        $(".showZhiPian .userInfo").html(htmlStr);
        var content = $(parentsObj).find(".zhipian").attr("content").replace(new RegExp("hgl_single", 'g'), "\'").replace(new RegExp("hgl_double", 'g'), "\"");
        $(".showZhiPian .zhipian").html(content);
        $(".showZhiPian").attr("show", "1").show(); //标识为打开

        var ZID = $(this).parents(".item").attr("zid");
        var shareContent = "<ul class=\"shareUL\">";
        shareContent += "<li><a target=\"_blank\" href=\"http://v.t.sina.com.cn/share/share.php?title=来自“" + userName + "”的纸片。——后阁楼，照顾你的文字&url=http://www.hougelou.com/zhipian/" + ZID + "&appkey=4107726884\"><i class='iconfont'>&#xe652;</i>&nbsp;新浪微博</a></li>";
        shareContent += "<li><a target=\"_blank\" href=\"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=来自“" + userName + "”的纸片。——后阁楼，照顾你的文字&url=http://www.hougelou.com/zhipian/" + ZID + "&desc=&summary=&site=\"><i class='iconfont'>&#xe643;</i>&nbsp;QQ空间</a></li>";
        shareContent += "<li><a target=\"_blank\" href=\"http://connect.qq.com/widget/shareqq/index.html?url=http://www.hougelou.com/zhipian/" + ZID + "&showcount=0&desc=来自“" + userName + "”的纸片。——后阁楼，照顾你的文字&summary=照顾你的文字&title=后阁楼\"><i class='iconfont'>&#xe641;</i>&nbsp;QQ好友</a></li>";
        shareContent += "<li><a target=\"_blank\" href=\"http://www.douban.com/share/service?href=http://www.hougelou.com/zhipian/" + ZID + "&text=来自“" + userName + "”的纸片。——后阁楼，照顾你的文字\"><i class='iconfont'>&#xe62c;</i>&nbsp;豆瓣</a></li>";
        shareContent += "</ul>";

        //喜欢数据绑定
        $(".showZhiPian").attr("zid", ZID).attr("ed", $(this).parents(".item").attr("ed"));
        if ($(this).parents(".item").attr("ed") == "1") {
            $(".showZhiPian .action_item .xihuan").css("color", "#4E4C4C");
        }

        //分享效果
        $(".showZhiPian .action_item").append("<a href=\"javascript:void(0)\" class=\"share\"><i class=\"fa fa-share-alt\"></i>&nbsp;分享</a>");
        $('.showZhiPian .share').popover(
                          {
                              trigger: 'focus',
                              html: true,
                              placement: "bottom",
                              content: shareContent
                          }
                     );
        AddReadNum(ZID); //添加阅读量
    });

    //详情关闭
    $(".showZhiPian .close").click(function () {
        $(".showZhiPian").attr("show", "0").hide(); //标识为关闭
        $(".footerDiv,.contentTwo,.PageTitle").show();
        $(".topbarhident").attr("class", "topbar").show();

        $('body,html').scrollTop(currentTop);
        $(".showZhiPian .share").remove(); //移除分享按钮

    });

    //点击留言图标
    $("body").on("click", ".showZhiPian .comment", function () {
        //检查是否已登录
        var login = $(".topbar .login").attr("login");
        if (login == "0") {
            LoginWin("/zhilou");
            return false;
        }

        $(".comment_zone").show();
        $("#txtcomment_text").html("<span class=\"comment_tips\">留言将由作者筛选后对所有人可见</span>");
    });

    //点击留言框
    $("body").on("click", "#txtcomment_text", function () {
        if ($(".comment_zone .comment_tips").length > 0) {
            $(this).html("").css("border-color", "#AFA9A9").focus();
        }
    });

    //留言框失去焦点
    $("body").on("blur", "#txtcomment_text", function () {
        if ($(this).html() == "") {
            $(this).html("<span class=\"comment_tips\">留言将由作者筛选后对所有人可见</span>").css("border-color", "");
        }
    });

});

//弹出登录窗口
function LoginWin(goURL) {
    var loginURL = "../common/DialogLogin.aspx.htm"/*tpa=http://www.hougelou.com/common/DialogLogin.aspx*/;
    if (goURL != null) {
        loginURL += "?url=" + goURL;
    }
    art.dialog.open(loginURL, { title: false, lock: true, drag: false, resize: false, opacity: 0.5, fixed: true, background: "#cdcdcd" });
}

//取消喜欢
function DeleteLike(ZID) {
    $.ajax({
        url: 'http://www.hougelou.com/service/OtherHandler.ashx',
        type: 'POST',
        async: true,
        data: {
            "key": "DeleteLike",
            "LSource": 1,
            "LID": ZID
        },
        dataType: 'text',
        timeout: 3000,
        success: function (e) {
            if (e == "1") {
                //成功
            } else if (e == "0") {
                console.log("取消喜欢失败");
            } else {
                location.href = "../login.htm"/*tpa=http://www.hougelou.com/login*/;
            }
        }
    })
}

//添加喜欢
function AddLike(ZID) {
    $.ajax({
        url: 'http://www.hougelou.com/service/OtherHandler.ashx',
        type: 'POST',
        async: true,
        data: {
            "key": "AddLike",
            "LSource": 1,
            "LID": ZID
        },
        dataType: 'text',
        timeout: 3000,
        success: function (e) {
            if (e == "1") {
                //成功
            } else if (e == "0") {
                console.log("添加喜欢失败");
            } else {
                location.href = "../login.htm"/*tpa=http://www.hougelou.com/login*/;
            }
        }
    })
}

//添加阅读量
function AddReadNum(ZID) {
    $.ajax({
        url: 'http://www.hougelou.com/service/Words/zhilou.ashx',
        type: 'POST',
        async: true,
        data: {
            "key": "AddReadNum",
            "ZID": ZID
        },
        dataType: 'text',
        timeout: 6000
    })
}

//查看更多的纸片
function GetMoreZhiLou() {
    $.ajax({
        url: 'http://www.hougelou.com/service/Words/zhilou.ashx',
        type: 'POST',
        async: true,
        data: {
            "key": "GetZhiLouPager",
            "curPage": curPage,
            "size": size
        },
        dataType: 'text',
        timeout: 8000,
        beforeSend: function () {
            $(".moreDiv").html("<img class=\"moreLoading\" src=\"../images/load.gif\"/*tpa=http://www.hougelou.com/images/load.gif*/ />");
        },
        success: function (e) {
            var data = eval(e);

            if (curPage > 1) {
                $(".contentTwo").append("<div class=\"fengeline box\"><div class=\"fenge_block\">/..</div></div>");
            }
            for (var i = 0; i < data.length; i++) {
                var style = " ed=\"0\"";
                if (data[i].lID != 0) {
                    style = " ed=\"1\" style=\"color:#4E4C4C\"";
                }
                var htmlStr = "<div class=\"item box\" ZID=\"" + data[i].zID + "\" " + style + ">";
                htmlStr += "<div class=\"userInfo box\">"
                htmlStr += "<img src='" + data[i].userPhoto + "' />";
                htmlStr += "<div class=\"user_R box\"><div class=\"zhipian_name\">" + data[i].zName + "</div>";
                htmlStr += "<div class=\"zhipian_time\">" + data[i].amPm + "</div>";
                htmlStr += "<div class=\"Address\">" + data[i].iPAddress + "</div>";
                htmlStr += "</div></div>";
                htmlStr += "<div class=\"zhipian box\" content=\"" + data[i].zContent.replace(new RegExp("\'", 'g'), "hgl_single").replace(new RegExp("\"", 'g'), "hgl_double") + "\">" + data[i].shortCentent + "</div>";
                htmlStr += "<i class=\"look fa fa-search\" title=\"查看详情\"></i>";
                htmlStr += "</div>";

                $(".contentTwo").append(htmlStr);
            }
            $(".moreDiv").remove();
            if (curPage < total) {
                $(".contentTwo").append("<div class=\"moreDiv\"><a class=\"more\" href=\"javascript:void(0)\">NEXT</a></div>");
            }
        }
    })
}