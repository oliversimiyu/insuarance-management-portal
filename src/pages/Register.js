import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock, FaBuilding } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState('');

  // Registration validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    companyName: Yup.string()
      .required('Company name is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Clear any previous errors
    setRegistrationError('');
    
    // In a real application, this would make an API call to register the user
    // For demo purposes, we'll simulate a successful registration after a delay
    setTimeout(() => {
      // Simulate successful registration
      console.log('Registration values:', values);
      
      // Show success message and redirect to login
      alert('Registration successful! Please login with your credentials.');
      navigate('/login');
      
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="auth-container">
        <div className="text-center mb-4">
          <h2 className="mb-3">Create an Account</h2>
          <p className="text-muted">Join the InsureManage Portal</p>
        </div>
        
        {registrationError && (
          <div className="alert alert-danger" role="alert">
            {registrationError}
          </div>
        )}
        
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            companyName: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    <FaUser className="me-2" />
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    <FaUser className="me-2" />
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <FaEnvelope className="me-2" />
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
                <label htmlFor="companyName" className="form-label">
                  <FaBuilding className="me-2" />
                  Company Name
                </label>
                <Field
                  type="text"
                  name="companyName"
                  className="form-control"
                  placeholder="Enter your company name"
                />
                <ErrorMessage
                  name="companyName"
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
                  placeholder="Create a password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  <FaLock className="me-2" />
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              
              <div className="mb-3 form-check">
                <Field
                  type="checkbox"
                  name="agreeTerms"
                  className="form-check-input"
                  id="agreeTerms"
                />
                <label className="form-check-label" htmlFor="agreeTerms">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
              
              <div className="mt-3 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-none">
                    Sign in
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
