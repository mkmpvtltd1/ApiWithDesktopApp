(function ($) {
    $.CallProfile = function (p) {
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
                //https://github.com/coligo-io/file-uploader
                $('.upload-btn').on('click', function () {
                    $('#upload-input').click();
                    $('.progress-bar').text('0%');
                    $('.progress-bar').width('0%');
                });

                $('#upload-input').on('change', function () {

                    var files = $(this).get(0).files;

                    if (files.length > 0) {
                        // create a FormData object which will be sent as the data payload in the
                        // AJAX request
                        var formData = new FormData();

                        // loop through all the selected files and add them to the formData object
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];

                            // add the files to formData object for the data payload
                            formData.append('uploads[]', file, file.name);
                        }

                        $.ajax({
                            url: p.mainUrl + 'upload',
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (data) {
                                console.log('upload successful!\n' + data);
                            },
                            xhr: function () {
                                // create an XMLHttpRequest
                                var xhr = new XMLHttpRequest();

                                // listen to the 'progress' event
                                xhr.upload.addEventListener('progress', function (evt) {

                                    if (evt.lengthComputable) {
                                        // calculate the percentage of upload completed
                                        var percentComplete = evt.loaded / evt.total;
                                        percentComplete = parseInt(percentComplete * 100);

                                        // update the Bootstrap progress bar with the new percentage
                                        $('.progress-bar').text(percentComplete + '%');
                                        $('.progress-bar').width(percentComplete + '%');

                                        // once the upload reaches 100%, set the progress bar text to done
                                        if (percentComplete === 100) {
                                            $('.progress-bar').html('Done');
                                        }

                                    }

                                }, false);

                                return xhr;
                            }
                        });

                    }
                });
            },
            BindData: function () {
                var user = JSON.parse(localStorage.getItem("user"));
                $('#inputName').text();
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
    $.fn.CallProfile = function (p) {
        $.CallProfile(p);
    };
})(jQuery);