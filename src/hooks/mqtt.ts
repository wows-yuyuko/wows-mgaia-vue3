import mqtt from 'mqtt'

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: 'emqx_test',
  username: 'emqx_test',
  password: 'emqx_test'
}
const client = mqtt.connect('mqtt://broker.emqx.io:1883', options)
client.on('connect', function () {
  console.log('Connected')
  client.subscribe('test', function (err) {
    if (!err) {
      client.publish('test', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
