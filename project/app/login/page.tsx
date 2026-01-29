"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      alert("Login Successful!");
      
      if (res.data.role === 'Admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (err) {
      alert("Wrong Email ya Password!");
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '350px', margin: 'auto', textAlign: 'center', fontFamily: 'Arial' }}>
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required style={{padding: '10px'}} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={{padding: '10px'}} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}