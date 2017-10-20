const fs = require('fs')
let content

function readFileIfRequired (callback) {
  if (!content) {
    fs.readFile(__filename, 'utf8', (err, data) => {
      content = data
      console.log('readFileIfRequired: readFile')
      callback(err, data)
    })
  } else {
    process.nextTick(() => {
      console.log('readFileIfRequired: cached')
      callback(null, content)
    })
  }
}

readFileIfRequired(function (err, data) {
  console.log('1. Length:', data.length)
  readFileIfRequired(function (err, data2) {
    console.log('2. Length:', data2.length)
  })
  console.log('Reading file again...')
})