import React from 'react';
import {Helmet} from 'react-helmet';
import {Carousel} from '../../components';
import './styles.scss';

function HomePage() {
  return (
    <div className="main">
      <Helmet>
        <title>Infinite Movies</title>
      </Helmet>
      <Carousel />
      <h2>Welcome to Infinite Movies</h2>
    </div>
  );
}

export default HomePage;
