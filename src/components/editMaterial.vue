<template>
  <div class="editMaterial">
    <div class="am-list am-list-form">
      <div class="am-list-item am-input-autoclear" v-if="data.nameShow">
        <div class="am-list-label" id="list-label-1">姓名</div>
        <div class="am-list-control">
          <input id="demo-input-1" type="text" placeholder="请输入真实姓名" v-model="data.name" aria-labelledby="list-label-1">
        </div>
        <div class="am-list-clear" tabindex="0" aria-label="清空输入框" aria-controls="demo-input-1" v-tap="{methods:clear, index:1}">
          <i class="am-icon-clear am-icon" aria-hidden="true"></i>
        </div>
      </div>      
      <div class="am-list-item am-input-autoclear" v-if="data.idCardShow">
        <div class="am-list-label" id="list-label-3">身份证号码</div>
        <div class="am-list-control">
          <input id="demo-input-3" type="text" v-model="data.idCard" placeholder="请输入身份证号码" value="" aria-labelledby="list-label-3" maxlength="20">
        </div>
        <div class="am-list-clear" tabindex="0" aria-label="清空输入框" aria-controls="demo-input-3" v-tap="{methods:clear, index:3}">
          <i class="am-icon-clear am-icon" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    
    <div class="am-whitespace ws20px"></div>
    <div class="am-list am-list-twoline-text">
      <div class="am-list-item">
        <div class="am-list-content">
          <div class="am-ft-sm am-ft-center am-ft-gray title">请拍摄实体身份证，并录入信息 <a href="javascript:void(0)" v-tap="{methods:gotoRequire}" class="am-ft-blue am-ft-13">拍摄要求</a></div>
          
          <div class="upload" v-bind:class="{ android: isAndroid }" v-if="data.idCardPicUrlAShow">
            <img :src="data.idCardPicUrlA.key?data.idCardPicUrlA.url:PublicValue.img.id1" v-tap="{methods:getPhoto, type:1}">
            <div class="upload-mask" v-tap="{methods:getPhoto, type:1}"><span>点击上传身份证人像图</span></div>
          </div>

          <div class="upload" v-bind:class="{ android: isAndroid }" v-if="data.idCardPicUrlBShow">
            <img :src="data.idCardPicUrlB.key?data.idCardPicUrlB.url:PublicValue.img.id2" v-tap="{methods:getPhoto, type:2}">
            <div class="upload-mask" v-tap="{methods:getPhoto, type:2}"><span>点击上传身份证国徽面</span></div>
          </div>
          <div class="upload" v-bind:class="{ android: isAndroid }" v-if="data.hkPicUrlOfHomepageShow">
            <img v-if="data.hkPicUrlOfHomepage.url" :src="data.hkPicUrlOfHomepage.url" v-tap="{methods:getPhoto, type:3}">
            <img v-if="!data.hkPicUrlOfHomepage.url" src="../assets/hukou1.png" v-tap="{methods:getPhoto, type:3}">
            <div class="upload-mask" v-tap="{methods:getPhoto, type:3}"><span>点击上传户口本首页照片</span></div>
          </div>
          <div class="upload" v-bind:class="{ android: isAndroid }" v-if="data.hkPicUrlOfHeaderpageShow">
            <img v-if="data.hkPicUrlOfHeaderpage.url" :src="data.hkPicUrlOfHeaderpage.url" v-tap="{methods:getPhoto, type:4}">
            <img v-if="!data.hkPicUrlOfHeaderpage.url" src="../assets/hukou2.png" v-tap="{methods:getPhoto, type:4}">
            <div class="upload-mask" v-tap="{methods:getPhoto, type:4}"><span>点击上传户口本户主页照片</span></div>
          </div>
          <div class="upload" v-bind:class="{ android: isAndroid }" v-if="data.hkPicUrlOfOwnpageShow">
            <img v-if="data.hkPicUrlOfOwnpage.url" :src="data.hkPicUrlOfOwnpage.url" v-tap="{methods:getPhoto, type:5}">
            <img v-if="!data.hkPicUrlOfOwnpage.url" src="../assets/hukou3.png" v-tap="{methods:getPhoto, type:5}">
            <div class="upload-mask" v-tap="{methods:getPhoto, type:5}"><span>点击上传户口本本人页照片</span></div>
          </div>
          <div class="am-wingblank wb10px">
            <button type="button" class="am-button" v-tap="{methods:next}" :disabled="!data.name||!data.idCard||!data.idCardPicUrlA.key||!data.idCardPicUrlB.key">提交</button>
          
          </div>
          <div class="am-wingblank wb10px"></div>
          <div class="am-ft-12 am-ft-center am-ft-gray title">支付宝会保护您的信息安全</div>
          <div class="msg"></div>
        </div>
      </div>      
    </div>
    

    
  </div>
</template>

<script>
import { cFetch, API_CONFIG, Sign, check, PublicValue, PostAsForm } from '@/service'
export default {
  name: 'EditMaterial',
  data () {
    var ua = navigator.userAgent.toLowerCase()
    var isAndroid = ua.indexOf('android') > -1 && ua.indexOf('mi') < 0
    return {
      data: {
        applyId: '',
        materialId: '',
        name: '',
        idCard: '',
        idCardPicUrlA: {
          key: '',
          url: ''
        },
        idCardPicUrlB: {
          key: '',
          url: ''
        },
        hkPicUrlOfHomepage: {
          key: '',
          url: ''
        },
        hkPicUrlOfOwnpage: {
          key: '',
          url: ''
        },
        hkPicUrlOfHeaderpage: {
          key: '',
          url: ''
        },
        address: '',
        nameShow: false,
        idCardShow: false,
        idCardPicUrlAShow: false,
        idCardPicUrlBShow: false,
        hkPicUrlOfHomepageShow: false,
        hkPicUrlOfOwnpageShow: false,
        hkPicUrlOfHeaderpageShow: false
      },
      PublicValue: PublicValue.params,
      isAndroid: isAndroid
    }
  },
  created () {
    var self = this
    if (PublicValue.get('editMaterial')) {
      self.data = JSON.parse(PublicValue.get('editMaterial'))
    } else {
      cFetch(API_CONFIG.editMaterial.api, {
        method: 'POST',
        body: JSON.stringify(Sign({
          applyId: self.$route.params.applyId
        }, API_CONFIG.editMaterial.projectName))
      }).then(response => {
        self.data = response
      })
    }
  },
  methods: {
    next () {
      var self = this
      var saveData = {}
      saveData.applyId = self.data.applyId
      if (self.data.nameShow) {
        saveData.name = self.data.name
      }
      if (self.data.idCardShow) {
        saveData.idCard = self.data.idCard
      }
      if (self.data.idCardPicUrlAShow) {
        saveData.idCardPicUrlA = self.data.idCardPicUrlA
      }
      if (self.data.idCardPicUrlBShow) {
        saveData.idCardPicUrlB = self.data.idCardPicUrlB
      }
      if (self.data.hkPicUrlOfHomepageShow) {
        saveData.hkPicUrlOfHomepage = self.data.hkPicUrlOfHomepage
      }
      if (self.data.hkPicUrlOfOwnpageShow) {
        saveData.hkPicUrlOfOwnpage = self.data.hkPicUrlOfOwnpage
      }
      if (self.data.hkPicUrlOfHeaderpageShow) {
        saveData.hkPicUrlOfHeaderpage = self.data.hkPicUrlOfHeaderpage
      }
      cFetch(API_CONFIG.saveMaterial.api, {
        method: 'POST',
        body: JSON.stringify(Sign(Object.assign(saveData), API_CONFIG.saveMaterial.projectName))
      }).then(response => {
        self.$router.push('/saveMaterial')
      })
    },
    clear (obj) {
      if (obj.index == 1) {
        this.data.name = ''
      } else if (obj.index == 3) {
        this.data.idCard = ''
      }
    },
    hideDialog () {
      $('.am-dialog-mask').toggleClass('show')
      $('.am-dialog').toggleClass('show')
    },
    clickFrontImageInput () {
      this.getPhoto({type: 1})
    },
    gotoRequire () {
      var self = this
      PublicValue.add('editMaterial', JSON.stringify(self.data))
      this.$router.push('/require')
    },
    getPhoto (obj) {
      var self = this
      AlipayJSBridge.call('photo', {
        dataType: 'dataURL',
        imageFormat: 'jpg',
        quality: 75,
        maxWidth: 1000,
        maxHeight: 1000,
        multimediaConfig: { // 可选，仅当该项被配置时，图片被传输至 APMultimedia
          compress: 2, // 可选，默认为4。 0-低质量，1-中质量，2-高质量，3-不压缩，4-根据网络情况自动选择
          business: 'multiMedia' // 可选，默认为“NebulaBiz”
        }
      }, function (result) {
        if (!result.error) {
          var fileType = obj.type
          check.rotateImg('data:image/jpeg;base64,' + result.dataURL).then(function (src) {
            PostAsForm(API_CONFIG.upload.api, {
              fileType: fileType,
              uploadFile: src,
              isFirst: 1
            })
              .then(check.CheckResponse)
              .then(response => {
                ap.hideLoading()
                var data = response
                if (fileType == 1) {
                  self.data.idCardPicUrlA = {
                    key: data.key,
                    url: data.url
                  }
                  self.data.address = data.address
                  if (data.idCard.toLowerCase() != self.data.idCard.toLowerCase() || data.name != self.data.name) {
                    ap.confirm({
                      title: '你上传的身份证号与你参保信息中输入的身份证号不一致，请确认',
                      content: '照片识别存在一定的误差，如果确认输入和上传都无误，请无视',
                      confirmButtonText: '重新上传',
                      cancelButtonText: '我知道了'
                    }, function (result) {
                      if (result.confirm) {
                        self.clickFrontImageInput()
                      }
                    })
                  }
                } else if (fileType == 2) {
                  if (data.needReverse == 1) {
                    check.rotateImg(src, true).then(function (src) {
                      PostAsForm(API_CONFIG.upload.api, {
                        fileType: fileType,
                        uploadFile: src,
                        isFirst: 0
                      })
                      .then(check.CheckResponse)
                      .then(response => {
                        ap.hideLoading()
                        var data = response
                        self.data.idCardPicUrlB = {
                          key: data.key,
                          url: data.url
                        }
                      })
                    }).catch(function (error) {
                      check.toast(error)
                    })
                  } else {
                    ap.hideLoading()
                    self.data.idCardPicUrlB = {
                      key: data.key,
                      url: data.url
                    }
                  }
                } else if (fileType == 3) {
                  ap.hideLoading()
                  self.data.hkPicUrlOfHomepage = {
                    key: data.key,
                    url: data.url
                  }
                } else if (fileType == 4) {
                  ap.hideLoading()
                  self.data.hkPicUrlOfHeaderpage = {
                    key: data.key,
                    url: data.url
                  }
                } else if (fileType == 5) {
                  ap.hideLoading()
                  self.data.hkPicUrlOfOwnpage = {
                    key: data.key,
                    url: data.url
                  }
                }
              })
          })
            .catch(function (error) {
              check.toast(error)
            })
        }
      })
    }
  }

}
</script>
<style scoped>
.upload{
  position: relative;
  margin:0px 12px 5px;
}
.upload .upload-mask{
  width: 100%;
  height: 97%;
  position: absolute;
  top: 0;
  left: 0;
  background:rgba(0, 0, 0, 0.5); 
  border-radius:5px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
.upload .upload-mask span{
  position: relative;
  top: 87%;
}
.upload img{
  width: 100%;
  border: dashed 1px #c4c4c4;
  padding: 5px;
  border-radius:5px;
  box-sizing: border-box;
}
.upload.android img{
  border: 2px dashed #c4c4c4;
}
.title{
  margin:20px;
}
.am-list{
  padding:0px;
}
.am-list-control.am-ft-right{
  font-size: 16px;
}
input[type="file"]{
  display: none;
}  
</style>