/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-useless-fragment */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {v4 as uuid} from 'uuid';
import IStoreState from '../../redux/StoreTypes';
import {imageUrl} from '../../services/movies.service';
import LazyImage from '../LazyImage';
import Rating from '../Rating';
import './styles.scss';

interface Props {
  movies: Array<any>;
}

const Gallery = ({movies}: Props) => {
  const [movieData, setMovieData] = useState<Array<any>>([]);

  useEffect(() => {
    setMovieData(movies);
  }, [movies]);

  return (
    <React.Fragment>
      <div className="grid">
        {movieData.map(movie => (
          <LazyImage key={uuid()} className="grid-cell" src={`${imageUrl}${movie.poster_path}`}>
            <div className="grid-read-more">
              <button className="grid-cell-button">Learn More</button>
            </div>
            <div className="grid-detail">
              <span className="grid-detail-title">{movie.title}</span>
              <div className="grid-detail-rating">
                <Rating rating={movie.vote_average} totalStars={10} />
                &nbsp; &nbsp;
                <div className="grid-rating average">{movie.vote_average}</div>
              </div>
            </div>
          </LazyImage>
        ))}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IStoreState) => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps)(Gallery);
