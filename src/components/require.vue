<template>
  <div class="require">
    <div class="white-bg">
      <div class="content" v-bind:class="{ android: isAndroid }">
        <div class="title">拍摄要求</div>
        <div class="detail">
          <div class="am-ft-gray am-ft-sm">
          拍摄时请确保边框完整，字体清晰，亮度均匀、<span class="am-ft-red">避免过小、位置倾斜、拍摄角度偏离、不完整、光线太暗、有遮挡、模糊、无水印、无背景（如手指，桌面等）</span>
          </div>
          <!--
          <div class="am-ft-gray am-ft-md am-ft-center">正确范例</div>
          <div class="am-whitespace ws10px"></div>
          <img :src="PublicValue.img.demo" width="100%" />
          -->
        </div>
      </div>

      <div class="am-ft-gray am-ft-md am-ft-left">拍摄示例</div>
      <div class="am-flexbox">
        <div class="am-flexbox-item"><img src="../assets/correct1.png" width="100%" /></div>
        <div class="am-flexbox-item"><img src="../assets/error2.png" width="100%" /></div>
        <div class="am-flexbox-item"><img src="../assets/error3.png" width="100%" /></div>
        <div class="am-flexbox-item"><img src="../assets/error4.png" width="100%" /></div>
      </div>
      <div class="am-flexbox am-ft-gray" style="margin-top:-15px;">
        <div class="am-flexbox-item am-ft-center">正确示例</div>
        <div class="am-flexbox-item am-ft-center">边框缺失</div>
        <div class="am-flexbox-item am-ft-center">照片模糊</div>
        <div class="am-flexbox-item am-ft-center">闪光强烈</div>
      </div>
    </div>
  </div>
</template>

<script>
import { PublicValue } from '@/service'
export default {
  name: 'require',
  data () {
    var ua = navigator.userAgent.toLowerCase()
    var isAndroid = ua.indexOf('android') > -1 && ua.indexOf('mi') < 0
    setTimeout(function () {
      if (isAndroid) {
        $('.white-bg').css({height: screen.height - 40 + 'px'})
      } else {
        $('.white-bg').css({height: screen.height - 80 + 'px'})
      }
    }, 200)
    return {
      PublicValue: PublicValue.params,
      isAndroid: isAndroid
    }
  }
}
</script>

<style scoped>
.content{
  /*border: 1px solid #c4c4c4;*/
  padding: 20px;
  position: relative; 
}
.content.android{
  border: 2px solid #c4c4c4;
}
.title{
  /*position: absolute;
  top:-17px;*/
  width: 100%;
  border-bottom: 1px #ddd solid;
  background-color: #fff;
  padding-bottom: 12px;
  font-size: 18px;
}
.white-bg{
  height: auto;
}
.detail{
  padding-top:12px;
}
.am-flexbox{
  margin:15px;
}
.am-ft-left{
  padding-left: 20px;
}
@media (max-width: 320px)
{
  .title{
    top:-19px;
  }
}
</style>