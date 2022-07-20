import React from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import notFoundImage from '../../assets/notfound.gif';
import './styles.scss';

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>Unknown Error | Infinite Movies</title>
      </Helmet>
      <div className="error-page" style={{textAlign: 'center'}}>
        <h1 className="error-header">Oops!</h1>
        <p className="error-msg">Something went wrong!!!</p>
        <img className="error-img" src={notFoundImage} alt="" />
        <br />
        <div className="error-link">
          <Link to="/">
            <i className="fa fa-home" /> Go Back Home.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
