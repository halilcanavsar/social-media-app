import { Link } from 'react-router-dom';
import './register.scss';

function Register() {
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
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Name" />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
