import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const CreatePolicy = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');

  // Policy validation schema
  const validationSchema = Yup.object({
    clientId: Yup.string().required('Client is required'),
    type: Yup.string().required('Policy type is required'),
    subtype: Yup.string().required('Policy subtype is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
    premium: Yup.number().positive('Premium must be positive').required('Premium is required'),
    paymentFrequency: Yup.string().required('Payment frequency is required'),
    coverageDetails: Yup.array().of(
      Yup.object({
        type: Yup.string().required('Coverage type is required'),
        limit: Yup.string().required('Coverage limit is required'),
        deductible: Yup.string().required('Deductible is required')
      })
    ),
    insuredItems: Yup.array().of(
      Yup.object({
        type: Yup.string().required('Item type is required'),
        make: Yup.string().when(['type'], {
            is: 'Vehicle',
            then: () => Yup.string().required('Make is required'),
            otherwise: () => Yup.string().nullable()
        }),
        model: Yup.string().when(['type'], {
            is: 'Vehicle',
            then: () => Yup.string().required('Model is required'),
            otherwise: () => Yup.string().nullable()
        }),
        year: Yup.string().when(['type'], {
            is: 'Vehicle',
            then: () => Yup.string().required('Year is required'),
            otherwise: () => Yup.string().nullable()
        }),
        value: Yup.string().required('Value is required')
      })
    )
  });

  // Mock client data for dropdown
  const mockClients = [
    { id: 'CL-2025-001', name: 'John Doe' },
    { id: 'CL-2025-002', name: 'Sarah Johnson' },
    { id: 'CL-2025-003', name: 'Corporate Solutions Inc.' },
    { id: 'CL-2025-004', name: 'Emily Wilson' },
    { id: 'CL-2025-005', name: 'Tech Innovators LLC' }
  ];

  // Policy types and subtypes
  const policyTypes = [
    { value: 'Auto', subtypes: ['Comprehensive', 'Collision', 'Liability'] },
    { value: 'Home', subtypes: ['Homeowners', 'Renters', 'Landlord'] },
    { value: 'Life', subtypes: ['Term', 'Whole Life', 'Universal'] },
    { value: 'Health', subtypes: ['Individual', 'Family', 'Group'] },
    { value: 'Business', subtypes: ['General Liability', 'Professional Liability', 'Workers Compensation'] },
    { value: 'Travel', subtypes: ['Single Trip', 'Annual Multi-Trip', 'Long Stay'] }
  ];

  // Coverage types based on policy type
  const getCoverageTypes = (policyType) => {
    switch (policyType) {
      case 'Auto':
        return ['Liability', 'Collision', 'Comprehensive', 'Personal Injury', 'Uninsured Motorist'];
      case 'Home':
        return ['Dwelling', 'Personal Property', 'Liability', 'Medical Payments', 'Additional Living Expenses'];
      case 'Life':
        return ['Death Benefit', 'Cash Value', 'Disability Waiver'];
      case 'Health':
        return ['Hospitalization', 'Prescription', 'Preventive Care', 'Emergency Services', 'Specialist Services'];
      case 'Business':
        return ['General Liability', 'Property', 'Professional Liability', 'Business Interruption', 'Workers Compensation'];
      case 'Travel':
        return ['Medical Expenses', 'Trip Cancellation', 'Lost Luggage', 'Travel Delay', 'Emergency Evacuation'];
      default:
        return [];
    }
  };

  // Item types based on policy type
  const getItemTypes = (policyType) => {
    switch (policyType) {
      case 'Auto':
        return ['Vehicle'];
      case 'Home':
        return ['Building', 'Personal Property', 'Valuable Items'];
      case 'Business':
        return ['Building', 'Equipment', 'Inventory', 'Vehicles'];
      default:
        return ['Other'];
    }
  };

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Clear any previous errors
    setFormError('');
    
    // In a real application, this would make an API call to create the policy
    // For demo purposes, we'll simulate a successful creation after a delay
    setTimeout(() => {
      console.log('Policy values:', values);
      
      // Show success message and redirect to policies list
      alert('Policy created successfully!');
      navigate('/policies');
      
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/policies" className="btn btn-outline-secondary">
            <FaArrowLeft className="me-2" /> Back to Policies
          </Link>
        </div>
        <h1 className="mb-0">Create New Policy</h1>
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
              clientId: '',
              type: '',
              subtype: '',
              startDate: '',
              endDate: '',
              premium: '',
              paymentFrequency: 'Monthly',
              coverageDetails: [
                { type: '', limit: '', deductible: '' }
              ],
              insuredItems: [
                { type: '', make: '', model: '', year: '', vin: '', value: '' }
              ]
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="card-title mb-3">Basic Information</h5>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="clientId" className="form-label">Client</label>
                    <Field as="select" name="clientId" className="form-select">
                      <option value="">Select a client</option>
                      {mockClients.map(client => (
                        <option key={client.id} value={client.id}>
                          {client.name} ({client.id})
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="clientId" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label htmlFor="type" className="form-label">Policy Type</label>
                    <Field 
                      as="select" 
                      name="type" 
                      className="form-select"
                      onChange={(e) => {
                        const selectedType = e.target.value;
                        setFieldValue('type', selectedType);
                        setFieldValue('subtype', '');
                        
                        // Reset coverage details with first coverage type
                        const coverageTypes = getCoverageTypes(selectedType);
                        if (coverageTypes.length > 0) {
                          setFieldValue('coverageDetails', [{ 
                            type: coverageTypes[0], 
                            limit: '', 
                            deductible: '' 
                          }]);
                        }
                        
                        // Reset insured items with first item type
                        const itemTypes = getItemTypes(selectedType);
                        if (itemTypes.length > 0) {
                          setFieldValue('insuredItems', [{ 
                            type: itemTypes[0], 
                            make: '', 
                            model: '', 
                            year: '', 
                            vin: '', 
                            value: '' 
                          }]);
                        }
                      }}
                    >
                      <option value="">Select policy type</option>
                      {policyTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.value}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="type" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label htmlFor="subtype" className="form-label">Policy Subtype</label>
                    <Field as="select" name="subtype" className="form-select">
                      <option value="">Select subtype</option>
                      {values.type && policyTypes.find(t => t.value === values.type)?.subtypes.map(subtype => (
                        <option key={subtype} value={subtype}>
                          {subtype}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="subtype" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label htmlFor="startDate" className="form-label">Start Date</label>
                    <Field type="date" name="startDate" className="form-control" />
                    <ErrorMessage name="startDate" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label htmlFor="endDate" className="form-label">End Date</label>
                    <Field type="date" name="endDate" className="form-control" />
                    <ErrorMessage name="endDate" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label htmlFor="premium" className="form-label">Premium ($)</label>
                    <Field type="number" name="premium" className="form-control" />
                    <ErrorMessage name="premium" component="div" className="text-danger mt-1" />
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label htmlFor="paymentFrequency" className="form-label">Payment Frequency</label>
                    <Field as="select" name="paymentFrequency" className="form-select">
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Semi-Annual">Semi-Annual</option>
                      <option value="Annual">Annual</option>
                    </Field>
                    <ErrorMessage name="paymentFrequency" component="div" className="text-danger mt-1" />
                  </div>
                </div>
                
                {/* Coverage Details */}
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="card-title mb-3">Coverage Details</h5>
                    <FieldArray name="coverageDetails">
                      {({ remove, push }) => (
                        <div>
                          {values.coverageDetails.map((coverage, index) => (
                            <div className="row mb-3" key={index}>
                              <div className="col-md-4">
                                <label htmlFor={`coverageDetails.${index}.type`} className="form-label">
                                  Coverage Type
                                </label>
                                <Field 
                                  as="select" 
                                  name={`coverageDetails.${index}.type`} 
                                  className="form-select"
                                >
                                  <option value="">Select coverage type</option>
                                  {getCoverageTypes(values.type).map(coverageType => (
                                    <option key={coverageType} value={coverageType}>
                                      {coverageType}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage 
                                  name={`coverageDetails.${index}.type`} 
                                  component="div" 
                                  className="text-danger mt-1" 
                                />
                              </div>
                              
                              <div className="col-md-3">
                                <label htmlFor={`coverageDetails.${index}.limit`} className="form-label">
                                  Coverage Limit
                                </label>
                                <Field 
                                  type="text" 
                                  name={`coverageDetails.${index}.limit`} 
                                  className="form-control"
                                  placeholder="e.g. $100,000"
                                />
                                <ErrorMessage 
                                  name={`coverageDetails.${index}.limit`} 
                                  component="div" 
                                  className="text-danger mt-1" 
                                />
                              </div>
                              
                              <div className="col-md-3">
                                <label htmlFor={`coverageDetails.${index}.deductible`} className="form-label">
                                  Deductible
                                </label>
                                <Field 
                                  type="text" 
                                  name={`coverageDetails.${index}.deductible`} 
                                  className="form-control"
                                  placeholder="e.g. $500"
                                />
                                <ErrorMessage 
                                  name={`coverageDetails.${index}.deductible`} 
                                  component="div" 
                                  className="text-danger mt-1" 
                                />
                              </div>
                              
                              <div className="col-md-2 d-flex align-items-end mb-3">
                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => remove(index)}
                                  >
                                    <FaTrash />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => push({ type: '', limit: '', deductible: '' })}
                          >
                            <FaPlus className="me-2" /> Add Coverage
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
                
                {/* Insured Items */}
                <div className="row mb-4">
                  <div className="col-12">
                    <h5 className="card-title mb-3">Insured Items</h5>
                    <FieldArray name="insuredItems">
                      {({ remove, push }) => (
                        <div>
                          {values.insuredItems.map((item, index) => (
                            <div className="card mb-3" key={index}>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-md-3 mb-3">
                                    <label htmlFor={`insuredItems.${index}.type`} className="form-label">
                                      Item Type
                                    </label>
                                    <Field 
                                      as="select" 
                                      name={`insuredItems.${index}.type`} 
                                      className="form-select"
                                    >
                                      <option value="">Select item type</option>
                                      {getItemTypes(values.type).map(itemType => (
                                        <option key={itemType} value={itemType}>
                                          {itemType}
                                        </option>
                                      ))}
                                    </Field>
                                    <ErrorMessage 
                                      name={`insuredItems.${index}.type`} 
                                      component="div" 
                                      className="text-danger mt-1" 
                                    />
                                  </div>
                                  
                                  {values.insuredItems[index].type === 'Vehicle' && (
                                    <>
                                      <div className="col-md-3 mb-3">
                                        <label htmlFor={`insuredItems.${index}.make`} className="form-label">
                                          Make
                                        </label>
                                        <Field 
                                          type="text" 
                                          name={`insuredItems.${index}.make`} 
                                          className="form-control"
                                        />
                                        <ErrorMessage 
                                          name={`insuredItems.${index}.make`} 
                                          component="div" 
                                          className="text-danger mt-1" 
                                        />
                                      </div>
                                      
                                      <div className="col-md-3 mb-3">
                                        <label htmlFor={`insuredItems.${index}.model`} className="form-label">
                                          Model
                                        </label>
                                        <Field 
                                          type="text" 
                                          name={`insuredItems.${index}.model`} 
                                          className="form-control"
                                        />
                                        <ErrorMessage 
                                          name={`insuredItems.${index}.model`} 
                                          component="div" 
                                          className="text-danger mt-1" 
                                        />
                                      </div>
                                      
                                      <div className="col-md-3 mb-3">
                                        <label htmlFor={`insuredItems.${index}.year`} className="form-label">
                                          Year
                                        </label>
                                        <Field 
                                          type="text" 
                                          name={`insuredItems.${index}.year`} 
                                          className="form-control"
                                        />
                                        <ErrorMessage 
                                          name={`insuredItems.${index}.year`} 
                                          component="div" 
                                          className="text-danger mt-1" 
                                        />
                                      </div>
                                      
                                      <div className="col-md-6 mb-3">
                                        <label htmlFor={`insuredItems.${index}.vin`} className="form-label">
                                          VIN
                                        </label>
                                        <Field 
                                          type="text" 
                                          name={`insuredItems.${index}.vin`} 
                                          className="form-control"
                                        />
                                      </div>
                                    </>
                                  )}
                                  
                                  <div className="col-md-3 mb-3">
                                    <label htmlFor={`insuredItems.${index}.value`} className="form-label">
                                      Value
                                    </label>
                                    <Field 
                                      type="text" 
                                      name={`insuredItems.${index}.value`} 
                                      className="form-control"
                                      placeholder="e.g. $25,000"
                                    />
                                    <ErrorMessage 
                                      name={`insuredItems.${index}.value`} 
                                      component="div" 
                                      className="text-danger mt-1" 
                                    />
                                  </div>
                                </div>
                                
                                {index > 0 && (
                                  <div className="text-end">
                                    <button
                                      type="button"
                                      className="btn btn-outline-danger"
                                      onClick={() => remove(index)}
                                    >
                                      <FaTrash className="me-2" /> Remove Item
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => push({ 
                              type: getItemTypes(values.type)[0] || '', 
                              make: '', 
                              model: '', 
                              year: '', 
                              vin: '', 
                              value: '' 
                            })}
                          >
                            <FaPlus className="me-2" /> Add Item
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
                
                <div className="d-flex justify-content-end mt-4">
                  <Link to="/policies" className="btn btn-outline-secondary me-2">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    <FaSave className="me-2" />
                    {isSubmitting ? 'Saving...' : 'Create Policy'}
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

export default CreatePolicy;
