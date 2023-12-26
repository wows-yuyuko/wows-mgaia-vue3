<script setup lang="ts">
import { getClanListByTag, getClanInfoById } from '@/api/wowsV3/wowsPlayer'
import { ref, computed } from 'vue'
import basicInfo from '@/stores/basicInfo'
// 舰队信息页
const useBasicInfo = basicInfo()
const clanId = ref()
const searchClanLoading = ref(false)
const clanOptions = ref<{clanId:number, tag:string}[]>([])
// 查询舰队列表
const searchClanList = (search: string) => {
  if (search === '') return
  searchClanLoading.value = true
  getClanListByTag({ server: useBasicInfo.useServerValue, tag: search }).then((response) => {
    console.log(response)
    clanOptions.value = response
    searchClanLoading.value = false
  }).catch(() => {
    searchClanLoading.value = false
  })
}

// 获取舰队具体信息
const getClanInfo = () => {
  if (!clanId.value) return
  getClanInfoById({ server: useBasicInfo.useServerValue, accountId: clanId.value }).then((response) => {
    console.log(response)
  })
}

</script>

<template>
  <div>
    <div
      style="
      text-align: center;
      padding-top: 20px;
    ">
      <el-select
        v-model="clanId"
        filterable
        remote
        reserve-keyword
        placeholder="输入舰队tag"
        :remote-method="searchClanList"
        :loading="searchClanLoading"
        @change = getClanInfo
      >
        <el-option
          v-for="item in clanOptions"
          :key="item.clanId"
          :label="item.tag"
          :value="item.clanId"
        />
      </el-select>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
