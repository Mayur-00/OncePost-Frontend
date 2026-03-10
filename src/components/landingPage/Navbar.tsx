'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'text-primary font-semibold' : 'text-foreground hover:text-primary transition-colors'
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-violet-300 bg-background/80 backdrop-blur-sm fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors">
            <img src={'/logo.png'} className="w-10 h-10 rounded-lg  flex items-center justify-center text-white text-sm font-bold"/>
           
            <span>OncePost</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={isActive('/')}>
              Home
            </Link>
            <Link href="/pricing" className={isActive('/pricing')}>
              Pricing
            </Link>
            <Link href="/help" className={isActive('/help')}>
              Help
            </Link>
            <Link href="/privacy-policy" className={isActive('/privacy')}>
              Privacy
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="px-4 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-3">
              <Link href="/" className="px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                Home
              </Link>
              <Link href="/pricing" className="px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                Pricing
              </Link>
              <Link href="/help" className="px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                Help
              </Link>
              <Link href="/privacy" className="px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                Privacy
              </Link>
              <div className="flex gap-2 pt-2 border-t border-border">
                <Link
                  href="/login"
                  className="flex-1 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
