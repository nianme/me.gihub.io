$(function () {
    //隐藏头部
    $(".topbar").attr("class", "topbarhident").hide(); //隐藏头部
    
    BindShare();

    //标记喜欢
    $("body").on("click", ".xihuan", function () {
        //检查是否已登录
        var login = $(".user_login_div .login").attr("login");
        if (login == "0") {
            var goURL = "/w/" + $(".action_item .xihuan").attr("wid");
            LoginWin(goURL);
            return false;
        }

        if ($(".action_item .xihuan").attr("style") == undefined) {
            $(".action_item .xihuan").css("color", "#4E4C4C"); //先执行效果再提交，防止体验延迟
            AddLike();
        } else {
            $(".action_item .xihuan").removeAttr("style");
            DeleteLike();
        }
    });
})

//绑定分享
function BindShare() {
    var WID = $(".action_item .xihuan").attr("wid");
    var word_title = $.trim($(".word_title").text()); 
    var shareContent = "<ul class=\"shareUL\">";
    shareContent += "<li><a target=\"_blank\" href=\"http://v.t.sina.com.cn/share/share.php?title=" + word_title + "—后阁楼&url=http://www.hougelou.com/w/" + WID + "&appkey=4107726884\"><i class='iconfont'>&#xe652;</i>&nbsp;新浪微博</a></li>";
    shareContent += "<li><a target=\"_blank\" href=\"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=" + word_title + "—后阁楼&url=http://www.hougelou.com/w/" + WID + "&desc=&summary=&site=\"><i class='iconfont'>&#xe643;</i>&nbsp;QQ空间</a></li>";
    shareContent += "<li><a target=\"_blank\" href=\"http://connect.qq.com/widget/shareqq/index.html?url=http://www.hougelou.com/w/" + WID + "&showcount=0&desc=" + word_title + "—后阁楼&summary=照顾你的文字&title=后阁楼\"><i class='iconfont'>&#xe641;</i>&nbsp;QQ好友</a></li>";
    shareContent += "<li><a target=\"_blank\" href=\"http://www.douban.com/share/service?href=http://www.hougelou.com/w/" + WID + "&text=" + word_title + "—后阁楼\"><i class='iconfont'>&#xe62c;</i>&nbsp;豆瓣</a></li>";
    shareContent += "</ul>";


    //分享效果
    $('.action_item .share').popover(
                          {
                              trigger: 'focus',
                              html: true,
                              placement: "bottom",
                              content: shareContent
                          }
                     );
}

//添加喜欢
function AddLike() {
    $.ajax({
        url: 'http://www.hougelou.com/service/OtherHandler.ashx',
        type: 'POST',
        async: true,
        data: {
            "key": "AddLike",
            "LSource": 2,
            "LID": $(".action_item .xihuan").attr("wid")
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

//取消喜欢
function DeleteLike() {
    $.ajax({
        url: 'http://www.hougelou.com/service/OtherHandler.ashx',
        type: 'POST',
        async: true,
        data: {
            "key": "DeleteLike",
            "LSource": 2,
            "LID": $(".action_item .xihuan").attr("wid")
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

//弹出登录窗口
function LoginWin(goURL) {
    var loginURL = "../common/DialogLogin.aspx.htm"/*tpa=http://www.hougelou.com/common/DialogLogin.aspx*/;
    if (goURL != null) {
        loginURL += "?url=" + goURL;
    }
    art.dialog.open(loginURL, { title: false, lock: true, drag: false, resize: false, opacity: 0.5, fixed: true, background: "#cdcdcd" });
}