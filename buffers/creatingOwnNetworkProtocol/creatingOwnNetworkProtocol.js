const zlib = require('zlib')
const database = [
  [], [], [], [], [], [], [], []
]

// 00000001 00000010 00000100 00001000 00010000 00100000 01000000 10000000
const bitmasks = [1, 2, 4, 8, 16, 32, 64, 128]

function store (buf) {
  const db = buf[0]
  const key = buf.readUInt8(1)
  const index = bitmasks.findIndex((bitmask) => (db & bitmask) === bitmask)
  const foundDatabase = database[index]
  const firstByteOfZlib = 0x78
  if (buf[20] === firstByteOfZlib) {
    zlib.inflate(buf.slice(2), (err, inflatedBuf) => {
      if (err) {
        return console.error(err)
      }
      foundDatabase[key] = inflatedBuf.toString()
    })
  }
}

module.exports = {
  store
}