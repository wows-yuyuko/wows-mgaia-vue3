<script setup lang="ts">
import usePlayer from '@/store/player'
const player = usePlayer()
defineProps<{accountId: number}>()

const imgs = import.meta.glob('@/assets/avatar/*')
player.avatarMap = {}
for (const path in imgs) {
  imgs[path]().then(img => {
    console.log(img.default)
    const pathArry = (img.default as string).split('/')
    player.avatarMap[parseInt(pathArry[pathArry.length - 1].split('.')[0])] = img.default
  })
}

</script>
<template>
  <div v-if="player.avatarMap[accountId]" style="padding-right: 20px;">
    <img style="height: 50px;" :src="player.avatarMap[accountId]" />
  </div>
</template>
<style scoped lang="stylus"></style>
