const express = require('express')
const app = express()

app.on('hello', () => {
  console.log('Hello world event emitter')
})

app.get('/', (req, res) => {
  res.app.emit('hello')
  res.send('hello world')
})

app.listen(3000)