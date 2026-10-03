import React, { useState, useEffect } from 'react'
import { Logo } from '../common/Logo'
import { useWorkspaceStore } from '../../stores/workspaceStore'
import { useToastStore } from '../../stores/toastStore'
import { useMediaStore } from '../../stores/mediaStore'
import { useTimelineEngine, useTracksStore, usePlaybackStore, useSelectionStore } from '@elah/editor'
import { ExportModal } from '../modals/ExportModal'
import { ShortcutsModal } from '../modals/ShortcutsModal'
import { 
  Undo2, 
  Redo2, 
  Save, 
  Download, 
  ArrowLeft, 
  Edit2, 
  Check, 
  Sparkles, 
  HelpCircle 
} from 'lucide-react'

interface TopBarProps {
  onBackToLanding: () => void
}

export const TopBar: React.FC<TopBarProps> = ({ onBackToLanding }) => {
  const { projectName, setProjectName, isSaved, setIsSaved } = useWorkspaceStore()
  const { addToast } = useToastStore()
  const { loadSampleMemories } = useMediaStore()
  
  // Elah engine and stores
  const engine = useTimelineEngine()
  const canUndo = useTracksStore((s) => s.canUndo)
  const canRedo = useTracksStore((s) => s.canRedo)
  const togglePlayPause = usePlaybackStore((s) => s.togglePlayPause)
  const currentFrame = usePlaybackStore((s) => s.currentFrame)
  const selectedClipIds = useSelectionStore((s) => s.selectedClipIds)
  const clearSelection = useSelectionStore((s) => s.clearSelection)
  const tracks = useTracksStore((s) => s.tracks)

  const [isEditingName, setIsEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(projectName)
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setProjectName(nameInput.trim())
      addToast({
        title: 'Project Renamed',
        description: `Project renamed to "${nameInput.trim()}".`,
        type: 'info',
      })
    } else {
      setNameInput(projectName)
    }
    setIsEditingName(false)
  }

  const handleSave = () => {
    setIsSaved(true)
    addToast({
      title: 'Project Saved',
      description: 'Timeline and project manifest stored locally in browser storage.',
      type: 'success',
    })
  }

  const handleUndo = () => {
    if (canUndo && engine) {
      engine.undo()
      addToast({
        title: 'Undo',
        description: 'Previous action reverted on timeline.',
        type: 'info',
      })
    }
  }

  const handleRedo = () => {
    if (canRedo && engine) {
      engine.redo()
      addToast({
        title: 'Redo',
        description: 'Action reapplied on timeline.',
        type: 'info',
      })
    }
  }

  const handleTryDemo = () => {
    loadSampleMemories()
    setProjectName('Future Builders Day')
    addToast({
      title: 'Demo Loaded: Future Builders Day',
      description: 'Loaded 12 memories spanning Arrival, Workshop, Team Interaction, Demo, and Closing.',
      type: 'success',
    })
  }

  // Global Keyboard Shortcuts (Section 10)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return
      }

      // Space: Play / Pause
      if (e.code === 'Space') {
        e.preventDefault()
        togglePlayPause()
      }

      // S: Split clip at playhead
      if (e.key === 's' || e.key === 'S') {
        if (!e.ctrlKey && !e.metaKey && engine) {
          const selectedIds = Array.from(selectedClipIds)
          if (selectedIds.length > 0) {
            e.preventDefault()
            selectedIds.forEach((clipId) => {
              for (const track of tracks) {
                const clips = engine.getClipsOnTrack(track.id) || []
                const clip = clips.find((c) => c.id === clipId)
                if (clip && currentFrame > clip.startFrame && currentFrame < clip.startFrame + clip.durationFrames) {
                  engine.splitClip(clipId, track.id, currentFrame)
                  break
                }
              }
            })
            addToast({ title: 'Clip Split (S)', type: 'info' })
          }
        }
      }

      // Delete / Backspace: Delete selected
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const selectedIds = Array.from(selectedClipIds)
        if (selectedIds.length > 0 && engine) {
          e.preventDefault()
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
          addToast({ title: 'Clip Removed (Del)', type: 'info' })
        }
      }

      // Ctrl/Cmd + Z: Undo / Redo
      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault()
        if (e.shiftKey) {
          if (canRedo && engine) engine.redo()
        } else {
          if (canUndo && engine) engine.undo()
        }
      }

      // ?: Help shortcuts
      if (e.key === '?') {
        e.preventDefault()
        setIsShortcutsOpen(true)
      }

      // Esc: Dismiss modals
      if (e.key === 'Escape') {
        setIsExportOpen(false)
        setIsShortcutsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlayPause, engine, selectedClipIds, tracks, currentFrame, canUndo, canRedo, clearSelection, addToast])

  return (
    <>
      <header className="h-14 xl:h-16 px-3 xl:px-5 bg-[#0D0F14] border-b border-white/10 flex items-center justify-between shrink-0 select-none z-30 transition-[height,padding] duration-150">
        {/* LEFT: MR logo + MEMORY RECON */}
        <div className="flex items-center gap-2 xl:gap-3">
          <button
            onClick={onBackToLanding}
            className="p-1 xl:p-1.5 rounded-lg text-[#687181] hover:text-[#F5F7FA] hover:bg-white/5 transition-colors cursor-pointer mr-0.5 xl:mr-1"
            title="Back to Landing Page"
            aria-label="Back to Landing Page"
          >
            <ArrowLeft className="w-3.5 xl:w-4 h-3.5 xl:h-4" />
          </button>
          <Logo size="sm" />
        </div>

        {/* CENTER: Project Name (Editable) */}
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <div className="flex items-center gap-1.5 bg-[#151922] px-2.5 py-1 rounded-lg border border-purple-500/40">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveName()
                  if (e.key === 'Escape') {
                    setNameInput(projectName)
                    setIsEditingName(false)
                  }
                }}
                autoFocus
                className="bg-transparent text-xs xl:text-sm font-medium text-[#F5F7FA] focus:outline-none w-36 xl:w-48 text-center"
              />
              <button
                onClick={handleSaveName}
                className="p-1 text-emerald-400 hover:text-emerald-300 cursor-pointer"
                aria-label="Confirm name"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="group flex items-center gap-1.5 xl:gap-2 px-2 xl:px-3 py-1 xl:py-1.5 rounded-lg hover:bg-white/5 text-xs xl:text-sm font-medium text-[#F5F7FA] transition-colors cursor-pointer max-w-[150px] xl:max-w-xs truncate"
              title="Click to rename project"
            >
              <span className="truncate">{projectName}</span>
              <Edit2 className="w-3 h-3 text-[#687181] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </button>
          )}
        </div>

        {/* RIGHT: Actions & Status */}
        <div className="flex items-center gap-1.5 xl:gap-3">
          {/* TRY DEMO (Section 2 requirement) */}
          <button
            onClick={handleTryDemo}
            className="h-7 xl:h-8 px-2 xl:px-3 rounded-lg bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/30 text-[10px] xl:text-[11px] font-mono font-semibold text-purple-200 flex items-center gap-1 xl:gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Load Future Builders Day demo project"
          >
            <Sparkles className="w-3 h-3 text-[#A78BFA]" />
            <span>TRY DEMO</span>
          </button>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 xl:px-2.5 py-0.5 xl:py-1 rounded-full bg-[#11141A] border border-white/5 text-[10px] xl:text-[11px] font-mono text-[#9AA3B2]">
            <span className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>● Local Project</span>
          </div>

          {/* Undo / Redo */}
          <div className="flex items-center bg-[#11141A] rounded-lg border border-white/5 p-0.5">
            <button
              onClick={handleUndo}
              disabled={!canUndo}
              className={`p-1 xl:p-1.5 rounded text-xs transition-colors ${
                canUndo
                  ? 'text-[#F5F7FA] hover:bg-white/5 cursor-pointer'
                  : 'text-[#687181]/40 cursor-not-allowed'
              }`}
              title="Undo (Ctrl+Z)"
              aria-label="Undo"
            >
              <Undo2 className="w-3.5 xl:w-4 h-3.5 xl:h-4" />
            </button>
            <div className="w-px h-3.5 bg-white/5" />
            <button
              onClick={handleRedo}
              disabled={!canRedo}
              className={`p-1 xl:p-1.5 rounded text-xs transition-colors ${
                canRedo
                  ? 'text-[#F5F7FA] hover:bg-white/5 cursor-pointer'
                  : 'text-[#687181]/40 cursor-not-allowed'
              }`}
              title="Redo (Ctrl+Shift+Z)"
              aria-label="Redo"
            >
              <Redo2 className="w-3.5 xl:w-4 h-3.5 xl:h-4" />
            </button>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className="h-7.5 xl:h-9 px-2.5 xl:px-3.5 rounded-lg bg-[#151922] hover:bg-white/5 border border-white/10 text-[11px] xl:text-xs font-medium text-[#F5F7FA] flex items-center gap-1.5 transition-colors cursor-pointer"
            aria-label="Save project"
          >
            <Save className="w-3.5 h-3.5 text-[#9AA3B2]" />
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* Export button */}
          <button
            onClick={() => setIsExportOpen(true)}
            className="h-7.5 xl:h-9 px-3 xl:px-4 rounded-lg bg-purple-600 hover:bg-purple-500 text-[11px] xl:text-xs font-semibold text-[#F5F7FA] flex items-center gap-1.5 shadow-md shadow-purple-900/30 transition-all cursor-pointer border border-purple-400/20 active:scale-95"
            aria-label="Export video"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          {/* Keyboard Shortcuts Help Button */}
          <button
            onClick={() => setIsShortcutsOpen(true)}
            className="p-1 xl:p-1.5 rounded-lg text-[#687181] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Keyboard shortcuts (?)"
            aria-label="Keyboard shortcuts"
          >
            <HelpCircle className="w-3.5 xl:w-4 h-3.5 xl:h-4" />
          </button>
        </div>
      </header>

      {/* Export Modal (Section 11) */}
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />

      {/* Shortcuts Modal (Section 10) */}
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
    </>
  )
}
