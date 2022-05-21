/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useState} from 'react';
import logo from '../../assets/movies.svg';
import './styles.scss';

function Header() {
  let [navClass, setNavClass] = useState(false);
  let [menuClass, setMenuClass] = useState(false);

  const toggleMenu = () => {
    navClass = !navClass;
    menuClass = !menuClass;
    setMenuClass(menuClass);
    setNavClass(navClass);
    if (navClass) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  };

  return (
    <div className="header-nav-wrapper">
      <div className="header-bar" />
      <div className="header-navbar">
        <div className="header-image">
          <img src={logo} alt="logo" />
        </div>
        <div
          onClick={() => toggleMenu()}
          className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`}
          id="header-mobile-menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
        <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
          <li className="header-nav-item">Now Playing</li>
          <li className="header-nav-item">Recent Releases</li>
          <input type="text" className="search-input" placeholder="Search for movies" />
        </ul>
      </div>
    </div>
  );
}

export default Header;
