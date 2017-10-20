const fs = require('fs')

fs.readFile('./names.txt', (err, buff) => {
  console.log(buff.toString())
})
