import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import initBootstrapComponents from './utils/bootstrap-init';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Policies from './pages/Policies';
import PolicyDetails from './pages/PolicyDetails';
import CreatePolicy from './pages/CreatePolicy';
import Clients from './pages/Clients';
import ClientDetails from './pages/ClientDetails';
import CreateClient from './pages/CreateClient';
import Claims from './pages/Claims';
import ClaimDetails from './pages/ClaimDetails';
import CreateClaim from './pages/CreateClaim';
import RecordPayment from './pages/RecordPayment';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  // Check authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  // Initialize Bootstrap components
  useEffect(() => {
    // Initialize Bootstrap components
    initBootstrapComponents();
  }, []);

  // Effect to listen for changes in localStorage
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    
    // Check auth status when component mounts
    checkAuth();
    
    // Listen for storage events (in case localStorage changes in another tab)
    window.addEventListener('storage', checkAuth);
    
    // Custom event listener for auth changes within the same tab
    const handleAuthChange = () => {
      checkAuth();
    };
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar />}
        <div className="container-fluid p-0">
          <div className="row g-0">
            {isAuthenticated && (
              <div className="col-md-2">
                <Sidebar />
              </div>
            )}
            <div className={isAuthenticated ? "col-md-10" : "col-md-12"}>
              <main className="main-content">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected Routes */}
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/policies" element={
                    <ProtectedRoute>
                      <Policies />
                    </ProtectedRoute>
                  } />
                  <Route path="/policies/:id" element={
                    <ProtectedRoute>
                      <PolicyDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/policies/create" element={
                    <ProtectedRoute>
                      <CreatePolicy />
                    </ProtectedRoute>
                  } />
                  <Route path="/clients" element={
                    <ProtectedRoute>
                      <Clients />
                    </ProtectedRoute>
                  } />
                  <Route path="/clients/:id" element={
                    <ProtectedRoute>
                      <ClientDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/clients/create" element={
                    <ProtectedRoute>
                      <CreateClient />
                    </ProtectedRoute>
                  } />
                  <Route path="/claims" element={
                    <ProtectedRoute>
                      <Claims />
                    </ProtectedRoute>
                  } />
                  <Route path="/claims/create" element={
                    <ProtectedRoute>
                      <CreateClaim />
                    </ProtectedRoute>
                  } />
                  <Route path="/claims/:id/record-payment" element={
                    <ProtectedRoute>
                      <RecordPayment />
                    </ProtectedRoute>
                  } />
                  <Route path="/claims/:id" element={
                    <ProtectedRoute>
                      <ClaimDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/payments" element={
                    <ProtectedRoute>
                      <Payments />
                    </ProtectedRoute>
                  } />
                  <Route path="/reports" element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
