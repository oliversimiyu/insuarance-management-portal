import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaLock, FaUser } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  // Login validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Clear any previous errors
    setLoginError('');
    
    // In a real application, this would make an API call to authenticate
    // For demo purposes, we'll simulate a successful login after a delay
    setTimeout(() => {
      // Mock credentials check - in a real app this would be handled by a server
      if (values.email === 'admin@example.com' && values.password === 'password') {
        // Store auth token or user data in localStorage/context
        localStorage.setItem('isAuthenticated', 'true');
        // Redirect to dashboard
        navigate('/');
      } else {
        setLoginError('Invalid email or password');
      }
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="auth-container">
        <div className="text-center mb-4">
          <h2 className="mb-3">InsureManage Portal</h2>
          <p className="text-muted">Sign in to your account</p>
        </div>
        
        {loginError && (
          <div className="alert alert-danger" role="alert">
            {loginError}
          </div>
        )}
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <FaUser className="me-2" />
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <FaLock className="me-2" />
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              
              <div className="mb-3 form-check">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
              
              <div className="mt-3 text-center">
                <p>
                  Don't have an account?{' '}
                  <Link to="/register" className="text-decoration-none">
                    Register here
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
        
        <div className="mt-4 text-center text-muted">
          <small>Demo credentials: admin@example.com / password</small>
        </div>
      </div>
    </div>
  );
};

export default Login;
