import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Carousel, Gallery, Spinner} from '../../components';
import './styles.scss';

function HomePage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="main">
      <Helmet>
        <title>Infinite Movies</title>
      </Helmet>
      {loading ? (
        <Spinner />
      ) : (
        <div className="main__content">
          <Carousel />
          <Gallery />
        </div>
      )}
    </div>
  );
}

export default HomePage;
