import React, { useState } from 'react'
import { useStoryStore } from '../../stores/storyStore'
import { useMediaStore } from '../../stores/mediaStore'
import { usePlaybackStore, useTimelineEngine, useSelectionStore } from '@elah/editor'
import { useWorkspaceStore } from '../../stores/workspaceStore'
import { formatDuration } from '../../lib/utils/format'
import { BeforeAfterComparison } from './BeforeAfterComparison'
import { 
  Sparkles, 
  Bookmark, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Film,
  AlertTriangle,
  Play
} from 'lucide-react'

export const StoryOverview: React.FC = () => {
  const { 
    summary, 
    chapters, 
    moments, 
    evidence, 
    missingMoments, 
    selectedMomentId, 
    selectMoment,
    selectedChapterId,
    selectChapter
  } = useStoryStore()

  const { items, selectItem } = useMediaStore()
  const { setInspectorTab } = useWorkspaceStore()
  const setCurrentFrame = usePlaybackStore((s) => s.setCurrentFrame)
  const selectClip = useSelectionStore((s) => s.selectClip)
  const engine = useTimelineEngine()

  const [activeTab, setActiveTab] = useState<'chapters' | 'moments' | 'evidence' | 'missing'>('chapters')

  const handleJumpToMoment = (momentId: string, assetId: string) => {
    selectMoment(momentId)
    selectItem(assetId)
    setInspectorTab('story')

    // Find the clip on Elah timeline corresponding to this asset
    if (engine) {
      const tracks = engine.getProject()?.tracks || []
      for (const track of tracks) {
        const clips = engine.getClipsOnTrack(track.id) || []
        const matched = clips.find((c: any) => c.name?.includes(assetId) || c.id?.includes(assetId))
        if (matched) {
          setCurrentFrame(matched.startFrame)
          selectClip(matched.id)
          break
        }
      }
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#08090D] overflow-y-auto p-5 space-y-6">
      {/* 1. YOUR STORY Header Summary (Section 12) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#11141A] to-[#151922] border border-purple-500/25 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-[#A78BFA] uppercase font-bold">
            YOUR RECONSTRUCTED STORY
          </span>
        </div>
        <p className="text-sm font-medium text-[#F5F7FA] leading-relaxed">
          {summary || 'Your memories have been synthesized into a structured narrative arc.'}
        </p>

        {/* Narrative Metrics */}
        <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-3 font-mono text-xs">
          <div>
            <span className="text-[10px] text-[#687181] uppercase block">Chapters</span>
            <span className="text-purple-300 font-bold text-sm">{chapters.length}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#687181] uppercase block">Moments</span>
            <span className="text-emerald-300 font-bold text-sm">{moments.length}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#687181] uppercase block">Evidence Clues</span>
            <span className="text-blue-300 font-bold text-sm">{evidence.length}</span>
          </div>
        </div>
      </div>

      {/* 2. Before / After Visual Transformation (Section 8) */}
      <BeforeAfterComparison />

      {/* 3. Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('chapters')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'chapters'
              ? 'bg-[#151922] text-[#F5F7FA] border border-white/10 shadow-sm'
              : 'text-[#687181] hover:text-[#9AA3B2]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 text-purple-400" />
          <span>Chapters ({chapters.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('moments')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'moments'
              ? 'bg-[#151922] text-[#F5F7FA] border border-white/10 shadow-sm'
              : 'text-[#687181] hover:text-[#9AA3B2]'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Meaningful Moments ({moments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('evidence')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'evidence'
              ? 'bg-[#151922] text-[#F5F7FA] border border-white/10 shadow-sm'
              : 'text-[#687181] hover:text-[#9AA3B2]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Evidence ({evidence.length})</span>
        </button>

        {missingMoments.length > 0 && (
          <button
            onClick={() => setActiveTab('missing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'missing'
                ? 'bg-[#151922] text-[#F5F7FA] border border-amber-500/30 shadow-sm'
                : 'text-amber-400/80 hover:text-amber-300'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Missing Gaps ({missingMoments.length})</span>
          </button>
        )}
      </div>

      {/* Tab: CHAPTERS (Section 10 & 12) */}
      {activeTab === 'chapters' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
          {chapters.map((chap, idx) => {
            const isSelected = selectedChapterId === chap.id
            return (
              <div
                key={chap.id}
                onClick={() => selectChapter(chap.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#151922] border-purple-500/60 ring-1 ring-purple-500/30'
                    : 'bg-[#0D0F14] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#A78BFA] uppercase mb-1">
                    <span>Chapter 0{idx + 1}</span>
                    <span>{chap.momentCount} moments</span>
                  </div>
                  <h4 className="text-base font-bold text-[#F5F7FA] mb-2">{chap.title}</h4>
                  <p className="text-xs text-[#9AA3B2] leading-relaxed mb-4">
                    {chap.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#687181]">
                  <span>Duration</span>
                  <span className="text-[#F5F7FA] font-medium">{formatDuration(chap.durationSeconds)}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tab: MEANINGFUL MOMENTS (Section 7, 8, 9, 12) */}
      {activeTab === 'moments' && (
        <div className="space-y-4 animate-fadeIn">
          {moments.map((moment) => {
            const isSelected = selectedMomentId === moment.id
            const matchedAsset = items.find((i) => i.id === moment.assetId)

            return (
              <div
                key={moment.id}
                onClick={() => handleJumpToMoment(moment.id, moment.assetId)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#151922] border-purple-500 ring-1 ring-purple-500/40 shadow-lg'
                    : 'bg-[#0D0F14] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col md:flex-row items-start gap-4">
                  {/* Thumbnail snippet */}
                  <div className="w-28 aspect-video rounded-lg bg-[#08090D] overflow-hidden shrink-0 border border-white/5 flex items-center justify-center">
                    {matchedAsset?.thumbnailUrl ? (
                      <img src={matchedAsset.thumbnailUrl} alt={moment.title} className="w-full h-full object-cover" />
                    ) : (
                      <Film className="w-6 h-6 text-[#687181]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-[#F5F7FA] truncate">{moment.title}</h4>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 font-semibold">
                          Score {moment.importanceScore}/10
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                          {moment.confidence}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#9AA3B2] mb-3 leading-relaxed">
                      {moment.description}
                    </p>

                    {/* WHY THIS MATTERS (Section 7 & 9 requirement) */}
                    <div className="p-3 rounded-lg bg-[#11141A] border border-purple-500/20 mb-3">
                      <span className="text-[10px] font-mono font-bold text-purple-300 uppercase block mb-1">
                        WHY THIS MATTERS
                      </span>
                      <p className="text-xs text-[#F5F7FA] leading-relaxed">
                        {moment.whyItMatters}
                      </p>
                    </div>

                    {/* EVIDENCE SUMMARY (Section 7 & 9 requirement) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-[#687181] mb-3">
                      <div className="bg-[#08090D] p-2 rounded border border-white/5">
                        <span className="block text-gray-500">TIMESTAMP</span>
                        <span className="text-gray-300 truncate block">{moment.evidenceSummary.timestampClue}</span>
                      </div>
                      <div className="bg-[#08090D] p-2 rounded border border-white/5">
                        <span className="block text-gray-500">CONTINUITY</span>
                        <span className="text-gray-300 truncate block">{moment.evidenceSummary.visualContinuity}</span>
                      </div>
                      <div className="bg-[#08090D] p-2 rounded border border-white/5">
                        <span className="block text-gray-500">SIMILARITY</span>
                        <span className="text-gray-300 truncate block">{moment.evidenceSummary.sceneSimilarity}</span>
                      </div>
                      <div className="bg-[#08090D] p-2 rounded border border-white/5">
                        <span className="block text-gray-500">METADATA</span>
                        <span className="text-gray-300 truncate block">{moment.evidenceSummary.metadata}</span>
                      </div>
                    </div>

                    {/* JUMP TO TIMELINE BUTTON (Section 7 requirement) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleJumpToMoment(moment.id, moment.assetId)
                      }}
                      className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/30 text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
                    >
                      <Play className="w-3 h-3 text-purple-400" />
                      <span>Jump to Timeline</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tab: EVIDENCE LIST (Section 6 & 12) */}
      {activeTab === 'evidence' && (
        <div className="space-y-3 animate-fadeIn">
          {evidence.map((ev) => (
            <div key={ev.id} className="p-4 rounded-xl bg-[#0D0F14] border border-white/10 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[#F5F7FA]">{ev.filename}</span>
                <span className="text-[10px] font-mono uppercase text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded">
                  {ev.type} · Relevance {ev.storyRelevance}/10
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-[#9AA3B2] bg-[#11141A] p-3 rounded-lg border border-white/5">
                <div>
                  <span className="text-[10px] text-[#687181] font-mono block">Environment:</span>
                  <span className="text-[#F5F7FA]">{ev.analysis.environment}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#687181] font-mono block">Activities:</span>
                  <span className="text-[#F5F7FA]">{ev.analysis.activities.join(', ') || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#687181] font-mono block">Audio Status:</span>
                  <span className="text-emerald-400">{ev.audioTranscript}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: POSSIBLE MISSING MOMENT (Section 14) */}
      {activeTab === 'missing' && (
        <div className="space-y-4 animate-fadeIn">
          {missingMoments.map((gap) => (
            <div key={gap.id} className="p-5 rounded-xl bg-[#151922] border border-amber-500/40 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  POSSIBLE MISSING MOMENT
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 ml-auto font-bold">
                  {gap.label}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#F5F7FA] mb-1">{gap.title}</h4>
              <p className="text-xs text-[#9AA3B2] mb-3">"{gap.description}"</p>
              <div className="p-3 rounded-lg bg-[#0D0F14] border border-white/5 text-xs text-[#687181] font-mono">
                <span className="text-gray-400 block mb-0.5 font-sans">EVIDENCE & INFERENCE:</span>
                {gap.inferenceReason}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
