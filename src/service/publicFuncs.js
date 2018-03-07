/**
 *
 * @authors cate
 * @date    2017-04-11 13:31:07
 * @version $Id$
 */

export const checkMatch = {
  'isDig':
  {
    'regStr': /^[0-9]*[1-9][0-9]*$/,
    'regMsg': '数字格式错误!'
  },
  'notNull':
  {
    'regStr': /^[\s\S]+$/,
    'regMsg': '必填项不能为空!'
  },
  'isEmail':
  {
    'regStr': /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    'regMsg': '邮箱错误！'
  },
  'isPhone':
  {
    'regStr': /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/,
    'regMsg': '联系电话格式有误！'
  },
  'isMoney':
  {
    'regStr': /^([1-9][\d]{0,6}|0)(\.[\d]{1,2})?$/,
    'regMsg': '金额格式有误！'

  },
  'isIDCard':
  {
    'regStr': /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
    'regMsg': '身份证格式有误！'
  },
  'isCreditcard':
  {
    'regStr': /^[0-9]*$/,
    'regMsg': '银行卡号格式有误！'
  },
  'isSocietyCard':
  {
    'regStr': /^[A-Za-z0-9]{18}$/,
    'regMsg': '社会统一信用代码格式有误！'
  },
  'isDate':
  {
    'regStr': /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/,
    'regMsg': '日期格式有误！'
  },
  'isChar':
  {
    'regStr': /^[0-9a-zA-Z]*$/,
    'regMsg': '格式有误！'
  },
  'isDay':
  {
    'regStr': /^((0?[1-9])|((1|2)[0-9])|30|31)$/,
    'regMsg': '日期格式有误！'
  },
  'isEmoji': {
    'regStr': /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/,
    'regMsg': '请不要填入表情'
  }
}

export function checkEmoji (obj) {
  var text = $.trim(obj)
  if (!checkMatch.isEmoji.regStr.test(text)) {
    return false
  }
  return true
}

export function checkContactNumber (obj) {
  var mobile = $.trim(obj)
  // 如果为1开头则验证手机号码
  if (!checkMatch.isPhone.regStr.test(mobile) || mobile.length != 11) {
    return false
  }
  return true
}
// 验证银行卡
export function checkBankNumber (obj) {
  var isCreditcard = $.trim(obj)
  if (!checkMatch.isCreditcard.regStr.test(isCreditcard)) {
    return false
  }
  return true
}

export function checkCertNo (obj) {
  var idNumber = $.trim(obj)
  if (!checkMatch.isIDCard.regStr.test(idNumber)) {
    return false
  }
  return true
}

export function checkEmail (obj) {
  var email = $.trim(obj)
  // 如果为1开头则验证手机号码
  if (!checkMatch.isEmail.regStr.test(email)) {
    return false
  }
  return true
}

export function toast (err) {
  $('.transparent-mask').show()
  ap.showToast({
    content: err,
    duration: 3000
  }, function () {
    $('.transparent-mask').hide()
  })
}

export function ready (callback) {
  // 如果jsbridge已经注入则直接调用
  if (window.AlipayJSBridge) {
    callback && callback()
  } else {
    // 如果没有注入则监听注入的事件
    document.addEventListener('AlipayJSBridgeReady', callback, false)
  }
}

export function CheckResponse (response) {
  if (JSON.parse(response.text).code != 200 && JSON.parse(response.text).msg != '') {
    ap.hideLoading()
    $('.transparent-mask').hide()
    toast(JSON.parse(response.text).msg ? JSON.parse(response.text).msg : '服务端错误')
    return Promise.reject(response.text)
  }
  return JSON.parse(response.text).result
}

export function rotateImg (base64, reverse) {
  return new Promise(function (resolve, reject) {
    if (!reverse) {
      ready(function () {
        $('.transparent-mask').show()
        ap.showLoading({
          content: '正在上传'
        })
      })
    }
    var canvas = document.createElement('canvas')
    var image = new Image()

    image.src = base64

    image.onload = function () {
      var cContext = canvas.getContext('2d')
      var cw = image.width
      var ch = image.height
      var cx = 0
      var cy = 0
      if (cw < ch) {
        cw = image.height
        ch = image.width
        cy = image.height * (-1)
        canvas.setAttribute('width', cw)
        canvas.setAttribute('height', ch)
        cContext.rotate(90 * Math.PI / 180)
        cContext.drawImage(image, cx, cy)
        resolve(canvas.toDataURL('image/jpeg'))
      } else {
        if (reverse) {
          cw = image.width
          ch = image.height
          cx = image.width * (-1)
          canvas.setAttribute('width', cw)
          canvas.setAttribute('height', ch)
          cContext.rotate(180 * Math.PI / 180)
          cContext.drawImage(image, -cw, -ch)
          resolve(canvas.toDataURL('image/jpeg'))
        } else {
          resolve(base64)
        }
      }
    }

    image.onerror = function () {
      reject(new Error('Could not load image'))
    }
  })
}

export function setRight (url, url2) {
  ap.setOptionButton({
    items: [{
      title: '在线咨询'
    }],
    onClick: function (data) {
      // 监控埋点
      _czc.push(['_trackEvent', '售前咨询', '点击查看'])
      ready(function () {
        AlipayJSBridge.call('pushWindow', {
          url: url + url2,
          param: {
            showOptionMenu: false
          }
        })
      })
    }
  })
}
