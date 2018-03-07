import { API_CONFIG, PublicValue } from '@/service'
var sha1 = require('sha1')

function sign (params, projectName) {
  var keys = []
  var postData = {}
  if (PublicValue.params.userId) {
    params['userId'] = PublicValue.params.userId
  }
  if (params) {
    params['appId'] = API_CONFIG.appId

    for (var d in params) {
      keys.push(d)
    }
    keys = keys.sort(compareCaseInsensitive)
    params[API_CONFIG.postKey] = ''
    for (var i = 0; i < keys.length; i++) {
      if (params[keys[i]] !== '' && params[keys[i]] !== undefined) {
        if (Object.prototype.toString.call(params[keys[i]]) === '[object Object]') {
          params[API_CONFIG.postKey] = params[API_CONFIG.postKey] + keys[i] + '=' + JSON.stringify(sort(params[keys[i]])) + '&'
        } else if (Object.prototype.toString.call(params[keys[i]]) === '[object Array]') {
          params[API_CONFIG.postKey] = params[API_CONFIG.postKey] + keys[i] + '=' + JSON.stringify(arraySort(params[keys[i]])) + '&'
        } else {
          params[API_CONFIG.postKey] = params[API_CONFIG.postKey] + keys[i] + '=' + params[keys[i]] + '&'
        }
      }
    }
    params[API_CONFIG.postKey] = sha1(params[API_CONFIG.postKey].substring(0, params[API_CONFIG.postKey].length - 1) + '&' + projectName + '&' + API_CONFIG.secrect)
  } else {
    params = {}
    params['appId'] = API_CONFIG.appId
    params[API_CONFIG.postKey] = sha1('appId=' + params['appId'] + '&' + projectName + '&' + API_CONFIG.secrect)
  }
  postData[projectName] = params
  return postData

  function compareCaseInsensitive (a, b) {
    if (a > b) { return 1 }
    if (b > a) { return -1 }
    return 0
  }
  function sort (params1) {
    var keys = []
    var array = {}
    for (var d in params1) {
      keys.push(d)
    }
    keys = keys.sort(compareCaseInsensitive)
    // console.log(params1);
    for (var i = 0; i < keys.length; i++) {
      if (params1[keys[i]] !== '' && params1[keys[i]] !== undefined) {
        if (Object.prototype.toString.call(params1[keys[i]]) === '[object Object]') {
          array[keys[i]] = sort(params1[keys[i]])
        } else if (Object.prototype.toString.call(params1[keys[i]]) === '[object Array]') {
          array[keys[i]] = arraySort(params1[keys[i]])
        } else {
          array[keys[i]] = params1[keys[i]]
        }
      }
    }
    return array
  }

  function arraySort (params2) {
    var array = []
    for (var i = 0; i < params2.length; i++) {
      if (Object.prototype.toString.call(params2[i]) === '[object Object]') {
        array[i] = sort(params2[i])
      } else if (Object.prototype.toString.call(params2[i]) === '[object Array]') {
        array[i] = arraySort(params2[i])
      } else {
        array[i] = params2[i]
      }
    }
    return array
  }
}

export default sign
