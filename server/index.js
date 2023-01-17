import express from 'express';
const app = express();
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import likeRoutes from './routes/likes.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import relationshipRoutes from './routes/relationships.js';
import cors from 'cors';
import multer from 'multer';
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    res.status(200).json(file.filename);
  } catch (err) {
    console.error(err);
  }
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);
app.use('/comments', commentRoutes);
app.use('/relationships', relationshipRoutes);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
