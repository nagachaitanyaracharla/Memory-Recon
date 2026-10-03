import React from 'react'
import { useStoryStore } from '../../stores/storyStore'
import { useMediaStore } from '../../stores/mediaStore'
import { Layers, Sparkles, ArrowRight, Film, Clock, Bookmark, Sliders } from 'lucide-react'

export const BeforeAfterComparison: React.FC = () => {
  const { items } = useMediaStore()
  const { moments, chapters } = useStoryStore()

  const scatteredCount = items.length || 12
  const chapterCount = chapters.length || 5
  const momentCount = moments.length || 12

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#0D0F14] to-[#151922] border border-white/10 p-6 shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-3">
        <span className="text-[10px] font-mono tracking-widest text-[#A78BFA] uppercase font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          TRANSFORMATION OVERVIEW
        </span>
        <span className="text-[11px] font-mono text-[#687181]">
          EVIDENCE-BASED SYNTHESIS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {/* BEFORE: SCATTERED */}
        <div className="md:col-span-2 p-5 rounded-xl bg-[#08090D] border border-white/5 relative group hover:border-white/20 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-[#687181] uppercase tracking-wider">
              SCATTERED
            </span>
            <span className="w-2 h-2 rounded-full bg-rose-400/60" />
          </div>

          <div className="text-3xl font-extrabold text-[#F5F7FA] font-mono mb-1">
            {scatteredCount} <span className="text-sm font-normal text-[#9AA3B2] font-sans">memories</span>
          </div>

          <p className="text-xs text-[#687181] leading-relaxed mb-4">
            Raw disconnected captures, disorganized timestamps, and scattered media files.
          </p>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#687181] pt-3 border-t border-white/5">
            <Layers className="w-3.5 h-3.5 text-[#687181]" />
            <span>Unsorted & Chaotic</span>
          </div>
        </div>

        {/* TRANSFORMATION ARROW */}
        <div className="flex flex-col items-center justify-center text-[#A78BFA] py-2 md:py-0">
          <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shadow-lg">
            <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#A78BFA] mt-1.5">
            AI RECON
          </span>
        </div>

        {/* AFTER: RECONSTRUCTED */}
        <div className="md:col-span-2 p-5 rounded-xl bg-purple-950/20 border border-purple-500/40 relative group hover:border-purple-400/60 transition-all shadow-xl shadow-purple-950/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
              RECONSTRUCTED
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono mb-3">
            <div>
              <div className="text-2xl font-extrabold text-white">{chapterCount}</div>
              <div className="text-[10px] text-purple-300/80 font-sans">chapters</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-400">{momentCount}</div>
              <div className="text-[10px] text-emerald-300/80 font-sans">moments</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#A78BFA]">1</div>
              <div className="text-[10px] text-purple-300/80 font-sans">timeline</div>
            </div>
          </div>

          <p className="text-xs text-[#9AA3B2] leading-relaxed mb-4">
            Structured narrative beats, verified evidence clusters, and frame-accurate timeline.
          </p>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 pt-3 border-t border-purple-500/20">
            <Sliders className="w-3.5 h-3.5" />
            <span>100% Deterministic & Editable</span>
          </div>
        </div>
      </div>
    </div>
  )
}
