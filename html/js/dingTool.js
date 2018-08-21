// 对Date的扩展，将Date转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

// 将String转化为Date
var stringToDate = function (dateStr, separator) {
  if (!separator) {
    separator = "-";
  }
  var dateArr = dateStr.split(separator);
  var year = parseInt(dateArr[0]);
  var month;
  //处理月份为04这样的情况
  if (dateArr[1].indexOf("0") == 0) {
    month = parseInt(dateArr[1].substring(1));
  } else {
    month = parseInt(dateArr[1]);
  }
  var day = parseInt(dateArr[2]);
  var date = new Date(year, month - 1, day);
  return date;
}

/**
 * 获取上一个月
 *
 * @date 格式为yyyy-MM-dd的日期，如：2018-01-01
 */
function getLastMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var year2 = year;
  var month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2;
  return t2;
}

/**
 * 获取下一个月
 *
 * @date 格式为yyyy-MM-dd的日期，如：2018-01-01
 */
function getNextMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var year2 = year;
  var month2 = parseInt(month) + 1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2;
  return t2;
}


/**
 * 获取上一个季度
 *
 * @date 格式为yyyy-q的日期，如：2018-1
 */
function getLastQuarter(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var quar = arr[1]; //获取当前日期的季度
  var year2 = year;
  var quar2 = parseInt(quar) - 1;
  if (quar2 == 0) {
    year2 = parseInt(year2) - 1;
    quar2 = 4;
  }
  var t2 = year2 + '-' + quar2;
  return t2;
}

/**
 * 获取下一个季度
 *
 * @date 格式为yyyy-q的日期，如：2018-1
 */
function getNextQuarter(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var quar = arr[1]; //获取当前日期的月份
  var year2 = year;
  var quar2 = parseInt(quar) + 1;
  if (quar2 == 5) {
    year2 = parseInt(year2) + 1;
    quar2 = 1;
  }
  var t2 = year2 + '-' + quar2;
  return t2;
}

/**
 * 获取上一个年份
 *
 * @date 格式为yyyy-MM-dd的日期，如：2018-01-01
 */
function getLastYear(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var year2 = parseInt(year) - 1;
  var t2 = year2;
  return t2;
}

/**
 * 获取下一个年份
 *
 * @date 格式为yyyy-MM-dd的日期，如：2018-01-01
 */
function getNextYear(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var year2 = parseInt(year) + 1;
  var t2 = year2;
  return t2;
}

/**
 * cookies管理
 */
// 写cookies
function setCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

// 读取cookies
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

// 删除cookies
function delCookie(name) {
  // var exp = new Date();
  // exp.setTime(exp.getTime() - 1);
  // var cval = getCookie(name);
  // if (cval != null)
  //   document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  setCookie(name, "");
}
