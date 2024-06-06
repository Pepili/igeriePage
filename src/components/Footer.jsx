import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <img src= {process.env.PUBLIC_URL + '/img/logo2.png'} alt='logo'/>
      <div className='linkElements'>
        <div className='listSocial'>
          <p>@Igérie coaching de vie</p>
          <ul>
              <li><Link to={"#"}><FontAwesomeIcon icon={faInstagram} /></Link></li>
              <li><Link to={"#"}><FontAwesomeIcon icon={faFacebook} /></Link></li>
              <li><Link to={"#"}><FontAwesomeIcon icon={faTiktok} /></Link></li>
          </ul>
        </div>
        <div className='listInfo'>
          <ul>
            <li><Link to="#" className='linkFooter'>Conditions légales</Link></li>
            <li><Link to="/contact" className='linkFooter'>Contact</Link></li>
            <li><Link to="/" className='linkFooter'>Accueil</Link></li>
            <li><Link to="/connexionAdmin" className='linkFooter'>Admin</Link></li>
          </ul>
        </div>
      </div>      
    </footer>
  );
}

export default Footer;
