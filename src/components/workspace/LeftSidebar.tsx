import React from 'react'
import { useWorkspaceStore } from '../../stores/workspaceStore'
import { useMediaStore } from '../../stores/mediaStore'
import type { WorkspaceTab } from '../../types'
import { 
  Folder, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Layers, 
  Sparkles, 
  Clock, 
  Bookmark, 
  Info, 
  Settings,
  Plus
} from 'lucide-react'

interface LeftSidebarProps {
  onOpenImportModal: () => void
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ onOpenImportModal }) => {
  const { currentTab, setCurrentTab } = useWorkspaceStore()
  const { items } = useMediaStore()

  const counts = {
    all: items.length,
    photos: items.filter((i) => i.type === 'image').length,
    videos: items.filter((i) => i.type === 'video').length,
    audio: items.filter((i) => i.type === 'audio').length,
    screenshots: items.filter((i) => i.type === 'screenshot').length,
  }

  const mediaNavItems: { id: WorkspaceTab; label: string; icon: React.ElementType; count: number }[] = [
    { id: 'media-all', label: 'All Memories', icon: Folder, count: counts.all },
    { id: 'media-photos', label: 'Photos', icon: ImageIcon, count: counts.photos },
    { id: 'media-videos', label: 'Videos', icon: Video, count: counts.videos },
    { id: 'media-audio', label: 'Audio', icon: Music, count: counts.audio },
    { id: 'media-screenshots', label: 'Screenshots', icon: Layers, count: counts.screenshots },
  ]

  const reconNavItems: { id: WorkspaceTab; label: string; icon: React.ElementType }[] = [
    { id: 'recon-story', label: 'Story', icon: Sparkles },
    { id: 'recon-moments', label: 'Moments', icon: Clock },
    { id: 'recon-chapters', label: 'Chapters', icon: Bookmark },
  ]

  const projectNavItems: { id: WorkspaceTab; label: string; icon: React.ElementType }[] = [
    { id: 'project-info', label: 'Project Info', icon: Info },
    { id: 'project-settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="w-[195px] xl:w-[250px] 2xl:w-[260px] bg-[#0D0F14] border-r border-white/10 flex flex-col shrink-0 select-none overflow-y-auto transition-[width] duration-150">
      {/* Import Quick Action */}
      <div className="p-2.5 xl:p-3.5 border-b border-white/5">
        <button
          onClick={onOpenImportModal}
          className="w-full h-8 xl:h-10 rounded-lg xl:rounded-xl bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/30 text-purple-200 text-[11px] xl:text-xs font-semibold flex items-center justify-center gap-1.5 xl:gap-2 transition-all cursor-pointer group active:scale-98"
        >
          <Plus className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-purple-400 group-hover:rotate-90 transition-transform duration-200" />
          <span>Import Memories</span>
        </button>
      </div>

      <div className="p-2 xl:p-3 space-y-3.5 xl:space-y-6 flex-1">
        {/* SECTION: MEDIA */}
        <div>
          <div className="px-2 xl:px-3 pb-1.5 xl:pb-2 text-[9px] xl:text-[10px] font-mono tracking-wider text-[#687181] uppercase font-semibold">
            Media
          </div>
          <div className="space-y-0.5">
            {mediaNavItems.map((item) => {
              const Icon = item.icon
              const isSelected = currentTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg text-[11px] xl:text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600/20 text-[#F5F7FA] border border-purple-500/30 shadow-sm'
                      : 'text-[#9AA3B2] hover:text-[#F5F7FA] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 xl:gap-2.5 truncate">
                    <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${isSelected ? 'text-[#A78BFA]' : 'text-[#687181]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className={`text-[9px] xl:text-[10px] font-mono px-1.5 py-0.2 rounded-full shrink-0 ${
                      isSelected ? 'bg-purple-500/30 text-purple-200' : 'bg-white/5 text-[#687181]'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* SECTION: RECONSTRUCTION */}
        <div>
          <div className="px-2 xl:px-3 pb-1.5 xl:pb-2 text-[9px] xl:text-[10px] font-mono tracking-wider text-[#687181] uppercase font-semibold">
            Reconstruction
          </div>
          <div className="space-y-0.5">
            {reconNavItems.map((item) => {
              const Icon = item.icon
              const isSelected = currentTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg text-[11px] xl:text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600/20 text-[#F5F7FA] border border-purple-500/30 shadow-sm'
                      : 'text-[#9AA3B2] hover:text-[#F5F7FA] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 xl:gap-2.5 truncate">
                    <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${isSelected ? 'text-[#A78BFA]' : 'text-[#687181]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className="text-[8px] xl:text-[9px] font-mono px-1 py-0.5 rounded bg-purple-900/40 text-purple-300 shrink-0">
                    Stage 2
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* SECTION: PROJECT */}
        <div>
          <div className="px-2 xl:px-3 pb-1.5 xl:pb-2 text-[9px] xl:text-[10px] font-mono tracking-wider text-[#687181] uppercase font-semibold">
            Project
          </div>
          <div className="space-y-0.5">
            {projectNavItems.map((item) => {
              const Icon = item.icon
              const isSelected = currentTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center gap-2 xl:gap-2.5 px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg text-[11px] xl:text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600/20 text-[#F5F7FA] border border-purple-500/30 shadow-sm'
                      : 'text-[#9AA3B2] hover:text-[#F5F7FA] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${isSelected ? 'text-[#A78BFA]' : 'text-[#687181]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Storage and engine info footer */}
      <div className="p-2 xl:p-3 border-t border-white/5 text-[9px] xl:text-[10px] font-mono text-[#687181] flex items-center justify-between">
        <span>Elah 0.6.0</span>
        <span className="text-emerald-400">Online</span>
      </div>
    </aside>
  )
}
