<template>
  <div class="history">
    <div class="am-list">
      <div class="am-list-body" aria-labelledby="list-header-1" > 
        <router-link :to="{ path: '/historyDetail/'+item.orderId}" class="am-list-item nobackground" v-bind:class="{ android: isAndroid, mi: isMi }" v-for="(item, index) in data.orderMonthList" v-bind:key="item.index"> 
          <div class="am-list-content">{{item.orderMonth}}</div>
          <div class="am-list-extra">{{item.orderStatus.value}}</div>
          <div class="am-list-arrow" aria-hidden="true">
            <span class="am-icon arrow horizontal"></span>
          </div>
        </router-link> 
      </div>
    </div>
  </div>
</template>

<script>
import { cFetch, API_CONFIG, Sign } from '@/service'
export default {
  name: 'History',
  data () {
    var ua = navigator.userAgent.toLowerCase()
    var isAndroid = ua.indexOf('android') > -1
    var isMi = ua.indexOf('mi') > -1
    return {
      data: {
        'orderMonthList': [
          {
            'orderId': '',
            'orderMonth': '',
            'orderStatus': {
              'key': '',
              'value': ''
            }
          }
        ]
      },
      isAndroid: isAndroid,
      isMi: isMi
    }
  },
  created () {
    window.scrollTo(0, 0)
    var self = this
    cFetch(API_CONFIG.history.api, {
      method: 'POST',
      body: JSON.stringify(Sign({
        applyId: self.$route.params.applyId
      }, API_CONFIG.history.projectName))
    }).then(response => {
      self.data = response
    })
  }

}
</script>

<style scoped>
.am-list{
  margin-top:11px !important;
}
.am-list-item.android{
  padding-top: 5px;  
}

.am-list-item.android.mi{
  background-size: .15rem 1px,.15rem 1px,100% 0,100% 2px;
}
</style>