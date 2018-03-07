<template>
  <div class="index">
    <div class="am-notice" role="alert" v-if="data.notice.trim()!=''" v-tap="{methods:go}">
      <div class="am-notice-content" v-bind:class="{ android: isAndroid }">{{data.notice}}</div>
      <div class="am-notice-operation" v-show="data.notice.length>20">
        <a class="am-notice-go" href="javascript:void(0);"></a>
      </div>
    </div>
    <ProgressComponent :step="progress"></ProgressComponent>
    <div class="am-whitespace ws10px"></div>
    <div class="am-list am-list-form">
      <div class="am-list-item am-input-autoclear">
        <div class="am-list-label" id="list-label-1">姓名</div>
        <div class="am-list-control">
          <input id="demo-input-1" type="text" placeholder="请输入真实姓名" v-model="name" aria-labelledby="list-label-1" maxlength="20" @blur="checkKeyup">
        </div>
        <div class="am-list-clear" tabindex="0" aria-label="清空输入框" aria-controls="demo-input-1" v-tap="{methods:clear, index:1}">
          <i class="am-icon-clear am-icon" aria-hidden="true"></i>
        </div>
        <div class="am-list-thumb right" v-if="data.contactOptions.length!==0" v-tap="{methods:showContactList}">
          <i class="icon-hint-01 am-ft-blue"></i>
        </div>
      </div>
      <div class="am-list-item am-input-autoclear half" v-for="(item,index) in data.contactOptions" v-tap="{methods:getUserDetail, index:index}" v-show="showContact">
        <div class="am-list-label" id="list-label-1"></div>
        <div class="am-list-control am-ft-lightgray">
          {{item.name}}
        </div>
      </div>
      <div class="am-list-item am-input-autoclear">
        <div class="am-list-label" id="list-label-2">手机号</div>
        <div class="am-list-control">
          <input id="demo-input-2" type="tel" placeholder="请输入真实手机号" v-model="mobile" aria-labelledby="list-label-2" maxlength="11" @blur="checkKeyup">
        </div>
        <div class="am-list-clear" tabindex="0" aria-label="清空输入框" aria-controls="demo-input-2" v-tap="{methods:clear, index:2}">
          <i class="am-icon-clear am-icon" aria-hidden="true"></i>
        </div>
      </div>
      <div class="am-list-item am-input-autoclear">
        <div class="am-list-label" id="list-label-3">身份证号</div>
        <div class="am-list-control">
          <input id="demo-input-3" type="text" v-model="identity" placeholder="请输入参保人的身份证号" aria-labelledby="list-label-3" maxlength="18" @blur="checkKeyup">
        </div>
        <div class="am-list-clear" tabindex="0" aria-label="清空输入框" aria-controls="demo-input-3" v-tap="{methods:clear, index:3}">
          <i class="am-icon-clear am-icon" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    
    <div class="am-list am-list-form">
      <div class="am-list-header">所选月办理社保截止日：{{payEndDayOptions[payMonth].handleEndDay}}</div>
      <div class="am-list-body">
        <div class="am-list-item am-input-autoclear">
          <div class="am-list-label" id="list-label-5">缴纳开始月份</div>
          <div class="am-list-control">
          <select v-model="payMonth" id="demo-input-5" aria-labelledby="list-label-5" dir="rtl" v-on:change="changePayMonth()">
            <option v-for="option in data.payMonthOption" v-bind:value="option.value">
              {{ option.key }}
            </option>
          </select>            
          </div>
          <div class="am-list-arrow" aria-hidden="true">
            <span class="am-icon arrow horizontal"></span>
          </div>
        </div>
        <div class="am-list-item am-input-autoclear">
          <div class="am-list-label" id="list-label-6">缴纳金额</div>
          <div class="am-list-control">
            <select v-model="payment" id="demo-input-6" aria-labelledby="list-label-6" dir="rtl" v-on:change="changePayment()">
              <option v-for="option in data.paymentOption[payMonth]" v-bind:value="option.value">
                {{ option.key }}
              </option>
            </select> 
          </div>
          <div class="am-list-arrow" aria-hidden="true">
            <span class="am-icon arrow horizontal"></span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="am-whitespace ws5px"></div>
    <div class="am-ft-gray am-wingblank wb15px fn-clear am-ft-sm">
      <div class="fn-left">本次{{data.productType.value}}金额 <span style="color:#fe6d12;">¥{{moneyOption[payment].total}}</span></div>
      <div class="fn-right"><a class="am-ft-blue" href="javascript:void(0)" v-tap="{methods:showModal}" v-if="details.length>0">详情</a></div>
    </div>
    <div class="am-ft-gray am-wingblank wb15px am-ft-sm" v-if="data.policy">
      <i class="icon-hint-16 am-ft-blue"></i> {{data.policy}}
    </div>
    <div class="am-whitespace ws10px"></div>
    <div class="am-wingblank wb10px">
      <button type="button" class="am-button" v-tap="{methods:next}" :disabled="name.trim().length===0||mobile.trim().length===0||identity.trim().length===0">下一步</button>
    
    </div>
  </div>
</template>

<script>
import { cFetch, API_CONFIG, Sign, check, PublicValue } from '@/service'
var IDValidator = require('id-validator')
var Validator = new IDValidator()

export default {
  name: 'Index',
  data () {
    let contactOptions = []
    let payMonthOption = [
      {
        value: 1,
        key: '',
        'payEndDay': '',
        'handleEndDay': ''
      }
    ]
    let paymentOption = {
      '1': [
        {
          'value': 1,
          'key': '',
          'total': 0
        },
        {
          'value': 2,
          'key': '',
          'total': 0
        }
      ]
    }
    let moneyOptions = {}
    paymentOption[payMonthOption[0].value].forEach(function (item) {
      moneyOptions[item.value] = item
    })
    var ua = navigator.userAgent.toLowerCase()
    var isAndroid = ua.indexOf('android') > -1 && ua.indexOf('mi') < 0
    return {
      data: {
        productType: {
          'key': '1',
          'value': ''
        },
        contactOptions: contactOptions,
        payMonthOption: payMonthOption,
        paymentOption: paymentOption[payMonthOption[0].value],
        'notice': '',
        'policy': '',
        'productId': '',
        'vendorId': '',
        'list': {
          '1-1': [
            {
              'title': '2017年03月',
              'lists': []
            },
            {
              'title': '2017年04月',
              'lists': []
            }
          ]
        },
        helpUrl: ''
      },
      payMonth: payMonthOption[0].value,
      payment: paymentOption[payMonthOption[0].value][0].value,
      showDetail: false,
      progress: 0,
      showPaied: false,
      moneyOption: moneyOptions,
      details: [],
      name: '',
      mobile: '',
      identity: '',
      payEndDayOptions: {1: {}},
      showContact: false,
      promptMessage: '',
      isAndroid: isAndroid
    }
  },
  created () {
    check.setRight(API_CONFIG[PublicValue.params.cityCode], API_CONFIG.helpUrl2)
    var self = this
    PublicValue.clear('residenceNature')
    PublicValue.clear('education')
    PublicValue.add('applyId', self.$route.params.status ? self.$route.params.status : '')
    if (PublicValue.get('payment')) {
      let response = JSON.parse(PublicValue.get('payment'))
      Object.assign(self, response)
      check.setRight(self.data.helpUrl, API_CONFIG.helpUrl2)
      if (self.$route.params.status) {
        response.data.contactOptions.forEach(function (item, index) {
          if (item.idCard === response.data.currentIdCard) {
            self.getUserDetail({index: index})
            return false
          }
        })
      }
    } else {
      cFetch(API_CONFIG.index.api, {
        method: 'POST',
        body: JSON.stringify(Sign({
          cityCode: PublicValue.params.cityCode,
          productType: PublicValue.params.productType,
          applyId: self.$route.params.status
        }, API_CONFIG.index.projectName))
      }).then(response => {
        self.data = response
        check.setRight(self.data.helpUrl, API_CONFIG.helpUrl2)
        self.payMonth = self.data.payMonthOption[0].value
        self.moneyOptions = {}
        self.data.paymentOption[self.payMonth].forEach(function (item) {
          self.moneyOption[item.value] = item
        })
        self.payment = self.data.paymentOption[self.data.payMonthOption[0].value][0].value
        self.details = self.data.list[self.payMonth + '-' + self.payment]
        for (var item of self.data.payMonthOption) {
          self.payEndDayOptions[item.value] = item
        }
        if (self.$route.params.status) {
          self.data.contactOptions.forEach(function (item, index) {
            if (item.idCard === response.currentIdCard) {
              self.getUserDetail({index: index})
              return false
            }
          })
        }
      })
    }
  },
  components: {
    'ProgressComponent': require('@/partial/Progress')
  },
  methods: {
    showModal () {
      let { payMonth, payment, moneyOption, details, name, mobile, identity, payEndDayOptions, data } = this
      PublicValue.add('payment', JSON.stringify({ payMonth, payment, moneyOption, details, name, mobile, identity, payEndDayOptions, data }))
      this.$store.dispatch('setDetail', {
        list: details
      })
      // 监控埋点
      _czc.push(['_trackEvent', '费用详情', '点击查看', '新用户'])
      this.$router.push('/paymentDetail')
    },
    closePaid () {
      this.showPaied = false
      this.$router.push('/done')
    },
    next () {
      if (check.checkEmoji(this.name)) {
        check.toast('不要输入非法字符')
        return false
      }
      if (!check.checkContactNumber(this.mobile)) {
        check.toast('手机号码出错')
        return false
      }
      if (!Validator.isValid(this.identity)) {
        check.toast('身份证出错')
        return false
      }
      var idInfo = Validator.getInfo(this.identity)
      if (idInfo.sex == 0) {
        if (this.payEndDayOptions[this.payMonth].key.substring(0, 4) - idInfo.birth.substring(0, 4) > 44) {
          check.toast('参保人年龄不符，已超上限')
          return false
        }
      } else {
        if (this.payEndDayOptions[this.payMonth].key.substring(0, 4) - idInfo.birth.substring(0, 4) > 49) {
          check.toast('参保人年龄不符，已超上限')
          return false
        }
      }

      var self = this
      cFetch(API_CONFIG.checkPayment.api, {
        method: 'POST',
        body: JSON.stringify(Sign({
          cityCode: PublicValue.params.cityCode,
          productType: PublicValue.params.productType,
          idCard: self.identity,
          applyId: self.$route.params.status
        }, API_CONFIG.checkPayment.projectName))
      }).then(response => {
        if (response.success == '0') {
          let { payMonth, payment, moneyOption, details, name, mobile, identity, payEndDayOptions, data } = self
          PublicValue.add('payment', JSON.stringify({ payMonth, payment, moneyOption, details, name, mobile, identity, payEndDayOptions, data }))
          self.$router.push('/step2')
        } else {
          ap.alert({
            title: response.promptMessage,
            // content: ,
            buttonText: '确定'
          }, function () {
            PublicValue.add('alipayAccountId', response.alipayAccountId)
            PublicValue.clear('payment')
            self.$router.push('/done')
          })
        }
      })
    },
    changePayment () {
      var self = this
      self.details = self.data.list[self.payMonth + '-' + self.payment]
    },
    changePayMonth () {
      var self = this
      this.payment = this.data.paymentOption[this.payMonth][0].value
      this.data.paymentOption[this.payMonth].forEach(function (item) {
        self.moneyOption[item.value] = item
      })
      self.details = self.data.list[self.payMonth + '-' + self.payment]
    },
    clear (obj) {
      if (obj.index == 1) {
        this.name = ''
      } else if (obj.index == 2) {
        this.mobile = ''
      } else if (obj.index == 3) {
        this.identity = ''
      }
    },
    getUserDetail (obj) {
      this.showContact = false
      let user = this.data.contactOptions[obj.index]
      this.name = user.name
      this.mobile = user.mobile
      this.identity = user.idCard
      PublicValue.add('selected', JSON.stringify(user.city))
      PublicValue.add('residenceNature', JSON.stringify(user.residenceNature))
      PublicValue.add('education', JSON.stringify(user.education))
      PublicValue.add('idCardPicUrlA', JSON.stringify(user.idCardPicUrlA))
      PublicValue.add('idCardPicUrlB', JSON.stringify(user.idCardPicUrlB))
      PublicValue.add('hkPicUrlOfHomepage', JSON.stringify(user.hkPicUrlOfHomepage))
      PublicValue.add('hkPicUrlOfHeaderpage', JSON.stringify(user.hkPicUrlOfHeaderpage))
      PublicValue.add('hkPicUrlOfOwnpage', JSON.stringify(user.hkPicUrlOfOwnpage))
      PublicValue.add('address', JSON.stringify(user.address))
      PublicValue.add('socialSecurityNumber', JSON.stringify(user.socialSecurityNumber))
      PublicValue.add('fundAccount', JSON.stringify(user.fundAccount))
    },
    showContactList () {
      // 监控埋点
      _czc.push(['_trackEvent', '参保人快捷键', '点击选择'])
      this.showContact = !this.showContact
    },
    hideContactList () {
      this.showContact = false
    },
    go () {
      if (this.data.notice.length > 20) {
        PublicValue.params.notice = this.data.notice
        this.$router.push('/notice')
      }
    },
    checkKeyup () {
      $('.am-list-clear').hide()
    }
  }

}
</script>

<style scoped>
  .am-list-header{
    padding-top: 3px;
  }
  .am-notice .am-notice-content:before{
    background-size: .12rem auto;
  }
  .am-notice .am-notice-content{
    margin-left: .10rem;
  }

  .am-notice .am-notice-content.android:before{
    top:-0.02rem;
  }
</style>