import React, { useState } from 'react';
import { Calendar, ChevronRight, ChevronLeft } from 'lucide-react';

const DateRangePicker = ({ dateRange, setDateRange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('Last 30 Days');
  const [rangeSelectionState, setRangeSelectionState] = useState('start');
  const [currentNavDate, setCurrentNavDate] = useState(new Date());

  const applyPreset = (presetName) => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch (presetName) {
      case 'Today':
        start = today;
        end = today;
        break;
      case 'Yesterday':
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        start = yesterday;
        end = yesterday;
        break;
      case 'Last 7 Days':
        const last7 = new Date();
        last7.setDate(today.getDate() - 7);
        start = last7;
        end = today;
        break;
      case 'Last 30 Days':
        const last30 = new Date();
        last30.setDate(today.getDate() - 30);
        start = last30;
        end = today;
        break;
      case 'This Month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      default:
        break;
    }

    setSelectedPreset(presetName);
    if (presetName !== 'Custom') {
      setDateRange({
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
      });
      setIsCalendarOpen(false);
    }
  };

  const prevMonth = () => {
    setCurrentNavDate(new Date(currentNavDate.getFullYear(), currentNavDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentNavDate(new Date(currentNavDate.getFullYear(), currentNavDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= numDays; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isSelected = (day) => {
    if (!day) return false;
    const formatted = day.toISOString().split('T')[0];
    return formatted === dateRange.start || formatted === dateRange.end;
  };

  const isRange = (day) => {
    if (!day || !dateRange.start || !dateRange.end) return false;
    const formatted = day.toISOString().split('T')[0];
    return formatted > dateRange.start && formatted < dateRange.end;
  };

  const handleDayClick = (day) => {
    if (!day) return;
    const formatted = day.toISOString().split('T')[0];
    
    if (!rangeSelectionState || rangeSelectionState === 'start') {
      setDateRange({ start: formatted, end: '' });
      setRangeSelectionState('end');
      setSelectedPreset('Custom');
    } else {
      if (formatted < dateRange.start) {
        setDateRange({ start: formatted, end: dateRange.start });
      } else {
        setDateRange({ ...dateRange, end: formatted });
      }
      setRangeSelectionState('start');
      setIsCalendarOpen(false);
    }
  };

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 50 }}>
      <button 
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--surface-color)',
          padding: '0.6rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '600',
          color: 'var(--text-main)',
          outline: 'none',
          transition: 'all 0.2s'
        }}
      >
        <Calendar size={16} color="var(--primary-color)" />
        <span>
          {selectedPreset === 'Custom' 
            ? `${formatDateDisplay(dateRange.start)} - ${formatDateDisplay(dateRange.end)}` 
            : `${selectedPreset} (${formatDateDisplay(dateRange.start)} - ${formatDateDisplay(dateRange.end)})`}
        </span>
        <ChevronRight size={14} style={{ transform: isCalendarOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', opacity: 0.7 }} />
      </button>

      {isCalendarOpen && (
        <div style={{
          position: 'absolute',
          top: '48px',
          right: 0,
          backgroundColor: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          zIndex: 100,
          overflow: 'hidden',
          minWidth: '460px'
        }}>
          {/* Presets Sidebar */}
          <div style={{
            width: '160px',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F8FAFC',
            padding: '0.5rem 0'
          }}>
            {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Custom'].map(preset => (
              <button
                key={preset}
                onClick={() => applyPreset(preset)}
                style={{
                  padding: '0.6rem 1rem',
                  border: 'none',
                  background: 'transparent',
                  textAlign: 'left',
                  fontSize: '0.8125rem',
                  fontWeight: selectedPreset === preset ? '600' : '500',
                  color: selectedPreset === preset ? 'var(--primary-color)' : 'var(--text-muted)',
                  backgroundColor: selectedPreset === preset ? '#EEF2FF' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  width: '100%'
                }}
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Calendar View Area */}
          <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '300px' }}>
            
            {/* Header Navigator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <button 
                onClick={prevMonth}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '4px', borderRadius: '4px' }}
              >
                <ChevronLeft size={16} />
              </button>
              <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)' }}>
                {currentNavDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button 
                onClick={nextMonth}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '4px', borderRadius: '4px' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Weekdays Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '4px' }}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <span key={d} style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>{d}</span>
              ))}
            </div>

            {/* Days Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {getDaysInMonth(currentNavDate).map((day, idx) => {
                if (!day) return <div key={`empty-${idx}`}></div>;
                
                const isDaySelected = isSelected(day);
                const isDayInRange = isRange(day);
                const today = new Date();
                const isToday = today.getDate() === day.getDate() && today.getMonth() === day.getMonth() && today.getFullYear() === day.getFullYear();

                return (
                  <button
                    key={idx}
                    onClick={() => handleDayClick(day)}
                    style={{
                      border: 'none',
                      background: isDaySelected ? 'var(--primary-color)' : isDayInRange ? '#EEF2FF' : 'transparent',
                      color: isDaySelected ? '#fff' : isDayInRange ? 'var(--primary-color)' : 'var(--text-main)',
                      padding: '0.4rem 0',
                      borderRadius: isDaySelected ? 'var(--radius-sm)' : '0',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      fontWeight: isDaySelected || isToday ? '600' : '500',
                      transition: 'all 0.1s'
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
  );
};

export default DateRangePicker;
