import React, { useRef, useState } from 'react'
import { useMediaStore } from '../../stores/mediaStore'
import { useToastStore } from '../../stores/toastStore'
import { UploadCloud, X, Shield, Sparkles } from 'lucide-react'

interface MediaImportModalProps {
  isOpen: boolean
  onClose: () => void
}

export const MediaImportModal: React.FC<MediaImportModalProps> = ({ isOpen, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addMediaFiles, loadSampleMemories } = useMediaStore()
  const { addToast } = useToastStore()
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!isOpen) return null

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setIsProcessing(true)
    try {
      const count = await addMediaFiles(files)
      if (count > 0) {
        addToast({
          title: `${count} ${count === 1 ? 'memory' : 'memories'} imported`,
          description: 'Ready for inspection and elah timeline placement.',
          type: 'success',
        })
        onClose()
      } else {
        addToast({
          title: 'Unable to load media',
          description: 'Please upload supported formats (image, video, or audio).',
          type: 'warning',
        })
      }
    } catch (err) {
      addToast({
        title: 'Import Error',
        description: 'Failed to process files.',
        type: 'error',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleLoadSamples = () => {
    loadSampleMemories()
    addToast({
      title: 'Sample Memories Loaded',
      description: 'Loaded 4 demo moments (hackathon opening, brainstorm, demo sprint, audio ambiance).',
      type: 'success',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg rounded-2xl bg-[#0D0F14] border border-white/10 p-6 shadow-2xl relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#687181] hover:text-[#F5F7FA] p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-[#F5F7FA] mb-1">Import Memories</h3>
        <p className="text-xs text-[#9AA3B2] mb-5">
          Select or drag unorganized photos, clips, audio, and screenshots.
        </p>

        {/* Drop Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-purple-400 bg-purple-500/10 scale-[1.01]'
              : 'border-white/10 hover:border-purple-400/40 bg-[#11141A]/60 hover:bg-[#11141A]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,audio/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="w-14 h-14 rounded-2xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center mb-4 text-[#A78BFA]">
            <UploadCloud className="w-7 h-7" />
          </div>

          <p className="text-sm font-semibold text-[#F5F7FA] mb-1">
            Drop your memories here
          </p>
          <p className="text-xs text-[#9AA3B2] mb-5">
            Photos, videos, screenshots and audio
          </p>

          <button
            type="button"
            className="h-9 px-5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-[#F5F7FA] transition-all shadow-md shadow-purple-900/30 cursor-pointer border border-purple-400/20"
          >
            {isProcessing ? 'Processing files...' : 'Choose Files'}
          </button>
        </div>

        {/* Privacy badge (Section 15) */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#687181]">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Your media stays on this device.</span>
        </div>

        {/* One-click Sample Pack */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-[#9AA3B2]">Don't have files right now?</span>
          <button
            type="button"
            onClick={handleLoadSamples}
            className="flex items-center gap-1.5 text-xs font-medium text-[#A78BFA] hover:text-purple-300 transition-colors cursor-pointer p-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Sample Memories</span>
          </button>
        </div>
      </div>
    </div>
  )
}
