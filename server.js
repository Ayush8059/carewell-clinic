const express = require('express');
const path = require('path');
const app = express();
const COLOR = process.env.APP_COLOR || 'none';
const VERSION = process.env.APP_VERSION || 'v1';

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => res.send('OK'));
app.get('/api/info', (req, res) => res.json({ version: VERSION, color: COLOR }));

// MOCK DATA ONLY - no real patient or doctor information
app.get('/api/doctors', (req, res) => res.json([
  { name: 'Dr. A. Sharma', dept: 'General Medicine', time: 'Mon-Fri 9AM-1PM' },
  { name: 'Dr. R. Iyer', dept: 'Pediatrics', time: 'Mon-Sat 10AM-4PM' },
  { name: 'Dr. S. Khan', dept: 'Cardiology', time: 'Tue-Thu 2PM-6PM' }
]));

app.listen(3000, '0.0.0.0', () => console.log('CareWell running on 3000'));
