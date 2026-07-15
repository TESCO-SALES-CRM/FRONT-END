import React, { useState } from 'react';
import { X, Ruler, Wrench, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const inputStyle = {
  width: '100%', padding: '0.65rem 1rem', borderRadius: '8px',
  border: '1.5px solid #E2E8F0', fontSize: '0.875rem', outline: 'none',
  backgroundColor: '#FFFFFF', color: '#1E293B', transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};
const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' };
const sectionHeadStyle = { fontSize: '0.75rem', fontWeight: '700', color: '#64748B', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', paddingBottom: '0.5rem', borderBottom: '1px solid #F1F5F9' };

function Field({ label, children }) {
  return <div><label style={labelStyle}>{label}</label>{children}</div>;
}

function StyledInput({ value, onChange, placeholder, type = 'text' }) {
  const [f, setF] = useState(false);
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ ...inputStyle, borderColor: f ? 'var(--primary-color)' : '#E2E8F0', boxShadow: f ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none' }} />
  );
}

function StyledSelect({ value, onChange, children }) {
  const [f, setF] = useState(false);
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ ...inputStyle, cursor: 'pointer', borderColor: f ? 'var(--primary-color)' : '#E2E8F0' }}>
      {children}
    </select>
  );
}

function UnitInput({ label, value, onChange, placeholder, unit }) {
  const [f, setF] = useState(false);
  return (
    <Field label={label}>
      <div style={{ position: 'relative' }}>
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          onFocus={() => setF(true)} onBlur={() => setF(false)}
          style={{ ...inputStyle, paddingRight: '3rem', borderColor: f ? 'var(--primary-color)' : '#E2E8F0', boxShadow: f ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none' }} />
        {unit && <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8' }}>{unit}</span>}
      </div>
    </Field>
  );
}

function ToggleBtn({ value, onChange, options }) {
  return (
    <div style={{ display: 'inline-flex', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '0.2rem', border: '1px solid #E2E8F0' }}>
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onChange(opt)}
          style={{ padding: '0.35rem 1rem', borderRadius: '6px', border: 'none', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
            backgroundColor: value === opt ? 'var(--primary-color)' : 'transparent',
            color: value === opt ? '#fff' : '#64748B' }}>
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Step 1: Site Dimensions ────────────────────────────────────────────────
function SiteDimensionsStep({ form, set }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Overall Site */}
      <div>
        <p style={sectionHeadStyle}>Overall Site</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <UnitInput label="Plot Length" placeholder="Enter length" unit="ft" value={form.plotLength || ''} onChange={v => set('plotLength', v)} />
          <UnitInput label="Plot Width" placeholder="Enter width" unit="ft" value={form.plotWidth || ''} onChange={v => set('plotWidth', v)} />
          <UnitInput label="Total Area" placeholder="Auto-calculated" unit="sqft" value={form.plotArea || ''} onChange={v => set('plotArea', v)} />
        </div>
      </div>

      {/* Building Area */}
      <div>
        <p style={sectionHeadStyle}>Building Area</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <UnitInput label="Building Length" placeholder="Enter length" unit="ft" value={form.buildingLength || ''} onChange={v => set('buildingLength', v)} />
          <UnitInput label="Building Width" placeholder="Enter width" unit="ft" value={form.buildingWidth || ''} onChange={v => set('buildingWidth', v)} />
          <UnitInput label="Building Area" placeholder="Auto-calculated" unit="sqft" value={form.buildingArea || ''} onChange={v => set('buildingArea', v)} />
        </div>
      </div>

      {/* Roof Slope */}
      <div>
        <p style={sectionHeadStyle}>Roof Slope</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {['Flat', '5°', '10°', '15°', '20°', 'Custom', 'Other'].map(t => (
            <button key={t} type="button" onClick={() => set('roofSlope', t)}
              style={{ padding: '0.4rem 1rem', borderRadius: '8px', border: `1.5px solid ${form.roofSlope === t ? 'var(--primary-color)' : '#E2E8F0'}`,
                backgroundColor: form.roofSlope === t ? '#EEF2FF' : '#FFFFFF',
                color: form.roofSlope === t ? 'var(--primary-color)' : '#64748B',
                fontWeight: '600', fontSize: '0.825rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Structural Layout */}
      <div>
        <p style={sectionHeadStyle}>Structural Layout</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <UnitInput label="Bay Spacing" placeholder="Enter spacing" unit="ft" value={form.baySpacing || ''} onChange={v => set('baySpacing', v)} />
          <Field label="Number of Columns">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button type="button" onClick={() => set('numberOfColumns', Math.max(0, (form.numberOfColumns || 0) - 1))}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', color: '#64748B' }}>-</button>
              <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1E293B', minWidth: '24px', textAlign: 'center' }}>{form.numberOfColumns || 0}</span>
              <button type="button" onClick={() => set('numberOfColumns', (form.numberOfColumns || 0) + 1)}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', color: '#64748B' }}>+</button>
            </div>
          </Field>
          <UnitInput label="Column Height" placeholder="Enter height" unit="ft" value={form.columnHeight || ''} onChange={v => set('columnHeight', v)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <Field label="Crane Provision"><ToggleBtn value={form.craneProvision ? 'Yes' : 'No'} onChange={v => set('craneProvision', v === 'Yes')} options={['Yes', 'No']} /></Field>
          <Field label="Mezzanine Floor"><ToggleBtn value={form.mezzanineFloor ? 'Yes' : 'No'} onChange={v => set('mezzanineFloor', v === 'Yes')} options={['Yes', 'No']} /></Field>
        </div>
      </div>

      {/* Site Photos */}
      <div>
        <p style={sectionHeadStyle}>Site Photos</p>
        <label htmlFor="dr-sitePhoto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.5rem', borderRadius: '10px', border: '2px dashed #C7D2FE', backgroundColor: '#F8FAFF', cursor: 'pointer', textAlign: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--primary-color)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a1 1 0 001 1h16a1 1 0 001-1v-2.5M16 9l-4-4m0 0L8 9m4-4v12" /></svg>
          <span style={{ fontWeight: '600', color: 'var(--primary-color)', fontSize: '0.875rem' }}>Click to upload site photos</span>
          <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>PNG, JPG up to 10MB · Multiple allowed</span>
          <input id="dr-sitePhoto" type="file" multiple accept="image/*" style={{ display: 'none' }} />
        </label>
      </div>

      {/* Site Condition */}
      <div>
        <p style={sectionHeadStyle}>Site Condition</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Soil Type">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Normal', 'Soft', 'Hard Rock', 'Other'].map(t => (
                <button key={t} type="button" onClick={() => set('soilType', t)}
                  style={{ padding: '0.35rem 0.85rem', borderRadius: '6px', border: `1.5px solid ${form.soilType === t ? 'var(--primary-color)' : '#E2E8F0'}`,
                    backgroundColor: form.soilType === t ? '#EEF2FF' : '#FFFFFF', color: form.soilType === t ? 'var(--primary-color)' : '#64748B',
                    fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {t}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Ground Level"><ToggleBtn value={form.groundLevel || 'Level'} onChange={v => set('groundLevel', v)} options={['Level', 'Sloped', 'Other']} /></Field>
          <Field label="Foundation Ready?"><ToggleBtn value={form.foundationReady ? 'Yes' : 'No'} onChange={v => set('foundationReady', v === 'Yes')} options={['Yes', 'No']} /></Field>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Technical Details ───────────────────────────────────────────────
function TechnicalDetailsStep({ form, set }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Structural Specifications */}
      <div>
        <p style={sectionHeadStyle}>Section 1 — Structural Specifications</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Structure Grade">
            <StyledSelect value={form.structureGrade || 'Standard'} onChange={v => set('structureGrade', v)}>
              <option>Standard</option><option>Premium</option><option>Heavy Duty</option><option>Industrial</option>
            </StyledSelect>
          </Field>
          <Field label="Purlin Type">
            <StyledSelect value={form.purlinType || ''} onChange={v => set('purlinType', v)}>
              <option value="">Select...</option><option>Z Purlin</option><option>C Purlin</option><option>Custom</option>
            </StyledSelect>
          </Field>
          <UnitInput label="Wind Speed" placeholder="Enter speed" unit="m/s" value={form.windSpeed || ''} onChange={v => set('windSpeed', v)} />
          <UnitInput label="Snow Load" placeholder="Enter load" unit="kN/m²" value={form.snowLoad || ''} onChange={v => set('snowLoad', v)} />
        </div>
      </div>

      {/* Roofing & Cladding */}
      <div>
        <p style={sectionHeadStyle}>Section 2 — Roofing & Cladding</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Roofing Sheet Type">
            <StyledSelect value={form.roofingSheet || ''} onChange={v => set('roofingSheet', v)}>
              <option value="">Select...</option><option>GI Sheets</option><option>Color Coated Sheets</option><option>Sandwich Panel</option><option>Polycarbonate Sheet</option>
            </StyledSelect>
          </Field>
          <Field label="Roofing Sheet Thickness">
            <StyledSelect value={form.roofingThickness || ''} onChange={v => set('roofingThickness', v)}>
              <option value="">Select...</option><option>0.45mm</option><option>0.50mm</option><option>0.60mm</option><option>0.80mm</option>
            </StyledSelect>
          </Field>
          <Field label="Wall Cladding">
            <StyledSelect value={form.wallCladding || ''} onChange={v => set('wallCladding', v)}>
              <option value="">Select...</option><option>Full Cladding</option><option>Partial Cladding</option><option>No Cladding</option>
            </StyledSelect>
          </Field>
          <Field label="Gutter Provision"><ToggleBtn value={form.gutterProvision ? 'Yes' : 'No'} onChange={v => set('gutterProvision', v === 'Yes')} options={['Yes', 'No']} /></Field>
        </div>
      </div>

      {/* Doors & Windows */}
      <div>
        <p style={sectionHeadStyle}>Section 3 — Doors & Windows</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Sliding Doors">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button type="button" onClick={() => set('slidingDoors', Math.max(0, (form.slidingDoors || 0) - 1))}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', color: '#64748B' }}>-</button>
              <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1E293B', minWidth: '24px', textAlign: 'center' }}>{form.slidingDoors || 0}</span>
              <button type="button" onClick={() => set('slidingDoors', (form.slidingDoors || 0) + 1)}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', color: '#64748B' }}>+</button>
            </div>
          </Field>
          <Field label="Personnel Doors">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button type="button" onClick={() => set('personnelDoors', Math.max(0, (form.personnelDoors || 0) - 1))}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', color: '#64748B' }}>-</button>
              <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1E293B', minWidth: '24px', textAlign: 'center' }}>{form.personnelDoors || 0}</span>
              <button type="button" onClick={() => set('personnelDoors', (form.personnelDoors || 0) + 1)}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', color: '#64748B' }}>+</button>
            </div>
          </Field>
          <UnitInput label="Window Size" placeholder="e.g. 4x3" unit="ft" value={form.windowSize || ''} onChange={v => set('windowSize', v)} />
          <Field label="Number of Windows">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button type="button" onClick={() => set('numberOfWindows', Math.max(0, (form.numberOfWindows || 0) - 1))}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', color: '#64748B' }}>-</button>
              <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1E293B', minWidth: '24px', textAlign: 'center' }}>{form.numberOfWindows || 0}</span>
              <button type="button" onClick={() => set('numberOfWindows', (form.numberOfWindows || 0) + 1)}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', color: '#64748B' }}>+</button>
            </div>
          </Field>
        </div>
      </div>

      {/* Electrical & Mechanical */}
      <div>
        <p style={sectionHeadStyle}>Section 4 — Electrical & Mechanical</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Lighting Provision"><ToggleBtn value={form.lightingProvision ? 'Yes' : 'No'} onChange={v => set('lightingProvision', v === 'Yes')} options={['Yes', 'No']} /></Field>
          <Field label="Exhaust Fan"><ToggleBtn value={form.exhaustFan ? 'Yes' : 'No'} onChange={v => set('exhaustFan', v === 'Yes')} options={['Yes', 'No']} /></Field>
          <Field label="Power Supply"><ToggleBtn value={form.powerSupplyAvailable ? 'Available' : 'Not Available'} onChange={v => set('powerSupplyAvailable', v === 'Available')} options={['Available', 'Not Available']} /></Field>
        </div>
      </div>

      {/* Remarks */}
      <div>
        <p style={sectionHeadStyle}>Remarks / Special Requirements</p>
        <textarea value={form.technicalRemarks || ''} onChange={e => set('technicalRemarks', e.target.value)} placeholder="Any special engineering or installation requirements..." rows={3}
          style={{ ...inputStyle, resize: 'vertical' }} />
      </div>
    </div>
  );
}

// ─── Main Modal ──────────────────────────────────────────────────────────────
export default function DesignRequirementModal({ lead, designType, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState(3);
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = () => {
    onSave && onSave(form);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1500);
  };

  const tabs = [
    { id: 3, label: 'Site Dimensions', icon: Ruler },
    { id: 4, label: 'Technical Details', icon: Wrench },
  ];

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)', zIndex: 10000 }} />

      {/* Modal */}
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '780px', maxHeight: '90vh', backgroundColor: '#F8FAFC', borderRadius: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', zIndex: 10001, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ backgroundColor: '#EEF2FF', color: 'var(--primary-color)', padding: '0.2rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>{designType}</span>
              {lead?.name && <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '500' }}>— {lead.name}</span>}
            </div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1E293B' }}>Design Requirement Form</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '0.5rem', borderRadius: '8px' }}><X size={20} /></button>
        </div>

        {/* Tabs */}
        <div style={{ padding: '0 1.5rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '0' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.25rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600',
                color: activeTab === tab.id ? 'var(--primary-color)' : '#64748B',
                borderBottom: activeTab === tab.id ? '2px solid var(--primary-color)' : '2px solid transparent',
                transition: 'all 0.2s' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: activeTab === tab.id ? 'var(--primary-color)' : '#E2E8F0', fontSize: '0.7rem', fontWeight: '800', color: activeTab === tab.id ? '#fff' : '#64748B' }}>{tab.id}</div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {activeTab === 3 && <SiteDimensionsStep form={form} set={set} />}
          {activeTab === 4 && <TechnicalDetailsStep form={form} set={set} />}
        </div>

        {/* Footer */}
        <div style={{ padding: '1rem 1.5rem', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setActiveTab(3)}
            disabled={activeTab === 3}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFFFFF', cursor: activeTab === 3 ? 'not-allowed' : 'pointer', color: '#64748B', fontWeight: '600', fontSize: '0.875rem', opacity: activeTab === 3 ? 0.4 : 1 }}
            >
            <ChevronLeft size={16} /> Back
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {activeTab === 3 && (
              <button onClick={() => setActiveTab(4)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: 'var(--primary-color)', color: '#fff', fontWeight: '700', fontSize: '0.875rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                Next <ChevronRight size={16} />
              </button>
            )}
            {activeTab === 4 && (
              <button onClick={handleSave}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.75rem', borderRadius: '8px', border: 'none', backgroundColor: saved ? '#10B981' : 'var(--primary-color)', color: '#fff', fontWeight: '700', fontSize: '0.875rem', cursor: 'pointer', transition: 'background-color 0.3s', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                {saved ? <><CheckCircle2 size={16} /> Saved!</> : 'Save Details'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
