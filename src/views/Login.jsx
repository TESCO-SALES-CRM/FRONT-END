import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, AtSign, ChevronDown } from 'lucide-react';
import { useToast } from '../components/Toast';

const Login = () => {
  const navigate = useNavigate();
  const addToast = useToast();
  
  const [role, setRole] = useState('Sales Manager');
  const [email, setEmail] = useState('akash@nexus.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please fill in all fields', 'warning');
      return;
    }
    
    // Simulate successful login
    localStorage.setItem('crm_authenticated', 'true');
    addToast('Welcome back to Nexus CRM!', 'success');
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#F8FAFC',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Main Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          width: '100%',
          alignItems: 'center'
        }}>
          
          {/* Left Panel: Hero Card */}
          <div style={{
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
            border: '1px solid rgba(191, 219, 254, 0.4)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            boxShadow: '0 4px 20px -2px rgba(191, 219, 254, 0.3)'
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1E1B4B', letterSpacing: '-0.3px' }}>
                Nexus CRM
              </span>
            </div>

            {/* Title & Copy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h1 style={{
                fontSize: '2.25rem',
                fontWeight: '800',
                color: '#1E1B4B',
                lineHeight: '1.2',
                letterSpacing: '-1px',
                margin: 0
              }}>
                Manage Sales<br />Workflow Smarter
              </h1>
              <p style={{
                fontSize: '0.875rem',
                color: '#475569',
                lineHeight: '1.6',
                margin: 0
              }}>
                Track leads, appointments, quotations, payments, and project handovers from one powerful CRM platform.
              </p>
            </div>

            {/* Dashboard Mockup Image */}
            <div style={{
              position: 'relative',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 10px 30px -5px rgba(30, 27, 75, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              aspectRatio: '1.1',
              backgroundColor: '#1E1B4B'
            }}>
              <img 
                src="/login_dashboard_preview.png" 
                alt="Nexus CRM Dashboard Preview" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Checklist */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginTop: '0.5rem'
            }}>
              {[
                'Lead Tracking',
                'Appointment Management',
                'Quotation Workflow',
                'Payment Collection',
                'Project Handover'
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    color: '#1E1B4B'
                  }}
                  // If odd last item spans full row
                  className={idx === 4 ? 'span-full' : ''}
                >
                  <CheckCircle2 size={16} color="#2563EB" fill="#DBEAFE" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Panel: Login Form Card */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#FFFFFF',
              borderRadius: '1.25rem',
              padding: '2.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 10px 15px -3px rgba(0, 0, 0, 0.03)',
              border: '1px solid #E2E8F0'
            }}>
              {/* Header */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '800',
                  color: '#0F172A',
                  margin: '0 0 0.5rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Welcome Back 👋
                </h2>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#64748B',
                  margin: 0
                }}>
                  Login to continue managing your sales workflow.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Select Role */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    color: '#475569',
                    marginBottom: '0.5rem'
                  }}>
                    Select Role
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.5rem 0.75rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #CBD5E1',
                        outline: 'none',
                        fontSize: '0.875rem',
                        color: '#0F172A',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none'
                      }}
                    >
                      <option value="Sales Manager">Sales Manager</option>
                      <option value="Executive">Executive</option>
                      <option value="Admin">Administrator</option>
                    </select>
                    <ChevronDown size={16} color="#94A3B8" style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Email / Employee ID */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    color: '#475569',
                    marginBottom: '0.5rem'
                  }}>
                    Email / Employee ID
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                      required
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. akash@nexus.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.5rem 0.75rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #CBD5E1',
                        outline: 'none',
                        fontSize: '0.875rem',
                        color: '#0F172A',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                      onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                    />
                    <AtSign size={16} color="#94A3B8" style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    color: '#475569',
                    marginBottom: '0.5rem'
                  }}>
                    Password
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.5rem 0.75rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #CBD5E1',
                        outline: 'none',
                        fontSize: '0.875rem',
                        color: '#0F172A',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                      onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0
                      }}
                    >
                      {showPassword ? <EyeOff size={16} color="#94A3B8" /> : <Eye size={16} color="#94A3B8" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#64748B' }}>
                    <input 
                      type="checkbox" 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)} 
                      style={{ accentColor: '#4F46E5' }} 
                    />
                    Remember Me
                  </label>
                  <a 
                    href="#forgot" 
                    onClick={(e) => { e.preventDefault(); addToast('Password reset link sent to your email!', 'info'); }}
                    style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: '600' }}
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4F46E5',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.875rem',
                    fontWeight: '700',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
                    marginTop: '0.5rem'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4338CA'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4F46E5'}
                >
                  Login to Dashboard
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #E2E8F0',
        padding: '1.5rem',
        backgroundColor: '#FFFFFF'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          fontSize: '0.75rem',
          color: '#64748B',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <span>&copy; 2024 Nexus CRM. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem', fontWeight: '500' }}>
            <a href="#privacy" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#security" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Security</a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
