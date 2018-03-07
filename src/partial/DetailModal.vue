<template>
  <div class="detail-modal">
    <div class="am-dialog-mask" v-bind:class="{ show: ifShow }"></div>
    <div class="am-dialog" v-bind:class="{ show: ifShow }" role="dialog" aria-hidden="false">
      <div class="am-dialog-wrap" role="document">
        <div class="am-dialog-header">
          <h3>费用详情</h3>
        </div>
        <div class="am-dialog-body">
          <div v-for="(item,index) in Details">
            <div class="am-ft-left">
              {{item.title}}
            </div>
            <div class="fn-clear am-ft-gray">
              <div class="fn-left am-ft-12" v-for="list in item.lists" style="margin-top:5px;">
                {{list.name}}：{{list.value}}
              </div>
            </div>
            <div class="am-whitespace ws20px" v-if="Details.length>0&&index != Details.length-1"></div>     
          </div>
               
        </div>
        <div class="am-dialog-footer">
          <button type="button" class="am-dialog-button" v-tap="{methods:closeModal}">我知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailModal',
  props: ['Details', 'ifShow', 'closeModal']
}
</script>
