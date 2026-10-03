/// <reference types="vite/client" />

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

declare module '@elah/timeline/styles.css'
declare module '@elah/editor/styles.css'
declare module '@elah/editor/styles/tokens.css'
