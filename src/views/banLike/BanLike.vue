<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { accountSearchUserList, searcBanCn } from '@/api/wows/wows'
import { Base64 } from 'js-base64'
import lodash from 'lodash'
const searchListLoading = ref(false)
const user = ref()
const userList = ref<{
  accountId: number,
  userName: string,
  server: string
}[]>([])

const searchUserList = (query: string) => {
  accountSearchUserList({ server: 'cn', userName: query, limit: 5 }).then(
    response => {
      userList.value = response.data
      searchListLoading.value = false
    }
  ).catch(() => {
    searchListLoading.value = false
  })
}

const banUser = ref<any>({})
const searchBan = () => {
  console.log(user.value)
  searcBanCn({ accountId: user.value }).then(
    response => {
      banUser.value = response.data
      console.log(response)
    }
  )
}
const id = ref('')
const searchBanId = () => {
  searcBanCn({ accountId: id.value }).then(
    response => {
      banUser.value = response.data
      console.log(response)
    }
  )
}

</script>
<template>
  <div class="main-content">
    <div class="warning">
      <div class="title">提醒（暂只支持国服）</div>
      <div class="content">
        <div>yuyuko仅对官方公布的打码封号名单（仅三方插件）进行了模糊匹配，提供匹配记录</div>
        <div>相似用户数为同时满足匹配规则的用户数量，比如_**_,有可能是_11_,也有可能是_22_</div>
        <div>假如相似用户数为5，则说明5人中可能存在1人被封禁</div>
        <div>由于数据库并未收录全用户名，且官方并未公布打码规则，故<span style=" font-weight: bold;    color: red;    font-size: 20px;">相似用户数即使为1也不能确定被封号</span></div>
        <div>当前匹配规则：**代表替换了2-3个字符，***代表替换了3-4个字符，以此类推</div>
        <div>免责申明：本页面所有信息均不作为评判封号的证据，不支持用于鉴挂等行为，请大家理性讨论</div>
      </div>
    </div>
    <div style="text-align: center;">
      <el-input
        v-model="id"
        placeholder="直接查询accountId"
        style="width:400px;padding-bottom: 5px;"
        @keyup.enter="searchBanId"
      >
        <template #append>
          <el-button :icon="Search" @click="searchBanId" />
        </template>
      </el-input>
      <br/>
      <el-select
        v-model="user"
        filterable
        remote
        style="width:400px;"
        reserve-keyword
        placeholder="通过用户名查询"
        :remote-method="searchUserList"
        :loading="searchListLoading"
        @change="searchBan"
      >
        <el-option
          v-for="item in userList"
          :key="item.accountId"
          :label="item.userName"
          :value="item.accountId"
        />
      </el-select>
    </div>
    <div>
      <!-- 虎牙TV-2020小兄弟 -->
      <!-- 一炮二红的小鸟 -->
      <div
        v-if="lodash.isNil(banUser.voList)||banUser.voList.length===0"
        style="
          text-align: center;
          color: #27b440;
          font-size: 20px;
          font-weight: bold;
          padding-top: 40px;
        "
      >
        {{ banUser.userName }} {{ banUser.accountId }} 未匹配到记录
      </div>
      <div v-else>
        <div
          style="
            text-align: center;
            color: #f15e5e;
            font-size: 20px;
            font-weight: bold;
            padding-top: 20px;
          "
        >
          <span>{{ banUser.userName }}</span> <span>{{ banUser.accountId }}</span>
        </div>
        <div v-for="user of banUser.voList" :key="user.banTime" class="ban">
          <div>
            <div>封号日期: <span>{{ user.banTime }}</span></div>
            <div>官方匹配名:  {{ user.banName }}</div>
            <div>历史用户名: <span>{{ user.userName }}</span></div>
          </div>
          <div style="    border: 1px solid #f15e5e;"></div>
          <div style="display: flex;align-items: center;">相似用户数 <span style="font-size: 40px;">{{ user.banNameNamesake }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.main-content {
  background-color: $global-v-page-background-color;
  background-color: white;
  min-height 100%
  position: relative;
  overflow auto
}
.warning{
  padding: 8px 16px;
  background-color: #f56c6c1a;
  border-radius: 4px;
  border-left: 5px solid #f56c6c;
  margin: 20px 0;
  width: 600px
  margin 20px auto

  .title{
    font-weight: 700;
    padding-botom:10px;
    padding-bottom: 10px;
    font-size 20px
  }
  .content{
    font-size 14px
  }
}

.ban{
  display: flex;
  border: 6px solid #f15e5e;
  border-radius: 16px;
  width: 600px;
  margin: 0 auto;
  margin-top: 10px
  padding: 20px 40px
  box-sizing: border-box;
  font-weight: bold;
  line-height: 34px;
  justify-content: space-between;

  span{
    color: #f15e5e;
    padding-left 10px
  }
}
</style>
