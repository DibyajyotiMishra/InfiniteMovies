import React from 'react';
import './slider.styles.scss';

function RenderArrows() {
  return (
    <div className="slider-arrows">
      <div className="slider-arrow slider-arrow--left" />
      <div className="slider-arrow slider-arrow--right" />
    </div>
  );
}

function Slider() {
  return (
    <div className="slider">
      <div className="slider-slides">
        <div
          className="slider-image"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
          }}
        />
      </div>
      <RenderArrows />
    </div>
  );
}

export default Slider;
