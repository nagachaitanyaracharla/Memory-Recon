# MEMORY RECON

> **"Don't edit your memories. Reconstruct the story hidden inside them."**
> 
> *Memory Recon turns scattered photos, videos, and recordings into an evidence-based, editable story.*

Memory Recon is **not** another generic AI video editor or chatbot. It is an intelligent multimodal reconstruction engine that ingests fragmented event captures (photos, videos, audio clips), synthesizes chronological and visual evidence, identifies meaningful human moments, organizes narrative chapters, and translates them directly into an editable, frame-accurate timeline powered by **Elah**.

---

## 🚀 Key Features

1. **Multimodal Evidence Synthesis**
   - Ingests mixed media types (images, videos, audio notes).
   - Extracts capture timestamps, GPS metadata, visual continuity, and semantic audio clues.
   - Evaluates narrative importance and confidence for every moment.

2. **6-Phase AI Reconstruction Pipeline**
   - 01: Reading your memories
   - 02: Understanding visual evidence
   - 03: Finding chronology
   - 04: Discovering moments
   - 05: Building chapters
   - 06: Preparing timeline

3. **Moment Inspector & Evidence Cards**
   - **Why This Matters**: Clear explanation of narrative significance.
   - **Evidence Trail**: Timestamp clues, visual continuity hints, and metadata provenance.
   - **Confidence Scoring**: High, Medium, or Low evidence reliability.
   - **Jump to Timeline**: One-click playhead navigation directly to the moment's exact frame.

4. **Real Elah Timeline Integration**
   - Powered by `@elah/editor`, `@elah/timeline`, `@elah/core`, and `@elah/react`.
   - Frame-accurate video and audio tracks.
   - Native controls: Play/Pause, Seek, Split (`S`), Delete (`Del`), Undo (`Ctrl+Z`), Redo (`Ctrl+Shift+Z`), Zoom In/Out, Fit.

5. **Real Elah Video Export**
   - Canvas + WebCodecs rendering via `@elah/core` `exportVideo`.
   - Aspect ratio selections: 16:9, 9:16, 1:1.
   - Quality presets: Standard (5 Mbps) and High (10 Mbps).
   - 4-phase export progress (Preparing, Rendering, Encoding, Finalizing) with instant MP4 download.

6. **Judge Demo Mode ("Future Builders Day")**
   - Instant 1-click demo button preloaded with 12 bundled media assets.
   - 5 structured chapters: *Arrival*, *Workshop*, *Team Interaction*, *Demo*, *Closing*.
   - Zero external dependencies or network locks required for presentation.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Zustand
- **Video & Timeline Engine**: Real `@elah/*` v0.6.0 (`@elah/core`, `@elah/editor`, `@elah/timeline`, `@elah/react`)
- **Backend**: Express + `@google/genai` (Gemini 2.5 Flash multimodal) + Zod schema validation
- **Fail-Safe Fallback**: Local heuristic reconstruction engine when offline or without API keys

---

## ⚡ Quick Start & Run Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional for Live Gemini)
Create a `.env` file in the project root:
```env
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API key is provided, the local heuristic engine will reconstruct the story seamlessly.)*

### 3. Start Backend AI Server
```bash
npm run server
# Listening on http://127.0.0.1:3001
```

### 4. Start Frontend Dev Server
```bash
npm run dev
# Listening on http://127.0.0.1:5173
```

### 5. Build for Production
```bash
npm run build
```

---

## 🎬 2-Minute Hackathon Demo Flow

1. **The Problem**: Open Memory Recon and pitch: *"People collect scattered photos, videos, and recordings from an event. They never get edited because stitching them manually is tedious."*
2. **Instant Demo / Drag Media**: Click **TRY DEMO** (or drag files onto the window to see `DROP TO RECONSTRUCT`).
3. **Reconstruct**: Click **RECONSTRUCT STORY**. Walk judges through the 6 visual stages of AI evidence synthesis.
4. **Story Summary & Chapters**: Review the reconstructed narrative, 4 chapters, and 13 meaningful moments.
5. **Inspect Evidence**: Click on moment *"First Project Reveal"*. Highlight the **Why This Matters** card, timestamp continuity, and confidence score.
6. **Jump to Timeline**: Click **Jump to Timeline**. Show the Elah timeline automatically seek to the exact moment.
7. **Edit**: Use keyboard shortcut `S` to split, trim a clip, press `Space` to preview.
8. **Export**: Click **Export Story**, choose 16:9, watch real WebCodecs rendering, and download the finished MP4 video!
