import React from 'react';
import Slider from './slider';
import './styles.scss';

function Carousel() {
  return (
    <div className="carousel">
      <Slider />
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">Paginate</div>
      </div>
    </div>
  );
}

export default Carousel;
