<template>
  <div class="step3">
    <ProgressComponent :step="progress"></ProgressComponent>   
    <div class="am-whitespace ws10px"></div>
    <div class="am-list info">
      <div class="am-list-body" role="list" aria-labelledby="list-header-static-1">
        <div class="am-list-item" role="listitem">
          <div class="fn-clear am-ft-md" :class="{'ios': !isAndroid}">
            <div class="fn-left">参保人</div>
            <div class="fn-right">{{payment.name}}</div>
          </div>
          <div class="fn-clear am-ft-md">
            <div class="fn-left">参保城市</div>
            <div class="fn-right">{{payment.data.cityName}}</div>
          </div>
          <div class="fn-clear am-ft-md">
            <div class="fn-left">参保月份</div>
            <div class="fn-right">{{monthRender}}</div>
          </div>
          <div class="fn-clear am-ft-md" :class="{'ios': !isAndroid}">
            <div class="fn-left">付款金额</div>
            <div class="fn-right money">¥{{getNumeral(payment.moneyOption[payment.payment].total+payment.payEndDayOptions[payment.payMonth].serviceCharge)}}</div>
          </div>
        </div>
        <div class="am-list-item" role="listitem">
          <div class="fn-clear am-ft-sm" :class="{'ios': !isAndroid}">
            <div class="fn-left am-ft-gray">社保代收付费用</div>
            <div class="fn-right am-ft-gray">¥{{payment.moneyOption[payment.payment].total}}</div>
          </div>
          <div class="fn-clear am-ft-sm" :class="{'ios': !isAndroid}">
            <div class="fn-left am-ft-gray">服务费(由服务方收取)</div>
            <div class="fn-right am-ft-gray">¥{{payment.payEndDayOptions[payment.payMonth].serviceCharge}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="am-whitespace ws5px"></div>
    <div class="am-ft-gray am-wingblank wb15px am-ft-sm">
      同意<router-link to="agreement" class="am-ft-blue">《社保公积金代缴协议》</router-link>
    </div>
    <div class="am-whitespace" v-bind:class="{ 'ws10px': isAndroid, 'ws15px': !isAndroid }"></div>
    <div class="am-wingblank wb5px">
      <button type="button" class="am-button" v-on:click="next" :disabled="canPay">确认</button>    
    </div>
  </div>
</template>

<script>
import { cFetch, API_CONFIG, Sign, check, PublicValue } from '@/service'
var numeral = require('numeral')
export default {
  name: 'Step3',
  data () {
    let payment = JSON.parse(PublicValue.get('payment'))
    let step2 = JSON.parse(PublicValue.get('step2'))
    let monthRender = ''
    if (payment) {
      payment.details.forEach(function (item) {
        monthRender = monthRender + item.payMonth + ','
      })
    }
    var ua = navigator.userAgent.toLowerCase()
    var isAndroid = ua.indexOf('android') > -1 && ua.indexOf('mi') < 0
    return {
      payment: payment,
      step2: step2,
      progress: 2,
      monthRender: monthRender.substring(0, monthRender.length - 1),
      canPay: false,
      isAndroid: isAndroid
    }
  },
  created () {
    JSON.parse(PublicValue.get('payment')).data.helpUrl ? check.setRight(JSON.parse(PublicValue.get('payment')).data.helpUrl, API_CONFIG.helpUrl2) : check.setRight(API_CONFIG[PublicValue.params.cityCode], API_CONFIG.helpUrl2)
  },
  components: {
    'ProgressComponent': require('@/partial/Progress')
  },
  methods: {
    next () {
      // 监控埋点
      _czc.push(['_trackEvent', '订单确认', '点击确认'])
      var self = this
      let payEndDayObj = {}
      self.payment.data.payMonthOption.forEach(function (item) {
        if (item.value === self.payment.payMonth) {
          payEndDayObj = item
        }
      })
      cFetch(API_CONFIG.payment.api, {
        method: 'POST',
        body: JSON.stringify(Sign({
          productId: self.payment.data.productId,
          serviceCharge: payEndDayObj.serviceCharge,
          payEndDay: payEndDayObj.payEndDay,
          cityCode: PublicValue.params.cityCode,
          name: self.payment.name,
          mobile: self.payment.mobile,
          idCard: self.payment.identity,
          startMonth: payEndDayObj.key,
          allAmount: self.payment.moneyOption[self.payment.payment].total + self.payment.payEndDayOptions[self.payment.payMonth].serviceCharge,
          domicile: self.step2.data.currentCity,
          residenceNature: self.step2.residenceNature,
          education: self.step2.education,
          idCardPicUrlA: self.step2.idCardPicUrlAKey,
          idCardPicUrlB: self.step2.idCardPicUrlBKey,
          stall: self.payment.payment,
          stallDetail: self.payment.details,
          address: self.step2.address,
          applyId: PublicValue.get('applyId') === '' ? undefined : PublicValue.get('applyId'),
          socialSecurityNumber: self.step2.socialSecurityNumber,
          fundAccount: self.step2.fundAccount,
          socialType: PublicValue.get('socialType') === '' ? undefined : PublicValue.get('socialType'),
          hkPicUrlOfHomepage: self.step2.hkPicUrlOfHomepageKey === '' ? undefined : self.step2.hkPicUrlOfHomepageKey,
          hkPicUrlOfHeaderpage: self.step2.hkPicUrlOfHeaderpageKey === '' ? undefined : self.step2.hkPicUrlOfHeaderpageKey,
          hkPicUrlOfOwnpage: self.step2.hkPicUrlOfOwnpageKey === '' ? undefined : self.step2.hkPicUrlOfOwnpageKey
        }, API_CONFIG.payment.projectName))
      }).then(response => {
        // 支付宝已经支付，后台没支付情况直接到成功页
        if (response.payStatus && response.payStatus == 'P') {
          var goUrl = window.location.href.replace('step3', 'paySuccess/' + response.serialNumber)
          AlipayJSBridge.call('pushWindow', {
            url: goUrl,
            param: {
              transparentTitle: 'auto'
            }
          })
        } else if (response.tradeNo) {
          PublicValue.params.alipayAccountId = response.alipayAccountId
          check.ready(function () {
            AlipayJSBridge.call('tradePay', {
              tradeNO: response.tradeNo,
              partnerID: API_CONFIG.pid,
              bizType: 'trade',
              bizSubType: 'ind_charge'
            }, function (result) {
              if (result.resultCode != 9000 && result.resultCode != 8000) {
                var goDoneUrl = window.location.href.replace('?', '?alipayAccountId=' + response.alipayAccountId + '&')
                window.location.href = goDoneUrl.replace('step3', 'done')
              } else if (result.resultCode == 9000) {
                var serialNumberId = response.serialNumber
                ap.getServerTime(function (res) {
                  cFetch(API_CONFIG.paySuccess.api, {
                    method: 'POST',
                    body: JSON.stringify(Sign({
                      alipaySerialNo: response.tradeNo,
                      serialNumber: response.serialNumber,
                      payDate: res.time,
                      backMode: 2
                    }, API_CONFIG.paySuccess.projectName))
                  }).then(response => {
                    self.data = response
                    var goUrl = window.location.href.replace('step3', 'paySuccess/' + serialNumberId)
                    AlipayJSBridge.call('pushWindow', {
                      url: goUrl,
                      param: {
                        transparentTitle: 'auto'
                      }
                    })
                  })
                })
              }
            })
          })
        } else {
          check.toast('生成订单')
        }
      })
    },
    getNumeral (obj) {
      return numeral(obj).format('0.00')
    }
  }

}
</script>

<style scoped>
.am-list-item>.fn-clear{
  padding-top: 8px;
  padding-bottom: 8px;
}
.am-list-item>.fn-clear.ios:first-child{
  padding-top: 15px;
}
.am-list-item>.fn-clear.ios:last-child{
  padding-bottom: 15px;
}
.money{
  color:#fe6d12;
}
</style>