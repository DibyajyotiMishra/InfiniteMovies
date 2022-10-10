/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unknown-property */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import IStoreState from '../../redux/StoreTypes';
import {imageUrl} from '../../services/movies.service';
import './styles.scss';

interface Props {
  movieDetails: any;
}

const Media = ({movieDetails}: Props) => {
  const [media] = useState(movieDetails[2]);
  const [videos] = useState(movieDetails[3]);

  return (
    <div className="media">
      <div>
        <div className="media-title">Watch Trailer</div>
        <div className="media-videos">
          {videos.results.map((data: any) => (
            <div className="video" key={data.key}>
              <iframe
                title="Avengers"
                style={{
                  width: '100%',
                  height: '100%',
                }}
                src={`https://www.youtube.com/embed/${data.key}`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="media-title">Photos ({media.posters.length})</div>
        <div className="media-images">
          {media.posters.map((data: any, i: number) => (
            <div
              className="image-cell"
              key={i + 1}
              style={{
                backgroundImage: `url(${imageUrl}${data.file_path})`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  return {
    movieDetails: state.movies.movieDetails,
  };
};

export default connect(mapStateToProps)(Media);
