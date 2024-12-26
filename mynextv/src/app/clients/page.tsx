'use client';

import { useState, useEffect } from 'react';
import ClientForm from '../components/ClientForm';
import ClientList from '../components/ClientList';
import { Client } from '../types/index';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8888/SERVICE-CLIENT/clients');
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      setClients(data);
      setFilteredClients(data);
    } catch (error) {
      setError('Error fetching clients');
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (client: Client) => {
    try {
      const response = await fetch('http://localhost:8888/SERVICE-CLIENT/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
      });
      if (!response.ok) {
        throw new Error('Failed to add client');
      }
      fetchClients();
    } catch (error) {
      setError('Error adding client');
      console.error('Error adding client:', error);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = clients.filter(client =>
      client.nom.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-red-100">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-red-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <p className="text-slate-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-800">
            Client Management
          </h1>
          <p className="mt-2 text-slate-600">
            Add and manage your clients efficiently
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Card Container */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <ClientForm onSubmit={handleAddClient} />
            </div>
          </div>

          {/* List Container */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <ClientList clients={filteredClients} onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}