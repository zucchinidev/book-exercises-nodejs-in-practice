const express = require('express')
const stream = require('stream')
const util = require('util')


class StatStream extends stream.Readable {
  constructor (limit) {
    super(limit)
    this.limit = limit
  }

  _read (size) {
    this.limit--
    const memoryUsage = process.memoryUsage()
    this.push(util.inspect(memoryUsage))
    this.push('\n')
    if (this.limit <= 0) {
      this.push(null)
    }
  }
}

const app = express()

app.get('/', (req, res) => {
  const statStream = new StatStream(10)
  statStream.pipe(res)
})

app.listen(3000, () => console.log('Server listen port 3000'))