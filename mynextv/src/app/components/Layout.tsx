import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 items-center">
              <Link href="/" className="text-gray-800 hover:text-gray-600">
                Home
              </Link>
              <Link href="/clients" className="text-gray-800 hover:text-gray-600">
                Clients
              </Link>
              <Link href="/voitures" className="text-gray-800 hover:text-gray-600">
                Voitures
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4">{children}</main>
    </div>
  );
}