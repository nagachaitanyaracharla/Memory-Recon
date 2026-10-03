import { create } from 'zustand'
import { 
  StoryReconstructionResponseSchema, 
  type StoryReconstructionResponse,
  type MeaningfulMoment,
  type Chapter,
  type EventReconstruction,
  type AssetEvidence,
  type PossibleMissingMoment,
  type TimelineClipSpec
} from '../../server/schemas/reconstruction'
import { useMediaStore } from './mediaStore'
import { useToastStore } from './toastStore'

export interface ReconstructionStageInfo {
  number: number
  title: string
  detail: string
}

export const RECONSTRUCTION_STAGES: ReconstructionStageInfo[] = [
  { number: 1, title: 'Reading your memories', detail: 'Parsing temporal timestamps, resolutions, and file manifests.' },
  { number: 2, title: 'Understanding visual evidence', detail: 'Extracting scene environments, activities, and visual clusters.' },
  { number: 3, title: 'Finding chronological clues', detail: 'Tracing temporal continuity and event boundaries.' },
  { number: 4, title: 'Discovering meaningful moments', detail: 'Identifying key narrative beats and why they matter.' },
  { number: 5, title: 'Building chapters', detail: 'Grouping moments into high-level story chapters.' },
  { number: 6, title: 'Preparing your timeline', detail: 'Synthesizing integer-frame multi-track Elah timeline.' },
]

interface StoryState {
  summary: string
  events: EventReconstruction[]
  moments: MeaningfulMoment[]
  chapters: Chapter[]
  evidence: AssetEvidence[]
  missingMoments: PossibleMissingMoment[]
  timelineSpec: StoryReconstructionResponse['timeline'] | null
  
  isReconstructing: boolean
  currentStageIndex: number
  hasReconstructed: boolean
  selectedMomentId: string | null
  selectedChapterId: string | null
  error: string | null

  startReconstruction: (engine: any) => Promise<boolean>
  selectMoment: (momentId: string | null) => void
  selectChapter: (chapterId: string | null) => void
  resetStory: () => void
}

export const useStoryStore = create<StoryState>((set, get) => ({
  summary: '',
  events: [],
  moments: [],
  chapters: [],
  evidence: [],
  missingMoments: [],
  timelineSpec: null,

  isReconstructing: false,
  currentStageIndex: 0,
  hasReconstructed: false,
  selectedMomentId: null,
  selectedChapterId: null,
  error: null,

  selectMoment: (momentId) => set({ selectedMomentId: momentId }),
  selectChapter: (chapterId) => set({ selectedChapterId: chapterId }),
  resetStory: () => set({
    summary: '',
    events: [],
    moments: [],
    chapters: [],
    evidence: [],
    missingMoments: [],
    timelineSpec: null,
    hasReconstructed: false,
    selectedMomentId: null,
    selectedChapterId: null,
    error: null,
  }),

  startReconstruction: async (engine) => {
    const mediaItems = useMediaStore.getState().items
    const addToast = useToastStore.getState().addToast

    if (mediaItems.length === 0) {
      addToast({
        title: 'No memories to reconstruct',
        description: 'Please import photos, videos, or audio files first.',
        type: 'warning',
      })
      return false
    }

    set({ isReconstructing: true, currentStageIndex: 0, error: null })

    try {
      // Stage 1: Reading your memories
      set({ currentStageIndex: 0 })
      await new Promise((r) => setTimeout(r, 600))

      // Stage 2: Understanding visual evidence
      set({ currentStageIndex: 1 })
      await new Promise((r) => setTimeout(r, 700))

      // Prepare payload for backend
      const rawAssets = mediaItems.map((item) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        size: item.size,
        dateModified: item.dateModified,
        durationSeconds: item.durationSeconds,
        width: item.width,
        height: item.height,
        thumbnailDataUrl: item.thumbnailUrl,
      }))

      // Stage 3: Finding chronological clues
      set({ currentStageIndex: 2 })
      await new Promise((r) => setTimeout(r, 600))

      // Fetch from API layer
      let response: Response
      try {
        response = await fetch('/api/reconstruct', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ assets: rawAssets }),
        })
      } catch (networkErr: any) {
        throw new Error('Network error contacting backend AI service at /api/reconstruct.')
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server responded with status ${response.status}`)
      }

      const rawJson = await response.json()

      // Stage 4: Discovering meaningful moments
      set({ currentStageIndex: 3 })
      await new Promise((r) => setTimeout(r, 700))

      // Strict validation with Zod
      const validated = StoryReconstructionResponseSchema.safeParse(rawJson)
      if (!validated.success) {
        console.error('Validation failure on backend response:', validated.error)
        throw new Error('AI response did not match expected reconstruction schema.')
      }

      const data = validated.data

      // Stage 5: Building chapters
      set({ currentStageIndex: 4 })
      await new Promise((r) => setTimeout(r, 600))

      // Stage 6: Preparing your timeline (AI -> Elah Integration)
      set({ currentStageIndex: 5 })

      if (engine && data.timeline && data.timeline.clips) {
        // Clear existing clips on tracks if any
        const tracks = engine.getProject()?.tracks || []
        tracks.forEach((track: any) => {
          const clips = engine.getClipsOnTrack(track.id) || []
          clips.forEach((clip: any) => {
            engine.removeClip(clip.id, track.id)
          })
        })

        // Insert AI reconstructed clips deterministically
        for (const clipSpec of data.timeline.clips) {
          const matchedTrack = tracks.find((t: any) => t.kind === clipSpec.trackKind)
          const targetTrackId = matchedTrack ? matchedTrack.id : tracks[0]?.id
          
          if (targetTrackId) {
            const mediaItem = mediaItems.find((m) => m.id === clipSpec.assetId)
            const mediaSrc = mediaItem ? mediaItem.url : ''

            if (clipSpec.type === 'text' && clipSpec.text) {
              engine.addClip({
                type: 'text',
                trackId: targetTrackId,
                startFrame: clipSpec.startFrame,
                durationFrames: clipSpec.durationFrames,
                name: clipSpec.label,
                text: {
                  content: clipSpec.text.content,
                  fontSize: clipSpec.text.fontSize || 42,
                  color: clipSpec.text.color || '#FFFFFF',
                  fontWeight: 'bold',
                  textAlign: 'center',
                },
              })
            } else if (clipSpec.type === 'video' && mediaSrc) {
              engine.addClip({
                type: 'video',
                trackId: targetTrackId,
                startFrame: clipSpec.startFrame,
                durationFrames: clipSpec.durationFrames,
                src: mediaSrc,
                name: clipSpec.label,
              })
            } else if (clipSpec.type === 'audio' && mediaSrc) {
              engine.addClip({
                type: 'audio',
                trackId: targetTrackId,
                startFrame: clipSpec.startFrame,
                durationFrames: clipSpec.durationFrames,
                src: mediaSrc,
                name: clipSpec.label,
              })
            } else if (mediaSrc) {
              // image
              engine.addClip({
                type: 'image',
                trackId: targetTrackId,
                startFrame: clipSpec.startFrame,
                durationFrames: clipSpec.durationFrames,
                src: mediaSrc,
                name: clipSpec.label,
              })
            }
          }
        }
      }

      await new Promise((r) => setTimeout(r, 600))

      // Complete
      set({
        summary: data.summary,
        events: data.events,
        moments: data.moments,
        chapters: data.chapters,
        evidence: data.evidence,
        missingMoments: data.missingMoments,
        timelineSpec: data.timeline,
        hasReconstructed: true,
        isReconstructing: false,
        selectedMomentId: data.moments[0]?.id || null,
        selectedChapterId: data.chapters[0]?.id || null,
      })

      addToast({
        title: 'Story Reconstructed',
        description: `Discovered ${data.moments.length} meaningful moments across ${data.chapters.length} chapters.`,
        type: 'success',
      })

      return true
    } catch (err: any) {
      console.error('Reconstruction error:', err)
      set({ isReconstructing: false, error: err.message || 'Failed to reconstruct story.' })
      addToast({
        title: 'Reconstruction Failed',
        description: err.message || 'Please check backend server status.',
        type: 'error',
      })
      return false
    }
  },
}))
