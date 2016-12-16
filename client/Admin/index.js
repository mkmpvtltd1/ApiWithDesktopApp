(function ($) {
    $.CallMeDash = function (p) {
        p = $.extend
        ({
            mainUrl: 'http://localhost:3000/',
            apiVer: 'v1',
            AccessToken: ''
        }, p);
        var CallMeMgr = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                MethodType: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                ajaxCallMode: 0,
                mainUrl: p.mainUrl,
                AccessToken: p.AccessToken,
                apiVer: p.apiVer
            },
            BindEvent: function () {
                $('#btnSignOut').on('click', function () {
                    jConfirm('Are you sure?', 'Sign out Conformation!!', function (r) {
                        if (r) {
                            localStorage.setItem("user", '');
                            window.location.href = "../login.html";
                        }
                        else {
                        }
                    });
                });
                $('#btnProfile').on('click', function () {
                    $('#popup_content').load('./Profile/profile.html')
                });
                $('#divSettings').on('click', function () {
                    $('#popup_content').load('./Settings/Settings.html')
                });
                $(window).resize(function(){
                    $('#popup_content').css("height:",$(window).innerHeight()-178);
                });
                $('#popup_content').css("height:",$(window).innerHeight()-178);
            },
            BindData: function () {
                var user = JSON.parse(localStorage.getItem("user"));
                $('#divUser a span.hidden-xs').text(user.user.name.first + ' ' + user.user.name.last);
                $('#divUser ul li p').text(user.user.name.first + ' ' + user.user.name.last);
            },
            init: function () {
                CallMeMgr.BindData();
                CallMeMgr.BindEvent();
            },
            CallAjax: function (MethodName, Data, AjaxCallMode, MethodType) {
                CallMeMgr.config.method = MethodName;
                CallMeMgr.config.MethodType = MethodType;
                CallMeMgr.config.data = JSON.stringify(Data);
                CallMeMgr.config.url = CallMeMgr.config.mainUrl + CallMeMgr.config.method;
                CallMeMgr.config.ajaxCallMode = AjaxCallMode;
                CallMeMgr.ajaxCall(CallMeMgr.config);
            },
            ajaxSuccess: function (data) {
                switch (CallMeMgr.config.ajaxCallMode) {
                    case 0:
                        break;
                }
            },
            ajaxFailure: function (data) {
                switch (CallMeMgr.config.ajaxCallMode) {
                    case 0:
                        alert(JSON.parse(data.responseText).message, data.statusText);
                        break;
                }
            },
            noMethodFound: function (data) {
                console.log(1);
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: config.MethodType,
                    contentType: config.contentType,
                    cache: config.cache,
                    async: config.async,
                    url: config.url,
                    data: config.data,
                    dataType: config.dataType,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('x-access-token', pubVar.token);
                    },
                    success: CallMeMgr.ajaxSuccess,
                    error: CallMeMgr.ajaxFailure,
                    fail: CallMeMgr.noMethodFound

                });
            }
        };
        CallMeMgr.init();
    };
    $.fn.CallMeDash = function (p) {
        $.CallMeDash(p);
    };
})(jQuery);

/*
var PublicFuntion=
(function ($) {
    $.fn.PublicFuntion = function (p) {
        $.PublicFuntion(p);
    };
})(jQuery);*/
