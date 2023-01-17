import { db } from '../dbconnect.js';
import jwt from 'jsonwebtoken';

export const getLikes = (req, res) => {
  const q = 'SELECT * FROM likes WHERE postId = ?';

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.userId));
  });
};

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Access denied');

  jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Invalid token');

    const q = 'INSERT INTO likes (`userId`, `postId`) VALUES ?';

    const values = [[userInfo._id, req.body.postId]];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: 'Post liked' });
    });
  });
};

export const deleteLike = (req, res) => {
  console.log('works');
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Access denied');

  jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Invalid token');

    const q = 'DELETE FROM likes WHERE userId = ? AND postId = ?';

    db.query(q, [userInfo._id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: 'Like removed' });
    });
  });
};
