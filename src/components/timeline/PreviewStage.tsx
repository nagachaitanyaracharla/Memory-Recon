import React, { useRef, useMemo } from 'react'
import { Preview, createDefaultDemuxerFactory, usePlaybackStore, useTracksStore } from '@elah/editor'
import { formatTimecode } from '../../lib/utils/format'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Maximize, 
  Volume2, 
  VolumeX 
} from 'lucide-react'

// Demuxer factory created once at module scope to avoid re-instantiation (Section 25)
const demuxerFactory = createDefaultDemuxerFactory()

export const PreviewStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Use narrow selectors to avoid re-renders (Section 25 / Official Elah guidelines)
  const isPlaying = usePlaybackStore((s) => s.isPlaying)
  const currentFrame = usePlaybackStore((s) => s.currentFrame)
  const togglePlayPause = usePlaybackStore((s) => s.togglePlayPause)
  const setCurrentFrame = usePlaybackStore((s) => s.setCurrentFrame)
  const totalFrames = useTracksStore((s) => s.totalFrames)
  const muted = usePlaybackStore((s) => s.muted)
  const toggleMute = usePlaybackStore((s) => s.toggleMute)

  const handleSkipBack = () => {
    // Jump 1 second (30 frames) back or to start
    setCurrentFrame(Math.max(0, currentFrame - 30))
  }

  const handleSkipForward = () => {
    // Jump 1 second forward or to end
    setCurrentFrame(Math.min(totalFrames || 300, currentFrame + 30))
  }

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  const fps = 30
  const durationFrames = Math.max(totalFrames, 300) // minimum timeline length

  return (
    <div 
      ref={containerRef}
      className="flex-1 bg-[#08090D] flex flex-col items-center justify-between p-2 xl:p-4 overflow-hidden relative"
    >
      {/* Top stage header */}
      <div className="w-full flex items-center justify-between px-1.5 pb-1 text-[10px] xl:text-[11px] font-mono text-[#687181]">
        <div className="flex items-center gap-1.5 xl:gap-2">
          <span className="w-1.5 xl:w-2 h-1.5 xl:h-2 rounded-full bg-purple-400" />
          <span className="text-[#9AA3B2]">STAGE · 1920 × 1080 (16:9)</span>
        </div>
        <span className="bg-[#11141A] px-1.5 xl:px-2 py-0.5 rounded border border-white/5 text-[#A78BFA]">
          30 FPS · WebGL2 Canvas
        </span>
      </div>

      {/* 16:9 Centered Stage with Real Elah Preview */}
      <div className="flex-1 w-full max-w-4xl flex items-center justify-center min-h-0 py-1 xl:py-2">
        <div className="w-full h-full max-h-[460px] aspect-video rounded-xl bg-[#0B0D12] border border-white/10 shadow-2xl relative overflow-hidden flex items-center justify-center group">
          {/* REAL elah Preview WebGL2 canvas */}
          <Preview
            demuxerFactory={demuxerFactory}
            enableAudio={true}
            clearColor={[0.04, 0.05, 0.07, 1]}
            className="w-full h-full object-contain"
          />

          {/* Quick Play overlay when paused and hovered */}
          {!isPlaying && (
            <button
              onClick={togglePlayPause}
              className="absolute inset-0 m-auto w-12 xl:w-14 h-12 xl:h-14 rounded-full bg-purple-600/80 hover:bg-purple-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl backdrop-blur-sm cursor-pointer scale-95 hover:scale-105"
              aria-label="Play"
            >
              <Play className="w-5 xl:w-6 h-5 xl:h-6 ml-0.5" />
            </button>
          )}
        </div>
      </div>

      {/* Center Playback Controls Bar (Section 19 requirements) */}
      <div className="w-full max-w-xl h-9 xl:h-11 px-2.5 xl:px-4 rounded-xl bg-[#11141A]/90 border border-white/10 backdrop-blur-md flex items-center justify-between shadow-lg">
        {/* Left: Previous / Play / Next */}
        <div className="flex items-center gap-1 xl:gap-2">
          <button
            onClick={handleSkipBack}
            className="p-1 xl:p-1.5 rounded-lg text-[#9AA3B2] hover:text-[#F5F7FA] hover:bg-white/5 transition-colors cursor-pointer"
            title="Previous (1s / 30f back)"
            aria-label="Skip Back"
          >
            <SkipBack className="w-3.5 xl:w-4 h-3.5 xl:h-4" />
          </button>

          <button
            onClick={togglePlayPause}
            className="w-7 xl:w-8 h-7 xl:h-8 rounded-lg bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-purple-900/30 active:scale-95"
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 xl:w-4 h-3.5 xl:h-4" /> : <Play className="w-3.5 xl:w-4 h-3.5 xl:h-4 ml-0.5" />}
          </button>

          <button
            onClick={handleSkipForward}
            className="p-1 xl:p-1.5 rounded-lg text-[#9AA3B2] hover:text-[#F5F7FA] hover:bg-white/5 transition-colors cursor-pointer"
            title="Next (1s / 30f forward)"
            aria-label="Skip Forward"
          >
            <SkipForward className="w-3.5 xl:w-4 h-3.5 xl:h-4" />
          </button>
        </div>

        {/* Center: Timecode & Duration */}
        <div className="flex items-center gap-1 xl:gap-1.5 font-mono text-[11px] xl:text-xs text-[#9AA3B2] bg-[#0D0F14] px-2 xl:px-3 py-0.5 xl:py-1 rounded-lg border border-white/5">
          <span className="text-[#F5F7FA] font-medium">
            {formatTimecode(currentFrame, fps)}
          </span>
          <span className="text-[#687181]">/</span>
          <span>{formatTimecode(durationFrames, fps)}</span>
          <span className="text-[9px] xl:text-[10px] text-purple-400/80 ml-0.5 xl:ml-1 hidden sm:inline">
            (F{currentFrame})
          </span>
        </div>

        {/* Right: Audio mute toggle & Fullscreen */}
        <div className="flex items-center gap-1 xl:gap-1.5">
          <button
            onClick={toggleMute}
            className="p-1 xl:p-1.5 rounded-lg text-[#9AA3B2] hover:text-[#F5F7FA] hover:bg-white/5 transition-colors cursor-pointer"
            title={muted ? 'Unmute' : 'Mute'}
            aria-label="Toggle mute"
          >
            {muted ? <VolumeX className="w-3.5 xl:w-4 h-3.5 xl:h-4 text-rose-400" /> : <Volume2 className="w-3.5 xl:w-4 h-3.5 xl:h-4" />}
          </button>

          <button
            onClick={handleToggleFullscreen}
            className="p-1 xl:p-1.5 rounded-lg text-[#9AA3B2] hover:text-[#F5F7FA] hover:bg-white/5 transition-colors cursor-pointer"
            title="Fullscreen"
            aria-label="Toggle fullscreen"
          >
            <Maximize className="w-3.5 xl:w-4 h-3.5 xl:h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
