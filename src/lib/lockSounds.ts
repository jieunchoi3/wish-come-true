let ctx: AudioContext | null = null
let muted = false

function getCtx(): AudioContext | null {
  if (muted) return null
  if (!ctx) {
    try {
      ctx = new AudioContext()
    } catch {
      return null
    }
  }
  return ctx
}

/** Very quiet detent click */
export function playDialClick() {
  const ac = getCtx()
  if (!ac) return

  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'square'
  osc.frequency.value = 920
  gain.gain.value = 0.018
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start()
  osc.stop(ac.currentTime + 0.025)
}

/** Soft metallic clunk on latch release */
export function playLatchClunk() {
  const ac = getCtx()
  if (!ac) return

  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(180, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(90, ac.currentTime + 0.12)
  gain.gain.value = 0.035
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start()
  osc.stop(ac.currentTime + 0.14)
}

export function setLockSoundsMuted(value: boolean) {
  muted = value
}

export function isLockSoundsMuted() {
  return muted
}
