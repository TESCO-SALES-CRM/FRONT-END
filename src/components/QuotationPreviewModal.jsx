import React from 'react';
import { X, Download, Printer } from 'lucide-react';

const QuotationPreviewModal = ({ quotation, onClose }) => {
  if (!quotation) return null;

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
        maxWidth: '900px',
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
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, display: 'flex', justifyContent: 'center' }}>
          
          {/* A4 Paper Size Container */}
          <div style={{
            backgroundColor: 'white',
            width: '210mm',
            minHeight: '297mm',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Inter, sans-serif'
          }}>
            
            {/* Header */}
            <div style={{ padding: '40px 40px 20px 40px', borderBottom: '3px solid #65a30d' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="/TS_logo.png" alt="Tesco Structures" style={{ height: '50px' }} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                  tescostructures@gmail.com
                </div>
              </div>
            </div>

            <div style={{ padding: '30px 40px', flex: 1 }}>
              
              {/* Meta Info Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '12px 24px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '30px', fontSize: '12px' }}>
                <div><span style={{ fontWeight: '700', color: '#1e293b' }}>Quote No:</span> <span style={{ color: '#475569' }}>TS-Q-{quotation.id || '1028'}</span></div>
                <div><span style={{ fontWeight: '700', color: '#1e293b' }}>Date:</span> <span style={{ color: '#475569' }}>Jul 3, 2026</span></div>
                <div><span style={{ fontWeight: '700', color: '#1e293b' }}>Validity:</span> <span style={{ color: '#475569' }}>30 Days</span></div>
              </div>

              {/* Cards Row */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                <div style={{ flex: 1, padding: '20px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '10px' }}>QUOTATION PREPARED FOR</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>{quotation.name || 'Client Name'}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.6' }}>
                    Phone: +91 87654 32109<br/>
                    Email: client@example.com<br/>
                    Site Location: Chennai, TN
                  </div>
                </div>
                <div style={{ flex: 1, padding: '20px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '10px' }}>ASSIGNED REPRESENTATIVE</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>Alex Wong</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>Tesco Structures Sales Division</div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>
                    <span style={{ fontWeight: '600' }}>Reference Segment:</span> {quotation.projectType || 'PEB Building'}
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', borderBottom: '2px solid #bfdbfe', paddingBottom: '8px', marginBottom: '16px' }}>
                  PROJECT DESIGN SPECIFICATIONS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'x', fontSize: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ color: '#64748b' }}>Segment Category</div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{quotation.projectType || 'PEB Building'}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '12px 0', borderBottom: '1px solid #f1f5f9', paddingLeft: '16px' }}>
                    <div style={{ color: '#64748b' }}>Work Type / Segment Detail</div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>New</div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ color: '#64748b' }}>Span / Structure Type</div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>Multi-span</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '12px 0', borderBottom: '1px solid #f1f5f9', paddingLeft: '16px' }}>
                    <div style={{ color: '#64748b' }}>Site Area / Dimensions</div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>-</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ color: '#64748b' }}>Roof Covering Sheeting</div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>GI</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '12px 0', borderBottom: '1px solid #f1f5f9', paddingLeft: '16px' }}>
                    <div style={{ color: '#64748b' }}>Site Condition / Soil Test</div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>Filled / Not Done</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ color: '#64748b' }}>Insulation Work</div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>Not Included</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '12px 0', borderBottom: '1px solid #f1f5f9', paddingLeft: '16px' }}>
                    <div style={{ color: '#64748b' }}>Working Scope</div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>Steel Only</div>
                  </div>
                </div>
              </div>

              {/* Estimate Breakdown */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', borderBottom: '2px solid #bfdbfe', paddingBottom: '8px', marginBottom: '16px' }}>
                  COMMERCIAL ESTIMATE BREAKDOWN
                </div>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
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
                        {quotation.budget || '₹10,00,000'}
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#f8fafc' }}>
                      <td style={{ padding: '12px', textAlign: 'right', color: '#64748b' }}>Subtotal:</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: '700', color: '#1e293b' }}>{quotation.budget || '₹10,00,000'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 12px', textAlign: 'right', fontWeight: '800', color: '#1e40af', fontSize: '13px' }}>Grand Total (All-Inclusive):</td>
                      <td style={{ padding: '16px 12px', textAlign: 'right', fontWeight: '800', color: '#059669', fontSize: '14px' }}>{quotation.budget || '₹10,00,000'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Milestones Schedule */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', borderBottom: '2px solid #bfdbfe', paddingBottom: '8px', marginBottom: '16px' }}>
                  PRICING & PAYMENT MILESTONES SCHEDULE
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ color: '#475569' }}>
                      <th style={{ textAlign: 'left', padding: '12px 4px', fontWeight: '600', borderBottom: '1px solid #e2e8f0' }}>Billing Milestone Event Description</th>
                      <th style={{ textAlign: 'right', padding: '12px 4px', fontWeight: '600', borderBottom: '1px solid #e2e8f0' }}>Percentage</th>
                      <th style={{ textAlign: 'right', padding: '12px 4px', fontWeight: '600', borderBottom: '1px solid #e2e8f0' }}>Milestone Value (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px 4px', color: '#1e293b', borderBottom: '1px dashed #f1f5f9' }}>1. Advance with Purchase Order (PO)</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#1e293b', fontWeight: '600', borderBottom: '1px dashed #f1f5f9' }}>10%</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#64748b', borderBottom: '1px dashed #f1f5f9' }}>₹1,00,000</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 4px', color: '#1e293b', borderBottom: '1px dashed #f1f5f9' }}>2. Dispatch / after Drawing Approval</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#1e293b', fontWeight: '600', borderBottom: '1px dashed #f1f5f9' }}>30%</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#64748b', borderBottom: '1px dashed #f1f5f9' }}>₹3,00,000</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 4px', color: '#1e293b', borderBottom: '1px dashed #f1f5f9' }}>3. Erection / after Structure Work Completion</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#1e293b', fontWeight: '600', borderBottom: '1px dashed #f1f5f9' }}>40%</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#64748b', borderBottom: '1px dashed #f1f5f9' }}>₹4,00,000</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 4px', color: '#1e293b' }}>4. Handover / after Completion Sign-off</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#1e293b', fontWeight: '600' }}>20%</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', color: '#64748b' }}>₹2,00,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div style={{ backgroundColor: '#84cc16', color: 'white', padding: '16px', textAlign: 'center', fontSize: '10px', fontWeight: '600', letterSpacing: '0.5px' }}>
              www.tescostructures.com &nbsp;|&nbsp; +91 90033 28229 &nbsp;|&nbsp; 37, 15th St, Gandhi Nagar, Ashok Nagar, Chennai, Tamil Nadu 600083
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', backgroundColor: 'white', display: 'flex', justifyContent: 'center', gap: '1rem', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)' }}>
          <button onClick={onClose} style={{ padding: '0.5rem 1.5rem', borderRadius: '4px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: '600', cursor: 'pointer' }}>
            Cancel
          </button>
          <button style={{ padding: '0.5rem 1.5rem', borderRadius: '4px', border: 'none', background: '#4f46e5', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
            Download PDF Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationPreviewModal;
