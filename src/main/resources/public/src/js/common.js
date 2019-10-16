var daily = false;
var indexUrl = '/page/index.html';
var dailyUrl = '/page/dailyReckoning/checkstand.html';
var gatheringUrl = '/page/gathering/searchOrder.html';
var refundUrl = '/page/refundment/refundSearch.html';
var reportFormUrl = '/page/ReportForm/transactionQuery_cashier.html'

var chinaNumber = ["一","二","三","四","五","六","七","八","九","十"];
var longDateFormat = 'yyyy-MM-dd HH:mm:ss';
var aDayMin = '24*60*60*1000';

var searchOrder = "searchOrder";
var searchRefundOrder = "searchRefundOrder";
var confirmMoney = "confirmMoney";
var confirmRefundMoney = "confirmRefundMoney";
var contextPath = '/employee-opas';

var jump = window.location.protocol + "//"+ window.location.host


var winL = window.location.href;
var path = '';
if(winL.indexOf('http://local:63342/public/pages') != -1 || winL.indexOf('http://local.rs.com:8002/public/pages') != -1) {
  path = '';
  //path = 'http://10.11.29.87:53103'
}
else {
  path = ''
}

//var path="http://employee-opas.dev.rs.com";
// var path="http://10.11.30.3:54501";




function enterBtn(id){
  $(document).keyup(function(e){
    if(e.keyCode == 13){
      $('#'+id).click();
    }
  })
}

function backToIndex(id){
  $('#'+id).on('click',function(){
    var url = window.location.href;
    window.location.href = url.substring(0,url.indexOf('/page/'))+'/page/index.html';
  })
}


function urlString(valueData){
  var urlStringArr = [], urlString = '';
  for (var key in valueData) {
    urlStringArr.push(key + '=' + valueData[key]);
  }
  urlString = urlStringArr.join('&');
  return urlString
}

function normalGet(url,successFunc,errorFunc,asyn){
  $.ajax({
    type: 'get',
    url: path + url,
    success: successFunc,
    error:errorFunc,
    async: asyn
  });
}

function normalPost(url,d,successFunc,errorFunc,asyn){
  $.loading()
  $.ajax({
    type: 'post',
    url: path + url,
    data: d,
    cache: false,
    contentType: 'application/json',
    dataType: 'json',
    success: function (res) {
      $.loadingHide()
      successFunc(res)
    },
    error:function (err) {
      $.loadingHide()
      errorFunc(err)
    },
    async: asyn
  });
}

function earlyDate(t){
  var date = new Date();
  return new Date(date.getTime() - t*aDayMin);
}

function longFormatDate(date){
  return formatDate("yyyy-MM-dd HH:mm:ss",date)
}

function shortChannel(value,row,index) {
  return value == 1?'线上':'线下'
}

function favoredFactory(value,row,index) {
  return '¥-' + value
}

function checkFormatter(value,row,index) {
  if (row.isSelected == true)
    return {
      checked : true//设置选中
    };
  return value;
}

function shortFormatDate(date,a,b){
  if (date == null){
    return "";
  }
  return formatDate("yyyy-MM-dd",new Date(date));
}

function returnIndex(date,a,b){
  return ++b;
}


function formatDate(fmt,date) {
  var o = {
    "M+" : date.getMonth()+1, //月份
    "d+" : date.getDate(), //日
    "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
    "H+" : date.getHours(), //小时
    "m+" : date.getMinutes(), //分
    "s+" : date.getSeconds(), //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S" : date.getMilliseconds() //毫秒
  };
  var week = {
    "0" : "/u65e5",
    "1" : "/u4e00",
    "2" : "/u4e8c",
    "3" : "/u4e09",
    "4" : "/u56db",
    "5" : "/u4e94",
    "6" : "/u516d"
  };
  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  if(/(E+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[date.getDay()+""]);
  }
  for(var k in o){
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

function lastRowSummaryText(tableId) {
  var trArray = $("#" + tableId + " tbody tr");
  if (trArray.length > 1){
    var lastRow = trArray[trArray.length-1];
    $("td",lastRow).eq(0).text("合计");
  }
}
/***
 *  data.format 时间戳格式化为时间
 *
 * ***/

Date.prototype.format = function(format) {
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
      (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
        RegExp.$1.length==1 ? o[k] :
            ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
}

/***
 * 时间插件
 * @function initDate
 * @param startId   开始时间对象id
 * @param endId     完成时间开始id
 * @param starTime  开始时间init，可选，默认为今天
 * @param limitDay  允许选择时间范围，可选， 默认30天
 * ***/
function initDate(startId,endId,starTime,limitDay){
  if(!limitDay){
    limitDay = 90;
  }
  $('#'+startId).val('');
  $('#'+endId).val('');
  $('#'+startId).datetimepicker({
    format: 'yyyy-mm-dd',
    minView: 3,
    language : 'zh-CN',
    autoclose : true
  });
  if(starTime){
    var getStarTime;
    if(starTime ==='initCommon'){
      /*begin init starTime this*/
      var nowDate = new Date();
      var startDate = nowDate.getTime()-7*24*60*60*1000;
      console.log(startDate)
      var nowDate7 =  new Date(startDate);
      getStarTime = nowDate7.format('yyyy-MM-dd');
      /*end init starTime this*/
    }else{
      getStarTime = starTime;
    }
    var date = new Date(getStarTime);
    $('#'+startId).val(getStarTime);
    $('#'+endId).datetimepicker({
      format: 'yyyy-mm-dd',
      minView: 3,
      language : 'zh-CN',
      autoclose : true
    });
    if(limitDay){
      var endDate = date.getTime()+limitDay*24*60*60*1000;
      var initEndDate = date.getTime()+7*24*60*60*1000;
      endDate = new Date(endDate);
      initEndDate = new Date(initEndDate);
      $('#'+endId).datetimepicker('setEndDate',formatDate("yyyy-MM-dd",endDate));
      $('#'+endId).val(initEndDate.format('yyyy-MM-dd'));
    }
    $('#'+endId).datetimepicker('setStartDate',getStarTime);
  }
  $('#'+startId).datetimepicker().on('changeDate',function(){
    var thisDate = $(this).val();
    var endDateVal = $('#'+endId).val();
    var startDate = new Date(thisDate);
    var endDate = new Date(endDateVal);

    if(endDate<startDate||startDate.getTime()+ limitDay*24*60*60*1000< endDate){
      $('#'+endId).val("");
    }
    if(thisDate){
      thisDate = thisDate.replace(/-/g, '/');
      var date = new Date(thisDate);
      $('#'+endId).datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 3,
        language : 'zh-CN',
        autoclose : true
      });
      $('#'+endId).datetimepicker('setStartDate',formatDate("yyyy-MM-dd",date));
      if(limitDay&&starTime){
        var endDate = date.getTime()+limitDay*24*60*60*1000;
        endDate = new Date(endDate);
        $('#'+endId).datetimepicker('setEndDate',formatDate("yyyy-MM-dd",endDate));
      }

    }
  })
}

function addTotal(className){
  $('.'+className+':last').text("合计");
}

var shopNoSuggestion;
var merchantSuggestion;
var leaseHolderSuggestion;
var brandSuggestion;
var marketSuggestion;
function shopListAutoComplete(shopMap,shopElementId,suggestionType) {
  var shopArray = [];
  for (var shop in shopMap){
    var shopItem = {value: shop + " " + shopMap[shop],data:shop};
    shopArray.push(shopItem);
  }
  $( "#" + shopElementId).autocomplete({
    minLength: 0,
    lookup: shopArray,
    triggerSelectOnValidInput:true,
    onSelect: function (suggestion) {
      clearOrSetSuggestion(suggestion,suggestionType);
    }
  }).on("keyup",function (e) {
    if (e.keyCode != '13'){
      clearOrSetSuggestion(null,suggestionType);
    }
  });
}


var suggestionTypeObj = {shop:"shop",merchant:"merchant",brand:"brand",market:"market",floor:'floor',leaseHolder:'leaseHolder'};
function clearOrSetSuggestion(suggestion,suggestionType) {
  switch (suggestionType){
    case suggestionTypeObj.shop:
      shopNoSuggestion = suggestion;
      break;
    case suggestionTypeObj.merchant:
      merchantSuggestion = suggestion;
      break;
    case suggestionTypeObj.leaseHolder:
      leaseHolderSuggestion = suggestion;
      break;
    case suggestionTypeObj.brand:
      brandSuggestion = suggestion;
      break;
    case suggestionTypeObj.market:
      marketSuggestion = suggestion;
      break;
    case suggestionTypeObj.floor:
      floorSuggestion = suggestion;
      break;
    default:
      marketSuggestion = '';
  }
}
//商场
function getMarket(marketElementId) {
  $.ajax({
    type: 'get',
    url: path + '/opas/e/common/marketParam/market',
    success: function(o){
      if(o.success){
        shopListAutoComplete(o.value,marketElementId,suggestionTypeObj.market);
      }
    },
    async: false
  });
}
// 店铺
function getShop(shopElementId) {
  $.ajax({
    type: 'get',
    url: path + '/opas/e/common/marketParam/shop',
    success: function(o){
      if(o.success){
        shopListAutoComplete(o.value,shopElementId,suggestionTypeObj.shop);
      }
    },
    async: true
  });
}
//授权方
function getMerchant(merchantElementId) {
  $.ajax({
    type: 'get',
    url: path + '/opas/e/common/marketParam/merchant',
    success: function(o){
      if(o.success){
        shopListAutoComplete(o.value,merchantElementId,suggestionTypeObj.merchant);
      }
    },
    async: true
  });
}
//商户 leaseHolder
function getLeaseHolder(leaseHolderElementId) {
  $.ajax({
    type: 'get',
    url: path + '/opas/e/common/marketParam/leaseHolder',
    success: function(o){
      if(o.success){
        shopListAutoComplete(o.value,leaseHolderElementId,suggestionTypeObj.leaseHolder);
      }
    },
    async: true
  });
}
// 品牌
function getBrand(brandElementId) {
  $.ajax({
    type: 'get',
    url: path + '/opas/e/common/marketParam/brand',
    success: function(o){
      if(o.success){
        shopListAutoComplete(o.value,brandElementId,suggestionTypeObj.brand);
      }
    },
    async: true
  });
}
// 楼层
function getFloor(floorElementId) {
  $.ajax({
    type: 'get',
    url: path + '/opas/e/rebate/getFloors',
    success: function(o){
      if(o.success){
        shopListAutoComplete(o.value,floorElementId,suggestionTypeObj.floor);
      }
    },
    async: true
  });
}

function getMerchantOrShopParam(eleId,type) {
  var jqEle = $('#' + eleId);
  if (jqEle.val() != ''){
    jqEle.focus(); // 触发autocomplete自动匹配
    if (type == suggestionTypeObj.shop){
      if (shopNoSuggestion){
        return shopNoSuggestion.data;
      }else {
        window.newAddDialog.againConfirm("店铺不存在!");
        return false;
      }
    }else if (type == suggestionTypeObj.leaseHolder){
      if (leaseHolderSuggestion){
        return leaseHolderSuggestion.data;
      }else {
        window.newAddDialog.againConfirm("商户不存在!");
        return false;
      }
    }else if (type == suggestionTypeObj.brand){
      if (brandSuggestion){
        return brandSuggestion.data;
      }else {
        window.newAddDialog.againConfirm("品牌不存在!");
        return false;
      }
    } else if (type == suggestionTypeObj.floor){
      if (floorSuggestion){
        return floorSuggestion.value;
      }else {
        window.newAddDialog.againConfirm("楼层不存在!");
        return false;
      }
    } else if (type == suggestionTypeObj.market) {
      if (marketSuggestion) {
        return marketSuggestion.data;
      } else {
        window.newAddDialog.againConfirm("商场不存在!");
        return false;
      }
    }
  }
  return '';
}

function rePrint(){
  $('#RECORD_BTN').on('click',function(){
    var evidenceNo = $('#RECORD_EVIDENCENO').val();
    var tradeSeqNo = $('#RECORD_TRADE').val();
    if (!(evidenceNo && tradeSeqNo)){
      window.newAddDialog.againConfirm("请输入小票上的交易单号和电子票号 !");
      return;
    }
    var obj = {};
    obj.evidenceNo = evidenceNo;
    obj.tradeSeqNo = tradeSeqNo;
    normalPost('/opas/e/pay/rePrint',JSON.stringify(obj),function(susData){
      if(susData.success){
        var d = susData.value;
        window.sendMsg(d);
      }else{
        window.newAddDialog.againConfirm(susData.message);
      }
    },function(){
      window.newAddDialog.againConfirm("系统繁忙请稍后！")
    },false);
  })
}
/***
 * 获取楼层
 * @function getFloors
 * @param {string} boxId - 容器ID
 * @param {string} selectId - select框ID
 * ***/

function getFloors(boxId, selectId){
  var html = '<select id="'+ selectId +'" class="form-select">';
  html += '<option value="">全选</option>';
  html += '</select>';
  $('#'+boxId).html(html);
  $.ajax({
    type: 'get',
    url: path + '/opas/e/common/marketParam/floor',
    contentType: 'application/json',
    dataType: 'json',
    success: function(o){
      var list ='';
      if(o.success){
        for(var key in o.value){
          list += '<option value="'+key+'">'+o.value[key]+'</option>';
        }
        $(list).appendTo($("#"+selectId));
      }
    },
    error:function(){console.log('error','/opas/e/rebate/getFloors')},
    async: false
  });
}
/**
 * 获取登录人所在的商场
 */
function getUserMarket(marketElementId) {
  $.ajax({
    type: 'post',
    url: path + '/opas/e/marketConfig/queryMarket',
    success: function(o){
      if(o.success){
        shopListAutoComplete(o.value, marketElementId, suggestionTypeObj.market);

      }
    },
    async: false
  });
}
/***
 * 获取支付方式
 * @function getPayCategory
 * @param {string} boxId - 容器ID
 * @param {string} selectId - select框ID
 * ***/

function getPayCategory(boxId,selectId){
  var html = '<select id="'+ selectId +'" class="form-select">';
  html += '<option value="">全选</option>';
  html += '</select>';
  $('#'+boxId).html(html);
  $.ajax({
    type: 'get',
    url: path + '/opas/e/common/Category/ALL',
    contentType: 'application/json',
    dataType: 'json',
    success: function(o){
      if(o.success){
        var list ='';
        if(o.success){
          for(var key in o.value){
            list += '<option value="'+key+'">'+o.value[key]+'</option>';
          }
          $(list).appendTo($("#"+selectId));
        }
      }
    },
    error:function(){console.log('error','/opas/e/common/Category/ALL')},
    async: false
  });
}
/***
 * 获取数据来源
 * @function getEmployeeType
 * @param {string} boxId - 容器ID
 * @param {string} selectId - select框ID
 * ***/

function getEmployeeType(boxId,selectId){
  var html = '<select id="'+ selectId +'" class="form-select">';
  html += '<option value="">全选</option>';
  html += '<option value="TermB">商户自收银</option>';
  html += '<option value="TermE">商场收银台</option>';
  html += '</select>';
  $('#'+boxId).html(html);
}
//数字转换为千分位
function formatMoney(amt) {
  if (amt !== null && amt !== '') {
    return ((parseFloat(amt).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,'));
  }
}
//转化数据来源code码
function employeeType(Term) {
  if (Term == 'TermB') {
    return "商户自收银";
  } else if(Term == 'TermE'){
    return "商场收银台";
  } else {
    return Term;
  }
}

$.loading = function() {
    if($('#loading').length == 0) {
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

$.loadingHide = function() {
    $('#loading').hide();
};

$(function () {
  $('.formPart .form-item .formlabel').hover(function(){
    var t = this;
    $(t).attr('title',$(t).html())
  },function () {

  })
});
