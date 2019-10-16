var page = $.getUrlPath().page || 1;
//默认获取当前日期
var operationType = 0;
var pTrade = new PtradeCommon()


function SaleOrderList() {
    var that = this
    this.page = 1
    this.size = 10
    this.form = $('#saleForm')
    this.pageType = 'drillQuery'
    this.saleUrl = host + "/p-trade-oc-admin/orderApi/admin/shopExchange/pageList"
    this.table = $('#dataTable');
    this.initFunc = function () {
        //当点击查询按钮的时候执行
        $("#searchButton").bind("click", function () {
            that.page = 1
            that.initTable()
        });
        $("#cleanButton").bind("click", function () {
            document.getElementById('saleForm').reset();
            $("#floor").empty().append("<option value='' selected='selected'>--全部楼层--</option>");
            pTrade.selectMarketDiamond(function (data) {
                if (data.data.length > 1) {
                    $("#marketIds.selectpicker").selectpicker("val", "");
                } else {
                    $("#marketIds.selectpicker").selectpicker("val", data.data[0].key);
                }
            })
            $('#searchButton').trigger('click')
        });

        $('#batchSet').on('click', function () {
            $('#batchSetModal').modal({
                backdrop: 'static'
            });
            $('#batchSetModal input[name=exchangeRange]').val("");
        });

        //选择楼层
        /*$('#buildingId').change(function () {
            var buildingId = $(this).children('option:selected').attr('buildingId');
            if (buildingId) {
                pTrade.floorList(buildingId);
            } else {
                $("#floor").empty().append("<option value='' selected='selected'>--全部楼层--</option>");
            }
        });*/
    }

    var columns = [
        /*{
            field: 'serialNumber', title: '销售单号', formatter: function (value, row) {
                var sb = [];
                sb.push('<a href="');
                sb.push(host);
                sb.push('/p-trade-oc-admin/pages/SaleOrder/saleDetail.html?id=');
                sb.push(row.id);
                sb.push('&page=');
                sb.push(page);
                sb.push('&type=1">');
                sb.push(row.serialNumber);
                sb.push('</a>');
                var saleUrl = sb.join('');
                return saleUrl;
            }
        },*/
        {field: 'shopId', title: '店铺ID'},
        {field: 'shopName', title: '店铺名称'},
        {field: 'marketName', title: '商场名称'},
        {field: 'buildingName'+'floorName', title: '场馆楼层'},
        {field: 'exchangeRange', title: '抵现额度设置', formatter: function (value, row) {
            if (row.exchangeRange) {
                return row.exchangeRange;
            }else {
                return '未设置'
            }
        }},
        {field: 'exchangeStatus', title: '发放状态', formatter: function (value, row) {
            var exchangeStatus = row.exchangeStatus;
            if (exchangeStatus == 0) {
                return '关闭'
            } else if (exchangeStatus == 1) {
                return '启用'
            }
        }},
        {field: 'updateTime', title: '更新时间'},
        {
            field: 'button', title: '操作', formatter: function (value, row) {
                var sb = [];
                sb.push('<a href="');
                sb.push(host);
                sb.push('/sgb-admin/index.html#/account_manage?ownerId=');
                sb.push(row.shopId);
                sb.push('&type=2">');
                sb.push('查看账户');
                sb.push('</a>&nbsp;&nbsp;');
                var saleUrl = sb.join('');
                var buttonBox = []
                buttonBox.push(saleUrl)
                buttonBox.push('<span class="like" onClick=\'editExchange(' + JSON.stringify(row) + ')\' title="设置">设置</span>')
            return buttonBox.join('');
            }
        }
    ]
    this.initTable = pTrade.pTradeInitTable.bind(this, columns)
    this.initFunc()
    this.initTable()
}

$(function () {
    $.loading();
    pTrade.queryCurrentRoleDiamond(function (virtualMarketFlag, type) {
        operationType = type
        var html = template($('#saleForm-tpl').html(), {virtualMarketFlag: virtualMarketFlag});
        $('#saleForm-html').html(html)
        //调用函数，初始化表格
        //pTrade.buildingList();
        pTrade.selectMarketDiamond(function (data) {
            if (data.data.length > 1) {
                $("#marketIds.selectpicker").selectpicker("val", "");
            } else {
                $("#marketIds.selectpicker").selectpicker("val", data.data[0].key);
            }
            new SaleOrderList();
        })
    });
})

function editExchange(obj) {
    $('#setModal').data(obj);
    $('#setModal').modal({
        backdrop: 'static'
    });
    if (obj.exchangeRange) {
        $('#setModal input[name=exchangeRange]').val(obj.exchangeRange);
    }
    if (obj.exchangeStatus && obj.exchangeStatus == 1) {
        if ($("#setModal input.btnstatus").eq(0).hasClass("btn-primary")) {
            $("#setModal input.btnstatus").eq(0).addClass("btn-default").removeClass("btn-primary");
            $("#setModal input.btnstatus").eq(1).addClass("btn-primary").removeClass("btn-default");

        }
        $("#setModal input[name=exchangeStatus]").val(1);
    }else {

        if ($("#setModal input.btnstatus").eq(0).hasClass("btn-default")) {
            $("#setModal input.btnstatus").eq(0).addClass("btn-primary").removeClass("btn-default");
            $("#setModal input.btnstatus").eq(1).addClass("btn-default").removeClass("btn-primary");

        }
        $("#setModal input[name=exchangeStatus]").val(0);
    }
}

function setSubmit() {
    if (!$('#setModal input[name=exchangeRange]').val()) {
        $.showPopTips('提示', 'warning', "抵现上限不能为空！");
        return false;
    }
    if ($('#setModal input[name=exchangeRange]').val() > 20) {
        $.showPopTips('提示', 'warning', '抵现上限不能超过20%');
        return false;
    }
    var exchangeStatus = 0;
    if ($("#setModal input.btn.btn-primary").val() == "启用") {
        exchangeStatus = 1;
    }
    var exchangeRange = $('#setModal input[name=exchangeRange]').val();
    var obj = {
        "shopId": $('#setModal').data().shopId,
        "shopName": $('#setModal').data().shopName,
        "marketId": $('#setModal').data().marketId,
        "marketName": $('#setModal').data().marketName,
        "buildingId": $('#setModal').data().buildingId,
        "buildingName": $('#setModal').data().buildingName,
        "floorId": $('#setModal').data().floorId,
        "floorName": $('#setModal').data().floorName,
        "exchangeRange": exchangeRange,
        "exchangeStatus": exchangeStatus
    }

    $.ajax({
        url: "/p-trade-oc-admin/orderApi/admin/shopExchange/edit",
        method: 'POST',
        contentType: "application/json",
        data:JSON.stringify(obj),
        success: function (res) {
            $.loadingHide()
            if(res.code == 200){
                $("#setModal").modal('hide');
                new SaleOrderList();
            }else{
                $.showPopTips('提示', 'warning', res.message)
            }
        }
    });
}

function batchSubmit() {
    if (!$('#batchSetModal input[name=exchangeRange]').val()) {
        $.showPopTips('提示', 'warning', "抵现上限不能为空！");
        return false;
    }
    if ($('#batchSetModal input[name=exchangeRange]').val() > 20) {
        $.showPopTips('提示', 'warning', '抵现上限不能超过20%');
        return false;
    }
    if (!$('#marketIds').val()) {
        $.showPopTips('提示', 'warning', "请选择指定商场！");
        return false;
    }
    var exchangeStatus = 0;
    if ($("#batchSetModal input.btn.btn-primary").val() == "启用") {
        exchangeStatus = 1;
    }
    var exchangeRange = $('#batchSetModal input[name=exchangeRange]').val();
    var shopId = $('#selectShopId').val();
    var shopName = $('#shopName').val();
    var marketId = $('#marketIds').val();
    var buildingId = $('#buildingId').val();
    var floorId = $('#floorId').val();
    var obj = {
        "shopId": shopId,
        "shopName": shopName,
        "marketId": marketId,
        "buildingId": buildingId,
        "floorId": floorId,
        "exchangeRange": exchangeRange,
        "exchangeStatus": exchangeStatus
    }

    $.ajax({
        url: "/p-trade-oc-admin/orderApi/admin/shopExchange/batchEdit",
        method: 'POST',
        contentType: "application/json",
        data:JSON.stringify(obj),
        success: function (res) {
            $.loadingHide()
            if(res.code == 200){
                $("#batchSetModal").modal('hide');
                new SaleOrderList();
            }else{
                $.showPopTips('提示', 'warning', res.message)
            }
        }
    });
}

