import { db } from '../dbconnect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  //CHECK USER IF EXISTS
  //we are using ? instead of the actual value to prevent sql injection. (username = req.body.username)
  const q = 'SELECT * FROM users WHERE username = ?';

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(400).json('User already exists');
    //CREATE A NEW USER
    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      'INSERT INTO users (`username`, `email`, `password`, `name` ) VALUE (?)';

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: 'User created' });
    });
  });
};
export const login = async (req, res) => {
  const q = 'SELECT * FROM users WHERE username = ?';

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(400).json('User does not exist');
    //compare the password
    const validPassword = bcrypt.compareSync(
      req.body.password,
      //data[0] is the first user in the array. It is sent as an array because we are using the ? in the query.
      data[0].password
    );
    if (!validPassword)
      return res.status(400).json('Invalid username or password');

    //create and assign a token
    const token = jwt.sign({ _id: data[0].id }, process.env.TOKEN_SECRET);

    //we don't want to send the password to the client
    const { password, ...user } = data[0];

    res
      .cookie('accessToken', token, {
        //httpOnly: true prevents the cookie from being accessed by the client side javascript
        httpOnly: true,
      })
      .status(200)
      //if you put {user} it will send the user as an object. If you put user it will send the user as an array.
      .json(user);
  });
};
export const logout = async (req, res) => {
  res
    .clearCookie('accessToken', {
      //specify whether the cookie should only be transmitted over HTTPS, a secure connection
      secure: true,
      //specify whether the cookie should be sent only over HTTP(S), and not made available to client-side JavaScript
      sameSite: 'none',
    })
    .status(200)
    .json({ message: 'Logged out' });
};
