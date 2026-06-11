// Mock API Client for Frontend Development

const MOCK_DELAY = 800;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const setSession = (token, user) => {
  localStorage.setItem('crm_token', token);
  localStorage.setItem('crm_authenticated', 'true');
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem('crm_token');
  localStorage.removeItem('crm_authenticated');
  localStorage.removeItem('user');
};

export const getSession = () => {
  return {
    token: localStorage.getItem('crm_token'),
    user: JSON.parse(localStorage.getItem('user') || 'null')
  };
};

// Mock Auth API
export const authApi = {
  login: async (role, email, password) => {
    await delay(MOCK_DELAY);
    
    // Simulate successful login for any email for dev purposes
    if (email && password) {
      return {
        token: 'mock-jwt-token-12345',
        user: {
          id: 1,
          email,
          role,
          name: email.split('@')[0]
        }
      };
    }
    throw new Error('Invalid email or password');
  },

  forgotPassword: async (email) => {
    await delay(MOCK_DELAY);
    // Return a mock OTP in dev mode
    return { devOtp: '123456' };
  },

  verifyOtp: async (email, otp) => {
    await delay(MOCK_DELAY);
    if (otp !== '123456') {
      throw new Error('Invalid OTP');
    }
    return { success: true };
  },

  resetPassword: async (email, otp, newPassword) => {
    await delay(MOCK_DELAY);
    if (otp !== '123456') {
      throw new Error('Invalid or expired OTP');
    }
    return { success: true };
  }
};
