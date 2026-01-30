"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Admin' });
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      // ✅ Naya Backend URL yahan update kar diya gaya hai
      await axios.post('https://library-management-system-uh23.vercel.app/api/auth/signup', formData);
      alert("Account Created! Now Login.");
      router.push('/login');
    } catch (err) {
      console.error(err);
      alert("Error: Account not created.");
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '350px', margin: 'auto' }}>
      <h2>📝 Register</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{padding: '10px'}} />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required style={{padding: '10px'}} />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required style={{padding: '10px'}} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>Register</button>
      </form>
    </div>
  );
}