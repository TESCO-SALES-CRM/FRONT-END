import React, { useState, useEffect } from 'react';
import { Save, X, CheckCircle2, Building, ClipboardList, Calendar, IndianRupee, PenTool, Plus, Edit2, ChevronLeft } from 'lucide-react';

const emptyForm = {
  clientName: '', projectLocation: '', phoneEmail: '',
  billingName: '', mobile: '', altMobile: '',
  siteAddress: '', billingAddress: '', gst: '',
  emailWhatsapp: '', salesperson: '', orderDate: '', proposalRef: '',
  
  projectType: '', projectSize: '',
  design3D: false, design2D: false,
  transportationScope: 'yes', scaffoldingScope: 'yes',
  
  startDate: '', completionDate: '', leadTime: '',
  
  quotedPrice: '', paymentTerms: [{ term: '', percentage: '', value: '' }],
  
  engineerVisit: false, engineerSign: '',
  salespersonDeclaration: false, salespersonSign: ''
};

const NewHandoverFormModal = ({ isOpen, onClose, lead, onSubmit }) => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (isOpen && lead) {
      setFormData(prev => ({
        ...prev,
        clientName: lead.name || '',
        projectLocation: lead.projectLocation || '',
        phoneEmail: lead.phone || '',
        mobile: lead.phone || '',
        projectType: lead.projectType || '',
        projectSize: lead.projectSize || ''
      }));
    } else if (!isOpen) {
      setFormData(emptyForm);
    }
  }, [isOpen, lead]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePaymentTermChange = (index, field, value) => {
    const newTerms = [...(formData.paymentTerms || [])];
    newTerms[index] = { ...newTerms[index], [field]: value };
    setFormData(prev => ({ ...prev, paymentTerms: newTerms }));
  };

  const addPaymentTerm = () => {
    setFormData(prev => ({ ...prev, paymentTerms: [...(prev.paymentTerms || []), { term: '', percentage: '', value: '' }] }));
  };

  const removePaymentTerm = (index) => {
    const newTerms = [...(formData.paymentTerms || [])];
    newTerms.splice(index, 1);
    setFormData(prev => ({ ...prev, paymentTerms: newTerms }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const sectionStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    border: '1px solid var(--border-color)'
  };

  const headerStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    borderBottom: '2px solid #f1f5f9',
    paddingBottom: '1rem'
  };

  const inputGroupStyle = { marginBottom: '1.25rem' };
  const labelStyle = { display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' };
  const inputStyle = { width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontSize: '0.95rem', color: '#0f172a', outline: 'none', transition: 'border-color 0.2s ease, box-shadow 0.2s ease' };
  
  const grid2Col = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' };
  const grid3Col = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(4px)',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#f8fafc',
        width: '100%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>New Project File</h2>
            <p style={{ color: '#64748b', marginTop: '0.25rem', fontSize: '0.9rem', margin: 0 }}>Sales to Project Handover Form</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={onClose} className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem' }}>Cancel</button>
            <button onClick={handleSubmitForm} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
              <CheckCircle2 size={18} /> Submit Handover
            </button>
          </div>
        </div>

        <div style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmitForm}>
            {/* 1. Client & Project Details */}
            <div style={sectionStyle}>
              <h3 style={headerStyle}><Building size={20} color="var(--primary-color)" /> 1. Client & Project Details</h3>
              <div style={grid3Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Client Name *</label>
                  <input required name="clientName" value={formData.clientName} onChange={handleChange} style={inputStyle} placeholder="e.g. Sree Brindaavan Kindergarten" />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Project Location *</label>
                  <input required name="projectLocation" value={formData.projectLocation} onChange={handleChange} style={inputStyle} placeholder="e.g. Chitlapakkam" />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Contact Details (Phone/Email)</label>
                  <input name="phoneEmail" value={formData.phoneEmail} onChange={handleChange} style={inputStyle} placeholder="e.g. 9840714353 / ..." />
                </div>
              </div>
              
              <div style={grid2Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Billing Name</label>
                  <input name="billingName" value={formData.billingName} onChange={handleChange} style={inputStyle} placeholder="e.g. Sree Brindaavan Kindergarten" />
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Mobile Number *</label>
                    <input required name="mobile" value={formData.mobile} onChange={handleChange} style={inputStyle} placeholder="e.g. 9551269990" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Alternate Mobile Number</label>
                    <input name="altMobile" value={formData.altMobile} onChange={handleChange} style={inputStyle} />
                  </div>
                </div>
              </div>

              <div style={grid2Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Site Address *</label>
                  <textarea required name="siteAddress" value={formData.siteAddress} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="e.g. 46, First main Road, Venkatraman Nagar, Chennai-600064" />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Billing Address</label>
                  <textarea name="billingAddress" value={formData.billingAddress} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                </div>
              </div>

              <div style={grid3Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>GST Number</label>
                  <input name="gst" value={formData.gst} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Email ID / WhatsApp Number</label>
                  <input name="emailWhatsapp" value={formData.emailWhatsapp} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Salesperson Name *</label>
                  <input required name="salesperson" value={formData.salesperson} onChange={handleChange} style={inputStyle} placeholder="e.g. Saleem Khan" />
                </div>
              </div>

              <div style={grid2Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Date of Order *</label>
                  <input required type="date" name="orderDate" value={formData.orderDate} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Proposal Ref No *</label>
                  <input required name="proposalRef" value={formData.proposalRef} onChange={handleChange} style={inputStyle} placeholder="e.g. TES/ENT/176-R1" />
                </div>
              </div>
            </div>

            {/* 2. Scope of Work */}
            <div style={sectionStyle}>
              <h3 style={headerStyle}><ClipboardList size={20} color="#8b5cf6" /> 2. Scope of Work</h3>
              <div style={grid2Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Type of Project *</label>
                  <input required name="projectType" value={formData.projectType} onChange={handleChange} style={inputStyle} placeholder="e.g. PU Sheet Roof with wall panel cladding" />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Project Size/Area *</label>
                  <input required name="projectSize" value={formData.projectSize} onChange={handleChange} style={inputStyle} placeholder="e.g. 760 Sqft." />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginTop: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500', color: '#1e293b' }}>
                  <input type="checkbox" name="design3D" checked={formData.design3D} onChange={handleChange} style={{ width: '18px', height: '18px' }} />
                  3D Design
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500', color: '#1e293b' }}>
                  <input type="checkbox" name="design2D" checked={formData.design2D} onChange={handleChange} style={{ width: '18px', height: '18px' }} />
                  2D Design
                </label>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>Transportation Client Scope</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontWeight: '500' }}>
                      <input type="radio" name="transportationScope" value="yes" checked={formData.transportationScope === 'yes'} onChange={handleChange} /> Yes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontWeight: '500' }}>
                      <input type="radio" name="transportationScope" value="no" checked={formData.transportationScope === 'no'} onChange={handleChange} /> No
                    </label>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>Scaffolding Client Scope</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontWeight: '500' }}>
                      <input type="radio" name="scaffoldingScope" value="yes" checked={formData.scaffoldingScope === 'yes'} onChange={handleChange} /> Yes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontWeight: '500' }}>
                      <input type="radio" name="scaffoldingScope" value="no" checked={formData.scaffoldingScope === 'no'} onChange={handleChange} /> No
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Timeline & Delivery Commitment */}
            <div style={sectionStyle}>
              <h3 style={headerStyle}><Calendar size={20} color="#f59e0b" /> 3. Timeline & Delivery Commitment</h3>
              <div style={grid3Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Tentative Start Date *</label>
                  <input required type="date" name="startDate" value={formData.startDate} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Tentative Completion Date *</label>
                  <input required type="date" name="completionDate" value={formData.completionDate} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Lead Time Promised</label>
                  <input name="leadTime" value={formData.leadTime} onChange={handleChange} style={inputStyle} placeholder="e.g. 30 days" />
                </div>
              </div>
            </div>

            {/* 4. Pricing & Payment Terms */}
            <div style={sectionStyle}>
              <h3 style={headerStyle}><IndianRupee size={20} color="#10b981" /> 4. Pricing & Payment Terms</h3>
              <div style={grid2Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Quoted Price *</label>
                  <input required name="quotedPrice" value={formData.quotedPrice} onChange={handleChange} style={inputStyle} placeholder="₹ Amount" />
                </div>
              </div>
              
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <label style={labelStyle}>Payment Terms Schedule</label>
                  <button type="button" onClick={addPaymentTerm} style={{ backgroundColor: '#EEF2FF', color: 'var(--primary-color)', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={14} /> Add Milestone
                  </button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(formData.paymentTerms || []).map((pt, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem', alignItems: 'end', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div>
                        <label style={{...labelStyle, fontSize: '0.7rem'}}>Term / Milestone</label>
                        <input type="text" placeholder="e.g. Advance Payment" style={inputStyle} value={pt.term} onChange={e => handlePaymentTermChange(idx, 'term', e.target.value)} />
                      </div>
                      <div>
                        <label style={{...labelStyle, fontSize: '0.7rem'}}>Percentage (%)</label>
                        <input type="number" placeholder="%" style={inputStyle} value={pt.percentage} onChange={e => handlePaymentTermChange(idx, 'percentage', e.target.value)} />
                      </div>
                      <div>
                        <label style={{...labelStyle, fontSize: '0.7rem'}}>Value (₹)</label>
                        <input type="number" placeholder="₹ Amount" style={inputStyle} value={pt.value} onChange={e => handlePaymentTermChange(idx, 'value', e.target.value)} />
                      </div>
                      {idx > 0 && (
                        <button type="button" onClick={() => removePaymentTerm(idx)} style={{ background: '#FEE2E2', border: 'none', color: '#DC2626', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '2px' }}>
                          <X size={16} />
                        </button>
                      )}
                      {idx === 0 && <div style={{ width: '36px' }}></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5 & 6. Declarations */}
            <div style={{ ...sectionStyle, backgroundColor: '#f8fafc', border: '1px dashed #94a3b8' }}>
              <h3 style={headerStyle}><PenTool size={20} color="#64748b" /> 5 & 6. Confirmations & Declarations</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e293b', margin: '0 0 1rem 0' }}>5. Site Engineer Visit Completed</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: '500', color: '#0f172a' }}>
                      <input type="checkbox" name="engineerVisit" checked={formData.engineerVisit} onChange={handleChange} style={{ width: '20px', height: '20px', accentColor: 'var(--primary-color)' }} />
                      Visit Completed
                    </label>
                    <div style={{ flex: 1, display: formData.engineerVisit ? 'block' : 'none' }}>
                      <input name="engineerSign" value={formData.engineerSign} onChange={handleChange} style={{ ...inputStyle, borderBottom: '2px solid #cbd5e1', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, backgroundColor: 'transparent' }} placeholder="Site Engineer Sign / Name" />
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e293b', margin: '0 0 1rem 0' }}>6. Salesperson Declaration</h4>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }}>
                    <input required type="checkbox" name="salespersonDeclaration" checked={formData.salespersonDeclaration} onChange={handleChange} style={{ width: '24px', height: '24px', accentColor: '#10b981', marginTop: '2px' }} />
                    <span style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6' }}>
                      "I confirm that all details communicated to the client and project team are accurate and have been agreed upon. I also acknowledge that the project will commence once the design has been confirmed."
                    </span>
                  </label>
                  <div style={{ marginTop: '1.5rem', display: formData.salespersonDeclaration ? 'block' : 'none' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>Signature of Salesperson:</label>
                    <input required={formData.salespersonDeclaration} name="salespersonSign" value={formData.salespersonSign} onChange={handleChange} style={{ ...inputStyle, maxWidth: '300px', borderBottom: '2px solid #cbd5e1', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, backgroundColor: 'transparent' }} placeholder="Sign here..." />
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: '50px', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)' }}>
                <CheckCircle2 size={24} /> Submit Final Handover
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewHandoverFormModal;
