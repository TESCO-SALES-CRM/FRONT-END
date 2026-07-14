import React, { useState, useEffect } from 'react';
import { 
  Phone, Flame, CalendarCheck, FileText, DollarSign, TrendingUp, CheckCircle, Clock, 
  Plus, MoreVertical, MapPin, UploadCloud, DownloadCloud, Activity, Bell, ChevronRight, User, Trash,
  Calendar, ChevronLeft, XCircle, AlertCircle, ThumbsUp, Send, Flag, CheckCircle2, CalendarClock, PenTool, Snowflake, Thermometer, Sparkles, Users
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, FunnelChart, Funnel, LabelList
} from 'recharts';
import { useToast } from '../components/Toast';
import SectionHeader from '../components/SectionHeader';
import DateRangePicker from '../components/DateRangePicker';

// --- MOCK DATA ---
const pipelineData = [
  { name: 'Jan', value: 30 }, { name: 'Feb', value: 45 }, { name: 'Mar', value: 35 }, 
  { name: 'Apr', value: 60 }, { name: 'May', value: 55 }, { name: 'Jun', value: 80 }
];

const paymentsData = [
  { client: 'Wayne Ent.', amount: '₹5L', status: 'Advance Received', date: 'Oct 24' },
  { client: 'Daily Planet', amount: '₹2.1L', status: 'Overdue', date: 'Oct 15' },
];

// --- SUB-COMPONENTS ---
const KpiCard = ({ title, value, subtitle, icon: Icon, color, bg, borderColor, showChart }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', padding: '1.25rem', backgroundColor: bg || 'var(--surface-color)', border: `1px solid ${borderColor || 'var(--border-color)'}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500', margin: 0 }}>{title}</p>
      <Icon size={18} color={color} />
    </div>
    <div style={{ zIndex: 1 }}>
      <h3 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>{value}</h3>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>{subtitle}</span>
    </div>
    {showChart && (
      <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', right: '1.25rem', height: '30px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pipelineData}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
);

// --- MAIN DASHBOARD ---
const LEADS_API = 'http://localhost:5000/api/leads';
const APPTS_API = 'http://localhost:5000/api/appointments';
const QUOTES_API = 'http://localhost:5000/api/quotations';
const PROJECTS_API = 'http://localhost:5000/api/projects';

const DashboardHome = () => {
  const addToast = useToast();

  // Live lead data from API for KPI cards
  const [allLeads, setAllLeads] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  useEffect(() => {
    fetch(LEADS_API)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setAllLeads(d); })
      .catch(err => console.error('Dashboard failed to load leads:', err));
    fetch(APPTS_API)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setAllAppointments(d.map(a => ({ ...a, id: a._id || a.id }))); })
      .catch(err => console.error('Dashboard failed to load appointments:', err));
  }, []);

  const isNewStatus = (s) => {
    const x = (s || '').toLowerCase();
    return x.includes('new') || x.includes('received');
  };
  const countBy = (kw) => allLeads.filter(l => (l.status || '').toLowerCase().includes(kw)).length;

  const receivedLeadsCount = allLeads.length;
  const newLeadsCount = allLeads.filter(l => isNewStatus(l.status)).length;
  // Calls Made = leads that have moved OUT of "New" (Hot/Warm/Cold/etc.)
  const callsMadeCount = allLeads.filter(l => !isNewStatus(l.status)).length;
  const hotLeadsCount = countBy('hot');
  const warmLeadsCount = countBy('warm');
  const coldLeadsCount = countBy('cold');
  const junkLeadsCount = countBy('junk');
  const appointmentFixedCount = countBy('appointment');

  // Live lead-status pie data (replaces hardcoded leadStatusData)
  const liveLeadStatusData = [
    { name: 'Hot', value: hotLeadsCount, color: 'var(--danger-color)' },
    { name: 'Warm', value: warmLeadsCount, color: 'var(--warning-color)' },
    { name: 'Cold', value: coldLeadsCount, color: 'var(--primary-color)' },
    { name: 'Appointment Fixed', value: appointmentFixedCount, color: 'var(--success-color)' },
  ];

  // Live assigned-leads list (leads that have a manager assigned)
  const liveAssignedLeads = allLeads
    .filter(l => l.manager && l.manager !== 'Unassigned')
    .map(l => ({ name: l.name, priority: l.priority, manager: l.manager, status: l.status }));

  // Live quotations from the quotations API
  const [liveQuotes, setLiveQuotes] = useState([]);
  const [liveProjects, setLiveProjects] = useState([]);
  useEffect(() => {
    fetch(QUOTES_API)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setLiveQuotes(d); })
      .catch(err => console.error('Failed to load quotations:', err));
    fetch(PROJECTS_API)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setLiveProjects(d); })
      .catch(err => console.error('Failed to load projects:', err));
  }, []);

  // Live quotation count for the KPI card
  const quotationPreparedCount = liveQuotes.length;

  // Live appointments for the dashboard list (normalized)
  const liveAppointments = allAppointments.map(a => ({
    id: a.id,
    client: a.title || a.manager,
    type: a.type,
    time: a.timeStart,
    status: a.status
  }));
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });



  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
      
      {/* 1. Welcome Header Section */}
      <div className="glass-panel" style={{
        padding: '2rem', borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(49, 46, 129, 0.05) 0%, rgba(79, 70, 229, 0.1) 100%)',
        border: '1px solid rgba(49, 46, 129, 0.1)',
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Welcome Back, Akash 👋</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
            Manage construction leads, appointments, quotations, and project coordination efficiently.
          </p>
        </div>
      </div>

      {/* Date Picker Controls */}
      <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />

      
      {/* 2. KPI Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Leads Group */}
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '1rem' }}>Leads Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <KpiCard title="Total Leads" value={allAppointments.length || "11"} subtitle="All leads in system" icon={Users} color="#1E293B" bg="#F8FAFC" borderColor="#1E293B" />
            <KpiCard title="New Leads" value={receivedLeadsCount || "2"} subtitle="Freshly received" icon={Sparkles} color="#0EA5E9" bg="#F0F9FF" borderColor="#BAE6FD" />
            <KpiCard title="Hot Leads" value={hotLeadsCount || "1"} subtitle="High conversion chance" icon={Flame} color="#EF4444" bg="#FEF2F2" borderColor="#FECACA" />
            <KpiCard title="Warm Leads" value={warmLeadsCount || "2"} subtitle="Nurturing in progress" icon={Thermometer} color="#F59E0B" bg="#FFFBEB" borderColor="#FDE68A" />
            <KpiCard title="Cold Leads" value={coldLeadsCount || "1"} subtitle="Need re-engagement" icon={Snowflake} color="#64748B" bg="#F8FAFC" borderColor="#E2E8F0" />
            <KpiCard title="Appt. Fixed" value={appointmentFixedCount || "1"} subtitle="Meetings scheduled" icon={CalendarCheck} color="#22C55E" bg="#F0FDF4" borderColor="#BBF7D0" />
            <KpiCard title="Quotation Send" value={quotationPreparedCount || "2"} subtitle="Awaiting response" icon={FileText} color="#8B5CF6" bg="#F5F3FF" borderColor="#DDD6FE" />
            <KpiCard title="Order Confirmed" value={"1"} subtitle="Successfully closed" icon={CheckCircle2} color="#10B981" bg="#ECFDF5" borderColor="#A7F3D0" />
            <KpiCard title="Project Filing" value={"0"} subtitle="Handed over to ops" icon={PenTool} color="#3B82F6" bg="#EFF6FF" borderColor="#BFDBFE" />
            <KpiCard title="Junk" value={junkLeadsCount || "1"} subtitle="Unqualified leads" icon={Trash} color="#94A3B8" bg="#F1F5F9" borderColor="#E2E8F0" />
          </div>
        </div>

        {/* Appointments Group */}
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '1rem' }}>Appointments</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <KpiCard title="Total Appointments" value={"10"} subtitle="All scheduled appointments" icon={Calendar} color="#4F46E5" bg="#EEF2FF" borderColor="#C7D2FE" />
            <KpiCard title="Total Visit Planned" value={"8"} subtitle="Upcoming & pending visits" icon={CalendarClock} color="#0EA5E9" bg="#F0F9FF" borderColor="#BAE6FD" />
            <KpiCard title="Completed Appointments" value={"2"} subtitle="Successfully completed" icon={CheckCircle2} color="#22C55E" bg="#F0FDF4" borderColor="#BBF7D0" />
            <KpiCard title="Total Visit Complete" value={"1"} subtitle="Site visits wrapped up" icon={Flag} color="#F97316" bg="#FFF7ED" borderColor="#FED7AA" />
          </div>
        </div>

        {/* Quotations Group */}
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '1rem' }}>Quotations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <KpiCard title="Requested Quotations" value={"1"} subtitle="Draft & initial requests" icon={FileText} color="#4F46E5" bg="#EEF2FF" borderColor="#C7D2FE" />
            <KpiCard title="Pending Quotations" value={"1"} subtitle="Awaiting client/mgr approval" icon={Clock} color="#D97706" bg="#FFFBEB" borderColor="#FDE68A" />
            <KpiCard title="Completed Quotations" value={"0"} subtitle="Prepared & sent to clients" icon={Send} color="#0EA5E9" bg="#F0F9FF" borderColor="#BAE6FD" />
            <KpiCard title="Approved Quotations" value={"0"} subtitle="Accepted quotations" icon={ThumbsUp} color="#10B981" bg="#ECFDF5" borderColor="#A7F3D0" />
          </div>
        </div>

        {/* Payments Group */}
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '1rem' }}>Payments</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <KpiCard title="Total Collected" value="₹2.4Cr" subtitle="Total Collected" icon={CheckCircle2} color="#10B981" bg="#ECFDF5" borderColor="#A7F3D0" />
            <KpiCard title="Upcoming Dues" value="₹45L" subtitle="Upcoming Dues" icon={Clock} color="#6366F1" bg="#EEF2FF" borderColor="#C7D2FE" />
            <KpiCard title="Pending Payments" value="₹12L" subtitle="Pending Payments" icon={AlertCircle} color="#F59E0B" bg="#FFFBEB" borderColor="#FDE68A" />
            <KpiCard title="Overdue Payments" value="₹8.5L" subtitle="Overdue Payments" icon={XCircle} color="#EF4444" bg="#FEF2F2" borderColor="#FECACA" />
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardHome;

