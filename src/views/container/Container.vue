<script setup lang="ts">
// 开箱
import { ref } from 'vue'
import epicContainer from './hooks/PCL005_Epic'
import santaBig from './hooks/PCL008_SantaBig'
import santaMedium from './hooks/PCL007_SantaMedium'
import santaSmall from './hooks/PCL006_SantaSmall'

import { getPrize, ShowPrize } from './hooks/rollPrize'
import ShowPrizeVue from './component/ShowPrizeVue.vue'
const selectContainerMap:any = {
  epicContainer: {
    name: '超级补给箱',
    value: 'epicContainer',
    data: epicContainer
  },
  santaBig: {
    name: '圣诞大箱子',
    value: 'santaBig',
    data: santaBig
  },
  santaMedium: {
    name: '圣诞中箱子',
    value: 'santaMedium',
    data: santaMedium
  },
  santaSmall: {
    name: '圣诞小箱子',
    value: 'santaSmall',
    data: santaSmall
  }
}
const selectContainer = ref('epicContainer')

const count = ref({
  number: 0,
  wowsPremium: 0, // 高级账号
  gold: 0, // 金币
  signal: 0, // 旗子
  camouflage: 0, // 涂装
  coal: 0, // 煤炭
  free_xp: 0, // 全局经验
  steel: 0, // 钢铁
  ship: 0 // 船
// collection_album: 0, 收藏品
})

function roll () {
  let count = 0
  const random = Math.random() * 100
  // const random = 99
  for (const i in selectContainerMap[selectContainer.value].data.data.slots[0].commonRewards) {
    for (const item of (selectContainerMap[selectContainer.value].data.data.slots[0].commonRewards as any)[i].rewards) {
      count += item.probabilityDisplayed
      if (count > random) {
        return getPrize(item, showPrizeList.value)
      }
    }
  }
  for (const i in selectContainerMap[selectContainer.value].data.data.slots[0].valuableRewards) {
    count += (selectContainerMap[selectContainer.value].data.data.slots[0].valuableRewards as any)[i].probabilityDisplayed
    if (count > random) {
      return getPrize((selectContainerMap[selectContainer.value].data.data.slots[0].valuableRewards as any)[i], showPrizeList.value)
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
  const prize = roll()
  if (prize.type === 'wows_premium') {
    count.value.wowsPremium++
  } else if (prize.type === 'gold') {
    count.value.gold++
  } else if (prize.type === 'signal') {
    count.value.signal++
  } else if (prize.type === 'camouflage') {
    count.value.camouflage++
  } else if (prize.type === 'coal') {
    count.value.coal++
  } else if (prize.type === 'free_xp') {
    count.value.free_xp++
  } else if (prize.type === 'steel') {
    count.value.steel++
  } else if (prize.type === 'ship') {
    count.value.ship++
  }
  count.value.number++
  showPrizeList.value.unshift(prize)
}
// 清空
function clear () {
  showPrizeList.value = []
  count.value = {
    number: 0,
    wowsPremium: 0, // 高级账号
    gold: 0, // 金币
    signal: 0, // 旗子
    camouflage: 0, // 涂装
    coal: 0, // 煤炭
    free_xp: 0, // 全局经验
    steel: 0, // 钢铁
    ship: 0 // 船
    // collection_album: 0, 收藏品
  }
}
</script>
<template>
  <div class="container">
    <div class="container-img">
      <div style="padding-top: 20px;">
        <el-select v-model="selectContainer" placeholder="选择箱子种类">
          <el-option
            v-for="item in selectContainerMap"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
        <span style="color: #a3a3a3;padding-left: 20px;">
          (圣诞箱子图之后再找找 不要在意细节)
        </span>
      </div>
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
    <div class="count-div">
      <div>总计: {{ count.number }} 次</div>
      <div>高级账号: {{ count.wowsPremium }} 次</div>
      <div>金币: {{ count.gold }} 次</div>
      <div>旗子: {{ count.signal }} 次</div>
      <div>涂装: {{ count.camouflage }} 次</div>
      <div>煤炭: {{ count.coal }} 次</div>
      <div>全局经验: {{ count.free_xp }} 次</div>
      <div>钢铁: {{ count.steel }} 次</div>
      <div>船: {{ count.ship }} 次</div>
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
.count-div{
  padding 20px
  div{
    padding 3px 0
  }
}
</style>
