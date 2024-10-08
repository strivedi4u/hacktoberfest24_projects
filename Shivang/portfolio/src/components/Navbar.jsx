import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <Link className="nav-link" to="/about">About</Link>
      <Link className="nav-link" to="/projects">Projects</Link>
      <Link className="nav-link" to="/resume">Resume</Link>
      <Link className="nav-link" to="/contact">Contact</Link>
    </div>
  );
}

export default Navbar;