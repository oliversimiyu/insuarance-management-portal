import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaUserTie } from 'react-icons/fa';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data for clients
  const mockClients = [
    {
      id: 1,
      clientId: 'CL-2025-001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      type: 'Individual',
      policies: 2,
      joinDate: '2025-01-10'
    },
    {
      id: 2,
      clientId: 'CL-2025-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 234-5678',
      type: 'Individual',
      policies: 1,
      joinDate: '2025-02-15'
    },
    {
      id: 3,
      clientId: 'CL-2025-003',
      name: 'Corporate Solutions Inc.',
      email: 'contact@corpsolutions.com',
      phone: '(555) 987-6543',
      type: 'Corporate',
      policies: 5,
      joinDate: '2025-03-01'
    },
    {
      id: 4,
      clientId: 'CL-2025-004',
      name: 'Emily Wilson',
      email: 'emily.w@example.com',
      phone: '(555) 345-6789',
      type: 'Individual',
      policies: 2,
      joinDate: '2025-01-20'
    },
    {
      id: 5,
      clientId: 'CL-2025-005',
      name: 'Tech Innovators LLC',
      email: 'info@techinnovators.com',
      phone: '(555) 876-5432',
      type: 'Corporate',
      policies: 3,
      joinDate: '2025-04-05'
    },
    {
      id: 6,
      clientId: 'CL-2025-006',
      name: 'Michael Smith',
      email: 'michael.s@example.com',
      phone: '(555) 456-7890',
      type: 'Individual',
      policies: 1,
      joinDate: '2025-04-15'
    },
    {
      id: 7,
      clientId: 'CL-2025-007',
      name: 'Global Enterprises',
      email: 'contact@globalent.com',
      phone: '(555) 765-4321',
      type: 'Corporate',
      policies: 4,
      joinDate: '2025-05-01'
    }
  ];

  // Filter clients based on search term and filters
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = 
      client.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || client.type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="container-fluid">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1>Clients</h1>
          <p className="text-muted">Manage all client accounts</p>
        </div>
        <Link to="/clients/create" className="btn btn-primary">
          <FaPlus className="me-2" /> New Client
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
                  placeholder="Search by client ID, name, or email"
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
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="Individual">Individual</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Client ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Type</th>
                <th>Policies</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map(client => (
                  <tr key={client.id}>
                    <td>{client.clientId}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="me-2">
                          <FaUserTie className={client.type === 'Corporate' ? 'text-primary' : 'text-secondary'} />
                        </span>
                        {client.name}
                      </div>
                    </td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>
                      <span className={`badge ${client.type === 'Corporate' ? 'bg-primary' : 'bg-info'}`}>
                        {client.type}
                      </span>
                    </td>
                    <td>{client.policies}</td>
                    <td>{client.joinDate}</td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/clients/${client.id}`} className="btn btn-sm btn-outline-primary">
                          <FaEye />
                        </Link>
                        <Link to={`/clients/${client.id}/edit`} className="btn btn-sm btn-outline-secondary">
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
                    No clients found matching your search criteria.
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

export default Clients;
