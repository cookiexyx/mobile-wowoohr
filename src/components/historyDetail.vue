<template>
  <div class="history">
    <div class="am-list am-list-form">
      <VerticalProgress :schedule="data.orderScheduleDtoList" :showTitle="0"></VerticalProgress>
    </div>
  </div>
</template>

<script>
import { cFetch, API_CONFIG, Sign } from '@/service'
export default {
  name: 'HistoryDetail',
  data () {
    return {
      data: {
        'orderScheduleDtoList': [
          {
            'schedule': '',
            'description': '',
            'createTime': '',
            'status': 1
          }
        ]
      }
    }
  },
  created () {
    var self = this
    cFetch(API_CONFIG.historyDetail.api, {
      method: 'POST',
      body: JSON.stringify(Sign({
        orderId: self.$route.params.orderId
      }, API_CONFIG.historyDetail.projectName))
    }).then(response => {
      self.data = response
    })
  },
  components: {
    'VerticalProgress': require('@/partial/verticalProgress')
  }

}
</script>

<style scoped>
.white-bg{
  padding-top: 0px !important;
}
.am-list{
  margin-top:3px;
}
</style>