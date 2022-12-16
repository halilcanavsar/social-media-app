import { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.scss';
import axios from 'axios';

function Register() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  //api request
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/auth/register', inputs);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>qwerty's Social</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptate quae voluptatem quibusdam
            consequuntur quidem voluptatum natus quas. Quisquam, quae. Quisquam
            voluptates, quod, quia, voluptate quae voluptatem quibusdam
            consequuntur quidem voluptatum natus quas. Quisquam, quae.
          </p>
          <span>Do you have an account?</span>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {error && <span className="error">{error}</span>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
