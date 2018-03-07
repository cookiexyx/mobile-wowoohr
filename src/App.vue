<template>
	<div id="app">
		<router-view></router-view>
		<!-- <div>由 仁励窝网络科技（上海）有限公司 提供服务</div> -->
	</div>
</template>

<script>
import $ from 'n-zepto'
import { cFetch, API_CONFIG, Sign } from '@/service'
export default {
  name: 'app',
  data () {
    return {

    }
  },
  created () {
    var self = this
    if (window.location.href.indexOf('letter') <= 0 && window.location.href.indexOf('upgrade') <= 0) {
      cFetch(API_CONFIG.getCinfoHelpUrl.api, {
        method: 'POST',
        body: JSON.stringify(Sign({
        }, API_CONFIG.getCinfoHelpUrl.projectName))
      }).then(response => {
        self.data = response
        API_CONFIG.helpUrl2 = self.data
      })
    }
  }
}

$('body').on('click', 'input', function () {
  $('.am-list-clear').hide()
  $(this).parent().next().show()
})
</script>


<style>
@import './style.css';
@import './antui/antui.min.css';
@import './animate.css';
#app{
	display: block !important;
}
.white-bg{
	background:#ffffff;
	height:60px;
	padding-top: 20px;
}
.am-list .am-list-arrow{
	padding:0px;
}
.horizental-line{
	width:64px;
	height:1px;
	margin-top: 15px;
	margin-left: -1px;
	margin-right: -1px;
}
.horizental-line.blue{
	border-top:2px solid #108ee9;
}
.horizental-line.lightgray{
	border-top:2px solid #cccccc;
}
.horizental-icon{
	position: relative;
	font-size: 20px;
	margin-top: 3px;
}
.progress-horizental{
	justify-content:center;
    display:flex;
}
.progress-text{
	position: absolute;
	width: 70px;
}
.progress-text.first{
	left: -19px;
}
.progress-text.second{
	left: -18px;
}
.progress-text.last{
	left: -18px;
}
.icon-hint-01{
	font-size: .24rem;
}
.am-dialog-body .fn-left{
	width: 50%;
	text-align: left;
}
.am-list .am-list-item-error{
	background: -webkit-linear-gradient(-90deg,#fff,#fff) top left no-repeat,-webkit-linear-gradient(90deg,#fff,#fff) bottom left no-repeat,-webkit-linear-gradient(-90deg,#ddd,#ddd 33%,transparent 33%) top left no-repeat,-webkit-linear-gradient(90deg,#ddd,#ddd 33%,transparent 33%) bottom left no-repeat,#fff;
    background: linear-gradient(180deg,#fff,#fff) top left no-repeat,linear-gradient(0deg,#fff,#fff) bottom left no-repeat,linear-gradient(180deg,#ddd,#ddd 33%,transparent 33%) top left no-repeat,linear-gradient(0deg,#ddd,#ddd 33%,transparent 33%) bottom left no-repeat,#fff;
    -webkit-background-size: .15rem 1px,.15rem 1px,100% 0,100% 1px;
    background-size: .15rem 1px,.15rem 1px,100% 0,100% 1px;
}
.am-list-item-error .icon-hint-16{
	color: red;
}
.am-toast{
	display: none;
}
select:required:invalid {
	color: #bbbbbb;
}
option[value=""][disabled] {
	display: none;
}
option {
	color: black;
}
.icon-hint-02{
	color: #108ee9;
	font-size: 35px;
}
.icon-hint-03{
	color: #3cc8b1;
	font-size: 35px;
}
.icon-hint-04{
	color: #F6A623;
	font-size: 35px;
}
.split{
	margin-top: 20px;
	border-top:1px solid #e1e1e1;
	width:100%;
	height:1px;
}
.am-process .am-icon.process.success{
	background-image:url('assets/hint09.png');
}
.am-process .am-icon.process.unpay{
	background-image:url('assets/hint10.png');
}
.am-process .am-process-item .am-icon.process, .am-process .am-process-item .am-icon.process-inpage{
  top:.2rem;
}
.am-process .am-process-item{
    padding-top: .2rem;
}
.am-process{
	min-height: 1.1rem;
	/*padding: .15rem;*/
}
.am-process .am-icon.process.fail{
	background-image:url('assets/hint08.png');
}
.am-process-item.fail .am-process-main{
	color:#f4333c !important;
}
.am-dialog-mask{
	position: fixed;
}
.am-list-clear{
	display: none;
}
.am-icon.am-icon-clear:before{
	background-size: .17rem auto;
	-webkit-background-size: .17rem auto;
}
.am-icon-clear{
	visibility: visible !important;
}
.am-list .am-list-item.half{
	-webkit-background-size: .15rem 1px,1rem 1px,100% 0,100% 1px;
	background-size: .15rem 1px,1rem 1px,100% 0,100% 1px;
}
.am-toast .am-icon.toast.loading:before {
    background-image: url(assets/loading.png);
}
.am-dialog-mask.transparent-mask{
	background-color: transparent !important;
}
.am-process .am-process-item .am-icon.process, .am-process .am-process-item .am-icon.process-inpage{
	height: .19rem;
	width: .19rem;
}
.am-process .am-process-item .am-process-down-border, .am-process .am-process-item .am-process-up-border{
	left: .085rem;
}
.am-process .am-process-item .am-process-down-border{
	top: .2rem;
}
.am-process .am-process-item .am-process-content{
	margin-left: .31rem;
}
.am-process .am-process-item .am-process-content .am-process-main{
	line-height: .2rem;
}
.am-process .am-process-item .am-process-content .am-process-brief{
	margin-top: -4px;
	width: 70%;
}
</style>
