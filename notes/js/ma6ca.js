$(function() {
    var isAndroid = window.navigator.userAgent.toLowerCase().indexOf('android') > -1 || window.navigator.userAgent.toLowerCase().indexOf('adr') > -1;
    var isiOS = !!window.navigator.userAgent.toLowerCase().match(/\(i[^;]+;( u;)? cpu.+mac os x/);
    var isWeiXin = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
    var appUrl = "https://apps.apple.com/cn/app/id1495623965";

    // 浏览器支持跨域访问
    jQuery.support.cors = true;




    // 下载按钮点击
    $('.download').click(function() {
        if (isiOS) {
            window.location.href = appUrl;
            return;
        } else if (isAndroid) {
            if (isWeiXin) {
                // 应用宝

            }
            // 客户端暂不支持直接跳APP主页
            else {


            }
            window.location.href = appUrl;
            return;
        }
    });

});