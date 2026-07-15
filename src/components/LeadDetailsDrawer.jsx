import React, { useState } from 'react';
import { X, UserPlus, Flame, Snowflake, Thermometer, CalendarCheck, FileText, FileSignature, CheckCircle2, Trash2, Activity } from 'lucide-react';

const LeadDetailsDrawer = ({ lead, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('specifications');
  const timelineSortOrder = 'desc';

  if (!isOpen || !lead) return null;

  const historyList = [...(lead.history || [])]
    .filter(h => {
      const m = h.message.toLowerCase();
      return m.includes('status') || m.includes('created') || m.includes('received');
    });

  if (timelineSortOrder === 'desc') {
    historyList.reverse();
  }

  // Styles
  const badgeStyle = (type) => {
    switch ((type || '').toLowerCase()) {
      case 'high': return { bg: '#FEE2E2', color: '#DC2626' };
      case 'medium': return { bg: '#FEF3C7', color: '#D97706' };
      case 'low': return { bg: '#F1F5F9', color: '#475569' };
      case 'quotation send': return { bg: '#E0E7FF', color: 'var(--primary-color)' };
      default: return { bg: '#F1F5F9', color: '#475569' };
    }
  };

  const getPriorityStyle = badgeStyle(lead.priority);
  const getStatusStyle = badgeStyle(lead.status);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeInBackdrop 0.25s ease-out'
    }}
    onClick={onClose}
    >
      <div style={{
        width: '100%',
        maxWidth: '560px',
        height: '100%',
        backgroundColor: '#F8FAFC',
        boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1001,
        animation: 'slideInRightToLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: '1px solid #E2E8F0',
        overflow: 'hidden'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#1E293B' }}>
              Lead Information Details
            </h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#64748B' }}>
              {lead.id} — <span style={{ fontWeight: '600', color: '#334155' }}>{lead.name}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8',
              width: '32px', height: '32px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#F1F5F9';
              e.currentTarget.style.color = '#334155';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#94A3B8';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          <button
            onClick={() => setActiveTab('specifications')}
            style={{
              flex: 1, padding: '1rem', border: 'none', background: 'none', cursor: 'pointer',
              fontWeight: '600', fontSize: '0.875rem',
              color: activeTab === 'specifications' ? 'var(--primary-color)' : '#64748B',
              borderBottom: activeTab === 'specifications' ? '2px solid var(--primary-color)' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            Lead Specifications
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            style={{
              flex: 1, padding: '1rem', border: 'none', background: 'none', cursor: 'pointer',
              fontWeight: '600', fontSize: '0.875rem',
              color: activeTab === 'timeline' ? 'var(--primary-color)' : '#64748B',
              borderBottom: activeTab === 'timeline' ? '2px solid var(--primary-color)' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            Activity Timeline ({historyList.length})
          </button>
        </div>

        {/* Content Scrollable Area */}
        <div className="timeline-scroll" style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>

          {activeTab === 'specifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Basic Information */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '0.875rem', fontWeight: '700', color: '#1E293B', borderLeft: '3px solid var(--primary-color)', paddingLeft: '0.5rem' }}>Basic Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Customer Name</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.name || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Company Name</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.companyName || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Phone Number</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.phone || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Email Address</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.email || '-'}</span></div>
                  
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Service Segment</span>
                    <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: '#EEF2FF', color: 'var(--primary-color)', fontSize: '0.75rem', fontWeight: '600' }}>{lead.projectType || 'PEB Building'}</span>
                  </div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Lead Source</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.source || '-'}</span></div>
                  
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Assigned Manager</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.assignedExecutive || lead.manager || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Project Location</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.projectLocation || '-'}</span></div>
                  
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Priority Level</span>
                    <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: getPriorityStyle.bg, color: getPriorityStyle.color, fontSize: '0.75rem', fontWeight: '600' }}>{lead.priority || 'Medium'}</span>
                  </div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Current Status</span>
                    <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: getStatusStyle.bg, color: getStatusStyle.color, fontSize: '0.75rem', fontWeight: '600' }}>{lead.status || 'Lead Received'}</span>
                  </div>
                </div>
              </div>

              {/* PEB Building Details */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '0.875rem', fontWeight: '700', color: '#1E293B', borderLeft: '3px solid var(--primary-color)', paddingLeft: '0.5rem' }}>PEB Building Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Project Type</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.projectTypeDetails || 'Warehouse'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Structure Type</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.structureType || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Site Condition</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.siteCondition || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Soil Test Report</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.soilTestDone ? 'Done' : 'Not Done'}</span></div>
                </div>
              </div>

              {/* Site Dimensions */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '0.875rem', fontWeight: '700', color: '#1E293B', borderLeft: '3px solid var(--primary-color)', paddingLeft: '0.5rem' }}>Site Dimensions</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Length</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.length || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Width</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.width || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Ridge Height</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.ridgeHeight || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Clear Height</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.clearHeight || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Total Site Area</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.area || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Bay Spacing</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.baySpacing || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>No Of Floors</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.noOfFloors || '1'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Mezzanine Area</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.mezzanineArea || '-'}</span></div>
                </div>
              </div>

              {/* Technical & Scope */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '0.875rem', fontWeight: '700', color: '#1E293B', borderLeft: '3px solid var(--primary-color)', paddingLeft: '0.5rem' }}>Technical & Scope</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Roof Covering</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.roofType || 'GI'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Cladding Material</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.cladding || 'GI'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Flooring Type</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.floorType || 'Normal'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Scope Of Work</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.scopeOfWork || 'Steel Only'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Crane Requirement</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.craneRequirement ? 'Yes' : 'No'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Insulation Required</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.heatInsulation ? 'Yes' : 'No'}</span></div>
                </div>
              </div>

              {/* Commercial Terms */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '0.875rem', fontWeight: '700', color: '#1E293B', borderLeft: '3px solid var(--primary-color)', paddingLeft: '0.5rem' }}>Commercial Terms</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Estimated Revenue</span><span style={{ fontWeight: '700', color: '#10B981', fontSize: '0.875rem' }}>₹{lead.estimatedRevenue ? Number(lead.estimatedRevenue).toLocaleString() : '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Sales Probability</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.salesProbability || '-'}%</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Expected Closing Date</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.closingDate || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Expected Timeline</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.timelineRequirement || '-'}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Next Follow-Up</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{lead.nextFollowUp || '-'}</span></div>
                </div>
              </div>

              {/* Attached Files */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
                <h4 style={{ margin: '0 0 1.25rem 0', fontSize: '0.875rem', fontWeight: '700', color: '#1E293B', borderLeft: '3px solid var(--primary-color)', paddingLeft: '0.5rem' }}>Attached Files</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#94A3B8', fontStyle: 'italic' }}>
                  No files attached to this lead
                </p>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                position: 'relative',
                paddingLeft: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                marginTop: '0.5rem'
              }}>
                <div style={{ position: 'absolute', left: '8px', top: '8px', bottom: '8px', width: '2px', backgroundColor: '#E2E8F0' }} />
                
                {historyList.length === 0 ? (
                  <div style={{ color: '#94A3B8', fontSize: '0.875rem', fontStyle: 'italic', padding: '1rem 0' }}>
                    No status tracking logs recorded yet.
                  </div>
                ) : (
                  historyList.map((h, i) => {
                    let Icon = FileText;
                    let iconBg = '#F1F5F9';
                    let iconColor = '#64748B';
                    const msg = h.message.toLowerCase();

                    if (msg.includes('created') || msg.includes('received')) {
                      Icon = UserPlus; iconBg = '#DCFCE7'; iconColor = '#16A34A';
                    } else if (msg.includes('hot')) {
                      Icon = Flame; iconBg = '#FEE2E2'; iconColor = '#DC2626';
                    } else if (msg.includes('cold')) {
                      Icon = Snowflake; iconBg = '#F1F5F9'; iconColor = '#475569';
                    } else if (msg.includes('warm')) {
                      Icon = Thermometer; iconBg = '#FEF3C7'; iconColor = '#D97706';
                    } else if (msg.includes('appointment') || msg.includes('appt')) {
                      Icon = CalendarCheck; iconBg = '#ECFDF5'; iconColor = '#10B981';
                    } else if (msg.includes('quotation') || msg.includes('quot')) {
                      Icon = FileText; iconBg = '#E0E7FF'; iconColor = 'var(--primary-color)';
                    } else if (msg.includes('negotiation') || msg.includes('negot')) {
                      Icon = FileSignature; iconBg = '#FFFBEB'; iconColor = '#D97706';
                    } else if (msg.includes('order confirmed') || msg.includes('confirmed') || msg.includes('order')) {
                      Icon = CheckCircle2; iconBg = '#DCFCE7'; iconColor = '#16A34A';
                    } else if (msg.includes('junk')) {
                      Icon = Trash2; iconBg = '#F3F4F6'; iconColor = '#4B5563';
                    } else if (msg.includes('status')) {
                      Icon = Activity; iconBg = '#EEF2FF'; iconColor = 'var(--primary-color)';
                    }

                    return (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8125rem', position: 'relative' }}>
                        <div style={{
                          position: 'absolute', left: '-37px', top: '2px', width: '20px', height: '20px', borderRadius: '50%',
                          backgroundColor: iconBg, border: '2.5px solid #FFFFFF', boxShadow: `0 0 0 1.5px ${iconColor}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2
                        }}>
                          <Icon size={9} color={iconColor} strokeWidth={2.5} />
                        </div>

                        <div style={{
                          backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '0.75rem',
                          border: '1px solid #E2E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                          display: 'flex', flexDirection: 'column', gap: '0.25rem'
                        }}>
                          <span style={{ color: '#94A3B8', fontSize: '0.7rem', fontWeight: '600' }}>{h.timestamp}</span>
                          <span style={{ color: '#1E293B', fontWeight: '500', lineHeight: '1.4' }}>{h.message}</span>
                          {h.remark && (
                            <div style={{
                              borderLeft: '3px solid #E2E8F0', paddingLeft: '0.6rem', marginTop: '0.35rem',
                              color: '#64748B', fontStyle: 'italic', fontSize: '0.75rem', lineHeight: '1.4'
                            }}>
                              <strong>Remark:</strong> "{h.remark}"
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LeadDetailsDrawer;
