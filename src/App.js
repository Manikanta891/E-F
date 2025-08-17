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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-200/30 to-purple-200/30 animate-pulse"
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
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
          {/* Header with floating hearts */}
          <div className="relative mb-6">
            <div className="absolute -top-2 -right-2 text-pink-400 animate-bounce">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div className="absolute -top-1 -left-3 text-purple-400 animate-bounce" style={{animationDelay: '0.5s'}}>
              <Heart className="w-4 h-4 fill-current" />
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-pulse">
              Preethi & Vijay Sai
            </h1>
            
            <div className="flex items-center justify-center space-x-2 text-purple-700 text-lg font-semibold">
              <Camera className="w-5 h-5" />
              <span>Engagement Ceremony</span>
            </div>
            
            <p className="text-pink-600 font-bold text-xl mt-2 animate-bounce">
              17th August, 11:43 AM
            </p>
          </div>

          {/* Welcome message */}
          <div className="mb-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
            <p className="text-gray-700 leading-relaxed">
              Welcome, dear guests! 🎉<br />
              <span className="text-purple-600 font-medium">Share your beautiful moments</span> and photos from our special day.<br />
              <span className="text-pink-600 font-medium">Your memories make this celebration complete!</span> ✨
            </p>
          </div>

          {/* File upload area */}
          <div 
            className={`relative mb-6 p-8 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer group ${
              dragOver 
                ? 'border-purple-400 bg-purple-50' 
                : 'border-purple-300 hover:border-purple-400 hover:bg-purple-50/50'
            }`}
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
            
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Upload className={`w-12 h-12 text-purple-400 transition-all duration-300 ${
                  dragOver ? 'scale-110 text-purple-600' : 'group-hover:scale-110'
                }`} />
                <div className="absolute -inset-1 bg-purple-200 rounded-full opacity-20 animate-ping"></div>
              </div>
              
              <div>
                <p className="text-lg font-semibold text-purple-700 mb-1">
                  {dragOver ? 'Drop your photos here!' : 'Click or drag photos here'}
                </p>
                <p className="text-sm text-gray-500">
                  Support for multiple images (JPG, PNG, GIF)
                </p>
              </div>
            </div>
          </div>

          {/* Selected files */}
          {files.length > 0 && (
            <div className="mb-6 space-y-2 max-h-40 overflow-y-auto">
              <p className="text-sm font-semibold text-purple-700 mb-3">Selected Photos ({files.length})</p>
              {Array.from(files).map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-purple-50 rounded-xl p-3 group">
                  <div className="flex items-center space-x-3">
                    <Image className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-700 truncate max-w-48">{file.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded-full"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || isUploading}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
              files.length === 0 || isUploading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isUploading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Photos</span>
              </div>
            )}
          </button>

          {/* Status message */}
          {status && (
            <div className={`mt-4 p-3 rounded-xl transition-all duration-500 ${
              status.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : status.includes('successfully')
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              <div className="flex items-center justify-center space-x-2">
                {status.includes('successfully') && <Check className="w-5 h-5" />}
                <span className="font-medium">{status}</span>
              </div>
            </div>
          )}

          {/* Uploaded files */}
          {uploaded.length > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-700">Successfully Uploaded ({uploaded.length})</span>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {uploaded.map((name, idx) => (
                  <div key={idx} className="text-sm text-green-600 bg-white/50 rounded-lg p-2 truncate">
                    ✓ {name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 p-4">
          <div className="flex items-center justify-center space-x-2 text-purple-700 font-semibold text-lg">
            <Heart className="w-5 h-5 fill-current text-pink-500 animate-pulse" />
            <span>With love, Preethi & Vijay Sai</span>
            <Heart className="w-5 h-5 fill-current text-pink-500 animate-pulse" style={{animationDelay: '0.5s'}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;