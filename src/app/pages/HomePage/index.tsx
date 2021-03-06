/* eslint-disable no-nested-ternary */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {Carousel, Gallery, SearchResults, Spinner} from '../../components';
import {
  fetchMoreMovies,
  setResponsePageNumber,
  clearMovieDetails,
} from '../../redux/actions/movies.action';
import './styles.scss';
import IStoreState from '../../redux/StoreTypes';

interface IHomePageProps {
  loadMoreMovies: (
    pageNumber: number,
    type: 'now_playing' | 'top_rated' | 'popular' | 'upcoming',
  ) => void;
  movies: Array<any>;
  searchResult: Array<any>;
  page: number;
  totalPages: number;
  updatePageNumber: (pageNumber: number, totalPages: number) => void;
  movieType: 'now_playing' | 'top_rated' | 'popular' | 'upcoming';
  clearDetails: () => void;
}

function HomePage({
  loadMoreMovies,
  movies,
  searchResult,
  page,
  totalPages,
  updatePageNumber,
  movieType,
  clearDetails,
}: IHomePageProps) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(page);

  const mainRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    clearDetails();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // loadMoreMovies(currentPage, 'now_playing');
    updatePageNumber(currentPage, totalPages);
  }, [currentPage]);

  const fetchData = () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
      loadMoreMovies(pageNumber, movieType);
    }
  };

  const handleScroll = () => {
    // @ts-ignore: Object is possibly 'null'.
    const containerHeight = mainRef?.current.getBoundingClientRect().height;
    // @ts-ignore: Object is possibly 'null'.
    const {top: bottomLineTop} = bottomLineRef?.current.getBoundingClientRect();

    if (bottomLineTop - 1 <= containerHeight) {
      fetchData();
    }
  };

  console.log(searchResult.length);

  return (
    <div className="main" ref={mainRef} onScroll={() => handleScroll()}>
      <Helmet>
        <title>Infinite Movies</title>
      </Helmet>
      {loading ? (
        <Spinner />
      ) : searchResult && searchResult.length > 0 ? (
        <SearchResults />
      ) : (
        <div className="main__content">
          <Carousel />
          <Gallery />
        </div>
      )}
      <div ref={bottomLineRef} />
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  loadMoreMovies: (
    pageNumber: number,
    type: 'now_playing' | 'top_rated' | 'popular' | 'upcoming',
  ) => dispatch(fetchMoreMovies(pageNumber, type)),
  updatePageNumber: (pageNumber: number, totalPages: number) =>
    dispatch(setResponsePageNumber(pageNumber, totalPages)),
  clearDetails: () => dispatch(clearMovieDetails()),
});

const mapStateToProps = (state: IStoreState) => ({
  movies: state.movies.movies,
  searchResult: state.movies.searchResult,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
