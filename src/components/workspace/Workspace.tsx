import React, { useState, useEffect } from 'react'
import { EditorProvider } from '@elah/editor'
import { TopBar } from './TopBar'
import { LeftSidebar } from './LeftSidebar'
import { RightInspector } from '../inspector/RightInspector'
import { PreviewStage } from '../timeline/PreviewStage'
import { TimelineContainer } from '../timeline/TimelineContainer'
import { MediaLibrary } from '../media/MediaLibrary'
import { StoryPanel } from '../story/StoryPanel'
import { MediaImportModal } from '../media/MediaImportModal'
import { ReconstructionProgressModal } from '../story/ReconstructionProgressModal'
import { CompatibilityBanner } from '../common/CompatibilityBanner'
import { useWorkspaceStore } from '../../stores/workspaceStore'
import { useStoryStore } from '../../stores/storyStore'
import { PlaySquare, Grid3X3, Sparkles } from 'lucide-react'

interface WorkspaceProps {
  onBackToLanding: () => void
}

export const Workspace: React.FC<WorkspaceProps> = ({ onBackToLanding }) => {
  const { currentTab, setCurrentTab } = useWorkspaceStore()
  const { hasReconstructed } = useStoryStore()
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [centerMode, setCenterMode] = useState<'preview' | 'media' | 'story'>('preview')

  // Sync centerMode when user selects left sidebar tabs
  useEffect(() => {
    if (currentTab.startsWith('media')) {
      setCenterMode('media')
    } else if (currentTab.startsWith('recon')) {
      setCenterMode('story')
    }
  }, [currentTab])

  // When reconstruction finishes, switch center mode to story so user immediately sees their narrative
  useEffect(() => {
    if (hasReconstructed) {
      setCenterMode('story')
    }
  }, [hasReconstructed])

  return (
    <div className="h-screen w-screen bg-[#08090D] text-[#F5F7FA] flex flex-col overflow-hidden select-none">
      {/* Browser compatibility check banner */}
      <CompatibilityBanner />

      {/* Wrapping the editor in official Elah EditorProvider */}
      <EditorProvider
        fps={30}
        stage={{ width: 1920, height: 1080 }}
        defaultTrackHeight={36}
        maxHistorySize={100}
        initialTracks={[
          { kind: 'video', name: 'Video Track 1' },
          { kind: 'elements', name: 'Overlay & Titles' },
          { kind: 'audio', name: 'Audio Master' },
        ]}
      >
        {/* TOP BAR (64px) */}
        <TopBar onBackToLanding={onBackToLanding} />

        {/* WORKSPACE MIDDLE BODY */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* LEFT SIDEBAR (250–270px) */}
          <LeftSidebar onOpenImportModal={() => setIsImportModalOpen(true)} />

          {/* CENTER VIEWPORT (Preview / Media / Story) */}
          <div className="flex-1 flex flex-col bg-[#08090D] min-w-0 overflow-hidden border-r border-white/5">
            {/* Center View Switcher Header */}
            <div className="h-9 xl:h-10 px-2.5 xl:px-4 bg-[#0D0F14] border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCenterMode('preview')}
                  className={`flex items-center gap-1.5 px-2 xl:px-3 py-1 rounded-lg text-[11px] xl:text-xs font-medium transition-colors cursor-pointer ${
                    centerMode === 'preview'
                      ? 'bg-[#151922] text-[#F5F7FA] border border-white/10 shadow-sm'
                      : 'text-[#687181] hover:text-[#9AA3B2]'
                  }`}
                >
                  <PlaySquare className="w-3.5 h-3.5 text-purple-400" />
                  <span>Center Preview</span>
                </button>

                <button
                  onClick={() => setCenterMode('media')}
                  className={`flex items-center gap-1.5 px-2 xl:px-3 py-1 rounded-lg text-[11px] xl:text-xs font-medium transition-colors cursor-pointer ${
                    centerMode === 'media'
                      ? 'bg-[#151922] text-[#F5F7FA] border border-white/10 shadow-sm'
                      : 'text-[#687181] hover:text-[#9AA3B2]'
                  }`}
                >
                  <Grid3X3 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Media Workspace</span>
                </button>

                <button
                  onClick={() => setCenterMode('story')}
                  className={`flex items-center gap-1.5 px-2 xl:px-3 py-1 rounded-lg text-[11px] xl:text-xs font-medium transition-colors cursor-pointer ${
                    centerMode === 'story'
                      ? 'bg-[#151922] text-[#F5F7FA] border border-white/10 shadow-sm'
                      : 'text-[#687181] hover:text-[#9AA3B2]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>Story Reconstruct</span>
                </button>
              </div>

              {/* View context label */}
              <div className="text-[10px] xl:text-[11px] font-mono text-[#687181] hidden sm:block truncate max-w-[200px] xl:max-w-none">
                {centerMode === 'preview' && 'Stage Mode: 16:9 WebGL2 Canvas'}
                {centerMode === 'media' && 'Grid View: Local Media Library'}
                {centerMode === 'story' && (hasReconstructed ? 'Reconstructed Narrative' : 'Story Pipeline')}
              </div>
            </div>

            {/* Center Content Component */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
              {centerMode === 'preview' && <PreviewStage />}
              {centerMode === 'media' && (
                <MediaLibrary onOpenImportModal={() => setIsImportModalOpen(true)} />
              )}
              {centerMode === 'story' && (
                <StoryPanel onOpenImport={() => setIsImportModalOpen(true)} />
              )}
            </div>
          </div>

          {/* RIGHT INSPECTOR (280–320px) */}
          <RightInspector />
        </div>

        {/* BOTTOM ELAH TIMELINE */}
        <TimelineContainer />

        {/* Modals & Overlays */}
        <MediaImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
        />

        {/* 6-Stage Reconstruction Progress Modal (Section 11) */}
        <ReconstructionProgressModal />
      </EditorProvider>
    </div>
  )
}
