"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Localhost hata kar Vercel URL dala hai
      const response = await axios.post('https://library-management-system-kappa-ten.vercel.app/api/auth/login', formData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert("🚀 Login Successful!");
        router.push('/dashboard'); // Ya jo bhi aapka main page hai
      }
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Invalid Credentials"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto', fontFamily: 'Arial' }}>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>🔑 Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Email" 
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
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '12px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}