import {getMovies} from '../../services/movies.service';
import MovieActionTypes from './movies.actions.types';

const dispatchMethod = (type: string, payload: any, dispatch: any) => {
  dispatch({
    type,
    payload,
  });
};

export const fetchMovies =
  (page: number, type: 'now_playing' | 'top_rated' | 'popular') => async (dispatch: any) => {
    try {
      const movies = await getMovies(page, type);
      const {results} = movies;
      console.log(results);

      dispatchMethod(MovieActionTypes.MOVIES_LIST, results, dispatch);
    } catch (error: any) {
      if (error.response) {
        dispatchMethod(MovieActionTypes.SET_ERROR, error.response.data.message, dispatch);
      }
    }
  };
