<template>
  <div class="paymentDetail">
    <div class="am-list">
      <div class="am-list-item" v-for="item in details.list">
        <div class="am-list-content">
          <div class="am-list-title">{{item.title}}</div>
          <div class="am-list-brief fn-clear" style="font-size:15px;">
            <div v-for="list in item.lists">{{list.name}}：{{list.value}}</div>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'paymentDetail',
  computed: mapGetters({
    details: 'list'
  })
}
</script>

<style scoped>
.am-list-brief>div{
  width: 50%;
  float: left;
  line-height:25px;
}
.am-list{
  margin-top:11px;
}
</style>