const events = require('events')
const domain = require('domain')
const audioDomain = domain.create()

class MusicPlayer extends events.EventEmitter {
  constructor (audioDevice) {
    super()
    this.audioDevice = audioDevice
    this.on('play', this.play.bind(this))
    this.emit('error', 'No audio tracks are available')
  }

  play () {
    this.audioDevice.emit('play')
    console.log('Now playing')
  }
}

class AudioDevice extends events.EventEmitter {
  constructor () {
    super()
    this.on('play', this.play.bind(this))
  }

  play () {
    this.emit('error', 'not implemented yet')
  }
}

audioDomain.on('error', function (err) {
  console.log('audioDomain error:', err)
})

audioDomain.run(function () {
  const musicPlayer = new MusicPlayer(new AudioDevice())
  musicPlayer.play()
})