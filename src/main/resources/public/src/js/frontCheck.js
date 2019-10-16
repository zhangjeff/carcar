/**
 * Created by lenovo on 2017/10/19.
 */
(function(){
    var url = window.location.href;
    //var flag = url.indexOf('/gathering') != -1 || url.indexOf('/refundment') != -1;
    $.ajax({
        type: 'get',
        url: jump + "/opas/e/dailySettle/frontCheck",
        data: {},
        cache: false,
        dataType: 'json',
        success: function(o){
            if (o.success){
                if (o.value["needDailySettle"]){
                    if (flag){
                        window.location.href = jump + "/employee-opas/page/index.html"
                    }else{
                        //button 置灰 and remove click 事件
                        window.daily = true;
                    }
                }
            }else {
              console.log(o.message);
            }
        },
        error:function(){
          console.log('/opas/e/dailySettle/frontCheck请求失败');
            if (flag){
                window.location.href = jump + "/employee-opas/page/index.html"
            }
        },
        async: false
    });
})();

