import React, {useState} from 'react';
import {connect} from 'react-redux';
import {v4 as uuid} from 'uuid';
import IStoreState from '../../redux/StoreTypes';
import './styles.scss';

interface Props {
  movieDetails: any;
}

const Reviews = ({movieDetails}: Props) => {
  const [reviews] = useState(movieDetails[4]);

  return (
    <div className="movie-reviews">
      <div className="div-title">
        Reviews {reviews.results.length > 0 ? reviews.results.length : ''}
      </div>
      {reviews.results.length ? (
        reviews.results.map((review: any) => (
          <div className="reviews" key={uuid()}>
            <h3>{review.author}</h3>
            <div>{review.content}</div>
          </div>
        ))
      ) : (
        <p> No Reviews Found.</p>
      )}
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  return {
    movieDetails: state.movies.movieDetails,
  };
};

export default connect(mapStateToProps)(Reviews);
