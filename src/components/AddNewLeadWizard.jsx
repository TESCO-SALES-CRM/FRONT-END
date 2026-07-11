import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Plus, UploadCloud, ChevronDown, ChevronUp, Building, ClipboardList, Calendar, IndianRupee, PenTool } from 'lucide-react';

const steps = [
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'Project Details' },
  { id: 3, label: 'Site Dimensions' },
  { id: 4, label: 'Technical Details' },
  { id: 5, label: 'Quotations' },
  { id: 6, label: 'Project Filing' },
  { id: 7, label: 'Order confirmed' },
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
    // Step 2 Tensile additions
    fabricGsm: '', customFabricGsm: '',
    fabricThickness: '', customFabricThickness: '',
    coatingType: [], expectedWarranty: '',

    projectLocation: '', assignedExecutive: 'Sarah Smith', projectValue: '',
    priority: 'Medium', nextFollowUp: '', status: 'NEW',
    
    // Project Details
    structureType: 'Clear Span', siteCondition: 'Flat', soilTestDone: 'Done',
    projectTypeDetail: 'Industrial', tensileGsm: '700 GSM',
    
    // Site Dimensions
    length: '', width: '', totalArea: '', clearHeight: '', ridgeHeight: '',
    builtUpArea: '', baySpacing: '', numberOfFloors: '1', mezzanineArea: '',
    // New Site Dimensions (Step 3)
    plotLength: '', plotWidth: '', plotArea: '',
    roofHeight: '', clearanceHeight: '', roofSlope: 'Flat',
    roofLength: '', roofWidth: '', roofArea: '',
    numberOfBays: 4, numberOfColumns: 4,
    eaveHeight: '', 
    roadAccessWidth: '10-20 ft', craneAccess: false, heavyVehicleAccess: false,
    existingStructures: [], workingSpace: 'Moderate',
    roofDirection: 'North', sunExposure: 'Medium', windDirection: '', drainageAvailable: false,
    additionalNotes: '', measurementFiles: [],
    // Extended Dynamic Site Dimensions (Step 3)
    buildingLength: '', buildingWidth: '', columnHeight: '', craneProvision: false, mezzanineFloor: false,
    soilType: 'Normal', foundationReady: false, groundLevel: 'Even',
    maximumHeight: '', edgeHeight: '', structureShape: 'Cone', installationArea: 'Ground',
    windExposure: 'Medium', rainwaterDrainage: false, obstructions: 'None',
    roofPitch: '', existingRoofHeight: '', purlinSpacing: '', buildingHeight: '',
    panelLength: '', panelWidth: '', sheetThickness: '', curvedFlatRoof: 'Flat', frameSpacing: '',
    glassArea: '', glassThickness: '', panelSize: '', structuralSupportType: 'Steel', drainageSlope: '',
    ridgeLength: '', valleyLength: '', existingTimberStructure: false,
    numberOfSlopes: '2', existingRoofCondition: 'Good', existingStructure: 'Yes',
    openingLength: '', openingWidth: '', maxOpeningArea: '', installationHeight: '', motorLocation: 'Left',
    trackLength: '', sideClearance: '', controlType: 'Remote',
    // Extended Dynamic Technical Details (Step 4)
    structureGrade: 'Standard', designStandard: 'IS Standard', designLoad: '', windLoadTech: 'Medium', seismicZone: 'Zone III', liveLoad: '',
    primaryMaterial: [], roofMaterialTech: 'GI Sheet', materialThickness: '', surfaceFinish: [], colorPreference: 'White', customColor: '',
    roofProfile: 'Trapezoidal', roofPitchTech: '', roofVentilator: false, skylightRequired: false, insulationRequired: false, insulationThickness: '50mm',
    accessories: [], lightingProvision: false, exhaustFan: false, motorizedSystem: false, powerSupplyAvailable: false, cableRouting: 'Internal',
    installationPriority: 'Normal', workingHours: 'Day', safetyRequirement: [], siteConstraints: '',
    warrantyRequired: false, warrantyPeriod: '1 Year', annualMaintenance: false, technicalNotes: '',
    
    craneCapacity: '', mezzanineFloorTech: false, futureExpansion: false, columnType: 'I-Section', bracingType: 'Rod Bracing', roofMonitorTech: false, wallCladdingTech: false, sandwichPanel: false,
    fabricTypeTech: 'PVC', membraneThickness: '', edgeCable: '', mastHeight: '', cableDiameter: '', fabricColor: 'White', drainageSystem: 'Yes', lightingIntegration: false,
    upvcSheetThickness: '', uvProtection: true, sheetColor: 'White', overlapType: 'Standard',
    solidMultiwall: 'Solid', uvCoating: true, transparencyLevel: 'High', polycarbonateThickness: '',
    glassTypeTech: 'Clear', toughenedGlass: true, laminatedGlass: false, glassTechThickness: '', frameType: 'Aluminum', siliconeSeal: 'Structural',
    tileBrand: '', tileColor: 'Terracotta', underlayRequired: true, ridgeTile: true,
    shingleTypeTech: 'Architectural', shingleWarranty: '10 Years', underlayment: true, starterStrip: true,
    sheetGauge: '', zincCoating: '120 GSM', profileTypeTech: 'Trapezoidal', fastenerType: 'Self Drilling',
    motorBrand: '', remoteControl: true, automation: false, manualOverride: true, trackSystem: 'Aluminum', waterproofSeal: true,



    
    // Technical Details
    roofType: 'GI', claddingType: 'GI', floorType: 'Normal', heatInsulation: false,
    craneRequired: false, heavyEquipmentAccess: false, scopeOfWork: '',
    
    // Commercial
    paymentTerms: [{ term: '', percentage: '', value: '' }],
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

  
  const handlePaymentTermChange = (index, field, value) => {
    const newTerms = [...(formData.paymentTerms || [])];
    newTerms[index] = { ...newTerms[index], [field]: value };
    handleChange('paymentTerms', newTerms);
  };

  const addPaymentTerm = () => {
    handleChange('paymentTerms', [...(formData.paymentTerms || []), { term: '', percentage: '', value: '' }]);
  };

  const removePaymentTerm = (index) => {
    const newTerms = [...(formData.paymentTerms || [])];
    newTerms.splice(index, 1);
    handleChange('paymentTerms', newTerms);
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
                <input type="text" placeholder="Enter executive name" style={inputStyle} value={formData.assignedExecutive} onChange={e => handleChange('assignedExecutive', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Project Value</label>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', color: '#64748B', fontWeight: '500' }}>₹</span>
                  <input type="number" placeholder="Enter project value" style={{ ...inputStyle, paddingLeft: '2rem' }} value={formData.projectValue || ''} onChange={e => handleChange('projectValue', e.target.value ? parseInt(e.target.value, 10) : '')} />
                </div>
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
                  <option value="New Lead">NEW</option>
                  <option value="Hot">HOT</option>
                  <option value="Warm">WARM</option>
                  <option value="Cold">COLD</option>
                  <option value="Appointment Fixed">APPOINTMENT FIXED</option>
                  <option value="Quotation Sent">QUOTATION SEND</option>
                  
                  <option value="Order Confirmed">ORDER CONFIRMED</option>
                  <option value="Project Filing">PROJECT FILING</option>
                  <option value="Junk">JUNK</option>
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
                     <div style={{ marginBottom: '1rem' }}>
                       <label style={labelStyle}>Fabric Material</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['PVC', 'PTFE', 'ETFE', 'HDPE Shade Net'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.fabricMaterial === t} onClick={() => handleChange('fabricMaterial', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                       <div>
                         <label style={labelStyle}>Fabric GSM <span style={{ color: 'red' }}>*</span></label>
                         <select style={inputStyle} value={formData.fabricGsm} onChange={e => handleChange('fabricGsm', e.target.value)}>
                           <option value="" disabled>Select GSM</option>
                           <option value="450 GSM">450 GSM</option>
                           <option value="550 GSM">550 GSM</option>
                           <option value="650 GSM">650 GSM</option>
                           <option value="700 GSM">700 GSM</option>
                           <option value="750 GSM">750 GSM</option>
                           <option value="850 GSM">850 GSM</option>
                           <option value="900 GSM">900 GSM</option>
                           <option value="950 GSM">950 GSM</option>
                           <option value="1050 GSM">1050 GSM</option>
                           <option value="1100 GSM">1100 GSM</option>
                           <option value="Custom">Custom</option>
                         </select>
                         {formData.fabricGsm === 'Custom' && (
                           <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginTop: '0.5rem' }}>
                             <input type="number" placeholder="Enter GSM" style={{ ...inputStyle, paddingRight: '3rem' }} value={formData.customFabricGsm} onChange={e => handleChange('customFabricGsm', e.target.value)} />
                             <span style={{ position: 'absolute', right: '1rem', color: '#64748B', fontWeight: '500', fontSize: '0.75rem' }}>GSM</span>
                           </div>
                         )}
                       </div>
                       <div>
                         <label style={labelStyle}>Fabric Thickness <span style={{ color: 'red' }}>*</span></label>
                         <select style={inputStyle} value={formData.fabricThickness} onChange={e => handleChange('fabricThickness', e.target.value)}>
                           <option value="" disabled>Select Thickness</option>
                           <option value="0.45 mm">0.45 mm</option>
                           <option value="0.55 mm">0.55 mm</option>
                           <option value="0.65 mm">0.65 mm</option>
                           <option value="0.75 mm">0.75 mm</option>
                           <option value="0.85 mm">0.85 mm</option>
                           <option value="0.95 mm">0.95 mm</option>
                           <option value="1.00 mm">1.00 mm</option>
                           <option value="1.10 mm">1.10 mm</option>
                           <option value="Custom">Custom</option>
                         </select>
                         {formData.fabricThickness === 'Custom' && (
                           <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginTop: '0.5rem' }}>
                             <input type="number" step="0.01" placeholder="Enter thickness" style={{ ...inputStyle, paddingRight: '3rem' }} value={formData.customFabricThickness} onChange={e => handleChange('customFabricThickness', e.target.value)} />
                             <span style={{ position: 'absolute', right: '1rem', color: '#64748B', fontWeight: '500', fontSize: '0.75rem' }}>mm</span>
                           </div>
                         )}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Project Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Car Parking', 'Walkway', 'Entrance Canopy', 'Swimming Pool', 'Sports Stadium', 'Auditorium', 'Resort', 'Shopping Mall', 'Commercial Building', 'Airport', 'Bus Terminal', 'School / College', 'Custom Project'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Fabric Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['PVC Fabric', 'PTFE Fabric', 'ETFE Membrane', 'HDPE Shade Net', 'PVDF Fabric'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.fabricType === t} onClick={() => handleChange('fabricType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Structure Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Cantilever', 'Cone', 'Hypar', 'Barrel Vault', 'Arch', 'Pyramid', 'Wave', 'Umbrella', 'Custom Design'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
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
                       <label style={labelStyle}>Area Size</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Below 500 sq.ft', '500-1000 sq.ft', '1000-3000 sq.ft', '3000-5000 sq.ft', 'Above 5000 sq.ft'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.areaSize === t} onClick={() => handleChange('areaSize', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Wind Load Requirement</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Normal', 'Coastal', 'High Wind', 'Cyclone Zone'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.windLoad === t} onClick={() => handleChange('windLoad', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Site Condition</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Flat Land', 'Sloped Land', 'Existing Building', 'RCC Terrace'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.siteCondition === t} onClick={() => handleChange('siteCondition', t)} />
                         ))}
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Foundation Status</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('foundationReady', 'Ready')} style={{ ...toggleBtnStyle, ...(formData.foundationReady === 'Ready' ? toggleBtnActiveStyle : {}) }}>Ready</button>
                         <button type="button" onClick={() => handleChange('foundationReady', 'Not Ready')} style={{ ...toggleBtnStyle, ...(formData.foundationReady === 'Not Ready' ? toggleBtnActiveStyle : {}) }}>Not Ready</button>
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'UPVC Roofing in Chennai' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Building Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Factory', 'Warehouse', 'Industrial Shed', 'Residential', 'Commercial', 'Farm House', 'Poultry Farm'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Purpose</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['New Roofing', 'Roof Replacement', 'Roof Extension'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.purpose === t} onClick={() => handleChange('purpose', t)} />
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
                       <label style={labelStyle}>Sheet Profile</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Corrugated', 'Trapezoidal', 'Tile Profile'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.sheetProfile === t} onClick={() => handleChange('sheetProfile', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Building Width</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Below 20 ft', '20-40 ft', '40-80 ft', 'Above 80 ft'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.buildingWidth === t} onClick={() => handleChange('buildingWidth', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Roof Slope</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Flat', 'Medium', 'High'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.roofSlope === t} onClick={() => handleChange('roofSlope', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Location Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Coastal', 'Industrial', 'Residential', 'High Temperature Area'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.locationType === t} onClick={() => handleChange('locationType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Existing Roof</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['RCC', 'GI Sheet', 'Asbestos', 'No Existing Roof'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.existingRoof === t} onClick={() => handleChange('existingRoof', t)} />
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

                 {formData.customProjectType === 'Polycarbonate Roofing' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Application</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Skylight', 'Walkway', 'Balcony', 'Car Parking', 'Greenhouse', 'Terrace', 'Commercial Entrance'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Sheet Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Solid', 'Multiwall', 'Corrugated', 'Twin Wall', 'Honeycomb'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.sheetType === t} onClick={() => handleChange('sheetType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Sheet Color</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Clear', 'Blue', 'Bronze', 'Green', 'Opal', 'Grey'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.sheetColor === t} onClick={() => handleChange('sheetColor', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Frame Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Aluminium', 'Mild Steel', 'Stainless Steel', 'Existing Frame'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.frameMaterial === t} onClick={() => handleChange('frameMaterial', t)} />
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
                     <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                       <div>
                         <label style={labelStyle}>UV Protection?</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('uvProtection', 'Required')} style={{ ...toggleBtnStyle, ...(formData.uvProtection === 'Required' ? toggleBtnActiveStyle : {}) }}>Required</button>
                           <button type="button" onClick={() => handleChange('uvProtection', 'Not Required')} style={{ ...toggleBtnStyle, ...(formData.uvProtection === 'Not Required' ? toggleBtnActiveStyle : {}) }}>Not Required</button>
                         </div>
                       </div>
                       <div>
                         <label style={labelStyle}>Waterproofing?</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('waterproofingRequired', 'Required')} style={{ ...toggleBtnStyle, ...(formData.waterproofingRequired === 'Required' ? toggleBtnActiveStyle : {}) }}>Required</button>
                           <button type="button" onClick={() => handleChange('waterproofingRequired', 'Not Required')} style={{ ...toggleBtnStyle, ...(formData.waterproofingRequired === 'Not Required' ? toggleBtnActiveStyle : {}) }}>Not Required</button>
                         </div>
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'Glass Roofing' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Application</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Skylight', 'Atrium', 'Villa', 'Office', 'Terrace', 'Shopping Mall', 'Hotel'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Glass Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Toughened', 'Laminated', 'Double Glazed', 'Tempered', 'Low-E Glass'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.glassType === t} onClick={() => handleChange('glassType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Glass Thickness</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['8 mm', '10 mm', '12 mm', 'Custom'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.glassThickness === t} onClick={() => handleChange('glassThickness', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Frame Material</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Aluminium', 'Stainless Steel', 'Mild Steel'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.frameMaterial === t} onClick={() => handleChange('frameMaterial', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Design Style</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Flat', 'Pyramid', 'Dome', 'Sloped', 'Custom'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Water Drainage</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Internal', 'External'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.waterDrainage === t} onClick={() => handleChange('waterDrainage', t)} />
                         ))}
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Safety Film Required?</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('safetyFilm', 'Required')} style={{ ...toggleBtnStyle, ...(formData.safetyFilm === 'Required' ? toggleBtnActiveStyle : {}) }}>Required</button>
                         <button type="button" onClick={() => handleChange('safetyFilm', 'Not Required')} style={{ ...toggleBtnStyle, ...(formData.safetyFilm === 'Not Required' ? toggleBtnActiveStyle : {}) }}>Not Required</button>
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
                       <label style={labelStyle}>Tile Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Clay Tile', 'Ceramic Tile', 'Traditional Tile', 'Premium Tile'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.tileType === t} onClick={() => handleChange('tileType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Roof Frame</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Wooden', 'Steel', 'RCC'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.frameMaterial === t} onClick={() => handleChange('frameMaterial', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>New or Replacement</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['New', 'Replacement'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.installationType === t} onClick={() => handleChange('installationType', t)} />
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
                     <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                       <div>
                         <label style={labelStyle}>Insulation Required?</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('insulationRequired', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.insulationRequired === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('insulationRequired', 'No')} style={{ ...toggleBtnStyle, ...(formData.insulationRequired === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <div>
                         <label style={labelStyle}>Ceiling Required?</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('ceilingRequired', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.ceilingRequired === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('ceilingRequired', 'No')} style={{ ...toggleBtnStyle, ...(formData.ceilingRequired === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'Shingles Roofing' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Application</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['House', 'Villa', 'Cottage', 'Resort', 'Gazebo'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Shingle Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Asphalt', 'Fiberglass', 'Designer', 'Architectural'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.shingleType === t} onClick={() => handleChange('shingleType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Color</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Black', 'Brown', 'Grey', 'Red', 'Green'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.sheetColor === t} onClick={() => handleChange('sheetColor', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Roof Shape</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Gable', 'Hip', 'Pyramid', 'Flat'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                       <div>
                         <label style={labelStyle}>Underlayment Required?</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('underlaymentRequired', 'Required')} style={{ ...toggleBtnStyle, ...(formData.underlaymentRequired === 'Required' ? toggleBtnActiveStyle : {}) }}>Required</button>
                           <button type="button" onClick={() => handleChange('underlaymentRequired', 'Not Required')} style={{ ...toggleBtnStyle, ...(formData.underlaymentRequired === 'Not Required' ? toggleBtnActiveStyle : {}) }}>Not Required</button>
                         </div>
                       </div>
                       <div>
                         <label style={labelStyle}>Ventilation Required?</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('ventilationRequired', 'Required')} style={{ ...toggleBtnStyle, ...(formData.ventilationRequired === 'Required' ? toggleBtnActiveStyle : {}) }}>Required</button>
                           <button type="button" onClick={() => handleChange('ventilationRequired', 'Not Required')} style={{ ...toggleBtnStyle, ...(formData.ventilationRequired === 'Not Required' ? toggleBtnActiveStyle : {}) }}>Not Required</button>
                         </div>
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'GI Roofing in Chennai' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Building Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Factory', 'Warehouse', 'Workshop', 'Commercial', 'Agricultural'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Sheet Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Corrugated', 'Trapezoidal', 'Plain GI', 'Color Coated'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.sheetType === t} onClick={() => handleChange('sheetType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Sheet Thickness</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['0.35 mm', '0.45 mm', '0.50 mm', '0.60 mm'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.sheetThickness === t} onClick={() => handleChange('sheetThickness', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Insulation</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['PUF Panel', 'Glass Wool', 'Rock Wool', 'None'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.insulationRequired === t} onClick={() => handleChange('insulationRequired', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Structure</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['New', 'Existing', 'Extension'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.structureType === t} onClick={() => handleChange('structureType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                       <div>
                         <label style={labelStyle}>Gutter Required?</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('gutterRequired', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.gutterRequired === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('gutterRequired', 'No')} style={{ ...toggleBtnStyle, ...(formData.gutterRequired === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <div>
                         <label style={labelStyle}>Turbo Ventilator?</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('turboVentilator', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.turboVentilator === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('turboVentilator', 'No')} style={{ ...toggleBtnStyle, ...(formData.turboVentilator === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                     </div>
                   </>
                 )}

                 {formData.customProjectType === 'Retractable Roofing' && (
                   <>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Application</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Restaurant', 'Café', 'Terrace', 'Balcony', 'Swimming Pool', 'Resort'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.projectTypeDetail === t} onClick={() => handleChange('projectTypeDetail', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Operating Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Manual', 'Motorized', 'Remote Control', 'Smart Automation'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.operatingType === t} onClick={() => handleChange('operatingType', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Roof Material</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['PVC Fabric', 'Polycarbonate', 'Glass'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.roofMaterial === t} onClick={() => handleChange('roofMaterial', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Frame Material</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Aluminium', 'Mild Steel', 'Stainless Steel'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.frameMaterial === t} onClick={() => handleChange('frameMaterial', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Weather Sensor</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Rain Sensor', 'Wind Sensor', 'Both', 'None'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.weatherSensor === t} onClick={() => handleChange('weatherSensor', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Lighting Required</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['LED Lighting', 'Decorative Lighting', 'None'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.lighting === t} onClick={() => handleChange('lighting', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Side Cover</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Glass', 'Fabric', 'Aluminium', 'None'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.sideCover === t} onClick={() => handleChange('sideCover', t)} />
                         ))}
                       </div>
                     </div>
                     <div style={{ marginBottom: '1.5rem' }}>
                       <label style={labelStyle}>Warranty Expectation</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['5 Years', '10 Years', '15 Years'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.warranty === t} onClick={() => handleChange('warranty', t)} />
                         ))}
                       </div>
                     </div>
                   </>
                 )}
               </>
             )}

             {/* Common questions for all roofing types */}
             <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px dashed #E2E8F0' }}>
               <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1E293B' }}>Final Project Details</h4>
               
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                 <div>
                   <label style={labelStyle}>Approximate Area</label>
                   <div style={{ position: 'relative' }}>
                     <input type="number" placeholder="Enter Sq.ft" style={{ ...inputStyle, paddingRight: '4rem' }} value={formData.approxArea || ''} onChange={e => handleChange('approxArea', e.target.value)} />
                     <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontWeight: '600', fontSize: '0.8rem' }}>sq.ft</span>
                   </div>
                 </div>
                 
                 <div>
                   <label style={labelStyle}>Site Visit Required?</label>
                   <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                     <button type="button" onClick={() => handleChange('siteVisitRequired', 'Yes')} style={{ ...toggleBtnStyle, ...(formData.siteVisitRequired === 'Yes' ? toggleBtnActiveStyle : {}) }}>Yes</button>
                     <button type="button" onClick={() => handleChange('siteVisitRequired', 'No')} style={{ ...toggleBtnStyle, ...(formData.siteVisitRequired === 'No' ? toggleBtnActiveStyle : {}) }}>No</button>
                   </div>
                 </div>
               </div>



               <div style={{ marginBottom: '1.5rem' }}>
                 <label style={labelStyle}>Expected Start Date</label>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                   {['Immediately', 'Within 1 Month', 'Within 3 Months', 'Just Planning'].map(t => (
                     <SelectPill key={t} label={t} selected={formData.expectedStartDate === t} onClick={() => handleChange('expectedStartDate', t)} />
                   ))}
                 </div>
               </div>
             </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content animate-fade-in">
             <div style={{ marginBottom: '2rem' }}>
               <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1E293B' }}>Site Dimensions</h3>
               <p style={{ color: '#64748B', fontSize: '0.875rem' }}>Provide project measurements to generate accurate material estimation and quotations.</p>
             </div>

             {/* Dynamic Content based on Project Type */}
             {formData.projectType === 'PEB Building' && (
               <>
                 <div style={{ marginBottom: '2.5rem' }}>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall Site</h4>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                     <UnitInput label="Plot Length" placeholder="Enter length" unit="ft" value={formData.plotLength || ''} onChange={v => {
                       handleChange('plotLength', v);
                       if (v && formData.plotWidth) handleChange('plotArea', (parseFloat(v) * parseFloat(formData.plotWidth)).toString());
                     }} />
                     <UnitInput label="Plot Width" placeholder="Enter width" unit="ft" value={formData.plotWidth || ''} onChange={v => {
                       handleChange('plotWidth', v);
                       if (v && formData.plotLength) handleChange('plotArea', (parseFloat(v) * parseFloat(formData.plotLength)).toString());
                     }} />
                     <div>
                       <label style={labelStyle}>Total Area</label>
                       <div style={{ position: 'relative' }}>
                         <input type="text" disabled value={formData.plotArea ? `${parseFloat(formData.plotArea).toLocaleString()} sq.ft` : ''} placeholder="Auto calculated" style={{ ...inputStyle, backgroundColor: '#F8FAFC', color: '#64748B' }} />
                       </div>
                     </div>
                     <div style={{ display: 'none' }}></div>
                     <UnitInput label="Building Length" placeholder="Enter length" unit="ft" value={formData.buildingLength || ''} onChange={v => handleChange('buildingLength', v)} />
                     <UnitInput label="Building Width" placeholder="Enter width" unit="ft" value={formData.buildingWidth || ''} onChange={v => handleChange('buildingWidth', v)} />
                     <UnitInput label="Eave Height" placeholder="Enter eave height" unit="ft" value={formData.eaveHeight || ''} onChange={v => handleChange('eaveHeight', v)} />
                     <UnitInput label="Ridge Height" placeholder="Enter ridge height" unit="ft" value={formData.ridgeHeight || ''} onChange={v => handleChange('ridgeHeight', v)} />
                   </div>
                   <div style={{ marginTop: '1.5rem' }}>
                     <label style={labelStyle}>Roof Slope</label>
                     <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                       {['Flat', '5°', '10°', '15°', '20°', 'Custom'].map(t => (
                         <SelectPill key={t} label={t} selected={formData.roofSlope === t} onClick={() => handleChange('roofSlope', t)} />
                       ))}
                     </div>
                   </div>
                 </div>
                 
                 <div style={{ marginBottom: '2.5rem' }}>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Structural Layout</h4>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                     <div>
                       <label style={labelStyle}>Number of Bays</label>
                       <StepperInput value={formData.numberOfBays || 0} onChange={v => handleChange('numberOfBays', v)} />
                     </div>
                     <UnitInput label="Bay Spacing" placeholder="Enter spacing" unit="ft" value={formData.baySpacing || ''} onChange={v => handleChange('baySpacing', v)} />
                     <div>
                       <label style={labelStyle}>Number of Columns</label>
                       <StepperInput value={formData.numberOfColumns || 0} onChange={v => handleChange('numberOfColumns', v)} />
                     </div>
                     <UnitInput label="Column Height" placeholder="Enter height" unit="ft" value={formData.columnHeight || ''} onChange={v => handleChange('columnHeight', v)} />
                     <div>
                       <label style={labelStyle}>Crane Provision</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('craneProvision', true)} style={{ ...toggleBtnStyle, ...(formData.craneProvision ? toggleBtnActiveStyle : {}) }}>Yes</button>
                         <button type="button" onClick={() => handleChange('craneProvision', false)} style={{ ...toggleBtnStyle, ...(!formData.craneProvision ? toggleBtnActiveStyle : {}) }}>No</button>
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Mezzanine Floor</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('mezzanineFloor', true)} style={{ ...toggleBtnStyle, ...(formData.mezzanineFloor ? toggleBtnActiveStyle : {}) }}>Yes</button>
                         <button type="button" onClick={() => handleChange('mezzanineFloor', false)} style={{ ...toggleBtnStyle, ...(!formData.mezzanineFloor ? toggleBtnActiveStyle : {}) }}>No</button>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div style={{ marginBottom: '2.5rem' }}>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Site Condition</h4>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                     <div>
                       <label style={labelStyle}>Soil Type</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Normal', 'Soft', 'Hard Rock'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.soilType === t} onClick={() => handleChange('soilType', t)} />
                         ))}
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Ground Level</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Even', 'Uneven', 'Slope'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.groundLevel === t} onClick={() => handleChange('groundLevel', t)} />
                         ))}
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Foundation Ready?</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('foundationReady', true)} style={{ ...toggleBtnStyle, ...(formData.foundationReady ? toggleBtnActiveStyle : {}) }}>Yes</button>
                         <button type="button" onClick={() => handleChange('foundationReady', false)} style={{ ...toggleBtnStyle, ...(!formData.foundationReady ? toggleBtnActiveStyle : {}) }}>No</button>
                       </div>
                     </div>
                   </div>
                 </div>
               </>
             )}

             {formData.projectType === 'Tensile' && (
               <>
                 <div style={{ marginBottom: '2.5rem' }}>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Coverage Area</h4>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                     <UnitInput label="Length" placeholder="Enter length" unit="ft" value={formData.length || ''} onChange={v => {
                       handleChange('length', v);
                       if (v && formData.width) handleChange('totalArea', (parseFloat(v) * parseFloat(formData.width)).toString());
                     }} />
                     <UnitInput label="Width" placeholder="Enter width" unit="ft" value={formData.width || ''} onChange={v => {
                       handleChange('width', v);
                       if (v && formData.length) handleChange('totalArea', (parseFloat(v) * parseFloat(formData.length)).toString());
                     }} />
                     <div>
                       <label style={labelStyle}>Covered Area</label>
                       <div style={{ position: 'relative' }}>
                         <input type="text" disabled value={formData.totalArea ? `${parseFloat(formData.totalArea).toLocaleString()} sq.ft` : ''} placeholder="Auto calculated" style={{ ...inputStyle, backgroundColor: '#F8FAFC', color: '#64748B' }} />
                       </div>
                     </div>
                     <div style={{ display: 'none' }}></div>
                     <UnitInput label="Maximum Height" placeholder="Enter max height" unit="ft" value={formData.maximumHeight || ''} onChange={v => handleChange('maximumHeight', v)} />
                     <UnitInput label="Edge Height" placeholder="Enter edge height" unit="ft" value={formData.edgeHeight || ''} onChange={v => handleChange('edgeHeight', v)} />
                   </div>
                 </div>
                 
                 <div style={{ marginBottom: '2.5rem' }}>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Structure Shape</h4>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Cone', 'Hypar', 'Arch', 'Dome', 'Pyramid', 'Custom'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.structureShape === t} onClick={() => handleChange('structureShape', t)} />
                     ))}
                   </div>
                 </div>

                 <div style={{ marginBottom: '2.5rem' }}>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Installation Area</h4>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Ground', 'Rooftop', 'Existing Building', 'Steel Structure'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.installationArea === t} onClick={() => handleChange('installationArea', t)} />
                     ))}
                   </div>
                 </div>

                 <div style={{ marginBottom: '2.5rem' }}>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Site Details</h4>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                     <div>
                       <label style={labelStyle}>Wind Exposure</label>
                       <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                         {['Low', 'Medium', 'High'].map(t => (
                           <SelectPill key={t} label={t} selected={formData.windExposure === t} onClick={() => handleChange('windExposure', t)} />
                         ))}
                       </div>
                     </div>
                     <div>
                       <label style={labelStyle}>Rainwater Drainage</label>
                       <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                         <button type="button" onClick={() => handleChange('rainwaterDrainage', true)} style={{ ...toggleBtnStyle, ...(formData.rainwaterDrainage ? toggleBtnActiveStyle : {}) }}>Yes</button>
                         <button type="button" onClick={() => handleChange('rainwaterDrainage', false)} style={{ ...toggleBtnStyle, ...(!formData.rainwaterDrainage ? toggleBtnActiveStyle : {}) }}>No</button>
                       </div>
                     </div>
                     <UnitInput label="Obstructions" placeholder="Describe obstructions" unit="" value={formData.obstructions || ''} onChange={v => handleChange('obstructions', v)} />
                   </div>
                 </div>
               </>
             )}

             {formData.projectType === 'Other roofing' && (
               <>
                 {formData.customProjectType === 'UPVC Roofing in Chennai' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>UPVC Roofing</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Roof Length" placeholder="Enter length" unit="ft" value={formData.roofLength || ''} onChange={v => handleChange('roofLength', v)} />
                       <UnitInput label="Roof Width" placeholder="Enter width" unit="ft" value={formData.roofWidth || ''} onChange={v => handleChange('roofWidth', v)} />
                       <UnitInput label="Roof Area" placeholder="Enter area" unit="sq.ft" value={formData.roofArea || ''} onChange={v => handleChange('roofArea', v)} />
                       <UnitInput label="Roof Pitch" placeholder="Enter pitch" unit="°" value={formData.roofPitch || ''} onChange={v => handleChange('roofPitch', v)} />
                       <UnitInput label="Existing Roof Height" placeholder="Enter height" unit="ft" value={formData.existingRoofHeight || ''} onChange={v => handleChange('existingRoofHeight', v)} />
                       <UnitInput label="Purlin Spacing" placeholder="Enter spacing" unit="ft" value={formData.purlinSpacing || ''} onChange={v => handleChange('purlinSpacing', v)} />
                       <UnitInput label="Building Height" placeholder="Enter building height" unit="ft" value={formData.buildingHeight || ''} onChange={v => handleChange('buildingHeight', v)} />
                       <UnitInput label="Ridge Height" placeholder="Enter ridge height" unit="ft" value={formData.ridgeHeight || ''} onChange={v => handleChange('ridgeHeight', v)} />
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'Polycarbonate Roofing' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Polycarbonate Roofing</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Panel Length" placeholder="Enter length" unit="ft" value={formData.panelLength || ''} onChange={v => handleChange('panelLength', v)} />
                       <UnitInput label="Panel Width" placeholder="Enter width" unit="ft" value={formData.panelWidth || ''} onChange={v => handleChange('panelWidth', v)} />
                       <UnitInput label="Covered Area" placeholder="Enter area" unit="sq.ft" value={formData.totalArea || ''} onChange={v => handleChange('totalArea', v)} />
                       <UnitInput label="Roof Height" placeholder="Enter height" unit="ft" value={formData.roofHeight || ''} onChange={v => handleChange('roofHeight', v)} />
                       <UnitInput label="Sheet Thickness" placeholder="Enter thickness" unit="mm" value={formData.sheetThickness || ''} onChange={v => handleChange('sheetThickness', v)} />
                       <div>
                         <label style={labelStyle}>Curved / Flat Roof</label>
                         <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                           {['Flat', 'Curved'].map(t => (
                             <SelectPill key={t} label={t} selected={formData.curvedFlatRoof === t} onClick={() => handleChange('curvedFlatRoof', t)} />
                           ))}
                         </div>
                       </div>
                       <UnitInput label="Frame Spacing" placeholder="Enter spacing" unit="ft" value={formData.frameSpacing || ''} onChange={v => handleChange('frameSpacing', v)} />
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'Glass Roofing' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Glass Roofing</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Glass Area" placeholder="Enter area" unit="sq.ft" value={formData.glassArea || ''} onChange={v => handleChange('glassArea', v)} />
                       <UnitInput label="Length" placeholder="Enter length" unit="ft" value={formData.length || ''} onChange={v => handleChange('length', v)} />
                       <UnitInput label="Width" placeholder="Enter width" unit="ft" value={formData.width || ''} onChange={v => handleChange('width', v)} />
                       <UnitInput label="Roof Height" placeholder="Enter height" unit="ft" value={formData.roofHeight || ''} onChange={v => handleChange('roofHeight', v)} />
                       <UnitInput label="Glass Thickness" placeholder="Enter thickness" unit="mm" value={formData.glassThickness || ''} onChange={v => handleChange('glassThickness', v)} />
                       <UnitInput label="Panel Size" placeholder="Enter size" unit="ft" value={formData.panelSize || ''} onChange={v => handleChange('panelSize', v)} />
                       <UnitInput label="Structural Support Type" placeholder="e.g. Steel, Aluminum" unit="" value={formData.structuralSupportType || ''} onChange={v => handleChange('structuralSupportType', v)} />
                       <UnitInput label="Drainage Slope" placeholder="Enter slope" unit="°" value={formData.drainageSlope || ''} onChange={v => handleChange('drainageSlope', v)} />
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'Mangalore Tile Roofing' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mangalore Tile Roofing</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Roof Length" placeholder="Enter length" unit="ft" value={formData.roofLength || ''} onChange={v => handleChange('roofLength', v)} />
                       <UnitInput label="Roof Width" placeholder="Enter width" unit="ft" value={formData.roofWidth || ''} onChange={v => handleChange('roofWidth', v)} />
                       <UnitInput label="Roof Pitch" placeholder="Enter pitch" unit="°" value={formData.roofPitch || ''} onChange={v => handleChange('roofPitch', v)} />
                       <UnitInput label="Total Roof Area" placeholder="Enter area" unit="sq.ft" value={formData.roofArea || ''} onChange={v => handleChange('roofArea', v)} />
                       <UnitInput label="Ridge Length" placeholder="Enter length" unit="ft" value={formData.ridgeLength || ''} onChange={v => handleChange('ridgeLength', v)} />
                       <UnitInput label="Valley Length" placeholder="Enter length" unit="ft" value={formData.valleyLength || ''} onChange={v => handleChange('valleyLength', v)} />
                       <div>
                         <label style={labelStyle}>Existing Timber Structure?</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('existingTimberStructure', true)} style={{ ...toggleBtnStyle, ...(formData.existingTimberStructure ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('existingTimberStructure', false)} style={{ ...toggleBtnStyle, ...(!formData.existingTimberStructure ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <UnitInput label="Ridge Height" placeholder="Enter height" unit="ft" value={formData.ridgeHeight || ''} onChange={v => handleChange('ridgeHeight', v)} />
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'Shingles Roofing' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shingles Roofing</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Roof Area" placeholder="Enter area" unit="sq.ft" value={formData.roofArea || ''} onChange={v => handleChange('roofArea', v)} />
                       <UnitInput label="Roof Pitch" placeholder="Enter pitch" unit="°" value={formData.roofPitch || ''} onChange={v => handleChange('roofPitch', v)} />
                       <UnitInput label="Number of Slopes" placeholder="Enter number" unit="" value={formData.numberOfSlopes || ''} onChange={v => handleChange('numberOfSlopes', v)} />
                       <UnitInput label="Ridge Length" placeholder="Enter length" unit="ft" value={formData.ridgeLength || ''} onChange={v => handleChange('ridgeLength', v)} />
                       <UnitInput label="Valley Length" placeholder="Enter length" unit="ft" value={formData.valleyLength || ''} onChange={v => handleChange('valleyLength', v)} />
                       <UnitInput label="Roof Height" placeholder="Enter height" unit="ft" value={formData.roofHeight || ''} onChange={v => handleChange('roofHeight', v)} />
                       <UnitInput label="Existing Roof Condition" placeholder="Describe condition" unit="" value={formData.existingRoofCondition || ''} onChange={v => handleChange('existingRoofCondition', v)} />
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'GI Roofing in Chennai' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GI Roofing</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Length" placeholder="Enter length" unit="ft" value={formData.length || ''} onChange={v => handleChange('length', v)} />
                       <UnitInput label="Width" placeholder="Enter width" unit="ft" value={formData.width || ''} onChange={v => handleChange('width', v)} />
                       <UnitInput label="Covered Area" placeholder="Enter area" unit="sq.ft" value={formData.totalArea || ''} onChange={v => handleChange('totalArea', v)} />
                       <UnitInput label="Roof Pitch" placeholder="Enter pitch" unit="°" value={formData.roofPitch || ''} onChange={v => handleChange('roofPitch', v)} />
                       <UnitInput label="Purlin Spacing" placeholder="Enter spacing" unit="ft" value={formData.purlinSpacing || ''} onChange={v => handleChange('purlinSpacing', v)} />
                       <UnitInput label="Building Height" placeholder="Enter height" unit="ft" value={formData.buildingHeight || ''} onChange={v => handleChange('buildingHeight', v)} />
                       <UnitInput label="Ridge Height" placeholder="Enter height" unit="ft" value={formData.ridgeHeight || ''} onChange={v => handleChange('ridgeHeight', v)} />
                       <UnitInput label="Existing Structure" placeholder="Describe structure" unit="" value={formData.existingStructure || ''} onChange={v => handleChange('existingStructure', v)} />
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'Retractable Roofing' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Retractable Roofing</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Opening Length" placeholder="Enter length" unit="ft" value={formData.openingLength || ''} onChange={v => handleChange('openingLength', v)} />
                       <UnitInput label="Opening Width" placeholder="Enter width" unit="ft" value={formData.openingWidth || ''} onChange={v => handleChange('openingWidth', v)} />
                       <UnitInput label="Maximum Opening Area" placeholder="Enter area" unit="sq.ft" value={formData.maxOpeningArea || ''} onChange={v => handleChange('maxOpeningArea', v)} />
                       <UnitInput label="Installation Height" placeholder="Enter height" unit="ft" value={formData.installationHeight || ''} onChange={v => handleChange('installationHeight', v)} />
                       <div>
                         <label style={labelStyle}>Motor Location</label>
                         <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                           {['Left', 'Right', 'Center'].map(t => (
                             <SelectPill key={t} label={t} selected={formData.motorLocation === t} onClick={() => handleChange('motorLocation', t)} />
                           ))}
                         </div>
                       </div>
                       <UnitInput label="Track Length" placeholder="Enter length" unit="ft" value={formData.trackLength || ''} onChange={v => handleChange('trackLength', v)} />
                       <UnitInput label="Side Clearance" placeholder="Enter clearance" unit="ft" value={formData.sideClearance || ''} onChange={v => handleChange('sideClearance', v)} />
                       <div>
                         <label style={labelStyle}>Control Type</label>
                         <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                           {['Remote', 'Switch', 'Smart Home'].map(t => (
                             <SelectPill key={t} label={t} selected={formData.controlType === t} onClick={() => handleChange('controlType', t)} />
                           ))}
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
               </>
             )}

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             {/* Common Section */}
             <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Common Section — Site Accessibility</h4>
               
               <div style={{ marginBottom: '1.5rem' }}>
                 <label style={labelStyle}>Road Width</label>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                   {['Under 10 ft', '10-20 ft', '20-30 ft', 'Above 30 ft'].map(t => (
                     <SelectPill key={t} label={t} selected={formData.roadAccessWidth === t} onClick={() => handleChange('roadAccessWidth', t)} />
                   ))}
                 </div>
               </div>

               <div style={{ display: 'flex', gap: '3rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                 <div>
                   <label style={labelStyle}>Crane Access</label>
                   <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                     <button type="button" onClick={() => handleChange('craneAccess', true)} style={{ ...toggleBtnStyle, ...(formData.craneAccess ? toggleBtnActiveStyle : {}) }}>Yes</button>
                     <button type="button" onClick={() => handleChange('craneAccess', false)} style={{ ...toggleBtnStyle, ...(!formData.craneAccess ? toggleBtnActiveStyle : {}) }}>No</button>
                   </div>
                 </div>
                 <div>
                   <label style={labelStyle}>Heavy Vehicle Access</label>
                   <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                     <button type="button" onClick={() => handleChange('heavyVehicleAccess', true)} style={{ ...toggleBtnStyle, ...(formData.heavyVehicleAccess ? toggleBtnActiveStyle : {}) }}>Yes</button>
                     <button type="button" onClick={() => handleChange('heavyVehicleAccess', false)} style={{ ...toggleBtnStyle, ...(!formData.heavyVehicleAccess ? toggleBtnActiveStyle : {}) }}>No</button>
                   </div>
                 </div>
               </div>

               <div style={{ marginBottom: '1.5rem' }}>
                 <label style={labelStyle}>Existing Obstructions</label>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                   {['None', 'Building', 'Trees', 'Electric Pole', 'Compound Wall', 'Underground Utilities'].map(t => {
                     const selected = (formData.existingStructures || []).includes(t);
                     return (
                       <MultiSelectPill key={t} label={t} selected={selected} onClick={() => {
                         let curr = formData.existingStructures || [];
                         if (curr.includes(t)) {
                           handleChange('existingStructures', curr.filter(x => x !== t));
                         } else {
                           handleChange('existingStructures', [...curr, t]);
                         }
                       }} />
                     );
                   })}
                 </div>
               </div>

               <div style={{ marginBottom: '1.5rem' }}>
                 <label style={labelStyle}>Working Space</label>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                   {['Limited', 'Moderate', 'Open Area'].map(t => (
                     <SelectPill key={t} label={t} selected={formData.workingSpace === t} onClick={() => handleChange('workingSpace', t)} />
                   ))}
                 </div>
               </div>
             </div>

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Orientation</h4>
               
               <div style={{ marginBottom: '1.5rem' }}>
                 <label style={labelStyle}>Direction</label>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                   {['North', 'South', 'East', 'West'].map(t => (
                     <SelectPill key={t} label={t} selected={formData.roofDirection === t} onClick={() => handleChange('roofDirection', t)} />
                   ))}
                 </div>
               </div>

               <div style={{ marginBottom: '1.5rem' }}>
                 <label style={labelStyle}>Sun Exposure</label>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                   {['Low', 'Medium', 'High'].map(t => (
                     <SelectPill key={t} label={t} selected={formData.sunExposure === t} onClick={() => handleChange('sunExposure', t)} />
                   ))}
                 </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                 <div>
                   <label style={labelStyle}>Wind Direction</label>
                   <select style={inputStyle} value={formData.windDirection || ''} onChange={e => handleChange('windDirection', e.target.value)}>
                     <option value="" disabled>Select direction</option>
                     <option value="North">North</option>
                     <option value="South">South</option>
                     <option value="East">East</option>
                     <option value="West">West</option>
                     <option value="North-East">North-East</option>
                     <option value="North-West">North-West</option>
                     <option value="South-East">South-East</option>
                     <option value="South-West">South-West</option>
                   </select>
                 </div>
               </div>
             </div>

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reference Drawings</h4>
               
               <div style={{ border: '2px dashed #CBD5E1', borderRadius: '12px', padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#F8FAFC', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '1.5rem' }} onMouseOver={e => e.currentTarget.style.borderColor = '#4F46E5'} onMouseOut={e => e.currentTarget.style.borderColor = '#CBD5E1'}>
                 <div style={{ backgroundColor: '#EEF2FF', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                 </div>
                 <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1E293B', marginBottom: '0.5rem' }}>Drag & Drop Drawings</p>
                 <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: '1rem' }}>or <span style={{ color: '#4F46E5', fontWeight: '600' }}>Browse Files</span></p>
                 <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Upload PDF, DWG, Image • Maximum 25 MB</p>
               </div>

               {/* Mock Uploaded Files */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <div style={{ backgroundColor: '#FEE2E2', padding: '0.5rem', borderRadius: '6px' }}>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                     </div>
                     <div>
                       <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1E293B' }}>SitePlan.pdf</p>
                       <p style={{ fontSize: '0.75rem', color: '#64748B' }}>2.4 MB</p>
                     </div>
                   </div>
                   <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '0.5rem', color: '#94A3B8' }} onMouseOver={e => e.currentTarget.style.color = '#EF4444'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                   </button>
                 </div>
               </div>
             </div>

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             <div style={{ marginBottom: '2rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Additional Notes</h4>
               <textarea 
                 placeholder="Add measurement notes, special instructions, obstacles, site observations..."
                 style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                 value={formData.additionalNotes || ''}
                 onChange={e => handleChange('additionalNotes', e.target.value)}
                 maxLength={500}
               />
               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                 <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '500' }}>
                   {(formData.additionalNotes || '').length} / 500
                 </span>
               </div>
             </div>
             
          </div>
        );
      case 4:
        return (
          <div className="step-content animate-fade-in">
             <div style={{ marginBottom: '2rem' }}>
               <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1E293B' }}>Technical Details</h3>
               <p style={{ color: '#64748B', fontSize: '0.875rem' }}>Specify engineering, material, structural, and installation requirements to prepare an accurate proposal.</p>
             </div>

             {/* SECTION 1 — Structural Specifications */}
             <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SECTION 1 — Structural Specifications</h4>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div>
                   <label style={labelStyle}>Structure Grade</label>
                   <select style={inputStyle} value={formData.structureGrade || ''} onChange={e => handleChange('structureGrade', e.target.value)}>
                     <option value="Standard">Standard</option>
                     <option value="Premium">Premium</option>
                     <option value="Heavy Duty">Heavy Duty</option>
                     <option value="Industrial">Industrial</option>
                   </select>
                 </div>
                 <div>
                   <label style={labelStyle}>Design Standard</label>
                   <select style={inputStyle} value={formData.designStandard || ''} onChange={e => handleChange('designStandard', e.target.value)}>
                     <option value="IS Standard">IS Standard</option>
                     <option value="ASTM">ASTM</option>
                     <option value="Euro Code">Euro Code</option>
                     <option value="Client Specification">Client Specification</option>
                   </select>
                 </div>
                 <UnitInput label="Design Load" placeholder="Enter design load" unit="kg/m²" value={formData.designLoad || ''} onChange={v => handleChange('designLoad', v)} />
                 <div>
                   <label style={labelStyle}>Wind Load</label>
                   <select style={inputStyle} value={formData.windLoadTech || ''} onChange={e => handleChange('windLoadTech', e.target.value)}>
                     <option value="Low">Low</option>
                     <option value="Medium">Medium</option>
                     <option value="High">High</option>
                     <option value="Cyclone Zone">Cyclone Zone</option>
                   </select>
                 </div>
                 <div>
                   <label style={labelStyle}>Seismic Zone</label>
                   <select style={inputStyle} value={formData.seismicZone || ''} onChange={e => handleChange('seismicZone', e.target.value)}>
                     <option value="Zone II">Zone II</option>
                     <option value="Zone III">Zone III</option>
                     <option value="Zone IV">Zone IV</option>
                     <option value="Zone V">Zone V</option>
                   </select>
                 </div>
                 <UnitInput label="Live Load" placeholder="Enter live load" unit="kg/m²" value={formData.liveLoad || ''} onChange={v => handleChange('liveLoad', v)} />
               </div>
             </div>

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             {/* SECTION 2 — Material Specifications */}
             <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SECTION 2 — Material Specifications</h4>
               
               <div style={{ marginBottom: '1.5rem' }}>
                 <label style={labelStyle}>Primary Material</label>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                   {['Mild Steel', 'Galvanized Steel', 'Stainless Steel', 'Aluminium'].map(t => {
                     const selected = (formData.primaryMaterial || []).includes(t);
                     return (
                       <MultiSelectPill key={t} label={t} selected={selected} onClick={() => {
                         let curr = formData.primaryMaterial || [];
                         if (curr.includes(t)) handleChange('primaryMaterial', curr.filter(x => x !== t));
                         else handleChange('primaryMaterial', [...curr, t]);
                       }} />
                     );
                   })}
                 </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                 <div>
                   <label style={labelStyle}>Roof Material</label>
                   <select style={inputStyle} value={formData.roofMaterialTech || ''} onChange={e => handleChange('roofMaterialTech', e.target.value)}>
                     <option value="UPVC">UPVC</option>
                     <option value="Polycarbonate">Polycarbonate</option>
                     <option value="GI Sheet">GI Sheet</option>
                     <option value="Glass">Glass</option>
                     <option value="PVC Fabric">PVC Fabric</option>
                     <option value="PTFE">PTFE</option>
                     <option value="ETFE">ETFE</option>
                     <option value="Shingles">Shingles</option>
                   </select>
                 </div>
                 <div>
                   <label style={labelStyle}>Material Thickness</label>
                   <select style={inputStyle} value={formData.materialThickness || ''} onChange={e => handleChange('materialThickness', e.target.value)}>
                     <option value="" disabled>Select thickness</option>
                     <option value="0.45mm">0.45mm</option>
                     <option value="0.50mm">0.50mm</option>
                     <option value="0.80mm">0.80mm</option>
                     <option value="1.00mm">1.00mm</option>
                     <option value="2.00mm">2.00mm</option>
                     <option value="Custom">Custom</option>
                   </select>
                 </div>
               </div>

               <div style={{ marginBottom: '1.5rem' }}>
                 <label style={labelStyle}>Surface Finish</label>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                   {['Powder Coated', 'Painted', 'Hot Dip Galvanized', 'Anodized', 'Natural Finish'].map(t => {
                     const selected = (formData.surfaceFinish || []).includes(t);
                     return (
                       <MultiSelectPill key={t} label={t} selected={selected} onClick={() => {
                         let curr = formData.surfaceFinish || [];
                         if (curr.includes(t)) handleChange('surfaceFinish', curr.filter(x => x !== t));
                         else handleChange('surfaceFinish', [...curr, t]);
                       }} />
                     );
                   })}
                 </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div>
                   <label style={labelStyle}>Color Preference</label>
                   <select style={inputStyle} value={formData.colorPreference || ''} onChange={e => handleChange('colorPreference', e.target.value)}>
                     <option value="White">White</option>
                     <option value="Blue">Blue</option>
                     <option value="Grey">Grey</option>
                     <option value="Green">Green</option>
                     <option value="Custom">Custom</option>
                   </select>
                 </div>
                 {formData.colorPreference === 'Custom' && (
                   <UnitInput label="Custom Color" placeholder="Enter hex code or color name" unit="" value={formData.customColor || ''} onChange={v => handleChange('customColor', v)} />
                 )}
               </div>
             </div>

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             {/* SECTION 3 — Roofing Specifications */}
             <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SECTION 3 — Roofing Specifications</h4>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div>
                   <label style={labelStyle}>Roof Profile</label>
                   <select style={inputStyle} value={formData.roofProfile || ''} onChange={e => handleChange('roofProfile', e.target.value)}>
                     <option value="Trapezoidal">Trapezoidal</option>
                     <option value="Corrugated">Corrugated</option>
                     <option value="Standing Seam">Standing Seam</option>
                     <option value="Flat">Flat</option>
                   </select>
                 </div>
                 <UnitInput label="Roof Pitch" placeholder="Enter degree" unit="°" value={formData.roofPitchTech || ''} onChange={v => handleChange('roofPitchTech', v)} />
                 <div>
                   <label style={labelStyle}>Roof Ventilator</label>
                   <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                     <button type="button" onClick={() => handleChange('roofVentilator', true)} style={{ ...toggleBtnStyle, ...(formData.roofVentilator ? toggleBtnActiveStyle : {}) }}>Yes</button>
                     <button type="button" onClick={() => handleChange('roofVentilator', false)} style={{ ...toggleBtnStyle, ...(!formData.roofVentilator ? toggleBtnActiveStyle : {}) }}>No</button>
                   </div>
                 </div>
                 <div>
                   <label style={labelStyle}>Skylight Required</label>
                   <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                     <button type="button" onClick={() => handleChange('skylightRequired', true)} style={{ ...toggleBtnStyle, ...(formData.skylightRequired ? toggleBtnActiveStyle : {}) }}>Yes</button>
                     <button type="button" onClick={() => handleChange('skylightRequired', false)} style={{ ...toggleBtnStyle, ...(!formData.skylightRequired ? toggleBtnActiveStyle : {}) }}>No</button>
                   </div>
                 </div>
                 <div>
                   <label style={labelStyle}>Insulation Required</label>
                   <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                     <button type="button" onClick={() => handleChange('insulationRequired', true)} style={{ ...toggleBtnStyle, ...(formData.insulationRequired ? toggleBtnActiveStyle : {}) }}>Yes</button>
                     <button type="button" onClick={() => handleChange('insulationRequired', false)} style={{ ...toggleBtnStyle, ...(!formData.insulationRequired ? toggleBtnActiveStyle : {}) }}>No</button>
                   </div>
                 </div>
                 {formData.insulationRequired && (
                   <div>
                     <label style={labelStyle}>Thickness</label>
                     <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                       {['25mm', '50mm', '75mm', '100mm'].map(t => (
                         <SelectPill key={t} label={t} selected={formData.insulationThickness === t} onClick={() => handleChange('insulationThickness', t)} />
                       ))}
                     </div>
                   </div>
                 )}
               </div>
             </div>

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             {/* SECTION 4 — Accessories */}
             <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SECTION 4 — Accessories</h4>
               <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                 {['Gutters', 'Downpipes', 'Ridge Cover', 'Turbo Ventilator', 'Roof Monitor', 'Sky Light', 'Louvers', 'Flashing', 'Insulation', 'Bird Mesh', 'Walkway', 'Solar Panel Provision', 'Lightning Arrestor', 'Rainwater Harvesting'].map(t => {
                   const selected = (formData.accessories || []).includes(t);
                   return (
                     <MultiSelectPill key={t} label={t} selected={selected} onClick={() => {
                       let curr = formData.accessories || [];
                       if (curr.includes(t)) handleChange('accessories', curr.filter(x => x !== t));
                       else handleChange('accessories', [...curr, t]);
                     }} />
                   );
                 })}
               </div>
             </div>

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             {/* SECTION 5 — Electrical & Mechanical */}
             <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SECTION 5 — Electrical & Mechanical</h4>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div>
                   <label style={labelStyle}>Lighting Provision</label>
                   <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                     <button type="button" onClick={() => handleChange('lightingProvision', true)} style={{ ...toggleBtnStyle, ...(formData.lightingProvision ? toggleBtnActiveStyle : {}) }}>Yes</button>
                     <button type="button" onClick={() => handleChange('lightingProvision', false)} style={{ ...toggleBtnStyle, ...(!formData.lightingProvision ? toggleBtnActiveStyle : {}) }}>No</button>
                   </div>
                 </div>
                 <div>
                   <label style={labelStyle}>Exhaust Fan</label>
                   <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                     <button type="button" onClick={() => handleChange('exhaustFan', true)} style={{ ...toggleBtnStyle, ...(formData.exhaustFan ? toggleBtnActiveStyle : {}) }}>Yes</button>
                     <button type="button" onClick={() => handleChange('exhaustFan', false)} style={{ ...toggleBtnStyle, ...(!formData.exhaustFan ? toggleBtnActiveStyle : {}) }}>No</button>
                   </div>
                 </div>
                 {formData.projectType === 'Other roofing' && formData.customProjectType === 'Retractable Roofing' && (
                   <div>
                     <label style={labelStyle}>Motorized System</label>
                     <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                       <button type="button" onClick={() => handleChange('motorizedSystem', true)} style={{ ...toggleBtnStyle, ...(formData.motorizedSystem ? toggleBtnActiveStyle : {}) }}>Yes</button>
                       <button type="button" onClick={() => handleChange('motorizedSystem', false)} style={{ ...toggleBtnStyle, ...(!formData.motorizedSystem ? toggleBtnActiveStyle : {}) }}>No</button>
                     </div>
                   </div>
                 )}
                 <div>
                   <label style={labelStyle}>Power Supply Available</label>
                   <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                     <button type="button" onClick={() => handleChange('powerSupplyAvailable', true)} style={{ ...toggleBtnStyle, ...(formData.powerSupplyAvailable ? toggleBtnActiveStyle : {}) }}>Yes</button>
                     <button type="button" onClick={() => handleChange('powerSupplyAvailable', false)} style={{ ...toggleBtnStyle, ...(!formData.powerSupplyAvailable ? toggleBtnActiveStyle : {}) }}>No</button>
                   </div>
                 </div>
                 <div>
                   <label style={labelStyle}>Cable Routing</label>
                   <select style={inputStyle} value={formData.cableRouting || ''} onChange={e => handleChange('cableRouting', e.target.value)}>
                     <option value="Internal">Internal</option>
                     <option value="External">External</option>
                     <option value="Client Scope">Client Scope</option>
                   </select>
                 </div>
               </div>
             </div>

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             {/* SECTION 6 — Installation Requirements */}
             <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SECTION 6 — Installation Requirements</h4>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                 <div>
                   <label style={labelStyle}>Installation Priority</label>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Normal', 'Urgent', 'Immediate'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.installationPriority === t} onClick={() => handleChange('installationPriority', t)} />
                     ))}
                   </div>
                 </div>
                 <div>
                   <label style={labelStyle}>Working Hours</label>
                   <select style={inputStyle} value={formData.workingHours || ''} onChange={e => handleChange('workingHours', e.target.value)}>
                     <option value="Day">Day</option>
                     <option value="Night">Night</option>
                     <option value="24 Hours">24 Hours</option>
                   </select>
                 </div>
               </div>
               
               <div style={{ marginBottom: '1.5rem' }}>
                 <label style={labelStyle}>Safety Requirement</label>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                   {['Helmet', 'Safety Belt', 'Scaffolding', 'Crane', 'Boom Lift', 'Permit Required', 'Site Induction'].map(t => {
                     const selected = (formData.safetyRequirement || []).includes(t);
                     return (
                       <MultiSelectPill key={t} label={t} selected={selected} onClick={() => {
                         let curr = formData.safetyRequirement || [];
                         if (curr.includes(t)) handleChange('safetyRequirement', curr.filter(x => x !== t));
                         else handleChange('safetyRequirement', [...curr, t]);
                       }} />
                     );
                   })}
                 </div>
               </div>

               <div>
                 <label style={labelStyle}>Site Constraints</label>
                 <textarea 
                   placeholder="Mention any installation restrictions or technical challenges."
                   style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                   value={formData.siteConstraints || ''}
                   onChange={e => handleChange('siteConstraints', e.target.value)}
                 />
               </div>
             </div>

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             {/* SECTION 7 — Warranty & Maintenance */}
             <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SECTION 7 — Warranty & Maintenance</h4>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                 <div>
                   <label style={labelStyle}>Warranty Required</label>
                   <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                     <button type="button" onClick={() => handleChange('warrantyRequired', true)} style={{ ...toggleBtnStyle, ...(formData.warrantyRequired ? toggleBtnActiveStyle : {}) }}>Yes</button>
                     <button type="button" onClick={() => handleChange('warrantyRequired', false)} style={{ ...toggleBtnStyle, ...(!formData.warrantyRequired ? toggleBtnActiveStyle : {}) }}>No</button>
                   </div>
                 </div>
                 {formData.warrantyRequired && (
                   <div>
                     <label style={labelStyle}>Warranty Period</label>
                     <select style={inputStyle} value={formData.warrantyPeriod || ''} onChange={e => handleChange('warrantyPeriod', e.target.value)}>
                       <option value="1 Year">1 Year</option>
                       <option value="2 Years">2 Years</option>
                       <option value="5 Years">5 Years</option>
                       <option value="10 Years">10 Years</option>
                     </select>
                   </div>
                 )}
                 <div>
                   <label style={labelStyle}>Annual Maintenance</label>
                   <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                     {['Yes', 'No', 'AMC Required'].map(t => (
                       <SelectPill key={t} label={t} selected={formData.annualMaintenance === t} onClick={() => handleChange('annualMaintenance', t)} />
                     ))}
                   </div>
                 </div>
               </div>
             </div>

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             {/* SECTION 8 — Technical Notes */}
             <div style={{ marginBottom: '2.5rem' }}>
               <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SECTION 8 — Technical Notes</h4>
               <textarea 
                 placeholder="Enter technical remarks, engineering notes, client requirements, special fabrication instructions, or approval comments..."
                 style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                 value={formData.technicalNotes || ''}
                 onChange={e => handleChange('technicalNotes', e.target.value)}
                 maxLength={500}
               />
               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                 <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '500' }}>
                   {(formData.technicalNotes || '').length} / 500
                 </span>
               </div>
             </div>

             <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2.5rem 0' }} />

             {/* Dynamic Sections Based on Service */}
             {formData.projectType === 'PEB Building' && (
               <div style={{ marginBottom: '2.5rem' }}>
                 <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PEB Specific Variables</h4>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                   <UnitInput label="Crane Capacity" placeholder="Enter capacity" unit="Ton" value={formData.craneCapacity || ''} onChange={v => handleChange('craneCapacity', v)} />
                   <div>
                     <label style={labelStyle}>Mezzanine Floor</label>
                     <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                       <button type="button" onClick={() => handleChange('mezzanineFloorTech', true)} style={{ ...toggleBtnStyle, ...(formData.mezzanineFloorTech ? toggleBtnActiveStyle : {}) }}>Yes</button>
                       <button type="button" onClick={() => handleChange('mezzanineFloorTech', false)} style={{ ...toggleBtnStyle, ...(!formData.mezzanineFloorTech ? toggleBtnActiveStyle : {}) }}>No</button>
                     </div>
                   </div>
                   <div>
                     <label style={labelStyle}>Future Expansion</label>
                     <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                       <button type="button" onClick={() => handleChange('futureExpansion', true)} style={{ ...toggleBtnStyle, ...(formData.futureExpansion ? toggleBtnActiveStyle : {}) }}>Yes</button>
                       <button type="button" onClick={() => handleChange('futureExpansion', false)} style={{ ...toggleBtnStyle, ...(!formData.futureExpansion ? toggleBtnActiveStyle : {}) }}>No</button>
                     </div>
                   </div>
                   <UnitInput label="Column Type" placeholder="Enter type" unit="" value={formData.columnType || ''} onChange={v => handleChange('columnType', v)} />
                   <UnitInput label="Bracing Type" placeholder="Enter type" unit="" value={formData.bracingType || ''} onChange={v => handleChange('bracingType', v)} />
                   <div>
                     <label style={labelStyle}>Roof Monitor</label>
                     <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                       <button type="button" onClick={() => handleChange('roofMonitorTech', true)} style={{ ...toggleBtnStyle, ...(formData.roofMonitorTech ? toggleBtnActiveStyle : {}) }}>Yes</button>
                       <button type="button" onClick={() => handleChange('roofMonitorTech', false)} style={{ ...toggleBtnStyle, ...(!formData.roofMonitorTech ? toggleBtnActiveStyle : {}) }}>No</button>
                     </div>
                   </div>
                   <div>
                     <label style={labelStyle}>Wall Cladding</label>
                     <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                       <button type="button" onClick={() => handleChange('wallCladdingTech', true)} style={{ ...toggleBtnStyle, ...(formData.wallCladdingTech ? toggleBtnActiveStyle : {}) }}>Yes</button>
                       <button type="button" onClick={() => handleChange('wallCladdingTech', false)} style={{ ...toggleBtnStyle, ...(!formData.wallCladdingTech ? toggleBtnActiveStyle : {}) }}>No</button>
                     </div>
                   </div>
                   <div>
                     <label style={labelStyle}>Sandwich Panel</label>
                     <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                       <button type="button" onClick={() => handleChange('sandwichPanel', true)} style={{ ...toggleBtnStyle, ...(formData.sandwichPanel ? toggleBtnActiveStyle : {}) }}>Yes</button>
                       <button type="button" onClick={() => handleChange('sandwichPanel', false)} style={{ ...toggleBtnStyle, ...(!formData.sandwichPanel ? toggleBtnActiveStyle : {}) }}>No</button>
                     </div>
                   </div>
                 </div>
               </div>
             )}

             {formData.projectType === 'Tensile' && (
               <div style={{ marginBottom: '2.5rem' }}>
                 <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tensile Specific Variables</h4>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                   <UnitInput label="Fabric Type" placeholder="Enter type" unit="" value={formData.fabricTypeTech || ''} onChange={v => handleChange('fabricTypeTech', v)} />
                   <UnitInput label="Membrane Thickness" placeholder="Enter thickness" unit="mm" value={formData.membraneThickness || ''} onChange={v => handleChange('membraneThickness', v)} />
                   <UnitInput label="Edge Cable" placeholder="Enter spec" unit="" value={formData.edgeCable || ''} onChange={v => handleChange('edgeCable', v)} />
                   <UnitInput label="Mast Height" placeholder="Enter height" unit="ft" value={formData.mastHeight || ''} onChange={v => handleChange('mastHeight', v)} />
                   <UnitInput label="Cable Diameter" placeholder="Enter diameter" unit="mm" value={formData.cableDiameter || ''} onChange={v => handleChange('cableDiameter', v)} />
                   <UnitInput label="Fabric Color" placeholder="Enter color" unit="" value={formData.fabricColor || ''} onChange={v => handleChange('fabricColor', v)} />
                   <UnitInput label="Drainage System" placeholder="Specify drainage" unit="" value={formData.drainageSystem || ''} onChange={v => handleChange('drainageSystem', v)} />
                   <div>
                     <label style={labelStyle}>Lighting Integration</label>
                     <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                       <button type="button" onClick={() => handleChange('lightingIntegration', true)} style={{ ...toggleBtnStyle, ...(formData.lightingIntegration ? toggleBtnActiveStyle : {}) }}>Yes</button>
                       <button type="button" onClick={() => handleChange('lightingIntegration', false)} style={{ ...toggleBtnStyle, ...(!formData.lightingIntegration ? toggleBtnActiveStyle : {}) }}>No</button>
                     </div>
                   </div>
                 </div>
               </div>
             )}

             {formData.projectType === 'Other roofing' && (
               <>
                 {formData.customProjectType === 'UPVC Roofing in Chennai' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>UPVC Specific Variables</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Sheet Thickness" placeholder="Enter thickness" unit="mm" value={formData.upvcSheetThickness || ''} onChange={v => handleChange('upvcSheetThickness', v)} />
                       <div>
                         <label style={labelStyle}>UV Protection</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('uvProtection', true)} style={{ ...toggleBtnStyle, ...(formData.uvProtection ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('uvProtection', false)} style={{ ...toggleBtnStyle, ...(!formData.uvProtection ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <UnitInput label="Sheet Color" placeholder="Enter color" unit="" value={formData.sheetColor || ''} onChange={v => handleChange('sheetColor', v)} />
                       <UnitInput label="Overlap Type" placeholder="Enter type" unit="" value={formData.overlapType || ''} onChange={v => handleChange('overlapType', v)} />
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'Polycarbonate Roofing' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Polycarbonate Specific Variables</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <div>
                         <label style={labelStyle}>Solid / Multiwall</label>
                         <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                           {['Solid', 'Multiwall'].map(t => (
                             <SelectPill key={t} label={t} selected={formData.solidMultiwall === t} onClick={() => handleChange('solidMultiwall', t)} />
                           ))}
                         </div>
                       </div>
                       <div>
                         <label style={labelStyle}>UV Coating</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('uvCoating', true)} style={{ ...toggleBtnStyle, ...(formData.uvCoating ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('uvCoating', false)} style={{ ...toggleBtnStyle, ...(!formData.uvCoating ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <UnitInput label="Transparency Level" placeholder="Enter level" unit="" value={formData.transparencyLevel || ''} onChange={v => handleChange('transparencyLevel', v)} />
                       <UnitInput label="Panel Thickness" placeholder="Enter thickness" unit="mm" value={formData.polycarbonateThickness || ''} onChange={v => handleChange('polycarbonateThickness', v)} />
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'Glass Roofing' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Glass Specific Variables</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Glass Type" placeholder="Enter type" unit="" value={formData.glassTypeTech || ''} onChange={v => handleChange('glassTypeTech', v)} />
                       <div>
                         <label style={labelStyle}>Toughened Glass</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('toughenedGlass', true)} style={{ ...toggleBtnStyle, ...(formData.toughenedGlass ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('toughenedGlass', false)} style={{ ...toggleBtnStyle, ...(!formData.toughenedGlass ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <div>
                         <label style={labelStyle}>Laminated Glass</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('laminatedGlass', true)} style={{ ...toggleBtnStyle, ...(formData.laminatedGlass ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('laminatedGlass', false)} style={{ ...toggleBtnStyle, ...(!formData.laminatedGlass ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <UnitInput label="Glass Thickness" placeholder="Enter thickness" unit="mm" value={formData.glassTechThickness || ''} onChange={v => handleChange('glassTechThickness', v)} />
                       <UnitInput label="Frame Type" placeholder="Enter type" unit="" value={formData.frameType || ''} onChange={v => handleChange('frameType', v)} />
                       <UnitInput label="Silicone Seal" placeholder="Enter spec" unit="" value={formData.siliconeSeal || ''} onChange={v => handleChange('siliconeSeal', v)} />
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'Mangalore Tile Roofing' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mangalore Tile Specific Variables</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Tile Brand" placeholder="Enter brand" unit="" value={formData.tileBrand || ''} onChange={v => handleChange('tileBrand', v)} />
                       <UnitInput label="Tile Color" placeholder="Enter color" unit="" value={formData.tileColor || ''} onChange={v => handleChange('tileColor', v)} />
                       <div>
                         <label style={labelStyle}>Underlay Required</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('underlayRequired', true)} style={{ ...toggleBtnStyle, ...(formData.underlayRequired ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('underlayRequired', false)} style={{ ...toggleBtnStyle, ...(!formData.underlayRequired ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <div>
                         <label style={labelStyle}>Ridge Tile</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('ridgeTile', true)} style={{ ...toggleBtnStyle, ...(formData.ridgeTile ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('ridgeTile', false)} style={{ ...toggleBtnStyle, ...(!formData.ridgeTile ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'Shingles Roofing' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shingles Specific Variables</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Shingle Type" placeholder="Enter type" unit="" value={formData.shingleTypeTech || ''} onChange={v => handleChange('shingleTypeTech', v)} />
                       <UnitInput label="Warranty" placeholder="Enter warranty" unit="Years" value={formData.shingleWarranty || ''} onChange={v => handleChange('shingleWarranty', v)} />
                       <div>
                         <label style={labelStyle}>Underlayment</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('underlayment', true)} style={{ ...toggleBtnStyle, ...(formData.underlayment ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('underlayment', false)} style={{ ...toggleBtnStyle, ...(!formData.underlayment ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <div>
                         <label style={labelStyle}>Starter Strip</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('starterStrip', true)} style={{ ...toggleBtnStyle, ...(formData.starterStrip ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('starterStrip', false)} style={{ ...toggleBtnStyle, ...(!formData.starterStrip ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'GI Roofing in Chennai' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GI Roofing Specific Variables</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Sheet Gauge" placeholder="Enter gauge" unit="" value={formData.sheetGauge || ''} onChange={v => handleChange('sheetGauge', v)} />
                       <UnitInput label="Zinc Coating" placeholder="Enter coating" unit="" value={formData.zincCoating || ''} onChange={v => handleChange('zincCoating', v)} />
                       <UnitInput label="Profile Type" placeholder="Enter profile" unit="" value={formData.profileTypeTech || ''} onChange={v => handleChange('profileTypeTech', v)} />
                       <UnitInput label="Fastener Type" placeholder="Enter fastener" unit="" value={formData.fastenerType || ''} onChange={v => handleChange('fastenerType', v)} />
                     </div>
                   </div>
                 )}
                 {formData.customProjectType === 'Retractable Roofing' && (
                   <div style={{ marginBottom: '2.5rem' }}>
                     <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Retractable Specific Variables</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                       <UnitInput label="Motor Brand" placeholder="Enter brand" unit="" value={formData.motorBrand || ''} onChange={v => handleChange('motorBrand', v)} />
                       <div>
                         <label style={labelStyle}>Remote Control</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('remoteControl', true)} style={{ ...toggleBtnStyle, ...(formData.remoteControl ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('remoteControl', false)} style={{ ...toggleBtnStyle, ...(!formData.remoteControl ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <div>
                         <label style={labelStyle}>Automation</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('automation', true)} style={{ ...toggleBtnStyle, ...(formData.automation ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('automation', false)} style={{ ...toggleBtnStyle, ...(!formData.automation ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <div>
                         <label style={labelStyle}>Manual Override</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('manualOverride', true)} style={{ ...toggleBtnStyle, ...(formData.manualOverride ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('manualOverride', false)} style={{ ...toggleBtnStyle, ...(!formData.manualOverride ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                       <UnitInput label="Track System" placeholder="Enter system type" unit="" value={formData.trackSystem || ''} onChange={v => handleChange('trackSystem', v)} />
                       <div>
                         <label style={labelStyle}>Waterproof Seal</label>
                         <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.25rem', border: '1px solid #E2E8F0' }}>
                           <button type="button" onClick={() => handleChange('waterproofSeal', true)} style={{ ...toggleBtnStyle, ...(formData.waterproofSeal ? toggleBtnActiveStyle : {}) }}>Yes</button>
                           <button type="button" onClick={() => handleChange('waterproofSeal', false)} style={{ ...toggleBtnStyle, ...(!formData.waterproofSeal ? toggleBtnActiveStyle : {}) }}>No</button>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
               </>
             )}

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
               {formData.projectType === 'Other roofing' && (
                 <div>
                   <label style={labelStyle}>Select Roofing Type</label>
                   <select style={inputStyle} value={formData.customProjectType || ''} onChange={e => handleChange('customProjectType', e.target.value)}>
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
              </div>
              
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <label style={labelStyle}>Payment Terms Schedule</label>
                  <button type="button" onClick={addPaymentTerm} style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={14} /> Add Milestone
                  </button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(formData.paymentTerms || []).map((pt, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr auto', gap: '1rem', alignItems: 'end', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
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

const UnitInput = ({ label, unit, value, onChange, placeholder }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <input type="text" placeholder={placeholder} style={{ ...inputStyle, paddingRight: '3rem' }} value={value} onChange={e => onChange(e.target.value)} />
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


const StepperInput = ({ value, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', width: 'fit-content', overflow: 'hidden' }}>
    <button type="button" onClick={() => onChange(Math.max(0, value - 1))} style={{ padding: '0.5rem 0.75rem', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 'bold', color: '#64748B' }}>-</button>
    <div style={{ padding: '0.5rem 1rem', borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', fontWeight: '600', color: '#334155' }}>{value}</div>
    <button type="button" onClick={() => onChange(value + 1)} style={{ padding: '0.5rem 0.75rem', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 'bold', color: '#64748B' }}>+</button>
  </div>
);

const MultiSelectPill = ({ label, selected, onClick }) => (
  <button type="button" onClick={onClick} style={{
    padding: '0.5rem 1rem', borderRadius: '8px',
    border: `1px solid ${selected ? '#4F46E5' : '#E2E8F0'}`,
    backgroundColor: selected ? '#EEF2FF' : '#FFFFFF', color: selected ? '#4F46E5' : '#475569',
    fontWeight: '600', fontSize: '0.8125rem', cursor: 'pointer', outline: 'none',
    transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem'
  }}>
    {selected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
    {label}
  </button>
);
