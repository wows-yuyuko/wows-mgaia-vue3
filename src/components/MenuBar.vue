<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import wowsBaseStore from '@/stores/wowsBaseStore'
// 初始化一系列数据
const wowsBase = wowsBaseStore()
// 检查基础信息缓存
wowsBase.checkBaseInfoCache()

console.log('wowsBase.serverList', wowsBase.serverList)
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
    <div class="right-block" style="display: flex;align-items: center;">
      <!-- 服务器选择 -->
      <el-select style="width: 60px;" v-model="wowsBase.server" placeholder="服务器" size="small">
        <el-option
          v-for="serverItem in wowsBase.serverList"
          :key="serverItem.keu"
          :label="serverItem.value"
          :value="serverItem.keu"
        />
      </el-select>
      <!-- 系统设置 -->
      <el-dropdown size="small">
        <el-button size="small" :icon="Setting" circle />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="wowsBase.cleanCache()">清空缓存</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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

  .right-block{
    div{
      margin-left: 5px;
    }
  }
}
</style>
