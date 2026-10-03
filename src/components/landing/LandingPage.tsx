import React from 'react'
import { Logo } from '../common/Logo'
import { HeroVisual } from './HeroVisual'
import { useMediaStore } from '../../stores/mediaStore'
import { useWorkspaceStore } from '../../stores/workspaceStore'
import { useToastStore } from '../../stores/toastStore'
import { 
  ArrowRight, 
  Sparkles, 
  FolderUp, 
  Film, 
  Cpu, 
  HardDrive, 
  Wand2, 
  PlayCircle, 
  ShieldCheck, 
  Play
} from 'lucide-react'

interface LandingPageProps {
  onEnterWorkspace: () => void
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterWorkspace }) => {
  const { loadSampleMemories } = useMediaStore()
  const { setProjectName } = useWorkspaceStore()
  const { addToast } = useToastStore()

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
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
    onEnterWorkspace()
  }

  return (
    <div className="min-h-screen bg-[#08090D] text-[#F5F7FA] selection:bg-purple-900/40 selection:text-purple-200 relative overflow-hidden">
      {/* Subtle radial glow behind hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] radial-glow-hero pointer-events-none" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#08090D]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* LEFT: MR logo + MEMORY RECON */}
          <div className="flex items-center">
            <Logo size="md" />
          </div>

          {/* CENTER: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#9AA3B2]">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-[#F5F7FA] transition-colors cursor-pointer"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection('technology')}
              className="hover:text-[#F5F7FA] transition-colors cursor-pointer"
            >
              Technology
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-[#F5F7FA] transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* RIGHT: Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* TRY DEMO (Section 2 requirement) */}
            <button
              onClick={handleTryDemo}
              className="h-9 px-3.5 rounded-xl bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/30 text-purple-200 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
              title="Instant demo: Future Builders Day"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>TRY DEMO</span>
            </button>

            <button
              onClick={onEnterWorkspace}
              className="h-9 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-[#F5F7FA] text-xs font-semibold tracking-wide transition-all shadow-lg shadow-purple-900/30 flex items-center gap-2 cursor-pointer border border-purple-400/20 active:scale-95"
            >
              <span>Start Reconstructing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16 flex flex-col items-center text-center">
        {/* Hero Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11141A] border border-purple-500/30 text-purple-300 text-xs font-mono tracking-widest uppercase mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>AI-POWERED MEMORY RECONSTRUCTION</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F7FA] max-w-4xl leading-[1.1] mb-6">
          Your memories are scattered.<br />
          <span className="bg-gradient-to-r from-[#F5F7FA] via-purple-200 to-[#A78BFA] bg-clip-text text-transparent">
            Your story shouldn't be.
          </span>
        </h1>

        {/* Short Pitch Subheading (Section 1 requirement) */}
        <p className="text-base sm:text-lg md:text-xl text-[#9AA3B2] max-w-2xl font-normal leading-relaxed mb-4">
          Memory Recon turns scattered photos, videos and recordings into an evidence-based, editable story.
        </p>
        <p className="text-xs sm:text-sm text-[#687181] max-w-xl font-normal leading-relaxed mb-10">
          Drop in the moments you captured. Memory Recon discovers chronological clues, extracts meaningful moments, and maps them to a frame-accurate Elah timeline.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-8">
          <button
            onClick={onEnterWorkspace}
            className="w-full sm:w-auto h-12 px-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-[#F5F7FA] text-sm font-semibold tracking-wide transition-all shadow-xl shadow-purple-900/40 flex items-center justify-center gap-2.5 cursor-pointer border border-purple-400/30 active:scale-95"
          >
            <span>Start Reconstructing</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* TRY DEMO in Hero */}
          <button
            onClick={handleTryDemo}
            className="w-full sm:w-auto h-12 px-7 rounded-xl bg-[#151922] hover:bg-[#1a202c] text-purple-200 text-sm font-semibold transition-all border border-purple-500/40 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            <span>TRY DEMO (Future Builders Day)</span>
          </button>

          <button
            onClick={() => scrollToSection('how-it-works')}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#11141A] hover:bg-[#151922] text-[#F5F7FA] text-sm font-medium transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlayCircle className="w-4 h-4 text-[#A78BFA]" />
            <span>See How It Works</span>
          </button>
        </div>

        {/* Privacy badge */}
        <div className="flex items-center gap-2 text-xs text-[#687181] font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Evidence-Based Reasoning · Client-side preview & integer-frame timeline</span>
        </div>

        {/* Hero Visual Section */}
        <HeroVisual />

        {/* Section 10: How It Works */}
        <section id="how-it-works" className="w-full pt-16 pb-20 border-t border-white/5 text-left">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A78BFA]">
              Workflow
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F5F7FA] mt-2">
              Three steps from scattered files to coherent story
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 01 */}
            <div className="p-7 rounded-2xl bg-[#0D0F14] border border-white/10 hover:border-purple-500/40 transition-all duration-200 group">
              <div className="text-xs font-mono font-bold text-purple-400 mb-4 flex items-center justify-between">
                <span>01</span>
                <FolderUp className="w-5 h-5 text-[#687181] group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#F5F7FA] tracking-tight mb-2">COLLECT</h3>
              <p className="text-sm text-[#9AA3B2] leading-relaxed">
                "Drop in your scattered memories."
              </p>
              <p className="text-xs text-[#687181] mt-4 leading-relaxed">
                Upload photos, clips, audio voice notes, and screenshots from your trip, hackathon, or celebration with full client-side privacy.
              </p>
            </div>

            {/* Card 02 */}
            <div className="p-7 rounded-2xl bg-[#0D0F14] border border-white/10 hover:border-purple-500/40 transition-all duration-200 group relative">
              <div className="text-xs font-mono font-bold text-purple-400 mb-4 flex items-center justify-between">
                <span>02</span>
                <Wand2 className="w-5 h-5 text-[#687181] group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#F5F7FA] tracking-tight mb-2">RECONSTRUCT</h3>
              <p className="text-sm text-[#9AA3B2] leading-relaxed">
                "AI finds chronology, moments and chapters."
              </p>
              <p className="text-xs text-[#687181] mt-4 leading-relaxed">
                Multimodal reasoning maps scattered timestamps, identifies visual peaks, matches audio ambiance, and constructs narrative story arcs.
              </p>
            </div>

            {/* Card 03 */}
            <div className="p-7 rounded-2xl bg-[#0D0F14] border border-white/10 hover:border-purple-500/40 transition-all duration-200 group">
              <div className="text-xs font-mono font-bold text-purple-400 mb-4 flex items-center justify-between">
                <span>03</span>
                <Film className="w-5 h-5 text-[#687181] group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#F5F7FA] tracking-tight mb-2">TELL THE STORY</h3>
              <p className="text-sm text-[#9AA3B2] leading-relaxed">
                "Edit the reconstructed timeline and export."
              </p>
              <p className="text-xs text-[#687181] mt-4 leading-relaxed">
                Review on the real elah timeline with frame-level precision. Trim clips, rearrange beats, inspect assets, and preview in real-time.
              </p>
            </div>
          </div>
        </section>

        {/* Section 11: Technology Section */}
        <section id="technology" className="w-full pt-16 pb-20 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A78BFA]">
              Architecture
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F5F7FA] mt-2">
              Built on Next-Generation Creative-Tech
            </h2>
            <p className="text-sm text-[#9AA3B2] mt-3">
              Memory Recon unites high-performance browser rendering with modern multimodal intelligence.
            </p>
          </div>

          {/* Visual Architecture Flow */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#0D0F14] border border-white/10 mb-10 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center font-mono">
              <div className="p-4 rounded-xl bg-[#11141A] border border-white/10 flex flex-col items-center">
                <HardDrive className="w-5 h-5 text-purple-400 mb-2" />
                <span className="text-xs font-bold text-[#F5F7FA]">MEDIA</span>
                <span className="text-[10px] text-[#687181] mt-1">Photos · Video · Audio</span>
              </div>

              <div className="text-[#687181] flex justify-center">
                <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0 text-purple-400" />
              </div>

              <div className="p-4 rounded-xl bg-[#11141A] border border-purple-500/30 flex flex-col items-center">
                <Cpu className="w-5 h-5 text-purple-400 mb-2" />
                <span className="text-xs font-bold text-[#F5F7FA]">AI REASONING</span>
                <span className="text-[10px] text-[#687181] mt-1">Gemini Multimodal</span>
              </div>

              <div className="text-[#687181] flex justify-center">
                <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0 text-purple-400" />
              </div>

              <div className="p-4 rounded-xl bg-[#11141A] border border-emerald-500/30 flex flex-col items-center">
                <Film className="w-5 h-5 text-emerald-400 mb-2" />
                <span className="text-xs font-bold text-[#F5F7FA]">ELAH TIMELINE</span>
                <span className="text-[10px] text-[#687181] mt-1">WebGL2 & Frames</span>
              </div>
            </div>
          </div>

          {/* Stack details cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-5 rounded-xl bg-[#11141A] border border-white/5">
              <h4 className="font-semibold text-sm text-[#F5F7FA] mb-1">React + TypeScript + Vite</h4>
              <p className="text-xs text-[#9AA3B2] leading-relaxed">
                Zero-lag UI rendering with Zustand state management, Zod schemas, and responsive desktop architecture.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#11141A] border border-white/5">
              <h4 className="font-semibold text-sm text-[#F5F7FA] mb-1">Google Gemini Multimodal AI</h4>
              <p className="text-xs text-[#9AA3B2] leading-relaxed">
                Server-side API architecture with Zod schema validation, environment extraction, and narrative arc synthesis.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#11141A] border border-white/5">
              <h4 className="font-semibold text-sm text-[#F5F7FA] mb-1">Real Elah Video Engine</h4>
              <p className="text-xs text-[#9AA3B2] leading-relaxed">
                Hardware-accelerated WebGL2 preview, deterministic integer-frame timing, and non-destructive track editing.
              </p>
            </div>
          </div>
        </section>

        {/* Section: About */}
        <section id="about" className="w-full pt-16 pb-20 border-t border-white/5 text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A78BFA]">
            About Memory Recon
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#F5F7FA] mt-2 mb-6">
            "Don't edit your memories.<br />Reconstruct the story hidden inside them."
          </h2>
          <p className="text-sm text-[#9AA3B2] leading-relaxed mb-8">
            Traditional video editing forces you to sift through hundreds of disconnected files on a blank timeline. Memory Recon inverts this: it pieces together the temporal, emotional, and contextual fragments of your life experiences into a narrative you can polish and relive.
          </p>
          <button
            onClick={onEnterWorkspace}
            className="h-11 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-lg shadow-purple-900/40 inline-flex items-center gap-2 cursor-pointer active:scale-95"
          >
            Launch Memory Recon Workspace
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-[#687181]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" showText={false} />
            <span className="font-mono text-gray-400">MEMORY RECON</span>
            <span>· Hackathon Demo Ready</span>
          </div>
          <p>Built with React, TypeScript, Vite & the real elah engine.</p>
        </div>
      </footer>
    </div>
  )
}
