<template>
  <div class="white-bg">
    <div class="am-ft-gray am-ft-sm am-ft-left am-wingblank wb12px" v-if="showTitle==1">参保进度</div>
    <div class="am-process am-ft-left" :class="{'border':!borderLine}">
      <div class="am-process-item" :class="{ 'pay': item.status==1, 'unpay': item.status==2, 'fail': item.status==3}" v-for="(item,index) in schedule">
        <i class="am-icon process" :class="{ 'success': item.status==1, 'unpay': item.status==2, 'fail': item.status==3}" aria-hidden="true"></i>
        <div class="am-process-content">
          <div class="am-process-main">{{item.schedule}}</div>
          <div class="am-process-brief">{{item.description}}</div>
          <div class="time am-ft-sm am-ft-gray">{{item.createTime}}</div>
        </div>
        <div class="am-process-up-border" v-if="index!=0"></div>
        <div class="am-process-down-border" v-if="index!=schedule.length-1"></div>
      </div>         
    </div>
  </div>
</template>

<script>
export default {
  name: 'verticalProgress',
  props: ['schedule', 'showTitle', 'borderLine']
}
</script>

<style scoped>
.am-process .am-process-item .am-process-content .am-process-main{
  font-size: 15px;
}
.am-process .am-process-item .am-process-content .am-process-brief{
  font-size: 14px;
}
.am-process-content{
  position: relative;
}
.time{
  position: absolute;
  right: 0;
  top: 0;
}
.border{
  background: linear-gradient(180deg,#fff,#fff) top left no-repeat,linear-gradient(0deg,#fff,#fff) bottom left no-repeat,linear-gradient(180deg,#ddd,#ddd 33%,transparent 33%) top left no-repeat,linear-gradient(0deg,#ddd,#ddd 33%,transparent 33%) bottom left no-repeat,#fff;
  background-size: 0 2px,0 0,100% 2px,100% 0;
  padding-top: 15px !important;
  margin-top: 8px;
}
.white-bg{
  padding-top:10px;
}
</style>
