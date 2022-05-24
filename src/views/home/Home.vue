<script setup lang="ts">
import usePlayer from '@/store/player'
const player = usePlayer()
</script>

<template>
  <el-container style="height: 100%;">
    <el-header>
      <!-- 左侧logo -->
      <div class="home-header">
        <div class="home-header-logo"></div>
        <div style="width:600px">
          <el-menu
            default-active="player"
            mode="horizontal"
            background-color="#ffffff00"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-menu-item index="player">玩家</el-menu-item>
            <el-menu-item index="clan">舰队</el-menu-item>
          </el-menu>
        </div>
        <div class="right-div">
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
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped lang="stylus">
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
