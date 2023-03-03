import { NavLink, Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <nav>
        <ul className="footerList">
          <li>
            <NavLink to="about">About</NavLink>
          </li>
          <li>
            <NavLink to="contacts">Contacts</NavLink>
          </li>
        </ul>
      </nav>
      <p> &copy; 2023</p>
    </footer>
  )
}

export default Footer
