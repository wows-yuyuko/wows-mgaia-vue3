<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue'
// 布局文件
</script>

<template>
  <div class="layout">
    <!-- 上方菜单栏 -->
    <div>
      <MenuBar/>
    </div>
    <!-- 下方内容区域 -->
    <div class="layout-bottom">
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="less">

.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #F7F7FA;
  .layout-bottom {
    padding: 10px;
    flex-grow: 1;
    height: 0;
    overflow: auto;
  }
}
</style>
