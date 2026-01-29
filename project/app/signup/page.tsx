"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Admin' });
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert("Account is created! Now Login.");
      router.push('/login');
    } catch (err) {
      alert("Error: Account is not created.");
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '350px', margin: 'auto', fontFamily: 'Arial' }}>
      <h2>📝 Create Account</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{padding: '10px'}} />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required style={{padding: '10px'}} />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required style={{padding: '10px'}} />
        <select onChange={(e) => setFormData({...formData, role: e.target.value})} style={{padding: '10px'}}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>Register</button>
      </form>
    </div>
  );
}