const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

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

// Swagger API Documentation
const { swaggerUi, swaggerDocument, swaggerUiOptions } = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});
app.get('/swagger', (req, res) => res.redirect('/api-docs'));
app.get('/docs', (req, res) => res.redirect('/api-docs'));

app.get('/', (req, res) => {
  res.send('DISC Assessment API is running... API docs available at <a href="/api-docs">/api-docs</a>');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});
