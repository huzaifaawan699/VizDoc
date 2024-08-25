const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Endpoint for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully!', file: req.file });
});

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
