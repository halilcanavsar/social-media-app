import express from 'express';
const app = express();
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import likeRoutes from './routes/likes.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

//middlewares
app.use((req, res, next) => {
  //this is to allow cross origin requests. This is to allow requests from different domains.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);
app.use('/comments', commentRoutes);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
