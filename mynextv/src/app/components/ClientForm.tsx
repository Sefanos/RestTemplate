'use client';

import { useState } from 'react';
import { Client } from '../types/index';

export default function ClientForm({ onSubmit }: { onSubmit: (client: Client) => void }) {
  const [client, setClient] = useState<Client>({
    nom: '',
    age: 0,
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client.nom || client.age <= 0) {
      setError('Please fill all fields correctly');
      return;
    }
    setError('');
    onSubmit(client);
    setClient({ nom: '', age: 0 });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">Add New Client</h2>
            <p className="mt-1 text-sm text-slate-500">Enter the client information below</p>
          </div>
          <div className="text-right text-sm text-slate-500">
            {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Full Name
            </label>
            <input
              type="text"
              value={client.nom}
              onChange={(e) => setClient({ ...client, nom: e.target.value })}
              className="block text-black w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-100 transition-all duration-200 bg-slate-50 hover:bg-white focus:bg-white outline-none"
              placeholder="Enter client's name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Age
            </label>
            <input
              type="number"
              value={client.age}
              onChange={(e) => setClient({ ...client, age: parseFloat(e.target.value) })}
              className="block w-full text-black px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-100 transition-all duration-200 bg-slate-50 hover:bg-white focus:bg-white outline-none"
              placeholder="Enter client's age"
              required
              min="1"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => setClient({ nom: '', age: 0 })}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors duration-150 ease-in-out"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 focus:ring-4 focus:ring-slate-200 transition-all duration-200 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Client</span>
          </button>
        </div>
      </form>
    </div>
  );
}