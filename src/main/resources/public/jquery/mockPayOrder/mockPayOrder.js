var id = $.getUrlPath().id
var page = $.getUrlPath().page

$(function () {
    $("input[name=tradeNo]").val(Math.random(1000,1000)*10000000000000000000);
    $("input[name=sub_trade_id]").val( $("input[name=tradeNo]").val());
    $("input[name=paymentTradeNo]").val($("input[name=tradeNo]").val());
    $("input[name=paymentAmount]").val($("input[name=payment]").val());

    $("#createOrder").click(function () {
        var orderItemsList = [];

        $("#goodsModel .goodSubModel").each(function(index, item){
            console.table([1111,$(item).find("input[name=price]").val(),$(item).find("input[name=num]").val(),
                $(item).find("input[name=skuId]").val(),$(item).find("input[name=itemId]").val(),$(item).find("input[name=sub_trade_id]").val()]);

            orderItemsList.push({
                price:$(item).find("input[name=price]").val(),
                num:$(item).find("input[name=num]").val(),
                item_sku:$(item).find("input[name=skuId]").val(),
                num_id: $(item).find("input[name=itemId]").val(),
                sub_trade_id:$(item).find("input[name=sub_trade_id]").val()
            })
        });

        var param={
            op_type:$("select[name=opType]").val(),
            status:$("select[name=orderstatus]").val(),
            trade_id:$("input[name=tradeNo]").val(),
            city_order_type:$("select[name=city_order_type]").val(),
            related_trade_id: $("input[name=related_trade_id]").val(),
            order_type:$("select[name=order_type]").val(),
            receiver_phone:$("input[name=receiver_phone]").val(),
            payment:$("input[name=payment]").val(),
            orderItems:orderItemsList
        };

        $.ajax({
            type: "POST",
            url: host + '/mock/letterbox/tradeOrder',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(param),
            success: function (result) {
                alert("创建成功");
                $("input[name=tradeNo]").val(Math.random(1000,1000)*10000000000000000000);
                $("input[name=sub_trade_id]").val( $("input[name=tradeNo]").val());

            },
            error: function (result) {
                console.log('error')
            }
        });
    });

    $("#orderPayment").click(function () {
        var paymentDetailsList=[];
        $("#paymentArea select[name=pay_way]").each(function(index,item){
            paymentDetailsList.push(item.value+"#"+$(item).parent().parent().parent().find("input[name=paymentAmount]").val()
                +"#"+$(item).parent().parent().parent().find("input[name=paymentDate]").val());
        })

        console.log(paymentDetailsList);
        var param={
            tradeId:$("input[name=paymentTradeNo]").val(),
            seq:$("input[name=pay_num]").val(),
            paymentDetails:paymentDetailsList
        };


        $.ajax({
            type: "POST",
            url: host + '/mock/letterbox/pay',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(param),
            success: function (result) {
                alert("支付成功");
            },
            error: function (result) {
                console.log('error')
            }
        });
    })

    $(".addMorePay").click(function () {
        $("#paymentArea").append($("#addMorePayTemp").html());
    });


    $("#refundQuerySubmit").click(function () {
        var paymentDetailsList=[];
        $("#refundQueryArea select[name=refundQueryPayway]").each(function(index,item){
            paymentDetailsList.push(item.value+"#"+$(item).parent().parent().parent().find("input[name=refundQueryAmout]").val()
            +"#"+$(item).parent().parent().parent().find("input[name=refundDate]").val());
        })

        console.log(paymentDetailsList);
        var param={
            tradeId:$("input[name=refundQueryOriginOrderNo]").val(),
            refundOrderNo:$("input[name=refundQueryOrder]").val(),
            opType:$("select[name=refundOpType]").val(),
            paymentDetails:paymentDetailsList
        };


        $.ajax({
            type: "POST",
            url: host + '/mock/service/ali/refund',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(param),
            success: function (result) {
                alert("支付成功");
            },
            error: function (result) {
                console.log('error')
            }
        });
    });


});

function subPayment(obj){
    $(obj).parent().parent().parent().remove();
}

function addGoods(){
    $("#goodsModel").append($("#goodsModelTemp").html());
}

function subGoods(obj){
    $(obj).parent().parent().parent().parent().parent()
        .remove();
}

function refundQueryAddPayWay(){
    $("#refundQueryArea").append($("#refundQueryTemp").html());
}

function refundQuerySubPayWay(obj){
    $(obj).parent().parent().parent().remove();
}

function refundSubmitAddPayWay(){
    $("#refundSubmitArea").append($("#refundSubmitTemp").html());
}

function refundSubmitSubPayWay(obj){
    $(obj).parent().parent().parent().remove();
}

function changeOrderStatus(){
    if ($("select[name=orderstatus]").val() != "WAIT_BUYER_PAY") {
        $("select[name=opType]").val("update");
    } else {
        $("select[name=opType]").val("new");
    }
}

