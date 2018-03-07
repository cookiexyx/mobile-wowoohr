let host = ''
// 初始化local环境
let environment = 'local'
// 生产环境
if (process.env.NODE_ENV == 'production') {
  host = '/entry'
  environment = 'production'
}
// mock环境
if (process.env.NODE_ENV == 'mock') {
  host = ''
  environment = 'mock'
}

const baseUri = host
const SERVICES = {
  'local': {
    index: {
      // api:'http://10.61.2.192:8080/entry/apicenter',
      api: '/static/data/index.json',
      projectName: 'order.insured.newAddInsuredInit'
    },
    checkPayment: {
      api: '/static/data/checkPayment.json',
      // api:'http://10.61.1.252:8080/entry/apicenter',
      projectName: 'order.v1.apply.checkApply'
    },
    step2: {
      // api:'http://10.61.1.237:8080/entry/apicenter',
      api: '/static/data/step2.json',
      projectName: 'si.alipayProduct.getMaterialForAlipay'
    },
    payment: {
      api: '/static/data/payment.json',
      // api:'http://10.61.2.79:8080/entry/apicenter',
      projectName: 'order.apply.applySiPayment'
    },
    history: {
      api: '/static/data/history.json',
      // api:'http://10.61.2.183:8080/entry/apicenter',
      projectName: 'order.v1.order.queryOrderMonthList'
    },
    done: {
      api: '/static/data/done.json',
      // api:'http://10.61.2.183:8080/entry/apicenter',
      projectName: 'order.v1.order.getApplyOrderInfo'
    },
    historyDetail: {
      api: '/static/data/historyDetail.json',
      // api:'http://10.61.2.183:8080/entry/apicenter',
      projectName: 'order.v1.order.getOrderSchedule'
    },
    pay: {
      api: '/static/data/pay.json',
      projectName: 'gateway.v1.trade.pay'
    },
    editMaterial: {
      api: '/static/data/editMaterial.json',
      // api:'http://10.61.2.183:8080/entry/apicenter',
      projectName: 'order.v1.apply.getMaterialForUpdate'
    },
    saveMaterial: {
      api: '/static/data/saveMaterial.json',
      // api:'http://10.61.2.183:8080/entry/apicenter',
      projectName: 'order.v1.apply.saveMaterialUpdate'
    },
    upload: {
      // api:'http://10.61.1.252:8080/entry/uploadFile',
      api: '/static/data/upload.json',
      projectName: ''
    },
    paymentGo: {
      api: '/static/data/paymentGo.json',
      // api: 'http://10.61.2.183:8080/entry/apicenter',
      projectName: 'order.v1.apply.getAlipaySerialNo'
    },
    paySuccess: {
      // api: 'http://10.61.2.183:8080/entry/apicenter',
      api: '/static/data/paySuccess.json',
      projectName: 'order.v1.serial.updateOrderSerialStatus'
    },
    paySuccessInfo: {
      // api: 'http://10.61.2.183:8080/entry/apicenter',
      api: '/static/data/paySuccessInfo.json',
      projectName: 'order.v1.order.getPaySuccessInfo'
    },
    getCinfoHelpUrl: {
      api: '/static/data/getCinfoHelpUrl.json',
      projectName: 'ucenter.getCinfoHelpUrl'
    },
    judgeNewAndReMaterial: {
      api: '/static/data/judgeNewAndReMaterial.json',
      projectName: 'si.alipayProduct.judgeNewAndReMaterial'
    }
  },
  'production': {
    index: {
      api: '/apicenter',
      projectName: 'order.insured.newAddInsuredInit'
    },
    checkPayment: {
      api: '/apicenter',
      projectName: 'order.v1.apply.checkApply'
    },
    step2: {
      api: '/apicenter',
      projectName: 'si.alipayProduct.getMaterialForAlipay'
    },
    payment: {
      api: '/apicenter',
      projectName: 'order.apply.applySiPayment'
    },
    history: {
      api: '/apicenter',
      projectName: 'order.v1.order.queryOrderMonthList'
    },
    done: {
      api: '/apicenter',
      projectName: 'order.v1.order.getApplyOrderInfo'
    },
    historyDetail: {
      api: '/apicenter',
      projectName: 'order.v1.order.getOrderSchedule'
    },
    pay: {
      api: '/apicenter',
      projectName: 'gateway.v1.trade.pay'
    },
    editMaterial: {
      api: '/apicenter',
      projectName: 'order.v1.apply.getMaterialForUpdate'
    },
    saveMaterial: {
      api: '/apicenter',
      projectName: 'order.v1.apply.saveMaterialUpdate'
    },
    upload: {
      api: host + '/uploadFile',
      projectName: ''
    },
    paymentGo: {
      api: '/apicenter',
      projectName: 'order.v1.apply.getAlipaySerialNo'
    },
    paySuccess: {
      api: '/apicenter',
      projectName: 'order.v1.serial.updateOrderSerialStatus'
    },
    paySuccessInfo: {
      api: '/apicenter',
      projectName: 'order.v1.order.getPaySuccessInfo'
    },
    getCinfoHelpUrl: {
      api: '/apicenter',
      projectName: 'ucenter.getCinfoHelpUrl'
    },
    judgeNewAndReMaterial: {
      api: '/apicenter',
      projectName: 'si.alipayProduct.judgeNewAndReMaterial'
    }
  },
  'mock': {
    index: {
      api: '/mockurl?path=/entry/apicenter/initLogin&param=entry008',
      projectName: 'order.insured.newAddInsuredInit'
    },
    checkPayment: {
      api: '/entry/apicenter',
      projectName: 'order.v1.apply.checkApply'
    },
    step2: {
      api: '/entry/apicenter',
      projectName: 'si.alipayProduct.getMaterialForAlipay'
    },
    payment: {
      api: '/entry/apicenter',
      projectName: 'order.apply.applySiPayment'
    },
    history: {
      api: '/entry/apicenter',
      projectName: 'order.v1.order.queryOrderMonthList'
    },
    done: {
      api: '/entry/apicenter',
      projectName: 'order.v1.order.getApplyOrderInfo'
    },
    historyDetail: {
      api: '/entry/apicenter',
      projectName: 'order.v1.order.getOrderSchedule'
    },
    pay: {
      api: '/entry/apicenter',
      projectName: 'gateway.v1.trade.pay'
    },
    editMaterial: {
      api: '/entry/apicenter',
      projectName: 'order.v1.apply.getMaterialForUpdate'
    },
    saveMaterial: {
      api: '/entry/apicenter',
      projectName: 'order.v1.apply.saveMaterialUpdate'
    },
    upload: {
      api: host + '/uploadFile',
      projectName: ''
    },
    paymentGo: {
      api: '/entry/apicenter',
      projectName: 'order.v1.apply.getAlipaySerialNo'
    },
    paySuccess: {
      api: '/entry/apicenter',
      projectName: 'order.v1.serial.updateOrderSerialStatus'
    }
  }
}

const helpUrl = {
  '310100': 'https://cschat.antcloud.com.cn/h5portal.htm?tntInstId=GERGUJCN&scene=SCE00000349',
  '210200': 'https://cschat.antcloud.com.cn/h5portal.htm?tntInstId=GERGUJCN&scene=SCE00000366',
  '440100': 'https://cschat.antcloud.com.cn/h5portal.htm?tntInstId=GERGUJCN&scene=SCE00000363',
  '440300': 'https://cschat.antcloud.com.cn/h5portal.htm?tntInstId=GERGUJCN&scene=SCE00000360',
  '420100': 'https://cschat.antcloud.com.cn/h5portal.htm?tntInstId=GERGUJCN&scene=SCE00000364',
  '350200': 'https://cschat.antcloud.com.cn/h5portal.htm?tntInstId=GERGUJCN&scene=SCE00000365',
  '320500': 'https://cschat.antcloud.com.cn/h5portal.htm?tntInstId=GERGUJCN&scene=SCE00000351'
}

export const API_CONFIG = Object.assign({
  baseUri: baseUri,
  appId: 'wowoohr_my_alipay_lifePayment',
  postKey: 'sign',
  secrect: '',
  pid: '2088302131285032',
  helpUrl2: ''
}, SERVICES[environment], helpUrl)
