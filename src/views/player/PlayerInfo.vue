<script setup lang="ts">
// 玩家信息
import SearchPlayer from '@/components/searchPlayer/SearchPlayer.vue'
// 测试数据库
import db from '@/db/db'
const add = () => {
  console.log('add')
  // db.test.add({ data: [1, 2, 3], id: 'aaa' }).then(data => {
  //   console.log(data)
  // })
}
const del = () => {
  db.player.delete('558241106')
}
const put = () => {
  // db.test.put({ data: [1, 2, 3], id: 'aaa' }).then(data => {
  //   console.log(data)
  // })
}
const show = async () => {
  console.log('show')
  // db.test.get('aaa').then(test => {
  //   console.log(test)
  // })
  console.log(await db.accountHistory.toArray())
  console.log(await db.accountHistory.get('accountHistoryDB'))
}
</script>

<template>
  <div>
    <el-button @click="add">增</el-button>
    <el-button @click="del">删</el-button>
    <el-button @click="put">改</el-button>
    <el-button @click="show">查</el-button>
    <!-- 异步组件 -->
    <SearchPlayer/>
    玩家信息
  </div>
</template>

<style scoped lang="less">

</style>
