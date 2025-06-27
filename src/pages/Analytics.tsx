import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Analytics: React.FC = () => {
  const { claims, policies } = useData();

  // Calculate analytics data
  const totalClaims = claims.length;
  const approvedClaims = claims.filter(c => c.status === 'approved').length;
  const rejectedClaims = claims.filter(c => c.status === 'rejected').length;
  const pendingClaims = claims.filter(c => c.status === 'pending').length;
  const approvalRate = totalClaims > 0 ? (approvedClaims / totalClaims * 100).toFixed(1) : '0';
  
  const totalClaimAmount = claims.reduce((sum, claim) => sum + claim.amount, 0);
  const approvedClaimAmount = claims.filter(c => c.status === 'approved').reduce((sum, claim) => sum + claim.amount, 0);
  
  const fraudAlerts = claims.filter(c => (c.fraudScore || 0) > 0.5).length;

  // Status distribution data
  const statusData = [
    { name: 'Approved', value: approvedClaims, color: '#10B981' },
    { name: 'Pending', value: pendingClaims, color: '#F59E0B' },
    { name: 'Processing', value: claims.filter(c => c.status === 'processing').length, color: '#3B82F6' },
    { name: 'Rejected', value: rejectedClaims, color: '#EF4444' }
  ];

  // Claim types data
  const claimTypeData = claims.reduce((acc, claim) => {
    const existing = acc.find(item => item.name === claim.type);
    if (existing) {
      existing.value += 1;
      existing.amount += claim.amount;
    } else {
      acc.push({ name: claim.type, value: 1, amount: claim.amount });
    }
    return acc;
  }, [] as { name: string; value: number; amount: number }[]);

  // Monthly claims trend (mock data)
  const monthlyData = [
    { month: 'Jan', claims: 12, amount: 45000 },
    { month: 'Feb', claims: 8, amount: 32000 },
    { month: 'Mar', claims: 15, amount: 58000 },
    { month: 'Apr', claims: 10, amount: 41000 },
    { month: 'May', claims: 18, amount: 67000 },
    { month: 'Jun', claims: 14, amount: 52000 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time insights into claims and policy performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Claims</p>
              <p className="text-2xl font-bold text-gray-900">{totalClaims}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approval Rate</p>
              <p className="text-2xl font-bold text-gray-900">{approvalRate}%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.3% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Claim Amount</p>
              <p className="text-2xl font-bold text-gray-900">${totalClaimAmount.toLocaleString()}</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <TrendingDown className="w-4 h-4 mr-1" />
                -5.1% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fraud Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{fraudAlerts}</p>
              <p className="text-sm text-yellow-600 flex items-center mt-1">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Requires attention
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims by Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Claims Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Claims by Type */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Claims by Type</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={claimTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Claims Trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="claims" fill="#3B82F6" />
              <Line yAxisId="right" type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Time</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Average</span>
              <span className="font-semibold">3.2 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fastest</span>
              <span className="font-semibold">1.1 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Slowest</span>
              <span className="font-semibold">7.8 days</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payout Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Paid</span>
              <span className="font-semibold">${approvedClaimAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Payout</span>
              <span className="font-semibold">${approvedClaims > 0 ? Math.round(approvedClaimAmount / approvedClaims).toLocaleString() : '0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Amount</span>
              <span className="font-semibold">${claims.filter(c => c.status === 'pending').reduce((sum, claim) => sum + claim.amount, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fraud Detection</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">High Risk</span>
              <span className="font-semibold text-red-600">{fraudAlerts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Medium Risk</span>
              <span className="font-semibold text-yellow-600">{claims.filter(c => (c.fraudScore || 0) > 0.3 && (c.fraudScore || 0) <= 0.5).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low Risk</span>
              <span className="font-semibold text-green-600">{claims.filter(c => (c.fraudScore || 0) <= 0.3).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;