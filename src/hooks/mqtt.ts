import mqtt from 'mqtt/dist/mqtt'
// https://www.npmjs.com/package/mqtt#connect
const options = {
  // Clean session
  clean: true, // 设置为 false 以在离线时接收 QoS 1 和 2 消息；
  connectTimeout: 4000,
  // Auth
  clientId: 'mgaia_web_test'
  // username: 'wows-poll',
  // password: 'wows-poll'
}
// const client = mqtt.connect('ws://mq.wows.linxun.link:8083/mqtt', options)
const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', options)
// 链接成功会触发connect
client.on('connect', () => {
  console.log('Connection succeeded!')
  client.subscribe('wowstestpoll', { qos: 1 }, function (err, res) {
    console.log('触发', res, err)
  })
})
client.on('error', error => {
  console.log('Connection failed', error)
})
client.on('message', (topic, message) => {
  console.log(`Received message ${message} from topic ${topic}`)
})
