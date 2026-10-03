import React, { useMemo } from 'react'
import { useMediaStore } from '../../stores/mediaStore'
import { useWorkspaceStore } from '../../stores/workspaceStore'
import { MediaCard } from './MediaCard'
import { FolderUp, Sparkles, Filter } from 'lucide-react'

interface MediaLibraryProps {
  onOpenImportModal: () => void
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onOpenImportModal }) => {
  const { items, isLoading, loadSampleMemories } = useMediaStore()
  const { currentTab } = useWorkspaceStore()

  // Filter items based on active tab
  const filteredItems = useMemo(() => {
    switch (currentTab) {
      case 'media-photos':
        return items.filter((i) => i.type === 'image')
      case 'media-videos':
        return items.filter((i) => i.type === 'video')
      case 'media-audio':
        return items.filter((i) => i.type === 'audio')
      case 'media-screenshots':
        return items.filter((i) => i.type === 'screenshot')
      case 'media-all':
      default:
        return items
    }
  }, [items, currentTab])

  // Skeleton loading state (Section 23)
  if (isLoading) {
    return (
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 animate-fadeIn">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl bg-[#11141A] border border-white/5 overflow-hidden">
            <div className="aspect-video w-full animate-shimmer" />
            <div className="p-3 space-y-2">
              <div className="h-3 w-3/4 rounded animate-shimmer" />
              <div className="h-2 w-1/2 rounded animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Empty State (Section 17)
  if (items.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center select-none animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA] mb-4">
          <FolderUp className="w-8 h-8" />
        </div>
        <h4 className="text-base font-semibold text-[#F5F7FA] mb-1">
          Your story starts here.
        </h4>
        <p className="text-xs text-[#9AA3B2] max-w-sm mb-6 leading-relaxed">
          Import the moments you captured. We'll help reconstruct what happened.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onOpenImportModal}
            className="h-10 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-[#F5F7FA] transition-all shadow-lg shadow-purple-900/30 flex items-center gap-2 cursor-pointer border border-purple-400/20 active:scale-95"
          >
            <FolderUp className="w-3.5 h-3.5" />
            <span>Import Memories</span>
          </button>

          <button
            onClick={loadSampleMemories}
            className="h-10 px-4 rounded-xl bg-[#151922] hover:bg-[#1c2230] text-xs font-medium text-[#A78BFA] transition-all border border-white/10 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Demo Pack</span>
          </button>
        </div>
      </div>
    )
  }

  // Filtered empty state
  if (filteredItems.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-[#687181] animate-fadeIn">
        <Filter className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-xs font-medium">No memories found in this category.</p>
        <p className="text-[11px] text-[#687181] mt-1">Import more files or switch to "All Memories".</p>
      </div>
    )
  }

  return (
    <div className="p-4 overflow-y-auto h-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {filteredItems.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
