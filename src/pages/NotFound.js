import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="container text-center py-5">
      <div className="mb-4">
        <FaExclamationTriangle size={80} className="text-warning" />
      </div>
      <h1 className="display-4 mb-3">Page Not Found</h1>
      <p className="lead mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        <FaHome className="me-2" /> Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
