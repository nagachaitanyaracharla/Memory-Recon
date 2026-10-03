import { create } from 'zustand'
import type { MediaItem, MediaType } from '../types'
import { MediaItemSchema } from '../types'
import { FUTURE_BUILDERS_DAY_MEMORIES } from '../data/demoData'

interface MediaState {
  items: MediaItem[]
  selectedItemId: string | null
  isLoading: boolean
  addMediaFiles: (files: FileList | File[]) => Promise<number>
  removeMediaItem: (id: string) => void
  selectItem: (id: string | null) => void
  clearAll: () => void
  loadSampleMemories: () => void
}

// Generate thumbnail and metadata from video file
async function processVideoFile(file: File, url: string): Promise<{ duration: number; width: number; height: number; thumbnail?: string }> {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    video.playsInline = true
    video.src = url

    const timeout = setTimeout(() => {
      resolve({ duration: 5, width: 1920, height: 1080 })
    }, 4000)

    video.onloadedmetadata = () => {
      const duration = video.duration || 5
      const width = video.videoWidth || 1920
      const height = video.videoHeight || 1080
      video.currentTime = Math.min(1, duration / 2)

      video.onseeked = () => {
        clearTimeout(timeout)
        try {
          const canvas = document.createElement('canvas')
          canvas.width = Math.min(320, width)
          canvas.height = Math.round((canvas.width / width) * height)
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            const thumbnail = canvas.toDataURL('image/jpeg', 0.7)
            resolve({ duration, width, height, thumbnail })
            return
          }
        } catch {
          // fallback
        }
        resolve({ duration, width, height })
      }
    }

    video.onerror = () => {
      clearTimeout(timeout)
      resolve({ duration: 5, width: 1920, height: 1080 })
    }
  })
}

// Process image file to get dimensions
async function processImageFile(file: File, url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = () => {
      resolve({ width: 1920, height: 1080 })
    }
    img.src = url
  })
}

// Process audio file to get duration
async function processAudioFile(file: File, url: string): Promise<{ duration: number }> {
  return new Promise((resolve) => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audio.onloadedmetadata = () => {
      resolve({ duration: audio.duration || 10 })
    }
    audio.onerror = () => {
      resolve({ duration: 10 })
    }
    audio.src = url
  })
}

export const useMediaStore = create<MediaState>((set, get) => ({
  items: [],
  selectedItemId: null,
  isLoading: false,

  selectItem: (id) => set({ selectedItemId: id }),

  removeMediaItem: (id) => {
    const item = get().items.find((i) => i.id === id)
    if (item && item.url.startsWith('blob:')) {
      URL.revokeObjectURL(item.url)
    }
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
      selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
    }))
  },

  clearAll: () => {
    get().items.forEach((item) => {
      if (item.url.startsWith('blob:')) {
        URL.revokeObjectURL(item.url)
      }
    })
    set({ items: [], selectedItemId: null })
  },

  addMediaFiles: async (files) => {
    set({ isLoading: true })
    const fileArray = Array.from(files)
    const newItems: MediaItem[] = []

    for (const file of fileArray) {
      const mime = file.type
      let mediaType: MediaType = 'image'

      if (mime.startsWith('video/')) {
        mediaType = 'video'
      } else if (mime.startsWith('audio/')) {
        mediaType = 'audio'
      } else if (mime.startsWith('image/')) {
        if (file.name.toLowerCase().includes('screenshot') || file.name.toLowerCase().startsWith('screen')) {
          mediaType = 'screenshot'
        } else {
          mediaType = 'image'
        }
      } else {
        // unsupported type, skip
        continue
      }

      const objectUrl = URL.createObjectURL(file)
      let duration: number | undefined
      let width: number | undefined
      let height: number | undefined
      let thumbnail: string | undefined

      try {
        if (mediaType === 'video') {
          const vMeta = await processVideoFile(file, objectUrl)
          duration = vMeta.duration
          width = vMeta.width
          height = vMeta.height
          thumbnail = vMeta.thumbnail
        } else if (mediaType === 'image' || mediaType === 'screenshot') {
          const iMeta = await processImageFile(file, objectUrl)
          width = iMeta.width
          height = iMeta.height
          thumbnail = objectUrl
        } else if (mediaType === 'audio') {
          const aMeta = await processAudioFile(file, objectUrl)
          duration = aMeta.duration
        }
      } catch {
        // Fallback gracefully without breaking
      }

      const candidate = {
        id: `media_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        type: mediaType,
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
        url: objectUrl,
        durationSeconds: duration,
        width,
        height,
        dateModified: file.lastModified || Date.now(),
        thumbnailUrl: thumbnail,
      }

      const validated = MediaItemSchema.safeParse(candidate)
      if (validated.success) {
        newItems.push(validated.data)
      }
    }

    set((state) => ({
      items: [...newItems, ...state.items],
      isLoading: false,
      selectedItemId: newItems.length > 0 ? newItems[0].id : state.selectedItemId,
    }))

    return newItems.length
  },

  loadSampleMemories: () => {
    // Load official Future Builders Day demo memories (12 captures across 5 chapters)
    set({ items: FUTURE_BUILDERS_DAY_MEMORIES, selectedItemId: FUTURE_BUILDERS_DAY_MEMORIES[0].id })
  },
}))
