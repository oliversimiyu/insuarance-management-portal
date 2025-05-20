import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaArrowLeft, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';

const RecordPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validation schema
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required('Payment amount is required')
      .positive('Amount must be positive'),
    paymentDate: Yup.date()
      .required('Payment date is required')
      .max(new Date(), 'Payment date cannot be in the future'),
    paymentMethod: Yup.string()
      .required('Payment method is required'),
    reference: Yup.string()
      .required('Reference number is required'),
    notes: Yup.string()
  });

  // Initial form values
  const initialValues = {
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: '',
    reference: '',
    notes: ''
  };

  useEffect(() => {
    // Fetch claim details - in a real app, this would be an API call
    const fetchClaimDetails = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock claim data
        const mockClaim = {
          id: parseInt(id),
          claimNumber: `CLM-2025-00${id}`,
          policyNumber: 'POL-2025-001',
          policyType: 'Auto',
          clientId: 'CL-2025-001',
          clientName: 'John Doe',
          incidentDate: '2025-04-05',
          filingDate: '2025-04-10',
          status: 'Approved',
          amount: 5000.00,
          description: 'Vehicle damage due to accident',
          remainingBalance: 2500.00
        };
        
        setClaim(mockClaim);
      } catch (error) {
        console.error('Error fetching claim details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClaimDetails();
  }, [id]);

  const handleSubmit = (values, { setSubmitting }) => {
    // In a real app, this would be an API call to record the payment
    setTimeout(() => {
      console.log('Payment recorded:', values);
      alert(`Payment of $${values.amount} recorded successfully!`);
      navigate(`/claims/${id}`);
      setSubmitting(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading claim details...</p>
        </div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          Claim not found. The claim may have been deleted or you don't have permission to view it.
        </div>
        <Link to="/claims" className="btn btn-primary">
          <FaArrowLeft className="me-2" /> Back to Claims
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to={`/claims/${id}`} className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" /> Back to Claim
          </Link>
        </div>
        <h2 className="mb-0">Record Payment</h2>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Claim Information</h5>
            </div>
            <div className="card-body">
              <p><strong>Claim Number:</strong> {claim.claimNumber}</p>
              <p><strong>Policy Number:</strong> {claim.policyNumber}</p>
              <p><strong>Client:</strong> {claim.clientName}</p>
              <p><strong>Status:</strong> <span className="badge bg-success">{claim.status}</span></p>
              <p><strong>Total Amount:</strong> ${claim.amount.toFixed(2)}</p>
              <p><strong>Remaining Balance:</strong> ${claim.remainingBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Payment Details</h5>
            </div>
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="amount" className="form-label">Payment Amount ($)</label>
                        <div className="input-group">
                          <span className="input-group-text"><FaDollarSign /></span>
                          <Field 
                            type="number" 
                            name="amount" 
                            className="form-control" 
                            placeholder="0.00"
                            step="0.01"
                            min="0.01"
                            max={claim.remainingBalance}
                          />
                        </div>
                        <ErrorMessage name="amount" component="div" className="text-danger" />
                        <small className="text-muted">Maximum payment: ${claim.remainingBalance.toFixed(2)}</small>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="paymentDate" className="form-label">Payment Date</label>
                        <div className="input-group">
                          <span className="input-group-text"><FaCalendarAlt /></span>
                          <Field type="date" name="paymentDate" className="form-control" />
                        </div>
                        <ErrorMessage name="paymentDate" component="div" className="text-danger" />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                        <Field as="select" name="paymentMethod" className="form-select">
                          <option value="">Select payment method</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="Debit Card">Debit Card</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Check">Check</option>
                          <option value="Cash">Cash</option>
                        </Field>
                        <ErrorMessage name="paymentMethod" component="div" className="text-danger" />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="reference" className="form-label">Reference Number</label>
                        <Field type="text" name="reference" className="form-control" placeholder="Transaction ID or check number" />
                        <ErrorMessage name="reference" component="div" className="text-danger" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="notes" className="form-label">Notes</label>
                      <Field as="textarea" name="notes" className="form-control" rows="3" placeholder="Additional payment details" />
                      <ErrorMessage name="notes" component="div" className="text-danger" />
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Link to={`/claims/${id}`} className="btn btn-outline-secondary me-md-2">Cancel</Link>
                      <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaDollarSign className="me-2" /> Record Payment
                          </>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordPayment;
