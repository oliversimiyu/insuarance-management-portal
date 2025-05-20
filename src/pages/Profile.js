import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaPhone, FaSave } from 'react-icons/fa';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Mock user data
  const mockUserData = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    companyName: 'Insurance Agency Inc.',
    phone: '(555) 123-4567',
    role: 'Administrator',
    joinDate: '2025-01-01'
  };

  // Profile validation schema
  const profileValidationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    companyName: Yup.string().required('Company name is required'),
    phone: Yup.string().required('Phone number is required')
  });

  // Password validation schema
  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  // Handle profile form submission
  const handleProfileSubmit = (values, { setSubmitting }) => {
    // In a real application, this would make an API call to update the profile
    setTimeout(() => {
      console.log('Profile update values:', values);
      setUpdateSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
      
      setSubmitting(false);
    }, 1000);
  };

  // Handle password form submission
  const handlePasswordSubmit = (values, { setSubmitting, resetForm }) => {
    // In a real application, this would make an API call to update the password
    setTimeout(() => {
      console.log('Password update values:', values);
      setUpdateSuccess(true);
      resetForm();
      
      // Hide success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
      
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container-fluid">
      <div className="page-header">
        <h1>Profile Settings</h1>
        <p className="text-muted">Manage your account information and preferences</p>
      </div>

      {updateSuccess && (
        <div className="alert alert-success" role="alert">
          Your changes have been saved successfully!
        </div>
      )}

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                  <FaUser size={40} className="text-primary" />
                </div>
                <h5 className="mb-0">{mockUserData.firstName} {mockUserData.lastName}</h5>
                <p className="text-muted">{mockUserData.role}</p>
              </div>
              
              <ul className="nav flex-column nav-pills">
                <li className="nav-item">
                  <button
                    className={`nav-link text-start ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <FaUser className="me-2" /> Profile Information
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link text-start ${activeTab === 'password' ? 'active' : ''}`}
                    onClick={() => setActiveTab('password')}
                  >
                    <FaLock className="me-2" /> Change Password
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              {activeTab === 'profile' ? (
                <div>
                  <h5 className="card-title mb-4">Profile Information</h5>
                  
                  <Formik
                    initialValues={{
                      firstName: mockUserData.firstName,
                      lastName: mockUserData.lastName,
                      email: mockUserData.email,
                      companyName: mockUserData.companyName,
                      phone: mockUserData.phone
                    }}
                    validationSchema={profileValidationSchema}
                    onSubmit={handleProfileSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">
                              <FaUser className="me-2" />
                              First Name
                            </label>
                            <Field
                              type="text"
                              name="firstName"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-danger mt-1"
                            />
                          </div>
                          
                          <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">
                              <FaUser className="me-2" />
                              Last Name
                            </label>
                            <Field
                              type="text"
                              name="lastName"
                              className="form-control"
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
                          />
                          <ErrorMessage
                            name="companyName"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label">
                            <FaPhone className="me-2" />
                            Phone Number
                          </label>
                          <Field
                            type="text"
                            name="phone"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">
                            Role
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={mockUserData.role}
                            disabled
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">
                            Join Date
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={mockUserData.joinDate}
                            disabled
                          />
                        </div>
                        
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          <FaSave className="me-2" />
                          {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              ) : (
                <div>
                  <h5 className="card-title mb-4">Change Password</h5>
                  
                  <Formik
                    initialValues={{
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    }}
                    validationSchema={passwordValidationSchema}
                    onSubmit={handlePasswordSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="mb-3">
                          <label htmlFor="currentPassword" className="form-label">
                            <FaLock className="me-2" />
                            Current Password
                          </label>
                          <Field
                            type="password"
                            name="currentPassword"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="currentPassword"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label htmlFor="newPassword" className="form-label">
                            <FaLock className="me-2" />
                            New Password
                          </label>
                          <Field
                            type="password"
                            name="newPassword"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="newPassword"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label htmlFor="confirmPassword" className="form-label">
                            <FaLock className="me-2" />
                            Confirm New Password
                          </label>
                          <Field
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                        
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          <FaSave className="me-2" />
                          {isSubmitting ? 'Updating...' : 'Update Password'}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
