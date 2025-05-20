import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaFileAlt, 
  FaClipboardList, 
  FaMoneyBillWave,
  FaChartLine,
  FaExclamationTriangle
} from 'react-icons/fa';

const Dashboard = () => {
  // Mock data for dashboard stats
  const stats = {
    totalClients: 156,
    activePolicies: 243,
    pendingClaims: 12,
    revenueThisMonth: 45750,
    expiringPolicies: 8,
    pendingPayments: 5
  };

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, type: 'policy', action: 'created', item: 'Auto Insurance - John Doe', date: '2025-05-19' },
    { id: 2, type: 'claim', action: 'approved', item: 'Health Claim #45678', date: '2025-05-18' },
    { id: 3, type: 'payment', action: 'received', item: '$1,200 from Sarah Johnson', date: '2025-05-17' },
    { id: 4, type: 'client', action: 'added', item: 'New client: Michael Smith', date: '2025-05-16' },
    { id: 5, type: 'policy', action: 'renewed', item: 'Home Insurance - Emma Wilson', date: '2025-05-15' }
  ];

  return (
    <div className="container-fluid">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="text-muted">Welcome to your insurance management portal</p>
      </div>

      {/* Stats Cards */}
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="dashboard-card primary">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{stats.totalClients}</h3>
                <p className="mb-0">Total Clients</p>
              </div>
              <FaUsers size={30} />
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="dashboard-card success">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{stats.activePolicies}</h3>
                <p className="mb-0">Active Policies</p>
              </div>
              <FaFileAlt size={30} />
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="dashboard-card warning">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>{stats.pendingClaims}</h3>
                <p className="mb-0">Pending Claims</p>
              </div>
              <FaClipboardList size={30} />
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="dashboard-card danger">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>${stats.revenueThisMonth.toLocaleString()}</h3>
                <p className="mb-0">Revenue This Month</p>
              </div>
              <FaMoneyBillWave size={30} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Activities */}
        <div className="col-md-8 mb-4">
          <div className="card h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Recent Activities</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Activity</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map(activity => (
                      <tr key={activity.id}>
                        <td>{activity.item}</td>
                        <td>{activity.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer bg-white text-center">
              <Link to="/reports" className="btn btn-sm btn-outline-primary">
                View All Activities
              </Link>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Alerts & Notifications</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-warning">
                <div className="d-flex">
                  <div className="me-3">
                    <FaExclamationTriangle size={24} />
                  </div>
                  <div>
                    <h6 className="alert-heading">Expiring Policies</h6>
                    <p className="mb-0">{stats.expiringPolicies} policies expiring in the next 30 days</p>
                    <Link to="/policies" className="alert-link">View policies</Link>
                  </div>
                </div>
              </div>
              
              <div className="alert alert-info">
                <div className="d-flex">
                  <div className="me-3">
                    <FaMoneyBillWave size={24} />
                  </div>
                  <div>
                    <h6 className="alert-heading">Pending Payments</h6>
                    <p className="mb-0">{stats.pendingPayments} payments awaiting processing</p>
                    <Link to="/payments" className="alert-link">View payments</Link>
                  </div>
                </div>
              </div>
              
              <div className="alert alert-success">
                <div className="d-flex">
                  <div className="me-3">
                    <FaChartLine size={24} />
                  </div>
                  <div>
                    <h6 className="alert-heading">Monthly Report</h6>
                    <p className="mb-0">Your monthly performance report is ready</p>
                    <Link to="/reports" className="alert-link">View report</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
