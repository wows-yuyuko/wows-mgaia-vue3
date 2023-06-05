<script setup lang="ts">
import { ChatLineSquare } from '@element-plus/icons-vue'
</script>
<template>
  <div class="menu-bar">
    <div class="home-header-logo"></div>
    <div style="flex-grow: 1;padding-left: 10px;">
      <!-- --el-menu-item-height -->
      <el-menu
        mode="horizontal"
        background-color="#333333"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">玩家</el-menu-item>
        <el-menu-item index="2">服务器</el-menu-item>
        <el-menu-item index="3">舰队</el-menu-item>
      </el-menu>
    </div>
    <div>
      <el-button :icon="ChatLineSquare" circle />
    </div>
  </div>
</template>

<style scoped lang="less">
.menu-bar{
  --el-menu-item-height: 42px;
  .el-menu--horizontal{
    border-bottom: none;
  }
  background-color: #333333;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  .home-header-logo {
    position: relative;
    width: 230px;
    min-width: 230px;
    height: 44px;
    background-image: url('@/assets/logo/home_logo_1.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
}
</style>
