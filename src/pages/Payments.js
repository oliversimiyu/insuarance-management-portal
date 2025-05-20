import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaMoneyBillWave } from 'react-icons/fa';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for payments
  const mockPayments = [
    {
      id: 1,
      transactionId: 'TRX-2025-001',
      policyNumber: 'POL-2025-001',
      clientName: 'John Doe',
      amount: 1200,
      paymentDate: '2025-01-15',
      method: 'Credit Card',
      status: 'Completed'
    },
    {
      id: 2,
      transactionId: 'TRX-2025-002',
      policyNumber: 'POL-2025-002',
      clientName: 'Sarah Johnson',
      amount: 950,
      paymentDate: '2025-02-10',
      method: 'Bank Transfer',
      status: 'Completed'
    },
    {
      id: 3,
      transactionId: 'TRX-2025-003',
      policyNumber: 'POL-2025-003',
      clientName: 'Michael Smith',
      amount: 1500,
      paymentDate: '2025-03-01',
      method: 'Credit Card',
      status: 'Completed'
    },
    {
      id: 4,
      transactionId: 'TRX-2025-004',
      policyNumber: 'POL-2025-004',
      clientName: 'Emily Wilson',
      amount: 2200,
      paymentDate: '2025-05-20',
      method: 'PayPal',
      status: 'Pending'
    },
    {
      id: 5,
      transactionId: 'TRX-2025-005',
      policyNumber: 'POL-2025-005',
      clientName: 'Corporate Solutions Inc.',
      amount: 5500,
      paymentDate: '2025-04-01',
      method: 'Bank Transfer',
      status: 'Completed'
    },
    {
      id: 6,
      transactionId: 'TRX-2025-006',
      policyNumber: 'POL-2025-006',
      clientName: 'Jennifer Adams',
      amount: 1100,
      paymentDate: '2025-05-15',
      method: 'Credit Card',
      status: 'Failed'
    },
    {
      id: 7,
      transactionId: 'TRX-2025-007',
      policyNumber: 'POL-2025-003',
      clientName: 'Michael Smith',
      amount: 750,
      paymentDate: '2025-06-01',
      method: 'PayPal',
      status: 'Pending'
    }
  ];

  // Filter payments based on search term and filters
  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = 
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-fluid">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1>Payments</h1>
          <p className="text-muted">Manage premium payments and transactions</p>
        </div>
        <Link to="/payments/create" className="btn btn-primary">
          <FaPlus className="me-2" /> Record Payment
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
                  placeholder="Search by transaction ID, policy number, or client name"
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
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Transaction ID</th>
                <th>Policy Number</th>
                <th>Client</th>
                <th>Amount ($)</th>
                <th>Payment Date</th>
                <th>Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map(payment => (
                  <tr key={payment.id}>
                    <td>{payment.transactionId}</td>
                    <td>{payment.policyNumber}</td>
                    <td>{payment.clientName}</td>
                    <td>${payment.amount.toLocaleString()}</td>
                    <td>{payment.paymentDate}</td>
                    <td>
                      <span className="d-flex align-items-center">
                        <FaMoneyBillWave className="me-2 text-success" />
                        {payment.method}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${payment.status === 'Completed' ? 'bg-success' : 
                                         payment.status === 'Pending' ? 'bg-warning' : 
                                         payment.status === 'Failed' ? 'bg-danger' : 'bg-info'}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/payments/${payment.id}`} className="btn btn-sm btn-outline-primary">
                          <FaEye />
                        </Link>
                        <Link to={`/payments/${payment.id}/edit`} className="btn btn-sm btn-outline-secondary">
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
                    No payments found matching your search criteria.
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

export default Payments;
