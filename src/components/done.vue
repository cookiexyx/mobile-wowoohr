<template>
  <div class="done">
    <div class="am-list am-list-form add-padding" style="padding-top:0px;">
      <div class="am-list-item am-input-autoclear" style="height:65px;">
        <div class="am-list-thumb">
          <i :class="{ 'icon-hint-02': data.productType.key==1, 'icon-hint-04': data.productType.key==2, 'icon-hint-03': data.productType.key==3 }"></i>
        </div>
        <div class="am-list-content">{{data.productType.value}}</div>
      </div>
      <div class="white-bg" :class="{'android': isAndroid}">
        <div class="am-whitespace ws25px" v-if="data.orderStatus!=1"></div>
        <img src="../assets/progress2.png" v-if="data.orderStatus==2"/>
        <img src="../assets/progress3.png" v-if="data.orderStatus==3"/>
        <img src="../assets/progress4.png" v-if="data.orderStatus==4||data.orderStatus==22"/>
        <img src="../assets/progress1.png" v-if="data.orderStatus==5"/>
        <div class="am-whitespace ws10px" v-if="data.orderStatus!=1"></div>
        <div class="am-ft-black am-ft-md" v-if="data.orderStatus!=1">{{data.content}}</div>
        
        <!--type 5 start-->
        <div class="am-ft-black am-ft-sm am-ft-lightgray" v-if="data.orderStatus==5">{{data.orderMonth}}社保费用未支付，现已办理停保</div>
        <div class="am-whitespace ws15px" v-if="data.orderStatus==5"></div>
        <div v-if="data.orderStatus==5&&data.isRepay" class="am-wingblank wb15px">
          <button type="button" class="am-button" v-tap="{methods:next, type:1}">重新参保</button>
        </div>
        <div class="am-whitespace ws15px" v-if="data.orderStatus==5"></div>
        <!--type 5 end-->

        <!--type 22 start-->
        <div class="am-whitespace ws15px" v-if="data.orderStatus==22"></div>
        <div v-if="data.orderStatus==22" class="am-wingblank wb15px">
          <button type="button" class="am-button" v-tap="{methods:next, type:2}">修改参保材料</button>
        </div>
        <div class="am-whitespace ws15px" v-if="data.orderStatus==22"></div>
        <!--type 22 end-->

        <!--type 4 start-->
        <div class="am-whitespace ws15px" v-if="data.orderStatus==4"></div>
        <div v-if="data.orderStatus==4&&data.isRepay" class="am-wingblank wb15px">
          <button type="button" class="am-button" v-tap="{methods:next, type:1}">重新参保</button>
        </div>
        <div class="am-whitespace ws15px" v-if="data.orderStatus==4"></div>
        <!--type 4 end-->
        
        

        <div class="am-list info" v-bind:class="{'border':data.orderStatus!=1, 'android': isAndroid}">
          <div class="am-list-body" role="list" aria-labelledby="list-header-static-1">
            <div class="am-list-item nobackground" role="listitem">
              <div class="fn-clear" v-if="data.orderStatus==1">
                <div class="fn-left am-ft-md">{{data.orderMonth}}</div>
                <div class="fn-right am-ft-md">¥{{data.payAmount}}</div>
              </div> 
              <div class="am-whitespace ws15px" v-if="data.orderStatus!=1"></div>             
              <div class="fn-clear">
                <div class="fn-left am-ft-md am-ft-gray">{{data.orderStatus!=5?'参保':'缴费'}}账户</div>
                <div class="fn-right am-ft-md am-ft-gray">{{data.name}}   {{data.idCard}}</div>
              </div>
              <div class="fn-clear" v-if="data.orderStatus!=1&&data.orderStatus!=5">
                <div class="fn-left am-ft-md am-ft-gray">参保月份</div>
                <div class="fn-right am-ft-md am-ft-gray">{{data.orderMonth}}</div>
              </div>
              <div class="fn-clear" v-if="data.orderStatus!=1&&data.orderStatus!=5" v-bind:class="{ android: isAndroid }">
                <div class="fn-left am-ft-md am-ft-gray">缴费金额</div>
                <div class="fn-right am-ft-md am-ft-gray">{{data.payAmount}}元 <a class="am-ft-blue" href="javascript:void(0)" v-tap="{methods:showModal}">详情</a></div>
              </div>
              <div class="fn-clear" v-if="data.orderStatus==1" v-bind:class="{ android: isAndroid }">
                <div class="fn-left am-ft-md am-ft-gray">参保城市</div>
                <div class="fn-right am-ft-md am-ft-gray">{{data.cityMap.value}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--type 1 start-->
    <div style="color:#888;" class="am-ft-sm am-wingblank wb15px" :class="{'move-top': !isAndroid, 'move-top1': isAndroid}" v-if="data.orderStatus==1">请于<span class="am-ft-blue">{{data.payEndDay}}</span> 前支付</div>
    <div class="am-whitespace ws10px" v-if="data.orderStatus==1"></div>
    <div v-if="data.orderStatus==1" class="am-wingblank wb15px">
      <button type="button" class="am-button" v-tap="{methods:next, type:3}">立即支付</button>
    </div>
    <!--type 1 end-->
    <div class="am-whitespace ws10px" v-if="isAndroid"></div>
    
    <VerticalProgress v-if="data.orderStatus!=1&&data.orderStatus!=5" :schedule="data.orderScheduleDtoList" :showTitle="1"></VerticalProgress>
    

    <div class="am-whitespace ws30px"></div>
    <div class="am-ft-center am-ft-sm am-ft-gray bottom" :class="{'am-fixed am-fixed-bottom': data.orderStatus==1||data.orderStatus==5}">
      <span style="color:#566b96; padding-right:10px;" v-tap="{methods:seeHistory}" v-if="data.hasSchedule!=0">办理历史</span>  <span v-if="data.hasSchedule!=0" style="color:#566b96;">|</span>  <a style="color:#566b96; padding-left:10px;" v-tap="{methods:helpURL}">帮助中心</a>
    </div>

    
  </div>
</template>

<script>
import { cFetch, API_CONFIG, Sign, check, PublicValue } from '@/service'
export default {
  name: 'Step3',
  data () {
    var ua = navigator.userAgent.toLowerCase()
    var isAndroid = ua.indexOf('android') > -1 && ua.indexOf('mi') < 0
    return {
      data: {
        'applyId': '',
        'productType': {
          'key': '',
          'value': ''
        },
        'orderStatus': 0,
        'orderMonth': '',
        'payAmount': '',
        'name': '',
        'idCard': '',
        'cityMap': {
          'key': '',
          'value': ''
        },
        'content': '',
        'payEndDay': '',
        'orderDetailDtoList': [
          {
            'title': '',
            'lists': [
              {
                'name': '',
                'value': 0
              }
            ]
          }
        ],
        'orderScheduleDtoList': [
          {
            'schedule': '',
            'description': '',
            'createTime': '',
            'status': 0
          }
        ],
        'helpUrl': API_CONFIG[PublicValue.params.cityCode] + API_CONFIG.helpUrl2,
        isRepay: 0,
        hasSchedule: 0
      },
      showDetail: false,
      isAndroid: isAndroid
    }
  },
  created () {
    var self = this
    cFetch(API_CONFIG.done.api, {
      method: 'POST',
      body: JSON.stringify(Sign({
        'alipayAccountId': PublicValue.params.alipayAccountId || PublicValue.get('alipayAccountId')
      }, API_CONFIG.done.projectName))
    }).then(response => {
      self.data = response
      document.title = response.productType.value + '缴费'
      check.ready(function () {
        AlipayJSBridge.call('setTitle', {
          title: response.productType.value + '缴费'
        })
      })
    })
  },
  components: {
    'DetailModal': require('@/partial/DetailModal'),
    'VerticalProgress': require('@/partial/verticalProgress')
  },
  methods: {
    showModal () {
      PublicValue.clear('payment')
      var self = this
      self.$store.dispatch('setDetail', {
        list: self.data.orderDetailDtoList
      })
      // 监控埋点
      _czc.push(['_trackEvent', '费用详情', '点击查看', '老用户'])
      self.$router.push('/paymentDetail')
    },
    next (obj) {
      var self = this
      if (obj.type == 1) {
        this.$router.push('/index/' + self.data.applyId)
      }
      if (obj.type == 2) {
        this.$router.push('/editMaterial/' + self.data.applyId)
      }
      if (obj.type == 3) {
        cFetch(API_CONFIG.paymentGo.api, {
          method: 'POST',
          body: JSON.stringify(Sign({
            applyId: self.data.applyId
          }, API_CONFIG.paymentGo.projectName))
        }).then(response => {
          // 支付宝已经支付，后台没支付情况直接到成功页
          if (response.payStatus && response.payStatus == 'P') {
            var goUrl = window.location.href.replace('done', 'paySuccess/' + response.serialNumber)
            AlipayJSBridge.call('pushWindow', {
              url: goUrl,
              param: {
                transparentTitle: 'auto'
              }
            })
          } else if (response.alipaySerialNo) {
            check.ready(function () {
              AlipayJSBridge.call('tradePay', {
                tradeNO: response.alipaySerialNo,
                partnerID: API_CONFIG.pid,
                bizType: 'trade',
                bizSubType: 'ind_charge'
              }, function (result) {
                var serialNumberId = response.serialNumber
                if (result.resultCode != 9000 && result.resultCode != 8000) {
                  self.$router.replace('/done')
                } else if (result.resultCode == 9000) {
                  ap.getServerTime(function (res) {
                    cFetch(API_CONFIG.paySuccess.api, {
                      method: 'POST',
                      body: JSON.stringify(Sign({
                        alipaySerialNo: response.alipaySerialNo,
                        serialNumber: response.serialNumber,
                        payDate: res.time,
                        backMode: 2
                      }, API_CONFIG.paySuccess.projectName))
                    }).then(response => {
                      self.data = response
                      var goUrl = window.location.href.replace('done', 'paySuccess/' + serialNumberId)
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
      }
    },
    seeHistory () {
      // 监控埋点
      _czc.push(['_trackEvent', '办理历史', '点击查看'])
      var self = this
      self.$router.push('history/' + self.data.applyId)
    },
    helpURL () {
      // 监控埋点
      _czc.push(['_trackEvent', '售后咨询', '点击查看'])
      var self = this
      window.location.href = self.data.helpUrl
    }
  }

}
</script>

<style scoped>
.am-list.top{
  padding-top: 0;
  padding-bottom: 0;
}

.white-bg img{
  width: 30%;
}
.white-bg{
  text-align: center;
  height: auto;
  padding-top: 0px;
}
.am-list.info.android{
 padding-bottom: 0px;
 padding-top: 10px;
}
.am-list.info{
  padding-bottom: 0;
  padding-top: 15px;
}
.fn-clear.android{
  padding-bottom: 10px;
}
.am-list-item .fn-clear:last-child{
  padding-bottom: 12px;
}
.fn-clear{
  padding-bottom: 8px;
}

.margin{
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: -15px;
  margin-top: -25px;
}
.nobackground{
  background:transparent !important;
}
.border{
  background: linear-gradient(180deg,#fff,#fff) top left no-repeat,linear-gradient(0deg,#fff,#fff) bottom left no-repeat,linear-gradient(180deg,#ddd,#ddd 33%,transparent 33%) top left no-repeat,linear-gradient(0deg,#ddd,#ddd 33%,transparent 33%) bottom left no-repeat,#fff;
  background-size: 0 2px,0 0,100% 2px,100% 0;
  padding-top: 0px !important;
  margin-top: 12px;
}
.bottom{
  padding-bottom: 10px;
}
.white-bg.android{
  padding-bottom: -20px;
}
.move-top{
  margin-top: -5px;
}

.move-top1{
  margin-top: 5px;
}
.add-padding{
  padding-bottom: 16px !important;
}
.ws15px{
  height: 12px !important;
}
.am-list .am-list-item{
  line-height: normal !important;
}
</style>