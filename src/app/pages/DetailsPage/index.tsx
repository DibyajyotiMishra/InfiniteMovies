/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import {Helmet} from 'react-helmet';
import {Crew, Media, Overview, Rating, Reviews, Tabs} from '../../components';
import './styles.scss';

declare module 'react' {
  interface Attributes {
    label?: string;
    children?: any;
  }
}

const DetailsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Details Page</title>
      </Helmet>
      <div className="movie-container">
        <div
          className="movie-bg"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600)`,
          }}
        />
        <div className="movie-overlay" />
        <div className="movie-details">
          <div className="movie-image">
            <img
              src="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="image"
            />
          </div>
          <div className="movie-body">
            <div className="movie-overview">
              <div className="title">
                Avengers <span>03-12-2020</span>
              </div>
              <div className="movie-genres">
                <ul className="genres">
                  <li>Action</li>
                  <li>Comedy</li>
                  <li>Sci-fi</li>
                </ul>
              </div>
              <div className="rating">
                <Rating rating={7} totalStars={10} />
                &nbsp;
                <span>6.7</span> <p>(200) reviews</p>
              </div>
              <Tabs>
                <div label="Overview">
                  <Overview />
                </div>
                <div label="Crew">
                  <Crew />
                </div>
                <div label="Media">
                  <Media />
                </div>
                <div label="Reviews">
                  <Reviews />
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
