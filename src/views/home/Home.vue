<script setup lang="ts">
import { ChatLineSquare } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import usePlayer from '@/store/player'
import useElectron from '@/store/electron'
const route = useRoute()
const player = usePlayer()
const electronStore = useElectron()
const issues = () => {
  window.open('https://gitee.com/missile_xuan/wows-mgaia-vue3')
}

</script>

<template>
  <el-container style="height: 100%;">
    <el-header>
      <!-- 左侧logo -->
      <div class="home-header">
        <div class="home-header-logo"></div>
        <div style="width:800px;padding-left: 20px;">
          <el-menu
            :default-active="route.path"
            mode="horizontal"
            background-color="#ffffff00"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-menu-item v-if="electronStore.electronEnable" index="/realRimeResults">实时对战</el-menu-item>
            <el-menu-item index="/player">玩家</el-menu-item>
            <el-menu-item index="/ships">舰船</el-menu-item>
            <el-menu-item index="/serverShips">服务器平均数据</el-menu-item>
            <el-menu-item index="/serverShipsAvgEchart">服务器日均图表</el-menu-item>
            <el-menu-item index="/container">开箱</el-menu-item>
            <!-- <el-menu-item index="clan">舰队</el-menu-item> -->
          </el-menu>
        </div>
        <div class="right-div">
          <div style="padding: 0 20px;">
            <el-tooltip class="item" effect="dark" content="欢迎提Issues" placement="bottom-end">
              <el-button :icon="ChatLineSquare" circle @click="issues" />
            </el-tooltip>
          </div>
          <!-- 服务器选择 -->
          <el-select v-model="player.server" placeholder="Select">
            <el-option
              v-for="item in player.serverList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </div>
      </div>
    </el-header>
    <el-main>
      <!-- <router-view></router-view> -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<style scoped lang="stylus">
.fade-enter-active,
.fade-leave-active {
  transition: filter 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  filter: blur(5px);
}

.el-header {
  background: #192151;
  .el-menu--horizontal {
    border-bottom: solid 1px #dcdfe600;
  }
  .el-menu-item {
    padding 0 20px
  }
}
.el-main {
  margin: 0
  padding: 0
  background-color: $global-v-page-background-color;
}
.home-header {
  background: url('@/assets/home/home_header.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position:50% 50%;
  height: 100%;
  display flex
  align-items: center
  padding-right: 16px;
  padding-left: 16px;
  margin-right: auto;
  margin-left: auto;
  max-width: $global-v-page-max-width;

  .home-header-logo {
    position: relative;
    width: 230px;
    min-width: 230px;
    height: 44px;
    background-image: url('@/assets/home/home_logo_1.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .right-div {
    flex-grow: 1;
    flex-direction row-reverse
    display flex

    .el-select {
      width 100px
    }
  }
}

</style>
