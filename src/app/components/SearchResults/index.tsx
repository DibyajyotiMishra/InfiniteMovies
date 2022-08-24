/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-useless-fragment */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {v4 as uuid} from 'uuid';
import {Link} from 'react-router-dom';
import LazyImage from '../LazyImage';
import Rating from '../Rating';
import {imageUrl} from '../../services/movies.service';
import IStoreState from '../../redux/StoreTypes';
import './styles.scss';
import '../Gallery/styles.scss';

interface Props {
  searchQuery: string;
  searchResult: Array<any>;
}

const SearchResults = ({searchQuery, searchResult}: Props) => {
  const [movieData, setMovieData] = useState<Array<any>>([]);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  const formatUrl = (title: string) => {
    const updatedTitle: string = title.toLowerCase();
    return updatedTitle.replace(/ /g, '-');
  };

  return (
    <div className="search">
      <div className="grid-search-title">
        <span className="grid-text1">Your Searched movie: </span>{' '}
        <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieData.map(movie => (
          <LazyImage key={uuid()} className="grid-cell" src={`${imageUrl}${movie.poster_path}`}>
            <div className="grid-read-more">
              <button className="grid-cell-button">
                <Link to={`/${movie.id}/${formatUrl(movie.title)}/details`}>Learn More</Link>
              </button>
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
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => ({
  searchQuery: state.movies.searchQuery,
  searchResult: state.movies.searchResult,
});

export default connect(mapStateToProps)(SearchResults);
