const events = require('events')
class MusicPlayer extends events.EventEmitter {
  constructor () {
    super()
    this.playing = false
  }
}

const AudioDevice = {
  play (track) {
    // syub: trigger playback through iTunes, etc.
    console.log('play')
  },
  stop () {
    console.log('stop')
  }
}

const musicPlayer = new MusicPlayer()
musicPlayer.on('play', (track) => {
  this.playing = true
  AudioDevice.play(track)
})

musicPlayer.on('play', (track) => {
  console.log('Track now playing: ', track)
})


musicPlayer.on('stop', () => {
  this.playing = false
  AudioDevice.stop()
})

musicPlayer.emit('play', 'The Roots - The Fire')

setTimeout(() => {
  musicPlayer.emit('stop')
}, 1000)