var id = $.getUrlPath().id
var page = $.getUrlPath().page

$(function () {
    $.ajax({
        type: "GET",
        url: host + '/carcar/zhihu/zhihuContent',
        dataType: 'json',
        contentType: 'application/json',
        // data: JSON.stringify(param),
        success: function (result) {

           console.table([1111,result, 2222]);

        },
        error: function (result) {
            console.log('error')
        }
    });
});
