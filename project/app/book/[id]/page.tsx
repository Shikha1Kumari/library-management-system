"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function BookDetails() {
  const { id } = useParams(); 
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // GET /api/books/:id
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Not found Book Details", err);
      }
    };
    if (id) fetchBook();
  }, [id]);

  if (!book) return <p style={{ padding: '20px' }}>Loading book details...</p>;

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#0070f3' }}>{book.title}</h1>
        <hr />
        <p><strong>🖋 Author:</strong> {book.author}</p>
        <p><strong>📂 Category:</strong> {book.category}</p>
        <p><strong>🏷 Status:</strong> 
          <span style={{ color: book.available ? 'green' : 'red', marginLeft: '10px' }}>
            {book.available ? "✅ In Library" : "❌ Not Available"}
          </span>
        </p>
        <br />
        <button onClick={() => window.history.back()} style={{ padding: '10px 20px', cursor: 'pointer' }}>Go Back</button>
      </div>
    </div>
  );
}