import React, { useState, useEffect } from 'react'
import { useMediaStore } from '../../stores/mediaStore'
import { useToastStore } from '../../stores/toastStore'
import { UploadCloud } from 'lucide-react'

export const GlobalDropzone: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false)
  const { addMediaFiles } = useMediaStore()
  const { addToast } = useToastStore()

  useEffect(() => {
    let dragCounter = 0

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault()
      dragCounter++
      if (e.dataTransfer?.types?.includes('Files')) {
        setIsDragging(true)
      }
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      dragCounter--
      if (dragCounter <= 0) {
        setIsDragging(false)
        dragCounter = 0
      }
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
    }

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault()
      dragCounter = 0
      setIsDragging(false)

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const count = await addMediaFiles(e.dataTransfer.files)
        if (count > 0) {
          addToast({
            title: `${count} memories added`,
            description: 'Ready to reconstruct your story timeline.',
            type: 'success',
          })
        }
      }
    }

    window.addEventListener('dragenter', handleDragEnter)
    window.addEventListener('dragleave', handleDragLeave)
    window.addEventListener('dragover', handleDragOver)
    window.addEventListener('drop', handleDrop)

    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
      window.removeEventListener('dragleave', handleDragLeave)
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('drop', handleDrop)
    }
  }, [addMediaFiles, addToast])

  if (!isDragging) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-8 bg-[#08090D]/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full h-full max-w-4xl max-h-[500px] rounded-3xl border-2 border-dashed border-purple-500/80 bg-purple-950/20 shadow-2xl flex flex-col items-center justify-center text-center p-8 pointer-events-auto">
        <div className="w-20 h-20 rounded-3xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-[#A78BFA] mb-6 shadow-xl animate-bounce">
          <UploadCloud className="w-10 h-10" />
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-[#F5F7FA] mb-2 font-mono">
          DROP TO RECONSTRUCT
        </h2>

        <p className="text-sm text-[#A78BFA] max-w-md leading-relaxed font-sans">
          Release your scattered photos, clips, audio notes, and screenshots anywhere to add them to your memory workspace.
        </p>
      </div>
    </div>
  )
}
