/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import Rating from '../Rating';
import './styles.scss';

const Gallery = () => {
  return (
    <React.Fragment>
      <div className="grid">
        <>
          <div
            className="grid-cell"
            style={{
              backgroundImage:
                'url(https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            }}
          >
            <div className="grid-read-more">
              <button className="grid-cell-button">Learn More</button>
            </div>
            <div className="grid-detail">
              <span className="grid-detail-title">The Final Destination</span>
              <div className="grid-detail-rating">
                <Rating rating={4} totalStars={5} />
                &nbsp; &nbsp;
                <div className="grid-rating average">4/5</div>
              </div>
            </div>
          </div>
        </>
      </div>
    </React.Fragment>
  );
};

export default Gallery;
