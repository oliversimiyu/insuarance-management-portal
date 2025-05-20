import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaArrowLeft, FaSave, FaUser, FaBuilding } from 'react-icons/fa';

const CreateClient = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');

  // Client validation schema
  const validationSchema = Yup.object({
    type: Yup.string().required('Client type is required'),
    firstName: Yup.string().when(['type'], {
      is: 'Individual',
      then: () => Yup.string().required('First name is required'),
      otherwise: () => Yup.string().nullable()
    }),
    lastName: Yup.string().when(['type'], {
      is: 'Individual',
      then: () => Yup.string().required('Last name is required'),
      otherwise: () => Yup.string().nullable()
    }),
    companyName: Yup.string().when(['type'], {
      is: 'Corporate',
      then: () => Yup.string().required('Company name is required'),
      otherwise: () => Yup.string().nullable()
    }),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    street: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('ZIP code is required'),
    country: Yup.string().required('Country is required')
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Clear any previous errors
    setFormError('');
    
    // In a real application, this would make an API call to create the client
    // For demo purposes, we'll simulate a successful creation after a delay
    setTimeout(() => {
      console.log('Client values:', values);
      
      // Show success message and redirect to clients list
      alert('Client created successfully!');
      navigate('/clients');
      
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/clients" className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" /> Back to Clients
          </Link>
        </div>
        <h1 className="mb-0">Add New Client</h1>
        <div></div> {/* Empty div for flex alignment */}
      </div>

      {formError && (
        <div className="alert alert-danger" role="alert">
          {formError}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <Formik
            initialValues={{
              type: 'Individual',
              firstName: '',
              lastName: '',
              companyName: '',
              email: '',
              phone: '',
              street: '',
              city: '',
              state: '',
              zipCode: '',
              country: 'USA'
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="card-title mb-3">Client Information</h5>
                  </div>
                  
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Client Type</label>
                    <div className="d-flex">
                      <div className="form-check me-4">
                        <Field 
                          type="radio" 
                          name="type" 
                          value="Individual" 
                          className="form-check-input" 
                          id="typeIndividual" 
                        />
                        <label className="form-check-label" htmlFor="typeIndividual">
                          <FaUser className="me-2" /> Individual
                        </label>
                      </div>
                      <div className="form-check">
                        <Field 
                          type="radio" 
                          name="type" 
                          value="Corporate" 
                          className="form-check-input" 
                          id="typeCorporate" 
                        />
                        <label className="form-check-label" htmlFor="typeCorporate">
                          <FaBuilding className="me-2" /> Corporate
                        </label>
                      </div>
                    </div>
                    <ErrorMessage name="type" component="div" className="text-danger mt-1" />
                  </div>
                  
                  {values.type === 'Individual' ? (
                    <>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <Field type="text" name="firstName" className="form-control" />
                        <ErrorMessage name="firstName" component="div" className="text-danger mt-1" />
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <Field type="text" name="lastName" className="form-control" />
                        <ErrorMessage name="lastName" component="div" className="text-danger mt-1" />
                      </div>
                    </>
                  ) : (
                    <div className="col-md-12 mb-3">
                      <label htmlFor="companyName" className="form-label">Company Name</label>
                      <Field type="text" name="companyName" className="form-control" />
                      <ErrorMessage name="companyName" component="div" className="text-danger mt-1" />
                    </div>
                  )}
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <Field type="email" name="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <Field type="text" name="phone" className="form-control" />
                    <ErrorMessage name="phone" component="div" className="text-danger mt-1" />
                  </div>
                </div>
                
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="card-title mb-3">Address Information</h5>
                  </div>
                  
                  <div className="col-md-12 mb-3">
                    <label htmlFor="street" className="form-label">Street Address</label>
                    <Field type="text" name="street" className="form-control" />
                    <ErrorMessage name="street" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <Field type="text" name="city" className="form-control" />
                    <ErrorMessage name="city" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label">State/Province</label>
                    <Field type="text" name="state" className="form-control" />
                    <ErrorMessage name="state" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="zipCode" className="form-label">ZIP/Postal Code</label>
                    <Field type="text" name="zipCode" className="form-control" />
                    <ErrorMessage name="zipCode" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-12 mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <Field as="select" name="country" className="form-select">
                      <option value="USA">United States</option>
                      <option value="CAN">Canada</option>
                      <option value="GBR">United Kingdom</option>
                      <option value="AUS">Australia</option>
                      <option value="DEU">Germany</option>
                      <option value="FRA">France</option>
                      <option value="JPN">Japan</option>
                      <option value="CHN">China</option>
                      <option value="IND">India</option>
                      <option value="BRA">Brazil</option>
                    </Field>
                    <ErrorMessage name="country" component="div" className="text-danger mt-1" />
                  </div>
                </div>
                
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="card-title mb-3">Additional Information</h5>
                  </div>
                  
                  <div className="col-md-12 mb-3">
                    <label htmlFor="notes" className="form-label">Notes</label>
                    <Field as="textarea" name="notes" className="form-control" rows="4" />
                  </div>
                </div>
                
                <div className="d-flex justify-content-end mt-4">
                  <Link to="/clients" className="btn btn-outline-secondary me-2">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    <FaSave className="me-2" />
                    {isSubmitting ? 'Saving...' : 'Create Client'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateClient;
