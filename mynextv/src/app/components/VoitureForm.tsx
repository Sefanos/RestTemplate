'use client';

import { useState, useEffect } from 'react';
import { Voiture, Client } from '../types';

interface VoitureFormProps {
  onSubmit: (voiture: Voiture) => void;
}

export default function VoitureForm({ onSubmit }: VoitureFormProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [voiture, setVoiture] = useState<Voiture>({
    marque: '',
    matricule: '',
    model: '',
    idClient: 0,
  });
  const [error, setError] = useState('');

  // Fetch clients for the dropdown
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:8888/SERVICE-CLIENT/clients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError('Failed to load clients');
      }
    };
    fetchClients();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voiture.marque || !voiture.matricule || !voiture.model || !voiture.idClient) {
      setError('Please fill all fields correctly');
      return;
    }
    setError('');
    onSubmit(voiture);
    setVoiture({
      marque: '',
      matricule: '',
      model: '',
      idClient: 0,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">Add New Vehicle</h2>
            <p className="mt-1 text-sm text-slate-500">Enter the vehicles information below</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10" />
                <path d="M3 17h18" />
              </svg>
              Brand
            </label>
            <input
              type="text"
              value={voiture.marque}
              onChange={(e) => setVoiture({ ...voiture, marque: e.target.value })}
              className="block text-black w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-100 transition-all duration-200 bg-slate-50 hover:bg-white focus:bg-white outline-none"
              placeholder="Enter vehicle brand"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              License Plate
            </label>
            <input
              type="text"
              value={voiture.matricule}
              onChange={(e) => setVoiture({ ...voiture, matricule: e.target.value })}
              className="block text-black w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-100 transition-all duration-200 bg-slate-50 hover:bg-white focus:bg-white outline-none"
              placeholder="Enter license plate"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Model
            </label>
            <input
              type="text"
              value={voiture.model}
              onChange={(e) => setVoiture({ ...voiture, model: e.target.value })}
              className="block text-black w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-100 transition-all duration-200 bg-slate-50 hover:bg-white focus:bg-white outline-none"
              placeholder="Enter vehicle model"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Owner
            </label>
            <select
              value={voiture.idClient}
              onChange={(e) => setVoiture({ ...voiture, idClient: parseInt(e.target.value) })}
              className="block text-black w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring focus:ring-slate-100 transition-all duration-200 bg-slate-50 hover:bg-white focus:bg-white outline-none"
              required
            >
              <option value="">Select owner</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => setVoiture({ marque: '', matricule: '', model: '', idClient: 0 })}
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
            <span>Add Vehicle</span>
          </button>
        </div>
      </form>
    </div>
  );
}