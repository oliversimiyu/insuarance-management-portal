import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaArrowLeft, FaSave, FaUpload } from 'react-icons/fa';

const CreateClaim = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');

  // Claim validation schema
  const validationSchema = Yup.object({
    policyId: Yup.string().required('Policy is required'),
    incidentDate: Yup.date().required('Incident date is required').max(new Date(), 'Incident date cannot be in the future'),
    incidentLocation: Yup.string().required('Incident location is required'),
    description: Yup.string().required('Description is required').min(10, 'Please provide more details'),
    claimAmount: Yup.number().positive('Amount must be positive').required('Claim amount is required'),
    policeReport: Yup.string().required('Please specify if a police report was filed'),
    injuries: Yup.string().required('Please specify if there were any injuries'),
    witnesses: Yup.string().required('Please specify if there were any witnesses'),
    damageDescription: Yup.string().required('Damage description is required').min(10, 'Please provide more details')
  });

  // Mock policy data for dropdown
  const mockPolicies = [
    { id: 'POL-2025-001', type: 'Auto', client: 'John Doe' },
    { id: 'POL-2025-002', type: 'Home', client: 'Sarah Johnson' },
    { id: 'POL-2025-003', type: 'Life', client: 'Michael Smith' },
    { id: 'POL-2025-004', type: 'Health', client: 'Emily Wilson' },
    { id: 'POL-2025-005', type: 'Business', client: 'Corporate Solutions Inc.' }
  ];

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Clear any previous errors
    setFormError('');
    
    // In a real application, this would make an API call to create the claim
    // For demo purposes, we'll simulate a successful creation after a delay
    setTimeout(() => {
      console.log('Claim values:', values);
      
      // Show success message and redirect to claims list
      alert('Claim submitted successfully!');
      navigate('/claims');
      
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/claims" className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" /> Back to Claims
          </Link>
        </div>
        <h1 className="mb-0">File New Claim</h1>
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
              policyId: '',
              incidentDate: '',
              incidentLocation: '',
              description: '',
              claimAmount: '',
              policeReport: '',
              policeReportNumber: '',
              injuries: '',
              witnesses: '',
              damageDescription: '',
              additionalNotes: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="card-title mb-3">Policy Information</h5>
                  </div>
                  
                  <div className="col-md-12 mb-3">
                    <label htmlFor="policyId" className="form-label">Select Policy</label>
                    <Field as="select" name="policyId" className="form-select">
                      <option value="">Select a policy</option>
                      {mockPolicies.map(policy => (
                        <option key={policy.id} value={policy.id}>
                          {policy.id} - {policy.type} ({policy.client})
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="policyId" component="div" className="text-danger mt-1" />
                  </div>
                </div>
                
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="card-title mb-3">Incident Information</h5>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="incidentDate" className="form-label">Incident Date</label>
                    <Field type="date" name="incidentDate" className="form-control" />
                    <ErrorMessage name="incidentDate" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="incidentLocation" className="form-label">Incident Location</label>
                    <Field type="text" name="incidentLocation" className="form-control" placeholder="e.g. 123 Main St, Anytown, CA" />
                    <ErrorMessage name="incidentLocation" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-12 mb-3">
                    <label htmlFor="description" className="form-label">Incident Description</label>
                    <Field as="textarea" name="description" className="form-control" rows="4" placeholder="Please provide a detailed description of what happened" />
                    <ErrorMessage name="description" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="claimAmount" className="form-label">Estimated Claim Amount ($)</label>
                    <Field type="number" name="claimAmount" className="form-control" />
                    <ErrorMessage name="claimAmount" component="div" className="text-danger mt-1" />
                  </div>
                </div>
                
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="card-title mb-3">Additional Details</h5>
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="policeReport" className="form-label">Police Report Filed?</label>
                    <Field as="select" name="policeReport" className="form-select">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                    <ErrorMessage name="policeReport" component="div" className="text-danger mt-1" />
                  </div>
                  
                  {values.policeReport === 'Yes' && (
                    <div className="col-md-8 mb-3">
                      <label htmlFor="policeReportNumber" className="form-label">Police Report Number</label>
                      <Field type="text" name="policeReportNumber" className="form-control" />
                    </div>
                  )}
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="injuries" className="form-label">Any Injuries?</label>
                    <Field as="select" name="injuries" className="form-select">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                    <ErrorMessage name="injuries" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="witnesses" className="form-label">Any Witnesses?</label>
                    <Field as="select" name="witnesses" className="form-select">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                    <ErrorMessage name="witnesses" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-12 mb-3">
                    <label htmlFor="damageDescription" className="form-label">Damage Description</label>
                    <Field as="textarea" name="damageDescription" className="form-control" rows="3" placeholder="Please describe the damage in detail" />
                    <ErrorMessage name="damageDescription" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-12 mb-3">
                    <label htmlFor="additionalNotes" className="form-label">Additional Notes (Optional)</label>
                    <Field as="textarea" name="additionalNotes" className="form-control" rows="3" />
                  </div>
                </div>
                
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="card-title mb-3">Supporting Documents</h5>
                    <div className="mb-3">
                      <label htmlFor="documents" className="form-label">Upload Photos, Police Report, or Other Documents</label>
                      <div className="input-group">
                        <input type="file" className="form-control" id="documents" multiple />
                        <button className="btn btn-outline-secondary" type="button">
                          <FaUpload className="me-2" /> Upload
                        </button>
                      </div>
                      <div className="form-text">You can upload multiple files. Maximum size per file: 10MB.</div>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex justify-content-end mt-4">
                  <Link to="/claims" className="btn btn-outline-secondary me-2">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    <FaSave className="me-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Claim'}
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

export default CreateClaim;
