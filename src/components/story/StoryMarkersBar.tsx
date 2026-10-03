import React from 'react'
import { useStoryStore } from '../../stores/storyStore'
import { useMediaStore } from '../../stores/mediaStore'
import { usePlaybackStore, useTimelineEngine, useSelectionStore } from '@elah/editor'
import { Sparkles, Flag } from 'lucide-react'

export const StoryMarkersBar: React.FC = () => {
  const { moments, hasReconstructed, selectMoment } = useStoryStore()
  const { selectItem } = useMediaStore()
  const setCurrentFrame = usePlaybackStore((s) => s.setCurrentFrame)
  const selectClip = useSelectionStore((s) => s.selectClip)
  const engine = useTimelineEngine()

  if (!hasReconstructed || moments.length === 0) return null

  const handleMarkerClick = (momentId: string, assetId: string) => {
    selectMoment(momentId)
    selectItem(assetId)

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
    <div className="h-7 px-3 bg-[#0A0C10] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-[11px] font-mono select-none">
      <div className="flex items-center gap-1 text-[#A78BFA] shrink-0 font-semibold pr-2 border-r border-white/10">
        <Flag className="w-3 h-3" />
        <span>STORY BEATS</span>
      </div>

      <div className="flex items-center gap-1.5 flex-1 overflow-x-auto py-0.5">
        {moments.map((moment, idx) => (
          <button
            key={moment.id}
            onClick={() => handleMarkerClick(moment.id, moment.assetId)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#151922] hover:bg-purple-900/30 border border-purple-500/20 text-[#F5F7FA] hover:text-purple-200 transition-colors shrink-0 cursor-pointer group"
            title={`Jump to ${moment.title} (Importance: ${moment.importanceScore}/10)`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:scale-125 transition-transform" />
            <span className="truncate max-w-[120px]">{idx + 1}. {moment.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
