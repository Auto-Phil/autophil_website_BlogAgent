import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Auto-Phil Blog Agent | AI-Powered Blog Content Generator',
  description: 'Generate SEO and AEO optimized blog snippets tailored to your business. Turning tech apprehension into anticipation for SME and Startups.',
  keywords: ['blog generator', 'SEO', 'AEO', 'AI content', 'Auto-Phil', 'SME', 'startups'],
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
