export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function formatDuration(seconds?: number): string {
  if (seconds === undefined || isNaN(seconds)) return '--:--'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function formatTimecode(frame: number, fps: number = 30): string {
  const totalSeconds = Math.floor(frame / fps)
  const remainingFrames = frame % fps
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${remainingFrames.toString().padStart(2, '0')}`
}

export function checkBrowserCapabilities(): {
  webgl2: boolean
  webCodecs: boolean
  webWorkers: boolean
  offscreenCanvas: boolean
  isCompatible: boolean
} {
  if (typeof window === 'undefined') {
    return {
      webgl2: true,
      webCodecs: true,
      webWorkers: true,
      offscreenCanvas: true,
      isCompatible: true,
    }
  }

  let webgl2 = false
  try {
    const canvas = document.createElement('canvas')
    webgl2 = !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'))
  } catch {
    webgl2 = false
  }

  const webCodecs = typeof window.VideoDecoder !== 'undefined'
  const webWorkers = typeof window.Worker !== 'undefined'
  const offscreenCanvas = typeof window.OffscreenCanvas !== 'undefined'

  return {
    webgl2,
    webCodecs,
    webWorkers,
    offscreenCanvas,
    isCompatible: webgl2 && webWorkers,
  }
}
