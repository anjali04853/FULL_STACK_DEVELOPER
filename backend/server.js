const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/contact-manager";

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
const contactsRouter = require('./routes/contacts');
const authRouter = require('./routes/auth');

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

// SERVE FRONTEND (Production)
// This will serve the static files from the frontend/dist folder (created by Vite build)
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Handle SPAs: Any other route should serve index.html
app.get('*', (req, res) => {
    if (res.headersSent) return;
    res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
        if (err) {
            // If index.html is missing (e.g. build hasn't run), just show a simple message
            res.status(404).send('Frontend build not found. Please run npm run build in frontend.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
