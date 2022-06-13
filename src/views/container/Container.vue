<script setup lang="ts">
// 开箱
import { ref } from 'vue'
import epicContainer from './hooks/PCL005_Epic'
import santaBig from './hooks/PCL008_SantaBig'
import santaMedium from './hooks/PCL007_SantaMedium'
import santaSmall from './hooks/PCL006_SantaSmall'
import lodash from 'lodash'
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
  ship: 0, // 船
  // collection_album: 0, 收藏品
  savePoint: selectContainerMap[selectContainer.value].data.data.savePoint
})

// 是否已经氪穿
const emptyAllshow = ref(false)
function roll () {
  // 深拷贝后再使用，因为涉及到船池清空重新分配概率问题
  const containerMap = JSON.parse(JSON.stringify(selectContainerMap[selectContainer.value].data.data))
  // 先判定有没有空船池  有则概率分配给其他船池
  // 全部船池清空
  let emptyAll = true
  for (const key in containerMap.slots[0].valuableRewards) {
    for (const valueShip of containerMap.slots[0].valuableRewards[key].rewards) {
      if (!showPrizeList.value.find(prize => {
        return prize.text === valueShip.additionalData.title
      })) {
        emptyAll = false
      }
    }
  }
  emptyAllshow.value = emptyAll
  console.log('emptyAll', emptyAll)
  // 已经清空的船池概率累加
  let emptyProbability = 0
  // 未清空的船池概率累加
  let notEmptyProbability = 0
  if (!emptyAll) {
    // 如果船池没清空，概率分配给其他船池
    for (const key in containerMap.slots[0].valuableRewards) {
      let emptyType = true
      for (const valueShip of containerMap.slots[0].valuableRewards[key].rewards) {
        if (!showPrizeList.value.find(prize => {
          return prize.text === valueShip.additionalData.title
        })) {
          emptyType = false
        }
      }
      if (emptyType) {
        // 累加被清空的概率
        emptyProbability += containerMap.slots[0].valuableRewards[key].probabilityDisplayed
        containerMap.slots[0].valuableRewards[key].probabilityDisplayed = 0
      } else {
        // 累加未被清空的概率
        notEmptyProbability += containerMap.slots[0].valuableRewards[key].probabilityDisplayed
      }
    }
    // 再来一遍调整概率
    for (const key in containerMap.slots[0].valuableRewards) {
      if (containerMap.slots[0].valuableRewards[key].probabilityDisplayed > 0) {
        containerMap.slots[0].valuableRewards[key].probabilityDisplayed +=
          emptyProbability * (containerMap.slots[0].valuableRewards[key].probabilityDisplayed / notEmptyProbability)
      }
    }
  }
  // console.log('emptyProbability', emptyProbability)
  // console.log('notEmptyProbability', notEmptyProbability)

  if (count.value.savePoint === 0) {
    // 保底归零触发保底
    let shipRewards = 0
    for (const i in containerMap.slots[0].valuableRewards) {
      shipRewards += (containerMap.slots[0].valuableRewards as any)[i].probabilityDisplayed
    }
    const random = Math.random() * shipRewards
    let countRewards = 0
    for (const i in containerMap.slots[0].valuableRewards) {
      countRewards += (containerMap.slots[0].valuableRewards as any)[i].probabilityDisplayed
      if (countRewards > random) {
        count.value.savePoint = containerMap.savePoint
        return getPrize((containerMap.slots[0].valuableRewards as any)[i], showPrizeList.value, emptyAll)
      }
    }
  }
  count.value.savePoint--
  let countRewards = 0
  const random = Math.random() * 100
  // const random = 90 + Math.random() * 10
  for (const i in containerMap.slots[0].commonRewards) {
    for (const item of (containerMap.slots[0].commonRewards as any)[i].rewards) {
      countRewards += item.probabilityDisplayed
      if (countRewards > random) {
        return getPrize(item, showPrizeList.value, emptyAll)
      }
    }
  }
  for (const i in containerMap.slots[0].valuableRewards) {
    countRewards += (containerMap.slots[0].valuableRewards as any)[i].probabilityDisplayed
    if (countRewards > random) {
      count.value.savePoint = containerMap.savePoint
      return getPrize((containerMap.slots[0].valuableRewards as any)[i], showPrizeList.value, emptyAll)
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

// 开几次
const times = ref(1)
// 开箱
function openContainer (num:number|null = null) {
  const rollTimes = lodash.isNil(num) ? times.value : num
  for (let i = 0; i < rollTimes; i++) {
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
}
// 一键氪穿
function boom () {
  emptyAllshow.value = false
  // eslint-disable-next-line no-unmodified-loop-condition
  while (!emptyAllshow.value) {
    openContainer(1)
  }
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
    ship: 0, // 船
    // collection_album: 0, 收藏品
    savePoint: selectContainerMap[selectContainer.value].data.data.savePoint
  }
}
// 切换重制保底
function containerChange () {
  count.value.savePoint = selectContainerMap[selectContainer.value].data.data.savePoint
}
</script>
<template>
  <div class="container">
    <div class="container-img">
      <div style="padding-top: 20px;">
        <el-select
          v-model="selectContainer"
          placeholder="选择箱子种类"
          @change="containerChange"
        >
          <el-option
            v-for="item in selectContainerMap"
            :key="item.value+count.number"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
        <span style="color: #a3a3a3;padding-left: 20px;">
          (圣诞箱子图之后再找找 不要在意细节)
        </span>
      </div>
      <div>
        <img v-show="selectContainer === 'epicContainer'" style="width: 100%;" src="@/assets/container/0109_Supercontainer_CTokens_Container.png" />
        <img v-show="selectContainer !== 'epicContainer'" style="width: 100%;margin: 10px 0;" src="@/assets/container/santa.jpg" />
      </div>
      <div style="text-align: center;">
        <el-input-number v-model="times" :min="1" :max="200" />
        <el-button type="" style="margin-left:20px;" @click="openContainer()">开箱</el-button>
        <el-button type="" style="margin-left:20px;" @click="boom">氪穿</el-button>
        <el-button style="margin-left:20px;" type="" @click="clear">清空</el-button>
      </div>
      <div style="padding: 10px;color: #df4c45;font-size: 13px;">一键氪穿 用于估算多少箱清空船库，根据箱子概率可能会需要运算很久，且对浏览器性能有要求</div>
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
      <div>保底剩余: {{ count.savePoint }} 次</div>
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
