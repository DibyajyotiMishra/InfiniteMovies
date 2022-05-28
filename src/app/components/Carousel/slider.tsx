/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undefined */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useState, useEffect} from 'react';
import './slider.styles.scss';

function Slider() {
  const images = [
    {
      url: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      url: 'https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      url: 'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      url: 'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?cs=srgb&dl=pexels-ezra-comeau-2387418.jpg&fm=jpg',
    },
    {
      url: 'https://images.pexels.com/photos/6004828/pexels-photo-6004828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      url: 'https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      url: 'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  const [state, setState] = useState({
    slideShow: images[0],
    slideShowIndex: 0,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const {slideShow, slideShowIndex} = state;

  const autoMoveSlide = () => {
    let lastIndex = 0;
    lastIndex = currentIndex + 1;
    const index = lastIndex >= images.length ? 0 : lastIndex;
    setCurrentIndex(index);
    setState(next => ({
      ...next,
      slideShow: images[index],
      slideShowIndex: index,
    }));
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      autoMoveSlide();
    }, 3500);
    return () => {
      clearInterval(slideInterval);
    };
  }, [images]);

  function moveSliderArrows(type: string) {
    let index = currentIndex;
    if (type === 'left') {
      if (index <= 0) {
        index = images.length - 1;
      } else {
        index -= 1;
      }
      setCurrentIndex(index);
      setState(prev => ({
        ...prev,
        slideShow: images[index],
        slideShowIndex: index,
      }));
    } else if (type === 'right') {
      if (index >= images.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
      setCurrentIndex(index);
      setState(next => ({
        ...next,
        slideShow: images[index],
        slideShowIndex: index,
      }));
    }
  }
  function RenderIndicators(props: any) {
    const {currentSlide} = props;
    const indicators = images.map((_: any, index: React.Key | null | undefined) => {
      const btnClass =
        index === currentSlide ? `slider-navButton slider-navButton--active` : `slider-navButton`;
      return <button className={btnClass} key={index} />;
    });
    return <div className="slider-nav">{indicators}</div>;
  }

  function RenderArrows() {
    return (
      <div className="slider-arrows">
        <div className="slider-arrow slider-arrow--left" onClick={() => moveSliderArrows('left')} />
        <div
          className="slider-arrow slider-arrow--right"
          onClick={() => moveSliderArrows('right')}
        />
      </div>
    );
  }

  return (
    <div className="slider">
      <div className="slider-slides">
        {images && images.length > 0 && slideShow && (
          <div
            className="slider-image"
            style={{
              backgroundImage: `url(${slideShow.url})`,
            }}
          />
        )}
      </div>
      <RenderIndicators currentSlide={slideShowIndex} />
      <RenderArrows />
    </div>
  );
}

export default Slider;
