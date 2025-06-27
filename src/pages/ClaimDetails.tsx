import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, FileText, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const ClaimDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { claims, policies, updateClaimStatus } = useData();
  const { user } = useAuth();

  const claim = claims.find(c => c.id === id);
  const policy = claim ? policies.find(p => p.id === claim.policyId) : null;

  if (!claim) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Claim not found</p>
        <button
          onClick={() => navigate('/claims')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Back to Claims
        </button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5" />;
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'processing': return <Calendar className="w-5 h-5" />;
      case 'rejected': return <XCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const handleStatusUpdate = (newStatus: string) => {
    updateClaimStatus(claim.id, newStatus as any);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/claims')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Claims</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Claim #{claim.id}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Claim Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Claim Overview</h2>
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusColor(claim.status)}`}>
                {getStatusIcon(claim.status)}
                <span className="font-medium capitalize">{claim.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Claim Type</p>
                <p className="text-lg font-semibold text-gray-900">{claim.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Claim Amount</p>
                <p className="text-lg font-semibold text-gray-900">${claim.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Date Submitted</p>
                <p className="text-lg font-semibold text-gray-900">{new Date(claim.dateSubmitted).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Last Updated</p>
                <p className="text-lg font-semibold text-gray-900">{new Date(claim.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
              <p className="text-gray-900 leading-relaxed">{claim.description}</p>
            </div>
          </div>

          {/* Policy Information */}
          {policy && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Associated Policy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Policy Type</p>
                  <p className="text-gray-900">{policy.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Coverage Amount</p>
                  <p className="text-gray-900">${policy.coverage.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Policy Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                    policy.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {policy.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Premium</p>
                  <p className="text-gray-900">${policy.premium.toLocaleString()}/year</p>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Supporting Documents</h2>
            {claim.documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {claim.documents.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-900">{doc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No documents uploaded</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Fraud Detection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fraud Detection</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Fraud Score</span>
                <span className={`font-bold ${
                  (claim.fraudScore || 0) > 0.5 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {((claim.fraudScore || 0) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    (claim.fraudScore || 0) > 0.5 ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(claim.fraudScore || 0) * 100}%` }}
                ></div>
              </div>
              {(claim.fraudScore || 0) > 0.5 && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">High risk detected</span>
                </div>
              )}
            </div>
          </div>

          {/* Admin Actions */}
          {user?.role === 'admin' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleStatusUpdate('approved')}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Approve Claim
                </button>
                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Reject Claim
                </button>
                <button
                  onClick={() => handleStatusUpdate('processing')}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Mark as Processing
                </button>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-600">
                <strong>Phone:</strong> 1-800-SECURE-1
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> claims@secureguard.com
              </p>
              <p className="text-gray-600">
                <strong>Hours:</strong> Mon-Fri 8AM-6PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetails;