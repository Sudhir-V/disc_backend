const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');

// Load .env files with precedence: .env.local > .env.${NODE_ENV} > .env
// We load specific ones first because dotenv won't override existing keys.

// 1. Load .env.local (Machine specific overrides)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// 2. Load .env.${NODE_ENV} (Environment specific: development, production, test)
if (process.env.NODE_ENV) {
  dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) });
}

// 3. Load .env (Defaults)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
