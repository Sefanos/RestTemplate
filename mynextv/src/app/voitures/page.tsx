'use client';

import { useState, useEffect } from 'react';
import VoitureForm from '../components/VoitureForm';
import VoitureList from '../components/VoitureList';
import { Voiture } from '../types';

export default function VoiturePage() {
  const [voitures, setVoitures] = useState<Voiture[]>([]);
  const [filteredVoitures, setFilteredVoitures] = useState<Voiture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVoitures = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8888/SERVICE-CAR/api/car', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
      }

      const data = await response.json();
      setVoitures(data);
      setFilteredVoitures(data);
    } catch (error) {
      setError('Error fetching vehicles. Please try again later.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoitures();
  }, []);

  const handleAddVoiture = async (voiture: Omit<Voiture, 'id' | 'client'>) => {
    try {
      const response = await fetch('http://localhost:8888/SERVICE-CAR/api/car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voiture),
      });

      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }

      // Refresh the list after adding
      fetchVoitures();
    } catch (error) {
      setError('Error adding vehicle. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = voitures.filter(voiture =>
      voiture.marque.toLowerCase().includes(query.toLowerCase()) ||
      voiture.model.toLowerCase().includes(query.toLowerCase()) ||
      voiture.matricule.toLowerCase().includes(query.toLowerCase()) ||
      voiture.client?.nom.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVoitures(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-800">
            Vehicle Management
          </h1>
          <p className="mt-2 text-slate-600">
            Add and manage your vehicles efficiently
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <div className="flex items-center">
              <svg 
                className="w-5 h-5 text-red-400 mr-2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          {/* Vehicle Form Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <VoitureForm onSubmit={handleAddVoiture} />
            </div>
          </div>

          {/* Vehicle List Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <VoitureList 
                voitures={filteredVoitures} 
                onSearch={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-medium text-slate-800">Total Vehicles</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{voitures.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-medium text-slate-800">Unique Brands</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {new Set(voitures.map(v => v.marque)).size}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-medium text-slate-800">Total Owners</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {new Set(voitures.map(v => v.client?.id)).size}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}