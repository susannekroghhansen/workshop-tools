const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests — you have exceeded 20 requests per hour. Please try again later.' },
});

const energyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests.' },
});

app.use(cors({ origin: 'https://susannekroghhansen.github.io' }));
app.use(express.json());
app.use('/api/claude', limiter);

// ── Energy check-in (in-memory) ──
let energyCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

app.get('/api/energy', (req, res) => {
  res.json(energyCounts);
});

app.post('/api/energy', energyLimiter, (req, res) => {
  const { level } = req.body;
  if (![1, 2, 3, 4, 5].includes(level)) {
    return res.status(400).json({ error: 'level must be 1–5' });
  }
  energyCounts[level] = (energyCounts[level] || 0) + 1;
  res.json(energyCounts);
});

app.delete('/api/energy', (req, res) => {
  energyCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  res.json(energyCounts);
});

app.post('/api/claude', async (req, res) => {
  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8096,
      system,
      messages,
    });

    res.json(response);
  } catch (err) {
    const status = err.status ?? 500;
    res.status(status).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
