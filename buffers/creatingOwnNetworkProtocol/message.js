const zlib = require('zlib')
const protocol = require('./creatingOwnNetworkProtocol')
const header = new Buffer(2)
const databaseBitmask = 8 // 0001000 === 4
const key = 0
header[0] = databaseBitmask
header[1] = key

zlib.deflate('my message', (err, deflateBuf) => {
  if (err) {
    return console.error(err)
  }
  const message = Buffer.concat([header, deflateBuf])
  protocol.store(message)
})