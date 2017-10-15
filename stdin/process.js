// Run with:
// cat file.txt | node process.js

process.stdin.resume() // tell the stream we're ready to start reading
process.stdin.setEncoding('utf8')

process.stdin.on('data', (chunk) => {
  process.stdout.write(chunk.toUpperCase())
})


