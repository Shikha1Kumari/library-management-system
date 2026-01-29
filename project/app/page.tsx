"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data);
      } catch (err) {
        console.error("Unable to fetch Data:", err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>📚 Library Dashboard</h1>
      
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Link href="/login" style={{ padding: '10px', background: '#333', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>
          Admin Login
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              
              <Link href={`/book/${book._id}`} style={{ textDecoration: 'none' }}>
                <h3 style={{ color: '#0070f3', cursor: 'pointer', margin: '0 0 10px 0' }}>
                  {book.title} 🔗
                </h3>
              </Link>

              <p style={{ margin: '5px 0' }}><strong>Author:</strong> {book.author}</p>
              <p style={{ margin: '5px 0' }}><strong>Category:</strong> {book.category}</p>
              <b style={{ color: book.available ? 'green' : 'red' }}>
                {book.available ? "● Available" : "● Borrowed"}
              </b>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>Didn't found any book. Check backend.</p>
        )}
      </div>
    </main>
  );
}