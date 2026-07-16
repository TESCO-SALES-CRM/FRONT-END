import React from 'react';
import { X, Download, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const QuotationPreviewModal = ({ quotation, onClose }) => {
  if (!quotation) return null;

  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const handleDownload = () => {
    const element = document.getElementById('quotation-pdf-content');
    
    // Create a clone to manipulate styles without affecting the UI
    const clonedElement = element.cloneNode(true);
    
    // Remove margins from the page containers in the clone so they fit exactly into A4 pages
    const pages = clonedElement.querySelectorAll('.pdf-page');
    pages.forEach(page => {
      page.style.margin = '0';
      page.style.boxShadow = 'none';
      page.style.borderRadius = '0';
      page.style.minHeight = '297mm'; // exact A4 height
    });

    const opt = {
      margin:       0,
      filename:     `Quotation_TS_Q_${quotation.id ? quotation.id.replace('LD-', '') : '1028'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'] }
    };

    // We can just pass the cloned element
    html2pdf().set(opt).from(clonedElement).save();
  };


  const sectionHeaderStyle = {
    fontSize: '13px', 
    fontWeight: '800', 
    color: '#1e40af', 
    textTransform: 'uppercase', 
    borderBottom: '2px solid #bfdbfe', 
    paddingBottom: '8px', 
    marginBottom: '16px',
    marginTop: '32px'
  };

  const gridRowStyle = {
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
    gap: '16px', 
    fontSize: '12px',
    borderBottom: '1px solid #f1f5f9',
    padding: '12px 0'
  };

  const labelStyle = { color: '#64748b' };
  const valueStyle = { fontWeight: '600', color: '#1e293b' };

  const PageHeader = () => (
    <div style={{ padding: '40px 40px 20px 40px', borderBottom: '3px solid #65a30d' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/TS_logo.png" alt="Tesco Structures" style={{ height: '50px' }} />
        </div>
        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
          tescostructures@gmail.com
        </div>
      </div>
    </div>
  );

  const PageFooter = () => (
    <div style={{ backgroundColor: '#84cc16', color: 'white', padding: '16px', textAlign: 'center', fontSize: '10px', fontWeight: '600', letterSpacing: '0.5px', marginTop: 'auto' }}>
      www.tescostructures.com &nbsp;|&nbsp; +91 90033 28229 &nbsp;|&nbsp; 37, 15th St, Gandhi Nagar, Ashok Nagar, Chennai, Tamil Nadu 600083
    </div>
  );

  const pageContainerStyle = {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: '210mm',
    minHeight: '297mm',
    margin: '0 auto 2rem auto',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif'
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#f1f5f9',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Modal Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Generate Structural Quotation PDF</h3>
            <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: '500', marginLeft: '1rem' }}>Format reference: assets/quation formate.pdf</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            
            <button onClick={onClose} style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', color: '#64748b' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable PDF Document Area */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div id="quotation-pdf-content">
          {/* PAGE 1 */}
          <div className="pdf-page" style={pageContainerStyle}>
            <PageHeader />
            <div style={{ padding: '30px 40px', flex: 1 }}>
              {/* Meta Info Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '12px 24px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '30px', fontSize: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div><span style={{ fontWeight: '700', color: '#1e293b' }}>Quote No:</span> <span style={{ color: '#475569' }}>TS-Q-{quotation.id ? quotation.id.replace('LD-', '') : '1028'}</span></div>
                <div><span style={{ fontWeight: '700', color: '#1e293b' }}>Date:</span> <span style={{ color: '#475569' }}>{currentDate}</span></div>
                <div><span style={{ fontWeight: '700', color: '#1e293b' }}>Validity:</span> <span style={{ color: '#475569' }}>30 Days</span></div>
              </div>

              {/* 1. Basic Info */}
              <div style={sectionHeaderStyle}>1. Basic Info</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div style={{ padding: '16px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '10px' }}>Client Details</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>{quotation.name || 'Client Name'}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.6' }}>
                    Billing Name: {quotation.billingName || quotation.name || 'N/A'}<br/>
                    GST: {quotation.gst || 'Not Provided'}
                  </div>
                </div>
                <div style={{ padding: '16px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '10px' }}>Contact Info</div>
                  <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.6' }}>
                    <span style={valueStyle}>Mobile:</span> {quotation.phone || '+91 XXXXX XXXXX'}<br/>
                    <span style={valueStyle}>Alt Mobile:</span> {quotation.altMobile || 'N/A'}<br/>
                    <span style={valueStyle}>Email:</span> {quotation.email || 'client@example.com'}
                  </div>
                </div>
                <div style={{ padding: '16px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '10px' }}>Location</div>
                  <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.6' }}>
                    <span style={valueStyle}>Site Location:</span> {quotation.projectLocation || 'Chennai, TN'}<br/>
                    <span style={valueStyle}>Site Address:</span> {quotation.siteAddress || 'Not Provided'}<br/>
                    <span style={valueStyle}>Billing Address:</span> {quotation.billingAddress || 'Same as Site'}
                  </div>
                </div>
                <div style={{ padding: '16px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '10px' }}>Sales Representative</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>{quotation.salesperson || quotation.assignedExecutive || 'Unassigned'}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Tesco Structures Sales Division</div>
                </div>
              </div>

              {/* 2. Project Details */}
              <div style={sectionHeaderStyle}>2. Project Details</div>
              <div style={{ marginBottom: '20px' }}>
                <div style={gridRowStyle}>
                  <div><div style={labelStyle}>Segment Category</div><div style={valueStyle}>{quotation.projectType || 'PEB Building'}</div></div>
                  <div><div style={labelStyle}>Work Type / Segment</div><div style={valueStyle}>{quotation.workType || quotation.projectTypeStr || 'New'}</div></div>
                  <div><div style={labelStyle}>Structure Type</div><div style={valueStyle}>{quotation.structureType || 'Clear Span'}</div></div>
                </div>
                
                <div style={gridRowStyle}>
                  <div><div style={labelStyle}>Plot Dimensions</div><div style={valueStyle}>{quotation.plotLength || '-'} x {quotation.plotWidth || '-'}</div></div>
                  <div><div style={labelStyle}>Roof Area / Size</div><div style={valueStyle}>{quotation.roofArea || quotation.projectSize || '-'}</div></div>
                  <div><div style={labelStyle}>Heights (Roof/Clearance/Eave)</div><div style={valueStyle}>{quotation.roofHeight || '-'} / {quotation.clearanceHeight || '-'} / {quotation.eaveHeight || '-'}</div></div>
                </div>

                <div style={gridRowStyle}>
                  <div><div style={labelStyle}>Roof Covering Sheeting</div><div style={valueStyle}>{quotation.roofCovering || 'GI'}</div></div>
                  <div><div style={labelStyle}>Site Condition / Soil Test</div><div style={valueStyle}>{quotation.siteCondition || 'Flat'} / {quotation.soilTestDone || 'Not Done'}</div></div>
                  <div><div style={labelStyle}>Insulation Work</div><div style={valueStyle}>{quotation.insulation || 'Not Included'}</div></div>
                </div>

                <div style={gridRowStyle}>
                  <div><div style={labelStyle}>Site Access (Road/Crane/HV)</div><div style={valueStyle}>{quotation.roadAccessWidth || '-'} / {quotation.craneAccess ? 'Yes' : 'No'} / {quotation.heavyVehicleAccess ? 'Yes' : 'No'}</div></div>
                  <div><div style={labelStyle}>Environment (Sun/Wind/Drain)</div><div style={valueStyle}>{quotation.sunExposure || '-'} / {quotation.windDirection || '-'} / {quotation.drainageAvailable ? 'Yes' : 'No'}</div></div>
                  <div><div style={labelStyle}>Working Space</div><div style={valueStyle}>{quotation.workingSpace || 'Moderate'}</div></div>
                </div>
              </div>
            </div>
            <PageFooter />
          </div>

          <div className="html2pdf__page-break"></div>
          {/* PAGE 2 */}
          <div className="pdf-page" style={pageContainerStyle}>
            <PageHeader />
            <div style={{ padding: '30px 40px', flex: 1 }}>
              {/* 3. Quotations */}
              <div style={{ ...sectionHeaderStyle, marginTop: 0 }}>3. Quotations</div>
              <div style={{ marginBottom: '20px' }}>
                <div style={gridRowStyle}>
                  <div><div style={labelStyle}>Design Services</div><div style={valueStyle}>3D: {quotation.design3D ? 'Yes' : 'No'} | 2D: {quotation.design2D ? 'Yes' : 'No'}</div></div>
                  <div><div style={labelStyle}>Transportation Scope</div><div style={valueStyle}>{quotation.transportationScope === 'yes' ? 'Included' : 'Excluded'}</div></div>
                  <div><div style={labelStyle}>Scaffolding Scope</div><div style={valueStyle}>{quotation.scaffoldingScope === 'yes' ? 'Included' : 'Excluded'}</div></div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginTop: '16px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', color: '#475569' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', borderBottom: '1px solid #e2e8f0' }}>Description of Work</th>
                      <th style={{ textAlign: 'right', padding: '12px', fontWeight: '600', borderBottom: '1px solid #e2e8f0' }}>Total Price (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '20px 12px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '6px', fontSize: '13px' }}>Design, Fabrication, Supply, and Erection work charges</div>
                        <div style={{ color: '#94a3b8', fontSize: '11px', lineHeight: '1.5' }}>
                          Charge covers design calculation, raw material sourcing, structural framework columns, rafters,<br/>
                          primary/secondary purlins, bracing rods, roofing sheets, fasteners, and site erection.
                        </div>
                      </td>
                      <td style={{ padding: '20px 12px', textAlign: 'right', fontWeight: '700', color: '#1e293b', verticalAlign: 'top' }}>
                        {quotation.quotedPrice || quotation.budget || '₹10,00,000'}
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#f8fafc' }}>
                      <td style={{ padding: '12px', textAlign: 'right', color: '#64748b' }}>Subtotal:</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: '700', color: '#1e293b' }}>{quotation.quotedPrice || quotation.budget || '₹10,00,000'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 12px', textAlign: 'right', fontWeight: '800', color: '#1e40af', fontSize: '13px' }}>Grand Total (All-Inclusive):</td>
                      <td style={{ padding: '16px 12px', textAlign: 'right', fontWeight: '800', color: '#059669', fontSize: '14px' }}>{quotation.quotedPrice || quotation.budget || '₹10,00,000'}</td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ fontSize: '11px', fontWeight: '700', color: '#1e293b', marginTop: '24px', marginBottom: '12px', textTransform: 'uppercase' }}>Pricing & Payment Milestones Schedule</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ color: '#475569' }}>
                      <th style={{ textAlign: 'left', padding: '12px 4px', fontWeight: '600', borderBottom: '1px solid #e2e8f0' }}>Billing Milestone Event Description</th>
                      <th style={{ textAlign: 'right', padding: '12px 4px', fontWeight: '600', borderBottom: '1px solid #e2e8f0' }}>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px 4px', color: '#1e293b', borderBottom: '1px dashed #f1f5f9' }}>1. Advance with Purchase Order (PO)</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#1e293b', fontWeight: '600', borderBottom: '1px dashed #f1f5f9' }}>10%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 4px', color: '#1e293b', borderBottom: '1px dashed #f1f5f9' }}>2. Dispatch / after Drawing Approval</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#1e293b', fontWeight: '600', borderBottom: '1px dashed #f1f5f9' }}>30%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 4px', color: '#1e293b', borderBottom: '1px dashed #f1f5f9' }}>3. Erection / after Structure Work Completion</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#1e293b', fontWeight: '600', borderBottom: '1px dashed #f1f5f9' }}>40%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 4px', color: '#1e293b' }}>4. Handover / after Completion Sign-off</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#1e293b', fontWeight: '600' }}>20%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 4. Order Confirm */}
              <div style={sectionHeaderStyle}>4. Order Confirm</div>
              <div style={{ marginBottom: '40px' }}>
                <div style={gridRowStyle}>
                  <div><div style={labelStyle}>Order Date</div><div style={valueStyle}>{quotation.orderDate || '-'}</div></div>
                  <div><div style={labelStyle}>Proposal Ref</div><div style={valueStyle}>{quotation.proposalRef || '-'}</div></div>
                  <div><div style={labelStyle}>Lead Time</div><div style={valueStyle}>{quotation.leadTime || '-'}</div></div>
                </div>
                <div style={gridRowStyle}>
                  <div><div style={labelStyle}>Start Date</div><div style={valueStyle}>{quotation.startDate || '-'}</div></div>
                  <div><div style={labelStyle}>Completion Date</div><div style={valueStyle}>{quotation.completionDate || '-'}</div></div>
                  <div><div style={labelStyle}>Salesperson Declaration</div><div style={valueStyle}>{quotation.salespersonDeclaration ? 'Agreed' : 'Pending'}</div></div>
                </div>
                
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontFamily: 'cursive', color: '#1e293b', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', minWidth: '150px' }}>
                      {quotation.salespersonSign || ''}
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Authorized Signature</div>
                  </div>
                </div>
              </div>
            </div>
            <PageFooter />
          </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', backgroundColor: 'white', display: 'flex', justifyContent: 'center', gap: '1rem', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)' }}>
          <button onClick={onClose} style={{ padding: '0.5rem 1.5rem', borderRadius: '4px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: '600', cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={handleDownload} style={{ padding: '0.5rem 1.5rem', borderRadius: '4px', border: 'none', background: '#4f46e5', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
            Download PDF Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationPreviewModal;
