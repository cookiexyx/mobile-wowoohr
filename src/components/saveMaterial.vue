<template>
  <div class="done">
    <div class="am-list am-list-form" style="padding-top:0px;">      
      <div class="white-bg">
        <img src="../assets/progress2.png"/>
        <div class="am-whitespace ws15px"></div>
        <div class="am-ft-black am-ft-sm">你已经成功提交参保材料</div>
      </div>
    </div>
    <div class="am-whitespace ws15px"></div>
    <div class="am-wingblank wb15px">
      <button type="button" class="am-button" v-tap="{methods:next}">完成</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'saveMaterial',
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
    next () {
      this.$router.push('/done')
    }
  }

}
</script>

<style scoped>
.white-bg img{
  width: 30%;
}
.white-bg{
  text-align: center;
  height: 1.9rem;
}


</style>