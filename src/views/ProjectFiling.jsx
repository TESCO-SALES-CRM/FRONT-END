import React from 'react';
import { FolderOpen, File, UploadCloud, Users, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '../components/Toast';

const projectsData = [
  { id: 'PRJ-901', client: 'Acme Corp', type: 'Office Renovation', quote: '₹500,000', team: 'Execution Team Alpha', status: 'Handover Pending', files: 12 },
  { id: 'PRJ-902', client: 'Globex Inc', type: 'Residential Villa', quote: '₹850,000', team: 'Design Team B', status: 'Project File Created', files: 4 },
];

const TimelineStep = ({ label, active, completed }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1, position: 'relative' }}>
    <div style={{
      width: '24px', height: '24px', borderRadius: '50%', zIndex: 1,
      backgroundColor: completed ? 'var(--success-color)' : active ? 'var(--surface-color)' : 'var(--surface-color)',
      border: completed ? 'none' : active ? '2px solid var(--warning-color)' : '2px solid var(--border-color)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
    }}>
      {completed ? <CheckCircle size={14} /> : active ? <Clock size={14} color="var(--warning-color)" /> : null}
    </div>
    <span style={{ fontSize: '0.75rem', textAlign: 'center', color: active || completed ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: active || completed ? '600' : '400' }}>
      {label}
    </span>
  </div>
);

const ProjectFiling = () => {
  const addToast = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Project Filing</h2>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }} onClick={() => addToast('Opening New Project File modal...')}>
          <FolderOpen size={16} /> New Project File
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '1.5rem' }}>
        {projectsData.map((project) => (
          <div key={project.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: 'var(--primary-color)' }}>{project.id}</h3>
                <h4 style={{ margin: '0.25rem 0', fontSize: '1rem', fontWeight: '500' }}>{project.client}</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>{project.type}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-success" style={{ marginBottom: '0.25rem' }}>{project.status}</span>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600' }}>Quote: {project.quote}</p>
              </div>
            </div>

            <div style={{ position: 'relative', display: 'flex', marginTop: '0.5rem' }}>
               <div style={{ position: 'absolute', top: '12px', left: '10%', right: '10%', height: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 }}></div>
               <TimelineStep label="Quotation Approved" completed={true} />
               <TimelineStep label="Advance Payment" completed={true} />
               <TimelineStep label="Project File Created" completed={project.status === 'Handover Pending'} active={project.status === 'Project File Created'} />
               <TimelineStep label="Handover Pending" completed={false} active={project.status === 'Handover Pending'} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', backgroundColor: 'var(--background-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Users size={16} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{project.team}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <File size={16} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{project.files} Documents Uploaded</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem' }} onClick={() => addToast(`Opening file picker for ${project.id}`)}>
                  <UploadCloud size={14} /> Upload Files
                </button>
                <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => addToast(`Viewing documents for ${project.id}`)}>
                  View Documents
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectFiling;
