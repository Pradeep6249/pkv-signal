import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pradeep Kumar Voruganti — Signal vs Noise',
  description: 'Data Scientist. Fraud Intelligence. Payments Risk. Building signal from noise at national scale.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
