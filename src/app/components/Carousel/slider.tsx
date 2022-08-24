/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undefined */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import IStoreState from '../../redux/StoreTypes';
import {imageUrl} from '../../services/movies.service';
import './slider.styles.scss';

interface Props {
  movies: Array<any>;
}

function Slider({movies}: Props) {
  const [images, setImages] = useState<Array<any>>([]);

  const randomMovies = movies.sort(() => Math.random() - Math.random()).slice(0, 5);

  useEffect(() => {
    if (randomMovies.length > 0) {
      const IMAGES = [
        {
          id: 1,
          url: `${imageUrl}/${randomMovies[0]?.backdrop_path}`,
        },
        {
          id: 2,
          url: `${imageUrl}/${randomMovies[1]?.backdrop_path}`,
        },
        {
          id: 3,
          url: `${imageUrl}/${randomMovies[2]?.backdrop_path}`,
        },
        {
          id: 4,
          url: `${imageUrl}/${randomMovies[3]?.backdrop_path}`,
        },
        {
          id: 5,
          url: `${imageUrl}/${randomMovies[4]?.backdrop_path}`,
        },
      ];
      setImages(IMAGES);
    }

    // console.log(movies);
  }, []);

  // console.log('** ', images);

  const [state, setState] = useState({
    slideShow: images[0],
    slideShowIndex: 0,
  });

  const [currentIndex, setCurrentIndex] = useState(-1);

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
    }, 1500);
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

const mapStateToProps = (state: IStoreState) => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps)(Slider);
