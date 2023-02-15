import React from 'react';
import KleverLogo from '../assets/logo.svg';

function Logo() {
  return(
    <div className='logo'>
      <img src={ KleverLogo } alt='klever logo'/>
    </div>
  );
}

export default Logo;