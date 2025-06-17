import { useNavigate } from "react-router-dom";
import "./HomePage.css";
export default function HomePage() {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate(`/register`);
  };
  const handleLogin = () => {
    navigate(`/login`);
  };

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">Logo</a>
        </div>
        <ul className="navbar-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/stays">Stays</a>
          </li>
          <li>
            <a href="/experiences">Experiences</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </nav>
      <div className="homepage-content">
        <img src="./src/Logo.jpg" alt="Logo" className="homepage-logo" />
        <h1 className="homepage-heading">Land Registration System</h1>
      </div>
      <div className="homepage-buttons">
        <button className="signup-btn" onClick={handleRegister}>
          Register
        </button>
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
