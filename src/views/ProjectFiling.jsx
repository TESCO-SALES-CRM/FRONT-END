import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Save, X, CheckCircle2, Building, ClipboardList, Calendar, IndianRupee, PenTool, Plus, Edit2, ChevronLeft } from 'lucide-react';
import GlobalFilterBar from '../components/GlobalFilterBar';

const dummyProjects = [
  {
    id: 'PF-1001', clientName: 'Sree Brindaavan Kindergarten', projectLocation: 'Chitlapakkam', phoneEmail: '9840714353', billingName: 'Sree Brindaavan', mobile: '9551269990', altMobile: '', siteAddress: '46, First main Road, Venkatraman Nagar, Chennai-600064', billingAddress: '', gst: '', emailWhatsapp: '', salesperson: 'Saleem Khan', orderDate: '2026-06-04', proposalRef: 'TES/ENT/176-R1',
    projectType: 'PU Sheet Roof with wall panel cladding', projectSize: '760 Sqft', design3D: false, design2D: true, transportationScope: 'yes', scaffoldingScope: 'yes',
    startDate: '2026-06-08', completionDate: '2026-07-07', leadTime: '30 days',
    quotedPrice: '₹4,50,000', paymentSchedule: 'no', alternateTerms: '10% Advance with PO, 30% After Drawing Approval, 40% After Structure work complete, 20% After completion',
    engineerVisit: true, engineerSign: 'A. Robert', salespersonDeclaration: true, salespersonSign: 'Saleem Khan'
  },
  {
    id: 'PF-1002', clientName: 'Acme Corp Warehouse', projectLocation: 'Oragadam', phoneEmail: 'contact@acme.com', billingName: 'Acme Corp', mobile: '9876543210', altMobile: '9988776655', siteAddress: 'Plot 45, Sipcot Ind Est, Oragadam', billingAddress: 'Same', gst: '33AABCT1234D1Z2', emailWhatsapp: '9876543210', salesperson: 'Rahul S.', orderDate: '2026-06-10', proposalRef: 'TES/WR/201-V2',
    projectType: 'PEB Warehouse Structure', projectSize: '15000 Sqft', design3D: true, design2D: true, transportationScope: 'yes', scaffoldingScope: 'no',
    startDate: '2026-06-15', completionDate: '2026-09-15', leadTime: '90 days',
    quotedPrice: '₹85,00,000', paymentSchedule: 'agreed', alternateTerms: '',
    engineerVisit: true, engineerSign: 'M. Ramesh', salespersonDeclaration: true, salespersonSign: 'Rahul S.'
  },
  {
    id: 'PF-1003', clientName: 'BlueSky Logistics', projectLocation: 'Sriperumbudur', phoneEmail: 'hello@bluesky.in', billingName: 'BlueSky Logistics Pvt Ltd', mobile: '8877665544', altMobile: '', siteAddress: 'Sector C, Logistics Park', billingAddress: 'Sector C, Logistics Park', gst: '33BBXPT5678E1Z3', emailWhatsapp: 'hello@bluesky.in', salesperson: 'Karthik M.', orderDate: '2026-06-12', proposalRef: 'TES/BL/098',
    projectType: 'Cold Storage PEB', projectSize: '25000 Sqft', design3D: true, design2D: true, transportationScope: 'yes', scaffoldingScope: 'yes',
    startDate: '2026-07-01', completionDate: '2026-11-01', leadTime: '120 days',
    quotedPrice: '₹1,50,00,000', paymentSchedule: 'no', alternateTerms: '20% Adv, 40% dispatch, 30% erection, 10% handover',
    engineerVisit: false, engineerSign: '', salespersonDeclaration: false, salespersonSign: ''
  },
  {
    id: 'PF-1004', clientName: 'Green Valley School', projectLocation: 'OMR, Chennai', phoneEmail: 'admin@gvs.edu', billingName: 'Green Valley Educational Trust', mobile: '7766554433', altMobile: '', siteAddress: 'OMR IT Expressway', billingAddress: 'Same', gst: '', emailWhatsapp: 'admin@gvs.edu', salesperson: 'Divya R.', orderDate: '2026-06-15', proposalRef: 'TES/GVS/002',
    projectType: 'Tensile Fabric Walkway', projectSize: '400 Sqft', design3D: false, design2D: true, transportationScope: 'no', scaffoldingScope: 'no',
    startDate: '2026-06-20', completionDate: '2026-07-05', leadTime: '15 days',
    quotedPrice: '₹2,50,000', paymentSchedule: 'agreed', alternateTerms: '',
    engineerVisit: true, engineerSign: 'A. Robert', salespersonDeclaration: true, salespersonSign: 'Divya R.'
  },
  {
    id: 'PF-1005', clientName: 'NexGen Auto', projectLocation: 'Ambattur', phoneEmail: '9840098400', billingName: 'NexGen Automobiles', mobile: '9840098400', altMobile: '', siteAddress: 'Ambattur Industrial Estate', billingAddress: 'Same', gst: '33PPXYZ1111Q1Z9', emailWhatsapp: '', salesperson: 'Saleem Khan', orderDate: '2026-06-18', proposalRef: 'TES/NG/112',
    projectType: 'Mezzanine Floor', projectSize: '1200 Sqft', design3D: true, design2D: true, transportationScope: 'yes', scaffoldingScope: 'yes',
    startDate: '2026-07-10', completionDate: '2026-08-10', leadTime: '30 days',
    quotedPrice: '₹12,00,000', paymentSchedule: 'agreed', alternateTerms: '',
    engineerVisit: true, engineerSign: 'M. Ramesh', salespersonDeclaration: false, salespersonSign: ''
  },
  {
    id: 'PF-1006', clientName: 'Sunrise Textiles', projectLocation: 'Tiruppur', phoneEmail: 'purchase@sunrise.com', billingName: 'Sunrise Textiles Ltd', mobile: '9944332211', altMobile: '', siteAddress: 'SIPCOT Tiruppur', billingAddress: 'Same', gst: '33AACCU4444D1Z4', emailWhatsapp: 'purchase@sunrise.com', salesperson: 'Arun K.', orderDate: '2026-06-20', proposalRef: 'TES/ST/304',
    projectType: 'Dyeing Unit Shed', projectSize: '8000 Sqft', design3D: false, design2D: true, transportationScope: 'yes', scaffoldingScope: 'no',
    startDate: '2026-07-15', completionDate: '2026-09-30', leadTime: '75 days',
    quotedPrice: '₹55,00,000', paymentSchedule: 'no', alternateTerms: '15% Adv, 35% material delivery, 40% structure, 10% handover',
    engineerVisit: false, engineerSign: '', salespersonDeclaration: false, salespersonSign: ''
  },
  {
    id: 'PF-1007', clientName: 'Royal Convention Center', projectLocation: 'ECR', phoneEmail: 'events@royal.com', billingName: 'Royal Events', mobile: '8877996655', altMobile: '', siteAddress: 'East Coast Road, Chennai', billingAddress: 'Same', gst: '33BBDDW2222E1Z2', emailWhatsapp: '', salesperson: 'Rahul S.', orderDate: '2026-06-22', proposalRef: 'TES/RC/401',
    projectType: 'Large Span PEB Hall', projectSize: '20000 Sqft', design3D: true, design2D: true, transportationScope: 'yes', scaffoldingScope: 'yes',
    startDate: '2026-08-01', completionDate: '2026-12-01', leadTime: '120 days',
    quotedPrice: '₹2,10,00,000', paymentSchedule: 'agreed', alternateTerms: '',
    engineerVisit: true, engineerSign: 'A. Robert', salespersonDeclaration: true, salespersonSign: 'Rahul S.'
  },
  {
    id: 'PF-1008', clientName: 'Fresh Farms', projectLocation: 'Hosur', phoneEmail: 'info@freshfarms.in', billingName: 'Fresh Farms Agro', mobile: '9988112233', altMobile: '', siteAddress: 'NH 44, Hosur', billingAddress: 'Same', gst: '', emailWhatsapp: 'info@freshfarms.in', salesperson: 'Karthik M.', orderDate: '2026-06-25', proposalRef: 'TES/FF/056',
    projectType: 'Poultry Farm Shed', projectSize: '6000 Sqft', design3D: false, design2D: true, transportationScope: 'yes', scaffoldingScope: 'no',
    startDate: '2026-07-05', completionDate: '2026-08-20', leadTime: '45 days',
    quotedPrice: '₹32,00,000', paymentSchedule: 'agreed', alternateTerms: '',
    engineerVisit: true, engineerSign: 'M. Ramesh', salespersonDeclaration: true, salespersonSign: 'Karthik M.'
  },
  {
    id: 'PF-1009', clientName: 'Metro Builders', projectLocation: 'Guindy', phoneEmail: 'projects@metro.com', billingName: 'Metro Constructions', mobile: '9123456789', altMobile: '', siteAddress: 'Guindy Industrial Estate', billingAddress: 'Same', gst: '33YYZZX9999P1Z7', emailWhatsapp: '', salesperson: 'Divya R.', orderDate: '2026-06-28', proposalRef: 'TES/MB/789',
    projectType: 'Site Office Porta Cabin', projectSize: '800 Sqft', design3D: false, design2D: false, transportationScope: 'yes', scaffoldingScope: 'no',
    startDate: '2026-07-10', completionDate: '2026-07-25', leadTime: '15 days',
    quotedPrice: '₹8,50,000', paymentSchedule: 'no', alternateTerms: '50% Advance, 50% Before Dispatch',
    engineerVisit: true, engineerSign: 'A. Robert', salespersonDeclaration: true, salespersonSign: 'Divya R.'
  },
  {
    id: 'PF-1010', clientName: 'TechPark Alpha', projectLocation: 'Navalur', phoneEmail: 'facilities@tpa.com', billingName: 'TechPark Management', mobile: '9888777666', altMobile: '', siteAddress: 'Navalur IT Park', billingAddress: 'Same', gst: '33AABCD1122E1Z5', emailWhatsapp: '', salesperson: 'Saleem Khan', orderDate: '2026-07-02', proposalRef: 'TES/TPA/102',
    projectType: 'Car Parking Tensile Structure', projectSize: '3500 Sqft', design3D: true, design2D: true, transportationScope: 'no', scaffoldingScope: 'no',
    startDate: '2026-07-20', completionDate: '2026-08-20', leadTime: '30 days',
    quotedPrice: '₹18,00,000', paymentSchedule: 'agreed', alternateTerms: '',
    engineerVisit: false, engineerSign: '', salespersonDeclaration: false, salespersonSign: ''
  }
];

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

const ProjectFiling = () => {
  const location = useLocation();
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [projects, setProjects] = useState(dummyProjects);
  const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
    if (location.state?.openForm) {
      setView('form');
      if (location.state?.lead) {
        setFormData(prev => ({
          ...prev,
          clientName: location.state.lead.name || '',
          projectLocation: location.state.lead.projectLocation || '',
          phoneEmail: location.state.lead.phone || '',
          projectType: location.state.lead.projectType || '',
          projectSize: location.state.lead.projectSize || ''
        }));
      }
    }
  }, [location.state]);

  const handleCreateNew = () => {
    setFormData(emptyForm);
    setView('form');
  };

  const handleEdit = (project) => {
    setFormData(project);
    setView('form');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setProjects(projects.map(p => p.id === formData.id ? formData : p));
    } else {
      const newId = `PF-${1000 + projects.length + 1}`;
      setProjects([{ ...formData, id: newId }, ...projects]);
    }
    setView('list');
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
    <div style={{ padding: '1rem 0' }}>
      
      {/* List View */}
      {view === 'list' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px', margin: 0 }}>Order Confirm</h2>
              <p style={{ color: '#64748b', marginTop: '0.25rem', fontSize: '1.05rem' }}>Manage all sales to project handovers.</p>
            </div>
            <button onClick={handleCreateNew} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
              <Plus size={18} /> New Handover Form
            </button>
          </div>

          <GlobalFilterBar />

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Lead id</th>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Client name</th>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Project type</th>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Location</th>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Salesperson</th>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Value</th>
                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, idx) => (
                    <tr key={project.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: idx % 2 === 0 ? 'white' : '#fafaf9', transition: 'background-color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? 'white' : '#fafaf9'}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--primary-color)', fontSize: '0.875rem' }}>{project.id}</td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: '#1e293b' }}>{project.clientName}</td>
                      <td style={{ padding: '1rem 1.5rem', color: '#475569', fontSize: '0.875rem', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={project.projectType}>{project.projectType}</td>
                      <td style={{ padding: '1rem 1.5rem', color: '#475569', fontSize: '0.875rem' }}>{project.projectLocation}</td>
                      <td style={{ padding: '1rem 1.5rem', color: '#475569', fontSize: '0.875rem' }}>{project.salesperson}</td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: '700', color: '#10b981', fontSize: '0.875rem' }}>{project.quotedPrice}</td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                        <button onClick={() => handleEdit(project)} style={{ background: '#e0e7ff', border: 'none', color: 'var(--primary-color)', width: '32px', height: '32px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.1s ease' }} title="View / Edit">
                          <Edit2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Form View */}
      {view === 'form' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={() => setView('list')} style={{ background: 'white', border: '1px solid #e2e8f0', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#475569' }}>
                <ChevronLeft size={20} />
              </button>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px', margin: 0 }}>
                  {formData.id ? `Edit File: ${formData.id}` : 'New Project File'}
                </h2>
                <p style={{ color: '#64748b', marginTop: '0.25rem', fontSize: '1.05rem' }}>Sales to Project Handover Form</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setView('list')} className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem' }}>
                Cancel
              </button>
              <button onClick={handleSubmit} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
                <CheckCircle2 size={18} /> {formData.id ? 'Save Changes' : 'Submit Handover'}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ maxWidth: '1200px' }}>
            
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
                  <div style={{ marginTop: '1.5rem', maxWidth: '300px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>Signature of Salesperson:</label>
                    <input required name="salespersonSign" value={formData.salespersonSign} onChange={handleChange} style={{ ...inputStyle, borderBottom: '2px solid #cbd5e1', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, backgroundColor: 'transparent', fontFamily: 'cursive', fontSize: '1.25rem' }} placeholder="Sign here..." />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: '9999px', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <CheckCircle2 size={24} /> {formData.id ? 'Save Changes' : 'Generate Handover Form'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProjectFiling;
