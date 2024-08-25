import React, { useState } from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/bg.jpg'; // Path to your background image

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
    setUploadStatus('');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    setFiles(Array.from(event.dataTransfer.files));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      alert("Please select files first!");
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const uploadEndpoint = 'http://localhost:5000/upload';

    fetch(uploadEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
      onUploadProgress: (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      },
    })
      .then(response => response.json())
      .then(data => {
        setUploadStatus('Files uploaded successfully!');
        setUploadProgress(0);
        setFiles([]);
        console.log('Files uploaded successfully:', data);
      })
      .catch(error => {
        setUploadStatus('Error uploading files.');
        setUploadProgress(0);
        console.error('Error uploading files:', error);
      });
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-200"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <header className="flex items-center justify-between bg-white shadow-lg p-4">
        <div className="flex items-center">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-8 w-auto" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">File Upload System</h1>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          className={`bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl ${dragOver ? 'border-4 border-blue-600' : 'border-2 border-gray-300'} border-dashed transition-all duration-300`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <motion.h1
            className="text-3xl font-semibold text-gray-800 mb-3 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Upload Your Files
          </motion.h1>
          <motion.p
            className="text-gray-700 mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Drag and drop your files here or select them using the button below.
          </motion.p>
          <div className="mb-6">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
            />
          </div>
          <motion.button
            onClick={handleUpload}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Upload Files
          </motion.button>
          {uploadProgress > 0 && (
            <motion.div
              className="mt-6"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-blue-600 text-white text-center py-2 rounded-md">{uploadProgress}%</div>
            </motion.div>
          )}
          {files.length > 0 && (
            <motion.div
              className="mt-6 text-sm text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <strong>Selected Files:</strong>
              <ul className="list-disc ml-4 mt-2">
                {files.map(file => (
                  <li key={file.name} className="text-gray-800">{file.name}</li>
                ))}
              </ul>
            </motion.div>
          )}
          {uploadStatus && (
            <motion.div
              className="mt-6 text-sm text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <strong>Status:</strong> {uploadStatus}
            </motion.div>
          )}
        </motion.div>
      </main>
      
      <footer className="bg-white shadow-lg p-4 text-center">
        <p className="text-gray-600 text-sm">© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FileUpload;
