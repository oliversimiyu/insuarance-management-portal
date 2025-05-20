import React, { useState, useRef } from 'react';
import { FaDownload, FaChartBar, FaChartLine, FaChartPie, FaCalendarAlt, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Reports = () => {
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState('month');
  const [isExporting, setIsExporting] = useState(false);
  
  // Create refs for the content to be exported
  const mainReportRef = useRef(null);
  const policyDistributionRef = useRef(null);
  const claimsAnalysisRef = useRef(null);

  // Mock data for reports
  const mockReportData = {
    revenue: {
      month: [
        { label: 'Jan', value: 35000 },
        { label: 'Feb', value: 42000 },
        { label: 'Mar', value: 38000 },
        { label: 'Apr', value: 45000 },
        { label: 'May', value: 48000 }
      ],
      quarter: [
        { label: 'Q1', value: 115000 },
        { label: 'Q2', value: 130000 }
      ],
      year: [
        { label: '2024', value: 420000 },
        { label: '2025 (YTD)', value: 245000 }
      ]
    },
    policies: {
      month: [
        { label: 'Jan', value: 45 },
        { label: 'Feb', value: 52 },
        { label: 'Mar', value: 48 },
        { label: 'Apr', value: 60 },
        { label: 'May', value: 55 }
      ],
      quarter: [
        { label: 'Q1', value: 145 },
        { label: 'Q2', value: 115 }
      ],
      year: [
        { label: '2024', value: 520 },
        { label: '2025 (YTD)', value: 260 }
      ]
    },
    claims: {
      month: [
        { label: 'Jan', value: 12 },
        { label: 'Feb', value: 15 },
        { label: 'Mar', value: 10 },
        { label: 'Apr', value: 18 },
        { label: 'May', value: 14 }
      ],
      quarter: [
        { label: 'Q1', value: 37 },
        { label: 'Q2', value: 32 }
      ],
      year: [
        { label: '2024', value: 145 },
        { label: '2025 (YTD)', value: 69 }
      ]
    },
    clients: {
      month: [
        { label: 'Jan', value: 20 },
        { label: 'Feb', value: 25 },
        { label: 'Mar', value: 18 },
        { label: 'Apr', value: 30 },
        { label: 'May', value: 22 }
      ],
      quarter: [
        { label: 'Q1', value: 63 },
        { label: 'Q2', value: 52 }
      ],
      year: [
        { label: '2024', value: 230 },
        { label: '2025 (YTD)', value: 115 }
      ]
    }
  };

  // Get current report data based on selected type and date range
  const currentReportData = mockReportData[reportType][dateRange];

  // Calculate total for current report
  const reportTotal = currentReportData.reduce((total, item) => total + item.value, 0);

  // Get report title and unit based on type
  const getReportInfo = () => {
    switch (reportType) {
      case 'revenue':
        return { title: 'Revenue Report', unit: '$' };
      case 'policies':
        return { title: 'Policy Sales Report', unit: '' };
      case 'claims':
        return { title: 'Claims Report', unit: '' };
      case 'clients':
        return { title: 'New Clients Report', unit: '' };
      default:
        return { title: 'Report', unit: '' };
    }
  };

  const { title, unit } = getReportInfo();

  // Function to export report as PDF
  const exportToPDF = async (reportType = 'all') => {
    setIsExporting(true);
    
    try {
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      
      // Add title to the PDF
      pdf.setFontSize(18);
      pdf.setTextColor(40, 40, 40);
      const reportTitle = `${title} - ${getDateRangeTitle()} (${new Date().toLocaleDateString()})`;
      pdf.text(reportTitle, pageWidth / 2, 20, { align: 'center' });
      
      let yPosition = 30;
      
      // Export main report
      if (reportType === 'all' || reportType === 'main') {
        if (mainReportRef.current) {
          // Hide SVG elements temporarily to avoid issues with html2canvas
          const svgElements = mainReportRef.current.querySelectorAll('svg');
          const svgOriginalDisplay = [];
          
          // Store original display style and hide SVGs
          svgElements.forEach((svg, i) => {
            svgOriginalDisplay[i] = svg.style.display;
            svg.style.display = 'none';
          });
          
          // Create a clone of the element for capturing tables and text
          const clone = mainReportRef.current.cloneNode(true);
          clone.style.position = 'absolute';
          clone.style.top = '-9999px';
          document.body.appendChild(clone);
          
          // Capture the element without SVGs
          const mainReportCanvas = await html2canvas(clone, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });
          
          // Remove the clone
          document.body.removeChild(clone);
          
          // Restore SVG display
          svgElements.forEach((svg, i) => {
            svg.style.display = svgOriginalDisplay[i];
          });
          
          const mainReportImgData = mainReportCanvas.toDataURL('image/png');
          const mainReportImgWidth = pageWidth - (margin * 2);
          const mainReportImgHeight = (mainReportCanvas.height * mainReportImgWidth) / mainReportCanvas.width;
          
          pdf.addImage(mainReportImgData, 'PNG', margin, yPosition, mainReportImgWidth, mainReportImgHeight);
          yPosition += mainReportImgHeight + 15;
          
          // Add a text note about the chart
          pdf.setFontSize(12);
          pdf.setTextColor(100, 100, 100);
          pdf.text(`Note: ${title} chart data is included in the report summary.`, pageWidth / 2, yPosition, { align: 'center' });
          yPosition += 10;
        }
      }
      
      // Check if we need to add a new page for additional reports
      if (reportType === 'all' && yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }
      
      // Export policy distribution
      if ((reportType === 'all' || reportType === 'policy') && policyDistributionRef.current) {
        if (reportType === 'policy') {
          // If only exporting policy report, reset position
          yPosition = 30;
        }
        
        // Create a clone focusing on just the table part
        const tableElement = policyDistributionRef.current.querySelector('.table-responsive');
        if (tableElement) {
          const tableCanvas = await html2canvas(tableElement, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });
          
          const tableImgData = tableCanvas.toDataURL('image/png');
          const tableImgWidth = pageWidth - (margin * 2);
          const tableImgHeight = (tableCanvas.height * tableImgWidth) / tableCanvas.width;
          
          // Add title for this section
          pdf.setFontSize(14);
          pdf.setTextColor(40, 40, 40);
          pdf.text('Policy Distribution by Type', pageWidth / 2, yPosition, { align: 'center' });
          yPosition += 10;
          
          pdf.addImage(tableImgData, 'PNG', margin, yPosition, tableImgWidth, tableImgHeight);
          yPosition += tableImgHeight + 15;
        }
      }
      
      // Check if we need to add a new page for claims analysis
      if (reportType === 'all' && yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }
      
      // Export claims analysis
      if ((reportType === 'all' || reportType === 'claims') && claimsAnalysisRef.current) {
        if (reportType === 'claims') {
          // If only exporting claims report, reset position
          yPosition = 30;
        }
        
        // Create a clone focusing on just the table part
        const tableElement = claimsAnalysisRef.current.querySelector('.table-responsive');
        if (tableElement) {
          const tableCanvas = await html2canvas(tableElement, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });
          
          const tableImgData = tableCanvas.toDataURL('image/png');
          const tableImgWidth = pageWidth - (margin * 2);
          const tableImgHeight = (tableCanvas.height * tableImgWidth) / tableCanvas.width;
          
          // Add title for this section
          pdf.setFontSize(14);
          pdf.setTextColor(40, 40, 40);
          pdf.text('Claims Analysis', pageWidth / 2, yPosition, { align: 'center' });
          yPosition += 10;
          
          pdf.addImage(tableImgData, 'PNG', margin, yPosition, tableImgWidth, tableImgHeight);
          yPosition += tableImgHeight + 15;
        }
      }
      
      // Add summary data in tabular format
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Report Data Summary', pageWidth / 2, 20, { align: 'center' });
      
      // Add main report data
      yPosition = 30;
      pdf.setFontSize(14);
      pdf.text(`${title} - ${getDateRangeTitle()}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
      
      // Create a simple table with the data
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      
      // Table headers
      pdf.setFont(undefined, 'bold');
      pdf.text('Period', margin, yPosition);
      pdf.text('Value', pageWidth - margin, yPosition, { align: 'right' });
      yPosition += 5;
      
      // Draw a line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 5;
      
      // Table rows
      pdf.setFont(undefined, 'normal');
      currentReportData.forEach(item => {
        pdf.text(item.label, margin, yPosition);
        pdf.text(reportType === 'revenue' ? `$${item.value.toLocaleString()}` : item.value.toString(), 
                pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 7;
      });
      
      // Draw a line
      yPosition += 3;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;
      
      // Add total
      pdf.setFont(undefined, 'bold');
      pdf.text('Total', margin, yPosition);
      pdf.text(reportType === 'revenue' ? `$${reportTotal.toLocaleString()}` : reportTotal.toString(), 
              pageWidth - margin, yPosition, { align: 'right' });
      
      // Add footer with date and page number
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Generated on ${new Date().toLocaleString()} - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      }
      
      // Save the PDF
      const fileName = `${title.replace(/ /g, '_')}_${getDateRangeTitle()}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Get date range title
  const getDateRangeTitle = () => {
    switch (dateRange) {
      case 'month':
        return 'Monthly';
      case 'quarter':
        return 'Quarterly';
      case 'year':
        return 'Yearly';
      default:
        return '';
    }
  };

  return (
    <div className="container-fluid">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1>Reports</h1>
          <p className="text-muted">View and analyze business performance</p>
        </div>
        <div>
          <button 
            className="btn btn-primary" 
            onClick={() => exportToPDF('all')}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Exporting...
              </>
            ) : (
              <>
                <FaFilePdf className="me-2" /> Export All Reports
              </>
            )}
          </button>
        </div>
      </div>

      {/* Report Controls */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Report Type</label>
              <select
                className="form-select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="revenue">Revenue</option>
                <option value="policies">Policy Sales</option>
                <option value="claims">Claims</option>
                <option value="clients">New Clients</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Date Range</label>
              <select
                className="form-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="month">Monthly</option>
                <option value="quarter">Quarterly</option>
                <option value="year">Yearly</option>
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button className="btn btn-outline-primary w-100">
                <FaDownload className="me-2" /> Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Summary */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                {getDateRangeTitle()} {title}
              </h5>
              <div className="text-muted">
                <FaCalendarAlt className="me-2" />
                {dateRange === 'month' ? 'Jan - May 2025' : 
                 dateRange === 'quarter' ? 'Q1 - Q2 2025' : 
                 '2024 - 2025'}
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <h6 className="text-muted mb-2">Total {reportType === 'revenue' ? 'Revenue' : 
                                                 reportType === 'policies' ? 'Policies Sold' :
                                                 reportType === 'claims' ? 'Claims Filed' : 'New Clients'}</h6>
                    <h3>
                      {unit}{reportTotal.toLocaleString()}
                    </h3>
                  </div>
                  
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead className="table-light">
                        <tr>
                          <th>Period</th>
                          <th className="text-end">Value</th>
                          <th className="text-end">% of Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentReportData.map((item, index) => (
                          <tr key={index}>
                            <td>{item.label}</td>
                            <td className="text-end">{unit}{item.value.toLocaleString()}</td>
                            <td className="text-end">
                              {((item.value / reportTotal) * 100).toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="col-md-8">
                  <div className="chart-container" style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      {reportType === 'revenue' ? (
                        <BarChart data={currentReportData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                          <Legend />
                          <Bar dataKey="value" name="Revenue" fill="#0d6efd" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      ) : reportType === 'policies' ? (
                        <LineChart data={currentReportData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip formatter={(value) => [value, 'Policies']} />
                          <Legend />
                          <Line type="monotone" dataKey="value" name="Policies" stroke="#198754" strokeWidth={2} dot={{ r: 6 }} />
                        </LineChart>
                      ) : reportType === 'claims' ? (
                        <BarChart data={currentReportData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip formatter={(value) => [value, 'Claims']} />
                          <Legend />
                          <Bar dataKey="value" name="Claims" fill="#dc3545" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      ) : (
                        <BarChart data={currentReportData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip formatter={(value) => [value, 'Clients']} />
                          <Legend />
                          <Bar dataKey="value" name="Clients" fill="#6f42c1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Reports */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100" ref={policyDistributionRef}>
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Policy Distribution by Type</h5>
              <button 
                className="btn btn-sm btn-outline-primary" 
                onClick={() => exportToPDF('policy')}
                disabled={isExporting}
              >
                {isExporting ? 'Exporting...' : <><FaDownload className="me-1" /> Export</>}
              </button>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Auto', value: 78, revenue: 93600 },
                            { name: 'Home', value: 45, revenue: 42750 },
                            { name: 'Life', value: 32, revenue: 48000 },
                            { name: 'Health', value: 56, revenue: 123200 },
                            { name: 'Business', value: 22, revenue: 121000 },
                            { name: 'Travel', value: 10, revenue: 4500 }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[
                            { name: 'Auto', value: 78, color: '#0d6efd' },
                            { name: 'Home', value: 45, color: '#198754' },
                            { name: 'Life', value: 32, color: '#6f42c1' },
                            { name: 'Health', value: 56, color: '#dc3545' },
                            { name: 'Business', value: 22, color: '#fd7e14' },
                            { name: 'Travel', value: 10, color: '#0dcaf0' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [value, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="table-light">
                        <tr>
                          <th>Policy Type</th>
                          <th className="text-end">Count</th>
                          <th className="text-end">Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Auto Insurance</td>
                          <td className="text-end">78</td>
                          <td className="text-end">$93,600</td>
                        </tr>
                        <tr>
                          <td>Home Insurance</td>
                          <td className="text-end">45</td>
                          <td className="text-end">$42,750</td>
                        </tr>
                        <tr>
                          <td>Life Insurance</td>
                          <td className="text-end">32</td>
                          <td className="text-end">$48,000</td>
                        </tr>
                        <tr>
                          <td>Health Insurance</td>
                          <td className="text-end">56</td>
                          <td className="text-end">$123,200</td>
                        </tr>
                        <tr>
                          <td>Business Insurance</td>
                          <td className="text-end">22</td>
                          <td className="text-end">$121,000</td>
                        </tr>
                        <tr>
                          <td>Travel Insurance</td>
                          <td className="text-end">10</td>
                          <td className="text-end">$4,500</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card h-100" ref={claimsAnalysisRef}>
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Claims Analysis</h5>
              <button 
                className="btn btn-sm btn-outline-primary" 
                onClick={() => exportToPDF('claims')}
                disabled={isExporting}
              >
                {isExporting ? 'Exporting...' : <><FaDownload className="me-1" /> Export</>}
              </button>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Pending', value: 12, amount: 48500 },
                            { name: 'Under Review', value: 8, amount: 85000 },
                            { name: 'Approved', value: 25, amount: 137500 },
                            { name: 'Denied', value: 5, amount: 22000 },
                            { name: 'Paid', value: 19, amount: 105750 }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[
                            { name: 'Pending', value: 12, color: '#ffc107' },
                            { name: 'Under Review', value: 8, color: '#0dcaf0' },
                            { name: 'Approved', value: 25, color: '#198754' },
                            { name: 'Denied', value: 5, color: '#dc3545' },
                            { name: 'Paid', value: 19, color: '#0d6efd' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [value, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="table-light">
                        <tr>
                          <th>Status</th>
                          <th className="text-end">Count</th>
                          <th className="text-end">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Pending</td>
                          <td className="text-end">12</td>
                          <td className="text-end">$48,500</td>
                        </tr>
                        <tr>
                          <td>Under Review</td>
                          <td className="text-end">8</td>
                          <td className="text-end">$85,000</td>
                        </tr>
                        <tr>
                          <td>Approved</td>
                          <td className="text-end">25</td>
                          <td className="text-end">$137,500</td>
                        </tr>
                        <tr>
                          <td>Denied</td>
                          <td className="text-end">5</td>
                          <td className="text-end">$22,000</td>
                        </tr>
                        <tr>
                          <td>Paid</td>
                          <td className="text-end">19</td>
                          <td className="text-end">$105,750</td>
                        </tr>
                      </tbody>
                    </table>
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

export default Reports;
