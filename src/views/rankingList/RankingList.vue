<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import basicInfo from '@/stores/basicInfo'
import { getRankShipList } from '@/api/wowsV3/wowsBase'
import type { RankShipPlayer } from '@/types/wowsBaseType'
import { ref } from 'vue'
import router from '@/router'
import playerInfo from '@/stores/playerInfo'

// 排行榜
const usePlayerInfo = playerInfo()
const useBasicInfo = basicInfo()
const shipId = ref(4276041424)
const rankShipPlayerList = ref<RankShipPlayer[]>([])
const searchLoading = ref(false)
// 查询排行榜
const searchRank = () => {
  searchLoading.value = true
  getRankShipList({ shipId: shipId.value, type: 0, page: 1, desc: true }).then(response => {
    rankShipPlayerList.value = response
    searchLoading.value = false
  }).catch(err => {
    console.log(err)
    rankShipPlayerList.value = []
    searchLoading.value = false
  })
}

// 跳转到用户详情战绩
function goPlayer (accountId: number) {
  usePlayerInfo.searchPlayerInfo(accountId, 'cn')
  router.push('/player')
}
</script>

<template>
  <div class="rank-list">
    <div style="display: flex;flex-direction: column;height: 100%;">
      <div style="padding: 20px;">
        <div style="display: flex;align-items: center;">
          <el-select v-model="shipId" filterable placeholder="请选择">
            <el-option
              v-for="item in useBasicInfo.shipInfoMap"
              :key="item.shipId"
              :label="item.nameCn"
              :value="item.shipId">
            </el-option>
          </el-select>
          <el-button :loading="searchLoading" :icon="Search" style="margin-left: 20px;" @click="searchRank">查询排行榜</el-button>
        </div>
      </div>
      <div style="flex-grow: 1;height: 0;padding: 0 20px 20px 20px;">
        <el-table v-loading="searchLoading" :data="rankShipPlayerList" style="width: 100%;height: 100%;" row-key="accountId">
          <el-table-column align="right"  width="60" prop="sortIndex" label="排名" />
          <el-table-column align="left" width="300" prop="userInfo.userName" label="名称" >
            <template #default="scope">
              <div>
                <span v-if="scope.row.userInfo.clanInfo.tag!==''" :style="{color: scope.row.userInfo.clanInfo.color}">[{{ scope.row.userInfo.clanInfo.tag }}]</span>
                <el-button type="text" @click="goPlayer(scope.row.accountId)">{{ scope.row.userInfo.userName }}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="shipId" label="舰船" >
            <template #default="scope">
              <div>{{ useBasicInfo.shipInfoMap[scope.row.shipId].nameCn }}</div>
            </template>
          </el-table-column>
          <el-table-column align="right"  width="100" prop="battle" label="场次" />
          <el-table-column align="center" width="140" prop="pr.value" label="PR" >
            <template #default="scope">
              <div :style="{color: scope.row.pr.color}">{{ scope.row.pr.name }}({{ scope.row.pr.value }})</div>
            </template>
          </el-table-column>
          <el-table-column align="right"  width="100" prop="wins" label="胜率" >
            <template #default="scope">
              <div :style="{color: scope.row.winsColor.color}">{{ scope.row.wins }}%</div>
            </template>
          </el-table-column>
          <el-table-column align="right"  width="100" prop="damage" label="伤害" >
            <template #default="scope">
              <!-- <div :style="{color: scope.row.damageColor.color}">{{ scope.row.damage }}</div> -->
              <div>{{ scope.row.damage }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" width="140" prop="xp" label="经验" />
          <el-table-column align="right"  width="100" prop="hit" label="命中率" >
            <template #default="scope">
              <div >{{ scope.row.hit }}%</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rank-list{
  height: 100%;
  width: 100%;
}
</style>
