/**
 * Created by yuan on 2018/6/12.
 */

var dataHeader = {}
var sheetLen = 6000
var operationType = 0;
var today = new Date();
var preDate = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000); //前一天
var lastSevenDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); //前7天

function downloadExl(json, type) {

    //var tmpdata = json[0];

    var keyMap = []; //获取keys

    for (var k in dataHeader) {
        keyMap.push(k);//拿到K值
    }

    json.unshift({}); //在数组头插入一个对象

    json[0] = dataHeader

    var tmpdata = [];//用来保存转换好的json
    json.map(function (v, i) {
        return keyMap.map(function (k, j) {
            return Object.assign({}, {
                v: v[k],
                position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            })
        })
    }).reduce(function (prev, next) {
        return prev.concat(next)
    }).forEach(function (v, i) {
        var obj = {v: v.v}
        //填充颜色
        i < Object.getOwnPropertyNames(dataHeader).length ? obj['s'] = {fill: {fgColor: {rgb: 'e3fcd9'}}} : ''
        return tmpdata[v.position] = obj
    });

    return {
        outputPos: Object.keys(tmpdata),//设置区域,比如表格从A1到D10
        tmpdata: tmpdata
    }
}

function tmpGenerate(arr, type) {
    var tmpWB = {
        SheetNames: [], //保存的表标题
        Sheets: {}
    };

    arr.forEach(function (value, i) {
        tmpWB.SheetNames.push('sheet' + (i + 1))
        tmpWB.Sheets['sheet' + (i + 1)] = Object.assign({}, value.tmpdata, {'!ref': value.outputPos[0] + ':' + value.outputPos[value.outputPos.length - 1]})
    })

    tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
        {bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
    ))], {
        type: ""
    }); //创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown); //创建对象超链接
    document.getElementById("hf").href = href; //绑定a标签
    document.getElementById("hf").click(); //模拟点击实现下载
    setTimeout(function () { //延时释放
        $.loadingHide()
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
}

function s2ab(s) { //字符串转字符流
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
    var temCol = '',
        s = '',
        m = 0
    while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
    }
    return s
}

function ExportList(obj) {
    this.exportUrl = obj.exportUrl
    this.pageType = obj.pageType
    this.uuidUrl = obj.uuidUrl
    this.dataArr = []
    this.form = obj.form
    this.data = obj.data
    this.init = function () {
        var that = this
        billCommonQuery.queryDownLoadRestGet(this.uuidUrl, '', function (data) {
            dataHeader = that.operateHeader(data.data.header)
            that.queryList(data.data.uuid)
        })
    }
}

ExportList.prototype.operateHeader = function (headString) {
    var arr = headString.split(',')
    var obj = {}
    for (var i = 0; i < arr.length; i++) {
        var splitArr = arr[i].split(':')
        obj[splitArr[0]] = splitArr[1]
    }
    return obj
}

ExportList.prototype.queryList = function (uuid) {
    var that = this
    // console.log('that.pageType',that.pageType)
    $.ajax({
        type: "POST",
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify( pTradeinitSearchParam(that.form,{pageType:that.pageType})),
        url: this.exportUrl + '?exportUuid=' + uuid,
        success: function (result) {
            if (result.code == 200) {
                if (result.data && result.data.data) {
                    that.promisePushOpera(result.data.data)
                }
                if (result.data.hasNext) {
                    that.queryList(uuid)
                } else {
                    that.dataArr.sort(function (a, b) {
                        return b.id - a.id
                    });
                    if (that.dataArr.length) {
                        var result = [];
                        var execlArr = []
                        for (var i = 0, len = that.dataArr.length; i < len; i += sheetLen) {
                            result.push(that.dataArr.slice(i, i + sheetLen));
                        }
                        result.forEach(function (value) {
                            execlArr.push(downloadExl(value))
                        })
                        tmpGenerate(execlArr)
                    } else {
                        $.showPopTips("", "warning", '数据为空');
                    }
                }
            } else {
                $.showPopTips("", "warning", result.message);
            }
        },
        error: function () {

        }
    })
}

ExportList.prototype.promisePushOpera = function (results) {
    var that = this
    $(results).each(function (index, data) {
        that.dataArr.push(data)
    })
}


function PtradeCommon() {

}


PtradeCommon.prototype.pTradeInitTable = function pTradeInitTable(columns) {
    var _that = this
    //设置默认隐藏列
    //先销毁表格
    this.table.bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    this.table.bootstrapTable({
        method: "post",
        url: _that.saleUrl + "?currentPage=1&showCount=10",
        ajaxOptions: {
            beforeSend: function () {
                var params = paramsGet()
                if (params.pageNumber) {
                    this.url = _that.saleUrl + "?currentPage=" + params.pageNumber + '&showCount=' + params.pageSize
                }
                if (_that.pageType == 'salesQuery') {//订单合计接口
                    $.ajax({
                        type: "POST",
                        url: _that.saleCount + "?currentPage=" + (params.pageNumber||1) + '&showCount=' + (params.pageSize||10),
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(pTradeinitSearchParam(_that.form,{pageType: _that.pageType})),
                        success: function (res) {
                            for (var key in res.data) {
                                $('[data-filed="' + key + '"]').html('¥' + res.data[key]);
                            }
                        },
                        error: function (err) {

                        }
                    })
                }
            }
        },
        contentType: 'application/json',
        pagination: true, //启动分页
        pageSize: 10,  //每页显示的记录数
        pageNumber: parseInt(this.page), //当前第几页
        pageList: [10, 20, 50, 100],  //记录数可选列表
        search: false,  //是否启用查询
        showColumns: false,  //显示下拉框勾选要显示的列
        showRefresh: false,  //显示刷新按钮
        sidePagination: "server", //表示服务端请求
        columns: columns,
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "undefined",
        queryParams: function queryParams() {   //设置查询参数
            return pTradeinitSearchParam(_that.form,{pageType: _that.pageType});
        },
        toolbar: "#toolbar",
        singleSelect: false,
        onPageChange: function (number, size) {
            // console.log(number, size)
            page = number
        },
        responseHandler: function (res) {  //在ajax获取到数据，渲染表格之前，修改数据源
            if (res.code == '200') {
                res.rows = res.data.data
                res.total = res.data.totalResult
            }
            return res;
        },
        rowStyle: function (row, index) {
            //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];
            var classes = ['success', 'info'];
            var printType = row.printType;
            if (printType != null && printType != undefined && printType == 0) {
                return { classes: classes[0]};
            } else if (printType != null && printType != undefined && printType == 1) {
                return {classes: classes[1]};
            } else {
                return {};
            }
        },
        onLoadSuccess: function (data) {  //加载成功时执行
            $.loadingHide()
        },
        onLoadError: function () {  //加载失败时执行
            alert("服务器被大风吹跑了！！！");
        }
    });

    function paramsGet() {
        return _that.table.bootstrapTable('getOptions');
    }
}

PtradeCommon.prototype.buildingList = function () {
    $.ajax({
        type: "GET",
        url: host + '/p-trade-oc-admin/orderApi/admin/buildingFloor/buildingList',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $.loadingHide();
            var buildListBox = []
            if (data.code == 200 && data.data) {
                data.data.map(function (d) {
                    buildListBox.push('<option value=' + d.buildingCode + ' buildingId=' + d.id + '>' + d.buildingName + '</option>')
                });

                $('#buildingId').append(buildListBox.join(''));
            }
        },
        error: function (data) {
            console.log('error')
        }
    });
}

PtradeCommon.prototype.floorList = function (buildingId) {
    $.ajax({
        type: "GET",
        url: host + '/p-trade-oc-admin/orderApi/admin/buildingFloor/floorList?' + 'buildingId=' + buildingId,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $.loadingHide();
            var floorListBox = [];
            data.data && data.data.map(function (d) {
                floorListBox.push('<option value=' + d.floorCode + '>' + d.floorName + '</option>');
            });

            $("#floorId").empty().append("<option value='' selected='selected'>--全部楼层--</option>" + floorListBox.join(''));
        },
        error: function (data) {
            console.log('error')
        }
    });
}

PtradeCommon.prototype.selectShop = function (value, secondKey) {
    $("#shopId.selectpicker").selectpicker({
        noneSelectedText: '请选择',
    });

    if(!value){
        value=''
    }
    var params = "dictParam=" + value + "&dictType=3" + "&operationType=" + operationType + "&secondKey=" + secondKey

    $.ajax({
        type: "GET",
        url: host + '/p-trade-oc-admin/orderApi/admin/common/getDictList?' + params,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            var optionVal = [];
            var defalutVal = "<option value=''>" + "请选择" + "</option>"

            $.each(data.data, function (i) {
                optionVal.push("<option value=" + data.data[i].key + ">" + data.data[i].value + "</option>");
            })

            $("#shopId.selectpicker").empty().append(defalutVal + optionVal.join(''));

            $("#shopId.selectpicker").selectpicker("val", "");
            $("#shopId.selectpicker").selectpicker("refresh");
        },
        error: function (data) {
            console.log('error')
        }
    })
}

PtradeCommon.prototype.selectMarket = function (callback) {
    $("#marketIds.selectpicker").selectpicker({
        noneSelectedText: '请选择',
    });

    var key = '';
    var params = "dictParam=" + key + "&dictType=1" + "&operationType=" + operationType;
    $.ajax({
        type: "GET",
        url: host + '/p-trade-oc-admin/orderApi/admin/common/getDictList?' + params,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            var optionVal = [];
            var defalutVal = null;
            if (data.data.length > 1) {
                defalutVal = "<option value=''>" + "请选择商场" + "</option>";
            }            $.each(data.data, function (i) {
                optionVal.push("<option value=" + data.data[i].key + ">" + data.data[i].value + "</option>");
            })

            $("#marketIds.selectpicker").empty().append(defalutVal + optionVal.join(''));

            $("#marketIds.selectpicker").selectpicker("val", "");
            $("#marketIds.selectpicker").selectpicker("refresh");

            if (callback) {
                callback(data)
            }
        },
        error: function (data) {
            console.log('error')
        }
    })
}

PtradeCommon.prototype.selectMarketDiamond = function (callback) {
    $("#marketIds.selectpicker").selectpicker({
        noneSelectedText: '请选择',
    });

    var params = "operationType=" + operationType;
    $.ajax({
        type: "GET",
        url: host + '/p-trade-oc-admin/orderApi/admin/common/marketListDiamond?' + params,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            var optionVal = [];
            var defalutVal = null;
            if (data.data.length > 1) {
                defalutVal = "<option value=''>" + "请选择商场" + "</option>";
            }            $.each(data.data, function (i) {
                optionVal.push("<option value=" + data.data[i].key + ">" + data.data[i].value + "</option>");
            })

            $("#marketIds.selectpicker").empty().append(defalutVal + optionVal.join(''));

            $("#marketIds.selectpicker").selectpicker("val", "");
            $("#marketIds.selectpicker").selectpicker("refresh");

            if (callback) {
                callback(data)
            }
        },
        error: function (data) {
            console.log('error')
        }
    })
}

PtradeCommon.prototype.sourceData = function (request, response, type) {
    var params = "dictParam=" + request.term + "&dictType=" + type + "&operationType=" + operationType
    $.ajax({
        type: "GET",
        url: host + '/p-trade-oc-admin/orderApi/admin/common/getDictList?' + params,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            response($.map(data.data, function (item) { //label表示显示的文本，value表示实际输入的值
                return {
                    label: item.value,
                    value: item.value,
                }
            }))
        },
        error: function (data) {
            console.log('error')
        }
    })
}


function pTradeinitSearchParam(form,param) {
    $(form.serializeArray()).each(function (key, obj) {
        if (obj.value != '' && obj.value != null) {
            if (obj.name == "marketIds") {
                param[obj.name] = [$("#marketIds").selectpicker('val')];
            } else if (obj.name == "shopId") {
                param[obj.name] = $("#shopId").selectpicker('val');
            }
            else {
                param[obj.name] = obj.value || "";
            }
        }
    });

    if (param.pageType != 'drillQuery' && param.pageType != 'aliPrintQuery') {
        param['orderStatusList'] = []
        $('.orderStatusList button.active').each(function (i, dom) {
            param['orderStatusList'].push($(dom).attr('data-status'))
        })

        if ($('#dateRange').val()) {
            param['createDateStart'] = $('#dateRange').val().split('~')[0].trim()
            param['createDateEnd'] = $('#dateRange').val().split('~')[1].trim()
        }

        if ($('#dateRange2').val()) {
            param['firstPaymentDate'] = $('#dateRange2').val().split('~')[0].trim()
            param['lastPaymentDate'] = $('#dateRange2').val().split('~')[1].trim()
        }

        if ($('#dateRange3').val()) {
            param['agreeDeliveryDateStart'] = $('#dateRange3').val().split('~')[0].trim()
            param['agreeDeliveryDateEnd'] = $('#dateRange3').val().split('~')[1].trim()
        }

        if ($('#dateRange4').val()) {
            param['realDeliveryDateStart'] = $('#dateRange4').val().split('~')[0].trim()
            param['realDeliveryDateEnd'] = $('#dateRange4').val().split('~')[1].trim()
        }
    }
    return param;
}

formatTimeSetToDate = function (cellval) {
    if (cellval != null) {
        var date = cellval;
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + currentDate;
    }
}

PtradeCommon.prototype.queryCurrentRole = function(callback) {
    $.ajax({
        type: "GET",
        url: host + '/p-trade-oc-admin/orderApi/admin/queryCurrentRole',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.code == 200 && data.data.virtualMarketFlag) {

                if (data.data.virtualMarketFlag == 1 || data.data.virtualMarketFlag == 2) {//区域
                    operationType = data.data.virtualMarketFlag;
                } else {
                    operationType = 0;
                }
            } else {
                operationType = 0;
            }
            if (callback) {
                callback(data.data.virtualMarketFlag,operationType);
            }
        },
        error: function (data) {
            if (callback) {callback()}
        }
    })
}

// 0：没有权限 ，1：普通角色（自带商场），2：管理角色（全部商场）
PtradeCommon.prototype.queryCurrentRoleDiamond = function(callback) {
    $.ajax({
        type: "GET",
        url: host + '/p-trade-oc-admin/orderApi/admin/queryCurrentRole/diamond',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.code == 200 && data.data.virtualMarketFlag) {
                operationType = data.data.virtualMarketFlag;
            } else {
                operationType = 0;
            }
            if (callback) {
                callback(data.data.virtualMarketFlag,operationType);
            }
        },
        error: function (data) {
            if (callback) {callback()}
        }
    })
}

var dealerReg = {
    verification: function (oInput, num) {
        var args=arguments;
        console.log(args);
        switch (num) {
            case 1:
                if ('' != oInput.value.replace(/\d{1,}\.{0,1}\d{0,}/, '')) {
                    oInput.value = oInput.value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' : oInput.value.match(/\d{1,}\.{0,1}\d{0,}/);
                }
                oInput.value = oInput.value ? parseInt(oInput.value) : null
                break;
            case 2:
                if ('' != oInput.value.replace(/\d{1,}\.{0,1}\d{0,}/, '')) {
                    oInput.value = oInput.value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' : oInput.value.match(/\d{1,}\.{0,1}\d{0,}/);
                }
                oInput.value = oInput.value ? parseFloat(oInput.value).toFixed(1) : null
                if (args[2] && oInput.value>args[2]){
                    oInput.value=args[2];
                }
                break;
        }
    }
}
