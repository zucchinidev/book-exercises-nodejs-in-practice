const events = require('events')

class Pulsar extends events.EventEmitter {
  constructor (speed, times) {
    super()
    this.speed = speed
    this.times = times
    this.on('newListener', (eventName, listener) => {
      if (eventName === 'pulse') {
        process.nextTick(() => this.start())
      }
    })
  }

  start () {
    const id = setInterval(() => {
      this.emit('pulse')
      this.times--
      if (this.times === 0) {
        clearInterval(id)
      }
    }, this.speed)
  }

  stop () {
    if (this.listeners('pulse').length === 0) {
      throw new Error('No listeners have been added!')
    }
  }
}

const pulsar = new Pulsar(500, 5)

pulsar.on('pulse', () => console.log('.'))