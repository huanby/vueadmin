
export default {
  // 获取url参数
  getQueryString: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  },
  // 格式化字符串前后空格
  trimString: function (str) {
    return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '')
  },
  // new Date()转换成24小时制 dateToString(new Date(), "yyyy-MM-dd hh:mm:ss");
  dateToString: function (date, fmt) {
    var o = {
      'Q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours() % 24 == 0 ? '00' : date.getHours() % 24, // 小时
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'f+': date.getMilliseconds() // 毫秒
    }
    var week = {
      '0': '/u65e5',
      '1': '/u4e00',
      '2': '/u4e8c',
      '3': '/u4e09',
      '4': '/u56db',
      '5': '/u4e94',
      '6': '/u516d'
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    if (/(E+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']) }
    for (var k in o) {
      if (k === 'f+') {
        if (new RegExp('(' + k + ')').test(fmt)) {
          var regExp0 = '000000000' + o[k]
          fmt = fmt.replace(RegExp.$1, regExp0.substr(regExp0.length - RegExp.$1.length))
        }
      } else {
        if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      }
    }
    return fmt
  },
  String2Date: function (date) {
    return new Date(Date.parse(date.replace(/-/g, '/')))
  },

  // 刘立伟 "2018-08-17T01:00:00.000+0000"
  utcToString: function (utcTime, fmt) {
    if (utcTime.indexOf("T") >= 0) {
      var ret = utcTime.replace("T", " ");
      var res = ret.substring(0, 19);
      var tmStr = "";
      if (fmt.indexOf("ss") >= 0) {
        //秒 "yyyy-MM-dd hh:mm:ss"
        tmStr = this.getForeOrNextDate(res, 8, "sec");
      } else if (fmt.indexOf("mm") >= 0) {
        //分钟 "yyyy-MM-dd hh:mm"
        tmStr = this.getForeOrNextDate(res, 8, "min");
      } else if (fmt.indexOf("hh") >= 0) {
        //小时 "yyyy-MM-dd hh:00"
        tmStr = this.getForeOrNextDate(res, 8, "hour");
      } else if (fmt.indexOf("dd") >= 0) {
        //天 "yyyy-MM-dd"
        tmStr = this.getForeOrNextDate(res, 8, "day");
      } else if (fmt.indexOf("MM") >= 0) {
        //天 "yyyy-MM"
        tmStr = this.getForeOrNextDate(res, 8, "mon");
      } else if (fmt.indexOf("yyyy") >= 0) {
        //天 "yyyy"
        tmStr = this.getForeOrNextDate(res, 8, "year");
      }
    } else {
      var subD = utcTime.substring(0, 16);
      var dTime = new Date(Date.parse(subD.replace(/-/g, '/')))
      tmStr = this.dateToString(dTime, fmt);
    }
    return tmStr;
  },

  // 参数dateValue为时间类型yyyy-mm-dd hh:mm:ss（必填）
  // timeCount为向前或是向后的时间（一天为24....）（必填）
  // isType表示目标时间的类型：年year、月mon、日day、时hour、分min、sec秒
  getForeOrNextDate: function (dateValue, timeCount, isType) {
    var d = new Date(Date.parse(dateValue.replace(/-/g, '/')))
    var a = d.valueOf() // 得到/Date(123456789)格式的时间
    a = a + (timeCount * 3600 * 1000) // 可加可減
    a = new Date(a)
    var month = a.getMonth() + 1;
    var strDate = a.getDate();
    var hour = a.getHours();
    var minute = a.getMinutes();
    var second = a.getSeconds(); // 秒
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate;
    }
    if (hour >= 0 && hour <= 9) {
      hour = '0' + hour;
    }
    if (minute >= 0 && minute <= 9) {
      minute = '0' + minute;
    }
    if (second >= 0 && second <= 9) {
      second = '0' + second;
    }
    var str = ''
    switch (isType) {
      case 'year':
        str = a.getFullYear();
        break
      case 'mon':
        str = a.getFullYear() + '-' + month;
        break
      case 'day':
        str = a.getFullYear() + '-' + month + '-' + strDate;
        break
      case 'hour':
        str = a.getFullYear() + '-' + month + '-' + strDate + ' ' + hour + ':' + '00';
        break
      case 'min':
        str = a.getFullYear() + '-' + month + '-' + strDate + ' ' + hour + ':' + minute;
        break
      case 'sec':
        str = a.getFullYear() + '-' + month + '-' + strDate + ' ' + hour + ':' + minute + ':' + second;
        break
    }
    return str
  },
  //* ****可以用于保留任何小数位数,可以为0.000....
  // 格式化数字(保留小数位数)；value数值类型数字,num保留小数位数
  formatNum: function (value, num) {
    if (value !== '' && value != null && value != undefined) {
      if (typeof value === 'number') {
        var number = value.toFixed(num)
        if (value !== 0) {
          return number
        } else {
          var zero = ''
          for (var i = 0; i < num; i++) {
            zero += eval('0')
          }
          return '0.' + zero
        }
      } else {
        return ''
      }
    } else {
      return ''
    }
  },
  // 1. 被修约的数字小于5时，该数字舍去；
  // 2. 被修约的数字大于5时，则进位；
  // 3. 被修约的数字等于5时，要看5前面的数字，若是奇数则进位，若是偶数则将5舍掉，即修约后末尾数字都成为偶数；
  //    若5的后面还有不为“0”的任何数，则此时无论5的前面是奇数还是偶数，均应进位。
  // 小数位数
  formatFixed: function (num, decimalPlaces) {
    var d = decimalPlaces || 0
    var m = Math.pow(10, d)
    var n = +(d ? num * m : num).toFixed(8) // Avoid rounding errors
    var i = Math.floor(n)
    var f = n - i
    var e = 1e-8 // Allow for rounding errors in f
    var r = (f > 0.5 - e && f < 0.5 + e)
      ? ((i % 2 == 0) ? i : i + 1) : Math.round(n)
    var result = (d ? r / m : r).toString()
    var index = result.indexOf('.')
    if (index < 0) {
      result = result + '.'
      for (var j = 0; j < decimalPlaces; j++) result = result + '0'
    }
    return result
  },
  // 有效数字的舍入规则
  // 1、当保留n位有效数字，若第n+1位数字≤4就舍掉。
  // 2、当保留n位有效数字，若第n+1位数字≥6时，则第n位数字进1。
  // 3、当保留n位有效数字，若第n+1位数字=5且后面数字为0时 ，则第n位数字若为偶数时就舍掉后面的数字，若第n位数字为奇数时加1；
  // 若第n+1位数字=5且后面还有不为0的任何数字时，无论第n位数字是奇或是偶都加1。
  // 保留有效数字
  formatPrecision: function (num, decimalPlaces) {
    var d = decimalPlaces || 0
    var m = Math.pow(10, d)
    var n = +(d ? num * m : num).toFixed(8) // Avoid rounding errors
    var index = n.toString().indexOf('.')
    if (index >= 0) { n = n.toString().substring(0, index) }
    var len = n.toString().length
    var ii = n.toString().substring(0, decimalPlaces + 1)
    for (var i = decimalPlaces + 1; i < len; i++) ii = ii + '0'
    var i = Math.floor(parseInt(n.toString().substring(0, decimalPlaces)))
    var f = parseInt(n) - parseInt(ii)
    var r = (f == 0 ? ((i % 2 == 0) ? i : i + 1) : i + 1).toString()
    for (var i = decimalPlaces; i < len; i++) r = r + '0'
    r = parseInt(r)
    var result = (d ? r / m : r).toString()
    var indexr = result.indexOf('.')
    var lenr = result.length
    if (indexr < 0 && (decimalPlaces - lenr) > 0) {
      result = result + '.'
      for (var i = 0; i < decimalPlaces - lenr; i++) result = result + '0'
    }
    return result
  }
}
