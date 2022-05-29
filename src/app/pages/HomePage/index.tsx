import React from 'react';
import {Helmet} from 'react-helmet';
import {Carousel, Gallery} from '../../components';
import './styles.scss';

function HomePage() {
  return (
    <div className="main">
      <Helmet>
        <title>Infinite Movies</title>
      </Helmet>
      <Carousel />
      <Gallery />
    </div>
  );
}

export default HomePage;
