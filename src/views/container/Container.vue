<script setup lang="ts">
// 开箱
import { ref } from 'vue'
import epicContainer from './hooks/PCL005_Epic'
import { getPrize, ShowPrize } from './hooks/rollPrize'
import ShowPrizeVue from './component/ShowPrizeVue.vue'

function roll () {
  let count = 0
  const random = Math.random() * 100
  // const random = 50
  for (const i in epicContainer.data.slots[0].commonRewards) {
    for (const item of (epicContainer.data.slots[0].commonRewards as any)[i].rewards) {
      count += item.probabilityDisplayed
      if (count > random) {
        return getPrize(item)
      }
    }
  }
  for (const i in epicContainer.data.slots[0].valuableRewards) {
    count += (epicContainer.data.slots[0].valuableRewards as any)[i].probabilityDisplayed
    if (count > random) {
      return getPrize((epicContainer.data.slots[0].valuableRewards as any)[i])
    }
  }
  return {
    type: '',
    imgSrc: '',
    text: ''
  }
}

// 用于显示
const showPrizeList = ref<ShowPrize[]>([])

// 开箱
function openContainer () {
  showPrizeList.value.push(roll())
}
// 清空
function clear () {
  showPrizeList.value = []
}

</script>
<template>
  <div class="container">
    <div class="container-img">
      <div>
        <img style="width: 100%;" src="@/assets/container/0109_Supercontainer_CTokens_Container.png" />
      </div>
      <div style="text-align: center;">
        <el-button type="" @click="openContainer">开箱</el-button>
        <el-button style="margin-left:20px;" type="" @click="clear">清空</el-button>
      </div>
    </div>
    <div class="prize-div">
      <div class="prize-list">
        <ShowPrizeVue v-for="prize in showPrizeList" :key="prize.text" :show-prize="prize" class="show-prize" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="stylus">
.container{
  color white
  display flex
  justify-content center
  height 100%
  background-image: url('https://wows-static-production.gcdn.co/metashop/1dd97239/assets/images/main_bg.jpg')
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: cover;
}
.container-img{
  width 30%
}
.prize-div{
  width 400px
  display flex
  flex-direction column
  padding 20px 0

  .prize-list{
    padding 10 0px
    flex-grow 1
    height 0
    overflow auto
  }
}
.show-prize{
  padding 2px 0
}
</style>
