import React from 'react';
import { DollarSign, AlertCircle, CheckCircle, TrendingUp, DownloadCloud } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '../components/Toast';

const paymentData = [
  { id: 'INV-2026-01', client: 'Acme Corp', due: 'Oct 15, 2026', amount: '₹150,000', status: 'Overdue' },
  { id: 'INV-2026-02', client: 'Globex Inc', due: 'Oct 30, 2026', amount: '₹425,000', status: 'Pending' },
  { id: 'INV-2026-03', client: 'Stark Industries', due: 'Oct 10, 2026', amount: '₹600,000', status: 'Received' },
];

const chartData = [
  { name: 'Week 1', collected: 120000 },
  { name: 'Week 2', collected: 250000 },
  { name: 'Week 3', collected: 180000 },
  { name: 'Week 4', collected: 300000 },
];

const KpiCard = ({ title, value, icon: Icon, color }) => (
  <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <div style={{
      width: '48px', height: '48px', borderRadius: 'var(--radius-lg)',
      backgroundColor: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <Icon size={24} />
    </div>
    <div>
      <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{title}</p>
      <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>{value}</h3>
    </div>
  </div>
);

const Payments = () => {
  const addToast = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Payment Collection</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <KpiCard title="Total Collected" value="₹1.25M" icon={CheckCircle} color="var(--success-color)" />
        <KpiCard title="Advance Payments" value="₹450K" icon={TrendingUp} color="var(--primary-color)" />
        <KpiCard title="Pending Collection" value="₹850K" icon={DollarSign} color="var(--warning-color)" />
        <KpiCard title="Overdue Payments" value="₹150K" icon={AlertCircle} color="#DC2626" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Recent Invoices</h3>
            <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }} onClick={() => addToast('Opening full invoice list...')}>View All</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#F8FAFC' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Invoice Number</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Customer Name</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Due Date</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Amount</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((inv, index) => (
                <tr key={inv.id} style={{ borderBottom: index === paymentData.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary-color)' }}>{inv.id}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '500' }}>{inv.client}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{inv.due}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600' }}>{inv.amount}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className={`badge ${inv.status === 'Overdue' ? 'badge-danger' : inv.status === 'Received' ? 'badge-success' : 'badge-warning'}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Collection Trend</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="collected" fill="var(--success-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', display: 'flex', gap: '0.5rem', justifyContent: 'center' }} onClick={() => addToast('Generating Financial Report PDF...', 'success')}>
            <DownloadCloud size={16} /> Generate Financial Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
