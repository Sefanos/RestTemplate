import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Car Management
        </Link>
        <div className="space-x-4">
          <Link href="/clients" className="hover:text-gray-300">
            Clients
          </Link>
          <Link href="/clients/add" className="hover:text-gray-300">
            Add Client
          </Link>
          <Link href="/voitures" className="hover:text-gray-300">
            Voitures
          </Link>
          <Link href="/voitures/add" className="hover:text-gray-300">
            Add Voiture
          </Link>
        </div>
      </div>
    </nav>
  );
}