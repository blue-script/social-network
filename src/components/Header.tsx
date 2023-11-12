import React from 'react';
import iconsSprite from '../assets/icons-sprite.svg'

const Header = () => {
  return (
    <header className="header">
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <use xlinkHref={`${iconsSprite}#logo`}/>
      </svg>
    </header>
  );
};

export default Header;