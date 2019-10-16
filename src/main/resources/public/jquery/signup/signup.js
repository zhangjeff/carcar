var id = $.getUrlPath().id
var page = $.getUrlPath().page

$(function () {
    $("#booking").click(function () {
        var param={
            username:$("input[name=username]").val(),
            tel:$("input[name=tel]").val()
        };

        $.ajax({
            type: "POST",
            url: host + '/carcar/signup',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(param),
            success: function (result) {
                alert("报名成功");
                $("input[name=username]").val("");
                $("input[name=tel]").val("");

            },
            error: function (result) {
                console.log('error')
            }
        });
    });
});
