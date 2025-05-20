import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter, FaFileAlt, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Policies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock data for policies
  const mockPolicies = [
    {
      id: 1,
      policyNumber: 'POL-2025-001',
      type: 'Auto',
      clientName: 'John Doe',
      startDate: '2025-01-15',
      endDate: '2026-01-14',
      premium: 1200,
      status: 'Active'
    },
    {
      id: 2,
      policyNumber: 'POL-2025-002',
      type: 'Home',
      clientName: 'Sarah Johnson',
      startDate: '2025-02-10',
      endDate: '2026-02-09',
      premium: 950,
      status: 'Active'
    },
    {
      id: 3,
      policyNumber: 'POL-2025-003',
      type: 'Life',
      clientName: 'Michael Smith',
      startDate: '2025-03-01',
      endDate: '2026-02-28',
      premium: 1500,
      status: 'Active'
    },
    {
      id: 4,
      policyNumber: 'POL-2025-004',
      type: 'Health',
      clientName: 'Emily Wilson',
      startDate: '2025-01-20',
      endDate: '2025-06-19',
      premium: 2200,
      status: 'Pending'
    },
    {
      id: 5,
      policyNumber: 'POL-2024-089',
      type: 'Travel',
      clientName: 'David Brown',
      startDate: '2024-12-10',
      endDate: '2025-06-09',
      premium: 450,
      status: 'Expired'
    },
    {
      id: 6,
      policyNumber: 'POL-2025-005',
      type: 'Business',
      clientName: 'Corporate Solutions Inc.',
      startDate: '2025-04-01',
      endDate: '2026-03-31',
      premium: 5500,
      status: 'Active'
    },
    {
      id: 7,
      policyNumber: 'POL-2025-006',
      type: 'Auto',
      clientName: 'Jennifer Adams',
      startDate: '2025-05-15',
      endDate: '2026-05-14',
      premium: 1100,
      status: 'Pending'
    }
  ];

  // Filter policies based on search term and filters
  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesSearch = 
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || policy.status === filterStatus;
    const matchesType = filterType === 'all' || policy.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get unique policy types for filter dropdown
  const policyTypes = [...new Set(mockPolicies.map(policy => policy.type))];

  return (
    <div className="container-fluid">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1>Policies</h1>
          <p className="text-muted">Manage all insurance policies</p>
        </div>
        <Link to="/policies/create" className="btn btn-primary">
          <FaPlus className="me-2" /> New Policy
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by policy number, client name, or type"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
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
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Expired">Expired</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaFileAlt />
                </span>
                <select
                  className="form-select"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {policyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Policies Table */}
      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Policy Number</th>
                <th>Type</th>
                <th>Client</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Premium ($)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPolicies.length > 0 ? (
                filteredPolicies.map(policy => (
                  <tr key={policy.id}>
                    <td>{policy.policyNumber}</td>
                    <td>{policy.type}</td>
                    <td>{policy.clientName}</td>
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
                      <div className="btn-group">
                        <Link to={`/policies/${policy.id}`} className="btn btn-sm btn-outline-primary">
                          <FaEye />
                        </Link>
                        <Link to={`/policies/${policy.id}/edit`} className="btn btn-sm btn-outline-secondary">
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
                    No policies found matching your search criteria.
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
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Policies;
