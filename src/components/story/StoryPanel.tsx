import React from 'react'
import { useStoryStore } from '../../stores/storyStore'
import { useMediaStore } from '../../stores/mediaStore'
import { useTimelineEngine } from '@elah/editor'
import { StoryOverview } from './StoryOverview'
import { Sparkles, BrainCircuit, ShieldAlert, FolderUp } from 'lucide-react'

interface StoryPanelProps {
  onOpenImport?: () => void
}

export const StoryPanel: React.FC<StoryPanelProps> = ({ onOpenImport }) => {
  const { hasReconstructed, isReconstructing, startReconstruction } = useStoryStore()
  const { items } = useMediaStore()
  const engine = useTimelineEngine()

  if (hasReconstructed) {
    return <StoryOverview />
  }

  const handleStart = () => {
    if (engine) {
      startReconstruction(engine)
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center select-none max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-[#A78BFA] mb-5 shadow-lg">
        <Sparkles className="w-8 h-8" />
      </div>

      <span className="text-[11px] font-mono uppercase tracking-widest text-[#A78BFA] mb-1 font-semibold">
        AI Multimodal Reconstruction
      </span>
      <h3 className="text-xl font-bold text-[#F5F7FA] mb-2">
        Your story hasn't been reconstructed yet.
      </h3>

      <p className="text-xs text-[#9AA3B2] leading-relaxed mb-6">
        Memory Recon connects temporal timestamps, visual evidence clusters, and narrative arcs across all {items.length} imported memories, synthesizing a multi-track Elah timeline.
      </p>

      {items.length === 0 ? (
        <div className="p-4 rounded-xl bg-[#11141A] border border-white/10 text-xs text-[#9AA3B2] space-y-3">
          <p>Please import photos, videos, or audio recordings first.</p>
          {onOpenImport && (
            <button
              onClick={onOpenImport}
              className="h-9 px-4 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-2"
            >
              <FolderUp className="w-3.5 h-3.5" />
              <span>Import Memories</span>
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={handleStart}
          disabled={isReconstructing}
          className="h-11 px-7 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold tracking-wide transition-all shadow-xl shadow-purple-900/40 flex items-center gap-2.5 cursor-pointer border border-purple-400/20 active:scale-95 mb-5"
        >
          <BrainCircuit className="w-4 h-4" />
          <span>{isReconstructing ? 'Reconstructing...' : 'Reconstruct Story'}</span>
        </button>
      )}

      {/* Honest Privacy Notice (Section 17 requirement) */}
      <div className="p-3.5 rounded-xl bg-[#11141A] border border-white/5 text-left text-xs text-[#9AA3B2] flex items-start gap-2.5 mt-2">
        <ShieldAlert className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#687181] leading-relaxed">
          <strong className="text-gray-300 font-medium">Privacy Note: </strong>
          Media used for AI analysis may be sent to the configured AI service. API keys remain strictly server-side.
        </p>
      </div>
    </div>
  )
}
