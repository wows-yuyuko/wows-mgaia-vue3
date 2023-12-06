<script setup lang="ts">
// 排行榜
const a = () => {
  console.log('scrollTop', document.querySelector('.external')?.scrollTop)
  console.log('external.clientHeight', document.querySelector('.external')?.clientHeight)
  console.log('internal.clientHeight', document.querySelector('.internal')?.clientHeight)
}
</script>

<template>
  <div class="rank-list">
    <div class="external">
      <div class="internal"></div>
    </div>
    <el-button @click="a">输出</el-button>
  </div>
</template>

<style scoped lang="scss">
.external{
  height: 500px;
  width: 200px;
  background-color: red;
  overflow-y: auto;
  .internal{
    height: 1600px;
  }
}
.external::-webkit-scrollbar {
  width: 45px;
  height: 18px;
  background-color: #aaa; /* or add it to the track */
}
</style>
