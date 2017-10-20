const user = 'johnny'
const pass = 'c-bad'
const authString = `${user}:${pass}`

const buf = new Buffer(authString)
const encoded = buf.toString('base64')
console.log(encoded)
