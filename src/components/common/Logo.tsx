import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }

  const textSizes = {
    sm: 'text-sm font-semibold tracking-wider',
    md: 'text-base font-bold tracking-wider',
    lg: 'text-xl font-extrabold tracking-wider',
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Original SVG logo: M + R interwoven with timeline playhead & reconstructed memory fragments */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center rounded-lg bg-[#11141A] border border-white/10 shadow-sm overflow-hidden group`}>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1.5">
          {/* Timeline track baseline */}
          <line x1="4" y1="28" x2="32" y2="28" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="2 2" />
          
          {/* Fragment nodes */}
          <circle cx="7" cy="28" r="1.5" fill="#687181" />
          <circle cx="18" cy="28" r="1.5" fill="#A78BFA" />
          <circle cx="29" cy="28" r="1.5" fill="#34D399" />
          
          {/* M - Left glyph representing converging memories */}
          <path
            d="M7 23V9L13.5 17L18 10V23"
            stroke="#F5F7FA"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* R - Right glyph with reconstructed timeline loop & stem */}
          <path
            d="M18 10H24.5C26.5 10 28 11.5 28 13.5C28 15.5 26.5 17 24.5 17H18M23.5 17L28.5 23"
            stroke="#A78BFA"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Reconstruction spark / Playhead indicator */}
          <line x1="18" y1="6" x2="18" y2="26" stroke="#C4B5FD" strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.6" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`text-[#F5F7FA] ${textSizes[size]} font-mono`}>
            MEMORY <span className="text-[#A78BFA]">RECON</span>
          </span>
          {size === 'lg' && (
            <span className="text-[10px] uppercase tracking-widest text-[#687181] mt-0.5">
              Reconstruct · Not Edit
            </span>
          )}
        </div>
      )}
    </div>
  )
}
