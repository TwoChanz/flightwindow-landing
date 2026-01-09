'use client'

import { useState } from 'react'

// Extend window type for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

interface Screenshot {
  src: string
  alt: string
  title: string
  description: string
  step: number
  callout: string
}

const screenshots: Screenshot[] = [
  {
    src: '/screenshots/01-dashboard-dark.png',
    alt: 'FlightWindow mission dashboard showing weather conditions, flight windows, and active drone missions',
    title: 'Mission Dashboard',
    description: 'One view answers: Can I fly now? Can I finish today? When should I return?',
    step: 1,
    callout: 'Real-time conditions',
  },
  {
    src: '/screenshots/02-flight-windows-dark.png',
    alt: 'Smart flight window calculator displaying optimal flying times based on weather and daylight',
    title: 'Smart Flight Windows',
    description: 'Find contiguous windows based on weather, daylight, and your mission requirements.',
    step: 2,
    callout: 'AI-powered suggestions',
  },
  {
    src: '/screenshots/04-mission-continuity-dark.png',
    alt: 'Mission continuity panel showing paused waypoints and visual reference photos for multi-day drone operations',
    title: 'Mission Continuity',
    description: 'Pause and resume with full context—waypoints, conditions, and visual references.',
    step: 3,
    callout: 'Never lose progress',
  },
  {
    src: '/screenshots/05-decision-log-dark.png',
    alt: 'Decision log interface with timestamped go/no-go decisions and weather condition snapshots for compliance',
    title: 'Decision Log',
    description: 'Record go/no-go decisions with conditions snapshot. Export for compliance.',
    step: 4,
    callout: 'Audit-ready exports',
  },
]

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [droneType, setDroneType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [lightboxImage, setLightboxImage] = useState<Screenshot | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, droneType }),
      })

      const data = await response.json()

      if (!response.ok && response.status !== 200) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      // Track successful conversion in GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'waitlist_signup', {
          event_category: 'conversion',
          event_label: droneType || 'not_specified',
        })
      }

      setIsSubmitted(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(errorMessage)

      // Track error in GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'waitlist_signup_error', {
          event_category: 'error',
          event_label: errorMessage,
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const openLightbox = (screenshot: Screenshot) => {
    setLightboxImage(screenshot)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    document.body.style.overflow = ''
  }

  return (
    <main>
      {/* Header */}
      <header className="top-header">
        <a href="/" className="logo">
          <svg viewBox="0 0 200 50" fill="none" className="logo-svg">
            {/* Icon */}
            <g>
              {/* Window frame */}
              <rect x="4" y="4" width="42" height="42" rx="8" stroke="currentColor" strokeWidth="3" fill="none"/>
              {/* Horizon line */}
              <line x1="12" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              {/* Drone body */}
              <circle cx="25" cy="18" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
              {/* Propeller left */}
              <line x1="17" y1="18" x2="10" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              {/* Propeller right */}
              <line x1="33" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </g>
            {/* Wordmark */}
            <text x="56" y="33" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="700" letterSpacing="-0.5" fill="currentColor">FlightWindow</text>
          </svg>
        </a>
        <a href="https://app.flightwindow.app/sign-in" className="sign-in-link">
          Sign In
        </a>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Never lose context in <span>multi-day drone missions</span>
          </h1>

          <ul className="hero-benefits">
            <li>Find flight windows sized to your mission duration</li>
            <li>Pause and resume with full context preserved</li>
            <li>Keep defensible logs for every go/no-go decision</li>
          </ul>

          <a href="#waitlist" className="cta-button">
            Get Early Access
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <div className="trust-badges">
            <span className="trust-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Free during beta
            </span>
            <span className="trust-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              No credit card
            </span>
            <span className="trust-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Cancel anytime
            </span>
          </div>

          <p className="social-proof">
            Join 200+ drone pilots on the waitlist
          </p>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="screenshots" id="features">
        <h2>Built for Real Missions</h2>
        <p className="screenshots-subtitle">
          Every feature designed around the workflows of professional drone pilots.
        </p>

        <div className="workflow-indicator">
          <span>Plan</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span>Fly</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span>Pause</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span>Document</span>
        </div>

        <div className="screenshots-grid">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.step}
              className="screenshot-card"
              onClick={() => openLightbox(screenshot)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(screenshot)}
            >
              <div className="screenshot-step">{screenshot.step}</div>
              <div className="screenshot-callout">{screenshot.callout}</div>
              <div className="device-frame">
                <div className="device-notch"></div>
                <img src={screenshot.src} alt={screenshot.alt} />
              </div>
              <div className="screenshot-card-content">
                <h3>{screenshot.title}</h3>
                <p>{screenshot.description}</p>
              </div>
              <div className="screenshot-expand-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
                Click to enlarge
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-device-frame">
              <div className="device-notch"></div>
              <img src={lightboxImage.src} alt={lightboxImage.alt} />
            </div>
            <div className="lightbox-info">
              <div className="lightbox-step">Step {lightboxImage.step}</div>
              <h3>{lightboxImage.title}</h3>
              <p>{lightboxImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <section className="benefits">
        <h2>Why Pilots Choose FlightWindow</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h3>Know When to Fly</h3>
            <p>Stop guessing with weather apps. Get windows sized to your actual mission duration.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔄</div>
            <h3>Resume Without Guessing</h3>
            <p>Multi-day missions stay organized. Pick up exactly where you left off.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📋</div>
            <h3>Defensible Decisions</h3>
            <p>Every go/no-go logged with conditions and reasoning. Export when you need it.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">👨‍✈️</div>
            <h3>Pilot Decides</h3>
            <p>Advisory only. You're always in command. FlightWindow supports, never overrides.</p>
          </div>
        </div>
      </section>

      {/* For Who Section */}
      <section className="for-who">
        <h2>Built For</h2>
        <p className="for-who-subtitle">
          Professional drone operators who need reliability and defensibility.
        </p>
        <div className="use-cases">
          <span className="use-case-tag">Construction Mapping</span>
          <span className="use-case-tag">Infrastructure Inspection</span>
          <span className="use-case-tag">Surveying & GIS</span>
          <span className="use-case-tag">Agriculture</span>
          <span className="use-case-tag">Real Estate</span>
          <span className="use-case-tag">Multi-Battery Missions</span>
          <span className="use-case-tag">Multi-Day Captures</span>
          <span className="use-case-tag">Solar & Wind Inspection</span>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="waitlist" id="waitlist">
        <div className="waitlist-content">
          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>You're on the list!</h3>
              <p>We'll reach out soon with early access. Check your inbox for a welcome email.</p>
            </div>
          ) : (
            <>
              <div className="waitlist-urgency">Limited beta spots available</div>
              <h2>Get Early Access</h2>
              <p className="waitlist-subtitle">
                Be among the first pilots to try FlightWindow when we launch.
              </p>
              <form className="waitlist-form" onSubmit={handleSubmit}>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-required="true"
                  aria-label="Email address for waitlist signup"
                />
                <label htmlFor="droneType" className="sr-only">Drone type (optional)</label>
                <input
                  id="droneType"
                  name="droneType"
                  type="text"
                  placeholder="What drone do you fly? (optional)"
                  value={droneType}
                  onChange={(e) => setDroneType(e.target.value)}
                  aria-label="What drone do you fly"
                />
                {error && (
                  <p className="form-error" role="alert">{error}</p>
                )}
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Reserving...' : 'Reserve My Spot'}
                </button>
              </form>
              <p className="waitlist-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                We respect your privacy. No spam, ever.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} FlightWindow. All rights reserved.</p>
      </footer>
    </main>
  )
}
