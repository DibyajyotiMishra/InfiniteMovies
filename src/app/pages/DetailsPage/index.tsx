/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {Crew, Media, Overview, Rating, Reviews, Spinner, Tabs} from '../../components';
import IStoreState from '../../redux/StoreTypes';
import {getMovieDetails} from '../../redux/actions/movies.action';
import {imageUrl} from '../../services/movies.service';
import './styles.scss';

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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (movieDetails.length === 0) {
      getDetails(id);
    }
    setDetails(movieDetails[0]);
  }, [id, movieDetails]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <Helmet>
        <title>Details Page</title>
      </Helmet>
      {loading ? (
        <Spinner />
      ) : (
        details && (
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
                    {details.title} <span>{details.release_date}</span>
                  </div>
                  <div className="movie-genres">
                    <ul className="genres">
                      {details &&
                        details.genres.map((genre: {id: number; name: string}) => (
                          <li key={genre.id}>{genre.name}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="rating">
                    <Rating rating={details.vote_average} totalStars={10} />
                    &nbsp;
                    <span>{details.vote_average}</span> <p>({details.vote_count}) reviews</p>
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
        )
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
