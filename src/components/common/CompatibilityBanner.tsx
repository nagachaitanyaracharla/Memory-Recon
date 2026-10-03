import React, { useState, useEffect } from 'react'
import { checkBrowserCapabilities } from '../../lib/utils/format'
import { AlertTriangle, CheckCircle2, XCircle, Info, ChevronDown, ChevronUp } from 'lucide-react'

export const CompatibilityBanner: React.FC = () => {
  const [caps, setCaps] = useState<ReturnType<typeof checkBrowserCapabilities> | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setCaps(checkBrowserCapabilities())
  }, [])

  if (!caps || caps.isCompatible || dismissed) {
    return null
  }

  return (
    <div className="bg-[#151922] border-b border-amber-500/30 px-4 py-2.5 text-xs text-[#F5F7FA] z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span className="font-medium">
            Limited Browser Hardware Capabilities Detected.
          </span>
          <span className="text-[#9AA3B2] hidden md:inline">
            Elah timeline & WebGL2 canvas run best in modern Chromium browsers (Chrome, Edge, Brave, Arc).
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[#A78BFA] hover:underline cursor-pointer"
          >
            <span>{expanded ? 'Hide Details' : 'View Diagnostics'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-[#687181] hover:text-[#F5F7FA] transition-colors cursor-pointer px-1 py-0.5"
          >
            Dismiss
          </button>
        </div>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          <div className="flex items-center gap-2 p-2 rounded bg-[#11141A]">
            {caps.webgl2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-rose-400" />}
            <span className={caps.webgl2 ? 'text-gray-300' : 'text-rose-300'}>WebGL2 Canvas</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-[#11141A]">
            {caps.webCodecs ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Info className="w-3.5 h-3.5 text-amber-400" />}
            <span className={caps.webCodecs ? 'text-gray-300' : 'text-amber-300'}>WebCodecs</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-[#11141A]">
            {caps.webWorkers ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-rose-400" />}
            <span className={caps.webWorkers ? 'text-gray-300' : 'text-rose-300'}>Web Workers</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-[#11141A]">
            {caps.offscreenCanvas ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Info className="w-3.5 h-3.5 text-amber-400" />}
            <span className={caps.offscreenCanvas ? 'text-gray-300' : 'text-amber-300'}>OffscreenCanvas</span>
          </div>
        </div>
      )}
    </div>
  )
}
