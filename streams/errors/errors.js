const fs = require('fs')
const stream = fs.createReadStream('not-found')
stream.on('error', (err) => {
  console.trace()
  console.error('Stack: ', err.stack)
  console.error('The error raised was: ', err)
})