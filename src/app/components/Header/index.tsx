/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useState} from 'react';
import logo from '../../assets/movies.svg';
import './styles.scss';

const headerList = [
  {
    id: 1,
    iconClass: 'fas fa-film',
    name: 'Now Playing',
    type: 'now_playing',
  },
  {
    id: 2,
    iconClass: 'fas fa-fire',
    name: 'Trending',
    type: 'trending',
  },
  {
    id: 3,
    iconClass: 'fas fa-star',
    name: 'Top Rated',
    type: 'top_rated',
  },
  {
    id: 4,
    iconClass: 'fas fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming',
  },
];

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
          {headerList.map(item => (
            <li key={item.id} className="header-nav-item">
              <span className="header-list-name">
                <i className={item.iconClass} />
              </span>
              &nbsp;
              <span className="header-list-name">{item.name}</span>
            </li>
          ))}
          <input type="text" className="search-input" placeholder="Search for movies" />
        </ul>
      </div>
    </div>
  );
}

export default Header;
