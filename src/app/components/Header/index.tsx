/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useLocation, useHistory, useRouteMatch} from 'react-router-dom';
import logo from '../../assets/movies.svg';
import {
  fetchMovies,
  setMovieType,
  setResponsePageNumber,
  setSearchQuery,
  setSearchResult,
  clearMovieDetails,
} from '../../redux/actions/movies.action';
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
    type: 'popular',
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
  getMovies: (page: number, type: 'now_playing' | 'top_rated' | 'popular' | 'upcoming') => void;
  setMovieType: (type: string) => void;
  setSearchResult: (query: string) => void;
  setSearchQuery: (query: string) => void;
  movies: any;
  page: number;
  totalPages: number;
  updatePageNumber: (pageNumber: number, totalPages: number) => void;
  clearMovieDetails: () => void;
}

function Header({
  getMovies,
  movies,
  setMovieType,
  setSearchResult,
  setSearchQuery,
  page,
  totalPages,
  updatePageNumber,
  clearMovieDetails,
}: Props) {
  let [navClass, setNavClass] = useState(false);
  let [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState<string>('now_playing');
  const [query, setQuery] = useState<string>('');
  const [hideSearch, setHideSearch] = useState<boolean>(false);
  const [hideHeader, setHideHeader] = useState<boolean>(true);
  const location = useLocation();
  const history = useHistory();
  const detailsRoute = useRouteMatch('/:id/:name/details');

  useEffect(() => {
    if (
      type === 'now_playing' ||
      type === 'top_rated' ||
      type === 'popular' ||
      type === 'upcoming'
    ) {
      getMovies(page, type);
      updatePageNumber(page, totalPages);
    }
    if (location.pathname !== '/' && location.key) {
      setHideSearch(true);
    }
    if (detailsRoute || location.pathname === '/') {
      setHideHeader(false);
    }
  }, [type, page, location, hideSearch]);

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

  const setMovieTypeUrl = (type: string) => {
    setHideSearch(false);
    if (location.pathname !== '/') {
      clearMovieDetails();
      history.push('/');
      setType(type);
      setMovieType(type);
    } else {
      setType(type);
      setMovieType(type);
    }
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSearchQuery(event.target.value);
    setSearchResult(event.target.value);
  };

  return (
    <>
      {hideHeader ? null : (
        <div className="header-nav-wrapper">
          <div className="header-bar" />
          <div className="header-navbar">
            <div className="header-image">
              <Link
                to="/"
                onClick={() => {
                  setHideSearch(false);
                  clearMovieDetails();
                }}
              >
                <img src={logo} alt="logo" />
              </Link>
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
                  className={item.type === type ? 'header-nav-item active-item' : 'header-nav-item'}
                  onClick={() => setMovieTypeUrl(item.type)}
                >
                  <span className="header-list-name">
                    <i className={item.iconClass} />
                  </span>
                  &nbsp;
                  <span className="header-list-name">{item.name}</span>
                </li>
              ))}
              <input
                type="text"
                className={`search-input ${hideSearch ? 'disabled' : ''}`}
                placeholder="Search for movies"
                value={query}
                onChange={onSearchChange}
              />
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state: IStoreState) => ({
  movies: state.movies,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMovies: (page: number, type: 'now_playing' | 'top_rated' | 'popular' | 'upcoming') =>
    dispatch(fetchMovies(page, type)),
  setMovieType: (type: string) => dispatch(setMovieType(type)),
  updatePageNumber: (pageNumber: number, totalPages: number) =>
    dispatch(setResponsePageNumber(pageNumber, totalPages)),
  setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
  setSearchResult: (query: string) => dispatch(setSearchResult(query)),
  clearMovieDetails: () => dispatch(clearMovieDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
