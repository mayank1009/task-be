const express = require('express');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
connectDB();

const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', require('./src/routes/authRoutes'));
app.use('/tasks', require('./src/routes/taskRoutes'));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
