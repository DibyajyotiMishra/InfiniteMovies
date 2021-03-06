/* eslint-disable no-plusplus */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {v4 as uuid} from 'uuid';
import IStoreState from '../../redux/StoreTypes';
import {imageUrl} from '../../services/movies.service';
import './styles.scss';

interface Props {
  movieDetails: any;
}

const Overview = ({movieDetails}: Props) => {
  const [items, setItems] = useState<Array<any>>([]);
  const [details] = useState<any>(movieDetails[0]);
  const [credits] = useState<any>(movieDetails[1]);
  const numberFormatter = (number: number, digits: number) => {
    const symbolArray = [
      {value: 1, symbol: ''},
      {value: 1e3, symbol: 'K'},
      {value: 1e6, symbol: 'M'},
      {value: 1e9, symbol: 'B'},
    ];
    const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let result = '';

    for (let i = 0; i < symbolArray.length; i++) {
      if (number >= symbolArray[i].value) {
        result =
          (number / symbolArray[i].value).toFixed(digits).replace(regex, '$1') +
          symbolArray[i].symbol;
      }
    }
    return result;
  };

  useEffect(() => {
    const detailItems = [
      {
        id: 0,
        name: 'Tagline',
        value: `${details.tagline}`,
      },
      {
        id: 1,
        name: 'Budget',
        value: `${numberFormatter(details.budget, 1)}`,
      },
      {
        id: 2,
        name: 'Revenue',
        value: `${numberFormatter(details.revenue, 1)}`,
      },
      {
        id: 3,
        name: 'Status',
        value: `${details.status}`,
      },
      {
        id: 4,
        name: 'Release Date',
        value: `${details.release_date}`,
      },
      {
        id: 5,
        name: 'Run Time',
        value: `${details.runtime} minutes`,
      },
    ];
    setItems(detailItems);

    // eslint-disable-next-line
  }, []);

  return (
    <div className="overview">
      <div className="overview-column-1">
        <div className="description">{details.overview}</div>

        <div className="cast">
          <div className="div-title">Cast</div>
          <table>
            {credits.cast.map((data: any) => (
              <tbody key={uuid()}>
                <tr>
                  <td>
                    <img
                      src={
                        data.profile_path
                          ? `${imageUrl}${data.profile_path}`
                          : 'http://placehold.it/54x81'
                      }
                      height={90}
                      width={80}
                      alt=""
                    />
                  </td>
                  <td>{data.name}</td>
                  <td>{data.character}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <div className="overview-column-2">
        <div className="overview-detail">
          <h6>Production Companies</h6>
          {details.production_companies.map((company: any) => (
            <div className="product-company" key={uuid()}>
              <img
                src={
                  company.logo_path
                    ? `${imageUrl}${company.logo_path}`
                    : 'http://placehold.it/30x30'
                }
                alt=""
              />
              <span>{company.name}</span>
            </div>
          ))}
        </div>
        <div className="overview-detail">
          <h6>Language(s)</h6>
          <p>
            {details.spoken_languages.map((language: any) => (
              <a key={uuid()} href="!#">
                {language.name}
              </a>
            ))}
          </p>
        </div>
        <div className="overview-detail">
          <h6>Tagline</h6>
          <p>
            <a href="!#">Tagline</a>
          </p>
        </div>
        {items.map(data => (
          <div className="overview-detail" key={data.id}>
            <h6>{data.name}</h6>
            <p>
              <a href="!#">{data.value}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  return {
    movieDetails: state.movies.movieDetails,
  };
};

export default connect(mapStateToProps)(Overview);
