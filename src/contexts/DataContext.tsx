import React, { createContext, useContext, useState } from 'react';

interface Policy {
  id: string;
  type: string;
  premium: number;
  coverage: number;
  status: 'active' | 'expired' | 'pending';
  startDate: string;
  endDate: string;
  description: string;
}

interface Claim {
  id: string;
  policyId: string;
  type: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  description: string;
  dateSubmitted: string;
  lastUpdated: string;
  documents: string[];
  fraudScore?: number;
}

interface DataContextType {
  policies: Policy[];
  claims: Claim[];
  addClaim: (claim: Omit<Claim, 'id' | 'dateSubmitted' | 'lastUpdated'>) => void;
  updateClaimStatus: (claimId: string, status: Claim['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [policies] = useState<Policy[]>([
    {
      id: '1',
      type: 'Auto Insurance',
      premium: 1200,
      coverage: 100000,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'Comprehensive auto insurance coverage'
    },
    {
      id: '2',
      type: 'Health Insurance',
      premium: 2400,
      coverage: 500000,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'Premium health insurance plan'
    },
    {
      id: '3',
      type: 'Home Insurance',
      premium: 1800,
      coverage: 300000,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'Complete home and property coverage'
    }
  ]);

  const [claims, setClaims] = useState<Claim[]>([
    {
      id: '1',
      policyId: '1',
      type: 'Auto Accident',
      amount: 5000,
      status: 'processing',
      description: 'Minor collision damage to front bumper',
      dateSubmitted: '2024-01-15',
      lastUpdated: '2024-01-16',
      documents: ['accident_report.pdf', 'photos.zip'],
      fraudScore: 0.2
    },
    {
      id: '2',
      policyId: '2',
      type: 'Medical Expense',
      amount: 15000,
      status: 'approved',
      description: 'Emergency room visit and treatment',
      dateSubmitted: '2024-01-10',
      lastUpdated: '2024-01-12',
      documents: ['medical_bills.pdf', 'doctor_report.pdf'],
      fraudScore: 0.1
    },
    {
      id: '3',
      policyId: '3',
      type: 'Property Damage',
      amount: 25000,
      status: 'pending',
      description: 'Water damage from burst pipe',
      dateSubmitted: '2024-01-20',
      lastUpdated: '2024-01-20',
      documents: ['damage_photos.zip', 'repair_estimate.pdf'],
      fraudScore: 0.7
    }
  ]);

  const addClaim = (claimData: Omit<Claim, 'id' | 'dateSubmitted' | 'lastUpdated'>) => {
    const newClaim: Claim = {
      ...claimData,
      id: Date.now().toString(),
      dateSubmitted: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      fraudScore: Math.random() // Mock fraud score
    };
    setClaims(prev => [...prev, newClaim]);
  };

  const updateClaimStatus = (claimId: string, status: Claim['status']) => {
    setClaims(prev => prev.map(claim => 
      claim.id === claimId 
        ? { ...claim, status, lastUpdated: new Date().toISOString().split('T')[0] }
        : claim
    ));
  };

  return (
    <DataContext.Provider value={{ policies, claims, addClaim, updateClaimStatus }}>
      {children}
    </DataContext.Provider>
  );
};