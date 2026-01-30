"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://library-management-system-kappa-ten.vercel.app/api/auth/login', formData);
      alert("Login Successful!");
      router.push('/'); 
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '350px', margin: 'auto' }}>
      <h2>🔑 Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required style={{padding: '10px'}} />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required style={{padding: '10px'}} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>Login</button>
      </form>
    </div>
  );
}