import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
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

  const handleOAuthLogin = (provider) => {
    localStorage.setItem('crm_authenticated', 'true');
    addToast(`Successfully authenticated via ${provider}!`, 'success');
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
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.125rem'
              }}>
                N
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
                  <CheckCircle2 size={16} color="#10B981" fill="#D1FAE5" />
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
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #CBD5E1',
                      outline: 'none',
                      fontSize: '0.875rem',
                      color: '#0F172A',
                      backgroundColor: '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="Executive">Executive</option>
                    <option value="Admin">Administrator</option>
                  </select>
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
                    <Mail size={16} color="#94A3B8" style={{ position: 'absolute', right: '12px' }} />
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

                {/* Divider */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  margin: '0.5rem 0'
                }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '500' }}>Or continue with</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
                </div>

                {/* OAuth Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {/* Google */}
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('Google')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.625rem',
                      border: '1px solid #CBD5E1',
                      borderRadius: '0.5rem',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.8125rem',
                      fontWeight: '600',
                      color: '#334155',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" style={{ marginRight: '8px' }}>
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    Google
                  </button>

                  {/* Microsoft */}
                  <button
                    type="button"
                    onClick={() => handleOAuthLogin('Microsoft')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.625rem',
                      border: '1px solid #CBD5E1',
                      borderRadius: '0.5rem',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.8125rem',
                      fontWeight: '600',
                      color: '#334155',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  >
                    <svg viewBox="0 0 23 23" width="16" height="16" style={{ marginRight: '8px' }}>
                      <path fill="#f35325" d="M0 0h11v11H0z"/>
                      <path fill="#81bc06" d="M12 0h11v11H12z"/>
                      <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                      <path fill="#ffba08" d="M12 12h11v11H12z"/>
                    </svg>
                    Microsoft
                  </button>
                </div>

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
