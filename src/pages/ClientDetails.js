import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaUser, FaEnvelope, FaPhone, FaBuilding, FaFileAlt, FaClipboardList, FaMoneyBillWave } from 'react-icons/fa';

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('policies');

  useEffect(() => {
    // In a real application, this would fetch client data from an API
    // For demo purposes, we'll simulate an API call with a timeout
    const fetchClient = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock client data
        const mockClient = {
          id: parseInt(id),
          clientId: `CL-2025-00${id}`,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567',
          type: 'Individual',
          company: 'N/A',
          address: {
            street: '123 Main Street',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: 'USA'
          },
          joinDate: '2025-01-10',
          status: 'Active',
          policies: [
            {
              id: 1,
              policyNumber: 'POL-2025-001',
              type: 'Auto',
              startDate: '2025-01-15',
              endDate: '2026-01-14',
              premium: 1200,
              status: 'Active'
            },
            {
              id: 2,
              policyNumber: 'POL-2025-010',
              type: 'Home',
              startDate: '2025-02-01',
              endDate: '2026-01-31',
              premium: 950,
              status: 'Active'
            }
          ],
          claims: [
            {
              id: 1,
              claimNumber: 'CLM-2025-001',
              policyNumber: 'POL-2025-001',
              date: '2025-04-10',
              amount: 3500,
              status: 'Pending'
            }
          ],
          payments: [
            { id: 1, transactionId: 'TRX-2025-001', date: '2025-01-15', amount: 100, method: 'Credit Card', status: 'Completed' },
            { id: 2, transactionId: 'TRX-2025-010', date: '2025-02-15', amount: 100, method: 'Credit Card', status: 'Completed' },
            { id: 3, transactionId: 'TRX-2025-022', date: '2025-03-15', amount: 100, method: 'Credit Card', status: 'Completed' },
            { id: 4, transactionId: 'TRX-2025-035', date: '2025-04-15', amount: 100, method: 'Credit Card', status: 'Completed' },
            { id: 5, transactionId: 'TRX-2025-048', date: '2025-05-15', amount: 100, method: 'Credit Card', status: 'Completed' },
            { id: 6, transactionId: 'TRX-2025-002', date: '2025-02-01', amount: 950, method: 'Bank Transfer', status: 'Completed' }
          ],
          documents: [
            { id: 1, name: 'ID Proof', type: 'PDF', uploadDate: '2025-01-10' },
            { id: 2, name: 'Address Proof', type: 'PDF', uploadDate: '2025-01-10' },
            { id: 3, name: 'Income Proof', type: 'PDF', uploadDate: '2025-01-10' }
          ],
          notes: [
            { id: 1, date: '2025-01-10', author: 'Admin User', content: 'Client onboarded successfully.' },
            { id: 2, date: '2025-04-10', author: 'Admin User', content: 'Client reported a car accident. Claim process initiated.' }
          ]
        };
        
        setClient(mockClient);
      } catch (error) {
        console.error('Error fetching client:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClient();
  }, [id]);

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading client details...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          Client not found. The client may have been deleted or you don't have permission to view it.
        </div>
        <Link to="/clients" className="btn btn-primary">
          <FaArrowLeft className="me-2" /> Back to Clients
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/clients" className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" /> Back to Clients
          </Link>
        </div>
        <div>
          <Link to={`/clients/${id}/edit`} className="btn btn-primary me-2">
            <FaEdit className="me-2" /> Edit Client
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
              <h1 className="mb-1">{client.firstName} {client.lastName}</h1>
              <p className="text-muted mb-0">{client.clientId} - {client.type} Client</p>
            </div>
            <div className="col-md-4 text-md-end">
              <span className={`badge ${client.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                {client.status}
              </span>
              <p className="text-muted mt-2 mb-0">Client since: {client.joinDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <FaUser className="me-2" /> Contact Information
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex">
                  <div className="me-3">
                    <FaEnvelope className="text-muted" />
                  </div>
                  <div>
                    <h6 className="mb-1">Email</h6>
                    <p>{client.email}</p>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex">
                  <div className="me-3">
                    <FaPhone className="text-muted" />
                  </div>
                  <div>
                    <h6 className="mb-1">Phone</h6>
                    <p>{client.phone}</p>
                  </div>
                </div>
              </div>
              {client.type === 'Corporate' && (
                <div className="mb-3">
                  <div className="d-flex">
                    <div className="me-3">
                      <FaBuilding className="text-muted" />
                    </div>
                    <div>
                      <h6 className="mb-1">Company</h6>
                      <p>{client.company}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <FaBuilding className="me-2" /> Address
              </h5>
            </div>
            <div className="card-body">
              <address>
                {client.address.street}<br />
                {client.address.city}, {client.address.state} {client.address.zipCode}<br />
                {client.address.country}
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-white">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'policies' ? 'active' : ''}`}
                onClick={() => setActiveTab('policies')}
              >
                <FaFileAlt className="me-2" /> Policies
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
          {activeTab === 'policies' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Client Policies</h5>
                <Link to="/policies/create" className="btn btn-sm btn-primary">
                  Add New Policy
                </Link>
              </div>
              
              {client.policies.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Policy Number</th>
                        <th>Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Premium ($)</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {client.policies.map(policy => (
                        <tr key={policy.id}>
                          <td>{policy.policyNumber}</td>
                          <td>{policy.type}</td>
                          <td>{policy.startDate}</td>
                          <td>{policy.endDate}</td>
                          <td>${policy.premium.toLocaleString()}</td>
                          <td>
                            <span className={`badge ${policy.status === 'Active' ? 'bg-success' : 
                                             policy.status === 'Pending' ? 'bg-warning' : 
                                             policy.status === 'Expired' ? 'bg-danger' : 'bg-secondary'}`}>
                              {policy.status}
                            </span>
                          </td>
                          <td>
                            <Link to={`/policies/${policy.id}`} className="btn btn-sm btn-outline-primary">
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
                  This client doesn't have any policies yet.
                </div>
              )}
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
              
              {client.claims.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Claim Number</th>
                        <th>Policy Number</th>
                        <th>Date Filed</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {client.claims.map(claim => (
                        <tr key={claim.id}>
                          <td>{claim.claimNumber}</td>
                          <td>{claim.policyNumber}</td>
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
                  No claims have been filed by this client.
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
              
              {client.payments.length > 0 ? (
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
                      {client.payments.map(payment => (
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
                  No payment records found for this client.
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Client Documents</h5>
                <button className="btn btn-sm btn-primary">
                  Upload Document
                </button>
              </div>
              
              {client.documents.length > 0 ? (
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
                      {client.documents.map(document => (
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
                  No documents found for this client.
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
              
              {client.notes.length > 0 ? (
                <div className="timeline">
                  {client.notes.map(note => (
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
                  No notes found for this client.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
