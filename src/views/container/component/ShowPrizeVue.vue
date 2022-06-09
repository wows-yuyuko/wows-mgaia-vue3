<script setup lang="ts">
import { ShowPrize } from '../hooks/rollPrize'
defineProps<{showPrize: ShowPrize}>()
</script>
<template>
  <div v-if="showPrize.type === 'ship'" class="ship-prize">
    <div class="ship-img" :style="'background-image: url('+showPrize.nationImgSrc+');'">
      <img :src="showPrize.imgSrc" />
    </div>
    <div class="text">{{ showPrize.text }}</div>
    <div class="probability-displayed">{{ showPrize.probabilityDisplayed }}%</div>
  </div>
  <div v-else class="other-prize">
    <img :src="showPrize.imgSrc" />
    <div
      class="text"
      :style="{color: ['gold','wows_premium'].includes(showPrize.type)?'':'white'}"
    >
      {{ showPrize.text }}
    </div>
    <div class="probability-displayed">{{ showPrize.probabilityDisplayed }}%</div>
  </div>
</template>
<style scoped lang="stylus">
.probability-displayed{
  padding: 2px 5px;
  background: hsla(0,0%,100%,.15);
  text-align: center;
  border-radius: 4px;
  font-weight: 400;
  color: hsla(0,0%,100%,.75);
  font-size: 16px;
  display: inline;
  position: relative;
  // top: -2px;
  vertical-align: top;
  margin-left: 5px;
}
.ship-prize{
  display flex
  align-items center
  .ship-img{
    background-position: center 0;
    background-repeat: no-repeat;
    background-size: cover;
    width 80px
    img{
      width 100%
    }
  }
  .text{
    color: #fc6;
    font-weight: 700;
    white-space: nowrap;
    padding-left 10px
  }
}
.other-prize{
  display flex
  align-items center
  img{
    width 30px
  }
  .text{
    color: #fc6;
    font-weight: 700;
    white-space: nowrap;
  }
}
</style>
