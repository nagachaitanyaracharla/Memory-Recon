import { create } from 'zustand'
import type { WorkspaceTab } from '../types'

interface WorkspaceState {
  currentTab: WorkspaceTab
  projectName: string
  isSaved: boolean
  inspectorTab: 'inspect' | 'story'
  setCurrentTab: (tab: WorkspaceTab) => void
  setProjectName: (name: string) => void
  setIsSaved: (saved: boolean) => void
  setInspectorTab: (tab: 'inspect' | 'story') => void
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  currentTab: 'media-all',
  projectName: 'My Memory',
  isSaved: true,
  inspectorTab: 'inspect',
  setCurrentTab: (tab) => set({ currentTab: tab }),
  setProjectName: (name) => set({ projectName: name, isSaved: false }),
  setIsSaved: (saved) => set({ isSaved: saved }),
  setInspectorTab: (tab) => set({ inspectorTab: tab }),
}))
