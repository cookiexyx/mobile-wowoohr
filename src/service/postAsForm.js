import fetch from 'isomorphic-fetch'
import clone from 'safe-clone-deep'
import { API_CONFIG } from './config'
export { postAsForm as default }
require('es6-promise').polyfill()

async function postAsForm (url, data) {
  var response
  try {
    // safe clone of data
    data.appId = API_CONFIG.appId
    data = clone(data)

    // array that holds the items that get added into the form
    var form = []

    // special handling for object/array data, arrays will use "model" as the container ns
    addItemsToForm(form, typeof data === 'object' ? [] : [options.name || 'model'], data)

    // you'll need to await on response.text/blob/json etc
    response = await fetch(url, {
      credentials: 'include', // pass cookies, for authentication
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: form.join('&')
    })

    // return plain text as-is, don't parse it here
    return {
      response: response,
      text: await response.text()
    }
  } catch (err) {
    // console.error("Error from server:", err && err.stack || err);
    err.response = response
    throw err
  }
}

function addItemsToForm (form, names, obj) {
  if (obj === undefined || obj === '' || obj === null) return addItemToForm(form, names, '')

  if (
    typeof obj === 'string' ||
    typeof obj === 'number' ||
    obj === true ||
    obj === false
  ) return addItemToForm(form, names, obj)

  if (obj instanceof Date) return addItemToForm(form, names, obj.toJSON())

  // array or otherwise array-like
  if (obj instanceof Array) {
    return obj.forEach((v, i) => {
      names.push(`[${i}]`)
      addItemsToForm(form, names, v)
      names.pop()
    })
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).forEach((k) => {
      names.push(k)
      addItemsToForm(form, names, obj[k])
      names.pop()
    })
  }
}

function addItemToForm (form, names, value) {
  var name = encodeURIComponent(names.join('.').replace(/\.\[/g, '['))
  value = encodeURIComponent(value.toString())
  form.push(`${name}=${value}`)
}
