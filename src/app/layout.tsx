import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlightWindow - Smart Flight Windows for Drone Pilots',
  description: 'Never lose context in multi-day drone missions. Plan flight windows, pause/resume missions, and keep a decision log.',
  keywords: ['drone flight planning', 'UAV mission planning', 'drone weather windows', 'Part 107', 'drone pilot tools', 'multi-day drone missions'],
  robots: 'index, follow',
  openGraph: {
    title: 'FlightWindow - Smart Flight Windows for Drone Pilots',
    description: 'Never lose context in multi-day drone missions. Plan flight windows, pause/resume missions, and keep a decision log.',
    type: 'website',
    url: 'https://flightwindow.app',
    siteName: 'FlightWindow',
    images: [
      {
        url: 'https://flightwindow.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FlightWindow - Smart Flight Windows for Drone Pilots',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlightWindow - Smart Flight Windows for Drone Pilots',
    description: 'Never lose context in multi-day drone missions.',
    images: ['https://flightwindow.app/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JD856ZXBX7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JD856ZXBX7');
          `}
        </Script>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "FlightWindow",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Smart flight window planning for professional drone pilots. Plan missions, track progress, and maintain decision logs.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free during beta"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
