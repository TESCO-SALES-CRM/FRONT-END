import React from 'react';
import { BarChart3, PieChart, TrendingUp, Users, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell } from 'recharts';
import { useToast } from '../components/Toast';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const leadData = [
  { name: 'Converted', value: 400 },
  { name: 'Lost', value: 150 },
  { name: 'In Progress', value: 300 },
];

const COLORS = ['var(--success-color)', '#ef4444', 'var(--warning-color)'];

const KpiWidget = ({ title, value, subtitle, icon: Icon, color }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
      <Icon size={18} />
      <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{title}</span>
    </div>
    <h3 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)' }}>{value}</h3>
    <span style={{ fontSize: '0.75rem', color: color, fontWeight: '500' }}>{subtitle}</span>
  </div>
);

const Reports = () => {
  const addToast = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Reports & Analytics</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select className="btn btn-outline" style={{ appearance: 'none', paddingRight: '2rem', cursor: 'pointer' }} onChange={(e) => addToast(`Data filtered by ${e.target.value}`)}>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }} onClick={() => addToast('Exporting Report as CSV...', 'success')}>
            <BarChart3 size={16} /> Export Report
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <KpiWidget title="Sales Pipeline" value="₹2.4M" subtitle="+15% from last month" icon={TrendingUp} color="var(--success-color)" />
        <KpiWidget title="Lead Conversion" value="28%" subtitle="+4% from last month" icon={Users} color="var(--success-color)" />
        <KpiWidget title="Quotation Value" value="₹1.8M" subtitle="-2% from last month" icon={DollarSign} color="var(--warning-color)" />
        <KpiWidget title="Success Rate" value="65%" subtitle="Consistent" icon={PieChart} color="var(--primary-color)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Revenue Trend</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="var(--primary-color)" fill="var(--primary-color)" fillOpacity={0.1} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Lead Analytics</h3>
          <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="80%">
              <RechartsPie>
                <Pie data={leadData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {leadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
               {leadData.map((entry, idx) => (
                 <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}>
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: COLORS[idx] }}></div>
                   {entry.name}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
