"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Admin' });
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://library-management-system-kappa-ten.vercel.app/api/auth/signup', formData);
      
      if (response.status === 201 || response.status === 200) {
        alert("🎉 Account created successfully! Now Login.");
        router.push('/login');
      }
    } catch (err) {
      console.error("Signup Error Details:", err.response?.data || err.message);
      alert(`Error: ${err.response?.data?.message || "Account is not created. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto', fontFamily: 'Arial' }}>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>📝 Create Account</h2>
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Full Name" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
            style={{padding: '12px', borderRadius: '5px', border: '1px solid #ccc'}} 
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
            style={{padding: '12px', borderRadius: '5px', border: '1px solid #ccc'}} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
            style={{padding: '12px', borderRadius: '5px', border: '1px solid #ccc'}} 
          />
          <label style={{ fontSize: '14px', color: '#666' }}>Select Role:</label>
          <select 
            onChange={(e) => setFormData({...formData, role: e.target.value})} 
            style={{padding: '12px', borderRadius: '5px', border: '1px solid #ccc'}}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '12px', 
              backgroundColor: loading ? '#ccc' : '#28a745', 
              color: 'white', 
              border: 'none', 
              cursor: loading ? 'not-allowed' : 'pointer',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
          Already have an account? <span onClick={() => router.push('/login')} style={{ color: '#007bff', cursor: 'pointer' }}>Login here</span>
        </p>
      </div>
    </div>
  );
}