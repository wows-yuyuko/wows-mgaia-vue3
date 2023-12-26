<script setup lang="ts">
import { ref } from 'vue'
import { openTab } from '@/lib/commonUtils'
import GitHub from '@/assets/icon/GitHub.vue'
import { useRoute } from 'vue-router'
import basicInfo from '@/stores/basicInfo'
import electron from '@/stores/electron'
import { getOauthPath } from '@/api/wowsV3/wowsBase'
import type { WowsServer } from '@/types/wowsBaseType'
import WgLogo from '@/assets/wowslogo/log.svg'
import router from '@/router'
// 布局文件
const useBasicInfo = basicInfo()
const useElectron = electron()
const route = useRoute()
const active = ref(route.path)
// 左侧菜单栏是否展开（只在窄屏幕下生效）
const openMenu = ref(false)
const serverList = ref<WowsServer[]>([])
const initData = async () => {
  serverList.value = await useBasicInfo.getServerList()
}
// 初始化数据
initData()

// 跳首页
const goHome = () => {
  useElectron.electronEnable ? router.push('/realRimeResults') : router.push('/player')
}

const wgOa = () => {
  if (useBasicInfo.useServerValue === 'cn') { return }
  getOauthPath({ server: useBasicInfo.useServerValue }).then(response => {
    window.open(response)
  })
  // window.open('https://api.worldoftanks.' + (useBasicInfo.useServerValue === 'na' ? 'com' : useBasicInfo.useServerValue) + '/wot/auth/login/?application_id=907d9c6bfc0d896a2c156e57194a97cf&redirect_uri=https://v3-api.wows.shinoaki.com:8443/public/wows/oauth/wows/yuyuko/success')
}
</script>

<template>
  <div class="layout">
    <div class="top-bar">
      <div @click="goHome"><img class="wows-logo" src="@/assets/wowslogo/home_logo_1.png"/></div>
      <div style="display: flex;    align-items: center;">
        <el-select
          v-model="useBasicInfo.useServerValue"
          style="width: 100px;margin-right: 10px;"
          placeholder="服务器" size="small"
        >
          <el-option
            v-for="server in serverList"
            :key="server.key"
            :label="server.value"
            :value="server.key"
          />
        </el-select>
        <div style="padding-right: 10px;">
          <el-tooltip class="item" effect="dark" content="授权wg账号(国服无效)" placement="bottom-end">
            <img style="padding: 6px 4px; cursor: pointer;     display: block;" :src="WgLogo" @click="wgOa" />
          </el-tooltip>
        </div>
        <GitHub style="cursor: pointer;" @click="openTab('https://github.com/wows-yuyuko/wows-mgaia-vue3')" />
      </div>
    </div>
    <div class="layout-body">
      <!-- 左侧菜单栏 -->
      <div class="left-menu">
        <el-menu
          :default-active="active"
          style="height:100%;"
          router
        >
          <el-menu-item v-if="useElectron.electronEnable" index="/realRimeResults" route="/realRimeResults" @click="openMenu = false">实时战绩</el-menu-item>
          <el-menu-item index="/player" route="/player" @click="openMenu = false">玩家</el-menu-item>
          <el-menu-item index="/shipList" route="/shipList" @click="openMenu = false">舰船</el-menu-item>
          <!-- <el-menu-item index="/clan" route="/clan" @click="openMenu = false">舰队</el-menu-item> -->
          <el-menu-item index="/banLike" route="/banLike" @click="openMenu = false">国服封禁模糊匹配 </el-menu-item>
          <el-menu-item index="/openContainer" route="/openContainer" @click="openMenu = false">开箱模拟 </el-menu-item>
          <el-menu-item index="/rankingList" route="/rankingList" @click="openMenu = false">国服排行榜 </el-menu-item>
          <el-menu-item index="/replayAnalysis" route="/replayAnalysis" @click="openMenu = false">replay战绩解析 </el-menu-item>
          <el-menu-item index="/other" route="/other" @click="openMenu = false">其他 </el-menu-item>
        </el-menu>
      </div>
      <div class="main">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: filter 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  filter: blur(5px);
}
.layout{
  height: 100%;
  display: flex;
  flex-direction: column;
  background: url(@/assets//bg.jpg) no-repeat 50% 0 fixed;
  background-color: $mg-background-color;

  .top-bar{
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid var(--el-border-color);
    justify-content: space-between;
    // background-color: #fffffff0;

    .wows-logo{
      display: block;
      height: 40px;
    }
  }

  .layout-body{
    height: 0;
    flex: 1;
    display: flex;

    .left-menu{
      width: 200px;
    }

    .main{
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
