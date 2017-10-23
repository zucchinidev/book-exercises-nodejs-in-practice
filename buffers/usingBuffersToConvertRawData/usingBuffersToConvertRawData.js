const fs = require('fs')
fs.readFile('./world.dbf', (err, buf) => {
  const header = {}
  const date = new Date()
  date.setUTCFullYear(1900 + buf[1])
  date.setUTCMonth(buf[2])
  date.setUTCDate(buf[3])
  header.lastUpdated = date.toUTCString()
  header.totalRecords = buf.readUInt32LE(4)
  header.bytesInHeader = buf.readUInt16LE(8)
  header.bytesPerRecord = buf.readUInt16LE(10)

  const fields = []
  let fieldOffset = 32
  const fieldTerminator = 0x0D
  const FIELD_TYPES = {
    C: 'Character',
    N: 'Numeric'
  }
  while (buf[fieldOffset] !== fieldTerminator) {
    const fieldBuf = buf.slice(fieldOffset, fieldOffset + 32)
    const field = {}
    field.name = fieldBuf.toString('ascii', 0, 11).replace(/\u0000/g, '')
    field.type = FIELD_TYPES[fieldBuf.toString('ascii', 11, 12)]
    field.length = fieldBuf[16]
    fields.push(field)
    fieldOffset += 32
  }
  let startingRecordOffset = header.bytesInHeader
  const records = []
  for (let i = 0; i < header.totalRecords; i++) {
    let recordOffset = startingRecordOffset + ( i * header.bytesPerRecord )
    let record = {}
    record._isDel = buf.readUInt8(recordOffset) === 0x2A
    for (let j = 0; j < fields.length; j++) {
      let field = fields[j]
      let Type = field.type === 'Numeric' ? Number : String
      record[field.name] = Type(buf.toString('ascii', recordOffset, recordOffset + field.length).trim())
      recordOffset += field.length
    }
    records.push(record)
  }
  const jsonData = {header: header, fields: fields, records: records}
  fs.writeFile('world.json', JSON.stringify(jsonData), (err) => {
    if (err) {
      throw err
    }

    console.log('The file has been saved')
  })
})

