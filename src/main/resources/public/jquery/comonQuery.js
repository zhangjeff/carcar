+(function () {
    var commonQuery={
        /**
         * 查询
         */
        query:function(data,table,successHandle,sortData){
            var urlStringArr = [], urlString = '',Ajaxurl = '';
/*            if (data) {
                $.jsonValid(data) && $.each(data, function (name, value) {
                    urlStringArr.push(name + '=' + value);
                });
                urlString = urlStringArr.join('&');
            }*/
            //Ajaxurl = this.location.searchOrder+ (urlString ? ('?' + urlString) : '');
            console.log('data',data)
            console.log('urlString',urlString)
            //data.currentPage=1;
            //data.showCount=onePageCount();
        },


        /**
         * 订单详情 楼层
         */
        queryFloor:function(data,callBack){
            console.log("订单详情 楼层");
            $.commonAjax({
                type: "GET",
                urlParams:data,
                url: host + '/p-trade-oc-admin/orderApi/admin/searchMarketFloorList',
                beforeSend: function () {
                },
                success: function (result) {
                    if(callBack!=null){
                        callBack(result);
                    }
                },
                error: function (res) {
                }
            });
        },

        /**
         * 订单导出查询1
         */
        queryDownLoadRestGet:function(url,data,callback){
            console.log("订单导出1",data);
            $.commonAjax({
                type: "GET",
                urlParams:data,
                url: host + url,
                beforeSend: function () {},
                success: function (result) {
                    $.loadingHide()
                    if(result.code == 200){
                        if(callback){
                            callback(result)
                        }
                    }else{
                        $.showPopTips("", "warning", result.message);
                    }
                },
                error: function (res) {
                    $.loadingHide()
                }
            });
        },

        queryDownLoadRestPost:function (url,data,callback) {
            console.log("订单导出POST",data);
            $.commonAjax({
                type: "POST",
                url: host + url,
                urlParams:JSON.stringify(data),
                beforeSend: function () {},
                success: function (result) {
                    $.loadingHide()
                    if(result.code == 200){
                        if(callback){
                            callback(data)
                        }
                    }else{
                        $.showPopTips("", "warning", result.message);
                    }
                },
                error: function (res) {
                }
            });
        },
        /**
         * 退单导出校验
         */
        refundQueryDownLoadRest:function(data,callback){
            $.commonAjax({
                type: "GET",
                urlParams:data,
                url: host + '/p-trade-oc-admin/orderApi/admin/exportRefundOrder/check',
                beforeSend: function () {

                },
                success: function (result) {
                    $.loadingHide()
                    if(result.code == 200){
                        if(callback){
                            callback(data)
                        }
                    }else{
                        $.showPopTips("", "warning", result.message);
                    }
                },
                error: function (res) {
                    $.loadingHide()
                }
            });
        }
    };



    window.billCommonQuery = commonQuery;

})();