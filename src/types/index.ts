import { z } from 'zod'

export type MediaType = 'image' | 'video' | 'audio' | 'screenshot'

export const MediaItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['image', 'video', 'audio', 'screenshot']),
  mimeType: z.string(),
  size: z.number(),
  url: z.string(),
  durationSeconds: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  dateModified: z.number(),
  thumbnailUrl: z.string().optional(),
})

export type MediaItem = z.infer<typeof MediaItemSchema>

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type: 'info' | 'success' | 'warning' | 'error'
  duration?: number
}

export type WorkspaceTab = 
  | 'media-all'
  | 'media-photos'
  | 'media-videos'
  | 'media-audio'
  | 'media-screenshots'
  | 'recon-story'
  | 'recon-moments'
  | 'recon-chapters'
  | 'project-info'
  | 'project-settings'

export interface BrowserCapabilityStatus {
  webgl2: boolean
  webCodecs: boolean
  webWorkers: boolean
  offscreenCanvas: boolean
  isCompatible: boolean
}
