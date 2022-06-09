/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {Carousel, Gallery, Spinner} from '../../components';
import {fetchMoreMovies, setResponsePageNumber} from '../../redux/actions/movies.action';
import './styles.scss';
import IStoreState from '../../redux/StoreTypes';

interface IHomePageProps {
  loadMoreMovies: (
    pageNumber: number,
    type: 'now_playing' | 'top_rated' | 'popular' | 'upcoming',
  ) => void;
  movies: Array<any>;
  page: number;
  totalPages: number;
  updatePageNumber: (pageNumber: number, totalPages: number) => void;
  movieType: 'now_playing' | 'top_rated' | 'popular' | 'upcoming';
}

function HomePage({
  loadMoreMovies,
  movies,
  page,
  totalPages,
  updatePageNumber,
  movieType,
}: IHomePageProps) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(page);

  const mainRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
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

  return (
    <div className="main" ref={mainRef} onScroll={() => handleScroll()}>
      <Helmet>
        <title>Infinite Movies</title>
      </Helmet>
      {loading ? (
        <Spinner />
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
});

const mapStateToProps = (state: IStoreState) => ({
  movies: state.movies.movies,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
