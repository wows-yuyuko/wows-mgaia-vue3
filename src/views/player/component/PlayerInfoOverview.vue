<script setup lang="ts">
defineProps<{pr: any, pvp:any, dwpDataVO:any}>()
</script>

<template>
  <div class="pr" :style="{background: pr?.color}">
    <span>{{ pr?.name }}</span>
    <span>{{ pr?.value }} <template v-if="dwpDataVO?.pr">({{ dwpDataVO?.pr }})</template></span>
    <span>下一级:{{ pr?.nextValue }}</span>
  </div>
  <div class="overview-1">
    <div>
      <div>
        <img src="@/assets/player/overview/battles.png">
      </div>
      <div class="title">场次</div>
      <div class="value">{{ pvp?.battles }}</div>
    </div>
    <div>
      <div>
        <img src="@/assets/player/overview/wins.png">
      </div>
      <div class="title">胜率</div>
      <div class="value">
        {{ pvp?.wins }}%
        <el-tooltip
          effect="dark"
          content="距离上次统计的变化"
          placement="bottom-start"
        >
          <sup v-if="dwpDataVO?.wins">({{ dwpDataVO?.wins }})</sup>
        </el-tooltip>
      </div>
      <div style="color: white;">KD: {{ pvp?.kd }}</div>
    </div>
    <div class="flag">
      <div>
        <img src="@/assets/player/overview/xp.png">
      </div>
      <div class="title">场均经验</div>
      <div class="value">{{ pvp?.xp }}</div>
    </div>
    <div>
      <div>
        <img src="@/assets/player/overview/hit.png">
      </div>
      <div class="title">命中</div>
      <div class="value">{{ pvp?.hit }}%</div>
    </div>
    <div>
      <div>
        <img src="@/assets/player/overview/damage.png">
      </div>
      <div class="title">场均</div>
      <div class="value">
        {{ pvp?.damage }}
        <el-tooltip
          effect="dark"
          content="距离上次统计的变化"
          placement="bottom-start"
        >
          <sup v-if="dwpDataVO?.damage">({{ dwpDataVO?.damage }})</sup>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<style scoped lang="stylus">
.pr{
  color white
  background #318000
  text-align center
  line-height 40px
  font-size: 20px;
  >span{
    padding 2px 10px
  }
}
.overview-1{
  display flex
  // justify-content center
  justify-content space-around
  background-image: url('@/assets/player/overview/light.png');
  background-repeat: no-repeat;
  background-position: center top;

  .flag{
    background: url('@/assets/player/overview/flag.png')
    background-position: center 0;
    background-repeat: no-repeat;
    background-size: 100%;
    padding-top: 30px;
  }
  >div{
    width 180px
    height 280px
    text-align: center;
    padding-top: 40px;

    .title{
      font-size: 18px;
      color: white;
      padding 10px 0
    }
    .value{
      font-size: 34px;
      font-weight: bold;
      color: white;

      >sup{
        font-size 14px
        font-weight: lighter;
      }
    }
  }
}

</style>
