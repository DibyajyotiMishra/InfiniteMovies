/* eslint-disable camelcase */
import {getMovies} from '../../services/movies.service';
import MovieActionTypes from './movies.actions.types';

const dispatchMethod = (type: string, payload: any, dispatch: any) => {
  dispatch({
    type,
    payload,
  });
};

const getMoviesRequest = async (
  pageNumber: number,
  type: 'now_playing' | 'top_rated' | 'popular',
) => {
  const movies = await getMovies(pageNumber, type);
  const {results, page, total_pages} = movies;
  const payload = {
    page,
    total_pages,
  };
  return {results, payload};
};

export const fetchMovies =
  (pageNumber: number, type: 'now_playing' | 'top_rated' | 'popular') => async (dispatch: any) => {
    try {
      const {results, payload} = await getMoviesRequest(pageNumber, type);
      dispatchMethod(MovieActionTypes.MOVIES_LIST, results, dispatch);
      dispatchMethod(MovieActionTypes.RESPONSE_PAGE, payload, dispatch);
    } catch (error: any) {
      if (error.response) {
        dispatchMethod(MovieActionTypes.SET_ERROR, error.response.data.message, dispatch);
      }
    }
  };

export const fetchMoreMovies =
  (pageNumber: number, type: 'now_playing' | 'top_rated' | 'popular') => async (dispatch: any) => {
    try {
      const {results, payload} = await getMoviesRequest(pageNumber, type);
      dispatchMethod(MovieActionTypes.LOAD_MORE_MOVIES, results, dispatch);
      dispatchMethod(MovieActionTypes.RESPONSE_PAGE, payload, dispatch);
    } catch (error: any) {
      if (error.response) {
        dispatchMethod(MovieActionTypes.SET_ERROR, error.response.data.message, dispatch);
      }
    }
  };

export const setResponsePageNumber =
  (pageNumber: number, totalPages: number) => (dispatch: any) => {
    const payload = {
      page: pageNumber,
      total_pages: totalPages,
    };
    dispatchMethod(MovieActionTypes.RESPONSE_PAGE, payload, dispatch);
  };

export const setMovieType = (type: string) => (dispatch: any) => {
  dispatchMethod(MovieActionTypes.MOVIE_TYPE, type, dispatch);
};
