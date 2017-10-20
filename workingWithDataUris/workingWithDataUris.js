const fs = require('fs')
const mime = 'image/png'
const encoding = 'base64'
const data = fs.readFileSync('./monkey.png').toString(encoding)
const uri = `data:${mime};${encoding},${data}`

// flip the scenario, data URI to file
const binaryData = uri.split(',')[1]

const buf = new Buffer(data, 'base64')
fs.writeFileSync('./secondmonkey.png', buf)
