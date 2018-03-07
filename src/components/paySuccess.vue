<template>
    <div> 
  <div class="paySuccess">
          <div class="icon-box">
            <i class="icon-hint-18 am-ft-blue"></i>
          </div>
      <p>支付成功</p>
          <div class="pay-money"><span>支付金额：</span>{{data.payAmount}}元</div>
  </div>
        <VerticalProgress :schedule="data.orderScheduleDtoList" :borderLine="true"></VerticalProgress>
        <div class="online-fixed"><span v-tap="{methods:goHelp}">在线咨询</span></div>
    </div>
</template>

<script>
import { cFetch, API_CONFIG, Sign, PublicValue } from '@/service'
export default {
  name: 'paySuccess',
  data () {
    let serialNumber = this.$route.params.serialNumber
    return {
      data: {
        'payAmount': '',
        'helpUrl': API_CONFIG[PublicValue.params.cityCode] + API_CONFIG.helpUrl2,
        'orderScheduleDtoList': [{
          'schedule': '',
          'description': '',
          'createTime': '',
          'status': 1    // 进度状态：1已完成（蓝色打钩），2未开始（灰色），3申报失败（红色）
        },
        {
          'schedule': '',
          'description': '',
          'createTime': '',
          'status': 2    // 进度状态：1已完成（蓝色打钩），2未开始（灰色），3申报失败（红色）
        }]
      },
      serialNumber: serialNumber
    }
  },
  created () {
    ap.setOptionButton({
      items: [{
        title: '完成',
        color: '#108eea'
      }],
      onClick: function (data) {
        AlipayJSBridge.call('exitApp')
      }
    })
    var self = this
    cFetch(API_CONFIG.paySuccessInfo.api, {
      method: 'POST',
      body: JSON.stringify(Sign({
        'serialNumber': self.serialNumber
      }, API_CONFIG.paySuccessInfo.projectName))
    }).then(response => {
      self.data = response
    })
  },
  components: {
    'VerticalProgress': require('@/partial/verticalProgress')
  },
  methods: {
    goHelp () {
      var self = this
      AlipayJSBridge.call('pushWindow', {
        url: self.data.helpUrl,
        param: {
          transparentTitle: false,
          showOptionMenu: false
        }
      })
    }
  }
}
</script>

<style scoped>
.paySuccess{
  background: #ffffff;
  box-shadow:0 1px 0 0 #dddddd;
  padding-bottom: 20px;
  padding-top: 84px;
  margin-bottom: 15px;
}
.paySuccess>.icon-box{
  font-size: 60px;
  text-align: center;
}
.paySuccess>p{
  font-size:17px;
  color:#000000;
  line-height:24px;
  text-align:center;
  margin-top: 15px;
  margin-bottom: 6px;
}
.paySuccess>.pay-money{
  font-size:17px;
  color:#108ee9;
  text-align: center;
  line-height:24px;
}
.paySuccess>.pay-money>span{
  font-size:15px;
  color:#000000;
  line-height:21px;
}
.white-bg{
  padding-top: 0!important;
}
.online-fixed{
  font-size:14px;
  color:#566b96;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 15px;
}
</style>