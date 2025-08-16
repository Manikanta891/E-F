
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('');
  const [uploaded, setUploaded] = useState([]);

  const handleUpload = async () => {
    let uploadedFiles = [];
    for (let file of files) {
      setStatus(`Uploading ${file.name}...`);
      try {
        const { data } = await axios.post('https://engagement-dgcp.onrender.com/get-signed-url', {
          filename: file.name,
          contentType: file.type
        });
        await axios.put(data.url, file, { headers: { 'Content-Type': file.type } });
        uploadedFiles.push(data.filename);
        setStatus(`${file.name} uploaded successfully!`);
      } catch (err) {
        setStatus(`Error uploading ${file.name}`);
      }
    }
    setUploaded(uploadedFiles);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f6d1f7 100%)',
      fontFamily: 'Segoe UI, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 32px rgba(80, 0, 80, 0.15)',
        padding: '2.5rem 2rem',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          color: '#a020f0',
          fontSize: '2.2rem',
          marginBottom: '0.5rem',
          fontWeight: 700
        }}>
          Preethi &amp; Vijay Sai
        </h1>
        <p style={{
          color: '#6d2c91',
          fontSize: '1.1rem',
          marginBottom: '1.2rem',
          fontWeight: 500
        }}>
          Engagement Ceremony<br />
          <span style={{ color: '#d6336c', fontWeight: 600 }}>17th August, 11:43 AM</span>
        </p>
        <p style={{
          color: '#444',
          fontSize: '1rem',
          marginBottom: '1.5rem'
        }}>
          Welcome, dear guests!<br />
          Please share your beautiful moments and photos from the engagement.<br />
          Your memories will make this day even more special!
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          style={{
            marginBottom: '1rem',
            border: '1px solid #a020f0',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            width: '100%'
          }}
          onChange={e => setFiles(e.target.files)}
        />
        <button
          onClick={handleUpload}
          style={{
            background: 'linear-gradient(90deg, #a020f0 0%, #d6336c 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.7rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(160,32,240,0.08)'
          }}
        >
          Upload Photos
        </button>
        <p style={{ color: '#d6336c', marginTop: '1rem', fontWeight: 500 }}>{status}</p>
        {uploaded.length > 0 && (
          <div style={{ marginTop: '1.5rem', color: '#6d2c91', fontSize: '0.95rem' }}>
            <strong>Uploaded:</strong>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {uploaded.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <footer style={{ color: '#a020f0', fontWeight: 500, fontSize: '1rem' }}>
        With love, Preethi &amp; Vijay Sai
      </footer>
    </div>
  );
}

export default App;
