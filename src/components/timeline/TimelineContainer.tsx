import React, { useRef } from 'react'
import { 
  Timeline, 
  TimelineRef, 
  useTimelineEngine, 
  usePlaybackStore, 
  useSelectionStore,
  useTracksStore
} from '@elah/editor'
import { useToastStore } from '../../stores/toastStore'
import { ReconstructedBanner } from './ReconstructedBanner'
import { StoryMarkersBar } from '../story/StoryMarkersBar'
import { 
  Scissors, 
  Trash2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Magnet, 
  Plus
} from 'lucide-react'

export const TimelineContainer: React.FC = () => {
  const timelineRef = useRef<TimelineRef>(null)
  const engine = useTimelineEngine()
  const { addToast } = useToastStore()

  const snapEnabled = usePlaybackStore((s) => s.snapEnabled)
  const toggleSnap = usePlaybackStore((s) => s.toggleSnap)
  const currentFrame = usePlaybackStore((s) => s.currentFrame)
  const zoom = usePlaybackStore((s) => s.zoom)
  const selectedClipIds = useSelectionStore((s) => s.selectedClipIds)
  const clearSelection = useSelectionStore((s) => s.clearSelection)
  const tracks = useTracksStore((s) => s.tracks)

  const handleSplitAtPlayhead = () => {
    if (!engine) return
    const selectedIds = Array.from(selectedClipIds)
    if (selectedIds.length === 0) {
      addToast({
        title: 'Nothing selected to split',
        description: 'Select a clip on the timeline first, then position the playhead.',
        type: 'warning',
      })
      return
    }

    let splitCount = 0
    selectedIds.forEach((clipId) => {
      for (const track of tracks) {
        const clips = engine.getClipsOnTrack(track.id) || []
        const clip = clips.find((c) => c.id === clipId)
        if (clip) {
          if (currentFrame > clip.startFrame && currentFrame < clip.startFrame + clip.durationFrames) {
            const res = engine.splitClip(clipId, track.id, currentFrame)
            if (res) splitCount++
          }
          break
        }
      }
    })

    if (splitCount > 0) {
      addToast({
        title: 'Clip Split',
        description: `Split clip at frame ${currentFrame}.`,
        type: 'success',
      })
    } else {
      addToast({
        title: 'Split could not be applied',
        description: 'Ensure the playhead intersects the selected clip.',
        type: 'info',
      })
    }
  }

  const handleDeleteSelected = () => {
    if (!engine) return
    const selectedIds = Array.from(selectedClipIds)
    if (selectedIds.length === 0) {
      addToast({
        title: 'Nothing selected',
        description: 'Select a clip on the timeline to remove it.',
        type: 'info',
      })
      return
    }

    selectedIds.forEach((clipId) => {
      for (const track of tracks) {
        const clips = engine.getClipsOnTrack(track.id) || []
        if (clips.some((c) => c.id === clipId)) {
          engine.removeClip(clipId, track.id)
          break
        }
      }
    })

    clearSelection()
    addToast({
      title: 'Clip Removed',
      description: 'Removed selected clip from the timeline.',
      type: 'info',
    })
  }

  const handleZoomIn = () => {
    if (timelineRef.current?.zoomAtAnchor) {
      timelineRef.current.zoomAtAnchor(Math.min(zoom * 1.3, 10))
    }
  }

  const handleZoomOut = () => {
    if (timelineRef.current?.zoomAtAnchor) {
      timelineRef.current.zoomAtAnchor(Math.max(zoom * 0.75, 0.1))
    }
  }

  const handleFitToWindow = () => {
    if (timelineRef.current?.fitToWindow) {
      timelineRef.current.fitToWindow()
    }
  }

  const handleAddVideoTrack = () => {
    if (!engine) return
    engine.addTrack('video', { name: `Video ${tracks.length + 1}` })
    addToast({
      title: 'Track Added',
      description: 'Added new video track.',
      type: 'info',
    })
  }

  const handleAddAudioTrack = () => {
    if (!engine) return
    engine.addTrack('audio', { name: `Audio ${tracks.length + 1}` })
    addToast({
      title: 'Track Added',
      description: 'Added new audio track.',
      type: 'info',
    })
  }

  return (
    <div className="h-[230px] xl:h-[270px] 2xl:h-[290px] bg-[#0D0F14] border-t border-white/10 flex flex-col shrink-0 select-none overflow-hidden elah-root transition-[height] duration-150">
      {/* 1. Reconstructed Status Banner (Section 16) */}
      <ReconstructedBanner />

      {/* 2. Story Markers Bar (Section 13) */}
      <StoryMarkersBar />

      {/* 3. Timeline Controls Toolbar */}
      <div className="h-8 xl:h-10 px-2 xl:px-4 bg-[#11141A] border-b border-white/5 flex items-center justify-between shrink-0 text-[11px] xl:text-xs">
        {/* Left: Edit operations */}
        <div className="flex items-center gap-1 xl:gap-1.5">
          <button
            onClick={handleSplitAtPlayhead}
            className="flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1 rounded-md text-[#9AA3B2] hover:text-[#F5F7FA] hover:bg-white/5 transition-colors cursor-pointer"
            title="Split Clip at Playhead (S)"
          >
            <Scissors className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span className="text-[11px] font-medium hidden sm:inline">Split</span>
          </button>

          <button
            onClick={handleDeleteSelected}
            className="flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1 rounded-md text-[#9AA3B2] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Delete Selected Clip (Del)"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">Delete</span>
          </button>

          <div className="w-px h-4 bg-white/10 mx-0.5 xl:mx-1" />

          {/* Snap toggle */}
          <button
            onClick={toggleSnap}
            className={`flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              snapEnabled
                ? 'bg-purple-600/20 text-[#A78BFA] border border-purple-500/30'
                : 'text-[#687181] hover:text-[#9AA3B2]'
            }`}
            title="Toggle Snapping (N)"
          >
            <Magnet className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">Snapping</span>
          </button>
        </div>

        {/* Center: Track management quick buttons */}
        <div className="flex items-center gap-1.5 xl:gap-2">
          <button
            onClick={handleAddVideoTrack}
            className="flex items-center gap-1 px-1.5 xl:px-2 py-0.5 rounded text-[10px] xl:text-[11px] text-[#9AA3B2] hover:text-white hover:bg-white/5 cursor-pointer"
            title="Add Video Track"
          >
            <Plus className="w-3 h-3 text-purple-400" />
            <span>+ Video Track</span>
          </button>
          <button
            onClick={handleAddAudioTrack}
            className="flex items-center gap-1 px-1.5 xl:px-2 py-0.5 rounded text-[10px] xl:text-[11px] text-[#9AA3B2] hover:text-white hover:bg-white/5 cursor-pointer"
            title="Add Audio Track"
          >
            <Plus className="w-3 h-3 text-emerald-400" />
            <span>+ Audio Track</span>
          </button>
        </div>

        {/* Right: Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomOut}
            className="p-1 rounded text-[#9AA3B2] hover:text-[#F5F7FA] hover:bg-white/5 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3 xl:w-3.5 h-3 xl:h-3.5" />
          </button>

          <button
            onClick={handleZoomIn}
            className="p-1 rounded text-[#9AA3B2] hover:text-[#F5F7FA] hover:bg-white/5 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3 xl:w-3.5 h-3 xl:h-3.5" />
          </button>

          <button
            onClick={handleFitToWindow}
            className="p-1 rounded text-[#9AA3B2] hover:text-[#F5F7FA] hover:bg-white/5 transition-colors cursor-pointer"
            title="Fit to Window"
          >
            <Maximize2 className="w-3 xl:w-3.5 h-3 xl:h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. REAL elah Timeline */}
      <div className="flex-1 w-full relative overflow-hidden bg-[#0A0C10]">
        <Timeline
          ref={timelineRef}
          fps={30}
          sidebarWidth={140}
          compactSidebar={false}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
