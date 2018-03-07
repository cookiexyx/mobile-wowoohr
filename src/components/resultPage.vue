<template>
    <div class="am-page-result" role="alert">
      <div class="am-page-result-wrap">
        <div class="am-page-result-pic am-icon page-busy" aria-hidden="true"></div>
        <div class="am-page-result-title">系统出错，正在排查</div>
        <div class="am-page-result-brief">耽误您的时间，我们深感歉意</div>
        <!-- <a class="am-page-result-button" role="button">刷新</a> -->
      </div>
    </div>
</template>

<script>
export default {
  name: 'resultPage',
  data () {
    return {
      data: {

      }
    }
  }
}
</script>

<style scoped>
.am-page-result{
  margin-top: 40px;
}

</style>