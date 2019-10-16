// 配置host
var path = window.location.href;
if (path.indexOf('http://localhost:63342/public/pages') != -1 || path.indexOf('http://localhost.rs.com:8002/public/pages') != -1 || path.indexOf('http://localhost.rs.com:8003/public/pages') != -1) {
    //host = 'http://urms.uat1.rs.com';
    //host = 'http://10.11.29.59:53103';
    //host = 'http://192.168.221.77:53103';
    //host = 'http://192.168.221.241:53103'
    //host = 'http://10.11.27.20:53103'
}
else {
    host = ''
    //host = new RegExp('http[s]?://.*?/').exec(window.location.href);
    /*    var host = window.location.protocol + '//' + window.location.hostname;
     if(window.location.port) {
     host += ':' + window.location.port;
     }
     host = 'http://192.168.124.13:53104';*/
}
// 正则表达式`
//var host = new RegExp('http[s]?://.*?/').exec(window.location.href);

//host += '/contract';

//host += ''

/**
 * 判断是否为json对象
 * @param obj
 * @returns {boolean}
 */
(function ($) {

    $.urlString = function (valueData) {
        var urlStringArr = [], urlString = '';
        for (var key in valueData) {
            urlStringArr.push(key + '=' + valueData[key]);
        }
        urlString = urlStringArr.join('&');
        return urlString
    }

    $.jsonValid = function (obj) {
        return typeof(obj) == "object" &&
            Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length
    };

    $.paramJoin = function (param) {
        var arr = new Array()
        for (var v in param) {
            var str = ''
            arr.push(str += v + '=' + param[v])
        }
        return arr.join('&')
    }

    $.getUrlPath = function () {
        var url = window.location.href;
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(url.lastIndexOf("?") + 1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].substr(strs[i].indexOf('=') + 1));
            }
        }
        return theRequest;
    }

    $.showPopClassTips = function (popupTitle, popupIcon, popupTips, className, handle) {
        $modal = $(document.createElement('div')).addClass('bill-modal modal');
        $(document.body).append($modal);
        $modal.html([
            '<div class="modal-dialog text-center tip_dialog ' + className + '"> ' +
            '<div class="modal-content tip_content"> ' +
            '<div class="common_count ' + popupIcon + '_count">' + '</div> ' +
            '<div class="closeBtn" data-dismiss="modal"></div>' +
            '<div class="row"> ' +
            '<p  class=" tips_title_text pop_content" id="successTitle">' + popupTitle + '</p> ' +
            '<p class="control-label tips_content_text pop_content">' + popupTips + '</p> ' +
            '</div> ' +
            '<div class="row">' +
            '<div class="btn ensure btn-primary btn-sm btn-form" data-dismiss="modal">' + '确定' + '</div>' +
            '<div class="btn closeB btn-danger btn-sm btn-form" data-dismiss="modal">' + '取消' + '</div>' +
            '</div>' +
            '</div> '
        ].join(''));
        $modal.modal({backdrop: 'static', keyboard: false});
        $modal.modal('show');
        if (handle) {
            handle();
        }
        return $modal;
    };

    $.showPopClassTipsNoCancel = function (popupTitle, popupIcon, popupTips, className, handle) {
        $modal = $(document.createElement('div')).addClass('bill-modal modal');
        $(document.body).append($modal);
        $modal.html([
            '<div class="modal-dialog text-center tip_dialog ' + className + '"> ' +
            '<div class="modal-content tip_content"> ' +
            '<div class="common_count ' + popupIcon + '_count">' + '</div> ' +
            '<div class="closeBtn" data-dismiss="modal"></div>' +
            '<div class="row"> ' +
            '<p  class=" tips_title_text pop_content" id="successTitle">' + popupTitle + '</p> ' +
            '<p class="control-label tips_content_text pop_content">' + popupTips + '</p> ' +
            '</div> ' +
            '<div class="row">' +
            '<div class="btn ensure btn-primary btn-sm btn-form" data-dismiss="modal">' + '确定' + '</div>' +
            '</div>' +
            '</div> '
        ].join(''));
        $modal.modal({backdrop: 'static', keyboard: false});
        $modal.modal('show');
        if (handle) {
            handle();
        }
        return $modal;
    };

    $.showPopTips = function (popupTitle, popupIcon, popupTips, handle) {
        $modal = $(document.createElement('div')).addClass('bill-modal modal');
        $(document.body).append($modal);
        $modal.html([
            '<div class="modal-dialog text-center tip_dialog"> ' +
            '<div class="modal-content tip_content"> ' +
            '<div class="common_count ' + popupIcon + '_count">' + '</div> ' +
            '<div class="closeBtn" data-dismiss="modal"></div>' +
            '<div class="row"> ' +
            '<p  class=" tips_title_text pop_content" id="successTitle">' + popupTitle + '</p> ' +
            '<p class="control-label tips_content_text pop_content">' + popupTips + '</p> ' +
            '</div> ' +
            '<div class="row">' +
            '<div class="btn btn-primary btn-sm btn-form" data-dismiss="modal">' + '确定' + '</div>' +
            '</div>' +
            '</div> '
        ].join(''));
        $modal.modal({backdrop: 'static', keyboard: false});
        $modal.modal('show');

        $modal.on("hidden.bs.modal", function () {
            if (handle) {
                handle();
            }
        });

        return $modal;
    };

    /**
     * 公用ajax请求方法
     * @param option
     * @returns {*}
     */
    $.commonAjax = function (option) {
        return $.ajax({
            type: option.type ? option.type : 'GET',
            url: option.url,
            data: option.urlParams,
            dataType: option.dataType || 'json',
            traditional: option.traditional,
            contentType: option.contentType || 'application/json',
            success: function (data) {
                $.loadingHide();
                typeof(option.success) === 'function' && option.success(data);
            },
            error: function (data) {
                $.loadingHide();
                //$.showPopTips("错误", "danger", "服务出现错误,请重试");
                typeof(option.error) === 'function' && option.error(data);
            },
            beforeSend: function () {
                try {

                } catch (e) {

                }
                ;
                $.loading();
                typeof(option.beforeSend) == "function" && option.beforeSend();
            }
        }).fail(function (res) {
            console.log('fail', res)
            $.loadingHide();
            if (res && res.responseText) {
                var resJson = JSON.parse(res.responseText);
                console.log(resJson);

                //$.showPopTips("", "error", resJson.message);
            }
        });
    };

    $.loading = function () {
        if ($('#loading').length == 0) {
            var $load = $('<div id="loading">' +
                '<div class="img">' +
                '<img src="../../images/loading.gif" alt="">' +
                '</div>' +
                '</div>');
            $(document.body).append($load);
        } else {
            $('#loading').show();
        }
        return this;
    };

    $.loadingHide = function () {
        $('#loading').hide();
    };

    $.operateFormatter = function (value, row, index) {
        return [
            '<div>',
            '<a class="like" href="./saleDetail.html?' + row.id + '" title="查看">',
            '查看',
            '</a>',
            '</div>',
            '<div>',
            '<a class="like" href="./SalePrint.html?' + row.serialNumber + '" title="打印" target="_blank">',
            '打印',
            '</a>',
            '</div>'
        ].join('');
    }

    $.promotiomTotalAmount = function (value, row, index) {
        return [
            '¥' + row.promotiomTotalAmount
        ].join('')
    }

    $.totalAmount = function (value, row, index) {
        return [
            '¥' + row.totalAmount
        ].join('');
    }

    $.payableAmount = function (value, row, index) {
        return [
            '¥' + row.payableAmount
        ].join('');
    }


    $.forwardSaleOrderInfoPage = function (orderId) {
        window.location.href = './saleDetail.html?' + orderId;
    }

    $.paidAmount = function (value, row, index) {
        return [
            row.paidAmount ? '¥' + row.paidAmount : '¥0'
        ].join('')
    }

    $.refundAmount = function (value, row, index) {
        return [
            '¥' + ((row.refundAmount == null) ? '' : (row.refundAmount ))
        ].join('');
    }

    $.canRefundAmount = function (value, row, index) {
        return [
            '¥' + ((row.canRefundAmount == null) ? '' : (row.canRefundAmount ))
        ].join('');
    }

    $.realRefundAmount = function (value, row, index) {
        return [
            '¥' + ((row.realRefundAmount == null) ? '' : (row.realRefundAmount ))
        ].join('');
    }

    $.forwardRefundOrderInfoPage = function (orderId) {
        window.location.href = './backDetail.html?' + orderId;
    }

    /*对日期格式进行处理, nowDate：当前需要转换的日期*/
    $.dateFormat = function (nowDate) {
        var currtDate = (nowDate.getFullYear()) + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate(),
            date = new Date(currtDate),
            mon = date.getMonth() + 1,
            day = date.getDate(),
            mydate = date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
        return mydate;
    }

    // 加法函数
    $.accAdd = function (arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        return (arg1 * m + arg2 * m) / m;
    }

    $.checkUser = function (param) {
        $.ajax({
            url: host + "/p-trade-oc-admin/orderApi/admin/common/sensitive/view",
            type: "POST",
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            data: JSON.stringify({
                serialNumber: param.serialNumber,
                viewKey: param.type
            }),
            success: function (res) {
                if (res.code == 200) {
                    $.showPopNumberCheck(res.data.viewData)
                } else {
                    $.showPopClassTips('提示', 'warning', res.messge)
                }
            },
            error: function () {
                $.loadingHide()
            }
        })
    };

    $.showPopNumberCheck = function(number){
        var t = 0
        var time = ''
        $modal = $('<div class="modal fade" tabindex="-1" role="dialog" id="numberShow"></div>');
        $(document.body).append($modal);
        $modal.html([
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p class="top">完整号码 <i>' + number + '</i></p>' +
            '<p class="tip">' +
            '安全告示：您当前正在浏览用户敏感信息,浏览时间:  <i style="font-style: normal;">0</i>s<br/>为了确保用户的合法权益，请确保该页面信息用于红星体系范围内的正当途径，感谢配合' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>'
        ].join(''));
        $modal.modal({backdrop: 'static', keyboard: false});
        $('#numberShow').on('shown.bs.modal', function (e) {
            time = setInterval(function () {
                $('.tip i').html(++t)
            },1000)
        })
        $('#numberShow').on('hidden.bs.modal', function (e) {
            window.clearInterval(time);
            $('#numberShow').remove()
        })
        return $modal;
    }

    $.showMobileNumber = function (dom,serialNumber) {
        var data = JSON.stringify({serialNumber: serialNumber, type: 'orderMobile'})
        dom.after('<button type="button" class="btn btn-info btn-xs orderMobile" onclick=\'$.checkUser(' + data + ')\'>查看</button>')
    }

    $.showPopover = function (target, msg) {
        target.attr("data-original-title", msg);
        $('[data-toggle="tooltip"]').tooltip();
        target.tooltip('show');
        target.focus();

        //2秒后消失提示框
        var id = setTimeout(
            function () {
                target.attr("data-original-title", "");
                target.tooltip('hide');
            }, 2000
        );
    }
})(jQuery);


var commonFunc = {
    GetRequest: function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    urlString: function (valueData) {
        var urlStringArr = []
        for (var key in valueData) {
            urlStringArr.push(key + '=' + valueData[key]);
        }
        return urlStringArr.join('&');
    }
}