process.stdin.resume()

process.on('SIGHUP', () => {
  console.log('Reloading configuration...')
})

console.log('PID: ', process.pid)

// kill -HUP {{PROCESS_ID}}
