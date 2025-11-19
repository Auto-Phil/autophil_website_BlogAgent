import './globals.css'

export const metadata = {
  title: 'Auto-Phil Blog Agent',
  description: 'AI-powered blog content generator',
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
