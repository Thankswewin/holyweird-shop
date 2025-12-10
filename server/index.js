import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import routes
import productsRouter from './routes/products.js';
import checkoutRouter from './routes/checkout.js';
import webhooksRouter from './routes/webhooks.js';
import dollyRouter from './routes/dolly.js';
import conciergeRouter from './routes/concierge.js';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Webhooks need raw body, so mount before json middleware
app.use('/api/webhooks', webhooksRouter);

// JSON body parser for all other routes
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Mount API routes
app.use('/api/products', productsRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/dolly', dollyRouter);
app.use('/api/concierge', conciergeRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║       HolyWeird Backend Server                ║
╠═══════════════════════════════════════════════╣
║  🚀 Server running on port ${PORT}               ║
║  📍 API: http://localhost:${PORT}/api            ║
║  🌐 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}       ║
╚═══════════════════════════════════════════════╝
  `);
});

export default app;
