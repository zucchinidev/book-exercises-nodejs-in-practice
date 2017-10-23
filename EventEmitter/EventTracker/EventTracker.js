const events = require('events')

class EventTracker extends events.EventEmitter {
  constructor () {
    super()
  }
}

const eventTracker = new EventTracker()
eventTracker.on('newListener', (name, listener) => {
  console.log('Event name added: ', name)
  console.log('Listener added: ', listener)
})

eventTracker.on('removeEvent', () => {
  console.log('RemoveEvent executed')
})