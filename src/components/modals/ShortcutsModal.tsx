import React from 'react'
import { Command, X, Play, Scissors, Trash2, Undo2, Redo2, ZoomIn } from 'lucide-react'

interface ShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const shortcuts = [
    { key: 'Space', label: 'Play / Pause', icon: Play, desc: 'Toggles timeline playback transport' },
    { key: 'S', label: 'Split Clip', icon: Scissors, desc: 'Splits selected clip at current playhead frame' },
    { key: 'Del / Backspace', label: 'Delete', icon: Trash2, desc: 'Removes currently selected clip from timeline' },
    { key: 'Ctrl / ⌘ + Z', label: 'Undo', icon: Undo2, desc: 'Reverts last timeline mutation' },
    { key: 'Ctrl / ⌘ + ⇧ + Z', label: 'Redo', icon: Redo2, desc: 'Re-applies previously undone action' },
    { key: 'Esc', label: 'Close Modals', icon: X, desc: 'Dismiss active dialog or inspection overlay' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn select-none">
      <div className="w-full max-w-md rounded-2xl bg-[#0D0F14] border border-white/10 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#687181] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-[#A78BFA]">
            <Command className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-[#F5F7FA]">Keyboard Shortcuts</h3>
        </div>
        <p className="text-xs text-[#9AA3B2] mb-5">
          Pro-grade timeline editing shortcuts for rapid workflow.
        </p>

        <div className="space-y-2">
          {shortcuts.map((sc) => {
            const Icon = sc.icon
            return (
              <div
                key={sc.key}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#11141A] border border-white/5 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-[#A78BFA] shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">{sc.label}</span>
                    <span className="text-[10px] text-[#687181] block">{sc.desc}</span>
                  </div>
                </div>
                <kbd className="px-2 py-1 rounded bg-[#151922] border border-white/10 font-mono text-[11px] text-purple-200 shrink-0">
                  {sc.key}
                </kbd>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
