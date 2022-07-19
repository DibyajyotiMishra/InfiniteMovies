/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {v4 as uuid} from 'uuid';
import IStoreState from '../../redux/StoreTypes';
import {imageUrl} from '../../services/movies.service';
import './styles.scss';

interface Props {
  movieDetails: any;
}

const Crew = ({movieDetails}: Props) => {
  const [credits] = useState<any>(movieDetails[1]);

  return (
    <div className="cast">
      <div className="div-title">Crew</div>
      <table>
        <thead>
          <tr>
            <th />
            <th />
            <th className="head">Department</th>
            <th className="head">Job</th>
          </tr>
        </thead>
        {credits.crew.map((data: any) => (
          <tbody key={uuid()}>
            <tr>
              <td>
                <img
                  src={
                    data.profile_path
                      ? `${imageUrl}${data.profile_path}`
                      : 'http://placehold.it/54x81'
                  }
                  alt=""
                />
              </td>
              <td>{data.name}</td>
              <td>{data.department}</td>
              <td>{data.job}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  return {
    movieDetails: state.movies.movieDetails,
  };
};

export default connect(mapStateToProps)(Crew);
