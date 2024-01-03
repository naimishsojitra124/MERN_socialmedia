const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err.message));

// Routes
const authRoute = require('./routes/authRouter');
const uploadRoute = require('./routes/uploadRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

// Use Routes
app.use('/api/auth', authRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// Listen on port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the SnapThread Social Media App!' });
});
