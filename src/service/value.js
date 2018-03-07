/**
 *
 * @authors cate
 * @date    2017-04-11 13:31:07
 * @version $Id$
 */
function getParameterByName (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  var results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
const cdn = 'https://res-m.renliwo.com/static'
let params = {
  'userId': getParameterByName('userId'),
  'cityCode': getParameterByName('cityCode'),
  'productType': getParameterByName('productType'),
  alipayAccountId: getParameterByName('alipayAccountId'),
  gateWayToken: getParameterByName('gateWayToken'),
  gateWayUserId: getParameterByName('gateWayUserId'),
  img: {
    id1: cdn + '/img/id3.png',
    id2: cdn + '/img/id4.png',
    demo: cdn + '/img/demo.png'
  }
}
let PublicValue = {
  add: function (key, val) {
    sessionStorage.setItem(key, val)
  },
  get: function (key) {
    return sessionStorage.getItem(key)
  },
  clear: function (key) {
    sessionStorage.removeItem(key)
  },
  params: params
}
export default PublicValue
