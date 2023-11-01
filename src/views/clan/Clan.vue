<script setup lang="ts">
import { ref, onMounted, nextTick, onActivated } from 'vue'
import { clanSearch, getClanInfo, getClanRoll } from '@/api/wows/wows'
import usePlayer from '@/store/player'

// 舰队页
const player = usePlayer()

const searchClanId = ref('')
const searchLoading = ref(false)
const clanOptions = ref<any>([])
const searchClanList = (tag: string) => {
  searchLoading.value = true
  clanSearch({ tag, server: player.server }).then((response) => {
    clanOptions.value = response.data
    searchLoading.value = false
  }).catch(() => {
    clanOptions.value = []
    searchLoading.value = false
  })
}

const clanInfo = ref<any>({})
const clanInfoLoading = ref(false)
// 获取舰队信息详情
const setClanInfo = () => {
  getClanInfo({ server: player.server, accountId: searchClanId.value }).then(response => {
    clanInfo.value = response.data
    clanInfoLoading.value = false
  }).catch(() => {
    clanInfo.value = {}
    clanInfoLoading.value = false
  })
}

// 抽奖弹窗
const lotteryDrawShow = ref(false)
// 抽奖人数
const lotteryDrawNumber = ref(1)
const lotteryDrawList = ref([])
const lotteryDrawLoading = ref(false)
const lotteryDraw = () => {
  lotteryDrawLoading.value = true
  getClanRoll({ clanId: searchClanId.value, server: player.server, count: lotteryDrawNumber.value }).then(response => {
    lotteryDrawList.value = response.data.prize
    lotteryDrawLoading.value = false
  })
}

</script>

<template>
  <div class="main-content">
    <!-- 查询框 -->
    <div class="query-div">
      <div>
        <div class="lable">舰队TAG:</div>
        <div class="select">
          <el-select
            v-model="searchClanId"
            filterable
            remote
            placeholder="请输入关键词"
            :remote-method="searchClanList"
            :loading="searchLoading"
            v-loading="clanInfoLoading"
            @change="setClanInfo"
          >
            <el-option
              v-for="item in clanOptions"
              :key="item.clanId"
              :label="item.tag"
              :value="item.clanId"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div v-if="clanInfo.tag" class="clancard">
      <div class="title">
        <span :style="{color:clanInfo.colorRgb}">[{{ clanInfo.tag }}]</span>{{ clanInfo.name }}
      </div>
      <div style="    text-align: center; white-space: pre-wrap; ">
        {{ clanInfo.description }}
      </div>
      <div style="display: flex;justify-content: space-around;padding: 10px;">
        <div>活跃度：{{ clanInfo.userStatisticsInfo?.vitality }}%</div>
        <div>胜率：<span :style="{color:clanInfo.userStatisticsInfo.winsData.color}">{{ clanInfo.userStatisticsInfo?.winsPercentage }}%</span></div>
        <div>场均：<span :style="{color:clanInfo.userStatisticsInfo.damageData.color}">{{ clanInfo.userStatisticsInfo?.damagePerBattle }}</span></div>
      </div>
      <div style="display: flex;justify-content: space-around;padding-bottom: 20px;">
        <div>军团成员：{{ clanInfo.membersCount }}/{{ clanInfo.maxMembersCount }}</div>
        <div>人均入团：{{ clanInfo.userStatisticsInfo.avgTimeInTheGroup }}</div>
        <div>日均战斗：{{ clanInfo.userStatisticsInfo.avgDayBattleCount }}</div>
      </div>
      <div>
        <div v-for=" buildingInfo of clanInfo.buildingsInfos" :key="buildingInfo.buildingsId" style="    display: flex;padding: 5px 20px;    justify-content: center;">
          <divs style="width: 150px;">{{ buildingInfo.name.key }}  {{ buildingInfo.level }}/{{ buildingInfo.maxLevel }}</divs>
          <div style="width: 350px;">{{ buildingInfo.buff.cn }}  {{ buildingInfo.buff.buff }}</div>
        </div>
      </div>

      <div style="padding: 10px;text-align: center;">
        <el-button @click="lotteryDrawShow = true">舰队抽奖</el-button>
      </div>
    </div>
    <el-dialog
      v-model="lotteryDrawShow"
      title="舰队抽奖"
    >
      <div style="    padding-bottom: 10px;">[{{ clanInfo.tag }}]共{{ clanInfo.membersCount }}位成员</div>
      <div>抽奖人数: <el-input-number v-model="lotteryDrawNumber" :min="1" :max="clanInfo.membersCount" /> <el-button @click="lotteryDraw">开抽！</el-button></div>
      <el-table :data="lotteryDrawList" style="width: 100%" v-loading="lotteryDrawLoading">
        <el-table-column prop="nickName" label="名称" width="200px" />
        <el-table-column prop="accountId" label="accountId" />
      </el-table>
    </el-dialog>
  </div>
</template>

<style scoped lang="stylus">
.main-content {
  background-color: $global-v-page-background-color;
  background-color: white;
  min-height 100%
  position: relative;
}
.query-div{
  display flex
  position: relative;
  padding 20px
  // color white
  max-width: $global-v-div-max-width;
  margin: 0 auto;

  &>div{
    display flex
    align-items center
    padding-right 20px

    .lable{
      width 90px
      letter-spacing: 1px;
    }
    .select{
      width 300px
    }
  }
}

.clancard{
  width: 800px;
  background-color: #f4f4f4;
  margin: 0 auto;

  .title{
    text-align:center
    padding: 5px;
    font-weight: bold;
  }
}
</style>
