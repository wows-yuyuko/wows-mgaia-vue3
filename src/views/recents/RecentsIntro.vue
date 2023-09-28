<script setup lang="ts">
// recents说明
</script>
<template>
  <div class="main-content">
    <div style="padding: 50px;max-width: 800px;margin: 0 auto;    line-height: 30px;">
      <h2>recents功能介绍</h2>

      <p>
        recents功能是在recent基础上推出的一项增强服务，相较recent具有以下升级：<br />
        &nbsp;&nbsp;1. 实现单场级战绩记录，精确查询指定日期的每一场战斗<br />
        &nbsp;&nbsp;2. 采用独立服务器，recent宕机不影响recents服务，不同于BOT本地监控，您可在网页及所有BOT端查询每一场的详细战绩<br />
        &nbsp;&nbsp;3. 数据永久保存，并提供年度战报等后续附加功能<br />
        &nbsp;&nbsp;4. 您可以通过 <span style="    color: #26b1af;">wws me recents + 日期/数字</span>来查询指定日期或指定天数前的单日recents战绩<br />
        由于增设服务器成本及性能考虑，该功能目前仅对赞助用户开放，定价为周1/月3/季8/年30
      </p>

      <h2>购买须知</h2>

      <p>
        在您购买前请知悉如下规则： <br />
        &nbsp;&nbsp;1. recents订阅与游戏账号绑定，不跟随QQ等其他身份，即您为账号A开通了一年的recents服务，则该账号在之后的一年内将会记录recents战绩<br />
        &nbsp;&nbsp;2. 在您的订阅生效期间，yuyuko将会以分钟级记录您的战绩，并提供按日输出的实时查询<br />
        &nbsp;&nbsp;3. 当您的订阅过期后，yuyuko将停止记录您的战绩，但您仍可查询曾经订阅期间所记录的战绩，这部分战绩将永久保存<br />
        &nbsp;&nbsp;4. 该功能仅为recent的增强服务，是否订阅并不会影响您原本的所有功能，包括recent等现有功能仍将保持免费并持续运行<br />
      </p>

      <h2>订阅方式</h2>
      <p>
        当前订阅方式为<a href="https://afdian.net/a/JustOneSummer">爱发电</a>购买
        <br />填写游戏AID即可开通recents服务<br />请在购买前通过
        <code>wws 查询绑定 me</code> 查看您的AID，如有误操作请联系我们
      </p>

      <h2>购买步骤</h2>
      <p>
        &nbsp;&nbsp;1. 查询你需要开通recents功能的账号AID<br />
        <img src="./img/1.jpg" /><br />
        &nbsp;&nbsp;2. 访问 https://afdian.net/a/JustOneSummer ，选择需要购买的时长<br />
        <img src="./img/2.png" /><br />
        &nbsp;&nbsp;3. 填写你的游戏AID<br />
        <img src="./img/3.jpg" /><br />
        &nbsp;&nbsp;4. 你是我军最后的希望<br />
      </p>
    </div>
  </div>
</template>
<style scoped lang="stylus">
.main-content {
  background-color: $global-v-page-background-color;
  background-color: white;
  min-height 100%
  position: relative;
}
</style>
