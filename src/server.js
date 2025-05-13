import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import lotteryRoutes from './routes/lottery.js';
import { verifyApiKey } from './middleware/verifyApiKey.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../Public')));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  /^https:\/\/(www\.)?yourdomain\.com$/,
  /^http:\/\/localhost:\d+$/             
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(pattern =>
      typeof pattern === 'string' ? pattern === origin : pattern.test(origin)
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  }
}));

app.use(express.json());
app.use('/api/lottery',verifyApiKey ,lotteryRoutes);

// app.get('/', (req, res) => {
//   res.send('🎯 Thai Lottery API is running');
// });
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Public/index.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
