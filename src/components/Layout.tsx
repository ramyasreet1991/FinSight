import { ReactNode } from 'react'
import ModernNavigation from './design-system/ModernNavigation'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ModernNavigation />
      <main>
        {children}
      </main>
    </div>
  )
}
