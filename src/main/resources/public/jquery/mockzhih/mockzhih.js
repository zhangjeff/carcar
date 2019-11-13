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
            result.forEach(function(item, index){
                var sectionVal = "";
                if (item.section_list) {
                    item.section_list.forEach(function(subitem, index){
                        sectionVal = sectionVal + "<span>" + subitem.section_title + "</span>";
                    });
                }

                var  objHtml = $("#template").html()
                               .replace("srcurl", item.banner)
                               .replace("titleVal", item.title)
                               .replace("contentVal", item.introduction)
                               .replace("senctionList", sectionVal)
                               .replace("viewCountVal", item.view_count);


                $(".allList").append(objHtml);
            });
           console.table([1111,result, 2222]);

        },
        error: function (result) {
            console.log('error')
        }
    });
});
