const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');

// Capture host-assigned PORT (e.g. from Render) before .env loads
const hostPort = process.env.PORT;
dotenv.config();

const app = express();
const PORT = hostPort || process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));
app.use('/assessment', require('./routes/assessment.routes'));

console.log('Loading admin routes...');
try {
  const adminRoutes = require('./routes/admin.routes');
  app.use('/admin', adminRoutes);
  console.log('✅ Admin routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading admin routes:', error.message);
}

app.get('/', (req, res) => {
  res.send('DISC Assessment API is running...');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});
