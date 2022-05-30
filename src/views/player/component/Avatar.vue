<script setup lang="ts">
import { ref } from 'vue'
import a575700182 from '@/assets/avatar/575700182.gif'
import a540042242 from '@/assets/avatar/540042242.gif'
import a558241106 from '@/assets/avatar/558241106.png'
import a2022515210 from '@/assets/avatar/2022515210.jpg'
import a557740389 from '@/assets/avatar/557740389.gif'

defineProps<{accountId: number}>()
const imgMap = ref<{[key:number]:string}>({
  575700182: a575700182,
  540042242: a540042242,
  558241106: a558241106,
  2022515210: a2022515210,
  557740389: a557740389,
  558145708: a557740389
})
</script>
<template>
  <div v-if="imgMap[accountId]" style="padding-right: 20px;">
    <img style="width: 50px;" :src="imgMap[accountId]" />
  </div>
</template>
<style scoped lang="stylus"></style>
