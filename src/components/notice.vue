<template>
  <div class="am-agreement">
    <div class="am-agreement-content">
        <p>{{notice}}</p>
    </div>
  </div>
</template>

<script>
import { PublicValue } from '@/service'
export default {
  name: 'notice',
  data () {
    return {
      notice: PublicValue.params.notice
    }
  }
}
</script>

<style scoped>
p{
  min-height:95vh;
}
</style>