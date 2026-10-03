import React, { useState, useEffect } from 'react'
import { useStoryStore, RECONSTRUCTION_STAGES } from '../../stores/storyStore'
import { useMediaStore } from '../../stores/mediaStore'
import { Sparkles, CheckCircle2, Loader2, AlertCircle, ArrowRight } from 'lucide-react'

export const ReconstructionProgressModal: React.FC = () => {
  const { isReconstructing, currentStageIndex, error, hasReconstructed, moments, chapters } = useStoryStore()
  const { items } = useMediaStore()
  const [showCompletion, setShowCompletion] = useState(false)

  // Trigger completion card when reconstruction successfully wraps up
  useEffect(() => {
    if (hasReconstructed && !isReconstructing) {
      setShowCompletion(true)
    }
  }, [hasReconstructed, isReconstructing])

  if (!isReconstructing && !error && !showCompletion) return null

  const handleViewStory = () => {
    setShowCompletion(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-lg rounded-2xl bg-[#0D0F14] border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {showCompletion ? (
          // Completion Celebration View (Section 5 & 6 requirement)
          <div className="text-center py-4 space-y-6 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-[#A78BFA] mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#A78BFA] uppercase font-bold block mb-1">
                EVIDENCE-BASED RECONSTRUCTION COMPLETE
              </span>
              <h3 className="text-2xl font-bold text-[#F5F7FA]">
                Story reconstructed.
              </h3>
              <p className="text-xs text-[#9AA3B2] mt-1 max-w-sm mx-auto">
                Chronological narrative timeline has been synthesized onto the real Elah engine.
              </p>
            </div>

            {/* Metrics Breakdown (Section 5 requirement) */}
            <div className="p-4 rounded-xl bg-[#11141A] border border-white/5 grid grid-cols-3 gap-3 font-mono text-center">
              <div>
                <div className="text-xl font-bold text-emerald-400">{moments.length}</div>
                <div className="text-[10px] text-[#9AA3B2] font-sans">meaningful moments</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-300">{chapters.length}</div>
                <div className="text-[10px] text-[#9AA3B2] font-sans">chapters</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white">{items.length}</div>
                <div className="text-[10px] text-[#9AA3B2] font-sans">source assets</div>
              </div>
            </div>

            <button
              onClick={handleViewStory}
              className="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-purple-900/40 cursor-pointer flex items-center justify-center gap-2 active:scale-98"
            >
              <span>View Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          // Active 6 Sequential Reconstruction Stages
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-[#A78BFA]">
                {error ? (
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                ) : (
                  <Sparkles className="w-5 h-5 animate-pulse text-[#A78BFA]" />
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA]">
                  {error ? 'Reconstruction Interrupted' : 'Reconstructing Your Story'}
                </h3>
                <p className="text-xs text-[#9AA3B2]">
                  {error ? error : 'Synthesizing scattered captures into a chronological timeline.'}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {RECONSTRUCTION_STAGES.map((stage, idx) => {
                const isCompleted = idx < currentStageIndex
                const isCurrent = idx === currentStageIndex && !error

                return (
                  <div
                    key={stage.number}
                    className={`p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
                      isCurrent
                        ? 'bg-[#151922] border-purple-500/50 shadow-md ring-1 ring-purple-500/20'
                        : isCompleted
                        ? 'bg-[#11141A]/70 border-emerald-500/20'
                        : 'bg-[#11141A]/30 border-white/5 opacity-50'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-[#A78BFA] animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-white/20 text-[9px] font-mono text-[#687181] flex items-center justify-center">
                          0{stage.number}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold ${
                          isCurrent ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-[#687181]'
                        }`}>
                          0{stage.number} {stage.title}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-mono text-[#A78BFA] uppercase animate-pulse">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#687181] mt-0.5 leading-snug">
                        {stage.detail}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Honest Privacy Notice (Section 17) */}
            <div className="text-[11px] text-[#687181] text-center font-mono border-t border-white/5 pt-3">
              Media used for AI analysis may be sent to the configured AI service.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
