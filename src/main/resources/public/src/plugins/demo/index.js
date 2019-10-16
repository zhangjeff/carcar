/**
 * Created by chirsfu on 2017/2/16.
 */
//闭包插件 start
;(function ($) {
    /**
     * demo
     * @constructor pluginName
     * @author chris.fu <chris.fu@chinaredstar.com>
     * @param {string} week - 是否显示周.
     * @param {string} currentTime - 当前时间.
     */
    $.fn.demo = function (options, callback) {
        var defaults = {
            'week': 'prototype1.default',
            'currentTime': 'prototype2.default',
            'autoclose': true,
            'startDate': '',
            'onOk': function () {

            },
            'onCancel': function () {
                alert('Cancel');
            }
        };
        var opts = $.extend(defaults, options);
        $(this).each(function () {
            console.log(opts.week);


        });
        if (callback) {
            callback();
        }
    };
})(jQuery);
//闭包插件 end