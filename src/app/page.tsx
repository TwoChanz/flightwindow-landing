'use client'

import { useState } from 'react'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [droneType, setDroneType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Connect to your waitlist service (ConvertKit, Mailchimp, Supabase, etc.)
    // For now, simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Waitlist submission:', { email, droneType })
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <main>
      {/* Header */}
      <header className="top-header">
        <div className="logo">FlightWindow</div>
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
          <p className="hero-subtitle">
            Plan flight windows, pause and resume missions with confidence, and keep a defensible decision log. Advisory support that respects pilot authority.
          </p>
          <a href="#waitlist" className="cta-button">
            Join Early Access
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <p className="hero-note">Free during beta. No credit card required.</p>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="screenshots" id="features">
        <h2>Built for Real Missions</h2>
        <p className="screenshots-subtitle">
          Every feature designed around the workflows of professional drone pilots.
        </p>
        <div className="screenshots-grid">
          <div className="screenshot-card">
            <img src="/screenshots/01-dashboard-dark.png" alt="FlightWindow Dashboard" />
            <div className="screenshot-card-content">
              <h3>Mission Dashboard</h3>
              <p>One view answers: Can I fly now? Can I finish today? When should I return?</p>
            </div>
          </div>
          <div className="screenshot-card">
            <img src="/screenshots/02-flight-windows-dark.png" alt="Smart Flight Windows" />
            <div className="screenshot-card-content">
              <h3>Smart Flight Windows</h3>
              <p>Find contiguous windows based on weather, daylight, and your mission requirements.</p>
            </div>
          </div>
          <div className="screenshot-card">
            <img src="/screenshots/04-mission-continuity-dark.png" alt="Mission Continuity" />
            <div className="screenshot-card-content">
              <h3>Mission Continuity</h3>
              <p>Pause and resume with full context—waypoints, conditions, and visual references.</p>
            </div>
          </div>
          <div className="screenshot-card">
            <img src="/screenshots/05-decision-log-dark.png" alt="Decision Log" />
            <div className="screenshot-card-content">
              <h3>Decision Log</h3>
              <p>Record go/no-go decisions with conditions snapshot. Export for compliance.</p>
            </div>
          </div>
        </div>
      </section>

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
              <h3>You're on the list!</h3>
              <p>We'll reach out soon with early access. Check your inbox for a welcome email.</p>
            </div>
          ) : (
            <>
              <h2>Get Early Access</h2>
              <p className="waitlist-subtitle">
                Join the waitlist and be first to try FlightWindow when we launch.
              </p>
              <form className="waitlist-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="What drone do you fly? (optional)"
                  value={droneType}
                  onChange={(e) => setDroneType(e.target.value)}
                />
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
              <p className="waitlist-note">No spam. Unsubscribe anytime.</p>
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
