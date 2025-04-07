import { Link, useLocation } from 'react-router-dom'
import { FaScissors, FaHome, FaCalendarAlt } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <FaScissors className="logo-icon" />
          <span>Glamour Salon</span>
        </Link>
        
        <ul className="nav-links">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className={location.pathname === '/services' ? 'active' : ''}>
            <Link to="/services">
              <FaScissors className="nav-icon" />
              <span>Services</span>
            </Link>
          </li>
          <li className={location.pathname === '/bookings' ? 'active' : ''}>
            <Link to="/bookings">
              <FaCalendarAlt className="nav-icon" />
              <span>Bookings</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar