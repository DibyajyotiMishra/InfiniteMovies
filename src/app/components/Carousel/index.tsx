import React, {useState} from 'react';
import {connect} from 'react-redux';
import IStoreState from '../../redux/StoreTypes';
import PaginateComponent from '../PaginateComponent';
import Slider from './slider';
import './styles.scss';

interface Props {
  page: number;
  totalPages: number;
  movieType: string;
}

function Carousel({page, totalPages, movieType}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(page);

  const paginate = (type: 'prev' | 'next') => {
    if (type === 'prev' && currentPage >= 1) {
      setCurrentPage(prev => prev - 1);
    } else {
      setCurrentPage(prev => {
        return prev + 1;
      });
    }
  };

  return (
    <div className="carousel">
      <Slider />
      <div className="grid-movie-title">
        <div className="movieType">{movieType}</div>
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

export default connect(mapStateToProps)(Carousel);
