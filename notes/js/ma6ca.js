
$(function(){
  var isAndroid = window.navigator.userAgent.toLowerCase().indexOf('android') > -1 || window.navigator.userAgent.toLowerCase().indexOf('adr') > -1;
  var isiOS = !!window.navigator.userAgent.toLowerCase().match(/\(i[^;]+;( u;)? cpu.+mac os x/);
  var isWeiXin = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
  // 区分正式、测试环境下载地址
  var appUrl = window.location.hostname.indexOf('test-www.mc.cn') > -1 ? "https://test-applink.mc.cn/" : "https://applink.mc.cn/";

  // 浏览器支持跨域访问
  jQuery.support.cors = true;
  
  // // 如果是IOS 微信端打开，直接跳APP
  // if (isiOS && isWeiXin) {
  //   var ifr = document.createElement('iframe');
  //   ifr.src = appUrl; // 'https://url.mc.cn/UZJFVvaa'
  //   ifr.style.display = 'none';
  //   document.body.appendChild(ifr);
  // }
  
  function getTitle() {
    try {
      return document.getElementsByTagName('title')[0].innerText;
    } catch(e) {
      return '米橙 · 记录时光 规律生活';
    }
  }
  function getDescription() {
    try {
      return document.getElementsByName('description')[0].getAttribute('content');
    } catch(e) {
      return '米橙是一款集“事件提醒、事项管理、快速记录、图文创作、记账”等功能于一体的多设备同步的智能APP。米橙的“小橙”模块可使用语音智能创建以上各项内容，既快速又方便。';
    }
  }
  function getIcon() {
    try {
      // return location.href.replace(/\w+\.\w+$/, '').replace(/\/?$/, '/') + document.getElementsByName('icon')[0].getAttribute('href');
      return document.getElementsByName('icon')[0].getAttribute('href');
    } catch(e) {
      return 'https://m.mc.cn/favicon.png';
    }
  }

  // 分享相关
  $.getJSON('https://m.mc.cn/restful/share/autograph?url=' + encodeURIComponent(location.href.split('#')[0]), function(data) {
    var url = location.href;
    var wxObj = {
      title: getTitle(), // 分享标题
      desc: getDescription(), // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: getIcon(), // 分享图标
    }
    console.log(wxObj);
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名
      jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareWeibo',"onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone"] // 必填，需要使用的JS接口列表
    });
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    wx.error(function(res){
      console.log(res);
    });
    wx.ready(function () {     
      //“分享给朋友”及“分享到QQ”
      wx.updateAppMessageShareData(wxObj); 
      // “分享到朋友圈”及“分享到QQ空间”
      wx.updateTimelineShareData(wxObj);
      // 分享到腾讯微博
      wx.onMenuShareWeibo(wxObj);
    })
  });


  // 下载按钮点击
  $('.download').click(function() {
    if (isiOS) {
      window.location.href = appUrl;
      return;
    } else if (isAndroid) {
      if (isWeiXin){
		// 应用宝
        appUrl = "https://a.app.qq.com/o/simple.jsp?pkgname=cn.mc.mcxt";
      }
	  // 客户端暂不支持直接跳APP主页
	  //else {
      //  appUrl = "mcxt://splash";
      //  noApp();
      //}
      window.location.href = appUrl;
      return;
    }
    var timer = null;
    function noApp() {
      var t = Date.now(),
        r = "https://applink.mc.cn";
      timer = setTimeout(function() {
        return Date.now() - t > 2200 ?
          (clearTimeout(timer), !1) :
          !document.webkitHidden && !document.hidden && void(location.href = r);
      }, 2000);
    }
  });
  
});