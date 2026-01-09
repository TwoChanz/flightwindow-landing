import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'FlightWindow - Smart Flight Windows for Drone Pilots'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d0d24 0%, #0a0a1a 50%, #12122e 100%)',
          position: 'relative',
        }}
      >
        {/* Aurora glow effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '150%',
            height: '60%',
            background: 'radial-gradient(ellipse at center top, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          }}
        />

        {/* Logo Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 50 50"
            fill="none"
            style={{ color: '#a78bfa' }}
          >
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
          </svg>
        </div>

        {/* Brand Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 24,
          }}
        >
          FlightWindow
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Smart Flight Windows for Drone Pilots
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 48,
          }}
        >
          {['Plan Windows', 'Track Progress', 'Log Decisions'].map((feature) => (
            <div
              key={feature}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#64748b',
                fontSize: 20,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#22d3ee',
                }}
              />
              {feature}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
