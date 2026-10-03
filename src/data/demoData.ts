import type { MediaItem } from '../types'

// Generates high quality stylized SVG Data URIs for demo memories
function createSvgDataUrl(title: string, subtitle: string, color1: string, color2: string, accent: string): string {
  const svg = `
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}"/>
          <stop offset="50%" stop-color="${color2}"/>
          <stop offset="100%" stop-color="#08090D"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="960" cy="540" r="340" fill="${accent}" opacity="0.18" filter="blur(60px)"/>
      <rect x="80" y="80" width="1760" height="920" rx="20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
      <text x="960" y="490" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="700" fill="#F5F7FA" text-anchor="middle" letter-spacing="1">${title}</text>
      <text x="960" y="570" font-family="monospace" font-size="24" fill="${accent}" text-anchor="middle" letter-spacing="2">${subtitle}</text>
      <text x="960" y="630" font-family="-apple-system, sans-serif" font-size="18" fill="#9AA3B2" text-anchor="middle">FUTURE BUILDERS DAY · MEMORY RECON</text>
    </svg>
  `
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

function createThumbnailSvg(title: string, color1: string, accent: string): string {
  const svg = `
    <svg width="320" height="180" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color1}"/>
      <circle cx="160" cy="90" r="60" fill="${accent}" opacity="0.25"/>
      <text x="160" y="95" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#F5F7FA" text-anchor="middle">${title}</text>
    </svg>
  `
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

const baseTime = Date.now() - 3600000 * 10 // 10 hours ago

export const FUTURE_BUILDERS_DAY_MEMORIES: MediaItem[] = [
  // 1. Arrival
  {
    id: 'fbd-01',
    name: '01_Arrival_Badge_Pickup.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 2840000,
    width: 1920,
    height: 1080,
    dateModified: baseTime,
    url: createSvgDataUrl('ARRIVAL & REGISTRATION', '09:00 AM · MAIN ATRIUM', '#171324', '#20163b', '#A78BFA'),
    thumbnailUrl: createThumbnailSvg('Badge Pickup (09:00 AM)', '#171324', '#A78BFA'),
  },
  {
    id: 'fbd-02',
    name: '02_Welcome_Keynote_Stage.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 3200000,
    width: 1920,
    height: 1080,
    dateModified: baseTime + 1800000, // 09:30 AM
    url: createSvgDataUrl('KEYNOTE: BUILD THE FUTURE', '09:30 AM · AUDITORIUM A', '#1e1435', '#2c1954', '#C4B5FD'),
    thumbnailUrl: createThumbnailSvg('Welcome Keynote', '#1e1435', '#C4B5FD'),
  },

  // 2. Workshop
  {
    id: 'fbd-03',
    name: '03_Architecture_Diagram.png',
    type: 'screenshot',
    mimeType: 'image/png',
    size: 1450000,
    width: 1920,
    height: 1080,
    dateModified: baseTime + 4500000, // 10:15 AM
    url: createSvgDataUrl('WORKSHOP: DISTRIBUTED SYSTEMS', '10:15 AM · LAB 304', '#0f172a', '#1e293b', '#38BDF8'),
    thumbnailUrl: createThumbnailSvg('Architecture Diagram', '#0f172a', '#38BDF8'),
  },
  {
    id: 'fbd-04',
    name: '04_Live_Coding_Hurdle.mp4',
    type: 'video',
    mimeType: 'video/mp4',
    size: 28500000,
    durationSeconds: 12,
    width: 1920,
    height: 1080,
    dateModified: baseTime + 9000000, // 11:30 AM
    url: createSvgDataUrl('LIVE SYSTEM BENCHMARK', '11:30 AM · WORKSHOP RUN', '#091e3a', '#10335e', '#60A5FA'),
    thumbnailUrl: createThumbnailSvg('Coding Hurdle (12s)', '#091e3a', '#60A5FA'),
  },

  // 3. Team Interaction
  {
    id: 'fbd-05',
    name: '05_Team_Lunch_Brainstorm.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 3900000,
    width: 1920,
    height: 1080,
    dateModified: baseTime + 14400000, // 01:00 PM
    url: createSvgDataUrl('TEAM HUDDLE & PROBLEM REFLECTION', '01:00 PM · CAFE TERRACE', '#1b1c13', '#2a2b16', '#FBBF24'),
    thumbnailUrl: createThumbnailSvg('Team Lunch Huddle', '#1b1c13', '#FBBF24'),
  },
  {
    id: 'fbd-06',
    name: '06_Whiteboard_Voice_Note.m4a',
    type: 'audio',
    mimeType: 'audio/mp4',
    size: 4200000,
    durationSeconds: 38,
    dateModified: baseTime + 20700000, // 02:45 PM
    url: '',
  },
  {
    id: 'fbd-07',
    name: '07_Collaborative_Debugging.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 3100000,
    width: 1920,
    height: 1080,
    dateModified: baseTime + 23400000, // 03:30 PM
    url: createSvgDataUrl('PAIR DEBUGGING SPRINT', '03:30 PM · MAKER POD 8', '#14201e', '#1c332f', '#34D399'),
    thumbnailUrl: createThumbnailSvg('Collaborative Debugging', '#14201e', '#34D399'),
  },

  // 4. Demo
  {
    id: 'fbd-08',
    name: '08_First_Working_Prototype.png',
    type: 'screenshot',
    mimeType: 'image/png',
    size: 1850000,
    width: 1920,
    height: 1080,
    dateModified: baseTime + 27900000, // 04:45 PM
    url: createSvgDataUrl('PROTOTYPE GREEN BUILD', '04:45 PM · DEPLOYED LIVE', '#06281e', '#0b4232', '#10B981'),
    thumbnailUrl: createThumbnailSvg('First Prototype Green', '#06281e', '#10B981'),
  },
  {
    id: 'fbd-09',
    name: '09_Stage_Pitch_Demonstration.mp4',
    type: 'video',
    mimeType: 'video/mp4',
    size: 42000000,
    durationSeconds: 15,
    width: 1920,
    height: 1080,
    dateModified: baseTime + 29700000, // 05:15 PM
    url: createSvgDataUrl('STAGE DEMO & AUDIENCE REVEAL', '05:15 PM · MAIN SHOWCASE', '#231238', '#38165c', '#E879F9'),
    thumbnailUrl: createThumbnailSvg('Stage Pitch (15s)', '#231238', '#E879F9'),
  },
  {
    id: 'fbd-10',
    name: '10_Audience_Q_and_A.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 2950000,
    width: 1920,
    height: 1080,
    dateModified: baseTime + 31500000, // 05:45 PM
    url: createSvgDataUrl('AUDIENCE Q&A & FEEDBACK', '05:45 PM · FORUM', '#16192b', '#202645', '#818CF8'),
    thumbnailUrl: createThumbnailSvg('Audience Q&A', '#16192b', '#818CF8'),
  },

  // 5. Closing
  {
    id: 'fbd-11',
    name: '11_Awards_and_Closing.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 3400000,
    width: 1920,
    height: 1080,
    dateModified: baseTime + 33300000, // 06:15 PM
    url: createSvgDataUrl('AWARDS & CLOSING KEYNOTE', '06:15 PM · GRAND STAGE', '#281a10', '#422815', '#F59E0B'),
    thumbnailUrl: createThumbnailSvg('Awards & Closing', '#281a10', '#F59E0B'),
  },
  {
    id: 'fbd-12',
    name: '12_Team_Victory_Group.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 4100000,
    width: 1920,
    height: 1080,
    dateModified: baseTime + 34200000, // 06:30 PM
    url: createSvgDataUrl('FINAL TEAM VICTORY', '06:30 PM · CELEBRATION', '#2b1025', '#47143c', '#EC4899'),
    thumbnailUrl: createThumbnailSvg('Team Victory Photo', '#2b1025', '#EC4899'),
  },
]
