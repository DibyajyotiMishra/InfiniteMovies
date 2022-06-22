import React from 'react';
import {Helmet} from 'react-helmet';
import './styles.scss';

const DetailsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Details Page</title>
      </Helmet>
      <h1 style={{color: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        DetailsPage
      </h1>
    </div>
  );
};

export default DetailsPage;
