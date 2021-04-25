class AudioNoise {
  constructor(el) {
    this.element = el
    this.name = 'AudioNoise'
    this.noise = [
      'oiseaux',
      'orage',
      'pluie',
      'riviere'
    ]
    this.remote = this.controls()
    this.playing = false
    this.audioPlayPause = []
  }

  controls = () => {
    const remote = document.createElement('div')
    remote.classList.add('audioNoise-remote')
    this.element.appendChild(remote)
    
    this.noise.forEach(noise => {
      const div = document.createElement('div')
      div.classList.add('audioNoise-remote-wrapper')
      remote.appendChild(div)

      const label = document.createElement('label')
      label.classList.add('audioNoise-remote-label')
      label.setAttribute('data-audio-player-name', noise)
      label.innerHTML = noise
      div.appendChild(label)

      const checkbox = document.createElement('input')
      checkbox.classList.add('audioNoise-remote-checkbox')
      checkbox.type = 'checkbox'
      checkbox.name = `noise-${noise}`
      label.appendChild(checkbox)

      const range = document.createElement('input')
      range.classList.add('audioNoise-remote-range')
      range.type = 'range'
      range.min = '0'
      range.max = '1'
      range.step = '.1'
      range.value = '.5'
      label.appendChild(range)

      const player = this.player(noise)
      div.appendChild(player)
    })

    const btnPlayPause = document.createElement('button')
    btnPlayPause.classList.add('audioNoise-btn')
    btnPlayPause.classList.add('audioNoise-btn-playPause')
    btnPlayPause.innerHTML = "Play/Pause"
    btnPlayPause.addEventListener('click', () => {
      this.playPause()
    })
    remote.appendChild(btnPlayPause)

    return remote
  }

  player = (noise) => {
    const player = document.createElement('audio')
    player.classList.add('audioNoise-remote-audio')
    player.setAttribute('data-audio-player', noise)
    player.loop = true
    player.preload = 'auto'

    const source = document.createElement('source')
    source.src = `./sound/${noise}.mp3`
    source.type = 'audio/mp3'
    player.appendChild(source)

    return player
  }

  checkAudio = () => {
    this.audioPlayPause = []
    this.remote.querySelectorAll('.audioNoise-remote-label').forEach(element => {
      const audioChecked = element.querySelector('.audioNoise-remote-checkbox').checked
      audioChecked && this.audioPlayPause.push(element)
    })
    return this.audioPlayPause
  }

  playPause = () => {
    console.log('playPause')
    
    const newAudioPlayPause = this.checkAudio()
    this.audioPlayPause.forEach(element => {
      this.playing ? this.pause(element) : this.play(element)
    })
    this.playing = !this.playing
    this.audioPlayPause = this.checkAudio()
  }

  play = (el) => {
    el.parentNode.querySelector('.audioNoise-remote-audio').play()
  }

  pause = (el) => {
    el.parentNode.querySelector('.audioNoise-remote-audio').pause()
  }
}

const audioNoise = new AudioNoise(document.getElementById('audioNoise'))
