import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next'
import Script from 'next/script'
import MatrixRainBackground from '../components/atoms/MatrixRainBackgroung'
import './globals.css'


import { ResponsiveIndicator } from '@/components/atoms/responsive-indicator'
import { ThemeWrapper } from '@/components/atoms/theme-wrapper'
import { Footer } from '@/components/organisms/footer'
import { Navbar } from '@/components/organisms/navbar'
import { NavbarMobile, NavbarProvider } from '@/components/organisms/navbar-mobile'

import { ENV } from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(ENV.NEXT_PUBLIC_WEBSITE_URL),
  title: {
    default: 'CodeRadds',
    template: '%s | CodeRadds'
  },
  description:
    "Welcome to my portfolio!I'm Radhika Bhoyar, specializing in Artificial Intelligence & Data Science. I’ve led impactful projects in UI/UX and AI during internships at E-TANTRASHALA and MetaACE. Notable projects include JalRakshak for water management and AAP KI AWAZ for inclusive education, earning recognition like winning SIH’2023.Explore my portfolio to see my work in action. Let's collaborate and make a difference!Thanks for stopping by!",
  openGraph: {
    title: 'CodeRadds',
    description:
    "Welcome to my portfolio!I'm Radhika Bhoyar, specializing in Artificial Intelligence & Data Science. I’ve led impactful projects in UI/UX and AI during internships at E-TANTRASHALA and MetaACE. Notable projects include JalRakshak for water management and AAP KI AWAZ for inclusive education, earning recognition like winning SIH’2023.Explore my portfolio to see my work in action. Let's collaborate and make a difference!Thanks for stopping by!",
    url: ENV.NEXT_PUBLIC_WEBSITE_URL,
    siteName: 'CodeRadds',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: 'Radhika Bhoyar',
    card: 'summary_large_image'
  },
  verification: {
    google: ENV.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-mono`}>
        <ThemeWrapper attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <div style={{ position: 'absolute', zIndex: -1, width: '100%', height: '100%' }}>
              <MatrixRainBackground />
            </div>
          <main style={{ position: 'relative' }}>
         
            <NavbarProvider>
              <Navbar />
              <NavbarMobile />
            </NavbarProvider>
            {children}
            <Footer />
          </main>
        </ThemeWrapper>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script async src='https://umami.wiscaksono.com/script.js' data-website-id='1f3b0505-7366-47bd-8757-95ad25395088' />
            <SpeedInsights />
          </>
        )}
      </body>
      <ResponsiveIndicator />
    </html>
  )
}
