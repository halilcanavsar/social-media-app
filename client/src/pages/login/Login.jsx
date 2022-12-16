import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './login.scss';

function Login() {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const { login } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/');
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptate quae voluptatem quibusdam
            consequuntur quidem voluptatum natus quas. Quisquam, quae. Quisquam
            voluptates, quod, quia, voluptate quae voluptatem quibusdam
            consequuntur quidem voluptatum natus quas. Quisquam, quae.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
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
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {error && <span className="error">{error}</span>}
            <button onClick={handleClick}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
