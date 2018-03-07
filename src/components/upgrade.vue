<template>
    <div class="htmlBj">
        <img src="../assets/upgrade_01.jpg" width="100%" style=" display:block;" />
        <img src="../assets/upgrade_02.jpg" width="100%" style=" display:block;"  />
        <img src="../assets/upgrade_03.jpg" width="100%" style=" display:block;" />
        <img src="../assets/upgrade_04.jpg" width="100%" style=" display:block;"  />
        <img src="../assets/upgrade_05.jpg" width="100%" style=" display:block;" />
        <div class="letter-location">
            <img src="../assets/upgrade_06.jpg" width="100%" style=" display:block;"  />
            <a href="#" v-tap="{methods:goHelp}"></a>
        </div>
        <img src="../assets/upgrade_07.jpg" width="100%" style=" display:block;"  />
        <img src="../assets/upgrade_08.jpg" width="100%" style=" display:block;"  />
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
  .htmlBj{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: #fff;
  }
  .letter-location{
    position: relative;
  }
  .letter-location a{
    position: absolute;
    left: 50%;
    top: 0;
    z-index: 99;
    display: inline-block;
    height: 100%;
    width: 17%;
    margin-left: -10.5%;
  }
</style>

