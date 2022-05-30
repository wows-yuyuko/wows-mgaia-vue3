<script setup lang="ts">
import { ref } from 'vue'

defineProps<{accountId: number}>()

const imgs = import.meta.glob('@/assets/avatar/*')
const imgMap = ref<{[key:number]:string}>({})

for (const path in imgs) {
  imgs[path]().then(img => {
    console.log(img.default)
    const pathArry = (img.default as string).split('/')
    imgMap.value[parseInt(pathArry[pathArry.length - 1].split('.')[0])] = img.default
  })
}

</script>
<template>
  <div v-if="imgMap[accountId]" style="padding-right: 20px;">
    <img style="width: 50px;" :src="imgMap[accountId]" />
  </div>
</template>
<style scoped lang="stylus"></style>
