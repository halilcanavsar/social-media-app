import { db } from '../dbconnect.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Access denied');

  jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Invalid token');

    const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;

    db.query(q, [userInfo._id, userInfo._id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const createPost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Access denied');

  jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Invalid token');

    const q =
      'INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES ?';

    const values = [
      [
        req.body.desc,
        req.body.img,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        userInfo._id,
      ],
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: 'Post created' });
    });
  });
};
