import React, { useState, useRef } from 'react';
import { Upload, Heart, Camera, Check, X, Image } from 'lucide-react';

function App() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('');
  const [uploaded, setUploaded] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    let uploadedFiles = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setStatus(`Uploading ${file.name}... (${i + 1}/${files.length})`);
      
      try {
        // Simulate API call with delay for demo
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate successful upload
        const filename = `${Date.now()}_${file.name}`;
        uploadedFiles.push(filename);
        setStatus(`${file.name} uploaded successfully!`);
        
        // Brief pause to show success message
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (err) {
        setStatus(`Error uploading ${file.name}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    setUploaded(prev => [...prev, ...uploadedFiles]);
    setFiles([]);
    setIsUploading(false);
    setStatus('All photos uploaded successfully! 💕');
    
    // Clear success message after 3 seconds
    setTimeout(() => setStatus(''), 3000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    setFiles(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-10px); }
          70% { transform: translateY(-5px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 50%, #e0e7ff 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }

        .bg-element {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(244, 114, 182, 0.2), rgba(168, 85, 247, 0.2));
          animation: float 4s ease-in-out infinite;
          pointer-events: none;
        }

        .main-wrapper {
          width: 100%;
          max-width: 28rem;
          position: relative;
          z-index: 10;
        }

        .main-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.5);
          padding: 2rem;
          text-align: center;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
        }

        .header {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .floating-heart-1 {
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          color: #f472b6;
          animation: bounce 2s infinite;
        }

        .floating-heart-2 {
          position: absolute;
          top: -0.25rem;
          left: -0.75rem;
          color: #a855f7;
          animation: bounce 2s infinite 0.5s;
        }

        .title {
          font-size: 2.25rem;
          font-weight: 700;
          background: linear-gradient(45deg, #7c3aed, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          animation: pulse 3s infinite;
        }

        .ceremony-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #7c2d12;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .date-time {
          color: #dc2626;
          font-weight: 700;
          font-size: 1.25rem;
          margin-top: 0.5rem;
          animation: bounce 3s infinite;
        }

        .welcome-section {
          margin-bottom: 2rem;
          padding: 1rem;
          background: linear-gradient(45deg, #f3e8ff, #fdf2f8);
          border-radius: 1rem;
          border: 1px solid #e879f9;
          line-height: 1.6;
          color: #374151;
        }

        .upload-area {
          position: relative;
          margin-bottom: 1.5rem;
          padding: 2rem;
          border: 2px dashed #a855f7;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.5);
        }

        .upload-area:hover {
          border-color: #7c3aed;
          background: rgba(243, 232, 255, 0.5);
          transform: translateY(-2px);
        }

        .upload-area.drag-over {
          border-color: #7c3aed;
          background: rgba(243, 232, 255, 0.8);
          transform: scale(1.02);
        }

        .upload-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .upload-icon-wrapper {
          position: relative;
        }

        .upload-icon {
          width: 3rem;
          height: 3rem;
          color: #a855f7;
          transition: all 0.3s ease;
        }

        .upload-area:hover .upload-icon {
          transform: scale(1.1);
          color: #7c3aed;
        }

        .ping-effect {
          position: absolute;
          inset: -4px;
          background: #a855f7;
          border-radius: 50%;
          opacity: 0.2;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .upload-text {
          font-size: 1.125rem;
          font-weight: 600;
          color: #7c3aed;
          margin-bottom: 0.25rem;
        }

        .upload-subtext {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .file-list {
          margin-bottom: 1.5rem;
          max-height: 10rem;
          overflow-y: auto;
        }

        .file-list-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #7c3aed;
          margin-bottom: 0.75rem;
        }

        .file-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(243, 232, 255, 0.5);
          border-radius: 0.75rem;
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
        }

        .file-item:hover {
          background: rgba(243, 232, 255, 0.8);
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .file-name {
          font-size: 0.875rem;
          color: #374151;
          max-width: 12rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .remove-btn {
          opacity: 0;
          transition: opacity 0.3s ease;
          padding: 0.25rem;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .file-item:hover .remove-btn {
          opacity: 1;
        }

        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .upload-button {
          width: 100%;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          font-weight: 700;
          font-size: 1.125rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .upload-button:enabled {
          background: linear-gradient(45deg, #7c3aed, #ec4899);
          color: white;
          box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.3);
        }

        .upload-button:enabled:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 25px -5px rgba(124, 58, 237, 0.4);
        }

        .upload-button:disabled {
          background: #e5e7eb;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .spinner {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid white;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .status-message {
          margin-top: 1rem;
          padding: 0.75rem;
          border-radius: 0.75rem;
          transition: all 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .status-error {
          background: rgba(254, 242, 242, 0.8);
          color: #b91c1c;
          border: 1px solid #fecaca;
        }

        .status-success {
          background: rgba(240, 253, 244, 0.8);
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .status-info {
          background: rgba(239, 246, 255, 0.8);
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
        }

        .uploaded-section {
          margin-top: 1.5rem;
          padding: 1rem;
          background: linear-gradient(45deg, rgba(240, 253, 244, 0.8), rgba(236, 253, 245, 0.8));
          border-radius: 1rem;
          border: 1px solid #bbf7d0;
        }

        .uploaded-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
          color: #166534;
        }

        .uploaded-list {
          max-height: 8rem;
          overflow-y: auto;
        }

        .uploaded-item {
          font-size: 0.875rem;
          color: #059669;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 0.5rem;
          padding: 0.5rem;
          margin-bottom: 0.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .footer {
          text-align: center;
          margin-top: 2rem;
          padding: 1rem;
        }

        .footer-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #7c3aed;
          font-weight: 600;
          font-size: 1.125rem;
        }

        .footer-heart {
          width: 1.25rem;
          height: 1.25rem;
          color: #ec4899;
          animation: pulse 2s infinite;
        }

        .footer-heart:nth-child(3) {
          animation-delay: 0.5s;
        }

        .hidden {
          display: none;
        }
      `}</style>

      <div className="container">
        {/* Animated background elements */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-element"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}

        <div className="main-wrapper">
          {/* Main card */}
          <div className="main-card">
            {/* Header with floating hearts */}
            <div className="header">
              <div className="floating-heart-1">
                <Heart size={24} fill="currentColor" />
              </div>
              <div className="floating-heart-2">
                <Heart size={16} fill="currentColor" />
              </div>
              
              <h1 className="title">
                Preethi & Vijay Sai
              </h1>
              
              <div className="ceremony-info">
                <Camera size={20} />
                <span>Engagement Ceremony</span>
              </div>
              
              <p className="date-time">
                17th August, 11:43 AM
              </p>
            </div>

            {/* Welcome message */}
            <div className="welcome-section">
              <p>
                Welcome, dear guests! 🎉<br />
                <span style={{color: '#7c3aed', fontWeight: 500}}>Share your beautiful moments</span> and photos from our special day.<br />
                <span style={{color: '#ec4899', fontWeight: 500}}>Your memories make this celebration complete!</span> ✨
              </p>
            </div>

            {/* File upload area */}
            <div 
              className={`upload-area ${dragOver ? 'drag-over' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={e => setFiles(Array.from(e.target.files))}
              />
              
              <div className="upload-content">
                <div className="upload-icon-wrapper">
                  <Upload className="upload-icon" />
                  <div className="ping-effect"></div>
                </div>
                
                <div>
                  <p className="upload-text">
                    {dragOver ? 'Drop your photos here!' : 'Click or drag photos here'}
                  </p>
                  <p className="upload-subtext">
                    Support for multiple images (JPG, PNG, GIF)
                  </p>
                </div>
              </div>
            </div>

            {/* Selected files */}
            {files.length > 0 && (
              <div className="file-list">
                <p className="file-list-title">Selected Photos ({files.length})</p>
                {Array.from(files).map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <Image size={20} color="#7c3aed" />
                      <span className="file-name">{file.name}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="remove-btn"
                    >
                      <X size={16} color="#ef4444" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload button */}
            <button
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
              className="upload-button"
            >
              {isUploading ? (
                <>
                  <div className="spinner"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload size={20} />
                  <span>Upload Photos</span>
                </>
              )}
            </button>

            {/* Status message */}
            {status && (
              <div className={`status-message ${
                status.includes('Error') 
                  ? 'status-error' 
                  : status.includes('successfully')
                  ? 'status-success'
                  : 'status-info'
              }`}>
                {status.includes('successfully') && <Check size={20} />}
                <span>{status}</span>
              </div>
            )}

            {/* Uploaded files */}
            {uploaded.length > 0 && (
              <div className="uploaded-section">
                <div className="uploaded-header">
                  <Check size={20} />
                  <span>Successfully Uploaded ({uploaded.length})</span>
                </div>
                <div className="uploaded-list">
                  {uploaded.map((name, idx) => (
                    <div key={idx} className="uploaded-item">
                      ✓ {name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="footer">
            <div className="footer-content">
              <Heart className="footer-heart" fill="currentColor" />
              <span>With love, Preethi & Vijay Sai</span>
              <Heart className="footer-heart" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;