/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchMovies, setResponsePageNumber} from '../../redux/actions/movies.action';
import IStoreState from '../../redux/StoreTypes';
import PaginateComponent from '../PaginateComponent';
import Slider from './slider';
import './styles.scss';

interface Props {
  page: number;
  totalPages: number;
  movieType: string;
  getMovies: (pageNumber: number, type: string) => void;
  updatePageNumber: (pageNumber: number, totalPages: number) => void;
}

function Carousel({page, totalPages, movieType, getMovies, updatePageNumber}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(page);

  const headerType: any = {
    now_playing: 'Now Playing',
    top_rated: 'Top Rated',
    popular: 'Trending',
    upcoming: 'Upcoming',
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page, totalPages]);

  const paginate = (type: 'prev' | 'next') => {
    let pageNumber = currentPage;
    if (type === 'prev' && currentPage >= 1) {
      pageNumber -= 1;
    } else {
      pageNumber += 1;
    }
    setCurrentPage(pageNumber);
    updatePageNumber(pageNumber, totalPages);
    getMovies(pageNumber, movieType);
  };

  return (
    <div className="carousel">
      <Slider />
      <div className="grid-movie-title">
        <div className="movieType">{headerType[movieType]}</div>
        <div className="paginate">
          <PaginateComponent
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: IStoreState) => ({
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMovies: (pageNumber: number, type: string) => dispatch(fetchMovies(pageNumber, type)),
  updatePageNumber: (pageNumber: number, totalPages: number) =>
    dispatch(setResponsePageNumber(pageNumber, totalPages)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
