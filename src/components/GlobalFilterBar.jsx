import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronRight, ChevronLeft } from 'lucide-react';

export default function GlobalFilterBar({ 
  dateRange: externalDateRange, 
  setDateRange: externalSetDateRange,
  selectedPreset: externalSelectedPreset,
  setSelectedPreset: externalSetSelectedPreset,
  assignTo: externalAssignTo,
  setAssignTo: externalSetAssignTo
}) {
  // Internal state for when used without props
  const [internalDateRange, setInternalDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [internalSelectedPreset, setInternalSelectedPreset] = useState('Last 30 Days');
  const [internalAssignTo, setInternalAssignTo] = useState('All');

  // Use props if provided, otherwise internal state
  const dateRange = externalDateRange || internalDateRange;
  const setDateRange = externalSetDateRange || setInternalDateRange;
  const selectedPreset = externalSelectedPreset || internalSelectedPreset;
  const setSelectedPreset = externalSetSelectedPreset || setInternalSelectedPreset;
  const assignTo = externalAssignTo || internalAssignTo;
  const setAssignTo = externalSetAssignTo || setInternalAssignTo;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentNavDate, setCurrentNavDate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCalendarOpen]);

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const applyPreset = (preset) => {
    setSelectedPreset(preset);
    const end = new Date();
    let start = new Date();
    
    switch(preset) {
      case 'Today':
        break;
      case 'Yesterday':
        start.setDate(end.getDate() - 1);
        end.setDate(end.getDate() - 1);
        break;
      case 'Last 7 Days':
        start.setDate(end.getDate() - 7);
        break;
      case 'Last 30 Days':
        start.setDate(end.getDate() - 30);
        break;
      case 'This Month':
        start = new Date(end.getFullYear(), end.getMonth(), 1);
        break;
      case 'Custom':
        return;
    }
    
    setDateRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    });
    setCurrentNavDate(new Date(end));
    if(preset !== 'Custom' && isMobile) setIsCalendarOpen(false);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    setCurrentNavDate(new Date(currentNavDate.getFullYear(), currentNavDate.getMonth() + 1, 1));
  };
  const prevMonth = (e) => {
    e.stopPropagation();
    setCurrentNavDate(new Date(currentNavDate.getFullYear(), currentNavDate.getMonth() - 1, 1));
  };

  const isSelected = (day) => {
    if (!day || !dateRange.start) return false;
    const dStr = day.toISOString().split('T')[0];
    return dStr === dateRange.start || dStr === dateRange.end;
  };

  const isRange = (day) => {
    if (!day || !dateRange.start || !dateRange.end) return false;
    const dStr = day.toISOString().split('T')[0];
    return dStr > dateRange.start && dStr < dateRange.end;
  };

  const handleDayClick = (day) => {
    const dStr = day.toISOString().split('T')[0];
    if (selectedPreset !== 'Custom') {
      setSelectedPreset('Custom');
      setDateRange({ start: dStr, end: dStr });
    } else {
      if (dateRange.start === dateRange.end) {
        if (dStr < dateRange.start) setDateRange({ start: dStr, end: dateRange.end });
        else setDateRange({ start: dateRange.start, end: dStr });
        if(isMobile) setIsCalendarOpen(false);
      } else {
        setDateRange({ start: dStr, end: dStr });
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', zIndex: 100, flexWrap: 'wrap' }}>
      <div style={{ position: 'relative' }} ref={containerRef}>
        <button 
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: '#FFFFFF',
            padding: '0.6rem 1.25rem',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1E293B',
            outline: 'none',
            transition: 'all 0.2s',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-between' : 'flex-start'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar size={16} color="var(--primary-color, #4F46E5)" />
            <span>
              {selectedPreset === 'Custom' 
                ? `${formatDateDisplay(dateRange.start)} - ${formatDateDisplay(dateRange.end)}` 
                : `${selectedPreset} (${formatDateDisplay(dateRange.start)} - ${formatDateDisplay(dateRange.end)})`}
            </span>
          </div>
          <ChevronRight size={14} style={{ transform: isCalendarOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', opacity: 0.7 }} />
        </button>

        {isCalendarOpen && (
          <div style={{
            position: 'absolute',
            top: '48px',
            left: 0,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            zIndex: 1000,
            overflow: 'hidden',
            width: isMobile ? '100%' : '460px',
            minWidth: isMobile ? '280px' : '460px'
          }}>
            {/* Presets Sidebar */}
            <div style={{
              width: isMobile ? '100%' : '160px',
              borderRight: isMobile ? 'none' : '1px solid #E2E8F0',
              borderBottom: isMobile ? '1px solid #E2E8F0' : 'none',
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              backgroundColor: '#F8FAFC',
              padding: isMobile ? '0.5rem' : '0.5rem 0',
              overflowX: isMobile ? 'auto' : 'visible',
              scrollbarWidth: 'none' // Hide scrollbar for neatness
            }}>
              {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Custom'].map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  style={{
                    padding: '0.6rem 1rem',
                    border: 'none',
                    background: 'transparent',
                    textAlign: isMobile ? 'center' : 'left',
                    fontSize: '0.8125rem',
                    fontWeight: selectedPreset === preset ? '600' : '500',
                    color: selectedPreset === preset ? 'var(--primary-color, #4F46E5)' : '#64748B',
                    backgroundColor: selectedPreset === preset ? '#EEF2FF' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    width: isMobile ? 'max-content' : '100%',
                    whiteSpace: 'nowrap',
                    borderRadius: isMobile ? '6px' : '0'
                  }}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Calendar View Area */}
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '280px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <button type="button" onClick={prevMonth} style={{ border: 'none', background: '#F8FAFC', cursor: 'pointer', color: '#64748B', padding: '6px', borderRadius: '6px' }}>
                  <ChevronLeft size={16} />
                </button>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1E293B', userSelect: 'none' }}>
                  {currentNavDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button type="button" onClick={nextMonth} style={{ border: 'none', background: '#F8FAFC', cursor: 'pointer', color: '#64748B', padding: '6px', borderRadius: '6px' }}>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '4px' }}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                  <span key={d} style={{ fontSize: '0.75rem', fontWeight: '600', color: '#94A3B8' }}>{d}</span>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                {getDaysInMonth(currentNavDate).map((day, idx) => {
                  if (!day) return <div key={`empty-${idx}`}></div>;
                  
                  const isSel = isSelected(day);
                  const isInRange = isRange(day);
                  const isToday = day.toDateString() === new Date().toDateString();
                  
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleDayClick(day)}
                      style={{
                        padding: '0.4rem 0',
                        fontSize: '0.8rem',
                        fontWeight: isSel || isToday ? '700' : '500',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        backgroundColor: isSel 
                          ? 'var(--primary-color, #4F46E5)' 
                          : isInRange 
                            ? '#EEF2FF' 
                            : 'transparent',
                        color: isSel 
                          ? 'white' 
                          : isInRange 
                            ? 'var(--primary-color, #4F46E5)' 
                            : isToday 
                              ? 'var(--primary-color, #4F46E5)' 
                              : '#1E293B',
                        boxShadow: isToday && !isSel ? 'inset 0 0 0 1.5px var(--primary-color, #4F46E5)' : 'none'
                      }}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <select 
        value={assignTo}
        onChange={(e) => setAssignTo(e.target.value)}
        style={{ 
          padding: '0.6rem 2.5rem 0.6rem 1rem', 
          borderRadius: '8px', 
          border: '1px solid #E2E8F0', 
          fontSize: '0.875rem', 
          fontWeight: '600',
          color: '#1E293B',
          outline: 'none', 
          backgroundColor: '#FFFFFF',
          cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23475569\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '16px',
          width: isMobile ? '100%' : 'auto'
        }}>
        <option value="All">All Managers</option>
        <option value="Unassigned">Unassigned</option>
        <option value="Sarah Smith">Sarah Smith</option>
        <option value="Mike Johnson">Mike Johnson</option>
        <option value="Alex Wong">Alex Wong</option>
      </select>
    </div>
  );
}
