import React from 'react'
import { useStoryStore } from '../../stores/storyStore'
import { useMediaStore } from '../../stores/mediaStore'
import { formatDuration } from '../../lib/utils/format'
import { Sparkles, CheckCircle2 } from 'lucide-react'

export const ReconstructedBanner: React.FC = () => {
  const { hasReconstructed, moments, chapters, timelineSpec } = useStoryStore()
  const { items } = useMediaStore()

  if (!hasReconstructed) return null

  const durationSec = timelineSpec ? Math.round(timelineSpec.totalFrames / 30) : 0

  return (
    <div className="bg-purple-950/40 border-b border-purple-500/30 px-2.5 xl:px-4 py-1 xl:py-1.5 flex items-center justify-between text-[11px] xl:text-xs text-[#F5F7FA] shrink-0 animate-fadeIn select-none">
      <div className="flex items-center gap-1.5 xl:gap-2">
        <div className="w-4 h-4 xl:w-5 xl:h-5 rounded-md bg-purple-600 flex items-center justify-center shadow-sm">
          <Sparkles className="w-3 xl:w-3.5 h-3 xl:h-3.5 text-white" />
        </div>
        <span className="font-mono font-bold tracking-wider text-purple-300 text-[10px] xl:text-xs">
          AI RECONSTRUCTED
        </span>
      </div>

      <div className="flex items-center gap-2 xl:gap-4 font-mono text-[10px] xl:text-[11px] text-[#9AA3B2]">
        <div>
          <span className="text-[#687181]">Assets: </span>
          <span className="text-white font-semibold">{items.length}</span>
        </div>
        <div>
          <span className="text-[#687181]">Moments: </span>
          <span className="text-emerald-400 font-semibold">{moments.length}</span>
        </div>
        <div>
          <span className="text-[#687181]">Chapters: </span>
          <span className="text-purple-300 font-semibold">{chapters.length}</span>
        </div>
        <div>
          <span className="text-[#687181]">Duration: </span>
          <span className="text-white font-semibold">{formatDuration(durationSec)}</span>
        </div>
      </div>
    </div>
  )
}
