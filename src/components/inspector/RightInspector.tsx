import React from 'react'
import { useMediaStore } from '../../stores/mediaStore'
import { useWorkspaceStore } from '../../stores/workspaceStore'
import { useStoryStore } from '../../stores/storyStore'
import { formatBytes, formatDuration } from '../../lib/utils/format'
import { usePlaybackStore, useTimelineEngine, useSelectionStore } from '@elah/editor'
import { 
  Info, 
  Sparkles, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Calendar, 
  Maximize2, 
  Clock, 
  CheckCircle2, 
  Bookmark,
  Play
} from 'lucide-react'

export const RightInspector: React.FC = () => {
  const { items, selectedItemId } = useMediaStore()
  const { inspectorTab, setInspectorTab } = useWorkspaceStore()
  const { moments, selectedMomentId, hasReconstructed, summary, chapters } = useStoryStore()

  const selectedItem = items.find((i) => i.id === selectedItemId)
  const selectedMoment = moments.find((m) => m.id === selectedMomentId || m.assetId === selectedItemId)
  const engine = useTimelineEngine()
  const setCurrentFrame = usePlaybackStore((s) => s.setCurrentFrame)
  const selectClip = useSelectionStore((s) => s.selectClip)

  return (
    <aside className="w-[240px] xl:w-[290px] 2xl:w-[310px] bg-[#0D0F14] border-l border-white/10 flex flex-col shrink-0 select-none overflow-y-auto transition-[width] duration-150">
      {/* Tab Switcher */}
      <div className="flex border-b border-white/5 p-1.5 xl:p-2 gap-1 bg-[#08090D]/50">
        <button
          onClick={() => setInspectorTab('inspect')}
          className={`flex-1 py-1 xl:py-1.5 rounded-lg text-[11px] xl:text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1 xl:gap-1.5 ${
            inspectorTab === 'inspect'
              ? 'bg-[#151922] text-[#F5F7FA] border border-white/10 shadow-sm'
              : 'text-[#687181] hover:text-[#9AA3B2]'
          }`}
        >
          <Info className="w-3 xl:w-3.5 h-3 xl:h-3.5" />
          <span>INSPECT</span>
        </button>

        <button
          onClick={() => setInspectorTab('story')}
          className={`flex-1 py-1 xl:py-1.5 rounded-lg text-[11px] xl:text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1 xl:gap-1.5 ${
            inspectorTab === 'story'
              ? 'bg-[#151922] text-[#F5F7FA] border border-white/10 shadow-sm'
              : 'text-[#687181] hover:text-[#9AA3B2]'
          }`}
        >
          <Sparkles className="w-3 xl:w-3.5 h-3 xl:h-3.5 text-[#A78BFA]" />
          <span>STORY</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-2.5 xl:p-4 flex-1">
        {inspectorTab === 'inspect' ? (
          <div>
            {!selectedItem ? (
              // Empty selection state (Section 21 requirement)
              <div className="h-64 flex flex-col items-center justify-center text-center text-[#687181] p-4">
                <Info className="w-8 h-8 mb-2 opacity-40" />
                <p className="text-xs font-medium text-[#9AA3B2]">
                  Select a memory to inspect it.
                </p>
                <p className="text-[11px] text-[#687181] mt-1">
                  Click any card in the media workspace or timeline.
                </p>
              </div>
            ) : (
              <div className="space-y-5 animate-fadeIn">
                {/* Media Preview Thumbnail in Inspector */}
                <div className="rounded-xl overflow-hidden bg-[#08090D] border border-white/10 aspect-video flex items-center justify-center relative">
                  {selectedItem.type === 'audio' ? (
                    <div className="flex flex-col items-center gap-2 text-emerald-400">
                      <Music className="w-8 h-8" />
                      <span className="text-[10px] font-mono">Audio Stream</span>
                    </div>
                  ) : selectedItem.thumbnailUrl ? (
                    <img
                      src={selectedItem.thumbnailUrl}
                      alt={selectedItem.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-[#687181]">
                      {selectedItem.type === 'video' ? <Video className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
                    </div>
                  )}
                </div>

                {/* Metadata Details */}
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-[#687181] uppercase block mb-1">Filename</span>
                    <p className="text-[#F5F7FA] font-sans font-medium text-xs break-all bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                      {selectedItem.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                      <span className="text-[10px] text-[#687181] uppercase block mb-0.5">Type</span>
                      <span className="text-purple-300 font-semibold uppercase text-xs">
                        {selectedItem.type}
                      </span>
                    </div>
                    <div className="bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                      <span className="text-[10px] text-[#687181] uppercase block mb-0.5">File Size</span>
                      <span className="text-[#F5F7FA] text-xs">
                        {formatBytes(selectedItem.size)}
                      </span>
                    </div>
                  </div>

                  {/* Image/Screenshot: Dimensions */}
                  {(selectedItem.type === 'image' || selectedItem.type === 'screenshot') && (
                    <div className="bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                      <span className="text-[10px] text-[#687181] uppercase block mb-0.5">Dimensions</span>
                      <span className="text-[#F5F7FA] text-xs flex items-center gap-1.5">
                        <Maximize2 className="w-3 h-3 text-[#A78BFA]" />
                        {selectedItem.width && selectedItem.height
                          ? `${selectedItem.width} × ${selectedItem.height} px`
                          : '1920 × 1080 px'}
                      </span>
                    </div>
                  )}

                  {/* Video specific: Duration & Resolution */}
                  {selectedItem.type === 'video' && (
                    <>
                      <div className="bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                        <span className="text-[10px] text-[#687181] uppercase block mb-0.5">Duration</span>
                        <span className="text-[#F5F7FA] text-xs flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-blue-400" />
                          {formatDuration(selectedItem.durationSeconds)} ({Math.round((selectedItem.durationSeconds || 0) * 30)}f @ 30fps)
                        </span>
                      </div>
                      <div className="bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                        <span className="text-[10px] text-[#687181] uppercase block mb-0.5">Resolution</span>
                        <span className="text-[#F5F7FA] text-xs flex items-center gap-1.5">
                          <Maximize2 className="w-3 h-3 text-blue-400" />
                          {selectedItem.width && selectedItem.height
                            ? `${selectedItem.width} × ${selectedItem.height} px`
                            : '1920 × 1080 px'}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Audio specific: Duration */}
                  {selectedItem.type === 'audio' && (
                    <div className="bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                      <span className="text-[10px] text-[#687181] uppercase block mb-0.5">Duration</span>
                      <span className="text-emerald-300 text-xs flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        {formatDuration(selectedItem.durationSeconds)}
                      </span>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                    <span className="text-[10px] text-[#687181] uppercase block mb-0.5">Timestamp</span>
                    <span className="text-[#9AA3B2] text-[11px] flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#687181]" />
                      {new Date(selectedItem.dateModified).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // STORY tab (Section 9 & Stage 2 implementation)
          <div className="space-y-4 animate-fadeIn">
            {selectedMoment ? (
              // Selected Moment Details
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-[#11141A] border border-purple-500/30">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono text-[#A78BFA] uppercase font-bold">
                      SELECTED MOMENT
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                      {selectedMoment.confidence}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#F5F7FA]">{selectedMoment.title}</h4>
                  <p className="text-xs text-[#9AA3B2] mt-1">{selectedMoment.description}</p>
                </div>

                {/* WHY THIS MATTERS (Section 9 Requirement) */}
                <div className="p-3.5 rounded-xl bg-[#151922] border border-purple-500/40 shadow-sm">
                  <span className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider block mb-1">
                    WHY THIS MATTERS
                  </span>
                  <p className="text-xs text-[#F5F7FA] leading-relaxed">
                    {selectedMoment.whyItMatters}
                  </p>
                </div>

                {/* EVIDENCE (Section 9 Requirement) */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#687181] font-bold block">
                    EVIDENCE
                  </span>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                      <span className="text-[9px] text-[#687181] block">Timestamp</span>
                      <span className="text-gray-300 text-[11px]">{selectedMoment.evidenceSummary.timestampClue}</span>
                    </div>
                    <div className="bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                      <span className="text-[9px] text-[#687181] block">Visual Continuity</span>
                      <span className="text-gray-300 text-[11px]">{selectedMoment.evidenceSummary.visualContinuity}</span>
                    </div>
                    <div className="bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                      <span className="text-[9px] text-[#687181] block">Scene Similarity</span>
                      <span className="text-gray-300 text-[11px]">{selectedMoment.evidenceSummary.sceneSimilarity}</span>
                    </div>
                    <div className="bg-[#11141A] p-2.5 rounded-lg border border-white/5">
                      <span className="text-[9px] text-[#687181] block">Metadata</span>
                      <span className="text-gray-300 text-[11px]">{selectedMoment.evidenceSummary.metadata}</span>
                    </div>
                  </div>
                </div>

                {/* JUMP TO TIMELINE (Section 7 requirement) */}
                <button
                  onClick={() => {
                    if (engine) {
                      const tracks = engine.getProject()?.tracks || []
                      for (const track of tracks) {
                        const clips = engine.getClipsOnTrack(track.id) || []
                        const matched = clips.find((c: any) => c.name?.includes(selectedMoment.assetId) || c.id?.includes(selectedMoment.assetId))
                        if (matched) {
                          setCurrentFrame(matched.startFrame)
                          selectClip(matched.id)
                          break
                        }
                      }
                    }
                  }}
                  className="w-full h-8 xl:h-10 rounded-lg xl:rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[11px] xl:text-xs font-semibold flex items-center justify-center gap-1.5 xl:gap-2 transition-all shadow-md shadow-purple-900/30 cursor-pointer active:scale-98"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Jump to Timeline</span>
                </button>
              </div>
            ) : hasReconstructed ? (
              // Reconstructed Story High-Level
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-[#11141A] border border-white/5">
                  <span className="text-[10px] font-mono text-[#A78BFA] uppercase font-bold block mb-1">
                    STORY SUMMARY
                  </span>
                  <p className="text-xs text-[#9AA3B2] leading-relaxed">{summary}</p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#687181] block mb-2">
                    CHAPTERS
                  </span>
                  <div className="space-y-1.5">
                    {chapters.map((c) => (
                      <div key={c.id} className="p-2 rounded bg-[#11141A] border border-white/5 text-xs">
                        <div className="font-semibold text-white">{c.title}</div>
                        <div className="text-[10px] text-[#687181]">{c.momentCount} moments</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Story not reconstructed yet
              <div className="p-5 rounded-xl bg-[#11141A] border border-white/5 text-center text-xs space-y-2 text-[#687181]">
                <Sparkles className="w-6 h-6 text-purple-400 mx-auto" />
                <p className="text-sm font-semibold text-[#F5F7FA]">No Story Reconstructed</p>
                <p className="text-[11px] leading-relaxed">
                  Click "Reconstruct Story" in the workspace to discover moments, evidence, and narrative chapters.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
