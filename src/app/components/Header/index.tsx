/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import logo from '../../assets/movies.svg';
import {fetchMovies, setMovieType, setResponsePageNumber} from '../../redux/actions/movies.action';
import IStoreState from '../../redux/StoreTypes';
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

interface Props {
  getMovies: (page: number, type: 'now_playing' | 'top_rated' | 'popular') => void;
  setMovieType: (type: string) => void;
  movies: any;
  page: number;
  totalPages: number;
  updatePageNumber: (pageNumber: number, totalPages: number) => void;
}

function Header({getMovies, movies, setMovieType, page, totalPages, updatePageNumber}: Props) {
  let [navClass, setNavClass] = useState(false);
  let [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState<string>('now_playing');

  useEffect(() => {
    if (type === 'now_playing' || type === 'top_rated' || type === 'popular') {
      getMovies(page, type);
      updatePageNumber(page, totalPages);
    }
  }, [type, page]);

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

  const setMovieTypeUrl = (type: string, name: string) => {
    setType(type);
    setMovieType(name);
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
            <li
              key={item.id}
              className="header-nav-item"
              onClick={() => setMovieTypeUrl(item.type, item.name)}
            >
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

const mapStateToProps = (state: IStoreState) => ({
  movies: state.movies,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMovies: (page: number, type: 'now_playing' | 'top_rated' | 'popular') =>
    dispatch(fetchMovies(page, type)),
  setMovieType: (type: string) => dispatch(setMovieType(type)),
  updatePageNumber: (pageNumber: number, totalPages: number) =>
    dispatch(setResponsePageNumber(pageNumber, totalPages)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
