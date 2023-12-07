<script setup lang="ts">
// 其他信息
</script>

<template>
  <div class="other">
    <h1>兵工厂</h1>
    <ul>
      <li><a href="https://armory.wowsgame.cn/zh-cn/" target="_Blank">国服 https://armory.wowsgame.cn/zh-cn/</a></li>
      <li><a href="https://armory.worldofwarships.asia/zh-sg/" target="_Blank">亚服 https://armory.worldofwarships.asia/zh-sg/</a></li>
      <li><a href="https://armory.worldofwarships.eu/zh-sg/" target="_Blank">欧服 https://armory.worldofwarships.eu/zh-sg/</a></li>
      <li><a href="https://armory.worldofwarships.com/zh-sg/" target="_Blank">美服 https://armory.worldofwarships.com/zh-sg/</a></li>
      <li><a href="https://armory.worldofwarships.ru/zh-sg/" target="_Blank">毛服 https://armory.worldofwarships.ru/zh-sg/</a></li>
    </ul>
    <h1>相关教程</h1>
    <p>@本心  yuyuko战绩bot搭建：</p>
    <ul>
      <li>
        <a href="https://www.bilibili.com/video/BV1r5411X7pr" target="_Blank">Hikari搭建教程</a>&ensp;&ensp;&ensp;
        <a href="https://github.com/benx1n/HikariBot" target="_Blank">Hikari(一键安装)github</a>&ensp;&ensp;&ensp;
        <a href="https://gitee.com/benx1n/HikariBot" target="_Blank">Hikari(一键安装)gitee</a>
      </li>
      <li>
        <a href="https://github.com/benx1n/wows-stats-bot" target="_Blank">Hoshino(动手能力较强)github</a>&ensp;&ensp;&ensp;
        <a href="https://gitee.com/benx1n/wows-stats-bot" target="_Blank">Hoshino(动手能力较强)gitee</a>
      </li>
    </ul>
    <h1>相关反馈群</h1>
    <p>@missile_gaia @西行寺雨季</p>
    <ul>
      <li><span>网页及憨批系列工具反馈群：578477683</span></li>
      <li><span>yuyuko群(有bot可绑定)：872725671</span></li>
      <li><span>战舰世界开发者交流群：967546463</span></li>
    </ul>
    <h1>相关下载</h1>
    <ul>
      <li>
        <a href="https://pan.baidu.com/s/1H07d0uVk58OI3PwgSu8mNQ?pwd=zcyu" target="_Blank">wows憨批伴侣 实时战绩软件</a><br />
        <img src="@/assets/relatedDownloads/mgaia.png" style="width: 360px;" /><br />
        链接：https://pan.baidu.com/s/1H07d0uVk58OI3PwgSu8mNQ?pwd=zcyu <br />
        提取码：zcyu <br />
      </li>
    </ul>
    <h1>相关下载</h1>
    <ul>
      <li>
        扫码添加QQ机器人<br />
        <img src="@/assets/relatedDownloads/qqbot.png" style="width: 360px;" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.other{
  padding: 0 0 100px 50px;
  font-size: 16px;
  line-height: 1.7;
  h1{
    margin: 2rem 0 0.5rem;
    font-size: 38px;
    line-height: 1.4;
    letter-spacing: -.02em;
  }
  p{
    margin-bottom: 1.2em;
    margin: 0;
  }
  ul{
    padding-left: 1.25rem;
    margin-bottom: 1.2em;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li{
    position: relative;
    margin: 1px 0;
  }
  li:before {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: aliceblue;
    transition: background-color .5s;
    left: -1.25rem;
    top: .75rem;
  }
}
</style>
