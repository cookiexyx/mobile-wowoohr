<template>
  
</template>

<script>
import { cFetch, API_CONFIG, PublicValue, Sign } from '@/service'
export default {
  name: 'loading',
  data () {
    return {
    }
  },
  created () {
    var self = this
    cFetch(API_CONFIG.judgeNewAndReMaterial.api, {
      method: 'POST',
      body: JSON.stringify(Sign({
        cityCode: PublicValue.params.cityCode,
        type: PublicValue.params.productType
      }, API_CONFIG.judgeNewAndReMaterial.projectName))
    }).then(response => {
      self.data = response
      if (self.data.isEqual == 'true') {
        PublicValue.add('socialType', 3)
        if (PublicValue.params.alipayAccountId) {
          self.$router.push('/done')
        } else {
          self.$router.push('/index')
        }
      } else {
        PublicValue.add('cityEntry', self.data.cityName)
        PublicValue.add('typeEntry', self.data.productName)
        self.$router.push('/entry')
      }
    })
  }
}
</script>

