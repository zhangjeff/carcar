/**
 * Created by lenovo on 2017/3/14.
 */

var newAddDialog = (function () {

  return {
    secondModal: function(bindDivTarget,bindPrevConfirm,paramSelfDefine){
    $('#'+bindDivTarget).remove();
    var modalDiv="";
    modalDiv+="<div class='modal fade' id="+bindDivTarget+" tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>";
    modalDiv+="<div style='width: 300px;height: 250px'  class='modal-dialog'>";
    modalDiv+="<div class='modal-content'>";
    modalDiv+="<div style='text-align: center' class='modal-header' >已支付 <input type='text' class="+paramSelfDefine+" style='width: 100px;height: 30px;font-size: 20px'> 元</div>";
    modalDiv+="<div class='modal-footer' style='text-align: center'>"
    modalDiv+="<button  type='button' class='btn btn-default btn-info' data-dismiss='modal'>确定</button>"
    modalDiv+="</div>"
    modalDiv+="</div>"
    modalDiv+="</div>"
    modalDiv+="</div>"

    $("#"+bindPrevConfirm).data("toggle");
    $("#"+bindPrevConfirm).data("target");
    $("body").append(modalDiv)
  },

    // 普通提示框
    againConfirm : function(respondsWords,callback){
      $('#againConfirmModal').remove();
      $('#alertModal').remove();
      var modalDiv="<div id='againConfirmModal' " +
        "class='alert modal-alert modal-alert-position'" +
        "style ='text-align: center;'>"+
        "<a class='close closeBtn' data-dismiss='alert' style='color:#2d3eff;'>"+
        "&times;"+
        "</a>"+
        "<span class='modal-customized-title'>"+respondsWords+"</span>"+
        "<div style='text-align: center;'>"+
        "<button id='checkConfirmBtn' class='btn diyButtonSize closeBtn' data-dismiss='alert'>确定</button>"+
        "</div>"+
        "</div>"

      //$("body").append(modalDiv)
      $(modalDiv).appendTo($("body")).find(".closeBtn").click(function(){
        $("#mask").remove();
        if(callback && typeof callback == 'function'){
          callback()
        }
      })
    },

    // 延时自动消失
    againConfirm_setTimeout:function(respondsWords){
       $('#setTimeoutModal').remove();
      var modalDiv="<div id='setTimeoutModal' " +
        "class='alert alert-info'" +
        " style='position: absolute;top:20%;left: 40%; z-index: 100; width: 300px;height: 200px;line-height: 80px;margin: 0 auto;" +
        "text-align: center;background-color: white'>"+
        "<a class='close' data-dismiss='alert' style='color:#2d3eff'>"+
        "&times;"+
        "</a>"+
        "<strong style='font-size:20px;color: black;'>"+respondsWords+"</strong>"+
        "<div style='text-align: center;'>"+
        "<button class='btn btn-info' data-dismiss='alert' style='background-color: #2aabd2'>确定</button>"+
        "</div>"+
        "</div>"
      $("body").append(modalDiv)

      var skipPage = function () {
        window.location.href = '../index.html'
      }
      function setTime() {
        setTimeout("window.location.href = '../index.html'", 3000);
      }
      setTime();
    },

    // 含遮罩层
    addClickModal: function (bindId,respondsWords) {
      $('#alertModal').remove();
      var modalDiv = "";
      modalDiv += "<div class='modal fade' id='alertModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' >";
      modalDiv += "<div style='width: 300px;height: 250px'  class='modal-dialog'>";
      modalDiv += "<div class='modal-content'>";
      modalDiv += "<div style='text-align: center' class='modal-header'>"+respondsWords+"</div>";
      modalDiv += "<div class='modal-footer'>"
      modalDiv += "<button id type='button' class='btn btn-default diyButtonSize btn-info' data-dismiss='modal'>确定</button>"
      modalDiv += "</div>"
      modalDiv += "</div>"
      modalDiv += "</div>"
      modalDiv += "</div>"
      $("#" + bindId).attr("data-toggle",'modal');
      $("#" + bindId).attr("data-target",'#alertModal');
      $("body").append(modalDiv)
    },

    addNewClickModal: function (bindId,respondsWords) {
      $('#alertModal').remove();
      $("#check").remove();
      var modalDiv = "";
      modalDiv += "<div class='modal fade' id='alertModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' style='z-index:2050'>";
      modalDiv += "<div style='width: 300px;height: 250px'  class='modal-dialog'>";
      modalDiv += "<div class='modal-content'>";
      modalDiv += "<div style='text-align: center' class='modal-header'>"+respondsWords+"</div>";
      modalDiv += "<div class='modal-footer'>"
      modalDiv += "<button id type='button' class='btn btn-default btn-info diyButtonSize' data-dismiss='modal'>确定 </button>"
      modalDiv += "</div>";
      modalDiv += "</div>";
      modalDiv += "</div>";
      modalDiv += "</div>";
      var btn = "<button id='check'/>";
      $("body").append(modalDiv);
      $("body").append(btn);
      $("#check").attr("data-toggle",'modal');
      $("#check").attr("data-target",'#alertModal').click();
      $('#check').next('.fade.in').css('z-index',2000);
    },

    EditWhateverYouWant: function(){

      var canEditedTd = $("tbody td");
      canEditedTd.click(function() {
        var get_tdObj = $(this);
        var catch_origin_text = get_tdObj.html();
        get_tdObj.html("");
        var defindAnInputObj = $("<input type='text'>").css("border-width","0")
          .css("font-size","16px").width(get_tdObj.width())
          .val(catch_origin_text).appendTo(get_tdObj);
        defindAnInputObj.trigger("focus").trigger("select");
        defindAnInputObj.click(function() {
          return false;
        });
      });

    },
      // 优化
      confirmModal: function (bindId,respondsWords,submitMsg,clickId,cancelId) {
          $('#alertModal').remove();
          $("#check").remove();
          var modalDiv = "";
          modalDiv += "<div class='modal fade' id='alertModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'  style='z-index: 2005' >";
          modalDiv += "<div style='width: 500px;height: 800px'  class='modal-dialog'>";
          modalDiv += "<div class='modal-content'>";
          modalDiv += "<div style='text-align: center;' class='modal-header'>"+respondsWords+"</div>";
          modalDiv += "<div class='modal-footer'>"
          modalDiv += "<button id="+clickId+" type='button' class='btn btn-default btn-info diyButtonSize' data-dismiss='modal'>"+submitMsg+" </button>"
          var cancel = ''
          if(cancelId){
        	  cancel = cancelId
          }
          modalDiv += "<button id='"+cancel+"' type='button' class='btn btn-default btn-info diyButtonSize' data-dismiss='modal'>取消 </button>"
          modalDiv += "</div>"
          modalDiv += "</div>"
          modalDiv += "</div>"
          modalDiv += "</div>"
          var btn = "<button id='check'/>";
          $("body").append(modalDiv);
          $("body").append(btn);
          $("#check").attr("data-toggle",'modal');
          $("#check").attr("data-target",'#alertModal').click();
          $('#check').next('.fade.in').css('z-index',2000);
          $("#check").remove();
      }
  }
})()
