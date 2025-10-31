require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();

// ✅ CORS setup: allow local and live frontend
app.use(cors({
  origin: ['http://localhost:3000', 'https://quiz2win.co.za']
}));

app.use(express.json());

// ✅ MongoDB connection
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function startServer() {
  try {
    await client.connect();
    console.log('✅ MongoDB connected');

    const db = client.db('quiz2win');
    const users = db.collection('users');

    // ✅ Root route
    app.get('/', (req, res) => {
      res.send('🎉 Quiz2Win backend is live and MongoDB is connected!');
    });

    // ✅ Form submission route
    app.post('/register', async (req, res) => {
      const { name, email, cellphone, contactMethod } = req.body;
      console.log('Form data:', req.body);

      try {
        await users.insertOne({ name, email, cellphone, contactMethod });
        res.status(200).json({ message: 'Successfully submitted!' });
      } catch (err) {
        console.error('❌ Insert error:', err);
        res.status(500).json({ message: 'Database error' });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

startServer();