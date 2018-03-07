<template>
  <div class="white-bg">
    <div class="progress-horizental fn-clear">
      <div class="fn-left horizental-icon">
        <i class="icon-hint-17 am-ft-blue"></i>
        <div class="progress-text am-ft-sm am-ft-black first">参保信息</div>
      </div>
      <div class="fn-left">
        <div class="horizental-line blue" :class="{mi: isMi}"></div>
      </div>
      <div class="fn-left">
        <div class="horizental-line" v-bind:class="{ lightgray: step===0, blue: step===1||step===2, mi: isMi}"></div>
      </div>
      <div class="fn-left horizental-icon">
        <i v-bind:class="{ 'icon-hint-10 am-ft-lightgray': step===0, 'icon-hint-17 am-ft-blue': step===1||step===2}"></i>
        <div class="progress-text am-ft-sm second" v-bind:class="{ 'am-ft-lightgray': step===0, 'am-ft-black': step===1||step===2}">参保材料</div>
      </div>
      <div class="fn-left">
        <div class="horizental-line" v-bind:class="{ lightgray: step===0, blue: step===1||step===2, mi: isMi}"></div>
      </div>
      <div class="fn-left">
        <div class="horizental-line" v-bind:class="{ lightgray: step===1||step===0, blue: step===2, mi: isMi}"></div>
      </div>
      <div class="fn-left horizental-icon">
        <i v-bind:class="{ 'icon-hint-10 am-ft-lightgray': step===1||step===0, 'icon-hint-17 am-ft-blue': step===2}"></i>
        <div class="progress-text am-ft-sm last" v-bind:class="{ 'am-ft-lightgray': step===1||step===0, 'am-ft-black': step===2}">确认订单</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: ['step'],
  data () {
    var ua = navigator.userAgent.toLowerCase()
    var isMi = ua.indexOf('mi') > -1
    return {
      isMi: isMi
    }
  }
}
</script>

<style scoped>
  .horizental-line.mi{
    margin-top: 12px;
  }
  .white-bg{
    padding-top: 10px;
  }
</style>