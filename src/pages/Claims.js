import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaClipboardList } from 'react-icons/fa';

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for claims
  const mockClaims = [
    {
      id: 1,
      claimNumber: 'CLM-2025-001',
      policyNumber: 'POL-2025-001',
      clientName: 'John Doe',
      type: 'Auto',
      amount: 3500,
      filingDate: '2025-04-10',
      status: 'Pending'
    },
    {
      id: 2,
      claimNumber: 'CLM-2025-002',
      policyNumber: 'POL-2025-003',
      clientName: 'Michael Smith',
      type: 'Life',
      amount: 50000,
      filingDate: '2025-03-15',
      status: 'Under Review'
    },
    {
      id: 3,
      claimNumber: 'CLM-2025-003',
      policyNumber: 'POL-2025-002',
      clientName: 'Sarah Johnson',
      type: 'Home',
      amount: 12500,
      filingDate: '2025-02-28',
      status: 'Approved'
    },
    {
      id: 4,
      claimNumber: 'CLM-2025-004',
      policyNumber: 'POL-2025-004',
      clientName: 'Emily Wilson',
      type: 'Health',
      amount: 4800,
      filingDate: '2025-04-05',
      status: 'Pending'
    },
    {
      id: 5,
      claimNumber: 'CLM-2025-005',
      policyNumber: 'POL-2024-089',
      clientName: 'David Brown',
      type: 'Travel',
      amount: 1200,
      filingDate: '2025-01-20',
      status: 'Denied'
    },
    {
      id: 6,
      claimNumber: 'CLM-2025-006',
      policyNumber: 'POL-2025-005',
      clientName: 'Corporate Solutions Inc.',
      type: 'Business',
      amount: 35000,
      filingDate: '2025-05-01',
      status: 'Under Review'
    }
  ];

  // Filter claims based on search term and filters
  const filteredClaims = mockClaims.filter(claim => {
    const matchesSearch = 
      claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || claim.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-fluid">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1>Claims</h1>
          <p className="text-muted">Manage insurance claims</p>
        </div>
        <Link to="/claims/create" className="btn btn-primary">
          <FaPlus className="me-2" /> New Claim
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by claim number, policy number, or client name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaFilter />
                </span>
                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Denied">Denied</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Claim Number</th>
                <th>Policy Number</th>
                <th>Client</th>
                <th>Type</th>
                <th>Amount ($)</th>
                <th>Filing Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.length > 0 ? (
                filteredClaims.map(claim => (
                  <tr key={claim.id}>
                    <td>{claim.claimNumber}</td>
                    <td>{claim.policyNumber}</td>
                    <td>{claim.clientName}</td>
                    <td>{claim.type}</td>
                    <td>${claim.amount.toLocaleString()}</td>
                    <td>{claim.filingDate}</td>
                    <td>
                      <span className={`badge ${claim.status === 'Approved' ? 'bg-success' : 
                                         claim.status === 'Pending' ? 'bg-warning' : 
                                         claim.status === 'Under Review' ? 'bg-info' :
                                         claim.status === 'Denied' ? 'bg-danger' : 'bg-secondary'}`}>
                        {claim.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/claims/${claim.id}`} className="btn btn-sm btn-outline-primary">
                          <FaEye />
                        </Link>
                        <Link to={`/claims/${claim.id}/edit`} className="btn btn-sm btn-outline-secondary">
                          <FaEdit />
                        </Link>
                        <button className="btn btn-sm btn-outline-danger">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No claims found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
            </li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Claims;
