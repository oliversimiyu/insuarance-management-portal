import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaFileAlt, FaUser, FaCalendarAlt, FaMoneyBillWave, FaClipboardList } from 'react-icons/fa';

const PolicyDetails = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    // In a real application, this would fetch policy data from an API
    // For demo purposes, we'll simulate an API call with a timeout
    const fetchPolicy = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock policy data
        const mockPolicy = {
          id: parseInt(id),
          policyNumber: `POL-2025-00${id}`,
          type: 'Auto',
          subtype: 'Comprehensive',
          clientId: 'CL-2025-001',
          clientName: 'John Doe',
          clientEmail: 'john.doe@example.com',
          clientPhone: '(555) 123-4567',
          startDate: '2025-01-15',
          endDate: '2026-01-14',
          premium: 1200,
          paymentFrequency: 'Monthly',
          nextPaymentDate: '2025-06-15',
          status: 'Active',
          createdAt: '2025-01-10',
          updatedAt: '2025-01-15',
          coverageDetails: [
            { type: 'Liability', limit: '$300,000', deductible: '$0' },
            { type: 'Collision', limit: 'Actual Cash Value', deductible: '$500' },
            { type: 'Comprehensive', limit: 'Actual Cash Value', deductible: '$250' },
            { type: 'Personal Injury', limit: '$10,000', deductible: '$0' },
            { type: 'Uninsured Motorist', limit: '$100,000', deductible: '$0' }
          ],
          insuredItems: [
            {
              type: 'Vehicle',
              make: 'Toyota',
              model: 'Camry',
              year: '2023',
              vin: 'ABC123XYZ456789',
              value: '$25,000'
            }
          ],
          documents: [
            { id: 1, name: 'Policy Contract', type: 'PDF', uploadDate: '2025-01-15' },
            { id: 2, name: 'Vehicle Registration', type: 'PDF', uploadDate: '2025-01-15' },
            { id: 3, name: 'Driver License', type: 'JPG', uploadDate: '2025-01-15' }
          ],
          claims: [
            { id: 1, claimNumber: 'CLM-2025-001', date: '2025-04-10', amount: 3500, status: 'Pending' }
          ],
          payments: [
            { id: 1, transactionId: 'TRX-2025-001', date: '2025-01-15', amount: 100, method: 'Credit Card', status: 'Completed' },
            { id: 2, transactionId: 'TRX-2025-010', date: '2025-02-15', amount: 100, method: 'Credit Card', status: 'Completed' },
            { id: 3, transactionId: 'TRX-2025-022', date: '2025-03-15', amount: 100, method: 'Credit Card', status: 'Completed' },
            { id: 4, transactionId: 'TRX-2025-035', date: '2025-04-15', amount: 100, method: 'Credit Card', status: 'Completed' },
            { id: 5, transactionId: 'TRX-2025-048', date: '2025-05-15', amount: 100, method: 'Credit Card', status: 'Completed' }
          ],
          notes: [
            { id: 1, date: '2025-01-15', author: 'Admin User', content: 'Policy created and activated.' },
            { id: 2, date: '2025-04-10', author: 'Admin User', content: 'Client reported minor accident. Claim process initiated.' }
          ]
        };
        
        setPolicy(mockPolicy);
      } catch (error) {
        console.error('Error fetching policy:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPolicy();
  }, [id]);

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading policy details...</p>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          Policy not found. The policy may have been deleted or you don't have permission to view it.
        </div>
        <Link to="/policies" className="btn btn-primary">
          <FaArrowLeft className="me-2" /> Back to Policies
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/policies" className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" /> Back to Policies
          </Link>
        </div>
        <div>
          <Link to={`/policies/${id}/edit`} className="btn btn-primary me-2">
            <FaEdit className="me-2" /> Edit Policy
          </Link>
          <button className="btn btn-danger">
            <FaTrash className="me-2" /> Delete
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h1 className="mb-1">{policy.policyNumber}</h1>
              <p className="text-muted mb-0">{policy.type} Insurance - {policy.subtype}</p>
            </div>
            <div className="col-md-4 text-md-end">
              <span className={`badge ${policy.status === 'Active' ? 'bg-success' : 
                               policy.status === 'Pending' ? 'bg-warning' : 
                               policy.status === 'Expired' ? 'bg-danger' : 'bg-secondary'}`}>
                {policy.status}
              </span>
              <p className="text-muted mt-2 mb-0">Created: {policy.createdAt}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <FaUser className="me-2" /> Client Information
              </h5>
            </div>
            <div className="card-body">
              <h6>{policy.clientName}</h6>
              <p className="mb-1">ID: {policy.clientId}</p>
              <p className="mb-1">Email: {policy.clientEmail}</p>
              <p className="mb-1">Phone: {policy.clientPhone}</p>
              <Link to={`/clients/${policy.clientId}`} className="btn btn-sm btn-outline-primary mt-3">
                View Client Profile
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <FaCalendarAlt className="me-2" /> Policy Period
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <h6>Start Date</h6>
                  <p>{policy.startDate}</p>
                </div>
                <div className="col-6">
                  <h6>End Date</h6>
                  <p>{policy.endDate}</p>
                </div>
              </div>
              <hr />
              <h6>Policy Term</h6>
              <p>12 Months</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <FaMoneyBillWave className="me-2" /> Payment Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <h6>Premium</h6>
                  <p>${policy.premium.toLocaleString()}</p>
                </div>
                <div className="col-6">
                  <h6>Frequency</h6>
                  <p>{policy.paymentFrequency}</p>
                </div>
              </div>
              <hr />
              <h6>Next Payment</h6>
              <p>{policy.nextPaymentDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-white">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <FaFileAlt className="me-2" /> Coverage Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'claims' ? 'active' : ''}`}
                onClick={() => setActiveTab('claims')}
              >
                <FaClipboardList className="me-2" /> Claims
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`}
                onClick={() => setActiveTab('payments')}
              >
                <FaMoneyBillWave className="me-2" /> Payments
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
                onClick={() => setActiveTab('documents')}
              >
                <FaFileAlt className="me-2" /> Documents
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'notes' ? 'active' : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                <FaFileAlt className="me-2" /> Notes
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {activeTab === 'details' && (
            <div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="mb-3">Coverage Details</h5>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Coverage Type</th>
                          <th>Limit</th>
                          <th>Deductible</th>
                        </tr>
                      </thead>
                      <tbody>
                        {policy.coverageDetails.map((coverage, index) => (
                          <tr key={index}>
                            <td>{coverage.type}</td>
                            <td>{coverage.limit}</td>
                            <td>{coverage.deductible}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5 className="mb-3">Insured Items</h5>
                  {policy.insuredItems.map((item, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <h6>{item.type}: {item.make} {item.model} ({item.year})</h6>
                        <p className="mb-1">VIN: {item.vin}</p>
                        <p className="mb-1">Value: {item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'claims' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Claims History</h5>
                <Link to="/claims/create" className="btn btn-sm btn-primary">
                  File New Claim
                </Link>
              </div>
              
              {policy.claims.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Claim Number</th>
                        <th>Date Filed</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policy.claims.map(claim => (
                        <tr key={claim.id}>
                          <td>{claim.claimNumber}</td>
                          <td>{claim.date}</td>
                          <td>${claim.amount.toLocaleString()}</td>
                          <td>
                            <span className={`badge ${claim.status === 'Approved' ? 'bg-success' : 
                                             claim.status === 'Pending' ? 'bg-warning' : 
                                             claim.status === 'Under Review' ? 'bg-info' :
                                             claim.status === 'Denied' ? 'bg-danger' : 'bg-secondary'}`}>
                              {claim.status}
                            </span>
                          </td>
                          <td>
                            <Link to={`/claims/${claim.id}`} className="btn btn-sm btn-outline-primary">
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info">
                  No claims have been filed for this policy.
                </div>
              )}
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Payment History</h5>
                <Link to="/payments/create" className="btn btn-sm btn-primary">
                  Record Payment
                </Link>
              </div>
              
              {policy.payments.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policy.payments.map(payment => (
                        <tr key={payment.id}>
                          <td>{payment.transactionId}</td>
                          <td>{payment.date}</td>
                          <td>${payment.amount.toLocaleString()}</td>
                          <td>{payment.method}</td>
                          <td>
                            <span className={`badge ${payment.status === 'Completed' ? 'bg-success' : 
                                             payment.status === 'Pending' ? 'bg-warning' : 
                                             payment.status === 'Failed' ? 'bg-danger' : 'bg-secondary'}`}>
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info">
                  No payment records found for this policy.
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Policy Documents</h5>
                <button className="btn btn-sm btn-primary">
                  Upload Document
                </button>
              </div>
              
              {policy.documents.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Document Name</th>
                        <th>Type</th>
                        <th>Upload Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policy.documents.map(document => (
                        <tr key={document.id}>
                          <td>{document.name}</td>
                          <td>{document.type}</td>
                          <td>{document.uploadDate}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">
                              View
                            </button>
                            <button className="btn btn-sm btn-outline-secondary me-2">
                              Download
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info">
                  No documents found for this policy.
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Notes & Activity</h5>
                <button className="btn btn-sm btn-primary">
                  Add Note
                </button>
              </div>
              
              {policy.notes.length > 0 ? (
                <div className="timeline">
                  {policy.notes.map(note => (
                    <div key={note.id} className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h6 className="card-title">{note.author}</h6>
                          <span className="text-muted small">{note.date}</span>
                        </div>
                        <p className="card-text">{note.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info">
                  No notes found for this policy.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
