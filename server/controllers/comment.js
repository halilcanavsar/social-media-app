import { db } from '../dbconnect.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (c.userId = u.id)
  WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const createComment = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Access denied');

  jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Invalid token');

    const q =
      'INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES ?';

    const values = [
      [
        req.body.desc,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        userInfo._id,
        req.body.postId,
      ],
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: 'Comment created' });
    });
  });
};
