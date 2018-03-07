<template>
    <div>
        <img src="../assets/letter_01.jpg" width="100%" style=" display:block;" />
        <img src="../assets/letter_02.jpg" width="100%" style=" display:block;"  />
        <img src="../assets/letter_03.jpg" width="100%" style=" display:block;" />
        <img src="../assets/letter_04.jpg" width="100%" style=" display:block;"  />
        <img src="../assets/letter_05.jpg" width="100%" style=" display:block;" />
        <img src="../assets/letter_06.jpg" width="100%" style=" display:block;"  />
        <div class="letter-location">
            <img src="../assets/letter_07.jpg" width="100%" style=" display:block;"  />
            <a href="#" v-tap="{methods:goHelp}">&nbsp;</a>
        </div>
        <img src="../assets/letter_08.jpg" width="100%" style=" display:block;"  />
        <img src="../assets/letter_09.jpg" width="100%" style=" display:block;"  />
    </div>
</template>
<script>
export default {
  data () {
    let helpUrl = 'https://cschat.antcloud.com.cn/h5portal.htm?tntInstId=GERGUJCN&scene=SCE00000435'
    return {
      helpUrl: helpUrl
    }
  },
  methods: {
    goHelp () {
      var self = this
      AlipayJSBridge.call('pushWindow', {
        url: self.helpUrl,
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
  .letter-location{
    position: relative;
    height: 100%;
  }
  .letter-location a{
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
    z-index: 99;
    width: 17%;
    margin-left: -8.5%;
  }
</style>

