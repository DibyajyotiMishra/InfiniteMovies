import axios from 'axios';

const baseUrl: string | URL = 'https://api.themoviedb.org/3';
export const imageUrl: string | URL = 'https://image.tmdb.org/t/p/original';
const apiKey: any = process.env.REACT_APP_MOVIE_DB_API_KEY;

export const getMovies = async (page: number, type: string) => {
  const response = await axios.get(
    `${baseUrl}/movie/${type}?api_key=${apiKey}&language=en-US&page=${page}`,
  );
  return response.data;
};

export const SEARCH_API_URL = async (query: string) => {
  const response = await axios.get(
    `${baseUrl}/search/movie/?api_key=${apiKey}&language=en-US&query=${query}`,
  );
  return response.data;
};

export const getDetails = async (id: number) => {
  const response = await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`);
  return response.data;
};

export const getMovieCredits = async (id: number) => {
  const response = await axios.get(
    `${baseUrl}/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
  );
  return response.data;
};

export const getMovieImages = async (id: number) => {
  const response = await axios.get(
    `${baseUrl}/movie/${id}/images?api_key=${apiKey}&language=en-US&include_image_language=en`,
  );
  return response.data;
};

export const getMovieVideos = async (id: number) => {
  const response = await axios.get(
    `${baseUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`,
  );
  return response.data;
};

export const getMovieReviews = async (id: number, page: number = 1) => {
  const response = await axios.get(
    `${baseUrl}/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=${page}`,
  );
  return response.data;
};
