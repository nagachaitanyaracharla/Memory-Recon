import React from 'react'
import type { MediaItem } from '../../types'
import { formatBytes, formatDuration } from '../../lib/utils/format'
import { useMediaStore } from '../../stores/mediaStore'
import { useToastStore } from '../../stores/toastStore'
import { useTimelineEngine, useTracksStore } from '@elah/editor'
import { 
  Image as ImageIcon, 
  Video, 
  Music, 
  Layers, 
  Trash2, 
  PlusCircle, 
  CheckCircle,
  Eye
} from 'lucide-react'

interface MediaCardProps {
  item: MediaItem
}

export const MediaCard: React.FC<MediaCardProps> = ({ item }) => {
  const { selectedItemId, selectItem, removeMediaItem } = useMediaStore()
  const { addToast } = useToastStore()
  const engine = useTimelineEngine()
  const tracks = useTracksStore((s) => s.tracks)
  const isSelected = selectedItemId === item.id

  const getMediaIcon = () => {
    switch (item.type) {
      case 'video':
        return <Video className="w-3.5 h-3.5 text-blue-400" />
      case 'audio':
        return <Music className="w-3.5 h-3.5 text-emerald-400" />
      case 'screenshot':
        return <Layers className="w-3.5 h-3.5 text-amber-400" />
      case 'image':
      default:
        return <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
    }
  }

  const handleAddToTimeline = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!engine) {
      addToast({
        title: 'Timeline engine not ready',
        type: 'error',
      })
      return
    }

    // Determine appropriate track
    let targetTrack = tracks.find((t) => 
      item.type === 'audio' ? t.kind === 'audio' : t.kind === 'video'
    )

    if (!targetTrack && tracks.length > 0) {
      targetTrack = tracks[0]
    }

    if (!targetTrack) {
      addToast({
        title: 'No available track',
        description: 'Please add a track to the timeline first.',
        type: 'warning',
      })
      return
    }

    // Calculate startFrame at end of existing clips on that track
    const clipsOnTrack = engine.getClipsOnTrack(targetTrack.id) || []
    let nextStartFrame = 0
    clipsOnTrack.forEach((c) => {
      const end = c.startFrame + c.durationFrames
      if (end > nextStartFrame) nextStartFrame = end
    })

    const fps = 30
    // Duration in integer frames
    const durationFrames = item.durationSeconds
      ? Math.max(30, Math.round(item.durationSeconds * fps))
      : 90 // 3 seconds default for photos

    try {
      if (item.type === 'video') {
        engine.addClip({
          type: 'video',
          trackId: targetTrack.id,
          startFrame: nextStartFrame,
          durationFrames,
          src: item.url,
          name: item.name,
        })
      } else if (item.type === 'audio') {
        engine.addClip({
          type: 'audio',
          trackId: targetTrack.id,
          startFrame: nextStartFrame,
          durationFrames,
          src: item.url,
          name: item.name,
        })
      } else {
        // image or screenshot
        engine.addClip({
          type: 'image',
          trackId: targetTrack.id,
          startFrame: nextStartFrame,
          durationFrames,
          src: item.url,
          name: item.name,
        })
      }

      addToast({
        title: 'Added to Timeline',
        description: `Placed "${item.name}" at frame ${nextStartFrame} (${targetTrack.name}).`,
        type: 'success',
      })
    } catch (err) {
      addToast({
        title: 'Unable to insert clip',
        description: 'Check track compatibility and media source.',
        type: 'error',
      })
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    removeMediaItem(item.id)
    addToast({
      title: 'Memory Removed',
      description: `Removed "${item.name}".`,
      type: 'info',
    })
  }

  return (
    <div
      onClick={() => selectItem(item.id)}
      className={`group relative rounded-xl bg-[#11141A] border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col ${
        isSelected
          ? 'border-purple-500 ring-1 ring-purple-500/40 shadow-lg shadow-purple-950/20'
          : 'border-white/10 hover:border-white/20 hover:scale-[1.01]'
      }`}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video w-full bg-[#08090D] overflow-hidden flex items-center justify-center">
        {item.type === 'audio' ? (
          // Audio Waveform-style visual placeholder (Section 16 requirement)
          <div className="w-full h-full p-4 flex items-center justify-center bg-gradient-to-br from-emerald-950/30 to-[#08090D]">
            <div className="flex items-center gap-1 h-12 w-full justify-center">
              {[40, 65, 80, 50, 95, 70, 45, 85, 60, 90, 75, 55, 80, 40, 70, 85, 60, 40].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-emerald-400/60 rounded-full"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        ) : item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#687181]">
            {getMediaIcon()}
          </div>
        )}

        {/* Small selection indicator (Section 16) */}
        {isSelected && (
          <div className="absolute top-2 left-2 bg-purple-600 rounded-full p-0.5 shadow-md">
            <CheckCircle className="w-3.5 h-3.5 text-white" />
          </div>
        )}

        {/* Duration badge where applicable */}
        {item.durationSeconds !== undefined && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[10px] font-mono text-[#F5F7FA]">
            {formatDuration(item.durationSeconds)}
          </div>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-2">
          <button
            onClick={handleAddToTimeline}
            className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md active:scale-90"
            title="Add to Timeline"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              selectItem(item.id)
            }}
            className="p-2 rounded-lg bg-[#151922] hover:bg-white/10 text-white transition-all active:scale-90"
            title="Inspect"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-[#151922] hover:bg-rose-500/20 text-rose-400 transition-all active:scale-90"
            title="Delete Memory"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-medium text-[#F5F7FA] truncate flex-1" title={item.name}>
            {item.name}
          </p>
          <div className="shrink-0 mt-0.5">{getMediaIcon()}</div>
        </div>

        <div className="mt-2 flex items-center justify-between text-[10px] text-[#687181] font-mono">
          <span className="uppercase">{item.type}</span>
          <span>{formatBytes(item.size)}</span>
        </div>
      </div>
    </div>
  )
}
