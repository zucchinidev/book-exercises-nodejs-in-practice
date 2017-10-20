const CounterStream = require('./CountStream')
const https = require('https')
const countStream = new CounterStream('book')

https.get('https://www.manning.com/', (res) => {
  res.pipe(countStream)
})

countStream.on('total', (count) => {
  console.log('Total matches:', count)
})