import React, { useState } from 'react';
<<<<<<< HEAD
import { Search, Filter, User, Phone, MapPin, ChevronLeft, ChevronRight, CalendarCheck2, CalendarClock, CheckCircle2, Flag, X, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '../components/Toast';

const initialAppointments = [
  { id: 1, title: 'Initial Consultation', date: '2026-05-20', timeStart: '04:00 PM', timeEnd: '05:00 PM', manager: 'Priya Sharma', phone: '+91 87654 32109', location: 'Main Office', status: 'Waiting', type: 'Appointment' },
  { id: 2, title: 'Design Finalization', date: '2026-05-21', timeStart: '11:00 AM', timeEnd: '12:30 PM', manager: 'Rahul Gupta', phone: '+91 76543 21098', location: 'Virtual', status: 'Assigned', type: 'Appointment' },
  { id: 3, title: 'Site Survey', date: '2026-05-22', timeStart: '09:30 AM', timeEnd: '11:00 AM', manager: 'Sarah Smith', phone: '+91 98765 43210', location: 'Client Site, Block A', status: 'Completed', type: 'Visits' },
  { id: 4, title: 'Final Walkthrough', date: '2026-05-28', timeStart: '02:00 PM', timeEnd: '03:30 PM', manager: 'Alex Wong', phone: '+91 87654 12345', location: 'Project Site', status: 'Waiting', type: 'Visits' },
];

const STATUS_STYLES = {
  Waiting:   { bg: '#FEF3C7', color: '#92400E', label: 'WAITING' },
  Assigned:  { bg: '#D1FAE5', color: '#065F46', label: 'ASSIGNED' },
  Completed: { bg: '#DBEAFE', color: '#1E40AF', label: 'COMPLETED' },
  Started:   { bg: '#EDE9FE', color: '#5B21B6', label: 'STARTED' },
};

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function formatDisplayDate(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = MONTHS[d.getMonth()].slice(0,3).toUpperCase();
  const year = d.getFullYear();
  return `${day < 10 ? '0'+day : day} ${month} ${year}`;
}

const Appointments = () => {
  const addToast = useToast();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activeTab, setActiveTab] = useState('Appointment');
  const [searchQuery, setSearchQuery] = useState('');
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 4, 1)); // May 2026
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVisit, setNewVisit] = useState({ title: '', date: '', timeStart: '', timeEnd: '', manager: '', phone: '', location: '', status: 'Waiting', type: 'Appointment' });

  /* ── Live counts ── */
  const totalAppointments = appointments.length;
  const visitPlanned      = appointments.filter(a => a.status !== 'Completed').length;
  const completedAppt     = appointments.filter(a => a.status === 'Completed').length;
  const visitComplete     = appointments.filter(a => a.type === 'Visits' && a.status === 'Completed').length;

  /* ── Filter ── */
  const filtered = appointments.filter(a =>
    a.type === activeTab &&
    (a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     a.manager.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  /* ── Calendar helpers ── */
  const year  = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const apptDays = new Set(
    appointments
      .filter(a => {
        const d = new Date(a.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map(a => new Date(a.date).getDate())
  );

  const handleStart = (id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Started' } : a));
    addToast('Appointment started!', 'success');
  };

  const handleReschedule = (title) => addToast(`Rescheduling: ${title}`);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setAppointments(prev => [...prev, { ...newVisit, id: Date.now() }]);
    setIsModalOpen(false);
    setNewVisit({ title: '', date: '', timeStart: '', timeEnd: '', manager: '', phone: '', location: '', status: 'Waiting', type: 'Appointment' });
    addToast('Appointment scheduled!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── Page header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Appointments & Site Visits</h2>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
          <CalendarIcon size={16} /> Schedule Visit
        </button>
      </div>

      {/* ── 4 Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {[
          { label: 'Total Appointments', value: totalAppointments, Icon: CalendarCheck2, color: '#4F46E5', bg: '#EEF4FF', border: '#C7D2FE', sub: 'All scheduled appointments' },
          { label: 'Total Visit Planned', value: visitPlanned,     Icon: CalendarClock,  color: '#0EA5E9', bg: '#F0F9FF', border: '#BAE6FD', sub: 'Upcoming & pending visits' },
          { label: 'Completed Appointments', value: completedAppt, Icon: CheckCircle2,   color: '#22C55E', bg: '#ECFDF5', border: '#BBF7D0', sub: 'Successfully completed' },
          { label: 'Total Visit Complete',  value: visitComplete,  Icon: Flag,           color: '#F97316', bg: '#FFF7ED', border: '#FED7AA', sub: 'Site visits wrapped up' },
        ].map(({ label, value, Icon, color, bg, border, sub }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', backgroundColor: bg, border: `1px solid ${border}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)', borderRadius: 'var(--radius-lg)', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500', margin: 0 }}>{label}</p>
              <Icon size={18} color={color} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>{value}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main 2-col layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>

        {/* ── LEFT: List ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Tabs + Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '9999px', padding: '4px', gap: '4px' }}>
              {['Appointment', 'Visits'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '0.4rem 1.25rem', borderRadius: '9999px', border: 'none', cursor: 'pointer',
                  fontWeight: '600', fontSize: '0.875rem', transition: 'all 0.2s',
                  background: activeTab === tab ? 'var(--primary-color)' : 'transparent',
                  color: activeTab === tab ? '#fff' : 'var(--text-muted)',
                }}>
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                <input
                  type="text" placeholder="Search..." value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ padding: '0.45rem 1rem 0.45rem 2.25rem', borderRadius: '9999px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.875rem', width: '220px', backgroundColor: 'var(--surface-color)' }}
                />
              </div>
              <button style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '9999px', padding: '0.45rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
                <Filter size={15} />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border-color)' }} />

          {/* Cards */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No {activeTab.toLowerCase()}s found.</div>
          )}
          {filtered.map(apt => {
            const s = STATUS_STYLES[apt.status] || STATUS_STYLES.Waiting;
            return (
              <div key={apt.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                {/* Date block */}
                <div style={{ minWidth: '110px' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>{formatDisplayDate(apt.date)}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>{apt.timeStart} - {apt.timeEnd}</div>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '56px', background: 'var(--border-color)', flexShrink: 0 }} />

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)' }}>{apt.title}</span>
                    <span style={{ padding: '0.15rem 0.65rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.5px', backgroundColor: s.bg, color: s.color }}>
                      {s.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <User size={12} /> {apt.manager}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Phone size={12} /> {apt.phone}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <MapPin size={12} /> {apt.location}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end', minWidth: '120px' }}>
                  <button
                    onClick={() => handleReschedule(apt.title)}
                    style={{ padding: '0.35rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'transparent', fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-main)', cursor: 'pointer', width: '100%' }}
                  >
                    Reschedule
                  </button>
                </div>
=======
import { Calendar as CalendarIcon, MapPin, Clock, Edit2, User, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../components/Toast';

const initialAppointmentsData = [
  { id: 1, client: 'Acme Corp', projectType: 'Office Renovation', location: '123 Tech Park, Block C', date: 'Oct 24, 2026', time: '10:00 AM', manager: 'Mike Johnson', status: 'Confirmed' },
  { id: 2, client: 'John Doe', projectType: 'Residential Villa', location: '45 Beverly Hills, Plot 12', date: 'Oct 24, 2026', time: '2:30 PM', manager: 'Sarah Smith', status: 'Pending Confirmation' },
  { id: 3, client: 'Stark Industries', projectType: 'Warehouse Build', location: 'Industrial Area Phase 2', date: 'Oct 25, 2026', time: '11:00 AM', manager: 'Alex Wong', status: 'Confirmed' },
];

const Appointments = () => {
  const addToast = useToast();
  const [appointments, setAppointments] = useState(initialAppointmentsData);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVisit, setNewVisit] = useState({ client: '', projectType: '', location: '', date: '', time: '', manager: 'Unassigned', status: 'Pending Confirmation' });

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!newVisit.client || !newVisit.date) return;
    
    const d = new Date(newVisit.date);
    const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const visit = {
      ...newVisit,
      id: Date.now(),
      date: formattedDate !== 'Invalid Date' ? formattedDate : newVisit.date
    };
    
    setAppointments([...appointments, visit]);
    setIsModalOpen(false);
    setNewVisit({ client: '', projectType: '', location: '', date: '', time: '', manager: 'Unassigned', status: 'Pending Confirmation' });
    addToast('Visit scheduled successfully!');
  };

  const renderCalendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = Array.from({length: 31}, (_, i) => i + 1);
    
    return (
      <div className="card" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>October 2026</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-outline" style={{ padding: '0.25rem' }}><ChevronLeft size={16} /></button>
            <button className="btn btn-outline" style={{ padding: '0.25rem' }}><ChevronRight size={16} /></button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          {days.map(d => <div key={d}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', flex: 1, minHeight: '600px' }}>
          {Array.from({length: 4}).map((_, i) => <div key={`empty-${i}`} />)}
          {dates.map(date => {
            const dayAppts = appointments.filter(a => a.date.includes(`Oct ${date},`) || a.date.includes(`Oct ${date < 10 ? '0'+date : date},`));
            
            return (
              <div key={date} style={{ 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)', 
                padding: '0.5rem',
                minHeight: '80px',
                display: 'flex', flexDirection: 'column', gap: '0.25rem',
                backgroundColor: dayAppts.length > 0 ? '#F8FAFC' : 'transparent'
              }}>
                <div style={{ fontWeight: '500', color: dayAppts.length > 0 ? 'var(--primary-color)' : 'var(--text-main)' }}>{date}</div>
                {dayAppts.map(apt => (
                  <div key={apt.id} style={{ fontSize: '0.65rem', backgroundColor: 'var(--primary-color)', color: 'white', padding: '0.15rem 0.25rem', borderRadius: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {apt.time} - {apt.client}
                  </div>
                ))}
>>>>>>> 7de2f04a0609998f838860361518918c881edffb
              </div>
            );
          })}
        </div>
<<<<<<< HEAD

        {/* ── RIGHT: Calendar + Summary ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            {/* Calendar header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)' }}>Calendar View</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => setCalendarDate(new Date(year, month - 1, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  <ChevronLeft size={16} />
                </button>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary-color)', whiteSpace: 'nowrap' }}>
                  {MONTHS[month].slice(0, 3)} {year}
                </span>
                <button onClick={() => setCalendarDate(new Date(year, month + 1, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '0.5rem' }}>
              {DAYS.map(d => (
                <div key={d} style={{ fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-muted)', padding: '0.25rem 0' }}>{d}</div>
              ))}
            </div>

            {/* Day grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const hasAppt = apptDays.has(day);
                const today = new Date();
                const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
                return (
                  <div key={day} style={{ textAlign: 'center', padding: '0.35rem 0', borderRadius: 'var(--radius-sm)', position: 'relative', cursor: hasAppt ? 'pointer' : 'default', background: isToday ? 'var(--primary-color)' : 'transparent' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: isToday ? '700' : hasAppt ? '600' : '400', color: isToday ? '#fff' : hasAppt ? 'var(--primary-color)' : 'var(--text-main)' }}>
                      {day}
                    </span>
                    {hasAppt && !isToday && (
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary-color)', margin: '2px auto 0' }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Summary */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>Quick Summary</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: 'Tomorrow', detail: `${appointments.filter(a => a.type === 'Visits').length} Site Visits` },
                  { label: 'This Week', detail: `${appointments.filter(a => a.status === 'Assigned').length} Office Meeting${appointments.filter(a => a.status === 'Assigned').length !== 1 ? 's' : ''}` },
                  { label: 'Pending', detail: `${appointments.filter(a => a.status === 'Waiting').length} Awaiting Confirmation` },
                ].map(({ label, detail }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-color)', marginTop: '5px', flexShrink: 0 }} />
                    <span><strong style={{ color: 'var(--text-main)' }}>{label}:</strong> {detail}</span>
                  </div>
                ))}
=======
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Appointments & Site Visits</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
          >
            {viewMode === 'list' ? 'View Calendar' : 'View List'}
          </button>
          <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
            <CalendarIcon size={16} /> Schedule Visit
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        renderCalendar()
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Upcoming Visits</h3>
            {appointments.map((apt) => (
              <div key={apt.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{
                    width: '60px', height: '60px', borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--primary-color)', color: 'white',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1 }}>{apt.date.split(' ')[1]?.replace(',','') || 'XX'}</span>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>{apt.date.split(' ')[0] || 'XXX'}</span>
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>{apt.client}</h4>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{apt.projectType}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <Clock size={12} /> {apt.time}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <MapPin size={12} /> {apt.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                  <span className={`badge ${apt.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>{apt.status}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => addToast(`Rescheduling appointment for ${apt.client}`)}>Reschedule</button>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => addToast(`Viewing details for ${apt.client}`)}>Details</button>
                  </div>
                </div>
              </div>
            ))}
            {appointments.length === 0 && <p>No upcoming visits.</p>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', margin: '0 0 1rem 0' }}>Mini Calendar</h3>
              <div style={{ height: '200px', backgroundColor: '#F1F5F9', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                Calendar Widget Placeholder
              </div>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', margin: '0 0 1rem 0' }}>Map Preview</h3>
              <div style={{ height: '200px', backgroundColor: '#E2E8F0', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', overflow: 'hidden', position: 'relative' }}>
                 <MapPin size={32} color="var(--primary-color)" />
                 <div style={{ position: 'absolute', bottom: '1rem', backgroundColor: 'rgba(255,255,255,0.9)', padding: '0.5rem', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', fontWeight: '500' }}>
                   {appointments.length > 0 ? appointments[0].location : 'No Locations'}
                 </div>
>>>>>>> 7de2f04a0609998f838860361518918c881edffb
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
      </div>

      {/* ── Schedule Modal ── */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '480px', maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Schedule New Visit</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Title', key: 'title', type: 'text', required: true },
                { label: 'Manager Name', key: 'manager', type: 'text', required: true },
                { label: 'Phone', key: 'phone', type: 'text', required: true },
                { label: 'Location', key: 'location', type: 'text', required: true },
              ].map(({ label, key, type, required }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.4rem' }}>{label}</label>
                  <input type={type} value={newVisit[key]} onChange={e => setNewVisit({ ...newVisit, [key]: e.target.value })}
                    required={required}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.875rem' }} />
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.4rem' }}>Date</label>
                  <input type="date" value={newVisit.date} onChange={e => setNewVisit({ ...newVisit, date: e.target.value })} required style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.875rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.4rem' }}>Start Time</label>
                  <input type="time" value={newVisit.timeStart} onChange={e => setNewVisit({ ...newVisit, timeStart: e.target.value })} required style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.875rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.4rem' }}>End Time</label>
                  <input type="time" value={newVisit.timeEnd} onChange={e => setNewVisit({ ...newVisit, timeEnd: e.target.value })} required style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.875rem' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.4rem' }}>Type</label>
                  <select value={newVisit.type} onChange={e => setNewVisit({ ...newVisit, type: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.875rem', backgroundColor: 'var(--surface-color)' }}>
                    <option>Appointment</option>
                    <option>Visits</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.4rem' }}>Status</label>
                  <select value={newVisit.status} onChange={e => setNewVisit({ ...newVisit, status: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.875rem', backgroundColor: 'var(--surface-color)' }}>
                    <option>Waiting</option>
                    <option>Assigned</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
=======
      )}

      {/* Schedule Visit Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '450px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Schedule New Visit</h3>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleScheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Client Name</label>
                <input type="text" value={newVisit.client} onChange={e => setNewVisit({...newVisit, client: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Project Type</label>
                <input type="text" value={newVisit.projectType} onChange={e => setNewVisit({...newVisit, projectType: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Date</label>
                  <input type="date" value={newVisit.date} onChange={e => setNewVisit({...newVisit, date: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Time</label>
                  <input type="time" value={newVisit.time} onChange={e => setNewVisit({...newVisit, time: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} required />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Location</label>
                <input type="text" value={newVisit.location} onChange={e => setNewVisit({...newVisit, location: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Assign To</label>
                <select value={newVisit.manager} onChange={e => setNewVisit({...newVisit, manager: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'var(--surface-color)' }}>
                  <option>Unassigned</option>
                  <option>Sarah Smith</option>
                  <option>Mike Johnson</option>
                  <option>Alex Wong</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
>>>>>>> 7de2f04a0609998f838860361518918c881edffb
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Schedule Visit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
