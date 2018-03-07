import fetch from 'isomorphic-fetch'
import StandardError from 'standard-error'
import { API_CONFIG, check, PublicValue } from '@/service'
require('es6-promise').polyfill()

const errorMessages = (res) => `${res.status} ${res.statusText}`

function check401 (res) {
  check.ready(function () {
    AlipayJSBridge.call('hideLoading')
  })
  $('.transparent-mask').hide()
  if (res.status === 401) {
    check.toast('登陆过期,请重新登陆')
    return Promise.reject(errorMessages(res))
  }
  return res
}

// function check404(res) {
//   if (res.status === 404) {
//     return Promise.reject(errorMessages(res));
//   }
//   return res;
// }

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    // 这里补充更多错误参数
    return response.text().then(errorMsg => {
      return new StandardError({
        statusCode: response.status,
        msg: errorMsg
      })
    }).then(err => { throw err })
  }
}

function jsonParse (res) {
  return res.json()
}

function setUriParam (keys, value, keyPostfix) {
  let keyStr = keys[0]

  keys.slice(1).forEach((key) => {
    keyStr += `[${key}]`
  })

  if (keyPostfix) {
    keyStr += keyPostfix
  }

  return `${encodeURIComponent(keyStr)}=${encodeURIComponent(value)}`
}

function getUriParam (keys, object) {
  const array = []

  if (object instanceof (Array)) {
    object.forEach((value) => {
      array.push(setUriParam(keys, value, '[]'))
    })
  } else if (object instanceof (Object)) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key]

        array.push(getUriParam(keys.concat(key), value))
      }
    }
  } else {
    if (object !== undefined) {
      array.push(setUriParam(keys, object))
    }
  }

  return array.join('&')
}

function toQueryString (object) {
  const array = []

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const str = getUriParam([key], object[key])

      if (str !== '') {
        array.push(str)
      }
    }
  }

  return array.join('&')
}

function cFetch (url, options) {
  check.ready(function () {
    ap.getNetworkType(function (res) {
      if (!res.networkAvailable) {
        ap.showToast({
          content: '网速不佳',
          type: 'exception'
        })
        AlipayJSBridge.call('hideLoading')
      }
    })
    AlipayJSBridge.call('showLoading', {
      text: '加载中'
    })
    $('.transparent-mask').show()
  })

  let mergeUrl = API_CONFIG.baseUri + url
  const defaultOptions = {
    method: 'GET'
  }
  const opts = Object.assign({}, defaultOptions, {...options})

  // add query params to url when method is GET
  if (opts && opts.method == 'GET' && opts['params']) {
    mergeUrl = mergeUrl + '?' + toQueryString(opts['params'])
  }

  opts.headers = {
    ...opts.headers,
    'Set-Cookie': 'gateWayUserId=' + PublicValue.params.gateWayUserId + '&&gateWayToken=' + PublicValue.params.gateWayToken + '; HttpOnly',
    credentials: 'include'
  }

  return fetch(mergeUrl, opts)
    .then(check401)
    // .then(check404)
    .then(checkStatus)
    .then(jsonParse)
    .then(res => {
      if (parseInt(res.code) != 200 && res.msg !== '') {
        check.toast(res.msg)
        return Promise.reject(new Error(res.code + ' ' + res.msg))
      }
      return res.result
    })
}

// catch all the unhandled exception
window.addEventListener('unhandledrejection', function (err) {
  const ex = err.reason
  if (ex.constructor != null && ex.constructor == StandardError || ex.msg != null) {
    check.toast('服务端错误')
  }
})

export default cFetch
