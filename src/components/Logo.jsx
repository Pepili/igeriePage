import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div>
        <div className='logo'>
        <Link to="/"><img alt="logo" src="/img/logo1.png" className="imglogo"/></Link>
        <p>Igerie coaching de vie</p>
      </div>
    </div>
  );
}

export default Logo;