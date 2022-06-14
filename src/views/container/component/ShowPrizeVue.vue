<script setup lang="ts">
import { ShowPrize } from '../hooks/rollPrize'
defineProps<{showPrize: ShowPrize}>()
</script>
<template>
  <div v-if="showPrize.type === 'ship'" class="ship-prize effect-fc6">
    <div class="ship-img" :style="'background-image: url('+showPrize.nationImgSrc+');'">
      <img :src="showPrize.imgSrc" />
    </div>
    <div class="text">{{ showPrize.text }}</div>
    <div class="probability-displayed">{{ showPrize.probabilityDisplayed }}%</div>
  </div>
  <div v-else :class="{'other-prize':true, 'effect-fc6':['gold','wows_premium'].includes(showPrize.type),'effect-white':!['gold','wows_premium'].includes(showPrize.type) }">
    <img :src="showPrize.imgSrc" />
    <div
      class="text"
      :style="{color: ['gold','wows_premium'].includes(showPrize.type)?'':'white'}"
    >
      {{ showPrize.text }}
    </div>
    <div v-show="showPrize.probabilityDisplayed" class="probability-displayed">{{ showPrize.probabilityDisplayed }}%</div>
  </div>
</template>
<style scoped lang="stylus">
.effect-fc6{
  animation-name: example-fc6;
  animation-duration: 0.5s;
  // animation-iteration-count: 3;
}
@keyframes example-fc6 {
  0%   {background-color:#fc6;max-height:0px;}
  100% {background-color:#fc60;max-height:55px;}
}
.effect-white{
  animation-name: example-white;
  animation-duration: 0.5s;
  // animation-iteration-count: 3;
}
@keyframes example-white {
  0%   {background-color:white;max-height:0px;}
  100% {background-color:#fff0;max-height:55px;}
}
.probability-displayed{
  padding: 0 5px;
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
  overflow: hidden;
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
  overflow: hidden;
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
