/* eslint-disable camelcase */
import {getMovies} from '../../services/movies.service';
import MovieActionTypes from './movies.actions.types';

const dispatchMethod = (type: string, payload: any, dispatch: any) => {
  dispatch({
    type,
    payload,
  });
};

export const fetchMovies =
  (pageNumber: number, type: 'now_playing' | 'top_rated' | 'popular') => async (dispatch: any) => {
    try {
      const movies = await getMovies(pageNumber, type);
      const {results, page, total_pages} = movies;
      console.log(results);
      const payload = {
        page,
        total_pages,
      };
      dispatchMethod(MovieActionTypes.MOVIES_LIST, results, dispatch);
      dispatchMethod(MovieActionTypes.RESPONSE_PAGE, payload, dispatch);
    } catch (error: any) {
      if (error.response) {
        dispatchMethod(MovieActionTypes.SET_ERROR, error.response.data.message, dispatch);
      }
    }
  };
