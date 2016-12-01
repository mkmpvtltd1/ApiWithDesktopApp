(function ($) {
    $.CallMe = function (p) {
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
                $('#btnLogin').on('click', function () {
                    CallMeMgr.LoginRequest();
                });
            },
            init: function () {
                localStorage.setItem("user", JSON.stringify({token: ''}));
                CallMeMgr.BindEvent();
            },
            LoginRequest: function () {
                var username = $('#txtUsername').val();
                var password = $('#txtPassword').val();
                CallMeMgr.CallAjax('login', {username: username, password: password}, 0, 'POST')
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
                        if (typeof(Storage) !== "undefined") {
                            // Code for localStorage/sessionStorage.

                            localStorage.setItem("user", JSON.stringify(data));
                            window.location.href = "Admin/index.html";
                        } else {
                            alert('Local Storage not Supported.');
                            // Sorry! No Web Storage support..
                        }
                        // window.pubVariable = data;
                        break;
                }
            },
            ajaxFailure: function (data) {
                switch (CallMeMgr.config.ajaxCallMode) {
                    case 0:
                        if (data.status == 0)
                            alert("Surver is not Running. Please Contact to Administartor.", "Network Error");
                        else
                            alert(JSON.parse(data.responseText).message, data.statusText);
                        break;
                }
            },
            noMethodFound: function (data) {
                console.log(1);
            },
            ajaxCall: function (config) {
                var token = JSON.parse(localStorage.getItem("user")).token;
                // var token = window.pubVariable === undefined ? '' : window.pubVariable.token;
                $.ajax({
                    type: config.MethodType,
                    contentType: config.contentType,
                    cache: config.cache,
                    async: config.async,
                    url: config.url,
                    data: config.data,
                    dataType: config.dataType,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('x-access-token', token);
                    },
                    success: CallMeMgr.ajaxSuccess,
                    error: CallMeMgr.ajaxFailure,
                    complete: CallMeMgr.noMethodFound
                });
            }
        };
        CallMeMgr.init();
    };
    $.fn.CallMe = function (p) {
        $.CallMe(p);
    };
})(jQuery);