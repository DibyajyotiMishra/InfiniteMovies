import React from 'react';
import {Helmet} from 'react-helmet';
import './styles.scss';

function HomePage() {
  return (
    <div className="main">
      <Helmet>
        <title>Infinite Movies</title>
      </Helmet>
      <h2>Welcome to Infinite Movies</h2>
    </div>
  );
}

export default HomePage;
