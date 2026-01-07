import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlightWindow - Smart Flight Windows for Drone Pilots',
  description: 'Never lose context in multi-day drone missions. Plan flight windows, pause/resume missions, and keep a decision log.',
  openGraph: {
    title: 'FlightWindow - Smart Flight Windows for Drone Pilots',
    description: 'Never lose context in multi-day drone missions. Plan flight windows, pause/resume missions, and keep a decision log.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
