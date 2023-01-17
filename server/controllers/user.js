import { db } from '../dbconnect.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = `SELECT * FROM users WHERE id = ?`;

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log(data);
    const { password, ...user } = data[0];
    return res.status(200).json(user);
  });
};
