<script setup lang="ts">
import playerInfo from '@/stores/playerInfo'
const usePlayerInfo = playerInfo()
defineProps<{accountId: number}>()

const imgs = import.meta.glob('@/assets/avatar/*')
usePlayerInfo.avatarMap = {}
for (const path in imgs) {
  imgs[path]().then((img:any) => {
    const pathArry = (img.default as string).split('/')
    usePlayerInfo.avatarMap[parseInt(pathArry[pathArry.length - 1].split('.')[0])] = img.default
  })
}
</script>
<template>
  <div v-if="usePlayerInfo.avatarMap[accountId]" style="padding-right: 20px;">
    <img style="height: 50px;" :src="usePlayerInfo.avatarMap[accountId]" />
  </div>
</template>
<style scoped lang="stylus"></style>
