import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaFileAlt, FaUser, FaCalendarAlt, FaMoneyBillWave, FaClipboardList, FaDollarSign } from 'react-icons/fa';

const ClaimDetails = () => {
  const { id } = useParams();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    // In a real application, this would fetch claim data from an API
    // For demo purposes, we'll simulate an API call with a timeout
    const fetchClaim = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock claim data
        const mockClaim = {
          id: parseInt(id),
          claimNumber: `CLM-2025-00${id}`,
          policyNumber: 'POL-2025-001',
          policyType: 'Auto',
          clientId: 'CL-2025-001',
          clientName: 'John Doe',
          clientEmail: 'john.doe@example.com',
          clientPhone: '(555) 123-4567',
          incidentDate: '2025-04-05',
          filingDate: '2025-04-10',
          amount: 3500,
          description: 'Minor collision with another vehicle at an intersection. Front bumper and headlight damaged.',
          status: 'Pending',
          assignedTo: 'Sarah Johnson',
          createdAt: '2025-04-10',
          updatedAt: '2025-04-12',
          incidentDetails: {
            location: '123 Main St, Anytown, CA',
            policeReport: 'Yes',
            policeReportNumber: 'PR-2025-12345',
            witnesses: 'Yes',
            injuries: 'No',
            vehicleDriveable: 'Yes',
            damageDescription: 'Front bumper damaged, left headlight broken, minor scratches on hood'
          },
          timeline: [
            { id: 1, date: '2025-04-10', status: 'Claim Filed', description: 'Claim submitted by client', user: 'John Doe' },
            { id: 2, date: '2025-04-11', status: 'Claim Received', description: 'Claim received and assigned to adjuster', user: 'Admin User' },
            { id: 3, date: '2025-04-12', status: 'Under Review', description: 'Adjuster assigned and reviewing claim details', user: 'Sarah Johnson' }
          ],
          documents: [
            { id: 1, name: 'Accident Photos', type: 'JPG', uploadDate: '2025-04-10' },
            { id: 2, name: 'Police Report', type: 'PDF', uploadDate: '2025-04-10' },
            { id: 3, name: 'Repair Estimate', type: 'PDF', uploadDate: '2025-04-11' }
          ],
          notes: [
            { id: 1, date: '2025-04-10', author: 'Admin User', content: 'Claim received and entered into system.' },
            { id: 2, date: '2025-04-11', author: 'Sarah Johnson', content: 'Contacted client to confirm claim details. Requested additional photos of damage.' },
            { id: 3, date: '2025-04-12', author: 'Sarah Johnson', content: 'Reviewed repair estimate. Appears reasonable for the described damage.' }
          ]
        };
        
        setClaim(mockClaim);
      } catch (error) {
        console.error('Error fetching claim:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClaim();
  }, [id]);

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading claim details...</p>
        </div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          Claim not found. The claim may have been deleted or you don't have permission to view it.
        </div>
        <Link to="/claims" className="btn btn-primary">
          <FaArrowLeft className="me-2" /> Back to Claims
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/claims" className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" /> Back to Claims
          </Link>
        </div>
        <div>
          <Link to={`/claims/${id}/edit`} className="btn btn-primary me-2">
            <FaEdit className="me-2" /> Edit Claim
          </Link>
          <Link to={`/claims/${id}/record-payment`} className="btn btn-success me-2">
            <FaDollarSign className="me-2" /> Record Payment
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
              <h1 className="mb-1">{claim.claimNumber}</h1>
              <p className="text-muted mb-0">{claim.policyType} Insurance Claim - Policy {claim.policyNumber}</p>
            </div>
            <div className="col-md-4 text-md-end">
              <span className={`badge ${claim.status === 'Approved' ? 'bg-success' : 
                               claim.status === 'Pending' ? 'bg-warning' : 
                               claim.status === 'Under Review' ? 'bg-info' :
                               claim.status === 'Denied' ? 'bg-danger' : 'bg-secondary'}`}>
                {claim.status}
              </span>
              <p className="text-muted mt-2 mb-0">Filed: {claim.filingDate}</p>
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
              <h6>{claim.clientName}</h6>
              <p className="mb-1">ID: {claim.clientId}</p>
              <p className="mb-1">Email: {claim.clientEmail}</p>
              <p className="mb-1">Phone: {claim.clientPhone}</p>
              <Link to={`/clients/${claim.clientId}`} className="btn btn-sm btn-outline-primary mt-3">
                View Client Profile
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <FaCalendarAlt className="me-2" /> Incident Information
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6>Incident Date</h6>
                <p>{claim.incidentDate}</p>
              </div>
              <div className="mb-3">
                <h6>Location</h6>
                <p>{claim.incidentDetails.location}</p>
              </div>
              <div className="mb-0">
                <h6>Police Report</h6>
                <p className="mb-0">
                  {claim.incidentDetails.policeReport === 'Yes' ? 
                    `Yes - Report #${claim.incidentDetails.policeReportNumber}` : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <FaMoneyBillWave className="me-2" /> Claim Information
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6>Claim Amount</h6>
                <p>${claim.amount.toLocaleString()}</p>
              </div>
              <div className="mb-3">
                <h6>Assigned To</h6>
                <p>{claim.assignedTo}</p>
              </div>
              <div className="mb-0">
                <h6>Last Updated</h6>
                <p className="mb-0">{claim.updatedAt}</p>
              </div>
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
                <FaClipboardList className="me-2" /> Claim Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'timeline' ? 'active' : ''}`}
                onClick={() => setActiveTab('timeline')}
              >
                <FaCalendarAlt className="me-2" /> Timeline
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
                <div className="col-md-12">
                  <h5 className="mb-3">Incident Description</h5>
                  <p>{claim.description}</p>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-12">
                  <h5 className="mb-3">Damage Details</h5>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th style={{ width: '200px' }}>Damage Description</th>
                          <td>{claim.incidentDetails.damageDescription}</td>
                        </tr>
                        <tr>
                          <th>Witnesses Present</th>
                          <td>{claim.incidentDetails.witnesses}</td>
                        </tr>
                        <tr>
                          <th>Injuries Reported</th>
                          <td>{claim.incidentDetails.injuries}</td>
                        </tr>
                        <tr>
                          <th>Vehicle Driveable</th>
                          <td>{claim.incidentDetails.vehicleDriveable}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div>
              <h5 className="mb-4">Claim Timeline</h5>
              
              <div className="timeline">
                {claim.timeline.map((event, index) => (
                  <div key={event.id} className="card mb-3 border-start border-4 border-primary">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h6 className="card-title">{event.status}</h6>
                        <span className="text-muted small">{event.date}</span>
                      </div>
                      <p className="card-text">{event.description}</p>
                      <p className="card-text"><small className="text-muted">By: {event.user}</small></p>
                    </div>
                  </div>
                ))}
                
                <div className="d-flex justify-content-center mt-4">
                  <div className="btn-group">
                    <button className="btn btn-outline-success">Approve Claim</button>
                    <button className="btn btn-outline-danger">Deny Claim</button>
                    <button className="btn btn-outline-primary">Request More Info</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Claim Documents</h5>
                <button className="btn btn-sm btn-primary">
                  Upload Document
                </button>
              </div>
              
              {claim.documents.length > 0 ? (
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
                      {claim.documents.map(document => (
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
                  No documents found for this claim.
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
              
              {claim.notes.length > 0 ? (
                <div className="timeline">
                  {claim.notes.map(note => (
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
                  No notes found for this claim.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimDetails;
