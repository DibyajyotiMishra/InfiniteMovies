/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {Crew, Media, Overview, Rating, Reviews, Tabs} from '../../components';
import IStoreState from '../../redux/StoreTypes';
import {getMovieDetails} from '../../redux/actions/movies.action';
import './styles.scss';
import {imageUrl} from '../../services/movies.service';

declare module 'react' {
  interface Attributes {
    label?: string;
    children?: any;
  }
}

interface Props {
  getDetails: (id: number) => void;
  movieDetails: any;
}

const DetailsPage = ({getDetails, movieDetails}: Props) => {
  const {id} = useParams<any>();
  const [details, setDetails] = useState<any>();
  useEffect(() => {
    if (movieDetails.length === 0) {
      getDetails(id);
    }
    setDetails(movieDetails[0]);
  }, [id, movieDetails]);

  return (
    <>
      <Helmet>
        <title>Details Page</title>
      </Helmet>
      {details && (
        <div className="movie-container">
          <div
            className="movie-bg"
            style={{
              backgroundImage: `url(${imageUrl}${details.backdrop_path})`,
            }}
          />
          <div className="movie-overlay" />
          <div className="movie-details">
            <div className="movie-image">
              <img src={`${imageUrl}${details.poster_path}`} alt="image" />
            </div>
            <div className="movie-body">
              <div className="movie-overview">
                <div className="title">
                  Avengers <span>03-12-2020</span>
                </div>
                <div className="movie-genres">
                  <ul className="genres">
                    <li>Action</li>
                    <li>Comedy</li>
                    <li>Sci-fi</li>
                  </ul>
                </div>
                <div className="rating">
                  <Rating rating={7} totalStars={10} />
                  &nbsp;
                  <span>6.7</span> <p>(200) reviews</p>
                </div>
                <Tabs>
                  <div label="Overview">
                    <Overview />
                  </div>
                  <div label="Crew">
                    <Crew />
                  </div>
                  <div label="Media">
                    <Media />
                  </div>
                  <div label="Reviews">
                    <Reviews />
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDetails: (id: number) => dispatch(getMovieDetails(id)),
  };
};

const mapStateToProps = (state: IStoreState) => {
  return {
    movieDetails: state.movies.movieDetails,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
