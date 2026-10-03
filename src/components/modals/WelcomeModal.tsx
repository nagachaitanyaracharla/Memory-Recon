import React, { useState, useEffect } from 'react'
import { Sparkles, FolderUp, BrainCircuit, Sliders, Download, X } from 'lucide-react'

export const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('memory_recon_welcome_dismissed')
    if (!dismissed) {
      setIsOpen(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('memory_recon_welcome_dismissed', 'true')
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-lg rounded-2xl bg-[#0D0F14] border border-purple-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient radial glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={handleDismiss}
          className="absolute top-5 right-5 text-[#687181] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-[#A78BFA]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#A78BFA] uppercase font-bold">
              WELCOME TO MEMORY RECON
            </span>
            <h3 className="text-xl font-bold text-[#F5F7FA]">
              Let's reconstruct a story.
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#9AA3B2] mb-6 leading-relaxed">
          Memory Recon doesn't force you to edit scattered files on a blank timeline. It discovers the hidden narrative inside your photos, clips, and notes.
        </p>

        {/* 4 Core Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-[#11141A] border border-white/5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-purple-900/30 text-purple-300 flex items-center justify-center font-bold text-[11px] shrink-0">
              01
            </div>
            <div>
              <div className="font-semibold text-white font-sans text-xs">Import</div>
              <div className="text-[10px] text-[#687181] font-sans mt-0.5">Drop in photos, clips, or try the demo pack.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#11141A] border border-white/5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-purple-900/30 text-purple-300 flex items-center justify-center font-bold text-[11px] shrink-0">
              02
            </div>
            <div>
              <div className="font-semibold text-white font-sans text-xs">Reconstruct</div>
              <div className="text-[10px] text-[#687181] font-sans mt-0.5">AI extracts chronology, moments, and chapters.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#11141A] border border-white/5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-purple-900/30 text-purple-300 flex items-center justify-center font-bold text-[11px] shrink-0">
              03
            </div>
            <div>
              <div className="font-semibold text-white font-sans text-xs">Edit</div>
              <div className="text-[10px] text-[#687181] font-sans mt-0.5">Refine beats on the real Elah timeline.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#11141A] border border-white/5 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-purple-900/30 text-purple-300 flex items-center justify-center font-bold text-[11px] shrink-0">
              04
            </div>
            <div>
              <div className="font-semibold text-white font-sans text-xs">Export</div>
              <div className="text-[10px] text-[#687181] font-sans mt-0.5">Hardware-accelerated client-side MP4 export.</div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={handleDismiss}
          className="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-purple-900/40 cursor-pointer active:scale-98"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
