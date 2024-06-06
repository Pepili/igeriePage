import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isActive, setIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContentShifted, setIsContentShifted] = useState(false);
  const navRef = useRef(null);
  const sentinelRef = useRef(null);
  const location = useLocation();

  const handleNavTClick = () => {
    setIsActive(!isActive);
    setIsMenuOpen(!isMenuOpen);
    setIsContentShifted(!isContentShifted);
  };

  const handleLinkClick = () => {
    setIsActive(false);
    setIsMenuOpen(false);
    setIsContentShifted(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          navRef.current.style.position = 'fixed';
          navRef.current.style.top = '0';
          navRef.current.style.zIndex = "2";
          navRef.current.style.width = "100%";
          navRef.current.style.borderRadius = "0";

        // Ajoutez ces lignes pour modifier le style des éléments li
        const liElements = navRef.current.querySelectorAll('a');
        liElements.forEach(li => {
          li.style.borderRadius = '0';
        });

        } else {
          navRef.current.style.position = 'static';
          navRef.current.style.width = "95%";
          navRef.current.style.borderRadius = "60px";

          // Ajoutez ces lignes pour rétablir le style des éléments li
          const liElements = navRef.current.querySelectorAll('a');
          liElements.forEach(li => {
            li.style.borderRadius = '20px'; // Remplacez 'votre-valeur' par la valeur que vous voulez
          });
        }
      },
      { threshold: 1.0 }
    );
  
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
  
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  return (
    <>
    <div ref={sentinelRef}></div>
    <header>
      <nav id="container" ref={navRef}>
        <div
          className={`navT ${isActive ? 'active' : ''}`}
          onClick={handleNavTClick}
        >
          <div className="icon"></div>
        </div>
        <div id="menu" className={isMenuOpen ? 'open' : ''}>
          <ul>
              <Link to="/" onClick={() => handleLinkClick('/')} className={location.pathname === '/' ? 'active' : ''}>
                <li>Accueil</li>
              </Link>
              <Link to="/igerie" onClick={() => handleLinkClick('/igerie')} className={location.pathname === '/igerie' ? 'active' : ''}>
                <li >
                  Igerie
                </li>
              </Link>
              <Link to="/biographie" onClick={() => handleLinkClick('/biographie')} className={location.pathname === '/biographie' ? 'active' : ''}>
                <li>
                  Biographie
                </li>
              </Link>
              <Link to="/articles" onClick={() => handleLinkClick('/articles')} className={location.pathname === '/articles' ? 'active' : ''}>
                <li>
                  Articles
                </li>
              </Link>
              <Link to="/bibliotheques" onClick={() => handleLinkClick('/bibliotheques')} className={location.pathname === '/bibliotheques' ? 'active' : ''}>
                <li>
                  Bibliotheques
                </li>
              </Link>
              <Link to="/contact" onClick={() => handleLinkClick('/contact')} className={location.pathname === '/contact' ? 'active' : ''}>
                <li >
                  Contact
                </li>
              </Link>
              <Link to="/roue" onClick={() => handleLinkClick('/roue')} className={location.pathname === '/roue' ? 'active' : ''}>
                <li>
                    <img src= {process.env.PUBLIC_URL + "/img/wheel-of-fortune.png"} alt="jeu de l'épanouissement" />
                </li>
              </Link>
          </ul>
        </div>
      </nav>
    </header>
    </>
  );
}

export default Header;