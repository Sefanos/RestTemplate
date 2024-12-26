/* eslint-disable @next/next/no-html-link-for-pages */
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Management System',
  description: 'Manage clients and vehicles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-4 items-center">
                <a href="/" className="text-gray-800 hover:text-gray-600">
                  Home
                </a>
                <a href="/clients" className="text-gray-800 hover:text-gray-600">
                  Clients
                </a>
                <a href="/voitures" className="text-gray-800 hover:text-gray-600">
                  Voitures
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 px-4">
          {children}
        </main>
      </body>
    </html>
  )
}