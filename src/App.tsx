import { useState, useEffect } from 'react'
import { LandingPage } from './components/landing/LandingPage'
import { Workspace } from './components/workspace/Workspace'
import { ToastContainer } from './components/common/ToastContainer'
import { GlobalDropzone } from './components/common/GlobalDropzone'
import { WelcomeModal } from './components/modals/WelcomeModal'

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'/' | '/workspace'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path.includes('/workspace') || window.location.hash.includes('workspace')) {
        return '/workspace'
      }
    }
    return '/'
  })

  // Listen to browser popstate for history navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path.includes('/workspace') || window.location.hash.includes('workspace')) {
        setCurrentRoute('/workspace')
      } else {
        setCurrentRoute('/')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (route: '/' | '/workspace') => {
    setCurrentRoute(route)
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route)
    }
  }

  return (
    <div className="min-h-screen bg-[#08090D] text-[#F5F7FA]">
      {currentRoute === '/' ? (
        <LandingPage onEnterWorkspace={() => navigateTo('/workspace')} />
      ) : (
        <Workspace onBackToLanding={() => navigateTo('/')} />
      )}

      {/* Global Drag & Drop Overlay ("DROP TO RECONSTRUCT") */}
      <GlobalDropzone />

      {/* First-Time Welcome Modal */}
      <WelcomeModal />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  )
}
