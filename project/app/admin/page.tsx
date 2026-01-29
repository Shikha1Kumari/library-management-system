"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; 

export default function AdminPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', category: '', available: true });

  // For fetching the book
  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  // 2. For adding book
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', newBook);
      alert("Book Added!");
      setNewBook({ title: '', author: '', category: '', available: true });
      fetchBooks();
    } catch (err) {
      alert("Request failed! Check Backend.");
    }
  };

  // 3. Book delete 
  const handleDelete = async (id: string) => {
    if (window.confirm("Do you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        alert("Book Deleted!");
        fetchBooks();
      } catch (err) {
        alert("Book Not deleted!");
      }
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      {/* Header section with Back Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>🛠 Admin Library Manager</h1>
        <Link href="/">
          <button style={{ 
            padding: '10px 20px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}>
            🏠 View Dashboard
          </button>
        </Link>
      </div>
      
      {/* Form to Add Book */}
      <form onSubmit={handleAddBook} style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          placeholder="Title" 
          value={newBook.title} 
          onChange={e => setNewBook({...newBook, title: e.target.value})} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          placeholder="Author" 
          value={newBook.author} 
          onChange={e => setNewBook({...newBook, author: e.target.value})} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          placeholder="Category" 
          value={newBook.category} 
          onChange={e => setNewBook({...newBook, category: e.target.value})} 
          required 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ backgroundColor: 'green', color: 'white', cursor: 'pointer', padding: '8px 15px', border: 'none', borderRadius: '4px' }}>
          Add Book
        </button>
      </form>

      {/* Table to show books */}
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ padding: '10px' }}>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td style={{ padding: '10px' }}>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.available ? "✅ In Library" : "❌ Borrowed"}</td>
              <td>
                <button 
                  onClick={() => handleDelete(book._id)} 
                  style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}