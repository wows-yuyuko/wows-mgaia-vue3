import mqtt from 'mqtt/dist/mqtt'
// https://www.npmjs.com/package/mqtt#connect
const options = {
  // Clean session
  clean: true, // 设置为 false 以在离线时接收 QoS 1 和 2 消息；
  connectTimeout: 4000,
  // Auth
  clientId: 'mqttx_6b476a1e'
  // username: 'wows-poll',
  // password: 'wows-poll'
}
// const client = mqtt.connect('ws://mq.wows.shinoaki.com:8083/mqtt', options)
const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', options)
// 链接成功会触发connect
client.on('connect', function () {
  console.log('Connected')
  client.subscribe('wows/test/poll', { qos: 1 }, function (err, res) {
    console.log('触发', res)
    if (!err) {
      client.publish('wows/test/poll', 'Hello mqtt', { qos: 1, retain: true })
    }
  })
})

client.on('message', function (topic:any, message:any) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
