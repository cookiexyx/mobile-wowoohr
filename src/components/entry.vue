<template>
	<div class="htmlBj">
		<div class="entry-box">
			<div class="image-box">
				<img src="../assets/entry_01.png" alt="">
			</div>
			<button v-tap="{methods:goNew, type:1}">新开用户</button>
			<p>从未在{{city}}缴纳过{{productType}}的用户点此进入</p>
		</div>
		<img class="entry-line" src="../assets/entry_line.png" alt="">
		<div class="entry-box">
			<div class="image-box">
				<img src="../assets/entry_02.png" alt="">
			</div>
			<button v-tap="{methods:goNew, type:2}">续保用户</button>
			<p>在{{city}}缴纳过{{productType}}的用户点此进入</p>
		</div>
	</div>
</template>

<script>
import { PublicValue } from '@/service'
export default {
  data () {
    return {
      city: PublicValue.get('cityEntry'),
      productType: PublicValue.get('typeEntry')
    }
  },
  methods: {
    goNew (obj) {
      var self = this
      PublicValue.add('socialType', obj.type)
      if (PublicValue.params.alipayAccountId) {
        self.$router.push('/done')
      } else {
        self.$router.push('/index')
      }
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
	text-align: center;
	padding-top: 0.2rem;
  }
  .entry-box{
	  padding-top: 0.6rem;
	  margin-bottom: 0.6rem;
  }
  .entry-box .image-box{
	width: 60%;
	height: 0.7rem;
	margin: 0 20% 25px;
  }
  .entry-box .image-box img{
	  width: 100%;
	  height: 100%;
  }
  .entry-box button{
    background:#108ee9;
	box-shadow:0 0 6px 0 #219ae9;
	border-radius:100px;
	border: none;
	width:1.2rem;
	height:0.4rem;
	color: #fff;
	margin-bottom: 12px;
  }
  .entry-line{
	  width: 60%;
  }

</style>

