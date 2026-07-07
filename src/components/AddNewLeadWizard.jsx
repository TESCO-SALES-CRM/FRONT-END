import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Plus, UploadCloud, ChevronDown, ChevronUp, Building, ClipboardList, Calendar, IndianRupee, PenTool } from 'lucide-react';

const steps = [
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'Project Details' },
  { id: 3, label: 'Site Dimensions' },
  { id: 4, label: 'Technical Details' },
  { id: 5, label: 'Quotations' },
  { id: 6, label: 'Project Filing' },
  { id: 7, label: 'Attachments' },
  { id: 8, label: 'Review' },
];

const LEAD_SOURCES = [
  'WEBSITE ENQUIRY',
  'REFERRAL',
  'COLD CALLING',
  'META LEADS',
  'LINKEDIN LEADS',
  'ORGANIC LEADS',
];

const SERVICES = ['PEB Building', 'Tensile', 'Other roofing'];

export default function AddNewLeadWizard({ isOpen, onClose, onSave, initialData = null }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [leadScore, setLeadScore] = useState(40);
  
  const defaultFormData = {
    // Basic Info
    name: '', companyName: '', phone: '', email: '',
    source: 'WEBSITE ENQUIRY', projectType: 'PEB Building', customProjectType: '',
    projectLocation: '', assignedExecutive: 'Sarah Smith', 
    priority: 'Medium', nextFollowUp: '', status: 'NEW',
    
    // Project Details
    structureType: 'Clear Span', siteCondition: 'Flat', soilTestDone: 'Done',
    projectTypeDetail: 'Industrial',
    
    // Site Dimensions
    length: '', width: '', totalArea: '', clearHeight: '', ridgeHeight: '',
    builtUpArea: '', baySpacing: '', numberOfFloors: '1', mezzanineArea: '',
    
    // Technical Details
    roofType: 'GI', claddingType: 'GI', floorType: 'Normal', heatInsulation: false,
    craneRequired: false, heavyEquipmentAccess: false, scopeOfWork: '',
    
    // Commercial
    estimatedRevenue: '1000000', timeline: '1-3 Months', siteAccess: 'Easy',
    powerAvailability: false, executionMode: 'Material + Labour', salesProbability: 50, expectedClosingDate: '',
    
    notes: '',
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({ ...defaultFormData, ...initialData });
      } else {
        setFormData(defaultFormData);
      }
      setCurrentStep(1);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    const sectionStyle = { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' };
    const headerStyle = { display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '800', color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem' };
    const inputGroupStyle = { marginBottom: '1.25rem' };
    const grid2Col = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' };
    const grid3Col = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' };

    switch (currentStep) {
      case 1:
        return (
          <div className="step-content animate-fade-in">
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1E293B' }}>Basic Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Customer Name <span style={{ color: 'red' }}>*</span></label>
                <input type="text" placeholder="Enter customer name" style={inputStyle} value={formData.name} onChange={e => handleChange('name', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Company Name</label>
                <input type="text" placeholder="Enter company name" style={inputStyle} value={formData.companyName} onChange={e => handleChange('companyName', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number <span style={{ color: 'red' }}>*</span></label>
                <input type="text" placeholder="Enter phone number" style={inputStyle} value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" placeholder="Enter email address" style={inputStyle} value={formData.email} onChange={e => handleChange('email', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Lead Source <span style={{ color: 'red' }}>*</span></label>
                <select style={inputStyle} value={formData.source} onChange={e => handleChange('source', e.target.value)}>
                  {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={labelStyle}>Service <span style={{ color: 'red' }}>*</span></label>
                <select style={inputStyle} value={formData.projectType} onChange={e => handleChange('projectType', e.target.value)}>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {formData.projectType === 'Other roofing' && (
                  <select 
                    style={inputStyle} 
                    value={formData.customProjectType || ''} 
                    onChange={e => handleChange('customProjectType', e.target.value)}
                  >
                    <option value="" disabled>Select Roofing Type</option>
                    <option value="Tensile Roofing">Tensile Roofing</option>
                    <option value="UPVC Roofing in Chennai">UPVC Roofing in Chennai</option>
                    <option value="Polycarbonate Roofing">Polycarbonate Roofing</option>
                    <option value="Glass Roofing">Glass Roofing</option>
                    <option value="Mangalore Tile Roofing">Mangalore Tile Roofing</option>
                    <option value="Shingles Roofing">Shingles Roofing</option>
                    <option value="GI Roofing in Chennai">GI Roofing in Chennai</option>
                    <option value="Retractable Roofing">Retractable Roofing</option>
                  </select>
                )}
              </div>
              <div>
                <label style={labelStyle}>Project Location</label>
                <input type="text" placeholder="Enter project location" style={inputStyle} value={formData.projectLocation} onChange={e => handleChange('projectLocation', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Assigned Executive <span style={{ color: 'red' }}>*</span></label>
                <select style={inputStyle} value={formData.assignedExecutive} onChange={e => handleChange('assignedExecutive', e.target.value)}>
                  <option value="Sarah Smith">Sarah Smith</option>
                  <option value="John Doe">John Doe</option>
                </select>
              </div>
            </div>
            

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Next Follow-up Date</label>
                <input type="date" style={inputStyle} value={formData.nextFollowUp} onChange={e => handleChange('nextFollowUp', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Status <span style={{ color: 'red' }}>*</span></label>
                <select style={inputStyle} value={formData.status} onChange={e => handleChange('status', e.target.value)}>
                  <option value="NEW">NEW</option>
                  <option value="HOT">HOT</option>
                  <option value="WARM">WARM</option>
                  <option value="COLD">COLD</option>
                  <option value="APPOINTMENT FIXED">APPOINTMENT FIXED</option>
                  <option value="QUOTATION SEND">QUOTATION SEND</option>
                  <option value="NEGOTIATION">NEGOTIATION</option>
                  <option value="ORDER CONFIRMED">ORDER CONFIRMED</option>
                  <option value="JUNK">JUNK</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content animate-fade-in">
             <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1E293B' }}>Project Details - {formData.projectType === 'Other roofing' && formData.customProjectType ? formData.customProjectType : formData.projectType}</h3>
             
             <div style={{ marginBottom: '1.5rem' }}>
               <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                 {SERVICES.map(t => (
                   <SelectPill key={t} label={t} selected={formData.projectType === t} onClick={() => handleChange('projectType', t)} />
                 ))}
               </div>
               {formData.projectType === 'Other roofing' && (
                 <div style={{ marginTop: '0.75rem' }}>
                   <select 
                     style={inputStyle} 
                     value={formData.customProjectType || ''} 
                     onChange={e => handleChange('customProjectType', e.target.value)}
                   >
                     <option value="" disabled>Select Roofing Type</option>
                     <option value="Tensile Roofing">Tensile Roofing</option>
                     <option value="UPVC Roofing in Chennai">UPVC Roofing in Chennai</option>
                     <option value="Polycarbonate Roofing">Polycarbonate Roofing</option>
                     <option value="Glass Roofing">Glass Roofing</option>
                     <option value="Mangalore Tile Roofing">Mangalore Tile Roofing</option>
                     <option value="Shingles Roofing">Shingles Roofing</option>
                     <option value="GI Roofing in Chennai">GI Roofing in Chennai</option>
                     <option value="Retractable Roofing">Retractable Roofing</option>
                   </select>
                 </div>
               )}
             </div>

             {/* Dynamic Questionnaires based on projectType */}
             {formData.projectType === 'PEB Building' && (
               <>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={labelStyle}>Project Type</label>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Industrial', 'Warehouse', 'Commercial', 'Cold Storage', 'Institutional'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                     ))}
                   </div>
                 </div>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={labelStyle}>Structure Type</label>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Clear Span', 'Multi-span', 'Mezzanine', 'Multi-storey'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
                     ))}
                   </div>
                 </div>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={labelStyle}>Site Condition</label>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Flat', 'Slope', 'Filled', 'Rock'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.siteCondition === t} onClick={() => handleChange('siteCondition', t)} />
                     ))}
                   </div>
                 </div>
                 <div>
                   <label style={labelStyle}>Soil Test Done?</label>
                   <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                     <button type="button" onClick={() => handleChange('soilTestDone', 'Done')} style={{ ...toggleBtnStyle, ...(formData.soilTestDone === 'Done' ? toggleBtnActiveStyle : {}) }}>Done</button>
                     <button type="button" onClick={() => handleChange('soilTestDone', 'Not Done')} style={{ ...toggleBtnStyle, ...(formData.soilTestDone === 'Not Done' ? toggleBtnActiveStyle : {}) }}>Not Done</button>
                   </div>
                 </div>
               </>
             )}

             {formData.projectType === 'Tensile' && (
               <>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={labelStyle}>Project Type</label>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Commercial', 'Hospitality', 'Sports Complex', 'Event Space', 'Walkway / Canopy', 'Parking', 'Swimming Pool', 'Amphitheatre', 'Airport / Metro', 'Residential'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                     ))}
                   </div>
                 </div>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={labelStyle}>Structure Type</label>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Entrance Canopy', 'Walkway Canopy', 'Car Parking Shade', 'Tensile Roof', 'Dome Structure', 'Cone Structure', 'Hypar Structure', 'Arch Structure', 'Gazebo', 'Custom Design'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
                     ))}
                   </div>
                 </div>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={labelStyle}>Installation Area</label>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Ground Mounted', 'Rooftop', 'Existing Building', 'Steel Structure', 'RCC Structure'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.installationArea === t} onClick={() => handleChange('installationArea', t)} />
                     ))}
                   </div>
                 </div>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={labelStyle}>Fabric Material</label>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['PVC', 'PTFE', 'ETFE', 'HDPE Shade Net'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.fabricMaterial === t} onClick={() => handleChange('fabricMaterial', t)} />
                     ))}
                   </div>
                 </div>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={labelStyle}>Frame Material</label>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Mild Steel', 'Galvanized Steel', 'Stainless Steel', 'Aluminium'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.frameMaterial === t} onClick={() => handleChange('frameMaterial', t)} />
                     ))}
                   </div>
                 </div>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={labelStyle}>Site Condition</label>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Flat', 'Slope', 'Coastal Area', 'High Wind Zone'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.siteCondition === t} onClick={() => handleChange('siteCondition', t)} />
                     ))}
                   </div>
                 </div>
                 <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                   <div>
                     <label style={labelStyle}>Soil Test Done?</label>
                     <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                       <button type="button" onClick={() => handleChange('soilTestDone', 'Done')} style={{ ...toggleBtnStyle, ...(formData.soilTestDone === 'Done' ? toggleBtnActiveStyle : {}) }}>Done</button>
                       <button type="button" onClick={() => handleChange('soilTestDone', 'Not Done')} style={{ ...toggleBtnStyle, ...(formData.soilTestDone === 'Not Done' ? toggleBtnActiveStyle : {}) }}>Not Done</button>
                     </div>
                   </div>
                   <div>
                     <label style={labelStyle}>Need Design Support?</label>
                     <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                       <button type="button" onClick={() => handleChange('designSupport', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.designSupport === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                       <button type="button" onClick={() => handleChange('designSupport', 'No')} style={{ ...toggleBtnStyle, ...(formData.designSupport === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                     </div>
                   </div>
                 </div>
               </>
             )}

             {formData.projectType === 'Other roofing' && (
               <>
                 {!formData.customProjectType && (
                   <div style={{ color: '#64748B', fontStyle: 'italic', marginTop: '1rem' }}>
                     Please select a Roofing Type from the dropdown above to view the questionnaire.
                   </div>
                 )}

                 {formData.customProjectType === 'Tensile Roofing' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Roof Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['PVC Fabric', 'PTFE Fabric', 'ETFE Membrane', 'HDPE Shade Net'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.roofingType === t} onClick={() => handleChange('roofingType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Application Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Car Parking', 'Walkway', 'Swimming Pool', 'Stadium', 'Commercial', 'Resort', 'Auditorium'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Structure Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Cantilever', 'Cone', 'Arch', 'Barrel Vault', 'Hypar', 'Custom Design'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Site Condition</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Flat', 'Sloped', 'Existing Building', 'Open Ground'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.siteCondition === t} onClick={() => handleChange('siteCondition', t)} />
                         ))}
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Foundation Ready?</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('foundationReady', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.foundationReady === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                         <button type="button" onClick={() => handleChange('foundationReady', 'No')} style={{ ...toggleBtnStyle, ...(formData.foundationReady === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'UPVC Roofing in Chennai' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Building Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Industrial', 'Warehouse', 'Factory', 'Residential', 'Commercial'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Roof Structure</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['New Structure', 'Existing Structure', 'Shed Extension', 'Replacement'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Sheet Thickness</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['2 mm', '2.5 mm', '3 mm', '4 mm'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.sheetThickness === t} onClick={() => handleChange('sheetThickness', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Site Condition</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Flat', 'Sloped', 'Coastal Area', 'High Wind Area'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.siteCondition === t} onClick={() => handleChange('siteCondition', t)} />
                         ))}
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Old Roof Removal?</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('oldRoofRemoval', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.oldRoofRemoval === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                         <button type="button" onClick={() => handleChange('oldRoofRemoval', 'No')} style={{ ...toggleBtnStyle, ...(formData.oldRoofRemoval === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'Polycarbonate Roofing' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Application Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Skylight', 'Walkway', 'Car Parking', 'Balcony', 'Terrace', 'Greenhouse'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Sheet Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Solid', 'Multiwall', 'Corrugated', 'Embossed'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.sheetType === t} onClick={() => handleChange('sheetType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Sheet Color</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Clear', 'Bronze', 'Blue', 'Green', 'Opal'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.sheetColor === t} onClick={() => handleChange('sheetColor', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Frame Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['MS', 'Aluminium', 'Existing Frame', 'Custom'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.frameMaterial === t} onClick={() => handleChange('frameMaterial', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Installation Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['New', 'Replacement'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.installationType === t} onClick={() => handleChange('installationType', t)} />
                         ))}
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'Glass Roofing' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Application</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Skylight', 'Atrium', 'Terrace', 'Office', 'Villa', 'Commercial'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Glass Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Toughened', 'Laminated', 'Double Glazed', 'Tempered'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.glassType === t} onClick={() => handleChange('glassType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Frame Material</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Aluminium', 'MS', 'Stainless Steel'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.frameMaterial === t} onClick={() => handleChange('frameMaterial', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Design Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Flat', 'Pyramid', 'Dome', 'Sloped'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
                         ))}
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Waterproofing Required?</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('waterproofingRequired', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.waterproofingRequired === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                         <button type="button" onClick={() => handleChange('waterproofingRequired', 'No')} style={{ ...toggleBtnStyle, ...(formData.waterproofingRequired === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'Mangalore Tile Roofing' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Building Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['House', 'Villa', 'Temple', 'Resort', 'Heritage Building'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Roof Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['New Roof', 'Renovation', 'Replacement'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Tile Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Clay Tile', 'Ceramic Tile', 'Traditional Tile'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.tileType === t} onClick={() => handleChange('tileType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Roof Slope</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Low', 'Medium', 'High'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.roofSlope === t} onClick={() => handleChange('roofSlope', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Existing Structure?</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['RCC', 'Steel', 'Wooden', 'New Construction'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.existingStructure === t} onClick={() => handleChange('existingStructure', t)} />
                         ))}
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'Shingles Roofing' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Building Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Villa', 'House', 'Resort', 'Gazebo', 'Cottage'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Shingle Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Asphalt', 'Architectural', 'Fiberglass', 'Designer'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.shingleType === t} onClick={() => handleChange('shingleType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Roof Shape</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Gable', 'Hip', 'Flat', 'Pyramid'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Installation</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['New', 'Replacement'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.installationType === t} onClick={() => handleChange('installationType', t)} />
                         ))}
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Underlayment Required?</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('underlaymentRequired', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.underlaymentRequired === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                         <button type="button" onClick={() => handleChange('underlaymentRequired', 'No')} style={{ ...toggleBtnStyle, ...(formData.underlaymentRequired === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'GI Roofing in Chennai' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Building Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Industrial', 'Warehouse', 'Factory', 'Commercial', 'Agricultural'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Sheet Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Corrugated', 'Trapezoidal', 'Colour Coated', 'Plain GI'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.sheetType === t} onClick={() => handleChange('sheetType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Structure Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['New', 'Existing', 'Extension'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Site Condition</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Flat', 'Sloped', 'Coastal', 'High Wind'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.siteCondition === t} onClick={() => handleChange('siteCondition', t)} />
                         ))}
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Insulation Required?</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('insulationRequired', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.insulationRequired === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                         <button type="button" onClick={() => handleChange('insulationRequired', 'No')} style={{ ...toggleBtnStyle, ...(formData.insulationRequired === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'Retractable Roofing' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Application</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Restaurant', 'Terrace', 'Swimming Pool', 'Balcony', 'Commercial', 'Café'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Operating Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Manual', 'Motorized', 'Remote Control'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.operatingType === t} onClick={() => handleChange('operatingType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Roof Material</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Fabric', 'Polycarbonate', 'Glass'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.roofMaterial === t} onClick={() => handleChange('roofMaterial', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Frame Material</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Aluminium', 'MS', 'Stainless Steel'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.frameMaterial === t} onClick={() => handleChange('frameMaterial', t)} />
                         ))}
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Weather Sensor Required?</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('weatherSensorRequired', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.weatherSensorRequired === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                         <button type="button" onClick={() => handleChange('weatherSensorRequired', 'No')} style={{ ...toggleBtnStyle, ...(formData.weatherSensorRequired === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                       </div>
                     </div>
                   </>
                 )}
               </>
             )}
             
          </div>
        );
      case 3:
        return (
          <div className="step-content animate-fade-in">
             <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1E293B' }}>Site & Dimensions</h3>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
               <UnitInput label="LENGTH" unit="ft" value={formData.length} onChange={v => handleChange('length', v)} />
               <UnitInput label="WIDTH" unit="ft" value={formData.width} onChange={v => handleChange('width', v)} />
               <UnitInput label="TOTAL AREA" unit="sq.ft" value={formData.totalArea} onChange={v => handleChange('totalArea', v)} />
               
               <UnitInput label="CLEAR HEIGHT" unit="ft" value={formData.clearHeight} onChange={v => handleChange('clearHeight', v)} />
               <UnitInput label="RIDGE HEIGHT" unit="ft" value={formData.ridgeHeight} onChange={v => handleChange('ridgeHeight', v)} />
               <UnitInput label="BUILT-UP AREA" unit="sq.ft" value={formData.builtUpArea} onChange={v => handleChange('builtUpArea', v)} />
               
               <UnitInput label="BAY SPACING" unit="meters" value={formData.baySpacing} onChange={v => handleChange('baySpacing', v)} />
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                 <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', marginBottom: '0.5rem', textTransform: 'uppercase' }}>NUMBER OF FLOORS</label>
                 <input type="number" style={inputStyle} value={formData.numberOfFloors} onChange={e => handleChange('numberOfFloors', e.target.value)} />
               </div>
               <UnitInput label="MEZZANINE AREA" unit="sq.ft" value={formData.mezzanineArea} onChange={v => handleChange('mezzanineArea', v)} />
             </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content animate-fade-in">
             <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1E293B' }}>Technical Details</h3>
             
             <div style={{ marginBottom: '2rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase' }}>ROOF, WALL & FLOORING</h4>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                 <div>
                   <label style={labelStyle}>Roof Type</label>
                   <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#F8FAFC', padding: '0.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', width: 'fit-content' }}>
                     {['GI', 'PUF', 'Standing Seam'].map(t => (
                       <button key={t} type="button" onClick={() => handleChange('roofType', t)} style={{ ...toggleBtnStyle, ...(formData.roofType === t ? toggleBtnActiveStyle : {}) }}>{t}</button>
                     ))}
                   </div>
                 </div>
                 <div>
                   <label style={labelStyle}>Cladding Type</label>
                   <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#F8FAFC', padding: '0.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', width: 'fit-content' }}>
                     {['GI', 'PUF', 'ACP', 'Brick'].map(t => (
                       <button key={t} type="button" onClick={() => handleChange('claddingType', t)} style={{ ...toggleBtnStyle, ...(formData.claddingType === t ? toggleBtnActiveStyle : {}) }}>{t}</button>
                     ))}
                   </div>
                 </div>
                 <div>
                   <label style={labelStyle}>Floor Type</label>
                   <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#F8FAFC', padding: '0.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', width: 'fit-content' }}>
                     {['Normal', 'Heavy Duty', 'FM2', 'Epoxy'].map(t => (
                       <button key={t} type="button" onClick={() => handleChange('floorType', t)} style={{ ...toggleBtnStyle, ...(formData.floorType === t ? toggleBtnActiveStyle : {}) }}>{t}</button>
                     ))}
                   </div>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                   <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>Heat Insulation Required?</span>
                   <ToggleSwitch checked={formData.heatInsulation} onChange={() => handleChange('heatInsulation', !formData.heatInsulation)} />
                 </div>
               </div>
             </div>

             <div>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase' }}>STRUCTURE & MACHINERY</h4>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                   <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>Crane Required?</span>
                   <ToggleSwitch checked={formData.craneRequired} onChange={() => handleChange('craneRequired', !formData.craneRequired)} />
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                   <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>Heavy Equipment Access?</span>
                   <ToggleSwitch checked={formData.heavyEquipmentAccess} onChange={() => handleChange('heavyEquipmentAccess', !formData.heavyEquipmentAccess)} />
                 </div>
               </div>
             </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content animate-fade-in">
             <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1E293B' }}>Quotations Form</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div>
                   <label style={labelStyle}>Lead ID</label>
                   <input type="text" style={{...inputStyle, backgroundColor: '#F1F5F9', color: '#94A3B8'}} value="Pending Generation" disabled />
                 </div>
                 <div>
                   <label style={labelStyle}>Client Name</label>
                   <input type="text" style={inputStyle} value={formData.name || ''} placeholder="e.g. Acme Corp" readOnly />
                 </div>
               </div>
               <div>
                 <label style={labelStyle}>Services</label>
                 <select style={inputStyle} value={formData.projectType} onChange={e => handleChange('projectType', e.target.value)}>
                   {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div>
                   <label style={labelStyle}>Quotation Type</label>
                   <select style={inputStyle}>
                     <option>Initial Quotation</option>
                     <option>Revised Quotation</option>
                     <option>Final Quotation</option>
                   </select>
                 </div>
                 <div>
                   <label style={labelStyle}>Upload File (PDF)</label>
                   <input type="file" accept=".pdf" style={{
                     ...inputStyle,
                     padding: '0.45rem',
                     border: '1px solid #E2E8F0',
                     backgroundColor: '#FFFFFF',
                     cursor: 'pointer'
                   }} />
                 </div>
               </div>
             </div>
          </div>
        );
      case 6:
        return (
          <div className="step-content animate-fade-in">
             <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1E293B' }}>Project Filing Form</h3>
             
            {/* 1. Client & Project Details */}
            <div style={sectionStyle}>
              <h3 style={headerStyle}><Building size={20} color="#3b82f6" /> 1. Client & Project Details</h3>
              <div style={grid3Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Client Name *</label>
                  <input required name="clientName" value={formData.clientName || formData.name || ''} onChange={e => handleChange('clientName', e.target.value)} style={inputStyle} placeholder="e.g. Sree Brindaavan Kindergarten" />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Project Location *</label>
                  <input required name="projectLocation" value={formData.projectLocation || ''} onChange={e => handleChange('projectLocation', e.target.value)} style={inputStyle} placeholder="e.g. Chitlapakkam" />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Contact Details (Phone/Email)</label>
                  <input name="phoneEmail" value={formData.phoneEmail || formData.phone || ''} onChange={e => handleChange('phoneEmail', e.target.value)} style={inputStyle} placeholder="e.g. 9840714353 / ..." />
                </div>
              </div>
              
              <div style={grid2Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Billing Name</label>
                  <input name="billingName" value={formData.billingName || ''} onChange={e => handleChange('billingName', e.target.value)} style={inputStyle} placeholder="e.g. Sree Brindaavan Kindergarten" />
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Mobile Number *</label>
                    <input required name="mobile" value={formData.mobile || formData.phone || ''} onChange={e => handleChange('mobile', e.target.value)} style={inputStyle} placeholder="e.g. 9551269990" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Alternate Mobile Number</label>
                    <input name="altMobile" value={formData.altMobile || ''} onChange={e => handleChange('altMobile', e.target.value)} style={inputStyle} />
                  </div>
                </div>
              </div>

              <div style={grid2Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Site Address *</label>
                  <textarea required name="siteAddress" value={formData.siteAddress || ''} onChange={e => handleChange('siteAddress', e.target.value)} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="e.g. 46, First main Road, Venkatraman Nagar, Chennai-600064" />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Billing Address</label>
                  <textarea name="billingAddress" value={formData.billingAddress || ''} onChange={e => handleChange('billingAddress', e.target.value)} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                </div>
              </div>

              <div style={grid3Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>GST Number</label>
                  <input name="gst" value={formData.gst || ''} onChange={e => handleChange('gst', e.target.value)} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Email ID / WhatsApp Number</label>
                  <input name="emailWhatsapp" value={formData.emailWhatsapp || formData.email || ''} onChange={e => handleChange('emailWhatsapp', e.target.value)} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Salesperson Name *</label>
                  <input required name="salesperson" value={formData.salesperson || formData.assignedExecutive || ''} onChange={e => handleChange('salesperson', e.target.value)} style={inputStyle} placeholder="e.g. Saleem Khan" />
                </div>
              </div>

              <div style={grid2Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Date of Order *</label>
                  <input required type="date" name="orderDate" value={formData.orderDate || ''} onChange={e => handleChange('orderDate', e.target.value)} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Proposal Ref No *</label>
                  <input required name="proposalRef" value={formData.proposalRef || ''} onChange={e => handleChange('proposalRef', e.target.value)} style={inputStyle} placeholder="e.g. TES/ENT/176-R1" />
                </div>
              </div>
            </div>

            {/* 2. Scope of Work */}
            <div style={sectionStyle}>
              <h3 style={headerStyle}><ClipboardList size={20} color="#8b5cf6" /> 2. Scope of Work</h3>
              <div style={grid2Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Type of Project *</label>
                  <input required name="projectTypeStr" value={formData.projectTypeStr || formData.projectType || ''} onChange={e => handleChange('projectTypeStr', e.target.value)} style={inputStyle} placeholder="e.g. PU Sheet Roof with wall panel cladding" />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Project Size/Area *</label>
                  <input required name="projectSize" value={formData.projectSize || ''} onChange={e => handleChange('projectSize', e.target.value)} style={inputStyle} placeholder="e.g. 760 Sqft." />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500', color: '#1e293b' }}>
                  <input type="checkbox" name="design3D" checked={formData.design3D || false} onChange={e => handleChange('design3D', e.target.checked)} style={{ width: '18px', height: '18px' }} />
                  3D Design
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500', color: '#1e293b' }}>
                  <input type="checkbox" name="design2D" checked={formData.design2D || false} onChange={e => handleChange('design2D', e.target.checked)} style={{ width: '18px', height: '18px' }} />
                  2D Design
                </label>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>Transportation Client Scope</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontWeight: '500' }}>
                      <input type="radio" name="transportationScope" value="yes" checked={formData.transportationScope === 'yes'} onChange={e => handleChange('transportationScope', e.target.value)} /> Yes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontWeight: '500' }}>
                      <input type="radio" name="transportationScope" value="no" checked={formData.transportationScope === 'no'} onChange={e => handleChange('transportationScope', e.target.value)} /> No
                    </label>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>Scaffolding Client Scope</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontWeight: '500' }}>
                      <input type="radio" name="scaffoldingScope" value="yes" checked={formData.scaffoldingScope === 'yes'} onChange={e => handleChange('scaffoldingScope', e.target.value)} /> Yes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontWeight: '500' }}>
                      <input type="radio" name="scaffoldingScope" value="no" checked={formData.scaffoldingScope === 'no'} onChange={e => handleChange('scaffoldingScope', e.target.value)} /> No
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
                  <input required type="date" name="startDate" value={formData.startDate || ''} onChange={e => handleChange('startDate', e.target.value)} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Tentative Completion Date *</label>
                  <input required type="date" name="completionDate" value={formData.completionDate || ''} onChange={e => handleChange('completionDate', e.target.value)} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Lead Time Promised</label>
                  <input name="leadTime" value={formData.leadTime || ''} onChange={e => handleChange('leadTime', e.target.value)} style={inputStyle} placeholder="e.g. 30 days" />
                </div>
              </div>
            </div>

            {/* 4. Pricing & Payment Terms */}
            <div style={sectionStyle}>
              <h3 style={headerStyle}><IndianRupee size={20} color="#10b981" /> 4. Pricing & Payment Terms</h3>
              <div style={grid2Col}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Quoted Price *</label>
                  <input required name="quotedPrice" value={formData.quotedPrice || ''} onChange={e => handleChange('quotedPrice', e.target.value)} style={inputStyle} placeholder="₹ Amount" />
                </div>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Payment Schedule</label>
                  <select name="paymentSchedule" value={formData.paymentSchedule || 'agreed'} onChange={e => handleChange('paymentSchedule', e.target.value)} style={inputStyle}>
                    <option value="agreed">Agreed Standard terms (50/40/10)</option>
                    <option value="no">No / Custom terms</option>
                  </select>
                </div>
              </div>
              {formData.paymentSchedule === 'no' && (
                <div style={{ ...inputGroupStyle, padding: '1rem', backgroundColor: '#fff7ed', borderLeft: '4px solid #f97316', borderRadius: '4px' }}>
                  <label style={{ ...labelStyle, color: '#c2410c' }}>If not applicable, mention alternate payment terms:</label>
                  <textarea 
                    name="alternateTerms" 
                    value={formData.alternateTerms || ''} 
                    onChange={e => handleChange('alternateTerms', e.target.value)} 
                    style={{ ...inputStyle, minHeight: '100px', backgroundColor: 'white', resize: 'vertical' }} 
                    placeholder="e.g. 10% Advance with PO, 30% After Drawing Approval, 40% After Structure work complete, 20% After completion" 
                  />
                </div>
              )}
            </div>

            {/* 5 & 6. Declarations */}
            <div style={{ ...sectionStyle, backgroundColor: '#f8fafc', border: '1px dashed #94a3b8' }}>
              <h3 style={headerStyle}><PenTool size={20} color="#64748b" /> 5 & 6. Confirmations & Declarations</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e293b', margin: '0 0 1rem 0' }}>5. Site Engineer Visit Completed</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: '500', color: '#0f172a' }}>
                      <input type="checkbox" name="engineerVisit" checked={formData.engineerVisit || false} onChange={e => handleChange('engineerVisit', e.target.checked)} style={{ width: '20px', height: '20px', accentColor: '#3b82f6' }} />
                      Visit Completed
                    </label>
                    <div style={{ flex: 1, display: formData.engineerVisit ? 'block' : 'none' }}>
                      <input name="engineerSign" value={formData.engineerSign || ''} onChange={e => handleChange('engineerSign', e.target.value)} style={{ ...inputStyle, borderBottom: '2px solid #cbd5e1', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, backgroundColor: 'transparent' }} placeholder="Site Engineer Sign / Name" />
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e293b', margin: '0 0 1rem 0' }}>6. Salesperson Declaration</h4>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }}>
                    <input required type="checkbox" name="salespersonDeclaration" checked={formData.salespersonDeclaration || false} onChange={e => handleChange('salespersonDeclaration', e.target.checked)} style={{ width: '24px', height: '24px', accentColor: '#10b981', marginTop: '2px' }} />
                    <span style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6' }}>
                      "I confirm that all details communicated to the client and project team are accurate and have been agreed upon. I also acknowledge that the project will commence once the design has been confirmed."
                    </span>
                  </label>
                  <div style={{ marginTop: '1.5rem', maxWidth: '300px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>Signature of Salesperson:</label>
                    <input required name="salespersonSign" value={formData.salespersonSign || ''} onChange={e => handleChange('salespersonSign', e.target.value)} style={{ ...inputStyle, borderBottom: '2px solid #cbd5e1', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, backgroundColor: 'transparent', fontFamily: 'cursive', fontSize: '1.25rem' }} placeholder="Sign here..." />
                  </div>
                </div>
              </div>
            </div>

          </div>
        );
      case 7:
        return (
          <div className="step-content animate-fade-in">
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1E293B' }}>Project Attachments</h3>
            <div style={{
              border: '2px dashed #6366F1', borderRadius: '12px', padding: '4rem 2rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              backgroundColor: '#F5F3FF', textAlign: 'center'
            }}>
              <UploadCloud size={48} color="#6366F1" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.5rem' }}>Drag and drop files here</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem', maxWidth: '400px' }}>
                Supports Site Photos, CAD drawings, BOQ spreadsheets, Soil reports, and PDFs up to 50MB
              </p>
              <button type="button" style={{
                backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '0.75rem 1.5rem',
                borderRadius: '8px', fontWeight: '600', color: '#475569', cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>Select Files (Simulate Upload)</button>
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#94A3B8', marginTop: '1.5rem' }}>
              No files uploaded yet. Click above to simulate an upload.
            </p>
          </div>
        );
      case 8:
        return (
          <div className="step-content animate-fade-in">
             <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1E293B' }}>Review Lead Requirements</h3>
             <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem' }}>Verify all parameters below before confirming saving lead records.</p>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               
               {/* 1. Basic Info */}
               <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                 <div style={{ backgroundColor: '#F8FAFC', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
                   <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: '#334155' }}>1. Basic Information</h4>
                 </div>
                 <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.5rem' }}>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Name:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.name || 'N/A'}</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Company:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.companyName || 'N/A'}</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Phone:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.phone || 'N/A'}</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Email:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.email || 'N/A'}</span></div>
                   
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Location:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.projectLocation || 'N/A'}</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Sales Executive:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.assignedExecutive}</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Next Follow-up:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.nextFollowUp || 'Not Set'}</span></div>
                 </div>
               </div>

               {/* 2. Project Details */}
               <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                 <div style={{ backgroundColor: '#F8FAFC', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
                   <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: '#334155' }}>2. Project Details</h4>
                 </div>
                 <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Service Type:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.projectType === 'Other roofing' ? formData.customProjectType : formData.projectType}</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Project Type:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.projectTypeDetail || 'N/A'}</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Priority:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.priority || 'Medium'}</span></div>
                 </div>
               </div>
               
               {/* 3. Site Dimensions */}
               <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                 <div style={{ backgroundColor: '#F8FAFC', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
                   <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: '#334155' }}>3. Site Dimensions</h4>
                 </div>
                 <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.5rem' }}>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Length:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.length || '0'} ft</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Width:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.width || '0'} ft</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Side Height:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.sideHeight || '0'} ft</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Center Height:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.centerHeight || '0'} ft</span></div>
                 </div>
               </div>
               
               {/* 4. Technical Details */}
               <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                 <div style={{ backgroundColor: '#F8FAFC', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
                   <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: '#334155' }}>4. Technical Details</h4>
                 </div>
                 <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Soil Type:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.soilType || 'N/A'}</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Foundation Requirement:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.foundationRequirement || 'N/A'}</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Crane Requirement:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.craneRequirement || 'N/A'}</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Power & Access:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.heavyEquipmentAccess ? 'Heavy Equip Access' : 'No Heavy Equip'}, {formData.powerAvailability ? 'Power Available' : 'No Power'}</span></div>
                 </div>
               </div>
               
               {/* 5. Quotations */}
               <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                 <div style={{ backgroundColor: '#F8FAFC', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
                   <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: '#334155' }}>5. Quotations</h4>
                 </div>
                 <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
                   <span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>Quotation details configured in Step 5.</span>
                 </div>
               </div>

               {/* 6. Project Filing */}
               <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                 <div style={{ backgroundColor: '#F8FAFC', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
                   <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: '#334155' }}>6. Project Filing</h4>
                 </div>
                 <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Quoted Price:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.quotedPrice || 'N/A'}</span></div>
                   <div><span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>Completion Date:</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{formData.completionDate || 'N/A'}</span></div>
                 </div>
               </div>

               {/* 7. Attachments */}
               <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                 <div style={{ backgroundColor: '#F8FAFC', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
                   <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: '#334155' }}>7. Attachments</h4>
                 </div>
                 <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
                   <span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>Files uploaded in Step 7.</span>
                 </div>
               </div>

             </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleFinish = () => {
    // Map formData to what LeadManagement expects
    const leadToSave = {
      name: formData.name,
      companyName: formData.companyName,
      phone: formData.phone,
      email: formData.email,
      source: formData.source,
      projectType: formData.projectType,
      projectLocation: formData.projectLocation,
      manager: formData.assignedExecutive,
      priority: formData.priority,
      budget: formData.estimatedRevenue ? `₹${(Number(formData.estimatedRevenue)/1000).toFixed(0)}k` : '',
      status: 'New Lead', // Hardcode to New Lead on creation, or use formData.status
      workType: formData.projectTypeDetail,
      notes: formData.notes
    };
    onSave(leadToSave);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem'
    }}>
      <style>{`
        .wizard-scroll::-webkit-scrollbar { width: 6px; }
        .wizard-scroll::-webkit-scrollbar-track { background: transparent; }
        .wizard-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      <div style={{ 
        width: '100%', maxWidth: '1200px', height: '90vh', 
        backgroundColor: '#FFFFFF', borderRadius: '16px', 
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#1E293B', letterSpacing: '-0.5px' }}>Add New Lead</h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem', backgroundColor: '#ECFDF5', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#059669' }}>Saved to draft</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '0.5rem' }}>
            <X size={24} />
          </button>
        </div>

        {/* Stepper Navigation */}
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              let style = { 
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', 
                borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', flexShrink: 0,
                cursor: 'pointer', transition: 'all 0.2s', border: '1px solid transparent'
              };

              if (isActive) {
                style = { ...style, backgroundColor: '#FFFFFF', border: '1px solid #4F46E5', color: '#1E293B', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' };
              } else if (isCompleted) {
                style = { ...style, backgroundColor: '#FFFFFF', border: '1px solid #10B981', color: '#1E293B' };
              } else {
                style = { ...style, backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', color: '#64748B' };
              }

              return (
                <div key={step.id} style={style} onClick={() => setCurrentStep(step.id)}>
                  {isCompleted ? (
                    <CheckCircle2 size={18} color="#10B981" fill="#D1FAE5" />
                  ) : (
                    <div style={{ 
                      width: '20px', height: '20px', borderRadius: '50%', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      backgroundColor: isActive ? '#4F46E5' : '#F1F5F9',
                      color: isActive ? '#FFF' : '#94A3B8',
                      fontSize: '0.75rem'
                    }}>
                      {step.id}
                    </div>
                  )}
                  {step.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Form Area */}
          <div className="wizard-scroll" style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
            {renderStepContent()}
          </div>

          {/* Right Sidebar */}
          <div style={{ width: '320px', borderLeft: '1px solid #E2E8F0', backgroundColor: '#FAFAF9', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
            {/* Lead Score */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ position: 'relative', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="56" height="56" viewBox="0 0 56 56" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#F1F5F9" strokeWidth="5" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#4F46E5" strokeWidth="5" 
                    strokeDasharray={`${2 * Math.PI * 24}`} 
                    strokeDashoffset={`${2 * Math.PI * 24 * (1 - leadScore / 100)}`} 
                    strokeLinecap="round" 
                    style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                  />
                </svg>
                <span style={{ fontWeight: '800', color: '#1E293B', fontSize: '1.125rem', position: 'relative', zIndex: 1 }}>{leadScore}</span>
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '700', color: '#1E293B' }}>Lead Score</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.7rem', color: '#64748B', lineHeight: 1.4 }}>Calculated dynamically based on completed detail fields.</p>
              </div>
            </div>

            {/* Quick Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Assigned Executive</span>
                <span style={{ fontWeight: '600', color: '#1E293B' }}>{formData.assignedExecutive}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Last Follow-up</span>
                <span style={{ fontWeight: '600', color: '#1E293B' }}>Never</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Next Reminder</span>
                <span style={{ fontWeight: '600', color: '#1E293B' }}>{formData.nextFollowUp || 'None Set'}</span>
              </div>
            </div>

            {/* Recent Notes */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '1rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Notes</h4>
              <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: '#94A3B8', textAlign: 'center', padding: '1rem 0' }}>No notes added. Type below and press Enter to save.</p>
              <div style={{ position: 'relative' }}>
                <input type="text" placeholder="Add a fast note..." style={{ width: '100%', padding: '0.6rem 2.5rem 0.6rem 0.75rem', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.75rem', outline: 'none' }} />
                <button style={{ position: 'absolute', right: '0.25rem', top: '50%', transform: 'translateY(-50%)', background: '#F1F5F9', border: 'none', borderRadius: '4px', padding: '0.25rem', cursor: 'pointer', color: '#64748B' }}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Activity Timeline */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '1rem', flex: 1 }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Activity Timeline</h4>
              <div style={{ position: 'relative', paddingLeft: '1rem' }}>
                <div style={{ position: 'absolute', left: '0.25rem', top: '0.5rem', bottom: 0, width: '2px', backgroundColor: '#E2E8F0' }}></div>
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <div style={{ position: 'absolute', left: '-1rem', top: '0.25rem', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4F46E5', border: '2px solid #EEF2FF' }}></div>
                  <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: '600', color: '#1E293B' }}>Lead Form initialized</p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.7rem', color: '#94A3B8' }}>Just Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 2rem', borderTop: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={onClose} style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer' }}>Cancel</button>
            <button style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer' }}>Save Draft</button>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {currentStep > 1 && (
              <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem', borderRadius: '8px', border: '1px solid transparent', backgroundColor: '#FFFFFF', color: '#475569', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer' }}>
                <ArrowLeft size={16} /> Back
              </button>
            )}
            {currentStep < steps.length ? (
              <button onClick={handleNext} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#2E1065', color: '#FFFFFF', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <>
                <button onClick={handleFinish} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#2E1065', color: '#FFFFFF', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                  Save Lead
                </button>
                <button onClick={handleFinish} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#4F46E5', color: '#FFFFFF', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                  Save & Create Quotation
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Styles & Components
const inputStyle = {
  width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0',
  fontSize: '0.875rem', outline: 'none', color: '#1E293B', backgroundColor: '#FFFFFF'
};

const labelStyle = {
  display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748B', marginBottom: '0.5rem', textTransform: 'uppercase'
};

const PriorityPill = ({ type, selected, onClick }) => {
  const colors = {
    High: { text: '#DC2626', bg: '#FEE2E2', dot: '#DC2626' },
    Medium: { text: '#D97706', bg: '#FEF3C7', dot: '#F59E0B' },
    Low: { text: '#059669', bg: '#D1FAE5', dot: '#10B981' }
  };
  const c = colors[type];
  
  return (
    <button type="button" onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
      borderRadius: '999px', border: `1px solid ${selected ? c.dot : '#E2E8F0'}`,
      backgroundColor: selected ? c.bg : '#FFFFFF', cursor: 'pointer', outline: 'none',
      transition: 'all 0.2s'
    }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: c.dot }}></span>
      <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#1E293B' }}>{type}</span>
    </button>
  );
};

const SelectPill = ({ label, selected, onClick }) => (
  <button type="button" onClick={onClick} style={{
    padding: '0.6rem 1.25rem', borderRadius: '8px',
    border: `1px solid ${selected ? '#4F46E5' : '#E2E8F0'}`,
    backgroundColor: '#FFFFFF', color: selected ? '#4F46E5' : '#475569',
    fontWeight: '600', fontSize: '0.8125rem', cursor: 'pointer', outline: 'none',
    boxShadow: selected ? '0 0 0 1px #4F46E5' : 'none',
    transition: 'all 0.2s'
  }}>
    {label}
  </button>
);

const UnitInput = ({ label, unit, value, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <input type="text" style={{ ...inputStyle, paddingRight: '3rem' }} value={value} onChange={e => onChange(e.target.value)} />
      <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', color: '#94A3B8', fontWeight: '600' }}>{unit}</span>
    </div>
  </div>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <button type="button" onClick={onChange} style={{
    width: '44px', height: '24px', borderRadius: '12px', border: 'none',
    backgroundColor: checked ? '#4F46E5' : '#CBD5E1', cursor: 'pointer', position: 'relative',
    transition: 'background-color 0.2s', outline: 'none'
  }}>
    <span style={{
      position: 'absolute', left: checked ? '22px' : '2px', top: '2px',
      width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFFFFF',
      transition: 'left 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
    }}></span>
  </button>
);

const toggleBtnStyle = {
  padding: '0.4rem 1rem', borderRadius: '6px', border: 'none', backgroundColor: 'transparent',
  color: '#64748B', fontWeight: '600', fontSize: '0.8125rem', cursor: 'pointer', transition: 'all 0.2s'
};

const toggleBtnActiveStyle = {
  backgroundColor: '#FFFFFF', color: '#1E293B', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};
