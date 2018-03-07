<template>
  <div class="step2">
    <ProgressComponent :step="progress"></ProgressComponent>   
    <div class="am-whitespace ws20px"></div>
    <div class="am-list am-list-form">
      <div class="am-list-body">
        <div class="am-list-item am-input-autoclear" v-tap="{methods:getCity}" v-if="data.residenceCityShow">
          <div class="am-list-label" id="list-label-1">户籍所在地</div>
          <div class="am-list-control am-ft-right" v-if="data.currentCity.value">
            {{data.currentCity.value}}           
          </div>
          <div class="am-list-control am-ft-right am-ft-lightgray" v-if="!data.currentCity.value">
            请选择省市          
          </div>
          <div class="am-list-arrow" aria-hidden="true">
            <span class="am-icon arrow horizontal"></span>
          </div>
        </div>
        <div class="am-list-item am-input-autoclear"  v-if="data.residenceNatureShow">
          <div class="am-list-label" id="list-label-2">户籍性质</div>
          <div class="am-list-control">
            <select id="demo-input-2" v-model="residenceNature" aria-labelledby="list-label-2" dir="rtl" required>
              <option value="" disabled selected>请选择户籍性质</option>
              <option v-for="option in data.residenceNatureOptions" v-bind:value="option.key">
              {{ option.value }}
              </option>
            </select> 
          </div>
          <div class="am-list-arrow" aria-hidden="true">
            <span class="am-icon arrow horizontal"></span>
          </div>
        </div>
        <div class="am-list-item am-input-autoclear" v-if="data.educationShow">
          <div class="am-list-label" id="list-label-3">学历</div>
          <div class="am-list-control">
            <select id="demo-input-3" v-model="education" aria-labelledby="list-label-3" dir="rtl" required>
            <option value="" disabled selected>请选择学历</option>
              <option v-for="option in data.educationOptions" v-bind:value="option.key">
              {{ option.value }}
              </option>
            </select> 
          </div>
          <div class="am-list-arrow" aria-hidden="true">
            <span class="am-icon arrow horizontal"></span>
          </div>
        </div>
        <div class="am-whitespace ws20px"></div>
        <div class="am-list-item am-input-autoclear" v-if="data.siNumberShow">
          <div class="am-list-label" id="list-label-2">社保编号</div>
          <div class="am-list-control">
            <input id="demo-input-2" type="number" placeholder="请输入社保编号" v-model="socialSecurityNumber" aria-labelledby="list-label-2" maxlength="30" @blur="checkKeyup">
          </div>
          <div class="am-list-clear" tabindex="0" aria-label="清空输入框" aria-controls="demo-input-2" v-tap="{methods:clear, index:1}">
            <i class="am-icon-clear am-icon" aria-hidden="true"></i>
          </div>
        </div>
        <div class="am-list-item am-input-autoclear" v-if="data.fundAccountShow">
          <div class="am-list-label" id="list-label-3">公积金编号</div>
          <div class="am-list-control">
            <input id="demo-input-3" type="number" v-model="fundAccount" placeholder="请输入公积金编号" aria-labelledby="list-label-3" maxlength="30" @blur="checkKeyup">
          </div>
          <div class="am-list-clear" tabindex="0" aria-label="清空输入框" aria-controls="demo-input-3" v-tap="{methods:clear, index:2}">
            <i class="am-icon-clear am-icon" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="am-whitespace ws20px"></div>
    <div class="am-list am-list-twoline-text">
      <div class="am-list-item">
        <div class="am-list-content">
          <div class="am-ft-sm am-ft-center am-ft-gray title">请拍摄实体身份证，并录入信息 <a href="javascript:void(0)" v-tap="{methods:gotoRequire}" class="am-ft-blue am-ft-13">拍摄要求</a></div>
          <div class="upload" v-bind:class="{ android: isAndroid }">
            <img :src="idCardPicUrlA?idCardPicUrlA:pValue.img.id1" v-tap="{methods:getPhoto, type:1}">
            <div class="upload-mask" v-tap="{methods:getPhoto, type:1}"><span>点击上传身份证人像图</span></div>
          </div>
          <div class="upload" v-bind:class="{ android: isAndroid }">
            <img :src="idCardPicUrlB?idCardPicUrlB:pValue.img.id2" v-tap="{methods:getPhoto, type:2}">
            <div class="upload-mask" v-tap="{methods:getPhoto, type:2}"><span>点击上传身份证国徽面</span></div>
          </div>
          <div class="upload" v-bind:class="{ android: isAndroid }" v-if="data.hkPicUrlOfHomepageShow">
            <img v-if="hkPicUrlOfHomepage" :src="hkPicUrlOfHomepage" v-tap="{methods:getPhoto, type:3}">
            <img v-if="!hkPicUrlOfHomepage" src="../assets/hukou1.png" v-tap="{methods:getPhoto, type:3}">
            <div class="upload-mask" v-tap="{methods:getPhoto, type:3}"><span>点击上传户口本首页照片</span></div>
          </div>
          <div class="upload" v-bind:class="{ android: isAndroid }"  v-if="data.hkPicUrlOfHeaderpageShow">
            <img v-if="hkPicUrlOfHeaderpage" :src="hkPicUrlOfHeaderpage" v-tap="{methods:getPhoto, type:4}">
            <img v-if="!hkPicUrlOfHeaderpage" src="../assets/hukou2.png" v-tap="{methods:getPhoto, type:4}">
            <div class="upload-mask" v-tap="{methods:getPhoto, type:4}"><span>点击上传户口本户主页照片</span></div>
          </div>
          <div class="upload" v-bind:class="{ android: isAndroid }"  v-if="data.hkPicUrlOfOwnpageShow">
            <img v-if="hkPicUrlOfOwnpage" :src="hkPicUrlOfOwnpage" v-tap="{methods:getPhoto, type:5}">
            <img v-if="!hkPicUrlOfOwnpage" src="../assets/hukou3.png" v-tap="{methods:getPhoto, type:5}">
            <div class="upload-mask" v-tap="{methods:getPhoto, type:5}"><span>点击上传户口本本人页照片</span></div>
          </div>
          <div class="am-wingblank wb10px">
            <button type="button" class="am-button" v-tap="{methods:next}" :disabled="(!education&&data.educationShow)||(!residenceNature&&data.residenceNatureShow)||(!data.currentCity.value&&data.residenceCityShow)||!idCardPicUrlA||!idCardPicUrlB||(!socialSecurityNumber&&data.siNumberShow)||(!fundAccount&&data.fundAccountShow)||(!hkPicUrlOfHomepage&&data.hkPicUrlOfHomepageShow)||(!hkPicUrlOfHeaderpage&&data.hkPicUrlOfHeaderpageShow)||(!hkPicUrlOfOwnpage&&data.hkPicUrlOfOwnpageShow)">下一步</button>
          </div>
          <div class="am-wingblank wb10px"></div>
          <div class="am-ft-12 am-ft-center am-ft-gray title">支付宝会保护您的信息安全</div>
        </div>
      </div>      
    </div>    
  </div>
</template>

<script>
import { cFetch, API_CONFIG, Sign, check, PublicValue, PostAsForm } from '@/service'
export default {
  name: 'Step2',
  data () {
    let residenceNatureOptions = [{
      'key': '1',
      'value': '本地城镇'
    }]
    let educationOptions = [{
      'key': '1',
      'value': '博士'
    }]
    var ua = navigator.userAgent.toLowerCase()
    var isAndroid = ua.indexOf('android') > -1 && ua.indexOf('mi') < 0
    return {
      data: {
        residenceNatureOptions: residenceNatureOptions,
        educationOptions: educationOptions,
        currentCity: {
          'key': 0,
          'value': ''
        },
        educationShow: false,
        residenceNatureShow: false,
        residenceCityShow: false,
        siNumberShow: false,
        fundAccountShow: false,
        hkPicUrlOfOwnpageShow: false,
        hkPicUrlOfHomepageShow: false,
        hkPicUrlOfHeaderpageShow: false
      },
      progress: 1,
      residenceNature: JSON.parse(PublicValue.get('residenceNature')) ? JSON.parse(PublicValue.get('residenceNature')).key : '',
      education: JSON.parse(PublicValue.get('education')) ? JSON.parse(PublicValue.get('education')).key : '',
      fundAccount: JSON.parse(PublicValue.get('fundAccount')) ? JSON.parse(PublicValue.get('fundAccount')) : '',
      socialSecurityNumber: JSON.parse(PublicValue.get('socialSecurityNumber')) ? JSON.parse(PublicValue.get('socialSecurityNumber')) : '',
      idCardPicUrlA: JSON.parse(PublicValue.get('idCardPicUrlA')) ? JSON.parse(PublicValue.get('idCardPicUrlA')).value : '',
      idCardPicUrlB: JSON.parse(PublicValue.get('idCardPicUrlB')) ? JSON.parse(PublicValue.get('idCardPicUrlB')).value : '',
      hkPicUrlOfHomepage: JSON.parse(PublicValue.get('hkPicUrlOfHomepage')) ? JSON.parse(PublicValue.get('hkPicUrlOfHomepage')).value : '',
      hkPicUrlOfHeaderpage: JSON.parse(PublicValue.get('hkPicUrlOfHeaderpage')) ? JSON.parse(PublicValue.get('hkPicUrlOfHeaderpage')).value : '',
      hkPicUrlOfOwnpage: JSON.parse(PublicValue.get('hkPicUrlOfOwnpage')) ? JSON.parse(PublicValue.get('hkPicUrlOfOwnpage')).value : '',
      payment: JSON.parse(PublicValue.get('payment')),
      idCardPicUrlAKey: PublicValue.get('idCardPicUrlAKey') || (JSON.parse(PublicValue.get('idCardPicUrlA')) ? JSON.parse(PublicValue.get('idCardPicUrlA')).key : ''),
      idCardPicUrlBKey: PublicValue.get('idCardPicUrlBKey') || (JSON.parse(PublicValue.get('idCardPicUrlB')) ? JSON.parse(PublicValue.get('idCardPicUrlB')).key : ''),
      hkPicUrlOfHomepageKey: PublicValue.get('hkPicUrlOfHomepageKey') || (JSON.parse(PublicValue.get('hkPicUrlOfHomepage')) ? JSON.parse(PublicValue.get('hkPicUrlOfHomepage')).key : ''),
      hkPicUrlOfHeaderpageKey: PublicValue.get('hkPicUrlOfHeaderpageKey') || (JSON.parse(PublicValue.get('hkPicUrlOfHeaderpage')) ? JSON.parse(PublicValue.get('hkPicUrlOfHeaderpage')).key : ''),
      hkPicUrlOfOwnpageKey: PublicValue.get('hkPicUrlOfOwnpageKey') || (JSON.parse(PublicValue.get('hkPicUrlOfOwnpage')) ? JSON.parse(PublicValue.get('hkPicUrlOfOwnpage')).key : ''),
      pValue: PublicValue.params,
      address: JSON.parse(PublicValue.get('address')),
      isAndroid: isAndroid
    }
  },
  created () {
    JSON.parse(PublicValue.get('payment')).data.helpUrl ? check.setRight(JSON.parse(PublicValue.get('payment')).data.helpUrl, API_CONFIG.helpUrl2) : check.setRight(API_CONFIG[PublicValue.params.cityCode], API_CONFIG.helpUrl2)

    var self = this
    if (PublicValue.get('step2')) {
      let response = JSON.parse(PublicValue.get('step2'))
      if (PublicValue.get('selected')) {
        response.data.currentCity = JSON.parse(PublicValue.get('selected'))
      }
      Object.assign(self, response)
    } else {
      cFetch(API_CONFIG.step2.api, {
        method: 'POST',
        body: JSON.stringify(Sign({
          'productId': JSON.parse(PublicValue.get('payment')).data.productId,
          'socialType': PublicValue.get('socialType') ? PublicValue.get('socialType') : ''
        }, API_CONFIG.step2.projectName))
      }).then(response => {
        self.data.residenceNatureOptions = response.residenceNature
        self.data.educationOptions = response.education
        if (PublicValue.get('selected')) {
          self.data.currentCity = JSON.parse(PublicValue.get('selected'))
        }
        self.data.educationShow = response.educationShow
        self.data.residenceNatureShow = response.residenceNatureShow
        self.data.residenceCityShow = response.residenceCityShow
        self.data.siNumberShow = response.siNumberShow
        self.data.fundAccountShow = response.fundAccountShow
        self.data.hkPicUrlOfHomepageShow = response.hkPicUrlOfHomepageShow
        self.data.hkPicUrlOfHeaderpageShow = response.hkPicUrlOfHeaderpageShow
        self.data.hkPicUrlOfOwnpageShow = response.hkPicUrlOfOwnpageShow
      })
    }
  },
  components: {
    'ProgressComponent': require('@/partial/Progress')
  },
  methods: {
    next () {
      var self = this
      let { residenceNature, education, data, idCardPicUrlBKey, idCardPicUrlAKey, idCardPicUrlA, idCardPicUrlB, address, fundAccount, socialSecurityNumber, hkPicUrlOfHomepage, hkPicUrlOfHomepageKey, hkPicUrlOfHeaderpage, hkPicUrlOfHeaderpageKey, hkPicUrlOfOwnpage, hkPicUrlOfOwnpageKey } = self
      PublicValue.add('step2', JSON.stringify({ residenceNature, education, data, idCardPicUrlBKey, idCardPicUrlAKey, idCardPicUrlA, idCardPicUrlB, address, fundAccount, socialSecurityNumber, hkPicUrlOfHomepage, hkPicUrlOfHomepageKey, hkPicUrlOfHeaderpage, hkPicUrlOfHeaderpageKey, hkPicUrlOfOwnpage, hkPicUrlOfOwnpageKey }))
      PublicValue.clear('selected')
      this.$router.push('/step3')
    },
    gotoRequire () {
      var self = this
      let { residenceNature, education, data, idCardPicUrlBKey, idCardPicUrlAKey, idCardPicUrlA, idCardPicUrlB, fundAccount, socialSecurityNumber, hkPicUrlOfHomepage, hkPicUrlOfHomepageKey, hkPicUrlOfHeaderpage, hkPicUrlOfHeaderpageKey, hkPicUrlOfOwnpage, hkPicUrlOfOwnpageKey } = self
      PublicValue.add('step2', JSON.stringify({ residenceNature, education, data, idCardPicUrlBKey, idCardPicUrlAKey, idCardPicUrlA, idCardPicUrlB, fundAccount, socialSecurityNumber, hkPicUrlOfHomepage, hkPicUrlOfHomepageKey, hkPicUrlOfHeaderpage, hkPicUrlOfHeaderpageKey, hkPicUrlOfOwnpage, hkPicUrlOfOwnpageKey }))
      PublicValue.clear('selected')
      this.$router.push('/require')
    },
    getCity () {
      var self = this
      ap.chooseCity({
        showLocatedCity: true
      }, function (res) {
        self.data.currentCity = {key: res.adCode, value: res.city}
      })
    },
    hideDialog () {
      $('.am-dialog-mask').toggleClass('show')
      $('.am-dialog').toggleClass('show')
    },
    clickFrontImageInput () {
      this.getPhoto({type: 1})
    },
    getPhoto (obj) {
      var self = this
      // 监控埋点
      _czc.push(['_trackEvent', '身份证上传', '点击上传'])
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
              var data = response
              if (fileType == 1) {
                ap.hideLoading()
                self.idCardPicUrlA = data.url
                self.idCardPicUrlAKey = data.key
                self.address = data.address
                if (data.idCard.toLowerCase() != JSON.parse(PublicValue.get('payment')).identity.toLowerCase() || data.name != JSON.parse(PublicValue.get('payment')).name) {
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
                      self.idCardPicUrlB = data.url
                      self.idCardPicUrlBKey = data.key
                    })
                  }).catch(function (error) {
                    check.toast(error)
                  })
                } else {
                  ap.hideLoading()
                  self.idCardPicUrlB = data.url
                  self.idCardPicUrlBKey = data.key
                }
              } else if (fileType == 3) {
                ap.hideLoading()
                self.hkPicUrlOfHomepage = data.url
                self.hkPicUrlOfHomepageKey = data.key
              } else if (fileType == 4) {
                ap.hideLoading()
                self.hkPicUrlOfHeaderpage = data.url
                self.hkPicUrlOfHeaderpageKey = data.key
              } else if (fileType == 5) {
                ap.hideLoading()
                self.hkPicUrlOfOwnpage = data.url
                self.hkPicUrlOfOwnpageKey = data.key
              }
            })
          }).catch(function (error) {
            check.toast(error)
          })
        }
      })
    },
    checkKeyup () {
      $('.am-list-clear').hide()
    },
    clear (obj) {
      if (obj.index == 1) {
        this.socialSecurityNumber = ''
      } else if (obj.index == 2) {
        this.fundAccount = ''
      }
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
  margin-top:20px;
  margin-bottom:20px;
}
.am-list{
  padding:0px;
}
.am-list-control.am-ft-right{
  font-size: 15px !important;
}
input[type="file"]{
  display: none;
}
</style>