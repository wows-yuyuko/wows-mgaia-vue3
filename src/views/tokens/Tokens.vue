<script setup lang="ts">
import { ref, computed } from 'vue'
// 代币兑换计算
const data = ref([
  {
    name: '贝亚德',
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_Bayard_Eventum_3_Ship_medium.36c6f81f178e82478bf5eb55c83dc794.png',
    num: 6250,
    max: 1,
    count: 0
  },
  {
    name: '指挥官优惠券',
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_BD_50_Eventum_3_Token_medium.0269eb9789f67629bd60f6fa56c32e41.png',
    num: 3125,
    max: 1,
    count: 0
  },
  {
    name: '齐滕：穿越维度 永久涂装',
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_Zieten_Delorean_Eventum_3_Skin_medium.2a7f56d9a3cd565ca6135e4316f4d44a.png',
    num: 1250,
    max: 1,
    count: 0
  },
  {
    name: '复古浪潮 补给箱',
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_BDay8_skin_Eventum_3_Container_medium.fd2f24e8862fc90934bfc3092f44e916.png',
    num: 500,
    max: 7,
    count: 0
  },
  {
    name: '平行世界 补丁',
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_PCNB408_Eventum_3_Patch_medium.6ee9e6134098c821a956ec8b50f75725.png',
    num: 100,
    max: 1,
    count: 0
  },
  {
    name: '超级补给箱',
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_Supercontainer_Eventum_3_medium.ad325cb23f6f62603b5a8f21fccf5eea.png',
    num: 200,
    max: 110,
    count: 0
  },
  {
    name: `活力派对

4个物品
礼包内容
“银币+160%”：1
“全局经验+2400%”：1
还有2个物品`,
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_1xEcoBoost_3_Eventum_3_medium.12aea4043877a95a3142c05a7407cdb9.png',
    num: 125,
    max: 100,
    count: 0
  },
  {
    name: `异界宝藏

4个物品
礼包内容
“银币+40%”：1
“战舰经验+200%”：1
还有2个物品`,
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_1xEcoBoost_2_Eventum_3_medium.20f9ac4007c6e2b08a81424e867b0a97.png',
    num: 24,
    max: 150,
    count: 0
  },
  {
    name: `历代指挥官的补给

4个物品
礼包内容
“银币+40%”：1
“战舰经验+200%”：1
还有2个物品`,
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_1xEcoBoost_2_Eventum_3_medium.20f9ac4007c6e2b08a81424e867b0a97.png',
    num: 72,
    max: 100,
    count: 0
  },
  {
    name: `未来储备

4个物品
礼包内容
“银币+20%”：1
“战舰经验+100%”：1
还有2个物品`,
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_1xEcoBoost_1_Eventum_3_medium.fa8ecbd6c6248b6a78d2997f8184f5de.png',
    num: 12,
    max: -1,
    count: 0
  },
  {
    name: `复古浪潮信号旗

7个物品
礼包内容
India Delta信号旗x1
India Yankee信号旗x1
还有5个物品`,
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_India_Delta_Eventum_3_Signals_medium.e4e8ee585ec8a89511583d1aa9871d26.png',
    num: 50,
    max: 50,
    count: 0
  },
  {
    name: `逐浪而行
  
7个物品
礼包内容
Sierra Bravo信号旗x1
X-Ray Papa Unaone信号旗x1
还有5个物品`,
    src: 'https://wows-ops-media.wgcdn.co/armory/images/128_Sierra_Bravo_Eventum_3_Signals_medium.4f1ac5bb41b958d1f6cee1d70165a460.png',
    num: 50,
    max: 50,
    count: 0
  }
])

const count = computed(() => {
  let num = 0
  for (const item of data.value) {
    num += item.count * item.num
  }
  return num
})
</script>
<template>
  <div class="main-content">
    <div style="
    color: wheat;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
    justify-content: center;
    top: 60px;
    z-index: 10;
    height: 60px;
    background: #1a141f;
">兑换需要 {{ count }} <img src="https://wows-gloss-icons.wgcdn.co/icons/currencies/icon_eventum_3_b3f7dc6e360627db790066cdbcb5f28d1e00794865570a3c06d586c82bd0bf88.png" /></div>
    <div style="width:900;display: flex;flex-flow: wrap;justify-content: center; padding-top: 80px;    max-width: 1600px;    margin: 0 auto;">
      <div class="card" v-for="item of data" :key="item.name">
        <img :src="item.src" />
        <div style="top:40px;left:40px; white-space: pre-wrap; ">{{ item.name }}</div>
        <div v-if="item.max > 0" style="bottom: 70px; left:40px;font-size:16px">您还可获得 {{ item.max > 0? (item.max-item.count) : -1}}</div>
        <div style="bottom: 70px; right:40px;font-size:16px;    display: flex;align-items: center;">{{ item.num }}<img src="https://wows-gloss-icons.wgcdn.co/icons/currencies/icon_eventum_3_b3f7dc6e360627db790066cdbcb5f28d1e00794865570a3c06d586c82bd0bf88.png" /></div>
        <el-input-number size="small" style="bottom: 30px;left: 40px;" v-model="item.count" :min="0" :max="item.max>0?item.max:undefined" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="stylus">
.main-content {
  background-image: url("https://wows-ops-media.wgcdn.co/armory/images/128_BD_category.6b44ceb55d95fcf1fd7118b557d742f5.webp");
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: white;
  min-height 100%
  position: relative;
}
.card{
  padding: 10px
  position: relative;
  div{
    position: absolute;
    color: white;
    font-weight: bold;
    font-size:20px
  }
}
</style>
