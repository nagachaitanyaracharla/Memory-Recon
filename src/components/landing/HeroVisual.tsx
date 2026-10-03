import React, { useState } from 'react'
import { Sparkles, Layers, Film, ArrowRight, Image as ImageIcon, Video, Music, Clock } from 'lucide-react'

const STAGES = [
  { id: 'scattered', label: '01 Scattered Media', icon: Layers },
  { id: 'nodes', label: '02 Recon Nodes', icon: Sparkles },
  { id: 'timeline', label: '03 Frame Timeline', icon: Clock },
  { id: 'chapters', label: '04 Narrative Chapters', icon: Film },
]

export const HeroVisual: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1)

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 mb-20 rounded-2xl bg-[#0D0F14]/90 border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Stepper Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-5 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wider text-[#A78BFA] uppercase">
            Interactive Pipeline Architecture
          </span>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#11141A] border border-white/5">
          {STAGES.map((s, index) => {
            const Icon = s.icon
            const isCurrent = activeStage === index
            return (
              <button
                key={s.id}
                onClick={() => setActiveStage(index)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-purple-600/20 text-[#F5F7FA] border border-purple-500/30 shadow-sm'
                    : 'text-[#687181] hover:text-[#9AA3B2] hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#A78BFA]' : 'text-current'}`} />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="relative min-h-[300px] flex items-center justify-center rounded-xl bg-[#08090D]/80 border border-white/5 p-6 overflow-hidden">
        {/* Stage 0: Scattered Media */}
        {activeStage === 0 && (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <p className="text-xs font-mono text-[#687181] mb-6">
              RAW CAPTURES · UNORGANIZED DISPERSION
            </p>
            <div className="relative w-full max-w-xl h-56 flex items-center justify-center">
              {/* Scattered cards with natural offsets */}
              <div className="absolute left-6 top-4 -rotate-6 w-44 p-3 rounded-xl bg-[#151922] border border-white/10 shadow-lg transform hover:scale-105 transition-all">
                <div className="h-20 rounded-lg bg-gradient-to-br from-purple-900/40 to-slate-900 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-purple-300" />
                </div>
                <div className="mt-2 text-[11px] font-mono text-[#F5F7FA] truncate">IMG_8492.RAW</div>
                <div className="text-[9px] text-[#687181]">Captured 10:14 AM</div>
              </div>

              <div className="absolute right-8 top-2 rotate-6 w-48 p-3 rounded-xl bg-[#151922] border border-white/10 shadow-lg transform hover:scale-105 transition-all">
                <div className="h-20 rounded-lg bg-gradient-to-br from-blue-900/40 to-slate-900 flex items-center justify-center">
                  <Video className="w-6 h-6 text-blue-300" />
                </div>
                <div className="mt-2 text-[11px] font-mono text-[#F5F7FA] truncate">VID_Hackathon_Pitch.mp4</div>
                <div className="text-[9px] text-[#687181]">Captured 03:22 PM · 1m 45s</div>
              </div>

              <div className="absolute left-24 bottom-3 rotate-3 w-44 p-3 rounded-xl bg-[#151922] border border-white/10 shadow-lg transform hover:scale-105 transition-all">
                <div className="h-20 rounded-lg bg-gradient-to-br from-emerald-900/40 to-slate-900 flex items-center justify-center">
                  <Music className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="mt-2 text-[11px] font-mono text-[#F5F7FA] truncate">Voice_Note_02.m4a</div>
                <div className="text-[9px] text-[#687181]">Captured 08:05 PM · 42s</div>
              </div>

              <div className="absolute right-28 bottom-5 -rotate-3 w-40 p-3 rounded-xl bg-[#151922] border border-white/10 shadow-lg transform hover:scale-105 transition-all">
                <div className="h-16 rounded-lg bg-gradient-to-br from-amber-900/40 to-slate-900 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-amber-300" />
                </div>
                <div className="mt-2 text-[11px] font-mono text-[#F5F7FA] truncate">Screenshot_Slide.png</div>
                <div className="text-[9px] text-[#687181]">Captured 11:59 PM</div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 1: Recon Nodes */}
        {activeStage === 1 && (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <p className="text-xs font-mono text-[#A78BFA] mb-6 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              CHRONOLOGY EXTRACTION & MOMENT CORRELATION
            </p>
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#11141A] border border-purple-500/30 flex flex-col gap-2 relative">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-[#A78BFA] flex items-center justify-center text-xs font-bold font-mono">
                  M1
                </div>
                <div className="text-xs font-semibold text-[#F5F7FA]">Opening & Setup</div>
                <div className="text-[10px] text-[#9AA3B2] leading-relaxed">
                  3 photos, 1 audio clip aligned around 09:30 AM arrival and kickoff.
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#687181]">
                  <span>Confidence: 98%</span>
                  <span className="text-emerald-400">Chronological</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#11141A] border border-blue-500/30 flex flex-col gap-2 relative">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold font-mono">
                  M2
                </div>
                <div className="text-xs font-semibold text-[#F5F7FA]">The Breakthrough</div>
                <div className="text-[10px] text-[#9AA3B2] leading-relaxed">
                  Terminal screenshots & whiteboard photos correlated to night sprint.
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#687181]">
                  <span>Confidence: 94%</span>
                  <span className="text-blue-400">Peak Energy</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#11141A] border border-emerald-500/30 flex flex-col gap-2 relative">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                  M3
                </div>
                <div className="text-xs font-semibold text-[#F5F7FA]">Demo & Victory</div>
                <div className="text-[10px] text-[#9AA3B2] leading-relaxed">
                  Video clips of the presentation matching audio applause.
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#687181]">
                  <span>Confidence: 99%</span>
                  <span className="text-emerald-400">Climax</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 2: Frame Timeline */}
        {activeStage === 2 && (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <p className="text-xs font-mono text-[#34D399] mb-5">
              ELAH DETERMINISTIC INTEGER-FRAME TIMELINE
            </p>
            <div className="w-full max-w-2xl bg-[#11141A] rounded-xl border border-white/10 p-4 font-mono text-xs">
              {/* Ruler */}
              <div className="flex justify-between text-[10px] text-[#687181] border-b border-white/5 pb-2 mb-3">
                <span>00:00:00 (F0)</span>
                <span>00:05:00 (F150)</span>
                <span>00:10:00 (F300)</span>
                <span>00:15:00 (F450)</span>
                <span>00:20:00 (F600)</span>
              </div>

              {/* Tracks */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-16 text-[10px] text-[#9AA3B2]">V1 Video</span>
                  <div className="flex-1 h-7 rounded bg-[#151922] border border-white/5 p-1 flex gap-1 relative overflow-hidden">
                    <div className="w-1/4 h-full rounded bg-purple-600/30 border border-purple-400/40 text-[9px] flex items-center px-2 text-purple-200 truncate">
                      Opening_Stage.mp4
                    </div>
                    <div className="w-2/5 h-full rounded bg-purple-600/30 border border-purple-400/40 text-[9px] flex items-center px-2 text-purple-200 truncate">
                      Hacking_Session.mp4
                    </div>
                    <div className="w-1/3 h-full rounded bg-purple-600/30 border border-purple-400/40 text-[9px] flex items-center px-2 text-purple-200 truncate">
                      Pitch_Presentation.mp4
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-16 text-[10px] text-[#9AA3B2]">A1 Audio</span>
                  <div className="flex-1 h-7 rounded bg-[#151922] border border-white/5 p-1 flex gap-1 relative overflow-hidden">
                    <div className="w-full h-full rounded bg-emerald-600/20 border border-emerald-400/30 text-[9px] flex items-center px-2 text-emerald-200 truncate">
                      Auditorium_Audio_Bed.mp3 (Master Track)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-16 text-[10px] text-[#9AA3B2]">T1 Title</span>
                  <div className="flex-1 h-7 rounded bg-[#151922] border border-white/5 p-1 flex gap-1 relative overflow-hidden">
                    <div className="w-1/5 ml-4 h-full rounded bg-blue-600/30 border border-blue-400/40 text-[9px] flex items-center px-2 text-blue-200 truncate">
                      "Arrival"
                    </div>
                    <div className="w-1/4 ml-24 h-full rounded bg-blue-600/30 border border-blue-400/40 text-[9px] flex items-center px-2 text-blue-200 truncate">
                      "02:45 AM"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 3: Chapters & Story */}
        {activeStage === 3 && (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <p className="text-xs font-mono text-[#FBBF24] mb-5">
              RECONSTRUCTED NARRATIVE ARC
            </p>
            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#11141A] border border-white/10">
                <div className="text-[10px] font-mono text-[#A78BFA] uppercase">Chapter 1</div>
                <div className="text-sm font-semibold text-[#F5F7FA] mt-1">The Spark</div>
                <div className="text-xs text-[#9AA3B2] mt-1">Arrival, initial team energy, problem selection.</div>
                <div className="mt-3 text-[10px] text-[#687181] font-mono">00:00 — 00:45</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#11141A] border border-white/10">
                <div className="text-[10px] font-mono text-[#A78BFA] uppercase">Chapter 2</div>
                <div className="text-sm font-semibold text-[#F5F7FA] mt-1">The Grind</div>
                <div className="text-xs text-[#9AA3B2] mt-1">Midnight code debugging, pizza boxes, whiteboard logic.</div>
                <div className="mt-3 text-[10px] text-[#687181] font-mono">00:45 — 02:10</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#11141A] border border-white/10">
                <div className="text-[10px] font-mono text-[#A78BFA] uppercase">Chapter 3</div>
                <div className="text-sm font-semibold text-[#F5F7FA] mt-1">The Triumph</div>
                <div className="text-xs text-[#9AA3B2] mt-1">Demo day presentation, cheers, closing awards.</div>
                <div className="mt-3 text-[10px] text-[#687181] font-mono">02:10 — 03:00</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Caption footer */}
      <div className="mt-5 flex items-center justify-between text-xs text-[#687181]">
        <span>Step {activeStage + 1} of 4: {STAGES[activeStage].label}</span>
        <button
          onClick={() => setActiveStage((prev) => (prev + 1) % STAGES.length)}
          className="flex items-center gap-1.5 text-[#A78BFA] hover:text-white transition-colors cursor-pointer"
        >
          <span>Next transformation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
