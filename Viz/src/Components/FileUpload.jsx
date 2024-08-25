import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const uploadEndpoint = 'http://localhost:5000/upload';

    fetch(uploadEndpoint, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setUploadStatus('File uploaded successfully!');
        console.log('File uploaded successfully:', data);
      })
      .catch(error => {
        setUploadStatus('Error uploading file.');
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between bg-white shadow-md p-4">
        <div className="flex items-center">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-8 w-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">File Upload System</h1>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Upload Your File</h1>
          <p className="text-gray-600 mb-4 text-center">Choose a file to upload from your device and hit the button below to start the upload process.</p>
          <div className="mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            onClick={handleUpload}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload File
          </button>
          {file && (
            <div className="mt-4 text-sm text-gray-600">
              <strong>Selected File:</strong> {file.name}
            </div>
          )}
          {uploadStatus && (
            <div className="mt-4 text-sm text-gray-600">
              <strong>Status:</strong> {uploadStatus}
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white shadow-md p-4 text-center">
        <p className="text-gray-600 text-sm">Your tagline or additional information here</p>
      </footer>
    </div>
  );
};

export default FileUpload;
