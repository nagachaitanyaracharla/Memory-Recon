import { z } from 'zod'

export const ConfidenceLevelSchema = z.enum(['HIGH', 'MEDIUM', 'LOW'])

export const AssetAnalysisSchema = z.object({
  environment: z.string().default('Unspecified environment'),
  objects: z.array(z.string()).default([]),
  activities: z.array(z.string()).default([]),
  visibleText: z.string().optional().default(''),
  sceneClues: z.array(z.string()).default([]),
  eventClues: z.array(z.string()).default([]),
  visualSimilarityKey: z.string().optional().default(''),
})

export const AssetEvidenceSchema = z.object({
  id: z.string(),
  filename: z.string(),
  type: z.enum(['image', 'video', 'audio', 'screenshot']),
  duration: z.number().optional(),
  timestamp: z.number(),
  metadata: z.record(z.string(), z.any()).default({}),
  analysis: AssetAnalysisSchema,
  confidence: ConfidenceLevelSchema.default('HIGH'),
  storyRelevance: z.number().min(1).max(10).default(5),
  audioTranscript: z.string().default('Audio analysis unavailable.'),
})

export const EventReconstructionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  evidenceAssetIds: z.array(z.string()).default([]),
  confidence: ConfidenceLevelSchema.default('HIGH'),
  importance: z.number().min(1).max(10).default(7),
  reason: z.string(),
})

export const MeaningfulMomentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  whyItMatters: z.string(),
  assetId: z.string(),
  timestamp: z.number(),
  confidence: ConfidenceLevelSchema.default('HIGH'),
  importanceScore: z.number().min(1).max(10).default(8),
  chapterId: z.string(),
  evidenceSummary: z.object({
    timestampClue: z.string(),
    visualContinuity: z.string(),
    sceneSimilarity: z.string(),
    metadata: z.string(),
  }),
})

export const ChapterSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  momentCount: z.number(),
  durationSeconds: z.number(),
})

export const PossibleMissingMomentSchema = z.object({
  id: z.string(),
  betweenMomentIds: z.tuple([z.string(), z.string()]),
  title: z.string(),
  description: z.string(),
  inferenceReason: z.string(),
  label: z.literal('INFERENCE'),
})

export const TimelineClipSpecSchema = z.object({
  clipId: z.string(),
  assetId: z.string(),
  trackKind: z.enum(['video', 'audio', 'elements']),
  trackName: z.string(),
  startFrame: z.number().int().nonnegative(),
  durationFrames: z.number().int().positive(),
  label: z.string(),
  type: z.enum(['video', 'image', 'audio', 'text']),
  speed: z.number().optional(),
  text: z.object({
    content: z.string(),
    fontSize: z.number().optional(),
    color: z.string().optional(),
  }).optional(),
})

export const StoryReconstructionResponseSchema = z.object({
  summary: z.string(),
  events: z.array(EventReconstructionSchema),
  moments: z.array(MeaningfulMomentSchema),
  chapters: z.array(ChapterSchema),
  evidence: z.array(AssetEvidenceSchema),
  missingMoments: z.array(PossibleMissingMomentSchema),
  timeline: z.object({
    fps: z.number().default(30),
    totalFrames: z.number().int().nonnegative(),
    tracks: z.array(
      z.object({
        kind: z.enum(['video', 'audio', 'elements']),
        name: z.string(),
      })
    ),
    clips: z.array(TimelineClipSpecSchema),
  }),
})

export type AssetEvidence = z.infer<typeof AssetEvidenceSchema>
export type EventReconstruction = z.infer<typeof EventReconstructionSchema>
export type MeaningfulMoment = z.infer<typeof MeaningfulMomentSchema>
export type Chapter = z.infer<typeof ChapterSchema>
export type PossibleMissingMoment = z.infer<typeof PossibleMissingMomentSchema>
export type TimelineClipSpec = z.infer<typeof TimelineClipSpecSchema>
export type StoryReconstructionResponse = z.infer<typeof StoryReconstructionResponseSchema>
