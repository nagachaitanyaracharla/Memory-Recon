import { Router, Request, Response } from 'express'
import { GeminiReconstructionService, RawAssetInput } from '../services/ai/geminiService'
import { StoryReconstructionResponseSchema } from '../schemas/reconstruction'

const router = Router()
const aiService = new GeminiReconstructionService()

// Status check endpoint
router.get('/status', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    aiService: 'Google Gemini Multimodal',
    hasApiKey: aiService.hasApiKey(),
    privacyNotice: 'Media used for AI analysis may be sent to the configured AI service.',
  })
})

// Main reconstruction endpoint
router.post('/reconstruct', async (req: Request, res: Response) => {
  try {
    const { assets } = req.body

    if (!assets || !Array.isArray(assets) || assets.length === 0) {
      return res.status(400).json({
        error: 'Invalid request: "assets" array is required and must not be empty.',
      })
    }

    // Call reconstruction engine (Gemini multimodal or local reasoning fallback)
    const result = await aiService.reconstructStory(assets as RawAssetInput[])

    // Validate schema
    const validated = StoryReconstructionResponseSchema.safeParse(result)
    if (!validated.success) {
      console.error('Validation failure on reconstructed story:', validated.error)
      return res.status(500).json({
        error: 'Internal schema validation failed on reconstructed story.',
        details: validated.error.issues,
      })
    }

    return res.json(validated.data)
  } catch (err: any) {
    console.error('Error during story reconstruction:', err)
    return res.status(500).json({
      error: 'Reconstruction pipeline failed.',
      message: err.message || 'Unknown error occurred',
    })
  }
})

export default router
