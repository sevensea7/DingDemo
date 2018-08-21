// 接口定义
const APPHOST = 'http://192.168.22.22/dingEappApi/'; // 接口地址
const DingInfoURL = 'getApiByName.php?event=jsapi_oauth'; // 鉴权接口
const UserInfoURL = 'getApiByName.php?event=get_userinfo'; // 用户信息接口

// 当前页面路径url
var _config = {};
var path = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;

// ajax请求鉴权数据
 $.ajax({
        url: APPHOST + DingInfoURL,
        type: 'GET',
        async: false,
        data: { "href": path },
        dataType: 'json',
        timeout: 15000, //超时时间：15秒
        success: function (data) {
            _config = data.data;
            alert(JSON.stringify(_config));
        },
        error: function (xhr, errorType, error) {
          console.log(errorType + ',' + error + ',' + JSON.stringify(xhr));
        }
    });

// config配置
const getDingtalkConfig = function () {
    // 此方法返回钉钉 JSAPI 所需要的配置
    return {
        agentId: _config.agentId, // 必填，微应用ID
        corpId: _config.corpId, //必填，企业ID
        timeStamp: _config.timeStamp, // 必填，生成签名的时间戳
        nonceStr: _config.nonceStr, // 必填，生成签名的随机串
        signature: _config.signature, // 必填，签名
        type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList: apiList,
    };
};


const apiList = [
    // 需要使用的jsapi列表，注意：不要带dd
    'biz.util.datepicker',
    'biz.util.chosen',
    'biz.contact.complexPicker',
    'biz.util.uploadImage',
    'biz.contact.departmentsPicker',
    'biz.util.previewImage',
    'biz.navigation.replace',
    'biz.util.openLink',
    'runtime.permission.requestAuthCode',
    'device.notification.toast',
    'device.notification.showPreloader',
    'device.notification.hidePreloader',
    'ui.webViewBounce.disable',
    'biz.navigation.setLeft',
    'biz.navigation.setRight',
    'biz.navigation.setMenu',
    'biz.customContact.multipleChoose'
];

//  鉴权调用方法
const DDReady = new Promise(function (resolve, reject) {

    var data = getDingtalkConfig();
    dd.config(data);
    dd.ready(function () {
      resolve(dd);
    });
    dd.error(function (err) {
      console.log('dd error: ' + JSON.stringify(err));
      reject(err);
    });
});

// 禁用bounce
dd.ready(function () {
  dd.ui.webViewBounce.disable();
})

// 修改左侧返回按钮
function setLeftClose() {

    if (dd.ios) {
      dd.biz.navigation.setLeft({
        control: true,// 是否控制点击事件，true 控制，false 不控制， 默认false
        text: '',// 控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          // 如果control为true，则onSuccess将在发生按钮点击事件被回调
          dd.biz.navigation.close({
            onSuccess: function (result) { },
            onFail: function (err) { }
          });
        },
        onFail: function (err) { }
      });
    } else {
      document.addEventListener('backbutton', function (e) {
        // 在这里处理你的业务逻辑
        dd.biz.navigation.close({
          onSuccess: function (result) { },
          onFail: function (err) { }
        });
        e.preventDefault(); // backbutton事件的默认行为是回退历史记录，如果你想阻止默认的回退行为，那么可以通过preventDefault()实现
      });
    }
}

// 设置右侧按钮
function setRightBtn(title, callback) {
  dd.biz.navigation.setRight({
    show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
    control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
    text: title,//控制显示文本，空字符串表示显示默认文本
    onSuccess: function (result) {
      //如果control为true，则onSuccess将在发生按钮点击事件被回调
      callback();
    },
    onFail: function (err) { }
  });

}

// 隐藏右侧按钮
function hideRightBtn() {
  dd.biz.navigation.setRight({
    show: false,//控制按钮显示， true 显示， false 隐藏， 默认true
    control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
    text: '',//控制显示文本，空字符串表示显示默认文本
    onSuccess: function (result) {
      //如果control为true，则onSuccess将在发生按钮点击事件被回调
    },
    onFail: function (err) { }
  });
}

// 弹框显示toast
function showToast(result, msg) {
  dd.device.notification.toast({
    icon: result, //icon样式，有success和error，默认为空 0.0.2
    text: msg, //提示信息
    duration: 2, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
    delay: 0, //延迟显示，单位秒，默认0
    onSuccess: function (result) { },
    onFail: function (err) { }
  });
}

// loading管理
function showLoading() {
  dd.device.notification.showPreloader({
    text: "", //loading显示的字符，空表示不显示文字
    showIcon: true, //是否显示icon，默认true。Android无此参数。
    onSuccess: function (result) { },
    onFail: function (err) { }
  });
}

// 隐藏loading
function hideLoading() {
  dd.device.notification.hidePreloader({
    onSuccess: function (result) { },
    onFail: function (err) { }
  });
}

// 获取用户信息
function getUserInfo(authCode) {
  var _userInfo = {};
  $.ajax({
      url: APPHOST + UserInfoURL,
      type: 'POST',
      async: false,
      data: { "code": authCode },
      dataType: 'json',
      timeout: 15000, //超时时间：15秒
      success: function (data) {
        _userInfo = data.data;
        alert(JSON.stringify(_userInfo));
      },
      error: function (xhr, errorType, error) {
        console.log(errorType + ',' + error + ',' + JSON.stringify(xhr));
      }
  });
return _userInfo;
}
